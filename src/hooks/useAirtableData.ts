import { useState, useEffect, useCallback } from 'react';
import { api } from '../lib/api';
import { useToast } from './use-toast';

// Airtable table names mapping - Only include tables that actually exist in Airtable
export const AIRTABLE_TABLES = {
  // Use youtube as the main campaign tracker since campaign_tracker_2025 doesn't exist
  CAMPAIGN_TRACKER: 'youtube',
  YOUTUBE: 'youtube',
  SOUNDCLOUD: 'soundcloud',
  INSTAGRAM: 'ig seeding', // Use the original name that has tableId
  SPOTIFY: 'spotify playlisting', // Use the original name that has tableId
  SPOTIFY_PLAYLISTING: 'spotify playlisting', // Use the original name that has tableId
  INSTAGRAM_SEEDING: 'ig seeding', // Use the original name that has tableId
  TIKTOK_UGC: 'tiktok ugc', // Use the original name that has tableId
  SOUNDCLOUD_PLAYLISTING: 'soundcloud playlisting', // Use the original name that has tableId
  SALESPEOPLE: 'salespeople',
  VENDORS: 'vendors',
  INVOICE_REQUESTS: 'invoice requests', // Use the original name that has tableId
  INVOICES: 'invoices',
} as const;

export type AirtableTableName = typeof AIRTABLE_TABLES[keyof typeof AIRTABLE_TABLES];

interface UseAirtableDataOptions {
  tableName: AirtableTableName;
  autoRefresh?: boolean;
  refreshInterval?: number;
  params?: Record<string, any>;
}

export const useAirtableData = (options: UseAirtableDataOptions) => {
  const { tableName, autoRefresh = false, refreshInterval = 30000, params } = options;
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [recordsResponse, statsResponse] = await Promise.all([
        api.airtable.getRecords(tableName, params),
        api.airtable.getStats(tableName)
      ]);

      setData(recordsResponse.records || []);
      setStats(statsResponse);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch data';
      setError(errorMessage);
      toast({
        title: 'Error loading data',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [tableName, params, toast]);

  const createRecord = useCallback(async (fields: Record<string, any>) => {
    try {
      const result = await api.airtable.createRecord(tableName, fields);
      setData(prev => [...prev, result]);
      toast({
        title: 'Record created',
        description: 'New record has been created successfully.',
      });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create record';
      toast({
        title: 'Error creating record',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  }, [tableName, toast]);

  const updateRecord = useCallback(async (recordId: string, fields: Record<string, any>) => {
    try {
      const result = await api.airtable.updateRecord(tableName, recordId, fields);
      setData(prev => prev.map(item => 
        item.id === recordId ? { ...item, ...result } : item
      ));
      toast({
        title: 'Record updated',
        description: 'Record has been updated successfully.',
      });
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update record';
      toast({
        title: 'Error updating record',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  }, [tableName, toast]);

  const deleteRecord = useCallback(async (recordId: string) => {
    try {
      await api.airtable.deleteRecord(tableName, recordId);
      setData(prev => prev.filter(item => item.id !== recordId));
      toast({
        title: 'Record deleted',
        description: 'Record has been deleted successfully.',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete record';
      toast({
        title: 'Error deleting record',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  }, [tableName, toast]);

  const searchRecords = useCallback(async (query: string) => {
    try {
      setLoading(true);
      const result = await api.airtable.searchRecords(tableName, query);
      setData(result.records || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search records';
      setError(errorMessage);
      toast({
        title: 'Search error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [tableName, toast]);

  const syncTable = useCallback(async () => {
    try {
      setLoading(true);
      await api.airtable.syncTable(tableName);
      await fetchData(); // Refresh data after sync
      toast({
        title: 'Table synced',
        description: 'Table has been synchronized with Airtable.',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to sync table';
      toast({
        title: 'Sync error',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [tableName, fetchData, toast]);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto-refresh setup
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchData]);

  return {
    data,
    loading,
    error,
    stats,
    refetch: fetchData,
    createRecord,
    updateRecord,
    deleteRecord,
    searchRecords,
    syncTable,
  };
};

// Specialized hooks for specific tables
export const useCampaignData = (params?: Record<string, any>) => 
  useAirtableData({ tableName: AIRTABLE_TABLES.CAMPAIGN_TRACKER, params });

export const useYouTubeData = (params?: Record<string, any>) => 
  useAirtableData({ tableName: AIRTABLE_TABLES.YOUTUBE, params });

export const useSoundCloudData = (params?: Record<string, any>) => 
  useAirtableData({ tableName: AIRTABLE_TABLES.SOUNDCLOUD, params });

export const useSpotifyData = (params?: Record<string, any>) => 
  useAirtableData({ tableName: AIRTABLE_TABLES.SPOTIFY, params });

export const useInstagramData = (params?: Record<string, any>) => 
  useAirtableData({ tableName: AIRTABLE_TABLES.INSTAGRAM, params });

export const useInvoiceData = (params?: Record<string, any>) => 
  useAirtableData({ tableName: AIRTABLE_TABLES.INVOICES, params });

export const useInvoiceRequestsData = (params?: Record<string, any>) => 
  useAirtableData({ tableName: AIRTABLE_TABLES.INVOICE_REQUESTS, params });
