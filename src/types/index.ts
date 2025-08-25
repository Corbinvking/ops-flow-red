// Core Data Models for Unified Ops Dashboard

export type Status = 'backlog' | 'in_progress' | 'needs_qa' | 'done' | 'failed' | 'completed';
export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type Service = 'soundcloud' | 'youtube' | 'instagram' | 'spotify';

// Campaign Management
export interface Campaign {
  id: string;
  name: string;
  service: Service;
  owner: string;
  status: Status;
  startDate: string;
  endDate: string;
  progress: number;
  lastUpdate: string;
  trackUrl?: string;
  targets?: {
    reposts?: number;
    likes?: number;
    comments?: number;
  };
  notes?: string;
}

// Invoice System
export interface Invoice {
  id: string;
  campaignId?: string;
  amount: number;
  currency: string;
  status: 'request' | 'sent' | 'paid';
  dueDate: string;
  clientName: string;
  description: string;
  createdAt: string;
  updatedAt: string;
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
  role: 'admin' | 'operator' | 'viewer';
  preferences: {
    theme: 'dark' | 'light';
    notifications: boolean;
  };
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