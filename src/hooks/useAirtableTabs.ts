import { useAirtableData, useAirtableHealth, useAirtableSync } from './useAirtableData';

// Specialized hooks for each UI tab with table-specific configurations

// Spotify Playlisting Tab
export const useSpotifyPlaylisting = () => {
  const airtableData = useAirtableData('spotify');
  
  // Spotify-specific computed values
  const activeCampaigns = airtableData.data.filter(record => 
    record.fields.Status === 'Active' || record.fields.Status === 'In Progress'
  );
  
  const completedCampaigns = airtableData.data.filter(record => 
    record.fields.Status === 'Completed' || record.fields.Status === 'Done'
  );
  
  const totalRevenue = airtableData.data.reduce((sum, record) => {
    const price = parseFloat(record.fields['Sale price']) || 0;
    return sum + price;
  }, 0);
  
  const averagePrice = airtableData.data.length > 0 
    ? totalRevenue / airtableData.data.length 
    : 0;

  return {
    ...airtableData,
    // Spotify-specific data
    activeCampaigns,
    completedCampaigns,
    totalRevenue,
    averagePrice,
    // Computed stats
    stats: {
      total: airtableData.data.length,
      active: activeCampaigns.length,
      completed: completedCampaigns.length,
      totalRevenue,
      averagePrice
    }
  };
};

// Instagram Seeding Tab
export const useInstagramSeeding = () => {
  const airtableData = useAirtableData('instagram');
  
  // Instagram-specific computed values
  const activeCampaigns = airtableData.data.filter(record => 
    record.fields.status === 'Active' || record.fields.status === 'In Progress'
  );
  
  const totalSpend = airtableData.data.reduce((sum, record) => {
    const spend = parseFloat(record.fields.spend) || 0;
    return sum + spend;
  }, 0);
  
  const totalRemaining = airtableData.data.reduce((sum, record) => {
    const remaining = parseFloat(record.fields.remaining) || 0;
    return sum + remaining;
  }, 0);
  
  const averageSpend = airtableData.data.length > 0 
    ? totalSpend / airtableData.data.length 
    : 0;

  return {
    ...airtableData,
    // Instagram-specific data
    activeCampaigns,
    totalSpend,
    totalRemaining,
    averageSpend,
    // Computed stats
    stats: {
      total: airtableData.data.length,
      active: activeCampaigns.length,
      totalSpend,
      totalRemaining,
      averageSpend
    }
  };
};

// SoundCloud Tab
export const useSoundCloudTracks = () => {
  const airtableData = useAirtableData('soundcloud');
  
  // SoundCloud-specific computed values
  const activeTracks = airtableData.data.filter(record => 
    record.fields.status === 'Active' || record.fields.status === 'In Progress'
  );
  
  const completedTracks = airtableData.data.filter(record => 
    record.fields.status === 'Completed' || record.fields.status === 'Done'
  );
  
  const totalRevenue = airtableData.data.reduce((sum, record) => {
    const price = parseFloat(record.fields.sale_price) || 0;
    return sum + price;
  }, 0);
  
  const serviceTypes = [...new Set(airtableData.data.map(record => record.fields.service_type))];

  return {
    ...airtableData,
    // SoundCloud-specific data
    activeTracks,
    completedTracks,
    totalRevenue,
    serviceTypes,
    // Computed stats
    stats: {
      total: airtableData.data.length,
      active: activeTracks.length,
      completed: completedTracks.length,
      totalRevenue,
      serviceTypes: serviceTypes.length
    }
  };
};

// YouTube Analytics Tab
export const useYouTubeAnalytics = () => {
  const airtableData = useAirtableData('youtube');
  
  // YouTube-specific computed values
  const activeCampaigns = airtableData.data.filter(record => 
    record.fields.Status === 'Active' || record.fields.Status === 'In Progress'
  );
  
  const totalRevenue = airtableData.data.reduce((sum, record) => {
    const price = parseFloat(record.fields['Sale Price']) || 0;
    return sum + price;
  }, 0);
  
  const serviceTypes = [...new Set(airtableData.data.map(record => record.fields['Service Type']))];
  
  const averagePrice = airtableData.data.length > 0 
    ? totalRevenue / airtableData.data.length 
    : 0;

  return {
    ...airtableData,
    // YouTube-specific data
    activeCampaigns,
    totalRevenue,
    serviceTypes,
    averagePrice,
    // Computed stats
    stats: {
      total: airtableData.data.length,
      active: activeCampaigns.length,
      totalRevenue,
      averagePrice,
      serviceTypes: serviceTypes.length
    }
  };
};


// Dashboard overview hook that combines all data
// Alias exports for backward compatibility with Dashboard
export const useSpotifyData = useSpotifyPlaylisting;
export const useInstagramData = useInstagramSeeding;
export const useSoundCloudData = useSoundCloudTracks;
export const useYouTubeData = useYouTubeAnalytics;

export const useAirtableDashboard = () => {
  const spotify = useSpotifyPlaylisting();
  const instagram = useInstagramSeeding();
  const soundcloud = useSoundCloudTracks();
  const youtube = useYouTubeAnalytics();
  const health = useAirtableHealth();
  const sync = useAirtableSync();

  // Overall dashboard stats
  const totalCampaigns = spotify.stats.total + instagram.stats.total + soundcloud.stats.total + youtube.stats.total;
  const totalRevenue = spotify.stats.totalRevenue + soundcloud.stats.totalRevenue + youtube.stats.totalRevenue;
  const totalSpend = instagram.stats.totalSpend;

  return {
    // Individual table data
    spotify,
    instagram,
    soundcloud,
    youtube,
    health,
    sync,
    
    // Overall dashboard stats
    overview: {
      totalCampaigns,
      totalRevenue,
      totalSpend,
      pendingRequests: 0, // No invoice requests table
      isHealthy: health.health?.ok || false,
      lastSync: health.health?.monitoring?.lastSyncTime
    }
  };
};
