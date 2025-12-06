import { Button } from "@/components/ui/button";
import heroImage from "@/assets/gamelan-hero.jpg";
import batikPattern from "@/assets/kawung-pattern.png";

const HeroSection = () => {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${batikPattern})`,
        backgroundSize: '300px 300px',
        backgroundRepeat: 'repeat',
      }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Temukan
                <span className="block bg-gradient-to-r from-royal-gold via-royal-gold-dark to-emerald bg-clip-text text-transparent">
                  Harmoni Gamelan
                </span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 font-body">
                Eksplorasi keindahan dan filosofi Gamelan Yogyakarta melalui sistem pakar interaktif. 
                Temukan harmoni budaya Jawa yang telah mengalun selama berabad-abad.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                asChild
                size="lg" 
                className="group relative bg-gradient-to-r from-royal-gold to-royal-gold-dark text-wood-brown hover:shadow-[0_10px_40px_-10px_hsl(51_100%_50%_/_0.6)] transition-all duration-300 text-lg px-8 py-6 font-semibold overflow-hidden"
              >
                <a href="/konsultasi">
                  <span className="relative z-10 flex items-center gap-2">
                    Mulai Konsultasi
                    <svg 
                      className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-royal-gold-dark to-emerald opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline"
                className="border-2 border-emerald text-emerald hover:bg-emerald hover:text-cream transition-all duration-300 text-lg px-8 py-6 font-semibold"
                onClick={() => {
                  document.getElementById('about-section')?.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
              >
                Pelajari Lebih Lanjut
              </Button>
            </div>

            {/* Decorative Elements */}
            <div className="flex items-center gap-8 pt-8 justify-center lg:justify-start">
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-royal-gold">500+</div>
                <div className="text-sm text-muted-foreground">Instrumen</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-royal-gold">15+</div>
                <div className="text-sm text-muted-foreground">Jenis Gamelan</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <div className="text-3xl font-display font-bold text-royal-gold">100+</div>
                <div className="text-sm text-muted-foreground">Tahun Sejarah</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_-10px_hsl(25_30%_25%_/_0.3)] border-4 border-royal-gold/20">
              <img 
                src={heroImage} 
                alt="Traditional Javanese Gamelan orchestra in an elegant Pendopo" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wood-brown/50 via-transparent to-transparent" />
            </div>
            
            {/* Decorative corner ornaments */}
            <div className="absolute -top-4 -right-4 w-20 h-20 border-t-4 border-r-4 border-royal-gold rounded-tr-3xl opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 border-b-4 border-l-4 border-emerald rounded-bl-3xl opacity-60" />
          </div>
        </div>
      </div>

      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg className="w-6 h-6 text-royal-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
