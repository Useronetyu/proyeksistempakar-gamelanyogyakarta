import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [open, setOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal-gold to-royal-gold-dark flex items-center justify-center">
              <span className="text-wood-brown font-display font-bold text-xl">G</span>
            </div>
            <span className="font-display font-semibold text-xl text-foreground">Gamelan Yogyakarta</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Beranda
            </a>
            <a href="/#tentang" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Tentang
            </a>
            <a href="/koleksi" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Koleksi
            </a>
            <a href="/riwayat" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
              Riwayat
            </a>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 text-foreground/80 hover:text-foreground">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-royal-gold to-royal-gold-dark flex items-center justify-center">
                      <User className="w-4 h-4 text-wood-brown" />
                    </div>
                    <span className="text-sm font-medium">{profile?.full_name || 'Profil'}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/profil" className="flex items-center gap-2 cursor-pointer">
                      <User className="w-4 h-4" />
                      Profil Saya
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <a href="/auth" className="text-foreground/80 hover:text-foreground transition-colors text-sm font-medium">
                Masuk
              </a>
            )}
            
            <Button asChild variant="default" size="sm" className="bg-gradient-to-r from-royal-gold to-royal-gold-dark text-wood-brown hover:shadow-lg transition-all">
              <a href="/konsultasi">Konsultasi</a>
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] backdrop-blur-xl bg-background/95 border-l border-border/50">
              <div className="flex flex-col space-y-6 mt-8">
                <a 
                  href="/" 
                  onClick={() => setOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors text-lg font-medium py-2 border-b border-border/30"
                >
                  Beranda
                </a>
                <a 
                  href="/#tentang" 
                  onClick={() => setOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors text-lg font-medium py-2 border-b border-border/30"
                >
                  Tentang
                </a>
                <a 
                  href="/koleksi" 
                  onClick={() => setOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors text-lg font-medium py-2 border-b border-border/30"
                >
                  Koleksi
                </a>
                <a 
                  href="/riwayat" 
                  onClick={() => setOpen(false)}
                  className="text-foreground/80 hover:text-foreground transition-colors text-lg font-medium py-2 border-b border-border/30"
                >
                  Riwayat
                </a>
                
                {user ? (
                  <>
                    <a 
                      href="/profil" 
                      onClick={() => setOpen(false)}
                      className="text-foreground/80 hover:text-foreground transition-colors text-lg font-medium py-2 border-b border-border/30 flex items-center gap-2"
                    >
                      <User className="w-5 h-5" />
                      {profile?.full_name || 'Profil'}
                    </a>
                    <Button 
                      variant="ghost"
                      onClick={() => {
                        handleSignOut();
                        setOpen(false);
                      }}
                      className="justify-start text-destructive hover:text-destructive hover:bg-destructive/10 text-lg font-medium py-2"
                    >
                      <LogOut className="w-5 h-5 mr-2" />
                      Keluar
                    </Button>
                  </>
                ) : (
                  <a 
                    href="/auth" 
                    onClick={() => setOpen(false)}
                    className="text-foreground/80 hover:text-foreground transition-colors text-lg font-medium py-2 border-b border-border/30"
                  >
                    Masuk
                  </a>
                )}
                
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-royal-gold to-royal-gold-dark text-wood-brown hover:shadow-lg transition-all mt-4"
                  onClick={() => setOpen(false)}
                >
                  <a href="/konsultasi">Konsultasi</a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
