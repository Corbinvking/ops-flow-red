// SoundCloud Data Hook
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface SCCampaign {
  id: string;
  trackInfo: string;
  client: string;
  service: string;
  goal: number;
  remaining: number;
  status: string;
  url: string;
  submitDate: string;
  startDate: string;
  receipts: string;
  owner: string;
  notes: string;
}

export const useSCData = (view: string = 'All Campaigns') => {
  const [campaigns, setCampaigns] = useState<SCCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // For now, return mock data that matches the expected structure
      const mockCampaigns: SCCampaign[] = [
        {
          id: 'sc-001',
          trackInfo: 'Summer Vibes - Luna Grace',
          client: 'Indie Records Ltd',
          service: 'Reposts',
          goal: 500,
          remaining: 150,
          status: 'active',
          url: 'https://soundcloud.com/luna-grace/summer-vibes',
          submitDate: '2024-01-15',
          startDate: '2024-01-20',
          receipts: 'pending',
          owner: 'Sarah Chen',
          notes: 'High priority campaign'
        },
        {
          id: 'sc-002',
          trackInfo: 'Electric Nights - The Reverb',
          client: 'Beat Productions',
          service: 'Likes',
          goal: 1200,
          remaining: 800,
          status: 'in_progress',
          url: 'https://soundcloud.com/the-reverb/electric-nights',
          submitDate: '2024-01-18',
          startDate: '2024-01-22',
          receipts: 'received',
          owner: 'Marcus Johnson',
          notes: 'Standard campaign'
        },
        {
          id: 'sc-003',
          trackInfo: 'Midnight Dreams - Synth Wave',
          client: 'Urban Sound Group',
          service: 'Reposts',
          goal: 750,
          remaining: 0,
          status: 'complete',
          url: 'https://soundcloud.com/synth-wave/midnight-dreams',
          submitDate: '2024-01-10',
          startDate: '2024-01-12',
          receipts: 'received',
          owner: 'Emma Rodriguez',
          notes: 'Completed successfully'
        }
      ];

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCampaigns(mockCampaigns);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch campaigns';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateCampaign = async (id: string, updates: Partial<SCCampaign>) => {
    try {
      // Optimistic update
      setCampaigns(prev => 
        prev.map(campaign => 
          campaign.id === id ? { ...campaign, ...updates } : campaign
        )
      );

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      toast({
        title: "Campaign Updated",
        description: "Changes have been saved successfully",
      });
    } catch (err) {
      // Rollback on error
      await fetchCampaigns();
      toast({
        title: "Update Failed",
        description: "Failed to update campaign",
        variant: "destructive",
      });
    }
  };

  const bulkUpdate = async (recordIds: string[], updates: Partial<SCCampaign>) => {
    try {
      // Optimistic update
      setCampaigns(prev => 
        prev.map(campaign => 
          recordIds.includes(campaign.id) ? { ...campaign, ...updates } : campaign
        )
      );

      // Simulate chunked API calls
      const chunks = Math.ceil(recordIds.length / 10);
      for (let i = 0; i < chunks; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log(`✅ Batch ${i + 1}/${chunks} completed`);
      }
      
      toast({
        title: "Bulk Update Complete",
        description: `Updated ${recordIds.length} campaigns successfully`,
      });
    } catch (err) {
      // Rollback on error
      await fetchCampaigns();
      toast({
        title: "Bulk Update Failed",
        description: "Failed to update campaigns",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, [view]);

  return {
    campaigns,
    loading,
    error,
    refetch: fetchCampaigns,
    updateCampaign,
    bulkUpdate
  };
};