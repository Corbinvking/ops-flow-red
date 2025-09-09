// API Configuration for connecting to backend services
export interface APIConfig {
  baseURL: string;
  airtableBaseURL: string;
  timeout: number;
}

// Environment-specific configuration
const getApiConfig = (): APIConfig => {
  const isProduction = import.meta.env.PROD;
  const isDevelopment = import.meta.env.DEV;
  
  // Force HTTPS for production - always use correct URLs
  if (isProduction) {
    return {
      baseURL: 'https://artistinfluence.dpdns.org',
      airtableBaseURL: 'https://artistinfluence.dpdns.org/airtable',
      timeout: 10000,
    };
  }
  
  if (isDevelopment) {
    return {
      baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',
      airtableBaseURL: import.meta.env.VITE_AIRTABLE_API_BASE_URL || 'http://localhost:3001',
      timeout: 5000,
    };
  }
  
  // Fallback for other environments - always use production URLs
  return {
    baseURL: 'https://artistinfluence.dpdns.org',
    airtableBaseURL: 'https://artistinfluence.dpdns.org/airtable',
    timeout: 10000,
  };
};

export const apiConfig = getApiConfig();

// Debug logging for production
if (import.meta.env.PROD) {
  console.log('API Config:', apiConfig);
  console.log('Environment:', import.meta.env.MODE);
}

// API Client with error handling and authentication
class APIClient {
  private config: APIConfig;
  private authToken: string | null = null;

  constructor(config: APIConfig) {
    this.config = config;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  clearAuthToken() {
    this.authToken = null;
  }

  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      clearTimeout(timeoutId);
      
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      
      throw new Error('Network error');
    }
  }

  // RBAC API Methods
  async login(email: string, password: string): Promise<{ user: any; token: string }> {
    return this.request(`${this.config.baseURL}/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async logout(): Promise<void> {
    return this.request(`${this.config.baseURL}/auth/logout`, {
      method: 'POST',
    });
  }

  async getCurrentUser(): Promise<any> {
    return this.request(`${this.config.baseURL}/auth/me`);
  }

  // User Management Methods
  async getUsers(): Promise<any[]> {
    return this.request(`${this.config.baseURL}/api/users`);
  }

  async createUser(userData: {
    email: string;
    password: string;
    role: string;
    first_name?: string;
    last_name?: string;
  }): Promise<any> {
    return this.request(`${this.config.baseURL}/api/users`, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(userId: string, userData: {
    email?: string;
    role?: string;
    first_name?: string;
    last_name?: string;
  }): Promise<any> {
    return this.request(`${this.config.baseURL}/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changeUserPassword(userId: string, password: string): Promise<any> {
    return this.request(`${this.config.baseURL}/api/users/${userId}/password`, {
      method: 'PUT',
      body: JSON.stringify({ password }),
    });
  }

  async deleteUser(userId: string): Promise<void> {
    return this.request(`${this.config.baseURL}/api/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async getUserPermissions(): Promise<any[]> {
    return this.request(`${this.config.baseURL}/api/permissions`);
  }

  async getReports(): Promise<any[]> {
    return this.request(`${this.config.baseURL}/api/reports`);
  }

  // Airtable API Methods
  async getAirtableTables(): Promise<any[]> {
    return this.request(`${this.config.airtableBaseURL}/api/airtable/tables`);
  }

  async getAirtableRecords(tableName: string, params?: Record<string, any>): Promise<any> {
    const searchParams = new URLSearchParams(params);
    const url = `${this.config.airtableBaseURL}/api/airtable/records/${tableName}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    return this.request(url);
  }

  async createAirtableRecord(tableName: string, fields: Record<string, any>): Promise<any> {
    return this.request(`${this.config.airtableBaseURL}/api/airtable/records/${tableName}`, {
      method: 'POST',
      body: JSON.stringify({ fields }),
    });
  }

  async updateAirtableRecord(tableName: string, recordId: string, fields: Record<string, any>): Promise<any> {
    return this.request(`${this.config.airtableBaseURL}/api/airtable/records/${tableName}/${recordId}`, {
      method: 'PUT',
      body: JSON.stringify({ fields }),
    });
  }

  async deleteAirtableRecord(tableName: string, recordId: string): Promise<void> {
    return this.request(`${this.config.airtableBaseURL}/api/airtable/records/${tableName}/${recordId}`, {
      method: 'DELETE',
    });
  }

  async searchAirtableRecords(tableName: string, query: string): Promise<any> {
    return this.request(`${this.config.airtableBaseURL}/api/airtable/search/${tableName}?q=${encodeURIComponent(query)}`);
  }

  async getAirtableStats(tableName?: string): Promise<any> {
    const url = tableName 
      ? `${this.config.airtableBaseURL}/api/airtable/stats/${tableName}`
      : `${this.config.airtableBaseURL}/api/airtable/stats`;
    return this.request(url);
  }

  async syncAirtableTable(tableName: string): Promise<any> {
    return this.request(`${this.config.airtableBaseURL}/api/airtable/sync/${tableName}`, {
      method: 'POST',
    });
  }

  async getAirtableSyncStatus(tableName: string): Promise<any> {
    return this.request(`${this.config.airtableBaseURL}/api/airtable/sync-status/${tableName}`);
  }

  // Health checks
  async checkRBACHealth(): Promise<any> {
    return this.request(`${this.config.baseURL}/health`);
  }

  async checkAirtableHealth(): Promise<any> {
    return this.request(`${this.config.airtableBaseURL}/health`);
  }
}

// Export singleton instance
export const apiClient = new APIClient(apiConfig);

// Convenience functions for common operations
export const api = {
  // Authentication
  auth: {
    login: (email: string, password: string) => apiClient.login(email, password),
    logout: () => apiClient.logout(),
    getCurrentUser: () => apiClient.getCurrentUser(),
  },

  // RBAC Operations
  users: {
    getAll: () => apiClient.getUsers(),
    create: (userData: any) => apiClient.createUser(userData),
    update: (userId: string, userData: any) => apiClient.updateUser(userId, userData),
    changePassword: (userId: string, password: string) => apiClient.changeUserPassword(userId, password),
    delete: (userId: string) => apiClient.deleteUser(userId),
    getPermissions: () => apiClient.getUserPermissions(),
  },

  reports: {
    getAll: () => apiClient.getReports(),
  },

  // Airtable Operations
  airtable: {
    getTables: () => apiClient.getAirtableTables(),
    getRecords: (tableName: string, params?: Record<string, any>) => 
      apiClient.getAirtableRecords(tableName, params),
    createRecord: (tableName: string, fields: Record<string, any>) => 
      apiClient.createAirtableRecord(tableName, fields),
    updateRecord: (tableName: string, recordId: string, fields: Record<string, any>) => 
      apiClient.updateAirtableRecord(tableName, recordId, fields),
    deleteRecord: (tableName: string, recordId: string) => 
      apiClient.deleteAirtableRecord(tableName, recordId),
    searchRecords: (tableName: string, query: string) => 
      apiClient.searchAirtableRecords(tableName, query),
    getStats: (tableName?: string) => apiClient.getAirtableStats(tableName),
    syncTable: (tableName: string) => apiClient.syncAirtableTable(tableName),
    getSyncStatus: (tableName: string) => apiClient.getAirtableSyncStatus(tableName),
  },

  // Health checks
  health: {
    rbac: () => apiClient.checkRBACHealth(),
    airtable: () => apiClient.checkAirtableHealth(),
  },

  // Token management
  setAuthToken: (token: string) => apiClient.setAuthToken(token),
  clearAuthToken: () => apiClient.clearAuthToken(),
};
