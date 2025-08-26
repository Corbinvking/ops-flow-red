// Core Data Models for Unified Ops Dashboard

export type Status = 'backlog' | 'in_progress' | 'needs_qa' | 'done' | 'failed' | 'completed';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Service = 'soundcloud' | 'youtube' | 'instagram' | 'spotify';

// Airtable Record Structure
export interface AirtableRecord {
  id: string;
  createdTime: string;
  fields: Record<string, any>;
}

// Campaign Management (Airtable-based)
export interface Campaign extends AirtableRecord {
  fields: {
    'Campaign'?: string;
    'Name'?: string;
    'Service Type'?: string;
    'Service'?: string;
    'Status'?: string;
    'Start Date'?: string;
    'End Date'?: string;
    'Goal'?: number;
    'Remaining'?: number;
    'URL'?: string;
    'Owner'?: string;
    'Comments'?: string;
    'Invoice'?: string;
    'Sale Price'?: number;
    'Paid R?'?: string;
    'Clients'?: string[];
    'Email'?: string[];
    'Salespeople'?: string[];
    [key: string]: any;
  };
}

// Invoice System (Airtable-based)
export interface Invoice extends AirtableRecord {
  fields: {
    'Name'?: string;
    'Project Description'?: string;
    'Status'?: string;
    'Date'?: string;
    'Invoice #'?: number;
    'Amount'?: number;
    'Open Balance'?: number;
    'Attachment Summary'?: any;
    [key: string]: any;
  };
}

// Alert System
export interface Alert {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

// YouTube Ratio Fixer
export interface YTVideo {
  id: string;
  url: string;
  views: number;
  likes: number;
  comments: number;
  score: number;
  recommendedAction: 'maintain' | 'improve_engagement' | 'boost_promotion' | 'review_content';
  notes: string;
  lastUpdated: string;
  fixed: boolean;
}

export interface YTAction {
  id: string;
  videoId: string;
  action: string;
  status: Status;
  scheduledFor?: string;
  completedAt?: string;
}

// SoundCloud Queue
export interface SCQueueItem {
  id: string;
  trackUrl: string;
  action: 'repost' | 'like' | 'comment' | 'follow';
  status: Status;
  scheduledFor?: string;
  completedAt?: string;
  campaignId?: string;
}

// Instagram Posts
export interface IGPost {
  id: string;
  caption: string;
  mediaUrl: string;
  owner: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  notes?: string;
  tags?: string[];
}

// Spotify Pipeline
export interface SPItem {
  id: string;
  artistName: string;
  trackName: string;
  contactEmail?: string;
  contactPhone?: string;
  owner: string;
  status: 'sourcing' | 'outreach' | 'confirmed' | 'scheduled' | 'published';
  eta?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// Visualizer Leads
export interface Lead {
  id: string;
  name: string;
  email: string;
  projectDescription: string;
  budget: string;
  referenceLinks: string[];
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'rejected';
  createdAt: string;
  notes?: string;
}

// KPI Dashboard Data
export interface KPIData {
  activeCampaigns: number;
  igInQueue: number;
  spInQueue: number;
  ytVideosAudited: number;
  scQueueSize: number;
  invoicesRequest: number;
  invoicesSent: number;
  invoicesPaid: number;
  alertsCount: number;
}

// User & Settings
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'operator' | 'sales' | 'engineer' | 'viewer';
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
  };
}

// Database User (from RBAC system)
export interface DBUser {
  id: string;
  email: string;
  role: 'admin' | 'operator' | 'sales' | 'engineer' | 'viewer';
  first_name?: string;
  last_name?: string;
  last_login?: string;
  created_at: string;
  updated_at?: string;
}

// User Management
export interface CreateUserData {
  email: string;
  password: string;
  role: 'admin' | 'operator' | 'sales' | 'engineer' | 'viewer';
  first_name?: string;
  last_name?: string;
}

export interface UpdateUserData {
  email?: string;
  role?: 'admin' | 'operator' | 'sales' | 'engineer' | 'viewer';
  first_name?: string;
  last_name?: string;
}

export interface UserPermission {
  resource: string;
  action: string;
}

export interface UserStats {
  totalUsers: number;
  usersByRole: Record<string, number>;
  recentLogins: number;
}

export interface APIConnection {
  id: string;
  name: 'airtable' | 'supabase';
  status: 'connected' | 'disconnected' | 'error';
  lastSync?: string;
  config: Record<string, any>;
}

// Form Data Types
export interface CreateCampaignForm {
  name: string;
  trackUrl?: string;
  service: Service;
  owner: string;
  startDate: string;
  endDate: string;
  targets?: {
    reposts?: number;
    likes?: number;
    comments?: number;
  };
  notes?: string;
}

export interface CreatePostForm {
  caption: string;
  mediaUrl: string;
  owner: string;
  status: Status;
  priority: Priority;
  dueDate?: string;
  notes?: string;
  tags?: string[];
}

export interface CreateLeadForm {
  name: string;
  email: string;
  projectDescription: string;
  budget: string;
  referenceLinks: string[];
}

// Bulk Operations
export interface BulkOperation {
  action: 'assign_owner' | 'set_status' | 'set_priority' | 'set_date' | 'mark_done' | 'mark_failed' | 'reschedule';
  selectedIds: string[];
  value?: any;
}

// Table & View Configuration
export interface TableConfig {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  filters?: Record<string, any>;
  pageSize?: number;
  currentPage?: number;
}

export interface ViewMode {
  type: 'table' | 'kanban' | 'calendar';
  config?: Record<string, any>;
}