import { v4 as uuidv4 } from 'uuid';
import { verifyProjectIntegrity } from './projectGuard';
import type { Creator as UICreator, Campaign as UICampaign, CampaignTotals } from './types';

// Helper functions
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Creator functions (stored in browser localStorage for the creator DB)
export const saveCreator = async (creator: UICreator): Promise<UICreator> => {
  const existingCreators = await getCreators();
  const finalCreator: UICreator = {
    ...creator,
    id: creator.id || uuidv4(),
  };
  localStorage.setItem('creators', JSON.stringify([...existingCreators, finalCreator]));
  return finalCreator;
};

export const getCreators = async (): Promise<UICreator[]> => {
  const creators = localStorage.getItem('creators');
  return creators ? JSON.parse(creators) : [];
};

export const updateCreator = async (id: string, updates: Partial<UICreator>): Promise<UICreator | null> => {
  const existingCreators = await getCreators();
  const updatedCreators = existingCreators.map(creator => creator.id === id ? { ...creator, ...updates } : creator);
  localStorage.setItem('creators', JSON.stringify(updatedCreators));
  
  const updatedCreator = updatedCreators.find(creator => creator.id === id) || null;
  return updatedCreator;
};

export const deleteCreator = async (id: string): Promise<void> => {
  const existingCreators = await getCreators();
  const filteredCreators = existingCreators.filter(creator => creator.id !== id);
  localStorage.setItem('creators', JSON.stringify(filteredCreators));
};

export const importCreators = async (creators: UICreator[]): Promise<void> => {
  const existingCreators = await getCreators();
  const allCreators = [...existingCreators];
  
  creators.forEach(newCreator => {
    const existingIndex = allCreators.findIndex(c => c.instagram_handle === newCreator.instagram_handle);
    if (existingIndex >= 0) {
      allCreators[existingIndex] = { ...allCreators[existingIndex], ...newCreator };
    } else {
      allCreators.push({ ...newCreator, id: newCreator.id || uuidv4() });
    }
  });
  
  localStorage.setItem('creators', JSON.stringify(allCreators));
};

// Campaign functions (using localStorage for now)
export const saveCampaign = async (campaign: Omit<UICampaign, 'id' | 'date_created'>): Promise<string> => {
  const id = uuidv4();
  const now = new Date().toISOString();
  const newCampaign: UICampaign = { id, date_created: now, ...campaign };
  const existingCampaigns = await getCampaigns();
  localStorage.setItem('campaigns', JSON.stringify([...existingCampaigns, newCampaign]));
  return id;
};

export const getCampaigns = async (): Promise<UICampaign[]> => {
  const campaigns = localStorage.getItem('campaigns');
  return campaigns ? JSON.parse(campaigns) : [];
};

export const updateCampaign = async (id: string, updates: Partial<UICampaign>): Promise<void> => {
  const existingCampaigns = await getCampaigns();
  const updatedCampaigns = existingCampaigns.map(c =>
    c.id === id ? { ...c, ...updates } : c
  );
  localStorage.setItem('campaigns', JSON.stringify(updatedCampaigns));
};

export const deleteCampaign = async (id: string): Promise<void> => {
  const existingCampaigns = await getCampaigns();
  const filteredCampaigns = existingCampaigns.filter(c => c.id !== id);
  localStorage.setItem('campaigns', JSON.stringify(filteredCampaigns));
};