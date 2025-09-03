import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';

// User interface matching your RBAC backend
interface User {
  id: string;
  email: string;
  role: string;
  first_name?: string;
  last_name?: string;
  is_active: boolean;
  created_at: string;
  last_login?: string;
}

// Session interface
interface Session {
  user: User;
  token: string;
  expires_at: string;
}

// Member interface for additional user data
interface Member {
  id: string;
  name: string;
  primary_email: string;
  emails: string[];
  status: string;
  size_tier: string;
  monthly_repost_limit: number;
  submissions_this_month: number;
  net_credits: number;
  soundcloud_url?: string;
  spotify_url?: string;
  families?: string[];
  soundcloud_followers?: number;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRoles: string[];
  member: Member | null;
  isAdmin: boolean;
  isModerator: boolean;
  isMember: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  sendMagicLink: (email: string) => Promise<{ error: any }>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<string[]>([]);
  const [member, setMember] = useState<Member | null>(null);
  const { toast } = useToast();

  const isAdmin = userRoles.includes('admin');
  const isModerator = userRoles.includes('moderator');
  const isMember = member !== null;

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          api.setAuthToken(token);
          const userData = await api.auth.getCurrentUser();
          if (userData) {
            setUser(userData);
            setUserRoles([userData.role]);
            setSession({
              user: userData,
              token,
              expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
            });
          }
        }
      } catch (error) {
        console.error('Error checking existing session:', error);
        localStorage.removeItem('authToken');
        api.clearAuthToken();
      } finally {
        setLoading(false);
      }
    };

    checkExistingSession();
  }, []);

  // Real authentication functions
  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await api.auth.login(email, password);
      
      if (response.user && response.token) {
        // Store token
        localStorage.setItem('authToken', response.token);
        api.setAuthToken(response.token);
        
        // Set user and session
        setUser(response.user);
        setUserRoles([response.user.role]);
        setSession({
          user: response.user,
          token: response.token,
          expires_at: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
        });

        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully.",
        });

        return { error: null };
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (error: any) {
      console.error('Login failed:', error);
      
      const errorMessage = error.message || 'Login failed. Please check your credentials.';
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });

      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // For now, we'll just show a message since signup might not be enabled
      toast({
        title: "Sign Up",
        description: "Please contact your administrator to create an account.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Sign up failed:', error);
      
      toast({
        title: "Sign Up Failed",
        description: error.message || 'Failed to create account.',
        variant: "destructive",
      });

      return { error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      // Call logout endpoint
      await api.auth.logout();
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Clear local state regardless of API call success
      localStorage.removeItem('authToken');
      api.clearAuthToken();
      setUser(null);
      setSession(null);
      setUserRoles([]);
      setMember(null);
      
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    }
  };

  const sendMagicLink = async (email: string) => {
    try {
      setLoading(true);
      
      toast({
        title: "Magic Link",
        description: "Magic link functionality is not currently enabled. Please use email/password login.",
      });

      return { error: null };
    } catch (error: any) {
      console.error('Magic link failed:', error);
      
      toast({
        title: "Magic Link Failed",
        description: error.message || 'Failed to send magic link.',
        variant: "destructive",
      });

      return { error };
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    userRoles,
    member,
    isAdmin,
    isModerator,
    isMember,
    signIn,
    signUp,
    signOut,
    sendMagicLink,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
