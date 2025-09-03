import { useState, useEffect, useCallback, useContext } from 'react';
import { api } from '@/lib/api';
import { DBUser, CreateUserData, UpdateUserData, UserStats } from '@/types';
import { AuthContext } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useUserManagement = () => {
  const [users, setUsers] = useState<DBUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats | null>(null);
  const { toast } = useToast();
  const { user: currentUser, refreshUser } = useContext(AuthContext);

  // Fetch all users
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.users.getAll();
      setUsers(data);
      
      // Calculate stats
      const totalUsers = data.length;
      const usersByRole = data.reduce((acc, user) => {
        acc[user.role] = (acc[user.role] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);
      const recentLogins = data.filter(user => {
        if (!user.last_login) return false;
        const lastLogin = new Date(user.last_login);
        const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        return lastLogin > oneWeekAgo;
      }).length;

      setStats({
        totalUsers,
        usersByRole,
        recentLogins
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users');
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  // Create new user
  const createUser = useCallback(async (userData: CreateUserData) => {
    try {
      const newUser = await api.users.create(userData);
      setUsers(prev => [newUser, ...prev]);
      
      // Update stats
      if (stats) {
        setStats(prev => prev ? {
          ...prev,
          totalUsers: prev.totalUsers + 1,
          usersByRole: {
            ...prev.usersByRole,
            [userData.role]: (prev.usersByRole[userData.role] || 0) + 1
          }
        } : null);
      }

      toast({
        title: 'User created',
        description: `User ${userData.email} has been created successfully.`,
      });
      
      return newUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create user';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  }, [stats, toast]);

  // Update user
  const updateUser = useCallback(async (userId: string, userData: UpdateUserData) => {
    try {
      const updatedUser = await api.users.update(userId, userData);
      setUsers(prev => prev.map(user => 
        user.id === userId ? updatedUser : user
      ));

      // Update stats if role changed
      if (stats && userData.role) {
        setStats(prev => {
          if (!prev) return null;
          
          let newStats = { ...prev };
          
          // If role changed, update role counts
          const oldUser = users.find(u => u.id === userId);
          if (oldUser) {
            newStats.usersByRole = { ...prev.usersByRole };
            newStats.usersByRole[oldUser.role] = Math.max(0, (newStats.usersByRole[oldUser.role] || 0) - 1);
            newStats.usersByRole[userData.role] = (newStats.usersByRole[userData.role] || 0) + 1;
          }
          
          return newStats;
        });
      }

      // If the updated user is the current user, refresh the auth context
      if (currentUser && currentUser.id === userId) {
        await refreshUser();
      }

      toast({
        title: 'User updated',
        description: `User ${updatedUser.email} has been updated successfully.`,
      });
      
      return updatedUser;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update user';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  }, [stats, users, toast]);

  // Delete user
  const deleteUser = useCallback(async (userId: string) => {
    try {
      await api.users.delete(userId);
      const deletedUser = users.find(u => u.id === userId);
      
      setUsers(prev => prev.filter(user => user.id !== userId));
      
      // Update stats
      if (stats && deletedUser) {
        setStats(prev => prev ? {
          ...prev,
          totalUsers: prev.totalUsers - 1,
          usersByRole: {
            ...prev.usersByRole,
            [deletedUser.role]: Math.max(0, (prev.usersByRole[deletedUser.role] || 0) - 1)
          }
        } : null);
      }

      toast({
        title: 'User deleted',
        description: `User ${deletedUser?.email || 'Unknown'} has been deleted successfully.`,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete user';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  }, [stats, users, toast]);

  // Change user password
  const changePassword = useCallback(async (userId: string, password: string) => {
    try {
      await api.users.changePassword(userId, password);
      toast({
        title: 'Password updated',
        description: 'User password has been updated successfully.',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update password';
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });
      throw err;
    }
  }, [toast]);

  // Bulk operations
  const bulkUpdateUsers = useCallback(async (userIds: string[], updates: UpdateUserData) => {
    try {
      const promises = userIds.map(userId => updateUser(userId, updates));
      await Promise.all(promises);
      
      toast({
        title: 'Bulk update completed',
        description: `${userIds.length} users have been updated successfully.`,
      });
    } catch (err) {
      toast({
        title: 'Bulk update failed',
        description: 'Some users could not be updated.',
        variant: 'destructive',
      });
    }
  }, [updateUser, toast]);

  const bulkDeleteUsers = useCallback(async (userIds: string[]) => {
    try {
      const promises = userIds.map(userId => deleteUser(userId));
      await Promise.all(promises);
      
      toast({
        title: 'Bulk delete completed',
        description: `${userIds.length} users have been deleted successfully.`,
      });
    } catch (err) {
      toast({
        title: 'Bulk delete failed',
        description: 'Some users could not be deleted.',
        variant: 'destructive',
      });
    }
  }, [deleteUser, toast]);

  // Filter and search users
  const getFilteredUsers = useCallback((filters: {
    role?: string;
    search?: string;
  }) => {
    return users.filter(user => {
      if (filters.role && user.role !== filters.role) return false;
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          user.email.toLowerCase().includes(searchLower) ||
          (user.first_name && user.first_name.toLowerCase().includes(searchLower)) ||
          (user.last_name && user.last_name.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }
      return true;
    });
  }, [users]);

  // Initialize
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return {
    users,
    loading,
    error,
    stats,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser,
    changePassword,
    bulkUpdateUsers,
    bulkDeleteUsers,
    getFilteredUsers,
  };
};
