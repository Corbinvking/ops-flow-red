import { getCreators } from './localStorage';
import { toast } from '@/hooks/use-toast';
import { useAirtableData, AIRTABLE_TABLES } from '@/hooks/useAirtableData';

export const migrateCreatorsToAirtable = async () => {
  try {
    console.log('🔄 Starting creator migration from localStorage to Airtable...');
    
    // Get creators from localStorage
    const localCreators = await getCreators();
    console.log(`📊 Found ${localCreators.length} creators in localStorage`);
    
    if (localCreators.length === 0) {
      console.log('ℹ️ No creators found in localStorage to migrate');
      return { success: true, migrated: 0 };
    }

    // Transform creators for Airtable format with intelligent rate defaults
    const airtableCreators = localCreators.map(creator => {
      // Calculate reasonable rate defaults based on follower count if missing
      const getDefaultRate = (followers: number) => {
        if (followers >= 1000000) return 800; // 1M+ followers
        if (followers >= 500000) return 400;  // 500K+ followers  
        if (followers >= 100000) return 200;  // 100K+ followers
        if (followers >= 50000) return 100;   // 50K+ followers
        if (followers >= 10000) return 50;    // 10K+ followers
        return 25; // Under 10K followers
      };

      const defaultRate = getDefaultRate(creator.followers || 0);
      
      return {
        fields: {
          'Instagram Handle': creator.instagram_handle,
          'Email': creator.email || '',
          'Country': creator.base_country,
          'Followers': creator.followers || 0,
          'Median Views': creator.median_views_per_video || 0,
          'Engagement Rate': creator.engagement_rate || 0,
          'Reel Rate': creator.reel_rate || defaultRate,
          'Carousel Rate': creator.carousel_rate || Math.round(defaultRate * 0.8),
          'Story Rate': creator.story_rate || Math.round(defaultRate * 0.6),
          'Content Types': creator.content_types || [],
          'Music Genres': creator.music_genres || [],
          'Audience Territories': creator.audience_countries || []
        }
      };
    });

    // For now, just return the transformed data
    // In a real implementation, this would be sent to Airtable
    console.log(`✅ Successfully transformed ${airtableCreators.length} creators for Airtable`);
    
    return { success: true, migrated: airtableCreators.length, data: airtableCreators };
  } catch (error) {
    console.error('❌ Creator migration failed:', error);
    return { success: false, error };
  }
};

export const getAirtableCreators = async () => {
  // For now, just return an empty array
  // In a real implementation, this would fetch from Airtable
  return [];
};