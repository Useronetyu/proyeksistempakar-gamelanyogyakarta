import bangsalImage from "@/assets/bangsal-sri-menganti.jpg";
import gamelanHero from "@/assets/gamelan-hero.jpg";
import kratonInterior from "@/assets/kraton-interior.jpg";

export interface GamelanLocation {
  id: string;
  name: string;
  image: string;
  description: string;
  schedule: string;
  instruments: string;
  history: string;
  detailedDescription: string;
  openingHours: string;
  location: string;
  ticketInfo: string;
}

export const gamelanLocations: Record<string, GamelanLocation> = {
  H01: {
    id: "H01",
    name: "Pagelaran Gamelan Bangsal Sri Menganti",
    image: bangsalImage,
    description: "Bangsal Sri Menganti merupakan salah satu pendopo utama di Kraton Yogyakarta yang menjadi tempat pagelaran gamelan resmi. Tempat ini sangat cocok untuk Anda yang ingin menyaksikan pertunjukan gamelan dalam suasana istana yang megah dan autentik.",
    schedule: "Setiap hari Selasa dan Jumat, pukul 10.00 - 12.00 WIB",
    instruments: "Gamelan Ageng lengkap dengan 20+ instrumen tradisional",
    history: "Dibangun pada masa Sultan Hamengkubuwono VIII sebagai pusat kesenian istana",
    detailedDescription: "Bangsal Sri Menganti adalah jantung kesenian Kraton Yogyakarta, di mana pertunjukan gamelan klasik diselenggarakan secara rutin. Pengunjung dapat menikmati alunan gamelan yang dimainkan oleh abdi dalem keraton dengan teknik dan tradisi yang telah diwariskan turun-temurun.",
    openingHours: "Selasa & Jumat: 10.00 - 12.00 WIB\nSenin - Minggu: 08.30 - 14.00 WIB (Kunjungan Umum)",
    location: "Bangsal Sri Menganti, Kompleks Kraton Yogyakarta, Jl. Rotowijayan Blok No. 1, Panembahan, Kec. Kraton, Yogyakarta",
    ticketInfo: "Tiket Masuk Kraton: Rp 15.000 (Dewasa), Rp 7.500 (Anak-anak)"
  },
  H02: {
    id: "H02",
    name: "Museum Keraton Yogyakarta",
    image: kratonInterior,
    description: "Museum Keraton menyimpan koleksi gamelan bersejarah dan artefak kebudayaan Jawa yang sangat berharga. Cocok bagi Anda yang ingin mempelajari sejarah dan perkembangan gamelan dari masa ke masa.",
    schedule: "Setiap hari, pukul 08.30 - 14.00 WIB",
    instruments: "Koleksi gamelan kuno dari berbagai era kesultanan",
    history: "Museum ini didirikan untuk melestarikan warisan budaya Keraton Yogyakarta",
    detailedDescription: "Museum Keraton Yogyakarta menyimpan berbagai koleksi gamelan antik, termasuk gamelan pusaka keraton yang berusia ratusan tahun. Pengunjung dapat melihat langsung evolusi desain dan pembuatan gamelan, serta memahami makna filosofis di balik setiap instrumen.",
    openingHours: "Senin - Minggu: 08.30 - 14.00 WIB\n(Tutup pada hari libur nasional dan acara khusus keraton)",
    location: "Museum Keraton, Kompleks Kraton Yogyakarta, Jl. Rotowijayan Blok No. 1, Panembahan, Kec. Kraton, Yogyakarta",
    ticketInfo: "Tiket Masuk Kraton: Rp 15.000 (Dewasa), Rp 7.500 (Anak-anak)"
  },
  H03: {
    id: "H03",
    name: "Latihan Gamelan Keraton",
    image: gamelanHero,
    description: "Saksikan langsung sesi latihan gamelan yang dilakukan oleh abdi dalem keraton. Pengalaman unik untuk melihat proses pembelajaran dan pelestarian tradisi gamelan dari dekat.",
    schedule: "Rabu dan Kamis, pukul 14.00 - 16.00 WIB",
    instruments: "Gamelan Ageng dan Gamelan Pelog",
    history: "Tradisi latihan ini telah berlangsung sejak era Sultan Hamengkubuwono I",
    detailedDescription: "Sesi latihan gamelan keraton memberikan kesempatan langka untuk menyaksikan proses pembelajaran dan preservasi tradisi gamelan. Abdi dalem keraton berlatih dengan teknik tradisional yang telah diwariskan secara turun-temurun, menciptakan harmoni yang sempurna.",
    openingHours: "Rabu & Kamis: 14.00 - 16.00 WIB\n(Jadwal dapat berubah mengikuti agenda keraton)",
    location: "Pendopo Latihan, Kompleks Kraton Yogyakarta, Jl. Rotowijayan, Panembahan, Kec. Kraton, Yogyakarta",
    ticketInfo: "Tiket Masuk Kraton: Rp 15.000 (Dewasa), Rp 7.500 (Anak-anak)"
  },
  H04: {
    id: "H04",
    name: "Sanggar Belajar Gamelan",
    image: gamelanHero,
    description: "Sanggar khusus untuk belajar gamelan dengan instruktur berpengalaman. Tersedia kelas untuk pemula hingga mahir, dengan pendekatan praktik langsung menggunakan instrumen gamelan asli.",
    schedule: "Senin - Sabtu, pukul 09.00 - 17.00 WIB",
    instruments: "Gamelan lengkap untuk pembelajaran praktik",
    history: "Sanggar ini didirikan untuk melestarikan dan mengajarkan seni gamelan kepada generasi muda",
    detailedDescription: "Sanggar Belajar Gamelan Keraton menawarkan program pembelajaran komprehensif untuk semua tingkat. Peserta akan belajar teknik bermain gamelan, memahami notasi gamelan, dan mendalami filosofi musik gamelan Jawa. Instruktur berpengalaman dari keraton akan membimbing setiap sesi.",
    openingHours: "Senin - Sabtu: 09.00 - 17.00 WIB\nMinggu: Tutup\n(Pendaftaran kelas dilakukan sebelumnya)",
    location: "Sanggar Gamelan, Kompleks Kraton Yogyakarta, Jl. Rotowijayan, Panembahan, Kec. Kraton, Yogyakarta",
    ticketInfo: "Biaya Kursus: Mulai dari Rp 150.000 per sesi\n(Paket bulanan tersedia)"
  },
  H05: {
    id: "H05",
    name: "Tempat Perawatan Gamelan",
    image: kratonInterior,
    description: "Saksikan proses perawatan dan konservasi gamelan pusaka keraton. Tempat ini cocok untuk Anda yang ingin memahami aspek teknis pembuatan dan pemeliharaan gamelan.",
    schedule: "Senin - Jumat, pukul 10.00 - 15.00 WIB",
    instruments: "Workshop lengkap dengan berbagai instrumen dalam proses perawatan",
    history: "Tradisi perawatan gamelan telah dilakukan sejak berdirinya Keraton Yogyakarta",
    detailedDescription: "Tempat Perawatan Gamelan Keraton adalah workshop khusus di mana para pengrajin ahli merawat dan merestorasi gamelan pusaka keraton. Pengunjung dapat melihat proses pembersihan, penyetelan nada, hingga pemolesan instrumen gamelan yang memerlukan keahlian khusus dan pengetahuan mendalam.",
    openingHours: "Senin - Jumat: 10.00 - 15.00 WIB\nSabtu - Minggu: Tutup\n(Kunjungan dengan perjanjian)",
    location: "Workshop Gamelan, Kompleks Kraton Yogyakarta, Jl. Rotowijayan, Panembahan, Kec. Kraton, Yogyakarta",
    ticketInfo: "Tiket Masuk Kraton: Rp 15.000 (Dewasa)\n(Kunjungan khusus perlu konfirmasi)"
  }
};
