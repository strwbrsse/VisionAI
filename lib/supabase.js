import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

// DO NOT import polyfill globally in Expo Router apps
// ❌ remove: import "react-native-url-polyfill/auto";

const SUPABASE_URL =
  "https://iwrfrfdulocngbbyhgfx.supabase.co";

const SUPABASE_ANON_KEY =
  "sb_publishable_rdRWVL_7RR0uyILf1vRQJg_mCNjHMyF";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      persistSession: false, // 🔥 IMPORTANT FIX
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  }
);