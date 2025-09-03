import React, { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mock user and session types
interface User {
  id: string;
  email: string;
}

interface Session {
  user: User;
}

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
  const [loading, setLoading] = useState(false); // Start as false since we're not loading
  const [userRoles, setUserRoles] = useState<string[]>(['admin']); // Default to admin for demo
  const [member, setMember] = useState<Member | null>({
    id: '1',
    name: 'Demo User',
    primary_email: 'demo@artistinfluence.com',
    emails: ['demo@artistinfluence.com'],
    status: 'active',
    size_tier: 'premium',
    monthly_repost_limit: 50,
    submissions_this_month: 12,
    net_credits: 150,
    soundcloud_url: 'https://soundcloud.com/demo',
    spotify_url: 'https://open.spotify.com/user/demo',
    families: ['Electronic', 'Hip-Hop'],
    soundcloud_followers: 5000
  });
  const { toast } = useToast();

  const isAdmin = userRoles.includes('admin');
  const isModerator = userRoles.includes('moderator');
  const isMember = member !== null;

  // Mock authentication functions
  const signIn = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful login
    const mockUser: User = { id: '1', email };
    const mockSession: Session = { user: mockUser };
    
    setUser(mockUser);
    setSession(mockSession);
    
    toast({
      title: "Success",
      description: "Signed in successfully",
    });
    
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful signup
    const mockUser: User = { id: '1', email };
    const mockSession: Session = { user: mockUser };
    
    setUser(mockUser);
    setSession(mockSession);
    
    toast({
      title: "Success",
      description: "Account created successfully",
    });
    
    return { error: null };
  };

  const signOut = async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser(null);
    setSession(null);
    
    toast({
      title: "Success",
      description: "Signed out successfully",
    });
  };

  const sendMagicLink = async (email: string) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Magic Link Sent",
      description: `Check your email at ${email}`,
    });
    
    return { error: null };
  };

  // Initialize with mock data for demo purposes
  useEffect(() => {
    const mockUser: User = { id: '1', email: 'demo@artistinfluence.com' };
    const mockSession: Session = { user: mockUser };
    
    setUser(mockUser);
    setSession(mockSession);
  }, []);

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
