import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, GraduationCap, BookOpen, Calendar, Clock } from "lucide-react";
import Navigation from "@/components/ui/navigation";
import kratonBg from "@/assets/kraton-interior.jpg";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getTopRecommendation } from "@/lib/certaintyFactor";

const consultationSchema = z.object({
  goal: z.string().min(1, { message: "Pilih tujuan kunjungan Anda" }),
  visitDay: z.string().min(1, { message: "Pilih waktu kunjungan Anda" }),
  duration: z.string().min(1, { message: "Pilih durasi kunjungan Anda" })
});

type ConsultationFormData = z.infer<typeof consultationSchema>;

const Consultation = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ConsultationFormData>({
    goal: "",
    visitDay: "",
    duration: ""
  });

  const goals = [
    { id: "watching", label: "Menonton Pertunjukan", icon: Eye },
    { id: "learning", label: "Belajar Bermain", icon: GraduationCap },
    { id: "history", label: "Mempelajari Sejarah", icon: BookOpen }
  ];

  const visitDays = [
    { id: "weekday", label: "Hari Kerja" },
    { id: "weekend", label: "Akhir Pekan" },
    { id: "holiday", label: "Hari Libur Nasional" }
  ];

  const durations = [
    { id: "short", label: "1-2 Jam" },
    { id: "medium", label: "3-4 Jam" },
    { id: "long", label: "Sehari Penuh" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      consultationSchema.parse(formData);
      
      // Calculate recommendation using Certainty Factor
      const recommendation = getTopRecommendation({
        goal: formData.goal,
        visitDay: formData.visitDay,
        duration: formData.duration
      });
      
      // Show success message
      toast({
        title: "Rekomendasi Berhasil Dibuat!",
        description: "Sistem sedang memproses preferensi Anda...",
      });

      // Navigate to results page with calculated data
      setTimeout(() => {
        navigate("/hasil", { 
          state: { 
            resultId: recommendation.id,
            certaintyFactor: Math.round(recommendation.certaintyFactor * 100)
          } 
        });
      }, 500);
      
    } catch (error) {
      if (error instanceof z.ZodError) {
        const firstError = error.errors[0];
        toast({
          title: "Data Tidak Lengkap",
          description: firstError.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      
      {/* Background with blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${kratonBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)'
        }}
      />
      <div className="fixed inset-0 z-0 bg-wood-brown/40" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-24">
        <div className="w-full max-w-3xl">
          {/* Glassmorphism Card */}
          <div className="bg-background/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/30 p-8 md:p-12">
            <div className="text-center mb-10">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
                Konsultasi Gamelan
              </h1>
              <p className="text-muted-foreground">
                Jawab beberapa pertanyaan untuk mendapatkan rekomendasi personal
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">
              {/* Tujuan Kunjungan */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold font-bold">
                    1
                  </div>
                  Tujuan Kunjungan
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {goals.map((goal) => {
                    const Icon = goal.icon;
                    const isSelected = formData.goal === goal.id;
                    return (
                      <button
                        key={goal.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, goal: goal.id })}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-center space-y-3 hover:scale-105 ${
                          isSelected
                            ? 'border-royal-gold bg-royal-gold/10 shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                            : 'border-border bg-card hover:border-royal-gold/50'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full mx-auto flex items-center justify-center ${
                          isSelected ? 'bg-royal-gold text-wood-brown' : 'bg-muted text-muted-foreground'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className={`font-medium ${isSelected ? 'text-royal-gold' : 'text-foreground'}`}>
                          {goal.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Waktu Kunjungan */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold font-bold">
                    2
                  </div>
                  Waktu Kunjungan
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {visitDays.map((day) => {
                    const isSelected = formData.visitDay === day.id;
                    return (
                      <button
                        key={day.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, visitDay: day.id })}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 hover:scale-105 ${
                          isSelected
                            ? 'border-royal-gold bg-royal-gold/10 shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                            : 'border-border bg-card hover:border-royal-gold/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-royal-gold text-wood-brown' : 'bg-muted text-muted-foreground'
                        }`}>
                          <Calendar className="w-5 h-5" />
                        </div>
                        <div className={`font-medium text-left ${isSelected ? 'text-royal-gold' : 'text-foreground'}`}>
                          {day.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Durasi */}
              <div className="space-y-4">
                <h2 className="font-display text-xl font-semibold text-foreground flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-royal-gold/20 flex items-center justify-center text-royal-gold font-bold">
                    3
                  </div>
                  Durasi Kunjungan
                </h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {durations.map((duration) => {
                    const isSelected = formData.duration === duration.id;
                    return (
                      <button
                        key={duration.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, duration: duration.id })}
                        className={`p-5 rounded-xl border-2 transition-all duration-300 flex items-center gap-3 hover:scale-105 ${
                          isSelected
                            ? 'border-royal-gold bg-royal-gold/10 shadow-[0_0_20px_rgba(255,215,0,0.3)]'
                            : 'border-border bg-card hover:border-royal-gold/50'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isSelected ? 'bg-royal-gold text-wood-brown' : 'bg-muted text-muted-foreground'
                        }`}>
                          <Clock className="w-5 h-5" />
                        </div>
                        <div className={`font-medium text-left ${isSelected ? 'text-royal-gold' : 'text-foreground'}`}>
                          {duration.label}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-emerald hover:bg-emerald-dark text-cream font-semibold text-lg py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Lihat Hasil Rekomendasi
                </Button>
              </div>
            </form>
          </div>

          {/* Back to Home Link */}
          <div className="text-center mt-6">
            <a 
              href="/" 
              className="text-cream/80 hover:text-cream transition-colors text-sm font-medium inline-flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Kembali ke Beranda
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultation;
