import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import gamelanHero from "@/assets/gamelan-hero.jpg";
import parangPattern from "@/assets/parang-pattern.png";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user, signIn, signUp } = useAuth();
  const { toast } = useToast();

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Login Gagal",
        description: error.message === "Invalid login credentials" 
          ? "Email atau kata sandi salah." 
          : error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Selamat Datang!",
        description: "Anda berhasil masuk."
      });
      navigate("/");
    }

    setIsLoading(false);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (password.length < 6) {
      toast({
        title: "Pendaftaran Gagal",
        description: "Kata sandi minimal 6 karakter.",
        variant: "destructive"
      });
      setIsLoading(false);
      return;
    }

    const { error } = await signUp(email, password, fullName);

    if (error) {
      let message = error.message;
      if (error.message.includes("already registered")) {
        message = "Email sudah terdaftar. Silakan login.";
      }
      toast({
        title: "Pendaftaran Gagal",
        description: message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Pendaftaran Berhasil!",
        description: "Akun Anda berhasil dibuat. Anda sekarang masuk."
      });
      navigate("/");
    }

    setIsLoading(false);
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: "Segera Hadir",
      description: `Login dengan ${provider} akan segera tersedia.`
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Visual Anchor */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src={gamelanHero}
          alt="Gamelan Heritage"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/85 to-wood-brown-800/80" />
        <div className="relative z-10 flex items-center justify-center p-12">
          <blockquote className="text-center">
            <p className="font-display text-4xl text-royal-gold-400 leading-relaxed italic">
              "Menyatu dengan Irama,<br />Menjaga Warisan Budaya."
            </p>
          </blockquote>
        </div>
      </div>

      {/* Right Side - Interaction Area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center relative bg-background">
        {/* Subtle Batik Pattern Background */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url(${parangPattern})`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
        />

        <div className="relative z-10 w-full max-w-md px-8 py-12">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="font-display text-4xl text-foreground mb-2">
              Selamat Datang
            </h1>
            <p className="text-muted-foreground">
              Temukan harmoni gamelan yang sempurna untuk Anda
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger
                value="login"
                className="data-[state=active]:border-b-2 data-[state=active]:border-royal-gold-500 rounded-none"
              >
                Masuk
              </TabsTrigger>
              <TabsTrigger
                value="register"
                className="data-[state=active]:border-b-2 data-[state=active]:border-royal-gold-500 rounded-none"
              >
                Daftar
              </TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-border pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-royal-gold-600 hover:text-royal-gold-700 transition-colors"
                  >
                    Lupa Kata Sandi?
                  </Link>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-royal-gold-400 font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Masuk Sekarang"
                  )}
                </Button>
              </form>
            </TabsContent>

            {/* Register Form */}
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="register-name" className="text-foreground">
                    Full Name
                  </Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Nama Lengkap"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email" className="text-foreground">
                    Email Address
                  </Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="nama@email.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-border"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-password" className="text-foreground">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="register-password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-border pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground">Minimal 6 karakter</p>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-royal-gold-400 font-semibold"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Memproses...
                    </>
                  ) : (
                    "Buat Akun"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">
                Atau masuk dengan
              </span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Google")}
              className="border-border hover:border-royal-gold-500 hover:text-royal-gold-700 transition-all"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Facebook")}
              className="border-border hover:border-royal-gold-500 hover:text-royal-gold-700 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Twitter")}
              className="border-border hover:border-royal-gold-500 hover:text-royal-gold-700 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Twitter
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => handleSocialLogin("Apple")}
              className="border-border hover:border-royal-gold-500 hover:text-royal-gold-700 transition-all"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Apple
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
