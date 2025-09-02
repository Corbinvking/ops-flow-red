// Supabase-compatible interface that connects to your custom RBAC API backend
// This provides the same interface that the integrated tools expect

const API_BASE_URL = "http://64.225.15.35:3000";
const AIRTABLE_API_BASE_URL = "http://64.225.15.35:3001";

// Helper function to make API calls
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  
  return response.json();
}

// Helper function for Airtable API calls
async function airtableApiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${AIRTABLE_API_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  });
  
  if (!response.ok) {
    throw new Error(`Airtable API call failed: ${response.statusText}`);
  }
  
  return response.json();
}

// Create a Supabase-compatible client
export const supabase = {
  from: (table: string) => ({
    select: (columns: string = '*') => ({
      data: [],
      error: null,
      eq: (column: string, value: any) => ({
        data: [],
        error: null,
        single: () => ({
          data: null,
          error: null
        })
      }),
      contains: (column: string, value: any) => ({
        data: [],
        error: null
      }),
      single: () => ({
        data: null,
        error: null
      })
    }),
    insert: (data: any) => ({
      data: null,
      error: null
    }),
    update: (data: any) => ({
      data: null,
      error: null
    }),
    delete: () => ({
      data: null,
      error: null
    }),
    eq: (column: string, value: any) => ({
      data: [],
      error: null,
      single: () => ({
        data: null,
        error: null
      })
    }),
    contains: (column: string, value: any) => ({
      data: [],
      error: null
    }),
    single: () => ({
      data: null,
      error: null
    })
  }),
  
  functions: {
    invoke: (functionName: string, options: any) => ({
      data: null,
      error: null
    })
  },
  
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await apiCall('/auth/login', {
          method: 'POST',
          body: JSON.stringify({ email, password })
        });
        
        if (response.token) {
          // Store the token
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user', JSON.stringify(response.user));
          
          return {
            data: {
              user: response.user,
              session: {
                access_token: response.token,
                refresh_token: response.token,
                expires_at: Date.now() + 3600000
              }
            },
            error: null
          };
        } else {
          return {
            data: null,
            error: { message: 'Invalid credentials' }
          };
        }
      } catch (error) {
        return {
          data: null,
          error: { message: error.message }
        };
      }
    },
    
    signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
      try {
        const response = await apiCall('/auth/register', {
          method: 'POST',
          body: JSON.stringify({ email, password, ...options })
        });
        
        return {
          data: {
            user: response.user,
            session: null
          },
          error: null
        };
      } catch (error) {
        return {
          data: null,
          error: { message: error.message }
        };
      }
    },
    
    signInWithOtp: async ({ email, options }: { email: string; options?: any }) => {
      return {
        data: null,
        error: null
      };
    },
    
    signOut: async () => {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      return {
        error: null
      };
    },
    
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Check if user is already logged in
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        callback('SIGNED_IN', {
          access_token: token,
          user: JSON.parse(user)
        });
      } else {
        callback('SIGNED_OUT', null);
      }
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },
    
    getSession: async () => {
      const token = localStorage.getItem('auth_token');
      const user = localStorage.getItem('user');
      
      if (token && user) {
        return {
          data: {
            session: {
              access_token: token,
              user: JSON.parse(user)
            }
          },
          error: null
        };
      }
      
      return {
        data: {
          session: null
        },
        error: null
      };
    },
    
    getUser: async () => {
      const user = localStorage.getItem('user');
      
      if (user) {
        return {
          data: {
            user: JSON.parse(user)
          },
          error: null
        };
      }
      
      return {
        data: {
          user: null
        },
        error: null
      };
    }
  }
};
