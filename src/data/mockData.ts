// Mock data for the Unified Ops Dashboard

import {
  Campaign,
  Invoice,
  Alert,
  YTVideo,
  SCQueueItem,
  IGPost,
  SPItem,
  Lead,
  KPIData,
  User
} from '@/types';

// Mock delay utility
export const mockDelay = (ms: number = 500) => 
  new Promise(resolve => setTimeout(resolve, ms));

// KPI Data
export const mockKPIData: KPIData = {
  activeCampaigns: 24,
  igInQueue: 8,
  spInQueue: 5,
  ytVideosAudited: 156,
  scQueueSize: 12,
  invoicesRequest: 3,
  invoicesSent: 7,
  invoicesPaid: 15,
  alertsCount: 4,
};

// Campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Vibes Playlist',
    service: 'soundcloud',
    owner: 'Sarah Chen',
    status: 'in_progress',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    progress: 65,
    lastUpdate: '2024-01-22T10:30:00Z',
    trackUrl: 'https://soundcloud.com/artist/summer-vibes',
    targets: { reposts: 500, likes: 1200, comments: 150 }
  },
  {
    id: '2',
    name: 'Trending Hip-Hop Push',
    service: 'spotify',
    owner: 'Marcus Johnson',
    status: 'in_progress',
    startDate: '2024-01-20',
    endDate: '2024-02-20',
    progress: 80,
    lastUpdate: '2024-01-22T14:45:00Z'
  },
  {
    id: '3',
    name: 'Indie Rock Discovery',
    service: 'youtube',
    owner: 'Emma Rodriguez',
    status: 'needs_qa',
    startDate: '2024-01-10',
    endDate: '2024-01-30',
    progress: 90,
    lastUpdate: '2024-01-21T16:20:00Z'
  }
];

// Invoices
export const mockInvoices: Invoice[] = [
  {
    id: 'inv-001',
    campaignId: '1',
    amount: 2500,
    currency: 'USD',
    status: 'paid',
    dueDate: '2024-02-01',
    clientName: 'Indie Records Ltd',
    description: 'SoundCloud Campaign - Summer Vibes',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-18T15:30:00Z'
  },
  {
    id: 'inv-002',
    amount: 1800,
    currency: 'USD',
    status: 'sent',
    dueDate: '2024-02-05',
    clientName: 'Beat Productions',
    description: 'Spotify Playlist Placement',
    createdAt: '2024-01-20T11:00:00Z',
    updatedAt: '2024-01-20T11:00:00Z'
  },
  {
    id: 'inv-003',
    amount: 3200,
    currency: 'USD',
    status: 'request',
    dueDate: '2024-02-10',
    clientName: 'Urban Sound Group',
    description: 'Multi-platform Campaign',
    createdAt: '2024-01-22T08:00:00Z',
    updatedAt: '2024-01-22T08:00:00Z'
  }
];

// Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-001',
    title: 'Campaign Deadline Approaching',
    message: 'Indie Rock Discovery campaign ends in 3 days',
    severity: 'warning',
    timestamp: '2024-01-22T09:00:00Z',
    read: false,
    actionUrl: '/campaigns/3'
  },
  {
    id: 'alert-002',
    title: 'Payment Received',
    message: 'Invoice INV-001 has been paid',
    severity: 'success',
    timestamp: '2024-01-22T10:15:00Z',
    read: false
  },
  {
    id: 'alert-003',
    title: 'API Rate Limit Warning',
    message: 'SoundCloud API approaching rate limit',
    severity: 'error',
    timestamp: '2024-01-22T11:30:00Z',
    read: true
  }
];

// YouTube Videos
export const mockYTVideos: YTVideo[] = [
  {
    id: 'yt-001',
    url: 'https://youtube.com/watch?v=abc123',
    views: 125000,
    likes: 3200,
    comments: 180,
    score: 7.8,
    recommendedAction: 'improve_engagement',
    notes: 'Good view count but engagement could be higher',
    lastUpdated: '2024-01-22T12:00:00Z',
    fixed: false
  },
  {
    id: 'yt-002',
    url: 'https://youtube.com/watch?v=def456',
    views: 85000,
    likes: 4100,
    comments: 250,
    score: 8.9,
    recommendedAction: 'maintain',
    notes: 'Excellent engagement rate',
    lastUpdated: '2024-01-22T11:45:00Z',
    fixed: true
  }
];

// SoundCloud Queue
export const mockSCQueue: SCQueueItem[] = [
  {
    id: 'sc-001',
    trackUrl: 'https://soundcloud.com/artist/track1',
    action: 'repost',
    status: 'in_progress',
    scheduledFor: '2024-01-23T10:00:00Z',
    campaignId: '1'
  },
  {
    id: 'sc-002',
    trackUrl: 'https://soundcloud.com/artist/track2',
    action: 'like',
    status: 'completed',
    scheduledFor: '2024-01-22T15:00:00Z',
    completedAt: '2024-01-22T15:05:00Z',
    campaignId: '1'
  }
];

// Instagram Posts
export const mockIGPosts: IGPost[] = [
  {
    id: 'ig-001',
    caption: 'New music alert! 🎵 Check out this incredible track that\'s been on repeat all week. Link in bio! #NewMusic #IndiePop',
    mediaUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
    owner: 'Sarah Chen',
    status: 'in_progress',
    priority: 'high',
    dueDate: '2024-01-25',
    createdAt: '2024-01-20T09:00:00Z',
    updatedAt: '2024-01-22T14:30:00Z',
    tags: ['newmusic', 'indiepop', 'trending']
  },
  {
    id: 'ig-002',
    caption: 'Behind the scenes at our latest recording session 🎤 The creative process never stops!',
    mediaUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=400',
    owner: 'Marcus Johnson',
    status: 'backlog',
    priority: 'medium',
    dueDate: '2024-01-28',
    createdAt: '2024-01-21T11:00:00Z',
    updatedAt: '2024-01-21T11:00:00Z',
    tags: ['behindthescenes', 'recording', 'studio']
  }
];

// Spotify Items
export const mockSpotifyItems: SPItem[] = [
  {
    id: 'sp-001',
    artistName: 'Luna Grace',
    trackName: 'Midnight Dreams',
    contactEmail: 'luna@email.com',
    owner: 'Emma Rodriguez',
    status: 'confirmed',
    eta: '2024-02-01',
    notes: 'Confirmed for Friday playlist update',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-22T09:30:00Z'
  },
  {
    id: 'sp-002',
    artistName: 'The Reverb',
    trackName: 'Electric Nights',
    contactEmail: 'contact@thereverb.com',
    owner: 'Marcus Johnson',
    status: 'outreach',
    eta: '2024-02-05',
    notes: 'Waiting for artist response',
    createdAt: '2024-01-18T14:00:00Z',
    updatedAt: '2024-01-20T16:45:00Z'
  }
];

// Leads
export const mockLeads: Lead[] = [
  {
    id: 'lead-001',
    name: 'Alex Thompson',
    email: 'alex@musiclabel.com',
    projectDescription: 'Need visual content for album launch campaign',
    budget: '$5,000 - $10,000',
    referenceLinks: ['https://example.com/ref1', 'https://example.com/ref2'],
    status: 'new',
    createdAt: '2024-01-22T08:00:00Z'
  },
  {
    id: 'lead-002',
    name: 'Jessica Park',
    email: 'jessica@indierecords.com',
    projectDescription: 'Animated music video for single release',
    budget: '$15,000+',
    referenceLinks: ['https://example.com/ref3'],
    status: 'contacted',
    createdAt: '2024-01-20T12:00:00Z',
    notes: 'Initial call scheduled for Friday'
  }
];

// Current User
export const mockUser: User = {
  id: 'user-001',
  name: 'Admin User',
  email: 'admin@unifiedops.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
  role: 'admin',
  preferences: {
    theme: 'dark',
    notifications: true
  }
};

// Mock API Functions
export const mockAPI = {
  // KPI Data
  getKPIData: async (): Promise<KPIData> => {
    await mockDelay();
    return mockKPIData;
  },

  // Campaigns
  getCampaigns: async (): Promise<Campaign[]> => {
    await mockDelay();
    return mockCampaigns;
  },

  createCampaign: async (campaign: Omit<Campaign, 'id'>): Promise<Campaign> => {
    await mockDelay();
    const newCampaign = { ...campaign, id: `campaign-${Date.now()}` };
    mockCampaigns.push(newCampaign);
    return newCampaign;
  },

  // Invoices
  getInvoices: async (): Promise<Invoice[]> => {
    await mockDelay();
    return mockInvoices;
  },

  updateInvoiceStatus: async (id: string, status: Invoice['status']): Promise<void> => {
    await mockDelay();
    const invoice = mockInvoices.find(inv => inv.id === id);
    if (invoice) {
      invoice.status = status;
      invoice.updatedAt = new Date().toISOString();
    }
  },

  // Alerts
  getAlerts: async (): Promise<Alert[]> => {
    await mockDelay();
    return mockAlerts;
  },

  // YouTube
  getYTVideos: async (): Promise<YTVideo[]> => {
    await mockDelay();
    return mockYTVideos;
  },

  // SoundCloud
  getSCQueue: async (): Promise<SCQueueItem[]> => {
    await mockDelay();
    return mockSCQueue;
  },

  // Instagram
  getIGPosts: async (): Promise<IGPost[]> => {
    await mockDelay();
    return mockIGPosts;
  },

  updateIGPostStatus: async (id: string, status: IGPost['status']): Promise<void> => {
    await mockDelay();
    const post = mockIGPosts.find(p => p.id === id);
    if (post) {
      post.status = status;
      post.updatedAt = new Date().toISOString();
    }
  },

  // Spotify
  getSpotifyItems: async (): Promise<SPItem[]> => {
    await mockDelay();
    return mockSpotifyItems;
  },

  // Leads
  getLeads: async (): Promise<Lead[]> => {
    await mockDelay();
    return mockLeads;
  },

  createLead: async (lead: Omit<Lead, 'id' | 'createdAt' | 'status'>): Promise<Lead> => {
    await mockDelay();
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    mockLeads.push(newLead);
    return newLead;
  }
};