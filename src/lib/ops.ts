// Operations utilities for Airtable integration
import { AT, VIEWS } from '@/server/airtable.config';

// Utility functions
export const chunk10 = <T>(arr: T[]): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += 10) {
    chunks.push(arr.slice(i, i + 10));
  }
  return chunks;
};

export const retry429 = async <T>(fn: () => Promise<T>, maxRetries = 3): Promise<T> => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      if (error.status === 429 && i < maxRetries - 1) {
        await sleep(1000 * Math.pow(2, i));
        continue;
      }
      throw error;
    }
  }
  throw new Error('Max retries exceeded');
};

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const nowISO = () => new Date().toISOString();

// Status color helpers
export const getStatusColor = (status: string): string => {
  const statusMap: Record<string, string> = {
    // SoundCloud statuses
    'active': 'chip-success',
    'cancelled': 'chip-danger',
    'complete': 'chip-success',
    'in_progress': 'chip-warning',
    'pending': 'chip-warning',
    
    // Instagram statuses
    'backlog': 'chip',
    'needs_qa': 'chip-warning',
    'done': 'chip-success',
    
    // Spotify stages
    'sourcing': 'chip',
    'outreach': 'chip-warning', 
    'confirmed': 'chip-success',
    'scheduled': 'chip-primary',
    'published': 'chip-success',
    
    // Invoice statuses
    'request': 'chip',
    'sent': 'chip-warning',
    'paid': 'chip-success'
  };
  
  return statusMap[status.toLowerCase()] || 'chip';
};

export const getPriorityColor = (priority: string): string => {
  const priorityMap: Record<string, string> = {
    'high': 'chip-danger',
    'medium': 'chip-warning',
    'low': 'chip'
  };
  
  return priorityMap[priority.toLowerCase()] || 'chip';
};

// Field helpers
export const getFieldValue = (record: any, fieldId: string): any => {
  return record.fields?.[fieldId] || record[fieldId];
};

export const setFieldValue = (fields: Record<string, any>, fieldId: string, value: any): void => {
  fields[fieldId] = value;
};

// View helpers
export const getViewsForService = (service: keyof typeof VIEWS): Record<string, string> => {
  return VIEWS[service] || {};
};

// Bulk operation helpers
export const prepareBulkUpdate = (
  recordIds: string[], 
  fields: Record<string, any>
): Array<{ id: string; fields: Record<string, any> }> => {
  return recordIds.map(id => ({ id, fields }));
};