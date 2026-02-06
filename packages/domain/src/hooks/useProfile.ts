import { useQuery } from '@tanstack/react-query';
import type { Profile } from '../types';

export function useProfile(profileId: string) {
  return useQuery<Profile>({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      const response = await fetch(`/api/profiles/${profileId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      return response.json();
    },
    enabled: !!profileId,
  });
}
