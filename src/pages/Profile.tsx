import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/Footer";
import parangPattern from "@/assets/parang-pattern.png";
import { User, Mail, Lock, Calendar, BarChart3, Eye, EyeOff, Save, History, LogOut, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface HistoryItem {
  id: string;
  date: string;
  resultId: string;
  resultName: string;
  certaintyFactor: number;
  image: string;
}

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, profile, loading, signOut, updateProfile, updatePassword } = useAuth();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  
  // Form states
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  // Load profile data into form
  useEffect(() => {
    if (profile) {
      setFullName(profile.full_name || "");
      setEmail(profile.email || user?.email || "");
    }
  }, [profile, user]);

  useEffect(() => {
    // Load history from localStorage
    const storedHistory = localStorage.getItem("gamelan-consultation-history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  // Calculate stats
  const totalConsultations = history.length;
  const averageCF = history.length > 0 
    ? Math.round(history.reduce((sum, item) => sum + item.certaintyFactor, 0) / history.length) 
    : 0;
  const lastConsultation = history.length > 0 
    ? new Date(history[0].date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })
    : "-";

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    const { error } = await updateProfile({ 
      full_name: fullName,
      email: email 
    });

    if (error) {
      toast({
        title: "Gagal Memperbarui Profil",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Profil Diperbarui",
        description: "Informasi profil Anda berhasil disimpan."
      });
    }

    setIsUpdatingProfile(false);
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword.length < 6) {
      toast({
        title: "Gagal",
        description: "Kata sandi baru minimal 6 karakter.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Gagal",
        description: "Konfirmasi kata sandi tidak cocok.",
        variant: "destructive"
      });
      return;
    }

    setIsUpdatingPassword(true);

    const { error } = await updatePassword(newPassword);

    if (error) {
      toast({
        title: "Gagal Memperbarui Kata Sandi",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setNewPassword("");
      setConfirmPassword("");
      toast({
        title: "Kata Sandi Diperbarui",
        description: "Kata sandi Anda berhasil diubah."
      });
    }

    setIsUpdatingPassword(false);
  };

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Berhasil Keluar",
      description: "Anda telah keluar dari akun."
    });
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-royal-gold" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main 
        className="flex-1 pt-24 pb-16 px-6"
        style={{
          backgroundImage: `url(${parangPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          opacity: 0.98
        }}
      >
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Profil Saya
            </h1>
            <p className="text-foreground/70 text-lg">
              Kelola informasi akun dan lihat ringkasan aktivitas Anda
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Profile Card */}
            <div className="lg:col-span-1 space-y-6">
              {/* User Info Card */}
              <Card className="bg-background/95 backdrop-blur-sm border-border/50 shadow-xl p-6 animate-fade-in border-l-4 border-l-royal-gold">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-royal-gold to-royal-gold-dark flex items-center justify-center shadow-lg">
                    <User className="w-12 h-12 text-wood-brown" />
                  </div>
                  <h2 className="font-display text-2xl font-bold text-foreground mb-1">
                    {profile?.full_name || "Pengguna"}
                  </h2>
                  <p className="text-foreground/60 text-sm mb-4">
                    {user.email}
                  </p>
                  <div className="flex items-center justify-center gap-2 text-foreground/50 text-xs mb-4">
                    <Calendar className="w-3 h-3" />
                    <span>Bergabung {new Date(profile?.created_at || user.created_at).toLocaleDateString("id-ID", { month: "long", year: "numeric" })}</span>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </Button>
                </div>
              </Card>

              {/* Stats Card */}
              <Card className="bg-background/95 backdrop-blur-sm border-border/50 shadow-xl p-6 animate-fade-in">
                <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-royal-gold" />
                  Ringkasan Konsultasi
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-foreground/70">Total Konsultasi</span>
                    <span className="font-display font-bold text-2xl text-royal-gold">{totalConsultations}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/30">
                    <span className="text-foreground/70">Rata-rata Kecocokan</span>
                    <span className="font-display font-bold text-2xl text-emerald">{averageCF}%</span>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-foreground/70">Konsultasi Terakhir</span>
                    <span className="font-medium text-foreground">{lastConsultation}</span>
                  </div>
                </div>
                <Separator className="my-4" />
                <Button asChild variant="outline" className="w-full border-royal-gold/30 hover:bg-royal-gold/10 hover:border-royal-gold">
                  <Link to="/riwayat" className="flex items-center gap-2">
                    <History className="w-4 h-4" />
                    Lihat Riwayat Lengkap
                  </Link>
                </Button>
              </Card>
            </div>

            {/* Right Column - Settings */}
            <div className="lg:col-span-2 space-y-6">
              {/* Profile Settings */}
              <Card className="bg-background/95 backdrop-blur-sm border-border/50 shadow-xl p-6 animate-fade-in">
                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <User className="w-5 h-5 text-royal-gold" />
                  Informasi Profil
                </h3>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground flex items-center gap-2">
                        <User className="w-4 h-4 text-foreground/60" />
                        Nama Lengkap
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nama Lengkap"
                        className="border-border bg-background/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4 text-foreground/60" />
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@example.com"
                        className="border-border bg-background/50"
                        disabled
                      />
                      <p className="text-xs text-muted-foreground">Email tidak dapat diubah</p>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      disabled={isUpdatingProfile}
                      className="bg-emerald-700 hover:bg-emerald-800 text-white"
                    >
                      {isUpdatingProfile ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Menyimpan...
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Simpan Perubahan
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>

              {/* Password Settings */}
              <Card className="bg-background/95 backdrop-blur-sm border-border/50 shadow-xl p-6 animate-fade-in">
                <h3 className="font-display text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-royal-gold" />
                  Ubah Kata Sandi
                </h3>
                <form onSubmit={handleUpdatePassword} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="new-password" className="text-foreground">
                        Kata Sandi Baru
                      </Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="••••••••"
                          className="border-border bg-background/50 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-foreground">
                        Konfirmasi Kata Sandi
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirm-password"
                          type={showNewPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="••••••••"
                          className="border-border bg-background/50 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground/50 text-sm">
                    Kata sandi minimal 6 karakter. Gunakan kombinasi huruf dan angka untuk keamanan lebih baik.
                  </p>
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      variant="outline"
                      disabled={isUpdatingPassword}
                      className="border-royal-gold/30 hover:bg-royal-gold/10 hover:border-royal-gold"
                    >
                      {isUpdatingPassword ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Memperbarui...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Perbarui Kata Sandi
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
