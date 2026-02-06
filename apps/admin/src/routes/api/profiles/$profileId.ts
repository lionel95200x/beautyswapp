import { createFileRoute } from '@tanstack/react-router';
import { getProfileById } from '@beautyswapp/domain/services/profile.service';

export const Route = createFileRoute('/api/profiles/$profileId')({
  server: {
    handlers: {
      GET: async ({ params }) => {
        const profile = await getProfileById(params.profileId);

        if (!profile) {
          return new Response('Profile not found', { status: 404 });
        }

        return Response.json(profile);
      },
    },
  },
});
