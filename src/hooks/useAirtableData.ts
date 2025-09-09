import { useState, useEffect, useCallback, useContext } from 'react';
import { api } from '@/lib/api';
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

// Types for Airtable data
export interface AirtableRecord {
  id: string;
  fields: Record<string, any>;
  createdTime: string;
}

export interface AirtableResponse {
  success: boolean;
  records: AirtableRecord[];
  offset?: string;
  table: string;
  count: number;
  hasMore: boolean;
}

export interface AirtableListParams {
  pageSize?: number;
  offset?: string;
  view?: string;
  filterByFormula?: string;
  fields?: string[];
}

export interface AirtableCreateData {
  records: Array<{
    fields: Record<string, any>;
  }>;
  typecast?: boolean;
}

export interface AirtableUpdateData {
  records: Array<{
    id: string;
    fields: Record<string, any>;
  }>;
  typecast?: boolean;
}

// Table configurations matching our Phase 5 API
export const AIRTABLE_TABLES = {
  spotify: {
    name: 'spotify',
    displayName: 'Spotify Playlisting',
    readFields: [], // Use all available fields from Airtable
    writeFields: ['Campaign', 'Start Date', 'URL', 'Goal', 'Status', 'Sale price', 'Invoice'],
    requiredRoles: ['admin', 'manager']
  },
  instagram: {
    name: 'instagram',
    displayName: 'Instagram Seeding',
    readFields: [], // Use all available fields from Airtable
    writeFields: ['Campaign', 'Spend', 'Status', 'Remaining', 'Start Date', 'Price', 'Invoice'],
    requiredRoles: ['admin', 'manager']
  },
  soundcloud: {
    name: 'soundcloud',
    displayName: 'SoundCloud',
    readFields: [], // Use all available fields from Airtable
    writeFields: ['Campaign', 'Spend', 'Status', 'Remaining', 'Start Date', 'Price', 'Invoice'],
    requiredRoles: ['admin', 'manager']
  },
  youtube: {
    name: 'youtube',
    displayName: 'YouTube Analytics',
    readFields: [], // Use all available fields from Airtable
    writeFields: ['Campaign', 'Service Type', 'Goal', 'Remaining', 'URL', 'Start Date', 'Status', 'Sale Price', 'Comments'],
    requiredRoles: ['admin', 'manager']
  }
} as const;

export type AirtableTableName = keyof typeof AIRTABLE_TABLES;

// Main hook for Airtable data operations
export const useAirtableData = (tableName: AirtableTableName) => {
  const [data, setData] = useState<AirtableRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [offset, setOffset] = useState<string | undefined>();
  const [totalCount, setTotalCount] = useState(0);
  
  const { toast } = useToast();
  const { user } = useContext(AuthContext);
  
  const tableConfig = AIRTABLE_TABLES[tableName];
  
  // Check if user has permission for this table
  const hasReadPermission = user?.role && ['admin', 'manager', 'viewer'].includes(user.role);
  const hasWritePermission = user?.role && tableConfig.requiredRoles.includes(user.role as any);

  // Fetch records with pagination
  const fetchRecords = useCallback(async (params: AirtableListParams = {}) => {
    if (!hasReadPermission) {
      setError('Insufficient permissions to read this table');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await api.airtable.getRecords(tableName, {
        pageSize: params.pageSize || 50,
        offset: params.offset,
        view: params.view || (tableConfig.readFields.length > 0 ? tableConfig.readFields.join(',') : undefined),
        filterByFormula: params.filterByFormula,
        fields: params.fields || (tableConfig.readFields.length > 0 ? tableConfig.readFields : undefined)
      });

      if (response.success) {
        setData(response.records);
        setHasMore(response.hasMore);
        setOffset(response.offset);
        setTotalCount(response.count);
      } else {
        throw new Error(response.error || 'Failed to fetch records');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch records';
      setError(errorMessage);
      toast({
        title: 'Error',
        description: `Failed to fetch ${tableConfig.displayName} data: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [tableName, hasReadPermission, toast, tableConfig]);

  // Load more records (pagination)
  const loadMore = useCallback(async () => {
    if (!hasMore || !offset || loading) return;

    try {
      setLoading(true);
      const response = await api.airtable.getRecords(tableName, {
        pageSize: 50,
        offset,
        view: tableConfig.readFields.length > 0 ? tableConfig.readFields.join(',') : undefined,
        fields: tableConfig.readFields.length > 0 ? tableConfig.readFields : undefined
      });

      if (response.success) {
        setData(prev => [...prev, ...response.records]);
        setHasMore(response.hasMore);
        setOffset(response.offset);
        setTotalCount(prev => prev + response.count);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load more records';
      toast({
        title: 'Error',
        description: `Failed to load more ${tableConfig.displayName} data: ${errorMessage}`,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [tableName, hasMore, offset, loading, toast, tableConfig]);

  // Create new record
  const createRecord = useCallback(async (fields: Record<string, any>) => {
    if (!hasWritePermission) {
      toast({
        title: 'Access Denied',
        description: `You don't have permission to create records in ${tableConfig.displayName}`,
        variant: 'destructive',
      });
      return null;
    }

    try {
      setLoading(true);
      const response = await api.airtable.createRecord(tableName, fields);
      
      if (response.success) {
        // Add new record to the beginning of the list
        setData(prev => [response.records[0], ...prev]);
        setTotalCount(prev => prev + 1);
        
        toast({
          title: 'Success',
          description: `Record created in ${tableConfig.displayName}`,
        });
        
        return response.records[0];
      } else {
        throw new Error(response.error || 'Failed to create record');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create record';
      toast({
        title: 'Error',
        description: `Failed to create record in ${tableConfig.displayName}: ${errorMessage}`,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [tableName, hasWritePermission, toast, tableConfig]);

  // Update existing record
  const updateRecord = useCallback(async (recordId: string, fields: Record<string, any>) => {
    if (!hasWritePermission) {
      toast({
        title: 'Access Denied',
        description: `You don't have permission to update records in ${tableConfig.displayName}`,
        variant: 'destructive',
      });
      return null;
    }

    try {
      setLoading(true);
      const response = await api.airtable.updateRecord(tableName, recordId, fields);
      
      if (response.success) {
        // Update record in the list
        setData(prev => prev.map(record => 
          record.id === recordId 
            ? { ...record, fields: { ...record.fields, ...fields } }
            : record
        ));
        
        toast({
          title: 'Success',
          description: `Record updated in ${tableConfig.displayName}`,
        });
        
        return response.records[0];
      } else {
        throw new Error(response.error || 'Failed to update record');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update record';
      toast({
        title: 'Error',
        description: `Failed to update record in ${tableConfig.displayName}: ${errorMessage}`,
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  }, [tableName, hasWritePermission, toast, tableConfig]);

  // Refresh data
  const refresh = useCallback(() => {
    fetchRecords();
  }, [fetchRecords]);

  // Auto-fetch on mount
  useEffect(() => {
    if (hasReadPermission) {
      fetchRecords();
    }
  }, [fetchRecords, hasReadPermission]);

  return {
    data,
    loading,
    error,
    hasMore,
    totalCount,
    hasReadPermission,
    hasWritePermission,
    tableConfig,
    fetchRecords,
    loadMore,
    createRecord,
    updateRecord,
    refresh
  };
};

// Hook for specific table data with common patterns
export const useSpotifyData = () => useAirtableData('spotify');
export const useInstagramData = () => useAirtableData('instagram');
export const useSoundCloudData = () => useAirtableData('soundcloud');
export const useYouTubeData = () => useAirtableData('youtube');

// Hook for Airtable health and sync status
export const useAirtableHealth = () => {
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const checkHealth = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.health.airtable();
      setHealth(response);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to check Airtable health';
      setError(errorMessage);
      toast({
        title: 'Health Check Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  return {
    health,
    loading,
    error,
    checkHealth
  };
};

// Hook for sync operations (admin only)
export const useAirtableSync = () => {
  const [syncStatus, setSyncStatus] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useContext(AuthContext);

  const isAdmin = user?.role === 'admin';

  const fetchSyncStatus = useCallback(async () => {
    if (!isAdmin) return;

    try {
      setLoading(true);
      setError(null);
      const response = await api.airtable.getSyncStatus();
      if (response.success) {
        setSyncStatus(response.syncStatus);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch sync status';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  const triggerSync = useCallback(async (tableName?: string) => {
    if (!isAdmin) {
      toast({
        title: 'Access Denied',
        description: 'Only administrators can trigger sync operations',
        variant: 'destructive',
      });
      return;
    }

    try {
      setLoading(true);
      const response = await api.airtable.syncTable(tableName || '');
      if (response.success) {
        toast({
          title: 'Sync Triggered',
          description: `Sync started for ${tableName || 'all tables'}`,
        });
        // Refresh sync status after a short delay
        setTimeout(fetchSyncStatus, 2000);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to trigger sync';
      toast({
        title: 'Sync Failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [isAdmin, toast, fetchSyncStatus]);

  useEffect(() => {
    if (isAdmin) {
      fetchSyncStatus();
    }
  }, [fetchSyncStatus, isAdmin]);

  return {
    syncStatus,
    loading,
    error,
    isAdmin,
    fetchSyncStatus,
    triggerSync
  };
};