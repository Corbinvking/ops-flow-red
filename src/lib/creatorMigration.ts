import { supabase } from '@/integrations/supabase/client';
import { getCreators } from './localStorage';
import { toast } from '@/hooks/use-toast';

export const migrateCreatorsToSupabase = async () => {
  try {
    console.log('🔄 Starting creator migration from localStorage to Supabase...');
    
    // Get creators from localStorage
    const localCreators = await getCreators();
    console.log(`📊 Found ${localCreators.length} creators in localStorage`);
    
    if (localCreators.length === 0) {
      console.log('ℹ️ No creators found in localStorage to migrate');
      return { success: true, migrated: 0 };
    }

    // Check if creators already exist in Supabase
    const { data: existingCreators, error: fetchError } = await supabase
      .from('creators')
      .select('instagram_handle');

    if (fetchError) {
      console.error('Error checking existing creators:', fetchError);
      throw fetchError;
    }

    const existingHandles = new Set(existingCreators?.map(c => c.instagram_handle) || []);
    
    // Filter out creators that already exist
    const creatorsToMigrate = localCreators.filter(creator => 
      !existingHandles.has(creator.instagram_handle)
    );

    console.log(`📝 Migrating ${creatorsToMigrate.length} new creators to Supabase...`);

    if (creatorsToMigrate.length === 0) {
      console.log('ℹ️ All creators already exist in Supabase');
      return { success: true, migrated: 0 };
    }

    // Transform creators for Supabase format with intelligent rate defaults
    const supabaseCreators = creatorsToMigrate.map(creator => {
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
        instagram_handle: creator.instagram_handle,
        email: creator.email || null,
        base_country: creator.base_country,
        followers: creator.followers || 0,
        median_views_per_video: creator.median_views_per_video || 0,
        engagement_rate: creator.engagement_rate || 0,
        reel_rate: creator.reel_rate || defaultRate,
        carousel_rate: creator.carousel_rate || Math.round(defaultRate * 0.8),
        story_rate: creator.story_rate || Math.round(defaultRate * 0.6),
        content_types: creator.content_types || [],
        music_genres: creator.music_genres || [],
        audience_territories: creator.audience_countries || []
      };
    });

    // Insert creators into Supabase
    const { error: insertError } = await supabase
      .from('creators')
      .insert(supabaseCreators);

    if (insertError) {
      console.error('Error inserting creators into Supabase:', insertError);
      throw insertError;
    }

    console.log(`✅ Successfully migrated ${creatorsToMigrate.length} creators to Supabase`);
    
    return { success: true, migrated: creatorsToMigrate.length };
  } catch (error) {
    console.error('❌ Creator migration failed:', error);
    return { success: false, error };
  }
};

export const getSupabaseCreators = async () => {
  const { data: creators, error } = await supabase
    .from('creators')
    .select('*')
    .order('instagram_handle');

  if (error) {
    console.error('Error fetching creators from Supabase:', error);
    throw error;
  }

  // Map Supabase creator format to UI Creator format
  return (creators || []).map(creator => ({
    ...creator,
    audience_countries: creator.audience_territories || [], // Map territories to countries for UI compatibility
    created_at: creator.created_at || new Date().toISOString(),
    updated_at: creator.updated_at || new Date().toISOString()
  }));
};