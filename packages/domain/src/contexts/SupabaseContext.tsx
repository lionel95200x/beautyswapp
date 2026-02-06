import { createContext, useContext } from 'react';
import type { SupabaseClient } from '@supabase/supabase-js';

const SupabaseContext = createContext<SupabaseClient | null>(null);

export function SupabaseProvider({
  client,
  children,
}: {
  client: SupabaseClient;
  children: React.ReactNode;
}) {
  return <SupabaseContext.Provider value={client}>{children}</SupabaseContext.Provider>;
}

export function useSupabaseClient() {
  const client = useContext(SupabaseContext);
  if (!client) {
    throw new Error('useSupabaseClient must be used within SupabaseProvider');
  }
  return client;
}
