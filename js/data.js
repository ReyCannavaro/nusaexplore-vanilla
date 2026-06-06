const STORAGE_KEY = 'nusaexplore_user_data';
const THEME_KEY   = 'nusaexplore_theme';

const DEFAULT_USER_DATA = {
  keys: 1,
  unlockedRegions: [],
  completedGames: {},
  claimedRewards: [],
  quizScores: {},
  puzzleScores: {},
  totalScore: 0,
  gamesPlayed: 0,
};

function getUserData() {
  try {
    const d = localStorage.getItem(STORAGE_KEY);
    if (!d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER_DATA)); return {...DEFAULT_USER_DATA}; }
    return { ...DEFAULT_USER_DATA, ...JSON.parse(d) };
  } catch { return {...DEFAULT_USER_DATA}; }
}
function saveUserData(data) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); return true; } catch { return false; }
}
function getTheme() { return localStorage.getItem(THEME_KEY) || 'dark'; }
function saveTheme(t) { localStorage.setItem(THEME_KEY, t); }
function addKeys(n) { const d = getUserData(); d.keys += n; saveUserData(d); }
function unlockRegion(id, cost) {
  const d = getUserData();
  if (d.keys >= cost && !d.unlockedRegions.includes(id)) {
    d.keys -= cost; d.unlockedRegions.push(id); saveUserData(d); return true;
  }
  return false;
}
function markGameCompleted(provinceId, gameType) {
  const d = getUserData();
  if (!d.completedGames[provinceId]) d.completedGames[provinceId] = [];
  if (!d.completedGames[provinceId].includes(gameType)) d.completedGames[provinceId].push(gameType);
  saveUserData(d);
}
function hasCompletedAnyGame(provinceId) {
  const d = getUserData(); const c = d.completedGames[provinceId];
  return c && c.length > 0;
}
function canClaimReward(provinceId) {
  const d = getUserData();
  return hasCompletedAnyGame(provinceId) && !d.claimedRewards.includes(provinceId);
}
function claimProvinceReward(provinceId, keyReward) {
  const d = getUserData();
  if (!canClaimReward(provinceId)) return false;
  d.keys += keyReward;
  if (!d.claimedRewards) d.claimedRewards = [];
  d.claimedRewards.push(provinceId);
  saveUserData(d); return true;
}
function hasClaimedReward(provinceId) {
  const d = getUserData(); return d.claimedRewards && d.claimedRewards.includes(provinceId);
}
function saveQuizScore(regionId, score) {
  const d = getUserData(); d.quizScores[regionId] = score; d.gamesPlayed++; d.totalScore += score; saveUserData(d);
}
function resetUserData() { saveUserData(DEFAULT_USER_DATA); }

const DIFFICULTY_CONFIG = {
  mudah:  { unlockCost: 1, keyReward: 2, label: 'Mudah',  color: '#40916C' },
  sedang: { unlockCost: 2, keyReward: 3, label: 'Sedang', color: '#C9A84C' },
  susah:  { unlockCost: 3, keyReward: 5, label: 'Susah',  color: '#e74c3c' },
};

const regionDifficulty = {
  'aceh':'mudah','sumatera-utara':'mudah','dki-jakarta':'mudah','jawa-barat':'mudah',
  'jawa-timur':'mudah','bali':'mudah','yogyakarta':'mudah','riau':'mudah','jawa-tengah':'mudah',
  'sumatera-barat':'sedang','sumatera-selatan':'sedang','bengkulu':'sedang','lampung':'sedang',
  'jambi':'sedang','banten':'sedang','bangka-belitung':'sedang','kepulauan-riau':'sedang',
  'nusa-tenggara-barat':'sedang','nusa-tenggara-timur':'sedang','kalimantan-barat':'sedang',
  'kalimantan-selatan':'sedang','sulawesi-utara':'sedang','sulawesi-tengah':'sedang',
  'sulawesi-selatan':'sedang','sulawesi-tenggara':'sedang','sulawesi-barat':'sedang','maluku':'sedang',
  'kalimantan-tengah':'susah','kalimantan-timur':'susah','kalimantan-utara':'susah',
  'maluku-utara':'susah','gorontalo':'susah','papua-barat':'susah','papua-barat-daya':'susah',
  'papua-tengah':'susah','papua-selatan':'susah','papua-pegunungan':'susah','papua':'susah',
};

function getDifficultyInfo(regionId) {
  const diff = regionDifficulty[regionId] || 'sedang';
  return { difficulty: diff, ...DIFFICULTY_CONFIG[diff] };
}

const regionData = {
  sumatera: {
    province: '10 Provinsi · Pulau Terbesar ke-6 Dunia', name: 'Sumatera', emoji: '🌋',
    color: 'linear-gradient(135deg,#1A2F1E,#2D6A4F)',
    desc: 'Pulau Sumatera adalah rumah bagi kekayaan alam dan budaya yang luar biasa. Dari Batak di Utara dengan rumah adatnya yang megah, Minangkabau di Barat dengan tradisi matrilinealnya yang unik, hingga Lampung di Selatan dengan kain tapis yang memukau.',
    tags: ['Rumah Adat Batak','Tari Tor-Tor','Kain Tapis','Rendang Minang','Danau Toba'],
    cards: [{icon:'🏠',title:'Rumah Gadang',sub:'Arsitektur Minangkabau'},{icon:'💃',title:'Tari Saman',sub:'Warisan UNESCO Aceh'},{icon:'🎵',title:'Gondang Batak',sub:'Musik Tradisional'}]
  },
  jawa: {
    province: '6 Provinsi · Pulau Terpadat di Dunia', name: 'Jawa', emoji: '🎨',
    color: 'linear-gradient(135deg,#2A1A10,#6B3A1A)',
    desc: 'Jawa adalah jantung budaya Indonesia — pusat kerajaan-kerajaan besar seperti Majapahit dan Mataram. Di sini lahir batik yang menjadi warisan UNESCO, wayang kulit yang berusia ribuan tahun, gamelan yang mendunia.',
    tags: ['Batik UNESCO','Wayang Kulit','Gamelan','Candi Borobudur','Keraton Yogya'],
    cards: [{icon:'🎨',title:'Batik Jawa',sub:'Warisan Dunia UNESCO'},{icon:'🎭',title:'Wayang Kulit',sub:'1,000 Tahun Tradisi'},{icon:'🏯',title:'Borobudur',sub:'Candi Buddha Terbesar'}]
  },
  kalimantan: {
    province: '5 Provinsi · Pulau Terbesar ke-3 Dunia', name: 'Kalimantan', emoji: '🌿',
    color: 'linear-gradient(135deg,#0A1A14,#1A4A30)',
    desc: 'Kalimantan adalah hutan tropis tertua di bumi. Suku Dayak menjaga tradisi dan kearifan lokal yang telah berusia ribuan tahun — dari ukiran Mandau, tarian Hudoq, hingga rumah panjang.',
    tags: ['Budaya Dayak','Mandau','Tari Hudoq','Rumah Panjang','Manik-manik'],
    cards: [{icon:'🗡️',title:'Mandau',sub:'Senjata Pusaka Dayak'},{icon:'🏡',title:'Rumah Panjang',sub:'Arsitektur Komunal'},{icon:'💎',title:'Manik Dayak',sub:'Seni Perhiasan Tinggi'}]
  },
  sulawesi: {
    province: '6 Provinsi · Pulau Angin Empat Sisi', name: 'Sulawesi', emoji: '⛵',
    color: 'linear-gradient(135deg,#1A1A35,#3A2A6A)',
    desc: 'Sulawesi adalah pulau yang paling unik bentuknya dan kaya tradisinya. Suku Toraja di pedalaman dikenal dengan upacara pemakaman Rambu Solo yang spektakuler dan rumah adat Tongkonan.',
    tags: ['Toraja','Rambu Solo','Perahu Pinisi','Rumah Tongkonan','Tari Pakarena'],
    cards: [{icon:'⛵',title:'Perahu Pinisi',sub:'Armada Pelaut Bugis'},{icon:'🏠',title:'Tongkonan',sub:'Rumah Adat Toraja'},{icon:'🎪',title:'Rambu Solo',sub:'Upacara Pemakaman Agung'}]
  },
  bali: {
    province: '3 Provinsi · Pulau Dewata', name: 'Bali & Nusa Tenggara', emoji: '🌺',
    color: 'linear-gradient(135deg,#2A1535,#6B1A5C)',
    desc: 'Bali adalah jiwa spiritual Indonesia — pulau di mana seni adalah kehidupan dan kehidupan adalah seni. Tari Kecak, Legong, dan Barong memukau dunia.',
    tags: ['Tari Kecak','Kain Endek','Upacara Nyepi','Tenun NTT','Ogoh-ogoh'],
    cards: [{icon:'💃',title:'Tari Kecak',sub:'Tari Api Bali'},{icon:'🧵',title:'Tenun Ikat',sub:'Kain Tradisional NTT'},{icon:'🪔',title:'Nyepi',sub:'Hari Keheningan Bali'}]
  },
  maluku: {
    province: '2 Provinsi · Kepulauan Rempah Dunia', name: 'Maluku', emoji: '🌶️',
    color: 'linear-gradient(135deg,#1A0A0A,#4A1010)',
    desc: 'Maluku adalah "Kepulauan Rempah" — tempat asal cengkeh dan pala yang pernah mengubah sejarah dunia dan memicu zaman penjelajahan samudra.',
    tags: ['Rempah Cengkeh','Tari Cakalele','Musik Tifa','Baileo','Pattimura'],
    cards: [{icon:'🌶️',title:'Cengkeh & Pala',sub:'Rempah Pengubah Dunia'},{icon:'🥁',title:'Tifa & Totobuang',sub:'Alat Musik Tradisional'},{icon:'💃',title:'Tari Cakalele',sub:'Tari Perang Maluku'}]
  },
  papua: {
    province: '6 Provinsi · Tanah di Ujung Timur', name: 'Papua', emoji: '🦜',
    color: 'linear-gradient(135deg,#0A1A0A,#1A4A1A)',
    desc: 'Papua menyimpan kebudayaan yang paling orisinil dan belum tersentuh di dunia. Suku Asmat dikenal dengan ukiran kayu yang diakui sebagai seni tinggi oleh museum-museum dunia.',
    tags: ['Ukiran Asmat','Festival Baliem','Koteka','Noken UNESCO','Tari Yospan'],
    cards: [{icon:'🪵',title:'Ukiran Asmat',sub:'Seni Dunia dari Papua'},{icon:'👜',title:'Noken',sub:'Tas Rajut Warisan UNESCO'},{icon:'🎪',title:'Festival Baliem',sub:'Tradisi Suku Dani'}]
  }
};

const regionToIslandMap = {
  'aceh':'sumatera','sumatera-utara':'sumatera','sumatera-barat':'sumatera','riau':'sumatera',
  'kepulauan-riau':'sumatera','jambi':'sumatera','sumatera-selatan':'sumatera',
  'bangka-belitung':'sumatera','bengkulu':'sumatera','lampung':'sumatera',
  'dki-jakarta':'jawa','jawa-barat':'jawa','banten':'jawa','jawa-tengah':'jawa',
  'yogyakarta':'jawa','jawa-timur':'jawa',
  'kalimantan-utara':'kalimantan','kalimantan-barat':'kalimantan','kalimantan-tengah':'kalimantan',
  'kalimantan-selatan':'kalimantan','kalimantan-timur':'kalimantan',
  'sulawesi-utara':'sulawesi','gorontalo':'sulawesi','sulawesi-tengah':'sulawesi',
  'sulawesi-barat':'sulawesi','sulawesi-selatan':'sulawesi','sulawesi-tenggara':'sulawesi',
  'bali':'bali','nusa-tenggara-barat':'bali','nusa-tenggara-timur':'bali',
  'maluku':'maluku','maluku-utara':'maluku',
  'papua':'papua','papua-barat':'papua','papua-barat-daya':'papua',
  'papua-tengah':'papua','papua-selatan':'papua','papua-pegunungan':'papua'
};

const culturesData = [
  {
    id:1, tag:'Seni Tekstil · UNESCO 2009', title:'Batik', titleFull:'Batik — Lukisan Jiwa Nusantara',
    sub:'3,000+ motif dari seluruh Indonesia', emoji:'🎨', className:'c1 main',
    image:'src/assets/batik2.jpg', popupImage:'src/assets/batik3.jpg',
    description:`Batik adalah seni melukis di atas kain menggunakan teknik perintangan warna dengan malam (lilin) panas. Kata "batik" berasal dari bahasa Jawa — "amba" (menulis) dan "titik".\n\nBerkembang sejak abad ke-13 di keraton Jawa, setiap motif batik menyimpan makna filosofis mendalam. Parang melambangkan kekuatan, Kawung melambangkan kesucian, sedangkan Megamendung dari Cirebon menggambarkan awan pembawa kesuburan.\n\nPada 2 Oktober 2009, UNESCO resmi mengakui Batik Indonesia sebagai Warisan Kemanusiaan Budaya Lisan dan Nonbendawi.`,
    facts:['3,000+ motif tercatat','Diakui UNESCO 2 Oktober 2009','Tersebar di 34 provinsi','Ekspor ~$58 juta/tahun'],
    origin:'Jawa (Yogyakarta, Solo, Pekalongan, Cirebon)', era:'Abad ke-13 hingga kini',
  },
  {
    id:2, tag:'Tari Tradisional · UNESCO 2015', title:'Tari Kecak', titleFull:'Kecak — Tari Api dari Bali',
    sub:'Ritual sakral 200+ penari', emoji:'🔥', className:'c2',
    image:'src/assets/kecak.jpg', popupImage:'src/assets/kecak2.jpg',
    description:`Tari Kecak adalah pertunjukan seni dramatari khas Bali yang menampilkan puluhan hingga ratusan pria bertelanjang dada, duduk melingkar, dan berseru "cak-cak-cak" secara ritmis tanpa iringan alat musik.\n\nDiciptakan pada tahun 1930-an oleh seniman Wayan Limbak bersama pelukis Jerman Walter Spies, Kecak mengangkat kisah Ramayana.\n\nTari Bali, termasuk Kecak, diakui UNESCO pada 2015 sebagai Warisan Budaya Takbenda.`,
    facts:['Diciptakan tahun 1930-an','Diakui UNESCO 2015','200+ penari dalam satu pertunjukan','Tanpa alat musik — hanya suara manusia'],
    origin:'Bali, Indonesia', era:'1930-an hingga kini',
  },
  {
    id:3, tag:'Kuliner · UNESCO 2023', title:'Rendang', titleFull:'Rendang — Cita Rasa Paling Dicinta Dunia',
    sub:'Masakan terlezat versi CNN & TasteAtlas', emoji:'🍖', className:'c3',
    image:'src/assets/rendang.jpg', popupImage:'src/assets/rendang2.jpg',
    description:`Rendang adalah masakan daging sapi berbumbu kaya rempah dari tradisi Minangkabau, Sumatera Barat. Dimasak dengan santan kelapa dan lebih dari 20 jenis rempah selama berjam-jam.\n\nProses memasak rendang yang panjang adalah filosofi kesabaran dan kebijaksanaan Minangkabau. Rendang kering dapat bertahan hingga sebulan tanpa lemari es.\n\nCNN Travel berulang kali menempatkan Rendang sebagai makanan terlezat di dunia.`,
    facts:['Bertahan hingga 1 bulan tanpa kulkas','Butuh 4-8 jam memasak','20+ jenis rempah','Masakan terlezat dunia versi CNN'],
    origin:'Minangkabau, Sumatera Barat', era:'Abad ke-13 hingga kini',
  },
  {
    id:4, tag:'Seni Musik · Tradisional', title:'Gamelan', titleFull:'Gamelan — Orkestra Jiwa Jawa',
    sub:'Ansambel musik 1,000 tahun', emoji:'🥁', className:'c4',
    image:'src/assets/gamelan.jpg', popupImage:'src/assets/gamelan2.jpg',
    description:`Gamelan adalah ansambel musik tradisional dari Jawa dan Bali yang menggunakan berbagai instrumen perkusi. UNESCO mengakui Gamelan sebagai Warisan Budaya Takbenda pada 2021.\n\nSetiap gamelan memiliki karakter unik — tidak ada dua set gamelan yang benar-benar sama dalam nada dan timbre.`,
    facts:['Diakui UNESCO 2021','Terdiri 20+ instrumen','Dipelajari di universitas dunia','Berkembang sejak abad ke-9'],
    origin:'Jawa & Bali', era:'Abad ke-9 hingga kini',
  },
  {
    id:5, tag:'Seni Pertunjukan · UNESCO', title:'Wayang Kulit', titleFull:'Wayang — Bayangan Peradaban',
    sub:'Pertunjukan epik semalam suntuk', emoji:'🎭', className:'c5',
    image:'src/assets/wayang.jpg', popupImage:'src/assets/wayang2.jpg',
    description:`Wayang Kulit adalah pertunjukan boneka bayangan tradisional yang berasal dari Jawa. Dalang memainkan ratusan karakter dalam satu pertunjukan yang bisa berlangsung sepanjang malam.\n\nUNESCO mengakui Wayang sebagai Warisan Kemanusiaan pada 2008.`,
    facts:['Diakui UNESCO 2008','Dalang hafal ratusan tokoh','Pertunjukan berlangsung 8-9 jam','Tersebar di seluruh Jawa & Bali'],
    origin:'Jawa, Indonesia', era:'Abad ke-10 hingga kini',
  },
];

const quizData = [
  {province:'general',q:'Batik Indonesia diakui sebagai warisan budaya oleh organisasi internasional mana?',opts:['UNESCO','UNICEF','WHO','WTO'],ans:0},
  {province:'general',q:'Candi Borobudur adalah candi agama apa dan terletak di provinsi mana?',opts:['Hindu - Jawa Timur','Buddha - Jawa Tengah','Hindu - Yogyakarta','Islam - Jawa Barat'],ans:1},
  {province:'general',q:'Perahu Pinisi adalah keahlian pelaut tradisional dari suku mana?',opts:['Dayak','Batak','Bugis-Makassar','Toraja'],ans:2},
  {province:'general',q:'Noken — tas rajut tradisional yang menjadi warisan UNESCO — berasal dari mana?',opts:['Kalimantan','Maluku','Bali','Papua'],ans:3},
  {province:'general',q:'Gamelan adalah ensembel musik tradisional yang berasal dari pulau mana?',opts:['Sumatera','Sulawesi','Jawa & Bali','Kalimantan'],ans:2},
  {province:'general',q:'Cengkeh dan pala yang pernah mengubah sejarah perdagangan dunia berasal dari?',opts:['Maluku','Papua','Sulawesi','Sumatera'],ans:0},
  {province:'general',q:'Rumah adat Gadang dengan atap melengkung khas adalah milik suku mana?',opts:['Batak','Minangkabau','Sunda','Jawa'],ans:1},
  {province:'general',q:'Festival Lembah Baliem yang menampilkan tradisi perang suku diadakan di mana?',opts:['Flores','Papua','Sulawesi','Maluku'],ans:1},
  {province:'general',q:'Upacara pemakaman mewah "Rambu Solo" adalah tradisi suku mana?',opts:['Asmat','Toraja','Baduy','Tengger'],ans:1},
  {province:'general',q:'Tari Saman yang terkenal dari Aceh dijuluki sebagai apa?',opts:['Tari Seribu Tangan','Tari Api','Tari Perang','Tari Langit'],ans:0},
  {province:'aceh',q:'Tari Saman dari Aceh diakui oleh UNESCO sebagai warisan budaya tak benda pada tahun?',opts:['2009','2011','2015','2018'],ans:1},
  {province:'aceh',q:'Senjata tradisional khas Aceh yang berbentuk melengkung disebut?',opts:['Keris','Rencong','Badik','Mandau'],ans:1},
  {province:'aceh',q:'Kopi khas Aceh yang terkenal di dunia berasal dari dataran tinggi mana?',opts:['Gayo','Alas','Singkil','Tamiang'],ans:0},
  {province:'aceh',q:'Masjid Raya Baiturrahman terletak di kota mana?',opts:['Sabang','Lhokseumawe','Banda Aceh','Meulaboh'],ans:2},
  {province:'aceh',q:'Aceh mendapat julukan apa karena menjadi pintu masuk Islam di Nusantara?',opts:['Serambi Mekah','Tanah Rencong','Bumi Iskandar','Negeri Syariah'],ans:0},
  {province:'sumatera-utara',q:'Danau Toba terbentuk dari letusan supervulkan berapa tahun yang lalu?',opts:['10.000 tahun','74.000 tahun','200.000 tahun','1 juta tahun'],ans:1},
  {province:'sumatera-utara',q:'Kain sakral suku Batak yang digunakan dalam upacara adat disebut?',opts:['Ulos','Songket','Tapis','Sasirangan'],ans:0},
  {province:'sumatera-utara',q:'Tarian tradisional suku Batak yang terkenal adalah?',opts:['Tor-Tor','Saman','Kecak','Jaipong'],ans:0},
  {province:'sumatera-utara',q:'Pulau yang terletak di tengah Danau Toba disebut?',opts:['Pulau Nias','Pulau Samosir','Pulau Batam','Pulau Bintan'],ans:1},
  {province:'sumatera-utara',q:'Tradisi lompat batu yang terkenal berasal dari suku mana di Sumatera Utara?',opts:['Batak Toba','Karo','Nias','Mandailing'],ans:2},
  {province:'bali',q:'Tari Kecak dari Bali mengambil cerita dari epos mana?',opts:['Mahabharata','Ramayana','Sutasoma','Arjunawiwaha'],ans:1},
  {province:'bali',q:'Sistem irigasi sawah tradisional Bali yang diakui UNESCO disebut?',opts:['Subak','Gotong Royong','Tri Hita Karana','Ngaben'],ans:0},
  {province:'bali',q:'Hari raya Nyepi di Bali adalah hari?',opts:['Hari Raya Panen','Tahun Baru Saka','Hari Ulang Tahun Pura','Hari Pemurnian'],ans:1},
  {province:'bali',q:'Pura terbesar di Bali yang disebut "Mother Temple" adalah?',opts:['Pura Uluwatu','Pura Tanah Lot','Pura Besakih','Pura Tirta Empul'],ans:2},
  {province:'bali',q:'Upacara pembakaran jenazah dalam tradisi Hindu Bali disebut?',opts:['Ngaben','Melasti','Galungan','Kuningan'],ans:0},
  {province:'jawa-barat',q:'Alat musik bambu khas Jawa Barat yang diakui UNESCO adalah?',opts:['Gamelan','Angklung','Kolintang','Sasando'],ans:1},
  {province:'jawa-barat',q:'Tarian dinamis khas Jawa Barat yang diciptakan oleh Gugum Gumbira adalah?',opts:['Tari Merak','Tari Jaipong','Tari Topeng','Tari Sisingaan'],ans:1},
  {province:'jawa-barat',q:'Wayang khas Jawa Barat yang terbuat dari kayu disebut?',opts:['Wayang Kulit','Wayang Golek','Wayang Orang','Wayang Beber'],ans:1},
  {province:'jawa-barat',q:'Danau kawah belerang berwarna putih di Ciwidey bernama?',opts:['Kawah Ijen','Kawah Putih','Kawah Ratu','Kawah Papandayan'],ans:1},
  {province:'jawa-barat',q:'Senjata tradisional sakral suku Sunda berbentuk khas disebut?',opts:['Keris','Rencong','Kujang','Badik'],ans:2},
  {province:'dki-jakarta',q:'Boneka raksasa ikon budaya Betawi yang diarak dalam festival disebut?',opts:['Barong','Ondel-Ondel','Reog','Sigale-Gale'],ans:1},
  {province:'dki-jakarta',q:'Makanan khas Betawi berupa omelet ketan dan telur bebek disebut?',opts:['Nasi Uduk','Kerak Telor','Soto Betawi','Asinan'],ans:1},
  {province:'dki-jakarta',q:'Kawasan bersejarah peninggalan kolonial Belanda di Jakarta disebut?',opts:['Menteng','Kota Tua','Glodok','Kemayoran'],ans:1},
  {province:'dki-jakarta',q:'Musik akulturasi Cina-Betawi yang khas Jakarta disebut?',opts:['Tanjidor','Gambang Kromong','Keroncong','Dangdut'],ans:1},
  {province:'dki-jakarta',q:'Monumen Nasional (Monas) dilapisi emas yang berasal dari provinsi mana?',opts:['Aceh','Bengkulu','Sumatera Barat','Riau'],ans:1},
  {province:'jawa-tengah',q:'Candi Buddha terbesar di dunia yang terletak di Magelang adalah?',opts:['Prambanan','Borobudur','Mendut','Pawon'],ans:1},
  {province:'jawa-tengah',q:'Pertunjukan bayangan boneka kulit khas Jawa disebut?',opts:['Wayang Golek','Wayang Kulit','Wayang Orang','Ludruk'],ans:1},
  {province:'jawa-tengah',q:'Dataran tinggi di Jawa Tengah yang dijuluki "Negeri di Atas Awan" adalah?',opts:['Dieng','Bromo','Ijen','Sindoro'],ans:0},
  {province:'jawa-tengah',q:'Bangunan kolonial "Seribu Pintu" di Semarang disebut?',opts:['Gedung Sate','Lawang Sewu','Benteng Vastenburg','Gereja Blenduk'],ans:1},
  {province:'jawa-tengah',q:'Batik khas keraton Solo dengan motif halus disebut?',opts:['Batik Pekalongan','Batik Solo','Batik Cirebon','Batik Madura'],ans:1},
  {province:'yogyakarta',q:'Yogyakarta adalah satu-satunya daerah di Indonesia yang berbentuk?',opts:['Republik','Kesultanan aktif','Kerajaan','Federasi'],ans:1},
  {province:'yogyakarta',q:'Tarian klasik keraton Yogyakarta yang anggun disebut?',opts:['Tari Bedhaya','Tari Serimpi','Tari Gambyong','Tari Golek'],ans:1},
  {province:'yogyakarta',q:'Pusat belanja dan wisata ikonik di Yogyakarta adalah?',opts:['Malioboro','Prawirotaman','Kotagede','Beringharjo'],ans:0},
  {province:'yogyakarta',q:'Pemandian bersejarah milik sultan di Yogyakarta disebut?',opts:['Tamansari','Prambanan','Keraton','Imogiri'],ans:0},
  {province:'yogyakarta',q:'Makanan khas Yogyakarta berupa sayur nangka muda yang manis disebut?',opts:['Rawon','Gudeg','Soto','Opor'],ans:1},
  {province:'jawa-timur',q:'Tarian topeng singa raksasa khas Ponorogo disebut?',opts:['Reog Ponorogo','Tari Gandrung','Tari Remo','Ludruk'],ans:0},
  {province:'jawa-timur',q:'Sup daging sapi berkuah hitam khas Jawa Timur disebut?',opts:['Soto Lamongan','Rawon','Rujak Cingur','Lontong Balap'],ans:1},
  {province:'jawa-timur',q:'Lomba balap sapi khas Madura disebut?',opts:['Karapan Sapi','Pacuan Kuda','Adu Banteng','Lari Sapi'],ans:0},
  {province:'jawa-timur',q:'Gunung berapi dengan lautan pasir yang terkenal di Jawa Timur adalah?',opts:['Semeru','Bromo','Arjuno','Welirang'],ans:1},
  {province:'jawa-timur',q:'Danau kawah dengan api biru di Banyuwangi disebut?',opts:['Kawah Putih','Kawah Ijen','Kawah Bromo','Kawah Semeru'],ans:1},
  {province:'sulawesi-selatan',q:'Kapal layar kayu tradisional dari Sulawesi Selatan yang diakui UNESCO disebut?',opts:['Perahu Sandeq','Kapal Pinisi','Perahu Jukung','Kapal Lancang'],ans:1},
  {province:'sulawesi-selatan',q:'Ritual pemakaman paling unik di dunia dari Tana Toraja disebut?',opts:['Ngaben','Rambu Solo','Tiwah','Kasada'],ans:1},
  {province:'sulawesi-selatan',q:'Tarian lembut penuh filosofi khas Makassar disebut?',opts:['Tari Pakarena','Tari Padduppa','Tari Bissu','Tari Ma\'randing'],ans:0},
  {province:'sulawesi-selatan',q:'Sup daging kuah kacang rempah khas Makassar disebut?',opts:['Konro','Coto Makassar','Pallubasa','Kapurung'],ans:1},
  {province:'sulawesi-selatan',q:'Hutan batu karst terluas kedua di dunia ada di kabupaten mana?',opts:['Gowa','Maros','Bone','Luwu'],ans:1},
  {province:'maluku',q:'Tarian perang tradisional Maluku disebut?',opts:['Tari Cakalele','Tari Soya-Soya','Tari Lenso','Tari Bambu Gila'],ans:0},
  {province:'maluku',q:'Rempah asli Maluku yang pernah menjadi komoditas paling berharga di dunia adalah?',opts:['Lada dan Jahe','Pala dan Cengkeh','Kayu Manis dan Kapulaga','Kunyit dan Kemiri'],ans:1},
  {province:'maluku',q:'Pantai yang dijuluki "Maladewa-nya Indonesia" di Maluku adalah?',opts:['Pantai Natsepa','Pantai Ora','Pantai Ngurbloat','Pantai Namalatu'],ans:1},
  {province:'maluku',q:'Makanan pokok berupa bubur sagu bening khas Maluku disebut?',opts:['Sagu Lempeng','Papeda','Sinonggi','Kasuami'],ans:1},
  {province:'maluku',q:'Ikatan persaudaraan antar desa di Maluku yang sakral disebut?',opts:['Pela Gandong','Sasi','Masohi','Basudara'],ans:0},
];

function getQuizForProvince(slug) {
  const specific = quizData.filter(q => q.province === slug);
  if (specific.length >= 5) return shuffle(specific).slice(0, 5);
  const general = quizData.filter(q => q.province === 'general');
  return shuffle([...specific, ...general]).slice(0, 5);
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const provinceDetailData = [
  {
    slug:'aceh', name:'Aceh', region:'Sumatera',
    tagline:'Serambi Mekah — Pintu Gerbang Islam di Nusantara',
    capital:'Banda Aceh', population:'5,4 Juta Jiwa', area:'57.956 km²', language:'Aceh, Gayo, Alas',
    heroImage:'/images/provinces/aceh-hero.jpg',
    description:'Provinsi paling barat Indonesia dengan otonomi khusus syariah dan sejarah kesultanan yang megah. Aceh adalah salah satu daerah yang pertama kali menerima pengaruh Islam di Nusantara.',
    culture:[
      {image:'/images/culture/Aceh/aceh-1.jpg',title:'Masjid Raya Baiturrahman',description:'Simbol kejayaan dan ketahanan rakyat Aceh.'},
      {image:'/images/culture/Aceh/aceh-2.jpg',title:'Tari Saman',description:'Tarian ribuan tangan yang diakui UNESCO.'},
      {image:'/images/culture/Aceh/aceh-3.jpg',title:'Rencong',description:'Senjata tradisional simbol keberanian.'},
    ],
    tourism:[
      {image:'/images/tourism/Aceh/aceh-1.jpg',name:'Museum Tsunami',location:'Banda Aceh',description:'Monumen pengingat bencana 2004.'},
      {image:'/images/tourism/Aceh/aceh-2.jpg',name:'Pulau Weh',location:'Sabang',description:'Titik nol kilometer barat Indonesia.'},
      {image:'/images/tourism/Aceh/aceh-3.jpg',name:'Danau Laut Tawar',location:'Takengon',description:'Danau indah di dataran tinggi Gayo.'},
    ],
    culinary:[
      {image:'/images/culinary/Aceh/aceh-1.jpg',name:'Mie Aceh',description:'Mie bumbu kari pedas khas rempah.'},
      {image:'/images/culinary/Aceh/aceh-2.jpg',name:'Kopi Gayo',description:'Kopi Arabika terbaik kelas dunia.'},
      {image:'/images/culinary/Aceh/aceh-3.jpg',name:'Ayam Tangkap',description:'Ayam goreng dengan daun koja kering.'},
    ],
    facts:['Satu-satunya hukum syariah di Indonesia','Titik 0 Km wilayah Indonesia','Penyumbang emas untuk Monas','Selamat dari Tsunami 2004','Kopi Arabika Gayo terbaik dunia'],
  },
  {
    slug:'sumatera-utara', name:'Sumatera Utara', region:'Sumatera',
    tagline:'Negeri Berbilang Kaum — Pesona Toba',
    capital:'Medan', population:'15,4 Juta Jiwa', area:'72.981 km²', language:'Batak, Melayu, Nias',
    heroImage:'/images/provinces/sumut-hero.jpg',
    description:'Rumah bagi Danau Toba, danau vulkanik terbesar di dunia dan budaya Batak yang kuat. Medan adalah kota ketiga terbesar di Indonesia dengan kekayaan kuliner yang luar biasa.',
    culture:[
      {image:'/images/culture/Sumatra_Utara/sumut-1.jpg',title:'Rumah Bolon',description:'Rumah adat suku Batak.'},
      {image:'/images/culture/Sumatra_Utara/sumut-2.jpg',title:'Kain Ulos',description:'Kain sakral untuk upacara adat.'},
      {image:'/images/culture/Sumatra_Utara/sumut-3.jpg',title:'Tari Tor-Tor',description:'Tarian ritual dan pergaulan Batak.'},
    ],
    tourism:[
      {image:'/images/tourism/Sumatera_Utara/sumut-1.jpg',name:'Danau Toba',location:'Samosir',description:'Danau vulkanik terbesar di dunia.'},
      {image:'/images/tourism/Sumatera_Utara/sumut-2.jpg',name:'Istana Maimun',location:'Medan',description:'Istana Kesultanan Deli bersejarah.'},
      {image:'/images/tourism/Sumatera_Utara/sumut-3.jpg',name:'Bukit Lawang',location:'Langkat',description:'Pusat konservasi orangutan Sumatera.'},
    ],
    culinary:[
      {image:'/images/culinary/Sumatera_Utara/sumut-1.jpg',name:'Babi Panggang Karo',description:'Hidangan khas suku Karo.'},
      {image:'/images/culinary/Sumatera_Utara/sumut-2.jpg',name:'Soto Medan',description:'Soto berkuah santan kaya rempah.'},
      {image:'/images/culinary/Sumatera_Utara/sumut-3.jpg',name:'Arsik',description:'Ikan mas bumbu kuning khas Batak.'},
    ],
    facts:['Danau Toba = 100x Danau Batur','Supervulkan meletus 74.000 tahun lalu','Pulau Samosir lebih besar dari Singapura','Asal suku Batak yang tersebar ke seluruh Indonesia','Durian Medan terkenal paling enak'],
  },
  {
    slug:'dki-jakarta', name:'DKI Jakarta', region:'Jawa',
    tagline:'Kota Metropolitan — Jantung Republik',
    capital:'Jakarta', population:'10,6 Juta Jiwa', area:'664 km²', language:'Betawi, Indonesia',
    heroImage:'/images/provinces/jakarta-hero.jpg',
    description:'Ibu kota Indonesia yang juga merupakan pusat ekonomi, pemerintahan, dan budaya. Jakarta memiliki warisan budaya Betawi yang kaya di tengah modernitas kota metropolitan.',
    culture:[
      {image:'/images/culture/Jakarta/jkt-1.jpg',title:'Ondel-Ondel',description:'Boneka raksasa ikon budaya Betawi.'},
      {image:'/images/culture/Jakarta/jkt-2.jpg',title:'Gambang Kromong',description:'Musik akulturasi Cina-Betawi khas Jakarta.'},
      {image:'/images/culture/Jakarta/jkt-3.jpg',title:'Tari Topeng Betawi',description:'Tarian topeng tradisional masyarakat Betawi.'},
    ],
    tourism:[
      {image:'/images/tourism/Jakarta/jkt-1.jpg',name:'Kota Tua',location:'Jakarta Barat',description:'Kawasan bersejarah peninggalan VOC.'},
      {image:'/images/tourism/Jakarta/jkt-2.jpg',name:'Monas',location:'Jakarta Pusat',description:'Monumen Nasional simbol kemerdekaan.'},
      {image:'/images/tourism/Jakarta/jkt-3.jpg',name:'Kepulauan Seribu',location:'Teluk Jakarta',description:'Gugusan pulau wisata bahari.'},
    ],
    culinary:[
      {image:'/images/culinary/Jakarta/jkt-1.jpg',name:'Kerak Telor',description:'Omelet ketan telur bebek khas Betawi.'},
      {image:'/images/culinary/Jakarta/jkt-2.jpg',name:'Soto Betawi',description:'Soto berkuah santan khas Betawi.'},
      {image:'/images/culinary/Jakarta/jkt-3.jpg',name:'Asinan Betawi',description:'Sayuran acar pedas manis khas Betawi.'},
    ],
    facts:['Kota terbesar di Asia Tenggara','Pusat pemerintahan Indonesia sejak 1945','Monas dilapisi 35 kg emas','Kota Tua dibangun abad ke-17','Ondel-ondel simbol penolak bala'],
  },
  {
    slug:'jawa-barat', name:'Jawa Barat', region:'Jawa',
    tagline:'Tanah Pasundan — Negeri Kaulinan',
    capital:'Bandung', population:'48,7 Juta Jiwa', area:'35.377 km²', language:'Sunda, Indonesia',
    heroImage:'/images/provinces/jabar-hero.jpg',
    description:'Jawa Barat adalah provinsi dengan penduduk terbanyak di Indonesia, dihuni oleh suku Sunda yang memiliki tradisi budaya yang kaya dan beragam.',
    culture:[
      {image:'/images/culture/Jawa_Barat/jabar-1.jpg',title:'Angklung',description:'Alat musik bambu warisan UNESCO.'},
      {image:'/images/culture/Jawa_Barat/jabar-2.jpg',title:'Tari Jaipong',description:'Tarian dinamis energik khas Sunda.'},
      {image:'/images/culture/Jawa_Barat/jabar-3.jpg',title:'Wayang Golek',description:'Wayang kayu tiga dimensi khas Sunda.'},
    ],
    tourism:[
      {image:'/images/tourism/Jawa_Barat/jabar-1.jpg',name:'Kawah Putih',location:'Ciwidey',description:'Danau kawah belerang berwarna putih.'},
      {image:'/images/tourism/Jawa_Barat/jabar-2.jpg',name:'Pantai Pangandaran',location:'Pangandaran',description:'Pantai terpopuler di Jawa Barat.'},
      {image:'/images/tourism/Jawa_Barat/jabar-3.jpg',name:'Gedung Sate',location:'Bandung',description:'Ikon arsitektur bersejarah Bandung.'},
    ],
    culinary:[
      {image:'/images/culinary/Jawa_Barat/jabar-1.jpg',name:'Nasi Timbel',description:'Nasi bungkus daun pisang khas Sunda.'},
      {image:'/images/culinary/Jawa_Barat/jabar-2.jpg',name:'Karedok',description:'Salad sayuran mentah saus kacang.'},
      {image:'/images/culinary/Jawa_Barat/jabar-3.jpg',name:'Surabi',description:'Kue tradisional dari tepung beras.'},
    ],
    facts:['Angklung diakui UNESCO 2010','Bandung dijuluki Paris van Java','Sunda adalah suku terbesar kedua','Penghasil teh berkualitas tinggi','Kujang adalah senjata khas Sunda'],
  },
  {
    slug:'jawa-tengah', name:'Jawa Tengah', region:'Jawa',
    tagline:'Jantung Budaya — Tanah Para Raja',
    capital:'Semarang', population:'37,5 Juta Jiwa', area:'32.800 km²', language:'Jawa, Indonesia',
    heroImage:'/images/provinces/jateng-hero.jpg',
    description:'Jawa Tengah adalah pusat kebudayaan Jawa, tempat berdirinya kerajaan-kerajaan besar dan lahirnya berbagai tradisi yang menjadi ikon Indonesia di dunia internasional.',
    culture:[
      {image:'/images/culture/Jawa_Tengah/jateng-1.jpg',title:'Wayang Kulit',description:'Pertunjukan bayangan boneka kulit.'},
      {image:'/images/culture/Jawa_Tengah/jateng-2.jpg',title:'Batik Solo',description:'Batik halus khas keraton Surakarta.'},
      {image:'/images/culture/Jawa_Tengah/jateng-3.jpg',title:'Tari Serimpi',description:'Tarian klasik keraton yang agung.'},
    ],
    tourism:[
      {image:'/images/tourism/Jawa_Tengah/jateng-1.jpg',name:'Borobudur',location:'Magelang',description:'Candi Buddha terbesar di dunia.'},
      {image:'/images/tourism/Jawa_Tengah/jateng-2.jpg',name:'Prambanan',location:'Klaten',description:'Candi Hindu megah abad ke-9.'},
      {image:'/images/tourism/Jawa_Tengah/jateng-3.jpg',name:'Lawang Sewu',location:'Semarang',description:'Gedung bersejarah "seribu pintu".'},
    ],
    culinary:[
      {image:'/images/culinary/Jawa_Tengah/jateng-1.jpg',name:'Lumpia Semarang',description:'Lumpia khas berisi rebung dan udang.'},
      {image:'/images/culinary/Jawa_Tengah/jateng-2.jpg',name:'Tengkleng',description:'Sop tulang kambing berkuah tipis.'},
      {image:'/images/culinary/Jawa_Tengah/jateng-3.jpg',name:'Nasi Liwet Solo',description:'Nasi gurih khas Surakarta.'},
    ],
    facts:['Borobudur terdaftar Warisan Dunia UNESCO','Dataran Tinggi Dieng dijuluki Negeri Atas Awan','Keraton Solo masih aktif hingga kini','Batik Solo terhalus di Indonesia','Semarang kota lumpia terenak'],
  },
  {
    slug:'yogyakarta', name:'Yogyakarta', region:'Jawa',
    tagline:'Kota Pelajar — Benteng Kebudayaan Jawa',
    capital:'Yogyakarta', population:'3,8 Juta Jiwa', area:'3.185 km²', language:'Jawa, Indonesia',
    heroImage:'/images/provinces/jogja-hero.jpg',
    description:'Yogyakarta adalah satu-satunya daerah istimewa yang berbentuk kesultanan aktif. Kota ini dikenal sebagai pusat seni, budaya, dan pendidikan Indonesia.',
    culture:[
      {image:'/images/culture/Jogja/jogja-1.jpg',title:'Keraton Yogyakarta',description:'Istana kesultanan yang masih aktif.'},
      {image:'/images/culture/Jogja/jogja-2.jpg',title:'Tari Bedhaya',description:'Tarian sakral istana Yogyakarta.'},
      {image:'/images/culture/Jogja/jogja-3.jpg',title:'Batik Yogyakarta',description:'Batik dengan motif khas lereng-lereng.'},
    ],
    tourism:[
      {image:'/images/tourism/Jogja/jogja-1.jpg',name:'Malioboro',location:'Yogyakarta',description:'Jalan legendaris jantung kota Jogja.'},
      {image:'/images/tourism/Jogja/jogja-2.jpg',name:'Tamansari',location:'Yogyakarta',description:'Pemandian bersejarah milik sultan.'},
      {image:'/images/tourism/Jogja/jogja-3.jpg',name:'Pantai Parangtritis',location:'Bantul',description:'Pantai legendaris dengan pasir hitam.'},
    ],
    culinary:[
      {image:'/images/culinary/Jogja/jogja-1.jpg',name:'Gudeg',description:'Sayur nangka muda manis khas Jogja.'},
      {image:'/images/culinary/Jogja/jogja-2.jpg',name:'Bakpia',description:'Kue isi kacang hijau oleh-oleh Jogja.'},
      {image:'/images/culinary/Jogja/jogja-3.jpg',name:'Nasi Kucing',description:'Nasi porsi kecil khas angkringan.'},
    ],
    facts:['Satu-satunya daerah berbentuk kesultanan','Sri Sultan HB X masih memimpin aktif','Kota pelajar dengan ratusan universitas','Gudeg adalah makanan ikonik Jogja','Malioboro dikunjungi jutaan wisatawan/tahun'],
  },
  {
    slug:'jawa-timur', name:'Jawa Timur', region:'Jawa',
    tagline:'Provinsi Terluas di Jawa — Keberagaman Tanpa Batas',
    capital:'Surabaya', population:'41,1 Juta Jiwa', area:'47.799 km²', language:'Jawa, Madura, Indonesia',
    heroImage:'/images/provinces/jatim-hero.jpg',
    description:'Jawa Timur adalah provinsi dengan keragaman budaya terbesar di Jawa — memadukan budaya Jawa, Madura, Osing, Tengger, dan Bawean dalam harmoni yang unik.',
    culture:[
      {image:'/images/culture/Jawa_Timur/jatim-1.jpg',title:'Reog Ponorogo',description:'Tarian topeng singa raksasa yang spektakuler.'},
      {image:'/images/culture/Jawa_Timur/jatim-2.jpg',title:'Karapan Sapi',description:'Tradisi balap sapi khas Madura.'},
      {image:'/images/culture/Jawa_Timur/jatim-3.jpg',title:'Tari Gandrung',description:'Tarian penyambut tamu khas Banyuwangi.'},
    ],
    tourism:[
      {image:'/images/tourism/Jawa_Timur/jatim-1.jpg',name:'Gunung Bromo',location:'Probolinggo',description:'Gunung berapi aktif paling ikonik Indonesia.'},
      {image:'/images/tourism/Jawa_Timur/jatim-2.jpg',name:'Kawah Ijen',location:'Banyuwangi',description:'Kawah dengan fenomena api biru unik.'},
      {image:'/images/tourism/Jawa_Timur/jatim-3.jpg',name:'Taman Nasional Baluran',location:'Situbondo',description:'Sabana Afrika di ujung Jawa.'},
    ],
    culinary:[
      {image:'/images/culinary/Jawa_Timur/jatim-1.jpg',name:'Rawon',description:'Sup daging berkuah hitam kluwek.'},
      {image:'/images/culinary/Jawa_Timur/jatim-2.jpg',name:'Rujak Cingur',description:'Rujak dengan cingur (mulut sapi).'},
      {image:'/images/culinary/Jawa_Timur/jatim-3.jpg',name:'Soto Lamongan',description:'Soto berkuah kuning dengan koya.'},
    ],
    facts:['Surabaya kota pahlawan terbesar','Bromo = sunrise terbaik Indonesia','Reog Ponorogo sedang diperjuangkan ke UNESCO','Api biru Ijen hanya ada 2 di dunia','Madura penghasil garam terbesar'],
  },
  {
    slug:'bali', name:'Bali', region:'Bali & Nusa Tenggara',
    tagline:'Pulau Dewata — Jiwa Spiritual Nusantara',
    capital:'Denpasar', population:'4,4 Juta Jiwa', area:'5.780 km²', language:'Bali, Indonesia',
    heroImage:'/images/provinces/bali-hero.jpg',
    description:'Bali adalah pulau di mana seni adalah kehidupan dan kehidupan adalah seni. Setiap sudut pulau dipenuhi upacara, tarian, dan karya seni yang telah berlangsung ribuan tahun.',
    culture:[
      {image:'/images/culture/Bali/bali-1.jpg',title:'Tari Kecak',description:'Tari api sakral 200+ penari.'},
      {image:'/images/culture/Bali/bali-2.jpg',title:'Ogoh-ogoh',description:'Patung raksasa perayaan Nyepi.'},
      {image:'/images/culture/Bali/bali-3.jpg',title:'Upacara Ngaben',description:'Upacara kremasi Hindu Bali.'},
    ],
    tourism:[
      {image:'/images/tourism/Bali/bali-1.jpg',name:'Pura Tanah Lot',location:'Tabanan',description:'Pura di atas batu karang di laut.'},
      {image:'/images/tourism/Bali/bali-2.jpg',name:'Ubud',location:'Gianyar',description:'Pusat seni dan budaya Bali.'},
      {image:'/images/tourism/Bali/bali-3.jpg',name:'Tegallalang',location:'Ubud',description:'Persawahan terasering yang memukau.'},
    ],
    culinary:[
      {image:'/images/culinary/Bali/bali-1.jpg',name:'Babi Guling',description:'Babi panggang bumbu Bali khas.'},
      {image:'/images/culinary/Bali/bali-2.jpg',name:'Bebek Betutu',description:'Bebek berbumbu lengkap dimasak lama.'},
      {image:'/images/culinary/Bali/bali-3.jpg',name:'Lawar',description:'Campuran sayur daging bumbu Bali.'},
    ],
    facts:['Dikunjungi 6+ juta wisatawan/tahun','Subak diakui UNESCO 2012','Nyepi = satu hari tanpa listrik & internet','Terdapat 10.000+ pura di Bali','Bahasa Bali memiliki 3 tingkatan'],
  },
  {
    slug:'sulawesi-selatan', name:'Sulawesi Selatan', region:'Sulawesi',
    tagline:'Tanah Bugis-Makassar — Pelaut Penakluk Samudra',
    capital:'Makassar', population:'9,0 Juta Jiwa', area:'46.717 km²', language:'Bugis, Makassar, Toraja, Indonesia',
    heroImage:'/images/provinces/sulsel-hero.jpg',
    description:'Sulawesi Selatan adalah tanah para pelaut ulung Bugis-Makassar yang pernah mengarungi seluruh samudra. Di pedalaman, Tana Toraja menyimpan tradisi pemakaman paling unik di dunia.',
    culture:[
      {image:'/images/culture/Sulawesi_Selatan/sulsel-1.jpg',title:'Perahu Pinisi',description:'Kapal layar tradisional Bugis.'},
      {image:'/images/culture/Sulawesi_Selatan/sulsel-2.jpg',title:'Tongkonan',description:'Rumah adat Toraja berukiran khas.'},
      {image:'/images/culture/Sulawesi_Selatan/sulsel-3.jpg',title:'Tari Pakarena',description:'Tarian lembut khas Makassar.'},
    ],
    tourism:[
      {image:'/images/tourism/Sulawesi_Selatan/sulsel-1.jpg',name:'Tana Toraja',location:'Toraja Utara',description:'Daerah dengan tradisi pemakaman unik.'},
      {image:'/images/tourism/Sulawesi_Selatan/sulsel-2.jpg',name:'Pantai Losari',location:'Makassar',description:'Pantai ikonik kota Makassar.'},
      {image:'/images/tourism/Sulawesi_Selatan/sulsel-3.jpg',name:'Kawasan Karst Maros',location:'Maros',description:'Karst terluas kedua di dunia.'},
    ],
    culinary:[
      {image:'/images/culinary/Sulawesi_Selatan/sulsel-1.jpg',name:'Coto Makassar',description:'Soto daging berkuah kacang rempah.'},
      {image:'/images/culinary/Sulawesi_Selatan/sulsel-2.jpg',name:'Konro',description:'Iga sapi bakar/kuah khas Makassar.'},
      {image:'/images/culinary/Sulawesi_Selatan/sulsel-3.jpg',name:'Pallubasa',description:'Sup jeroan sapi khas Makassar.'},
    ],
    facts:['Pinisi diakui UNESCO 2017','Rambu Solo = pemakaman termahal di dunia','Karst Maros terluas ke-2 di dunia','Suku Bugis dikenal sebagai pelaut terbaik','Makassar pelabuhan dagang terpenting'],
  },
  {
    slug:'maluku', name:'Maluku', region:'Maluku',
    tagline:'Kepulauan Rempah — Pengubah Sejarah Dunia',
    capital:'Ambon', population:'1,9 Juta Jiwa', area:'46.914 km²', language:'Ambon, Banda, Indonesia',
    heroImage:'/images/provinces/maluku-hero.jpg',
    description:'Maluku adalah "Kepulauan Rempah" yang dulu menjadi tujuan utama para penjelajah Eropa. Cengkeh dan pala dari Maluku pernah menjadi komoditas paling berharga di dunia.',
    culture:[
      {image:'/images/culture/Maluku/maluku-1.jpg',title:'Tari Cakalele',description:'Tarian perang sakral Maluku.'},
      {image:'/images/culture/Maluku/maluku-2.jpg',title:'Musik Tifa',description:'Alat musik pukul khas Maluku.'},
      {image:'/images/culture/Maluku/maluku-3.jpg',title:'Pela Gandong',description:'Ikatan persaudaraan lintas agama.'},
    ],
    tourism:[
      {image:'/images/tourism/Maluku/maluku-1.jpg',name:'Pantai Ora',location:'Seram',description:'Pantai biru jernih bak surga tersembunyi.'},
      {image:'/images/tourism/Maluku/maluku-2.jpg',name:'Banda Neira',location:'Maluku Tengah',description:'Pulau rempah bersejarah.'},
      {image:'/images/tourism/Maluku/maluku-3.jpg',name:'Pantai Ngurbloat',location:'Kei',description:'Pantai pasir putih terpanjang Indonesia.'},
    ],
    culinary:[
      {image:'/images/culinary/Maluku/maluku-1.jpg',name:'Papeda',description:'Bubur sagu bening dengan ikan kuah kuning.'},
      {image:'/images/culinary/Maluku/maluku-2.jpg',name:'Ikan Kuah Kuning',description:'Ikan segar kuah kunyit khas Ambon.'},
      {image:'/images/culinary/Maluku/maluku-3.jpg',name:'Kohu-Kohu',description:'Salad ikan dan kelapa khas Ambon.'},
    ],
    facts:['Cengkeh asli hanya dari Maluku','Penjelajah Eropa bersaing merebutkan Maluku','Pela Gandong = persaudaraan unik Islam-Kristen','Pantai Ngurbloat terpanjang di Indonesia','Ambon pernah ibu kota Hindia Belanda'],
  },
  {
    slug:'papua', name:'Papua', region:'Papua',
    tagline:'Tanah di Ujung Timur — Surga Alam yang Tersisa',
    capital:'Jayapura', population:'1,1 Juta Jiwa', area:'97.024 km²', language:'Dani, Asmat, Biak, Indonesia',
    heroImage:'/images/provinces/papua-hero.jpg',
    description:'Papua menyimpan kebudayaan paling orisinil di dunia. Suku-suku pedalaman seperti Asmat, Dani, dan Korowai mempertahankan tradisi leluhur yang berusia ribuan tahun.',
    culture:[
      {image:'/images/culture/Papua/papua-1.jpg',title:'Ukiran Asmat',description:'Seni ukir kayu bertaraf museum dunia.'},
      {image:'/images/culture/Papua/papua-2.jpg',title:'Noken',description:'Tas rajut khas Papua warisan UNESCO.'},
      {image:'/images/culture/Papua/papua-3.jpg',title:'Festival Baliem',description:'Festival budaya suku Dani.'},
    ],
    tourism:[
      {image:'/images/tourism/Papua/papua-1.jpg',name:'Raja Ampat',location:'Papua Barat Daya',description:'Surga bawah laut terbaik di dunia.'},
      {image:'/images/tourism/Papua/papua-2.jpg',name:'Lembah Baliem',location:'Wamena',description:'Lembah subur di pegunungan Papua.'},
      {image:'/images/tourism/Papua/papua-3.jpg',name:'Pegunungan Jayawijaya',location:'Puncak Jaya',description:'Puncak tertinggi Indonesia bersalju.'},
    ],
    culinary:[
      {image:'/images/culinary/Papua/papua-1.jpg',name:'Sagu Bakar',description:'Makanan pokok masyarakat Papua.'},
      {image:'/images/culinary/Papua/papua-2.jpg',name:'Ikan Bakar Manokwari',description:'Ikan bakar dengan sambal khas.'},
      {image:'/images/culinary/Papua/papua-3.jpg',name:'Ulat Sagu',description:'Protein khas masyarakat pedalaman.'},
    ],
    facts:['Raja Ampat = surga biodiversitas laut','Noken diakui UNESCO 2012','Punya salju abadi di garis khatulistiwa','Suku Asmat terbesar kedua di dunia','Hutan Papua = paru-paru dunia ketiga'],
  },
];

const PROVINCE_PUZZLES = {
  'aceh': ['/images/provinces/aceh-hero.jpg','/images/culture/Aceh/aceh-1.jpg','/images/culture/Aceh/aceh-2.jpg'],
  'sumatera-utara': ['/images/provinces/sumut-hero.jpg','/images/culture/Sumatra_Utara/sumut-1.jpg','/images/culture/Sumatra_Utara/sumut-2.jpg'],
  'dki-jakarta': ['/images/provinces/jakarta-hero.jpg','/images/culture/Jakarta/jkt-1.jpg','/images/culture/Jakarta/jkt-2.jpg'],
  'jawa-barat': ['/images/provinces/jabar-hero.jpg','/images/culture/Jawa_Barat/jabar-1.jpg','/images/culture/Jawa_Barat/jabar-2.jpg'],
  'jawa-tengah': ['/images/provinces/jateng-hero.jpg','/images/culture/Jawa_Tengah/jateng-1.jpg','/images/culture/Jawa_Tengah/jateng-2.jpg'],
  'yogyakarta': ['/images/provinces/jogja-hero.jpg','/images/culture/Jogja/jogja-1.jpg','/images/culture/Jogja/jogja-2.jpg'],
  'jawa-timur': ['/images/provinces/jatim-hero.jpg','/images/culture/Jawa_Timur/jatim-1.jpg','/images/culture/Jawa_Timur/jatim-2.jpg'],
  'bali': ['/images/provinces/bali-hero.jpg','/images/culture/Bali/bali-1.jpg','/images/culture/Bali/bali-2.jpg'],
  'sulawesi-selatan': ['/images/provinces/sulsel-hero.jpg','/images/culture/Sulawesi_Selatan/sulsel-1.jpg','/images/culture/Sulawesi_Selatan/sulsel-2.jpg'],
  'maluku': ['/images/provinces/maluku-hero.jpg','/images/culture/Maluku/maluku-1.jpg','/images/culture/Maluku/maluku-2.jpg'],
  'papua': ['/images/provinces/papua-hero.jpg','/images/culture/Papua/papua-1.jpg','/images/culture/Papua/papua-2.jpg'],
};
const PUZZLE_FALLBACK = ['/images/provinces/bali-hero.jpg','/images/provinces/jabar-hero.jpg','/images/provinces/jatim-hero.jpg'];
function getPuzzleImages(slug) {
  return PROVINCE_PUZZLES[slug] || PUZZLE_FALLBACK;
}

const TOTAL_PROVINCES = 38;
const MARQUEE_ITEMS = ['Batik Nusantara','Wayang Kulit','Gamelan Jawa','Tari Kecak','Rumah Adat','Rempah Nusantara','Candi Borobudur','Tenun Ikat'];