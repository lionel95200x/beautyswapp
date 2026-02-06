import { Link } from '@tanstack/react-router';
import { Button } from './ui/button';
import { LogOut, Package } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@beautyswapp/domain/hooks/useAuth';
import { LoginDialog } from './LoginDialog';

export default function Header() {
  const { user, isAuthenticated, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Déconnexion réussie');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <header className="border-b bg-background">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold hover:opacity-80">
            <Package className="h-6 w-6" />
            BeautySwapp
          </Link>
          <nav className="hidden md:flex gap-4">
            <Link
              to="/products"
              className="text-sm hover:text-primary transition-colors"
              activeProps={{ className: 'text-primary font-semibold' }}
            >
              Produits
            </Link>
            <Link
              to="/orders"
              className="text-sm hover:text-primary transition-colors"
              activeProps={{ className: 'text-primary font-semibold' }}
            >
              Commande
            </Link>
            <Link
              to="/profiles"
              className="text-sm hover:text-primary transition-colors"
              activeProps={{ className: 'text-primary font-semibold' }}
            >
              Profiles
            </Link>
          </nav>
        </div>

        {isAuthenticated ? (
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">{user!.email}</span>
            <Button variant="outline" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        ) : (
          <LoginDialog />
        )}
      </div>
    </header>
  );
}
