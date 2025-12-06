import { Sparkles, ScrollText } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about-section" className="py-24 bg-card relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-royal-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
            Mengenal Gamelan & Sistem Pakar
          </h2>
          <p className="text-lg text-muted-foreground">
            Perpaduan harmonis antara warisan budaya Jawa dan teknologi modern
          </p>
        </div>

        {/* Two Column Layout */}
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - History */}
          <div className="group bg-background rounded-2xl p-8 shadow-sm hover:shadow-[0_10px_40px_-10px_hsl(51_100%_50%_/_0.3)] transition-all duration-300 border border-border/50 hover:border-royal-gold/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-royal-gold to-royal-gold-dark flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <ScrollText className="w-7 h-7 text-wood-brown" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Sejarah Gamelan Kraton Yogyakarta
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Gamelan Kraton Yogyakarta memiliki sejarah panjang yang dimulai sejak berdirinya Kesultanan Yogyakarta pada tahun 1755. Gamelan pusaka keraton dipercaya memiliki kekuatan spiritual dan menjadi simbol keagungan kesultanan.
              </p>
              <p>
                Setiap gamelan di kraton memiliki nama dan fungsi khusus. Gamelan Kyai Kanyut Mesem dan Kyai Guntur Madu adalah dua di antara gamelan pusaka yang paling dihormati. Instrumen-instrumen ini tidak hanya menghasilkan musik yang indah, tetapi juga merupakan bagian integral dari upacara adat dan ritual keraton.
              </p>
              <p>
                Tradisi gamelan di Kraton Yogyakarta terus dijaga dan dilestarikan hingga kini, dimainkan dalam berbagai acara resmi keraton dan pertunjukan untuk umum.
              </p>
            </div>
          </div>

          {/* Right Column - Expert System */}
          <div className="group bg-background rounded-2xl p-8 shadow-sm hover:shadow-[0_10px_40px_-10px_hsl(142_70%_45%_/_0.3)] transition-all duration-300 border border-border/50 hover:border-emerald/30">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald to-emerald-dark flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">
                  Bagaimana Website Ini Bekerja
                </h3>
              </div>
            </div>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Website ini menggunakan <span className="font-semibold text-foreground">Sistem Pakar (Expert System)</span> dengan metode <span className="font-semibold text-foreground">Certainty Factor</span> untuk memberikan rekomendasi tempat wisata gamelan yang paling sesuai dengan preferensi Anda.
              </p>
              <p>
                <span className="font-semibold text-foreground">Certainty Factor</span> adalah metode yang mengukur tingkat kepastian atau keyakinan terhadap suatu fakta atau aturan. Sistem akan menganalisis jawaban Anda tentang tujuan kunjungan, waktu, dan durasi, lalu menghitung tingkat kecocokan dengan setiap destinasi gamelan.
              </p>
              <p>
                Hasilnya adalah rekomendasi personal dengan persentase kecocokan, membantu Anda memilih pengalaman gamelan yang paling sesuai dengan keinginan dan kebutuhan Anda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
