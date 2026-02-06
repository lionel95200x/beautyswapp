import { useQuery } from '@tanstack/react-query';
import type { Profile } from '../types';

export function useProfiles() {
  return useQuery<Profile[]>({
    queryKey: ['profiles'],
    queryFn: async () => {
      const response = await fetch('/api/profiles');

      if (!response.ok) {
        throw new Error('Failed to fetch profiles');
      }

      return response.json();
    },
  });
}
