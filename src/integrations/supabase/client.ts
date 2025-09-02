// Mock Supabase client for integrated tools
export const supabase = {
  from: (table: string) => ({
    select: (columns: string) => ({
      data: [],
      error: null
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
      // Mock successful login for demo purposes
      if (email && password) {
        return {
          data: {
            user: {
              id: 'mock-user-id',
              email: email,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            },
            session: {
              access_token: 'mock-token',
              refresh_token: 'mock-refresh-token',
              expires_at: Date.now() + 3600000
            }
          },
          error: null
        };
      }
      return {
        data: null,
        error: { message: 'Invalid credentials' }
      };
    },
    signUp: async ({ email, password, options }: { email: string; password: string; options?: any }) => {
      return {
        data: {
          user: {
            id: 'mock-user-id',
            email: email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          session: null
        },
        error: null
      };
    },
    signInWithOtp: async ({ email, options }: { email: string; options?: any }) => {
      return {
        data: null,
        error: null
      };
    },
    signOut: async () => {
      return {
        error: null
      };
    },
    onAuthStateChange: (callback: (event: string, session: any) => void) => {
      // Mock auth state change listener - NO AUTO LOGIN
      // This ensures the auth wall remains intact
      // Return the proper structure that Supabase expects
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },
    getSession: async () => {
      // Return no session to maintain auth wall
      return {
        data: {
          session: null
        },
        error: null
      };
    },
    getUser: async () => {
      // Return no user to maintain auth wall
      return {
        data: {
          user: null
        },
        error: null
      };
    }
  }
};
