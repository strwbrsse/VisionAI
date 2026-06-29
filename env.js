import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra ?? {};

export const SUPABASE_URL = extra.supabaseUrl;
export const SUPABASE_ANON_KEY = extra.supabaseAnonKey;
export const GEMINI_KEY = extra.geminiKey;
export const ROBOFLOW_KEY = extra.roboflowKey;
