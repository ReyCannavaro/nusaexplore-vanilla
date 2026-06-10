var quizData = [
  // ACEH
  { province: 'aceh', q: 'Tari Saman dari Aceh diakui oleh UNESCO sebagai warisan budaya tak benda pada tahun?', opts: ['2009', '2011', '2015', '2018'], ans: 1 },
  { province: 'aceh', q: 'Senjata tradisional khas Aceh yang berbentuk melengkung disebut?', opts: ['Keris', 'Rencong', 'Badik', 'Mandau'], ans: 1 },
  { province: 'aceh', q: 'Kopi khas Aceh yang terkenal di dunia berasal dari dataran tinggi mana?', opts: ['Gayo', 'Alas', 'Singkil', 'Tamiang'], ans: 0 },
  { province: 'aceh', q: 'Masjid Raya Baiturrahman terletak di kota mana?', opts: ['Sabang', 'Lhokseumawe', 'Banda Aceh', 'Meulaboh'], ans: 2 },
  { province: 'aceh', q: 'Aceh mendapat julukan apa karena menjadi pintu masuk Islam di Nusantara?', opts: ['Serambi Mekah', 'Tanah Rencong', 'Bumi Iskandar', 'Negeri Syariah'], ans: 0 },

  // SUMATERA UTARA
  { province: 'sumatera-utara', q: 'Danau Toba terbentuk dari letusan supervulkan berapa tahun yang lalu?', opts: ['10.000 tahun', '74.000 tahun', '200.000 tahun', '1 juta tahun'], ans: 1 },
  { province: 'sumatera-utara', q: 'Kain sakral suku Batak yang digunakan dalam upacara adat disebut?', opts: ['Ulos', 'Songket', 'Tapis', 'Sasirangan'], ans: 0 },
  { province: 'sumatera-utara', q: 'Tarian tradisional suku Batak yang gerakan tangannya sangat khas dinamakan?', opts: ['Tor-Tor', 'Saman', 'Kecak', 'Jaipong'], ans: 0 },
  { province: 'sumatera-utara', q: 'Pulau yang terletak di tengah Danau Toba disebut?', opts: ['Pulau Nias', 'Pulau Samosir', 'Pulau Batam', 'Pulau Bintan'], ans: 1 },
  { province: 'sumatera-utara', q: 'Tradisi lompat batu yang terkenal berasal dari pulau mana di Sumatera Utara?', opts: ['Pulau Samosir', 'Pulau Nias', 'Pulau Batam', 'Pulau Weh'], ans: 1 },

  // SUMATERA BARAT
  { province: 'sumatera-barat', q: 'Rumah adat suku Minangkabau dengan atap menyerupai tanduk kerbau disebut?', opts: ['Rumah Gadang', 'Rumah Bolon', 'Rumah Joglo', 'Rumah Limas'], ans: 0 },
  { province: 'sumatera-barat', q: 'Tarian tradisional yang ditarikan dengan menggunakan piring di atas telapak tangan adalah?', opts: ['Tari Payung', 'Tari Piring', 'Tari Pasambahan', 'Tari Indang'], ans: 1 },
  { province: 'sumatera-barat', q: 'Sistem kekerabatan yang ditarik dari garis keturunan ibu di Minangkabau disebut?', opts: ['Patrilineal', 'Matrilineal', 'Bilateral', 'Ambilineal'], ans: 1 },
  { province: 'sumatera-barat', q: 'Kuliner khas Sumatra Barat yang dinobatkan sebagai salah satu makanan terlezat di dunia adalah?', opts: ['Rendang', 'Sate Padang', 'Dendeng Balado', 'Gulai Tunjang'], ans: 0 },
  { province: 'sumatera-barat', q: 'Lembah indah di Sumatra Barat yang diapit oleh dua bukit batu terjal adalah?', opts: ['Lembah Anai', 'Lembah Harau', 'Lembah Baliem', 'Lembah Dieng'], ans: 1 },

  // RIAU
  { province: 'riau', q: 'Ibu kota Provinsi Riau adalah?', opts: ['Dumai', 'Pekanbaru', 'Batam', 'Tanjungpinang'], ans: 1 },
  { province: 'riau', q: 'Tarian penyambutan khas Melayu Riau adalah?', opts: ['Tari Persembahan', 'Tari Piring', 'Tari Saman', 'Tari Jaipong'], ans: 0 },
  { province: 'riau', q: 'Istana Siak Sri Indrapura peninggalan kesultanan Melayu berada di kabupaten?', opts: ['Siak', 'Bengkalis', 'Rokan Hulu', 'Pelalawan'], ans: 0 },
  { province: 'riau', q: 'Pulau di Kepri yang terkenal memiliki Masjid Sultan Riau dengan campuran putih telur adalah?', opts: ['Pulau Penyengat', 'Pulau Batam', 'Pulau Bintan', 'Pulau Natuna'], ans: 0 },
  { province: 'riau', q: 'Siput laut rebus khas Kepulauan Riau yang menjadi kuliner seafood ikonik bernama?', opts: ['Gonggong', 'Kerang Dara', 'Kepiting Soka', 'Cumi Tepek'], ans: 0 },

  // KEPULAUAN RIAU
  { province: 'kepulauan-riau', q: 'Ibu kota Provinsi Kepulauan Riau adalah?', opts: ['Batam', 'Tanjungpinang', 'Bintan', 'Karimun'], ans: 1 },
  { province: 'kepulauan-riau', q: 'Jembatan terkenal yang menghubungkan pulau-pulau di Batam disebut?', opts: ['Jembatan Suramadu', 'Jembatan Barelang', 'Jembatan Ampera', 'Jembatan Pasupati'], ans: 1 },
  { province: 'kepulauan-riau', q: 'Kota di Kepri yang dikenal sebagai kota industri dan pariwisata adalah?', opts: ['Tanjungpinang', 'Batam', 'Karimun', 'Natuna'], ans: 1 },
  { province: 'kepulauan-riau', q: 'Pantai pasir putih terkenal di Bintan bernama?', opts: ['Pantai Trikora', 'Pantai Nongsa', 'Pantai Melur', 'Pantai Lagoi'], ans: 0 },
  { province: 'kepulauan-riau', q: 'Makanan khas Kepri berupa sup ikan asam pedas disebut?', opts: ['Asam Pedas Ikan', 'Laksa', 'Otak-Otak', 'Gonggong Rebus'], ans: 0 },

  // JAMBI
  { province: 'jambi', q: 'Candi terluas di Asia Tenggara yang berbahan bata merah di Provinsi Jambi adalah?', opts: ['Candi Muaro Jambi', 'Candi Borobudur', 'Candi Prambanan', 'Candi Tikus'], ans: 0 },
  { province: 'jambi', q: 'Suku pedalaman Jambi yang hidup nomaden di dalam hutan adat adalah?', opts: ['Suku Anak Dalam', 'Suku Dayak', 'Suku Baduy', 'Suku Asmat'], ans: 0 },
  { province: 'jambi', q: 'Rumah adat Provinsi Jambi yang dikenal dengan nama unik adalah?', opts: ['Rumah Kajang Lako', 'Rumah Gadang', 'Rumah Limas', 'Rumah Joglo'], ans: 0 },
  { province: 'jambi', q: 'Bunga raksasa langka yang ditemukan pertama kali di hutan Bengkulu adalah?', opts: ['Rafflesia Arnoldii', 'Kantong Semar', 'Anggrek Hitam', 'Bunga Bangkai'], ans: 0 },
  { province: 'jambi', q: 'Benteng peninggalan Inggris terbesar di Asia Tenggara yang berada di Bengkulu bernama?', opts: ['Fort Marlborough', 'Fort de Kock', 'Fort Rotterdam', 'Fort Vredeburg'], ans: 0 },

  // BENGKULU
  { province: 'bengkulu', q: 'Bunga bangkai raksasa yang ditemukan di hutan Bengkulu adalah?', opts: ['Rafflesia Arnoldii', 'Kantong Semar', 'Anggrek Hitam', 'Edelweiss'], ans: 0 },
  { province: 'bengkulu', q: 'Pantai yang terkenal dengan bunga tabu dan sunset eksotis di Bengkulu adalah?', opts: ['Pantai Panjang', 'Pantai Jakat', 'Pantai Sungai Suci', 'Pantai Nala'], ans: 0 },
  { province: 'bengkulu', q: 'Benteng peninggalan Inggris yang menjadi ikon sejarah Bengkulu bernama?', opts: ['Fort Marlborough', 'Fort Rotterdam', 'Fort de Kock', 'Fort Vredeburg'], ans: 0 },
  { province: 'bengkulu', q: 'Kopi khas Bengkulu yang cukup terkenal adalah?', opts: ['Kopi Bengkulu', 'Kopi Gayo', 'Kopi Luwak', 'Kopi Toraja'], ans: 0 },
  { province: 'bengkulu', q: 'Taman Nasional di Bengkulu yang merupakan habitat harimau sumatera adalah?', opts: ['Taman Nasional Kerinci Seblat', 'Taman Nasional Bukit Barisan', 'Taman Nasional Way Kambas', 'Taman Nasional Ujung Kulon'], ans: 0 },

  // SUMATERA SELATAN
  { province: 'sumatera-selatan', q: 'Jembatan ikonik di kota Palembang yang membentang di atas Sungai Musi bernama?', opts: ['Jembatan Suramadu', 'Jembatan Ampera', 'Jembatan Barelang', 'Jembatan Pasupati'], ans: 1 },
  { province: 'sumatera-selatan', q: 'Makanan khas Palembang yang terbuat dari bahan dasar sagu dan ikan adalah?', opts: ['Pempek', 'Tekwan', 'Model', 'Laksan'], ans: 0 },
  { province: 'sumatera-selatan', q: 'Kerajaan maritim terbesar di Nusantara yang dahulu berpusat di Sumatera Selatan adalah?', opts: ['Majapahit', 'Sriwijaya', 'Singasari', 'Kutai'], ans: 1 },
  { province: 'sumatera-selatan', q: 'Provinsi Kepulauan Bangka Belitung sangat terkenal di dunia sebagai penghasil tambang utama?', opts: ['Timah', 'Batu Bara', 'Emas', 'Nikel'], ans: 0 },
  { province: 'sumatera-selatan', q: 'Pulau Belitung terkenal dengan keindahan pantai berbatuan granit raksasa latar film?', opts: ['Laskar Pelangi', 'Ayat-Ayat Cinta', '5 cm', 'Perahu Kertas'], ans: 0 },

  // KEP. BANGKA BELITUNG
  { province: 'bangka-belitung', q: 'Kota utama di Pulau Bangka yang terkenal dengan pantai pasir putihnya adalah?', opts: ['Pangkalpinang', 'Sungailiat', 'Mentok', 'Toboali'], ans: 0 },
  { province: 'bangka-belitung', q: 'Kuliner khas Bangka Belitung berupa mie basah dengan kuah kuning gurih adalah?', opts: ['Mie Belitung', 'Mie Bangka', 'Mie Koba', 'Mie Laksa'], ans: 0 },
  { province: 'bangka-belitung', q: 'Pantai terkenal dengan bentuk seperti lada di Belitung adalah?', opts: ['Pantai Tanjung Tinggi', 'Pantai Tanjung Kelayang', 'Pantai Penyabong', 'Pantai Balok'], ans: 1 },
  { province: 'bangka-belitung', q: 'Makanan laut khas yang disajikan dengan sambal pedas di Bangka disebut?', opts: ['Tempoyak Ikan', 'Sambal Belacan', 'Rusip', 'Cacapan'], ans: 0 },
  { province: 'bangka-belitung', q: 'Taman nasional laut yang melindungi ekosistem terumbu karang di Bangka Belitung adalah?', opts: ['Taman Nasional Laut Bangka Belitung', 'Taman Nasional Bunaken', 'Taman Nasional Wakatobi', 'Taman Nasional Karimunjawa'], ans: 0 },

  // LAMPUNG
  { province: 'lampung', q: 'Kain tenun tradisional Lampung yang dihias dengan motif benang emas atau perak disebut?', opts: ['Kain Songket', 'Kain Tapis', 'Kain Ulos', 'Kain Sasirangan'], ans: 1 },
  { province: 'lampung', q: 'Taman Nasional di Lampung yang menjadi pusat penangkaran dan pelatihan gajah adalah?', opts: ['Way Kambas', 'Bukit Barisan Selatan', 'Ujung Kulon', 'Tanjung Puting'], ans: 0 },
  { province: 'lampung', q: 'Menara ikonik berwarna kuning-merah simbol selamat datang di Provinsi Lampung adalah?', opts: ['Menara Siger', 'Menara Pandang', 'Tugu Adipura', 'Tugu Juang'], ans: 0 },
  { province: 'lampung', q: 'Makanan khas Lampung yang dibuat dari olahan durian yang difermentasi disebut?', opts: ['Tempoyak', 'Seruit', 'Keripik Pisang', 'Lempok'], ans: 0 },
  { province: 'lampung', q: 'Aksara tradisional atau huruf kuno yang dimiliki oleh masyarakat adat Lampung disebut?', opts: ['Had Lampung', 'Jawa', 'Kaganga', 'Lontara'], ans: 0 },

  // BANTEN
  { province: 'banten', q: 'Suku asli yang terkenal hidup menjaga tradisi tanpa modernisasi di Banten adalah?', opts: ['Baduy', 'Dayak', 'Asmat', 'Toraja'], ans: 0 },
  { province: 'banten', q: 'Taman Nasional Ujung Kulon terkenal sebagai habitat asli dari hewan purba?', opts: ['Harimau Sumatera', 'Badak Jawa', 'Orangutan', 'Komodo'], ans: 1 },
  { province: 'banten', q: 'Pelabuhan utama yang menghubungkan Pulau Jawa dan Sumatra berada di daerah?', opts: ['Merak', 'Anyer', 'Serang', 'Cilegon'], ans: 0 },
  { province: 'banten', q: 'Boneka raksasa ikon budaya Betawi yang kerap diarak dalam festival di Jakarta disebut?', opts: ['Barong', 'Ondel-Ondel', 'Reog', 'Sigale-Gale'], ans: 1 },
  { province: 'banten', q: 'Makanan khas Betawi berupa omelet ketan berbalut telur bebek/ayam gurih disebut?', opts: ['Nasi Uduk', 'Kerak Telor', 'Soto Betawi', 'Asinan'], ans: 1 },

  // DKI JAKARTA
  { province: 'jakarta', q: 'Pulau wisata di Kepulauan Seribu yang terkenal dengan pantai pasir putihnya adalah?', opts: ['Pulau Tidung', 'Pulau Pari', 'Pulau Macan', 'Pulau Bidadari'], ans: 0 },
  { province: 'jakarta', q: 'Museum Fatahillah terletak di kawasan bersejarah bernama?', opts: ['Kota Tua', 'Kemang', 'Menteng', 'Glodok'], ans: 0 },
  { province: 'jakarta', q: 'Taman Mini Indonesia Indah (TMII) pertama kali diresmikan pada tahun berapa?', opts: ['1972', '1975', '1980', '1985'], ans: 1 },
  { province: 'jakarta', q: 'Monumen Nasional (Monas) dibangun untuk memperingati perjuangan melawan penjajah?', opts: ['Belanda', 'Jepang', 'Inggris', 'Portugis'], ans: 0 },
  { province: 'jakarta', q: 'Masjid ikonik di Jakarta dengan arsitektur modern yang berada di kawasan Bundaran HI adalah?', opts: ['Masjid Istiqlal', 'Masjid Sunda Kelapa', 'Masjid Al-Azhar', 'Masjid Cut Meutia'], ans: 0 },

  // JAWA BARAT
  { province: 'jawa-barat', q: 'Alat musik bambu khas Jawa Barat yang diakui UNESCO adalah?', opts: ['Gamelan', 'Angklung', 'Kolintang', 'Sasando'], ans: 1 },
  { province: 'jawa-barat', q: 'Tarian dinamis khas Jawa Barat yang diciptakan oleh Gugum Gumbira adalah?', opts: ['Tari Merak', 'Tari Jaipong', 'Tari Topeng', 'Tari Sisingaan'], ans: 1 },
  { province: 'jawa-barat', q: 'Wayang khas Jawa Barat yang terbuat dari bahan pahatan kayu disebut?', opts: ['Wayang Kulit', 'Wayang Golek', 'Wayang Orang', 'Wayang Beber'], ans: 1 },
  { province: 'jawa-barat', q: 'Danau kawah belerang berwarna putih eksotis di daerah Ciwidey bernama?', opts: ['Kawah Ijen', 'Kawah Putih', 'Kawah Ratu', 'Kawah Papandayan'], ans: 1 },
  { province: 'jawa-barat', q: 'Senjata tradisional sakral suku Sunda berbentuk melengkung khas disebut?', opts: ['Keris', 'Rencong', 'Kujang', 'Badik'], ans: 2 },

  // JAWA TENGAH
  { province: 'jawa-tengah', q: 'Candi Buddha terbesar di dunia yang terletak di Magelang adalah?', opts: ['Prambanan', 'Borobudur', 'Mendut', 'Pawon'], ans: 1 },
  { province: 'jawa-tengah', q: 'Pertunjukan teater bayangan boneka kulit khas Jawa disebut?', opts: ['Wayang Golek', 'Wayang Kulit', 'Wayang Orang', 'Ludruk'], ans: 1 },
  { province: 'jawa-tengah', q: 'Dataran tinggi di Jawa Tengah yang dijuluki "Negeri di Atas Awan" adalah?', opts: ['Dieng', 'Bromo', 'Ijen', 'Sindoro'], ans: 0 },
  { province: 'jawa-tengah', q: 'Bangunan kolonial kuno berarsitektur megah "Seribu Pintu" di Semarang disebut?', opts: ['Gedung Sate', 'Lawang Sewu', 'Benteng Vastenburg', 'Gereja Blenduk'], ans: 1 },
  { province: 'jawa-tengah', q: 'Batik khas dari daerah Jawa Tengah yang terkenal dengan motif halusnya adalah?', opts: ['Batik Pekalongan', 'Batik Solo', 'Batik Cirebon', 'Batik Madura'], ans: 1 },

  // D.I. YOGYAKARTA
  { province: 'yogyakarta', q: 'Yogyakarta adalah satu-satunya daerah di Indonesia yang berbentuk?', opts: ['Republik', 'Kesultanan aktif', 'Kerajaan', 'Federasi'], ans: 1 },
  { province: 'yogyakarta', q: 'Makanan khas Yogyakarta berupa olahan sayur nangka muda yang manis disebut?', opts: ['Rawon', 'Gudeg', 'Soto', 'Opor'], ans: 1 },
  { province: 'yogyakarta', q: 'Pusat belanja, budaya, dan jalan wisata paling ikonik di Yogyakarta adalah?', opts: ['Malioboro', 'Prawirotaman', 'Kotagede', 'Beringharjo'], ans: 0 },
  { province: 'yogyakarta', q: 'Tarian klasik keraton Yogyakarta yang ditarikan dengan anggun disebut?', opts: ['Tari Bedhaya', 'Tari Serimpi', 'Tari Gambyong', 'Tari Golek'], ans: 1 },
  { province: 'yogyakarta', q: 'Kawasan istana air pemandian bersejarah milik sultan di Yogyakarta disebut?', opts: ['Tamansari', 'Prambanan', 'Keraton', 'Imogiri'], ans: 0 },

  // JAWA TIMUR
  { province: 'jawa-timur', q: 'Tarian topeng singa raksasa berhias bulu merak khas Ponorogo disebut?', opts: ['Reog Ponorogo', 'Tari Gandrung', 'Tari Remo', 'Ludruk'], ans: 0 },
  { province: 'jawa-timur', q: 'Gunung berapi dengan lautan pasir yang terkenal di Jawa Timur adalah?', opts: ['Semeru', 'Bromo', 'Arjuno', 'Welirang'], ans: 1 },
  { province: 'jawa-timur', q: 'Sup daging sapi berkuah hitam pekat khas Jawa Timur disebut?', opts: ['Soto Lamongan', 'Rawon', 'Rujak Cingur', 'Lontong Balap'], ans: 1 },
  { province: 'jawa-timur', q: 'Lomba adu kecepatan pacu sapi khas Pulau Madura disebut?', opts: ['Karapan Sapi', 'Pacuan Kuda', 'Adu Banteng', 'Lari Sapi'], ans: 0 },
  { province: 'jawa-timur', q: 'Danau kawah dengan pesona fenomena api biru (blue fire) di Banyuwangi disebut?', opts: ['Kawah Putih', 'Kawah Ijen', 'Kawah Bromo', 'Kawah Semeru'], ans: 1 },

  // BALI
  { province: 'bali', q: 'Tari Kecak dari Bali mengambil cuplikan cerita dari epos mana?', opts: ['Mahabharata', 'Ramayana', 'Sutasoma', 'Arjunawiwaha'], ans: 1 },
  { province: 'bali', q: 'Sistem organisasi irigasi sawah tradisional Bali yang diakui UNESCO disebut?', opts: ['Subak', 'Gotong Royong', 'Tri Hita Karana', 'Ngaben'], ans: 0 },
  { province: 'bali', q: 'Hari raya suci umat Hindu Bali yang dirayakan dalam kesunyian total adalah?', opts: ['Hari Raya Galungan', 'Hari Raya Nyepi', 'Hari Raya Kuningan', 'Hari Raya Saraswati'], ans: 1 },
  { province: 'bali', q: 'Pura terbesar di kompleks lereng Gunung Agung Bali disebut?', opts: ['Pura Uluwatu', 'Pura Tanah Lot', 'Pura Besakih', 'Pura Tirta Empul'], ans: 2 },
  { province: 'bali', q: 'Upacara pembakaran jenazah dalam tradisi kebudayaan Hindu Bali disebut?', opts: ['Ngaben', 'Melasti', 'Galungan', 'Kuningan'], ans: 0 },

  // NUSA TENGGARA BARAT
  { province: 'nusa-tenggara-barat', q: 'Suku asli yang mendiami wilayah Pulau Lombok di Nusa Tenggara Barat adalah?', opts: ['Suku Sasak', 'Suku Sumba', 'Suku Mbojo', 'Suku Samawa'], ans: 0 },
  { province: 'nusa-tenggara-barat', q: 'Gugusan tiga pulau kecil eksotis bebas polusi motor di barat laut Lombok adalah?', opts: ['Gili Trawangan, Meno, Air', 'Gili Nanggu', 'Pulau Komodo', 'Pulau Moyo'], ans: 0 },
  { province: 'nusa-tenggara-barat', q: 'Gunung berapi tertinggi di Lombok yang menjadi lokasi pendakian favorit adalah?', opts: ['Gunung Tambora', 'Gunung Rinjani', 'Gunung Agung', 'Gunung Batur'], ans: 1 },
  { province: 'nusa-tenggara-barat', q: 'Kuliner ayam bakar pedas dengan bumbu khas Lombok yang sangat legendaris dinamakan?', opts: ['Ayam Taliwang', 'Ayam Betutu', 'Ayam Geprek', 'Ayam Woku'], ans: 0 },
  { province: 'nusa-tenggara-barat', q: 'Gunung berapi di Sumbawa yang letusan dahsyatnya tahun 1815 merubah iklim dunia adalah?', opts: ['Gunung Tambora', 'Gunung Rinjani', 'Gunung Krakatau', 'Gunung Kelud'], ans: 0 },

  // NUSA TENGGARA TIMUR
  { province: 'nusa-tenggara-timur', q: 'Taman Nasional tempat habitat asli dari kadal purba raksasa berada di provinsi?', opts: ['Bali', 'NTB', 'NTT', 'Maluku'], ans: 2 },
  { province: 'nusa-tenggara-timur', q: 'Destinasi gunung kawah unik yang memiliki tiga warna air dan dapat berubah adalah?', opts: ['Kelimutu', 'Sentani', 'Poso', 'Matano'], ans: 0 },
  { province: 'nusa-tenggara-timur', q: 'Rumah adat berbentuk kerucut tinggi khas suku Manggarai di Flores disebut?', opts: ['Mbaru Niang', 'Tongkonan', 'Honai', 'Lamin'], ans: 0 },
  { province: 'nusa-tenggara-timur', q: 'Alat musik petik tradisional NTT yang terbuat dari bahan anyaman daun lontar adalah?', opts: ['Sasando', 'Kolintang', 'Angklung', 'Saluang'], ans: 0 },
  { province: 'nusa-tenggara-timur', q: 'Kain tenun ikat tradisional NTT yang sarat makna simbolis dibuat di pulau?', opts: ['Pulau Sumba', 'Pulau Batam', 'Pulau Bali', 'Pulau Madura'], ans: 0 },

  // KALIMANTAN BARAT
  { province: 'kalimantan-barat', q: 'Kota di Kalimantan Barat yang dilewati oleh garis khatulistiwa secara persis adalah?', opts: ['Pontianak', 'Singkawang', 'Sintang', 'Ketapang'], ans: 0 },
  { province: 'kalimantan-barat', q: 'Rumah adat suku Dayak di Kalimantan Barat yang berbentuk panggung sangat panjang disebut?', opts: ['Rumah Radakng', 'Rumah Lamin', 'Rumah Betang', 'Rumah Banjar'], ans: 0 },
  { province: 'kalimantan-barat', q: 'Kota di Kalimantan Barat yang terkenal dengan perayaan Cap Go Meh terbesar adalah?', opts: ['Singkawang', 'Pontianak', 'Sambas', 'Mempawah'], ans: 0 },
  { province: 'kalimantan-barat', q: 'Tugu ikonik penanda titik nol derajat bumi di Kalimantan Barat dinamakan?', opts: ['Tugu Khatulistiwa', 'Tugu Digulis', 'Tugu Juang', 'Tugu Monas'], ans: 0 },
  { province: 'kalimantan-barat', q: 'Tarian tradisional suku Dayak Kalbar untuk menyambut musim panen padi disebut?', opts: ['Tari Jonggan', 'Tari Monong', 'Tari Zapin', 'Tari Piring'], ans: 0 },

  // KALIMANTAN TENGAH
  { province: 'kalimantan-tengah', q: 'Taman Nasional di Kalimantan Tengah tempat konservasi Orangutan terbesar adalah?', opts: ['Taman Nasional Tanjung Puting', 'Taman Nasional Kutai', 'Taman Nasional Sebangau', 'Taman Nasional Bukit Baka'], ans: 0 },
  { province: 'kalimantan-tengah', q: 'Tarian sakral suku Dayak Kalteng untuk mengusir penyakit dinamakan?', opts: ['Tari Tambun', 'Tari Balean Dadas', 'Tari Kancet', 'Tari Monong'], ans: 1 },
  { province: 'kalimantan-tengah', q: 'Senjata genggam tradisional suku Dayak yang sangat sakral dan berukir indah disebut?', opts: ['Mandau', 'Kujang', 'Keris', 'Rencong'], ans: 0 },
  { province: 'kalimantan-tengah', q: 'Ibu kota Kalimantan Tengah yang dirancang khusus oleh Presiden Soekarno adalah?', opts: ['Palangkaraya', 'Sampit', 'Pangkalan Bun', 'Buntok'], ans: 0 },
  { province: 'kalimantan-tengah', q: 'Kerajinan anyaman rotan bermotif magis khas buatan suku Dayak Kalteng disebut?', opts: ['Benang Bintik', 'Sasirangan', 'Anyaman Rotan', 'Tenun Ikat'], ans: 2 },

  // KALIMANTAN SELATAN
  { province: 'kalimantan-selatan', q: 'Tradisi perdagangan unik di Banjarmasin yang dilakukan di atas perahu disebut?', opts: ['Pasar Terapung', 'Pasar Malam', 'Pasar Lelang', 'Pasar Rakyat'], ans: 0 },
  { province: 'kalimantan-selatan', q: 'Kain batik tradisional khas suku Banjar di Kalimantan Selatan disebut?', opts: ['Sasirangan', 'Batik Benang', 'Songket', 'Tenun Pagatan'], ans: 0 },
  { province: 'kalimantan-selatan', q: 'Makanan khas Kalimantan Selatan berkuah rempah dengan suwiran ayam kampung adalah?', opts: ['Soto Banjar', 'Ketupat Kandangan', 'Cempedak', 'Gawi'], ans: 0 },
  { province: 'kalimantan-selatan', q: 'Pusat penambangan intan permata tradisional yang terkenal di Kalsel berada di?', opts: ['Martapura', 'Amuntai', 'Pelaihari', 'Tanjung'], ans: 0 },
  { province: 'kalimantan-selatan', q: 'Rumah adat arsitektur tradisional suku Banjar yang beratap tinggi disebut?', opts: ['Rumah Bubungan Tinggi', 'Rumah Lamin', 'Rumah Betang', 'Rumah Baloy'], ans: 0 },

  // KALIMANTAN TIMUR
  { province: 'kalimantan-timur', q: 'Ibu kota Kalimantan Timur sebelum pemindahan IKN adalah?', opts: ['Balikpapan', 'Samarinda', 'Bontang', 'Kutai Kartanegara'], ans: 1 },
  { province: 'kalimantan-timur', q: 'Hewan mamalia endemik cerdas air tawar di Sungai Mahakam Kaltim yang dilindungi adalah?', opts: ['Pesut Mahakam', 'Bekantan', 'Anoa', 'Maleo'], ans: 0 },
  { province: 'kalimantan-timur', q: 'Kepulauan surga bawah laut yang sangat populer untuk wisata diving di Berau adalah?', opts: ['Derawan', 'Raja Ampat', 'Bunaken', 'Wakatobi'], ans: 0 },
  { province: 'kalimantan-timur', q: 'Taman nasional di Kaltim yang terkenal dengan gua-gua purba adalah?', opts: ['Taman Nasional Kayan Mentarang', 'Taman Nasional Kutai', 'Taman Nasional Sangkulirang', 'Taman Nasional Bukit Suharto'], ans: 1 },
  { province: 'kalimantan-timur', q: 'Makanan khas Kaltim berupa olahan ikan air tawar yang dibakar dengan bumbu kuning disebut?', opts: ['Ikan Pais', 'Ikan Bakar Petis', 'Ikan Asam Pedas', 'Ikan Woku'], ans: 0 },

  // SULAWESI UTARA
  { province: 'sulawesi-utara', q: 'Taman laut internasional di Sulawesi Utara yang terkenal dengan keindahan terumbu karang adalah?', opts: ['Bunaken', 'Wakatobi', 'Raja Ampat', 'Togian'], ans: 0 },
  { province: 'sulawesi-utara', q: 'Alat musik tradisional Sulawesi Utara yang terbuat dari kayu ringan dan dipukul adalah?', opts: ['Kolintang', 'Angklung', 'Sasando', 'Saluang'], ans: 0 },
  { province: 'sulawesi-utara', q: 'Kuliner bubur campur aneka sayur segar khas daerah Manado dinamakan?', opts: ['Tinutuan', 'Coto', 'Papeda', 'Kapurung'], ans: 0 },
  { province: 'sulawesi-utara', q: 'Gunung berapi dengan kawah yang memiliki air asam jernih di Tomohon bernama?', opts: ['Gunung Lokon', 'Gunung Mahawu', 'Gunung Soputan', 'Gunung Klabat'], ans: 1 },
  { province: 'sulawesi-utara', q: 'Makanan pedas ekstrem khas Manado dengan campuran daging dan rempah disebut?', opts: ['RW (Rica-rica Wanua)', 'Ayam Rica-Rica', 'Babi Tepu', 'Pepetek'], ans: 0 },

  // SULAWESI TENGAH
  { province: 'sulawesi-tengah', q: 'Situs megalitikum berupa patung-patung batu purba misterius di Sulawesi Tengah terletak di?', opts: ['Lembah Bada', 'Lembah Palu', 'Lembah Napu', 'Lembah Behoa'], ans: 0 },
  { province: 'sulawesi-tengah', q: 'Burung endemik Sulawesi Tengah yang menimbun telur besarnya di dalam pasir hangat adalah?', opts: ['Burung Maleo', 'Burung Enggang', 'Burung Kasuari', 'Burung Merak'], ans: 0 },
  { province: 'sulawesi-tengah', q: 'Kuliner sup asam pedas gurih kaki sapi khas Palu dinamakan?', opts: ['Kaledo', 'Coto Makassar', 'Konro', 'Pallubasa'], ans: 0 },
  { province: 'sulawesi-tengah', q: 'Teluk yang terkenal dengan keindahan dan menjadi lokasi lomba perahu tradisional di Palu adalah?', opts: ['Teluk Palu', 'Teluk Tomini', 'Teluk Tolo', 'Teluk Bungku'], ans: 0 },
  { province: 'sulawesi-tengah', q: 'Makanan ringan khas dari sagu yang dibakar dan dinikmati dengan kelapa parut disebut?', opts: ['Sagu Lempeng', 'Sagu Roa', 'Sinonggi', 'Kapurung'], ans: 0 },

  // SULAWESI SELATAN
  { province: 'sulawesi-selatan', q: 'Rumah adat suku Toraja dengan bentuk atap seperti perahu disebut?', opts: ['Tongkonan', 'Rumah Gadang', 'Rumah Betang', 'Rumah Lamin'], ans: 0 },
  { province: 'sulawesi-selatan', q: 'Upacara pemakaman rambu solo di Toraja terkenal dengan tradisi?', opts: ['Potong jari', 'Ma\'nene', 'Ngaben', 'Galungan'], ans: 1 },
  { province: 'sulawesi-selatan', q: 'Kapal layar tradisional khas Sulawesi Selatan yang terkenal hingga mancanegara disebut?', opts: ['Pinisi', 'Sandeq', 'Jukung', 'Bago'], ans: 0 },
  { province: 'sulawesi-selatan', q: 'Makanan khas Makassar dari olahan daging sapi dengan kuah hitam kental adalah?', opts: ['Coto Makassar', 'Sop Konro', 'Pallubasa', 'Mie Titi'], ans: 0 },
  { province: 'sulawesi-selatan', q: 'Benteng peninggalan Kerajaan Gowa yang berada di Makassar adalah?', opts: ['Fort Rotterdam', 'Fort Somba Opu', 'Fort Marlborough', 'Fort de Kock'], ans: 0 },

  // SULAWESI TENGGARA
  { province: 'sulawesi-tenggara', q: 'Taman Nasional bawah laut terbaik di Sulawesi Tenggara adalah?', opts: ['Wakatobi', 'Bunaken', 'Raja Ampat', 'Derawan'], ans: 0 },
  { province: 'sulawesi-tenggara', q: 'Kain tenun tradisional suku Tolaki di Kendari disebut?', opts: ['Tenun Buton', 'Kain Wakatobi', 'Sasirangan', 'Songket'], ans: 0 },
  { province: 'sulawesi-tenggara', q: 'Benteng peninggalan Kesultanan Buton yang berbentuk unik disebut?', opts: ['Benteng Keraton Buton', 'Benteng Rotterdam', 'Benteng Marlborough', 'Benteng Vastenburg'], ans: 0 },
  { province: 'sulawesi-tenggara', q: 'Kota Baubau terkenal menggunakan aksara tradisional apa dalam kesehariannya?', opts: ['Aksara Lontara', 'Aksara Kaganga', 'Aksara Jawa', 'Aksara Bali'], ans: 0 },
  { province: 'sulawesi-tenggara', q: 'Makanan khas Sultra berupa ikan tuna yang dimasak dengan bumbu kuning disebut?', opts: ['Ikan Woku', 'Ikan Bakar', 'Pepes Ikan', 'Ikan Asam Pedas'], ans: 0 },

  // GORONTALO
  { province: 'gorontalo', q: 'Kain kerajinan sulaman tradisional bermotif rumit khas Gorontalo dinamakan?', opts: ['Karawo', 'Batik', 'Tenun', 'Sasirangan'], ans: 0 },
  { province: 'gorontalo', q: 'Sup makanan jagung manis tradisional khas Gorontalo bernama?', opts: ['Binte Biluhuta', 'Tinutuan', 'Kaledo', 'Coto'], ans: 0 },
  { province: 'gorontalo', q: 'Taman laut yang menjadi destinasi wisata baharu di Gorontalo adalah?', opts: ['Taman Laut Olele', 'Taman Laut Bunaken', 'Taman Laut Wakatobi', 'Taman Laut Derawan'], ans: 0 },
  { province: 'gorontalo', q: 'Rumah adat khas Gorontalo disebut?', opts: ['Rumah Dulohupa', 'Rumah Gadang', 'Rumah Tongkonan', 'Rumah Baloy'], ans: 0 },
  { province: 'gorontalo', q: 'Tarian pergaulan pemuda-pemudi khas Gorontalo disebut?', opts: ['Tari Saronde', 'Tari Dana-Dana', 'Tari Polopalo', 'Tari Langga'], ans: 0 },

  // MALUKU
  { province: 'maluku', q: 'Komoditas rempah asli Maluku yang sempat bernilai lebih mahal dari emas di Eropa abad kuno adalah?', opts: ['Lada dan Jahe', 'Pala dan Cengkeh', 'Kayu Manis', 'Kunyit'], ans: 1 },
  { province: 'maluku', q: 'Tarian ekspresi semangat perang adat khas Maluku disebut?', opts: ['Tari Cakalele', 'Tari Soya-Soya', 'Tari Lenso', 'Tari Bambu Gila'], ans: 0 },
  { province: 'maluku', q: 'Ikatan janji sakral persaudaraan antar kampung/desa adat di Maluku disebut?', opts: ['Pela Gandong', 'Sasi', 'Masohi', 'Basudara'], ans: 0 },
  { province: 'maluku', q: 'Pulau di Maluku yang terkenal dengan kampung nelayan apungnya adalah?', opts: ['Pulau Kei', 'Pulau Banda', 'Pulau Saparua', 'Pulau Seram'], ans: 0 },
  { province: 'maluku', q: 'Makanan khas Maluku berupa papeda dan ikan kuah kuning disebut?', opts: ['Papeda Ikan Kuah Kuning', 'Sayur Gatang', 'Nasi Lapola', 'Ikan Asar'], ans: 0 },

  // MALUKU UTARA
  { province: 'maluku-utara', q: 'Gugusan pulau kembar bersejarah pusat kesultanan Islam penghasil cengkeh di Maluku Utara adalah?', opts: ['Ternate & Tidore', 'Pulau Banda', 'Pulau Halmahera', 'Pulau Morotai'], ans: 0 },
  { province: 'maluku-utara', q: 'Kediaman resmi atau istana kedaton peninggalan Sultan Islam yang megah berada di?', opts: ['Ternate', 'Tidore', 'Ambon', 'Halmahera'], ans: 0 },
  { province: 'maluku-utara', q: 'Pulau di Malut yang menjadi lokasi pendaratan tentara Sekutu pada Perang Dunia II adalah?', opts: ['Pulau Morotai', 'Pulau Halmahera', 'Pulau Ternate', 'Pulau Bacan'], ans: 0 },
  { province: 'maluku-utara', q: 'Gunung api aktif yang menjadi ikon Kota Ternate adalah?', opts: ['Gunung Gamalama', 'Gunung Api Tidore', 'Gunung Dukono', 'Gunung Ibu'], ans: 0 },
  { province: 'maluku-utara', q: 'Makanan khas Malut dari singkong dan ikan tongkol disebut?', opts: ['Jaha', 'Papeda', 'Kolombeng', 'Nasi Kuning'], ans: 0 },

  // PAPUA
  { province: 'papua', q: 'Tas rajutan tangan tradisional asli buatan mama-mama Papua yang diakui UNESCO disebut?', opts: ['Noken', 'Ulos', 'Songket', 'Tapis'], ans: 0 },
  { province: 'papua', q: 'Puncak tertinggi di pegunungan Sudirman Papua yang dilapisi salju abadi bernama?', opts: ['Puncak Jaya', 'Puncak Mandala', 'Puncak Trikora', 'Puncak Semeru'], ans: 0 },
  { province: 'papua', q: 'Bubur makanan pokok tradisional dari tepung sagu bertekstur kental lengket khas Papua dinamakan?', opts: ['Papeda', 'Sinonggi', 'Tinutuan', 'Kapurung'], ans: 0 },
  { province: 'papua', q: 'Rumah adat panggung melingkar tanpa celah jendela milik suku Arfak di Papua bernama?', opts: ['Rumah Kaki Seribu', 'Rumah Honai', 'Rumah Tambi', 'Rumah Kariwari'], ans: 0 },
  { province: 'papua', q: 'Tarian perang tradisional dari suwa-suku di pedalaman Papua disebut?', opts: ['Tari Musyoh', 'Tari Yosim', 'Tari Pancar', 'Tari Suanggi'], ans: 0 },

  // PAPUA BARAT
  { province: 'papua-barat', q: 'Gugusan pulau karang indah di kepala burung Papua barat daya yang menjadi surga bawah laut dunia adalah?', opts: ['Raja Ampat', 'Pulau Derawan', 'Bunaken', 'Wakatobi'], ans: 0 },
  { province: 'papua-barat', q: 'Ibu kota Provinsi Papua Barat adalah?', opts: ['Manokwari', 'Sorong', 'Fakfak', 'Bintuni'], ans: 0 },
  { province: 'papua-barat', q: 'Taman nasional yang menjadi habitat burung cendrawasih di Papua Barat adalah?', opts: ['Taman Nasional Teluk Cenderawasih', 'Taman Nasional Wasur', 'Taman Nasional Lorentz', 'Taman Nasional Baliem'], ans: 0 },
  { province: 'papua-barat', q: 'Teluk terbesar di Indonesia yang berada di Papua Barat disebut?', opts: ['Teluk Cenderawasih', 'Teluk Bintuni', 'Teluk Berau', 'Teluk Doreri'], ans: 0 },
  { province: 'papua-barat', q: 'Makanan khas Papua Barat berupa daging panggang dengan bumbu rempah disebut?', opts: ['Papeda Ikan Bakar', 'Sayur Asam Garam', 'Kolombeng', 'Bakasang'], ans: 0 }
];