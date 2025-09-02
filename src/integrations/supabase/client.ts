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
    signIn: () => Promise.resolve({ data: null, error: null }),
    signOut: () => Promise.resolve({ data: null, error: null }),
    getUser: () => Promise.resolve({ data: null, error: null })
  }
};
