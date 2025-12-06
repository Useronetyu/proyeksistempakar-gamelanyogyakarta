const Footer = () => {
  return (
    <footer className="bg-wood-brown text-cream py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-royal-gold to-royal-gold-dark flex items-center justify-center">
                <span className="text-wood-brown font-display font-bold text-xl">G</span>
              </div>
              <span className="font-display font-semibold text-xl">Gamelan Yogyakarta</span>
            </div>
            <p className="text-cream/70 text-sm max-w-md">
              Sistem pakar untuk mempelajari dan mengeksplorasi keindahan Gamelan Yogyakarta. 
              Melestarikan warisan budaya untuk generasi mendatang.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Tautan</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#beranda" className="text-cream/70 hover:text-royal-gold transition-colors">Beranda</a></li>
              <li><a href="#tentang" className="text-cream/70 hover:text-royal-gold transition-colors">Tentang</a></li>
              <li><a href="#koleksi" className="text-cream/70 hover:text-royal-gold transition-colors">Koleksi</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-4">Kontak</h4>
            <ul className="space-y-2 text-sm text-cream/70">
              <li>Kraton Yogyakarta</li>
              <li>Yogyakarta, Indonesia</li>
              <li>info@gamelan-yogya.id</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/20 pt-8 text-center text-sm text-cream/60">
          <p>© 2024 Gamelan Yogyakarta. Melestarikan Warisan Budaya Nusantara.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
