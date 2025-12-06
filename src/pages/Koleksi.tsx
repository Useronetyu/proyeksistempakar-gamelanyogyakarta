import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/Footer";
import { gamelanLocations, GamelanLocation } from "@/data/gamelanLocations";
import kawungPattern from "@/assets/kawung-pattern.png";
import { X, MapPin, Clock, CheckCircle2, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Koleksi = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<GamelanLocation | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleCardClick = (location: GamelanLocation) => {
    setSelectedLocation(location);
    setIsModalOpen(true);
  };

  const toggleSelection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length < 3) {
        return [...prev, id];
      }
      return prev;
    });
  };

  const handleCompare = () => {
    setIsCompareOpen(true);
  };

  const locations = Object.values(gamelanLocations);
  const selectedLocations = selectedIds.map(id => gamelanLocations[id]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main 
        className="flex-1 pt-24 pb-16 px-6"
        style={{
          backgroundImage: `url(${kawungPattern})`,
          backgroundSize: "400px 400px",
          backgroundRepeat: "repeat",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="absolute inset-0 bg-background/85 pointer-events-none" style={{ top: '80px' }} />
        
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Koleksi Gamelan
            </h1>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Jelajahi lima destinasi utama untuk menikmati, mempelajari, dan mengapresiasi 
              keindahan gamelan Kraton Yogyakarta
            </p>
          </div>

          {/* Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {locations.map((location, index) => (
              <Card 
                key={location.id}
                onClick={() => handleCardClick(location)}
                className="group overflow-hidden bg-background/95 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02] animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={location.image} 
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
                  
                  {/* ID Badge */}
                  <div className="absolute top-4 left-4 bg-royal-gold text-wood-brown font-bold px-3 py-1 rounded-full text-sm">
                    {location.id}
                  </div>

                  {/* Selection Checkbox */}
                  <button
                    onClick={(e) => toggleSelection(location.id, e)}
                    className="absolute top-4 right-4 z-10 transition-transform hover:scale-110"
                    aria-label={selectedIds.includes(location.id) ? "Deselect" : "Select for comparison"}
                  >
                    {selectedIds.includes(location.id) ? (
                      <CheckCircle2 className="w-8 h-8 text-emerald fill-emerald/20" />
                    ) : (
                      <Circle className="w-8 h-8 text-white/80 hover:text-emerald" />
                    )}
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-3 line-clamp-2 group-hover:text-royal-gold transition-colors">
                    {location.name}
                  </h3>
                  
                  <p className="text-foreground/70 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {location.description}
                  </p>

                  {/* Info Tags */}
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-foreground/60">
                      <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald" />
                      <span className="line-clamp-1">{location.schedule}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-foreground/60">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5 text-royal-gold" />
                      <span className="line-clamp-1">Kraton Yogyakarta</span>
                    </div>
                  </div>

                  {/* Hover Indicator */}
                  <div className="mt-4 pt-4 border-t border-border/30">
                    <span className="text-sm text-emerald font-medium group-hover:text-emerald-dark transition-colors">
                      Klik untuk detail lengkap →
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      {/* Detail Modal */}
      {selectedLocation && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto p-0">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors border border-border/50"
              aria-label="Close"
            >
              <X className="h-5 w-5 text-foreground" />
            </button>
            
            <div className="relative">
              {/* Large Image */}
              <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
                <img
                  src={selectedLocation.image}
                  alt={selectedLocation.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <DialogHeader>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-royal-gold text-wood-brown font-bold px-3 py-1 rounded-full text-sm">
                      {selectedLocation.id}
                    </div>
                  </div>
                  <DialogTitle className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {selectedLocation.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                      <span className="text-royal-gold">📖</span> Deskripsi Lengkap
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {selectedLocation.detailedDescription}
                    </p>
                  </div>

                  {/* Opening Hours */}
                  <div className="bg-cream/20 rounded-lg p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                      <span className="text-royal-gold">🕐</span> Jam Buka
                    </h3>
                    <p className="text-foreground/80 whitespace-pre-line">
                      {selectedLocation.openingHours}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="bg-emerald/10 rounded-lg p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                      <span className="text-emerald">📍</span> Lokasi
                    </h3>
                    <p className="text-foreground/80">
                      {selectedLocation.location}
                    </p>
                  </div>

                  {/* Ticket Info */}
                  <div className="bg-royal-gold/10 rounded-lg p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                      <span className="text-royal-gold">🎫</span> Informasi Tiket
                    </h3>
                    <p className="text-foreground/80 whitespace-pre-line">
                      {selectedLocation.ticketInfo}
                    </p>
                  </div>

                  {/* Historical Context */}
                  <div className="border-t border-border/30 pt-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                      <span className="text-royal-gold">🏛️</span> Konteks Sejarah
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {selectedLocation.history}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Floating Compare Button */}
      {selectedIds.length >= 2 && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-in">
          <Button
            onClick={handleCompare}
            size="lg"
            className="bg-emerald hover:bg-emerald-dark text-white shadow-2xl px-8 py-6 text-lg font-semibold"
          >
            Bandingkan {selectedIds.length} Lokasi
          </Button>
        </div>
      )}

      {/* Comparison Modal */}
      <Dialog open={isCompareOpen} onOpenChange={setIsCompareOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto p-0">
          <button
            onClick={() => setIsCompareOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-full bg-background/80 backdrop-blur-sm p-2 hover:bg-background transition-colors border border-border/50"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          <div className="p-6 md:p-8">
            <DialogHeader>
              <DialogTitle className="font-display text-3xl font-bold text-foreground mb-6">
                Perbandingan Lokasi
              </DialogTitle>
            </DialogHeader>

            {/* Side-by-side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {selectedLocations.map((location) => (
                <div key={location.id} className="space-y-4 border border-border/50 rounded-lg p-4 bg-background/50">
                  {/* Image */}
                  <div className="relative h-40 rounded-lg overflow-hidden">
                    <img src={location.image} alt={location.name} className="w-full h-full object-cover" />
                    <div className="absolute top-2 left-2 bg-royal-gold text-wood-brown font-bold px-2 py-1 rounded text-xs">
                      {location.id}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-lg font-bold text-foreground">
                    {location.name}
                  </h3>

                  {/* Schedule */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs font-semibold text-emerald">
                      <Clock className="w-4 h-4" />
                      <span>Jadwal</span>
                    </div>
                    <p className="text-sm text-foreground/70">{location.schedule}</p>
                  </div>

                  {/* Instruments */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-royal-gold">
                      🎵 Instrumen
                    </div>
                    <p className="text-sm text-foreground/70">{location.instruments}</p>
                  </div>

                  {/* Opening Hours */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-emerald">
                      🕐 Jam Buka
                    </div>
                    <p className="text-sm text-foreground/70 whitespace-pre-line">{location.openingHours}</p>
                  </div>

                  {/* Ticket Info */}
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-royal-gold">
                      🎫 Tiket
                    </div>
                    <p className="text-sm text-foreground/70 whitespace-pre-line">{location.ticketInfo}</p>
                  </div>

                  {/* View Details Button */}
                  <Button
                    onClick={() => {
                      setIsCompareOpen(false);
                      handleCardClick(location);
                    }}
                    variant="outline"
                    className="w-full mt-2"
                  >
                    Lihat Detail Lengkap
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Koleksi;
