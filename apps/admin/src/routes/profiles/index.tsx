import { createFileRoute, Link } from '@tanstack/react-router';
import { useProfiles } from '@beautyswapp/domain/hooks/useProfiles';
import { Users } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { PageLayout } from '@/components/ui/page-layout';
import { PageHeader } from '@/components/ui/page-header';
import { LoadingState } from '@/components/ui/loading-state';
import { ErrorState } from '@/components/ui/error-state';
import { EmptyState } from '@/components/ui/empty-state';

export const Route = createFileRoute('/profiles/')({
  component: ProfilesPage,
});

function ProfilesPage() {
  const { data: profiles, isLoading, error } = useProfiles();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  if (!profiles) {
    return null;
  }

  return (
    <PageLayout>
      <PageHeader
        title="Profils"
        description="Liste des profils utilisateurs sur BeautySwapp"
      />

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Date de création</TableHead>
              <TableHead>Dernière mise à jour</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profiles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>
                  <EmptyState icon={Users} message="Aucun profil trouvé" />
                </TableCell>
              </TableRow>
            ) : (
              profiles.map((profile) => (
                <TableRow key={profile.id}>
                  <TableCell>
                    <Link
                      to="/profiles/$profileId"
                      params={{ profileId: profile.id }}
                      className="font-mono text-sm truncate max-w-xs hover:underline hover:text-primary"
                    >
                      {profile.id}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{profile.role}</Badge>
                  </TableCell>
                  <TableCell>
                    {profile.isSuspended ? (
                      <Badge variant="destructive">Suspendu</Badge>
                    ) : (
                      <Badge variant="default">Actif</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(profile.createdAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {new Date(profile.updatedAt).toLocaleDateString('fr-FR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>
    </PageLayout>
  );
}
