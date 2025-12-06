import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/Footer";
import { gamelanLocations } from "@/data/gamelanLocations";
import parangPattern from "@/assets/parang-pattern.png";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get result from navigation state or use default
  const state = location.state as { resultId?: string; certaintyFactor?: number } | null;
  const currentResultId = state?.resultId || "H01";
  const certaintyFactor = state?.certaintyFactor || 80;

  const result = {
    ...gamelanLocations[currentResultId as keyof typeof gamelanLocations],
    certaintyFactor: certaintyFactor
  };

  // Save to localStorage when component mounts
  useEffect(() => {
    if (currentResultId && certaintyFactor) {
      const historyItem = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        resultId: currentResultId,
        resultName: result.name,
        certaintyFactor: certaintyFactor,
        image: result.image
      };

      // Get existing history
      const storedHistory = localStorage.getItem("gamelan-consultation-history");
      const history = storedHistory ? JSON.parse(storedHistory) : [];
      
      // Add new item at the beginning
      history.unshift(historyItem);
      
      // Keep only last 20 items
      const limitedHistory = history.slice(0, 20);
      
      // Save back to localStorage
      localStorage.setItem("gamelan-consultation-history", JSON.stringify(limitedHistory));
    }
  }, [currentResultId, certaintyFactor, result.name, result.image]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main 
        className="flex-1 pt-24 pb-16 px-6"
        style={{
          backgroundImage: `url(${parangPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Rekomendasi untuk Anda
            </h1>
            <p className="text-foreground/70 text-lg">
              Berdasarkan preferensi Anda, kami merekomendasikan
            </p>
          </div>

          {/* Result Card */}
          <Card className="overflow-hidden bg-background/95 backdrop-blur-sm border-border/50 shadow-2xl animate-scale-in">
            {/* Image */}
            <div className="relative h-72 md:h-96 overflow-hidden">
              <img 
                src={result.image} 
                alt={result.name}
                className="w-full h-full object-cover"
              />
              
              {/* Certainty Factor Badge */}
              <div className="absolute top-6 right-6 bg-background/95 backdrop-blur-sm rounded-full p-6 shadow-xl border-4 border-royal-gold">
                <div className="text-center">
                  <div className="text-3xl font-display font-bold text-royal-gold">
                    {result.certaintyFactor}%
                  </div>
                  <div className="text-sm font-medium text-foreground/80 mt-1">
                    Kecocokan
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                {result.name}
              </h2>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">Deskripsi</h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {result.description}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-cream/20 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="text-royal-gold">📅</span> Jadwal
                    </h4>
                    <p className="text-foreground/80 text-sm">
                      {result.schedule}
                    </p>
                  </div>

                  <div className="bg-cream/20 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="text-royal-gold">🎵</span> Instrumen
                    </h4>
                    <p className="text-foreground/80 text-sm">
                      {result.instruments}
                    </p>
                  </div>
                </div>

                <div className="bg-emerald/10 rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="text-emerald">📜</span> Sejarah
                  </h4>
                  <p className="text-foreground/80 text-sm">
                    {result.history}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button 
                  className="flex-1 bg-gradient-to-r from-emerald to-emerald-dark text-white hover:shadow-xl transition-all text-lg py-6"
                  onClick={() => setIsModalOpen(true)}
                >
                  Lihat Detail
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 border-2 border-foreground/20 hover:border-royal-gold hover:bg-royal-gold/10 transition-all text-lg py-6"
                  onClick={() => navigate("/konsultasi")}
                >
                  Ulangi Konsultasi
                </Button>
              </div>
            </div>
          </Card>

          {/* Additional Info */}
          <div className="text-center mt-8 text-foreground/60 text-sm">
            <p>Tingkat kecocokan dihitung berdasarkan metode Certainty Factor</p>
          </div>
        </div>
      </main>

      {/* Detail Modal */}
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
                src={result.image}
                alt={result.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-6 md:p-8">
              <DialogHeader>
                <DialogTitle className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  {result.name}
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 mt-6">
                {/* Description */}
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                    <span className="text-royal-gold">📖</span> Deskripsi Lengkap
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {result.detailedDescription}
                  </p>
                </div>

                {/* Opening Hours */}
                <div className="bg-cream/20 rounded-lg p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                    <span className="text-royal-gold">🕐</span> Jam Buka
                  </h3>
                  <p className="text-foreground/80 whitespace-pre-line">
                    {result.openingHours}
                  </p>
                </div>

                {/* Location */}
                <div className="bg-emerald/10 rounded-lg p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                    <span className="text-emerald">📍</span> Lokasi
                  </h3>
                  <p className="text-foreground/80">
                    {result.location}
                  </p>
                </div>

                {/* Ticket Info */}
                <div className="bg-royal-gold/10 rounded-lg p-5">
                  <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                    <span className="text-royal-gold">🎫</span> Informasi Tiket
                  </h3>
                  <p className="text-foreground/80 whitespace-pre-line">
                    {result.ticketInfo}
                  </p>
                </div>

                {/* Historical Context */}
                <div className="border-t border-border/30 pt-5">
                  <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                    <span className="text-royal-gold">🏛️</span> Konteks Sejarah
                  </h3>
                  <p className="text-foreground/80 leading-relaxed">
                    {result.history}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Results;
