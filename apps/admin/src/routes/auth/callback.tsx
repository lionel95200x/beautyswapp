import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useSupabaseClient } from '@beautyswapp/domain/contexts/SupabaseContext';
import { toast } from 'sonner';


export const Route = createFileRoute('/auth/callback')({
  component: AuthCallback,
});

function AuthCallback() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        toast.success('Connexion réussie avec Google');
        navigate({ to: '/' });
      } else if (event === 'SIGNED_OUT') {
        navigate({ to: '/' });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, supabase]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Connexion en cours...</p>
      </div>
    </div>
  );
}
