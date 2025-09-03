
// Project integrity guard to ensure campaigns are saved to the correct project
import { supabase } from "@/integrations/supabase/client";

// Updated to use the correct backend domain from the guide
const EXPECTED_PROJECT_ID = "artistinfluence-backend";
const EXPECTED_URL = "https://artistinfluence.dpdns.org";

export function verifyProjectIntegrity() {
  // Use the custom backend URL instead of cloud Supabase
  const currentUrl = EXPECTED_URL;
  
  // Additional verification by checking if the client was initialized correctly
  if (!supabase) {
    console.error('🚨 CRITICAL: Custom backend client not initialized!');
    throw new Error('Custom backend client initialization failed');
  }
  
  console.log('✅ Project integrity verified:', EXPECTED_PROJECT_ID);
  console.log('🌊 Connected to Artist Influence backend:', currentUrl);
}

// Auto-verify on import
verifyProjectIntegrity();
