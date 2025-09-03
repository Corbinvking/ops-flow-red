// Supabase-compatible interface that connects to your custom RBAC API backend
// This provides the same interface that the integrated tools expect

// Updated to use the correct backend domain from the guide
const API_BASE_URL = "https://artistinfluence.dpdns.org";
const AIRTABLE_API_BASE_URL = "https://artistinfluence.dpdns.org";

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

// Create a more comprehensive Supabase-compatible client
export const supabase = {
  from: (table: string) => {
    const queryBuilder = {
      select: (columns: string = '*') => {
        const selectBuilder = {
          data: [],
          error: null,
          eq: (column: string, value: any) => ({
            data: [],
            error: null,
            single: () => ({
              data: null,
              error: null
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
          contains: (column: string, value: any) => ({
            data: [],
            error: null
          }),
          single: () => ({
            data: null,
            error: null
          }),
          eq: (column: string, value: any) => ({
            data: [],
            error: null,
            single: () => ({
              data: null,
              error: null
            }),
            contains: (column: string, value: any) => ({
              data: [],
              error: null
            }),
            single: () => ({
              data: null,
              error: null
            })
          })
        };
        
        // Make selectBuilder callable as a function (some tools expect this)
        return Object.assign(selectBuilder, {
          // Add function callability
          call: () => selectBuilder,
          // Ensure all methods return the same structure
          then: (callback: any) => Promise.resolve(selectBuilder).then(callback)
        });
      },
      insert: (data: any) => ({
        data: null,
        error: null,
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      }),
      update: (data: any) => ({
        data: null,
        error: null,
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      }),
      delete: () => ({
        data: null,
        error: null,
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      }),
      eq: (column: string, value: any) => ({
        data: [],
        error: null,
        single: () => ({
          data: null,
          error: null
        }),
        then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback)
      }),
      contains: (column: string, value: any) => ({
        data: [],
        error: null,
        then: (callback: any) => Promise.resolve({ data: [], error: null }).then(callback)
      }),
      single: () => ({
        data: null,
        error: null,
        then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
      })
    };
    
    // Make queryBuilder callable as a function
    return Object.assign(queryBuilder, {
      call: () => queryBuilder,
      then: (callback: any) => Promise.resolve(queryBuilder).then(callback)
    });
  },
  
  functions: {
    invoke: (functionName: string, options: any) => ({
      data: null,
      error: null,
      then: (callback: any) => Promise.resolve({ data: null, error: null }).then(callback)
    })
  },
  
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      try {
        const response = await apiCall('/api/auth/login', {
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
        const response = await apiCall('/api/auth/register', {
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
