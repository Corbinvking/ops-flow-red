import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface IGPost {
  id: string;
  caption: string;
  mediaUrl: string;
  owner: string;
  status: 'backlog' | 'in_progress' | 'needs_qa' | 'done';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  sendFinalReport?: boolean;
}

export const useIGData = (view: string = 'Board') => {
  const [posts, setPosts] = useState<IGPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = async () => {
    try {
      setLoading(true);
      
      const mockPosts: IGPost[] = [
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
        },
        {
          id: 'ig-003',
          caption: 'Exciting collaboration announcement coming soon! 🔥 Stay tuned for something special.',
          mediaUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
          owner: 'Emma Rodriguez',
          status: 'needs_qa',
          priority: 'high',
          dueDate: '2024-01-24',
          createdAt: '2024-01-19T15:00:00Z',
          updatedAt: '2024-01-23T10:00:00Z',
          tags: ['collaboration', 'announcement', 'comingsoon']
        },
        {
          id: 'ig-004',
          caption: 'Thank you to everyone who came out to the show last night! 🙏 Your energy was incredible!',
          mediaUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=400',
          owner: 'Sarah Chen',
          status: 'done',
          priority: 'low',
          dueDate: '2024-01-22',
          createdAt: '2024-01-18T20:00:00Z',
          updatedAt: '2024-01-22T12:00:00Z',
          tags: ['concert', 'thankyou', 'live']
        }
      ];

      await new Promise(resolve => setTimeout(resolve, 300));
      setPosts(mockPosts);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updatePost = async (id: string, updates: Partial<IGPost>) => {
    try {
      setPosts(prev => 
        prev.map(post => 
          post.id === id ? { ...post, ...updates, updatedAt: new Date().toISOString() } : post
        )
      );

      await new Promise(resolve => setTimeout(resolve, 200));
      
      toast({
        title: "Post Updated",
        description: "Changes have been saved successfully",
      });
    } catch (err) {
      await fetchPosts();
      toast({
        title: "Update Failed",
        description: "Failed to update post",
        variant: "destructive",
      });
    }
  };

  const bulkUpdate = async (recordIds: string[], updates: Partial<IGPost>) => {
    try {
      setPosts(prev => 
        prev.map(post => 
          recordIds.includes(post.id) ? { ...post, ...updates, updatedAt: new Date().toISOString() } : post
        )
      );

      const chunks = Math.ceil(recordIds.length / 10);
      for (let i = 0; i < chunks; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      toast({
        title: "Bulk Update Complete",
        description: `Updated ${recordIds.length} posts successfully`,
      });
    } catch (err) {
      await fetchPosts();
      toast({
        title: "Bulk Update Failed",
        description: "Failed to update posts",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [view]);

  return {
    posts,
    loading,
    refetch: fetchPosts,
    updatePost,
    bulkUpdate
  };
};