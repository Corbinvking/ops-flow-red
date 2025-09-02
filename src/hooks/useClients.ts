import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Client, ClientCredit } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { APP_CAMPAIGN_SOURCE, APP_CAMPAIGN_TYPE } from '@/lib/constants';

export function useClients() {
  return useQuery({
    queryKey: ['clients', APP_CAMPAIGN_SOURCE, APP_CAMPAIGN_TYPE],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          campaigns!client_id(id, status, source, campaign_type)
        `)
        .order('name');
      
      if (error) throw error;
      
      // Transform the data to include campaign counts - only count relevant campaigns
      const clientsWithCampaignCounts = data.map(client => ({
        ...client,
        activeCampaignsCount: client.campaigns?.filter((c: any) => 
          c.status === 'active' && 
          c.source === APP_CAMPAIGN_SOURCE && 
          c.campaign_type === APP_CAMPAIGN_TYPE
        ).length || 0,
        totalCampaignsCount: client.campaigns?.filter((c: any) => 
          c.source === APP_CAMPAIGN_SOURCE && 
          c.campaign_type === APP_CAMPAIGN_TYPE
        ).length || 0,
      }));
      
      return clientsWithCampaignCounts;
    },
  });
}

export function useClient(clientId: string) {
  return useQuery({
    queryKey: ['client', clientId, APP_CAMPAIGN_SOURCE, APP_CAMPAIGN_TYPE],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('clients')
        .select(`
          *,
          campaigns:campaigns!client_id(*)
        `)
        .eq('id', clientId)
        .single();
      
      if (error) throw error;
      
      // Filter campaigns to only include relevant ones
      if (data.campaigns) {
        data.campaigns = data.campaigns.filter((c: any) => 
          c.source === APP_CAMPAIGN_SOURCE && 
          c.campaign_type === APP_CAMPAIGN_TYPE
        );
      }
      
      return data;
    },
    enabled: !!clientId,
  });
}

export function useCreateClient() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (client: Omit<Client, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('clients')
        .insert(client)
        .select()
        .single();
      
      if (error) throw error;
      return data as Client;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['clients', APP_CAMPAIGN_SOURCE, APP_CAMPAIGN_TYPE] });
      toast({ title: 'Client created successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error creating client', 
        description: error.message,
        variant: 'destructive'
      });
    },
  });
}

export function useUpdateClient() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Client> & { id: string }) => {
      const { data, error } = await supabase
        .from('clients')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Client;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['clients', APP_CAMPAIGN_SOURCE, APP_CAMPAIGN_TYPE] });
      toast({ title: 'Client updated successfully' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error updating client', 
        description: error.message,
        variant: 'destructive'
      });
    },
  });
}

export function useClientCredits(clientId: string) {
  return useQuery({
    queryKey: ['client-credits', clientId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('client_credits')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ClientCredit[];
    },
    enabled: !!clientId,
  });
}

export function useAddClientCredit() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (credit: Omit<ClientCredit, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('client_credits')
        .insert(credit)
        .select()
        .single();
      
      if (error) throw error;
      
      // Get current client balance and update it
      const { data: clientData, error: clientError } = await supabase
        .from('clients')
        .select('credit_balance')
        .eq('id', credit.client_id)
        .single();
      
      if (clientError) throw clientError;
      
      const newBalance = (clientData.credit_balance || 0) + credit.amount;
      
      const { error: balanceError } = await supabase
        .from('clients')
        .update({ credit_balance: newBalance })
        .eq('id', credit.client_id);
      
      if (balanceError) throw balanceError;
      
      return data as ClientCredit;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['client-credits', variables.client_id] });
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      queryClient.invalidateQueries({ queryKey: ['client', variables.client_id] });
      toast({ title: 'Credit transaction recorded' });
    },
    onError: (error) => {
      toast({ 
        title: 'Error recording credit', 
        description: error.message,
        variant: 'destructive'
      });
    },
  });
}