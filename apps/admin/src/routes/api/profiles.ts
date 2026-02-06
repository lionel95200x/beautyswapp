import { createFileRoute } from '@tanstack/react-router';
import { listAllProfiles } from '@beautyswapp/domain/services/profile.service';

export const Route = createFileRoute('/api/profiles')({
  server: {
    handlers: {
      GET: async () => {
        const profiles = await listAllProfiles();
        return Response.json(profiles);
      },
    },
  },
});
