import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Navigation from "@/components/ui/navigation";
import Footer from "@/components/Footer";
import { gamelanLocations } from "@/data/gamelanLocations";
import parangPattern from "@/assets/parang-pattern.png";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Calendar, X, Trash2 } from "lucide-react";
import { format } from "date-fns";

interface HistoryItem {
  id: string;
  date: string;
  resultId: string;
  resultName: string;
  certaintyFactor: number;
  image: string;
}

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [selectedResult, setSelectedResult] = useState<typeof gamelanLocations[keyof typeof gamelanLocations] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Load history from localStorage
    const storedHistory = localStorage.getItem("gamelan-consultation-history");
    if (storedHistory) {
      setHistory(JSON.parse(storedHistory));
    }
  }, []);

  const handleCardClick = (resultId: string) => {
    const result = gamelanLocations[resultId as keyof typeof gamelanLocations];
    setSelectedResult(result);
    setIsModalOpen(true);
  };

  const handleClearHistory = () => {
    if (confirm("Apakah Anda yakin ingin menghapus semua riwayat konsultasi?")) {
      localStorage.removeItem("gamelan-consultation-history");
      setHistory([]);
    }
  };

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
              Riwayat Konsultasi
            </h1>
            <p className="text-foreground/70 text-lg">
              Lihat kembali hasil konsultasi gamelan Anda sebelumnya
            </p>
          </div>

          {/* History List or Empty State */}
          {history.length === 0 ? (
            <Card className="bg-background/95 backdrop-blur-sm border-border/50 shadow-xl p-12 text-center animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-royal-gold/20 to-emerald/20 flex items-center justify-center">
                  <Calendar className="w-12 h-12 text-royal-gold" />
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-4">
                  Belum Ada Riwayat
                </h2>
                <p className="text-foreground/70 mb-8 leading-relaxed">
                  Belum ada riwayat konsultasi. Mari temukan harmoni gamelan Anda.
                </p>
                <Button 
                  className="bg-gradient-to-r from-emerald to-emerald-dark text-white hover:shadow-xl transition-all"
                  onClick={() => navigate("/konsultasi")}
                >
                  Mulai Konsultasi
                </Button>
              </div>
            </Card>
          ) : (
            <>
              {/* History Cards */}
              <div className="space-y-4 animate-fade-in">
                {history.map((item) => (
                  <Card 
                    key={item.id}
                    className="bg-background/95 backdrop-blur-sm border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden group border-l-4 border-l-royal-gold"
                    onClick={() => handleCardClick(item.resultId)}
                  >
                    <div className="flex flex-col md:flex-row gap-4 p-4">
                      {/* Image */}
                      <div className="relative w-full md:w-48 h-32 overflow-hidden rounded-lg flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.resultName}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-foreground/60 text-sm mb-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {format(new Date(item.date), "dd MMM yyyy, HH:mm")}
                            </span>
                          </div>
                          <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2 group-hover:text-royal-gold transition-colors">
                            {item.resultName}
                          </h3>
                          <p className="text-foreground/70 text-sm">
                            {item.resultId}
                          </p>
                        </div>
                      </div>

                      {/* CF Score Badge */}
                      <div className="flex items-center justify-center md:justify-end">
                        <div className="bg-gradient-to-br from-royal-gold/10 to-royal-gold/5 rounded-lg p-4 border border-royal-gold/30">
                          <div className="text-center">
                            <div className="text-3xl font-display font-bold text-royal-gold">
                              {item.certaintyFactor}%
                            </div>
                            <div className="text-xs font-medium text-foreground/60 mt-1">
                              Kecocokan
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Clear History Button */}
              <div className="text-center mt-12">
                <Button 
                  variant="ghost" 
                  className="text-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                  onClick={handleClearHistory}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Hapus Riwayat
                </Button>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      {selectedResult && (
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
                  src={selectedResult.image}
                  alt={selectedResult.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <DialogHeader>
                  <DialogTitle className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                    {selectedResult.name}
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 mt-6">
                  {/* Description */}
                  <div>
                    <h3 className="font-semibold text-lg text-foreground mb-2 flex items-center gap-2">
                      <span className="text-royal-gold">📖</span> Deskripsi Lengkap
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {selectedResult.detailedDescription}
                    </p>
                  </div>

                  {/* Opening Hours */}
                  <div className="bg-cream/20 rounded-lg p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                      <span className="text-royal-gold">🕐</span> Jam Buka
                    </h3>
                    <p className="text-foreground/80 whitespace-pre-line">
                      {selectedResult.openingHours}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="bg-emerald/10 rounded-lg p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                      <span className="text-emerald">📍</span> Lokasi
                    </h3>
                    <p className="text-foreground/80">
                      {selectedResult.location}
                    </p>
                  </div>

                  {/* Ticket Info */}
                  <div className="bg-royal-gold/10 rounded-lg p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                      <span className="text-royal-gold">🎫</span> Informasi Tiket
                    </h3>
                    <p className="text-foreground/80 whitespace-pre-line">
                      {selectedResult.ticketInfo}
                    </p>
                  </div>

                  {/* Historical Context */}
                  <div className="border-t border-border/30 pt-5">
                    <h3 className="font-semibold text-lg text-foreground mb-3 flex items-center gap-2">
                      <span className="text-royal-gold">🏛️</span> Konteks Sejarah
                    </h3>
                    <p className="text-foreground/80 leading-relaxed">
                      {selectedResult.history}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </div>
  );
};

export default History;
