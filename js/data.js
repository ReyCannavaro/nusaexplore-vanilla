var STORAGE_KEY = 'nusaexplore_user_data';
var THEME_KEY   = 'nusaexplore_theme';
var DEFAULT_DATA = {
  keys: 1, unlockedRegions: [], completedGames: {},
  claimedRewards: [], quizScores: {}, puzzleScores: {},
  totalScore: 0, gamesPlayed: 0,
};

function getUserData() {
  try {
    var d = localStorage.getItem(STORAGE_KEY);
    if (!d) { localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DATA)); return Object.assign({}, DEFAULT_DATA); }
    return Object.assign({}, DEFAULT_DATA, JSON.parse(d));
  } catch(e) { return Object.assign({}, DEFAULT_DATA); }
}
function saveUserData(d) { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(d)); return true; } catch(e) { return false; } }
function getTheme()    { return localStorage.getItem(THEME_KEY) || 'dark'; }
function saveTheme(t)  { localStorage.setItem(THEME_KEY, t); }

function markGameCompleted(provinceId, gameType) {
  var d = getUserData();
  if (!d.completedGames[provinceId]) d.completedGames[provinceId] = [];
  if (d.completedGames[provinceId].indexOf(gameType) === -1) d.completedGames[provinceId].push(gameType);
  d.gamesPlayed = (d.gamesPlayed || 0) + 1;
  saveUserData(d);
}
function canClaimReward(provinceId) {
  var d = getUserData();
  var done = d.completedGames[provinceId] && d.completedGames[provinceId].length > 0;
  var claimed = d.claimedRewards && d.claimedRewards.indexOf(provinceId) !== -1;
  return done && !claimed;
}
function hasClaimedReward(provinceId) {
  var d = getUserData(); return d.claimedRewards && d.claimedRewards.indexOf(provinceId) !== -1;
}
function claimProvinceReward(provinceId, keyReward) {
  if (!canClaimReward(provinceId)) return false;
  var d = getUserData();
  d.keys += keyReward;
  if (!d.claimedRewards) d.claimedRewards = [];
  d.claimedRewards.push(provinceId);
  saveUserData(d); return true;
}
function saveQuizScore(regionId, score) {
  var d = getUserData();
  d.quizScores[regionId] = score;
  saveUserData(d);
}

var DIFFICULTY_CONFIG = {
  mudah:  { unlockCost:1, keyReward:2, label:'Mudah',  color:'#40916C' },
  sedang: { unlockCost:2, keyReward:3, label:'Sedang', color:'#C9A84C' },
  susah:  { unlockCost:3, keyReward:5, label:'Susah',  color:'#e74c3c' },
};
var regionDifficulty = {
  'aceh':'mudah','sumatera-utara':'mudah','dki-jakarta':'mudah','jawa-barat':'mudah',
  'jawa-timur':'mudah','bali':'mudah','yogyakarta':'mudah','riau':'mudah','jawa-tengah':'mudah',
  'sumatera-barat':'sedang','sumatera-selatan':'sedang','bengkulu':'sedang','lampung':'sedang',
  'jambi':'sedang','banten':'sedang','bangka-belitung':'sedang','kepulauan-riau':'sedang',
  'nusa-tenggara-barat':'sedang','nusa-tenggara-timur':'sedang','kalimantan-barat':'sedang',
  'kalimantan-selatan':'sedang','sulawesi-utara':'sedang','sulawesi-tengah':'sedang',
  'sulawesi-selatan':'sedang','sulawesi-tenggara':'sedang','sulawesi-barat':'sedang','maluku':'sedang',
  'kalimantan-tengah':'susah','kalimantan-timur':'susah','kalimantan-utara':'susah',
  'maluku-utara':'susah','gorontalo':'susah','papua-barat':'susah','papua':'susah',
};
function getDifficultyInfo(regionId) {
  var diff = regionDifficulty[regionId] || 'sedang';
  return Object.assign({ difficulty: diff }, DIFFICULTY_CONFIG[diff]);
}

var regionData = {
  sumatera: {
    name:'Sumatera', desc:'Pulau Sumatera adalah rumah bagi kekayaan alam dan budaya yang luar biasa. Dari Batak di Utara dengan rumah adatnya yang megah, Minangkabau di Barat dengan tradisi matrilinealnya yang unik, hingga Lampung di Selatan dengan kain tapis yang memukau.',
    tags:['Rumah Adat Batak','Tari Tor-Tor','Kain Tapis','Rendang Minang','Danau Toba'],
  },
  jawa: {
    name:'Jawa', desc:'Jawa adalah jantung budaya Indonesia — pusat kerajaan-kerajaan besar seperti Majapahit dan Mataram. Di sini lahir batik yang menjadi warisan UNESCO, wayang kulit yang berusia ribuan tahun, gamelan yang mendunia.',
    tags:['Batik UNESCO','Wayang Kulit','Gamelan','Candi Borobudur','Keraton Yogya'],
  },
  kalimantan: {
    name:'Kalimantan', desc:'Kalimantan adalah hutan tropis tertua di bumi. Suku Dayak menjaga tradisi dan kearifan lokal yang telah berusia ribuan tahun — dari ukiran Mandau, tarian Hudoq, hingga rumah panjang.',
    tags:['Budaya Dayak','Mandau','Tari Hudoq','Rumah Panjang','Manik-manik'],
  },
  sulawesi: {
    name:'Sulawesi', desc:'Sulawesi adalah pulau yang paling unik bentuknya dan kaya tradisinya. Suku Toraja di pedalaman dikenal dengan upacara pemakaman Rambu Solo yang spektakuler dan rumah adat Tongkonan.',
    tags:['Toraja','Rambu Solo','Perahu Pinisi','Rumah Tongkonan','Tari Pakarena'],
  },
  bali: {
    name:'Bali & Nusa Tenggara', desc:'Bali adalah jiwa spiritual Indonesia — pulau di mana seni adalah kehidupan dan kehidupan adalah seni. Tari Kecak, Legong, dan Barong memukau dunia.',
    tags:['Tari Kecak','Kain Endek','Upacara Nyepi','Tenun NTT','Ogoh-ogoh'],
  },
  maluku: {
    name:'Maluku', desc:'Maluku adalah Kepulauan Rempah — tempat asal cengkeh dan pala yang pernah mengubah sejarah dunia dan memicu zaman penjelajahan samudra.',
    tags:['Rempah Cengkeh','Tari Cakalele','Musik Tifa','Baileo','Pattimura'],
  },
  papua: {
    name:'Papua', desc:'Papua menyimpan kebudayaan yang paling orisinil dan belum tersentuh di dunia. Suku Asmat dikenal dengan ukiran kayu yang diakui sebagai seni tinggi oleh museum-museum dunia.',
    tags:['Ukiran Asmat','Festival Baliem','Noken UNESCO','Tari Yospan'],
  },
};

var regionToIslandMap = {
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
  'papua':'papua','papua-barat':'papua',
};

var culturesData = [
  {
    id:1, tag:'Seni Tekstil · UNESCO 2009', title:'Batik', titleFull:'Batik — Lukisan Jiwa Nusantara',
    sub:'3,000+ motif dari seluruh Indonesia', className:'c1 main',
    image:'images/assets/batik2.jpg', popupImage:'images/assets/batik3.jpg',
    description:'Batik adalah seni melukis di atas kain menggunakan teknik perintangan warna dengan malam (lilin) panas yang diaplikasikan memakai canting atau cap. Kata "batik" berasal dari bahasa Jawa — "amba" (menulis) dan "titik".\n\nBerkembang sejak abad ke-13 di keraton Jawa, setiap motif batik menyimpan makna filosofis mendalam. Parang melambangkan kekuatan, Kawung melambangkan kesucian, sedangkan Megamendung dari Cirebon menggambarkan awan pembawa kesuburan.\n\nPada 2 Oktober 2009, UNESCO resmi mengakui Batik Indonesia sebagai Warisan Kemanusiaan Budaya Lisan dan Nonbendawi. Tanggal ini kini diperingati sebagai Hari Batik Nasional dan dirayakan jutaan orang di seluruh Indonesia.',
    facts:['3,000+ motif tercatat','Diakui UNESCO 2 Oktober 2009','Tersebar di 34 provinsi','Ekspor ~$58 juta/tahun'],
    origin:'Jawa (Yogyakarta, Solo, Pekalongan, Cirebon)', era:'Abad ke-13 hingga kini',
  },
  {
    id:2, tag:'Tari Tradisional · UNESCO 2015', title:'Tari Kecak', titleFull:'Kecak — Tari Api dari Bali',
    sub:'Ritual sakral 200+ penari', className:'c2',
    image:'images/assets/kecak.jpg', popupImage:'images/assets/kecak2.jpg',
    description:'Tari Kecak adalah pertunjukan seni dramatari khas Bali yang menampilkan puluhan hingga ratusan pria bertelanjang dada, duduk melingkar, dan berseru "cak-cak-cak" secara ritmis tanpa iringan alat musik — hanya suara manusia sebagai orkestra.\n\nDiciptakan pada tahun 1930-an oleh seniman Wayan Limbak bersama pelukis Jerman Walter Spies, Kecak mengangkat kisah Ramayana — terutama adegan penculikan Dewi Sita dan penyelamatan oleh Rama dibantu Hanoman.\n\nTari Bali, termasuk Kecak, diakui UNESCO pada 2015 sebagai Warisan Budaya Takbenda.',
    facts:['Diciptakan tahun 1930-an','Diakui UNESCO 2015','200+ penari dalam satu pertunjukan','Tanpa alat musik — hanya suara manusia'],
    origin:'Bali, Indonesia', era:'1930-an hingga kini',
  },
  {
    id:3, tag:'Kuliner · UNESCO 2023', title:'Rendang', titleFull:'Rendang — Cita Rasa Paling Dicinta Dunia',
    sub:'#1 makanan terlezat versi CNN', className:'c3',
    image:'images/assets/rendang.jpg', popupImage:'images/assets/rendang2.jpg',
    description:'Rendang adalah masakan daging sapi berbumbu kaya rempah dari tradisi Minangkabau, Sumatera Barat. Dimasak dengan santan kelapa dan lebih dari 20 jenis rempah selama berjam-jam hingga bumbu meresap sempurna.\n\nProses memasak rendang yang panjang bukan sekadar teknik kuliner; ia adalah filosofi kesabaran dan kebijaksanaan Minangkabau. Rendang kering dapat bertahan hingga sebulan tanpa lemari es.\n\nCNN Travel berulang kali menempatkan Rendang sebagai makanan terlezat di dunia.',
    facts:['#1 makanan terlezat versi CNN','Tahan 1 bulan tanpa kulkas','20+ jenis rempah','Simbol diplomasi kuliner Indonesia'],
    origin:'Minangkabau, Sumatera Barat', era:'Abad ke-16 hingga kini',
  },
  {
    id:4, tag:'Seni Musik · UNESCO 2021', title:'Gamelan', titleFull:'Gamelan — Orkestra Jiwa Jawa',
    sub:'Ansambel musik 1,000 tahun', className:'c4',
    image:'images/assets/gamelan.jpg', popupImage:'images/assets/gamelan2.jpg',
    description:'Gamelan adalah ansambel musik tradisional dari Jawa dan Bali yang terdiri dari instrumen perkusi logam — gong, kenong, saron, gender, bonang, dan kendang.\n\nGamelan bukan sekadar musik; ia adalah sistem nilai dan kosmologi. Setiap perangkat gamelan dianggap sakral, diberi nama, dan diperlakukan dengan hormat.\n\nPada Desember 2021, UNESCO resmi memasukkan Gamelan dalam Daftar Warisan Budaya Takbenda.',
    facts:['Diakui UNESCO Desember 2021','Dimainkan di 40+ negara','Ratusan jenis instrumen','Menginspirasi Debussy & Steve Reich'],
    origin:'Jawa & Bali, Indonesia', era:'Abad ke-9 hingga kini',
  },
  {
    id:5, tag:'Seni Pertunjukan · UNESCO 2008', title:'Wayang Kulit', titleFull:'Wayang — Bayangan Peradaban',
    sub:'Pertunjukan epik semalam suntuk', className:'c5',
    image:'images/assets/wayang2.jpg', popupImage:'images/assets/wayang3.jpg',
    description:'Wayang Kulit adalah pertunjukan boneka bayangan tradisional yang berasal dari Jawa. Dalang memainkan ratusan karakter dalam satu pertunjukan yang bisa berlangsung sepanjang malam.\n\nSetiap tokoh wayang memiliki karakter moral yang khas — Arjuna melambangkan kebijaksanaan, Gatotkaca kekuatan, sementara Semar mewakili kearifan rakyat jelata.\n\nUNESCO mengakui Wayang sebagai Warisan Kemanusiaan pada 2008.',
    facts:['Diakui UNESCO 2008','Dalang hafal ratusan tokoh','Pertunjukan berlangsung 8-9 jam','Tersebar di seluruh Jawa & Bali'],
    origin:'Jawa, Indonesia', era:'Abad ke-10 hingga kini',
  },
];

function shuffle(arr) {
  var a = arr.slice();
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var t = a[i]; a[i] = a[j]; a[j] = t;
  }
  return a;
}

function getQuizForProvince(slug) {
  var specific = [], general = [];
  for (var i = 0; i < quizData.length; i++) {
    if (quizData[i].province === slug) specific.push(quizData[i]);
    else if (quizData[i].province === 'general') general.push(quizData[i]);
  }
  specific = shuffle(specific);
  general  = shuffle(general);
  var combined = specific.concat(general);
  return combined.slice(0, 5);
}

var PROVINCE_PUZZLES = {
  'aceh':             ['images/provinces/aceh-hero.jpg',   'images/culture/Aceh/aceh-1.jpg',             'images/culture/Aceh/aceh-2.jpg'],
  'sumatera-utara':   ['images/provinces/sumut-hero.jpg',  'images/culture/Sumatra_Utara/sumut-1.jpg',   'images/culture/Sumatra_Utara/sumut-2.jpg'],
  'sumatera-barat':   ['images/provinces/sumbar-hero.jpg', 'images/culture/Sumatra_Barat/sumbar-1.jpg',  'images/culture/Sumatra_Barat/sumbar-2.jpg'],
  'riau':             ['images/provinces/riau-hero.jpg',   'images/culture/Riau/riau-1.jpg',             'images/culture/Riau/riau-2.jpg'],
  'kepulauan-riau':   ['images/provinces/kepri-hero.jpg',  'images/culture/Kepulauan_Riau/kepri-1.jpg',  'images/culture/Kepulauan_Riau/kepri-2.jpg'],
  'jambi':            ['images/provinces/jambi-hero.jpg',  'images/culture/Jambi/jambi-1.jpg',           'images/culture/Jambi/jambi-2.jpg'],
  'sumatera-selatan': ['images/provinces/sumsel-hero.jpg', 'images/culture/Sumatera_Selatan/sumsel-1.jpg','images/culture/Sumatera_Selatan/sumsel-2.jpg'],
  'bangka-belitung':  ['images/provinces/babel-hero.jpg',  'images/culture/Bangka_Belitung/babel-1.jpg', 'images/culture/Bangka_Belitung/babel-2.jpg'],
  'bengkulu':         ['images/provinces/bengkulu-hero.jpg','images/culture/Bengkulu/bengkulu-1.jpg',    'images/culture/Bengkulu/bengkulu-2.jpg'],
  'lampung':          ['images/provinces/lampung-hero.jpg', 'images/culture/Lampung/lampung-1.jpg',      'images/culture/Lampung/lampung-2.jpg'],
  'dki-jakarta':      ['images/provinces/jakarta-hero.jpg','images/culture/Jakarta/jkt-1.jpg',           'images/culture/Jakarta/jkt-2.jpg'],
  'jawa-barat':       ['images/provinces/jabar-hero.jpg',  'images/culture/Jawa_Barat/jabar-1.jpg',     'images/culture/Jawa_Barat/jabar-2.jpg'],
  'banten':           ['images/provinces/banten-hero.jpg', 'images/culture/Banten/banten-1.jpg',        'images/culture/Banten/banten-2.jpg'],
  'jawa-tengah':      ['images/provinces/jateng-hero.jpg', 'images/culture/Jawa_Tengah/jateng-1.jpg',   'images/culture/Jawa_Tengah/jateng-2.jpg'],
  'yogyakarta':       ['images/provinces/jogja-hero.jpg',  'images/culture/Jogja/jogja-1.jpg',          'images/culture/Jogja/jogja-2.jpg'],
  'jawa-timur':       ['images/provinces/jatim-hero.jpg',  'images/culture/Jawa_Timur/jatim-1.jpg',     'images/culture/Jawa_Timur/jatim-2.jpg'],
  'bali':             ['images/provinces/bali-hero.jpg',   'images/culture/Bali/bali-1.jpg',            'images/culture/Bali/bali-2.jpg'],
  'nusa-tenggara-barat': ['images/provinces/ntb-hero.jpg','images/culture/Nusa_Tenggara_Barat/ntb-1.jpg','images/culture/Nusa_Tenggara_Barat/ntb-2.jpg'],
  'nusa-tenggara-timur': ['images/provinces/ntt-hero.jpg','images/culture/Nusa_Tenggara_Timur/ntt-1.jpg','images/culture/Nusa_Tenggara_Timur/ntt-2.jpg'],
  'kalimantan-barat': ['images/provinces/kalbar-hero.jpg', 'images/culture/Kalimantan_Barat/kalbar-1.jpg','images/culture/Kalimantan_Barat/kalbar-2.jpg'],
  'kalimantan-tengah':['images/provinces/kalteng-hero.jpg','images/culture/Kalimantan_Tengah/kalteng-1.jpg','images/culture/Kalimantan_Tengah/kalteng-2.jpg'],
  'kalimantan-selatan':['images/provinces/kalsel-hero.jpg','images/culture/Kalimantan_Selatan/kalsel-1.jpg','images/culture/Kalimantan_Selatan/kalsel-2.jpg'],
  'kalimantan-timur': ['images/provinces/kaltim-hero.jpg', 'images/culture/Kalimantan_Timur/kaltim-1.jpg','images/culture/Kalimantan_Timur/kaltim-2.jpg'],
  'kalimantan-utara': ['images/provinces/kaltara-hero.jpg','images/culture/Kalimantan_Utara/kaltara-1.jpg','images/culture/Kalimantan_Utara/kaltara-2.jpg'],
  'sulawesi-utara':   ['images/provinces/sulut-hero.jpg',  'images/culture/Sulawesi_Utara/sulut-1.jpg', 'images/culture/Sulawesi_Utara/sulut-2.jpg'],
  'gorontalo':        ['images/provinces/gorontalo-hero.jpg','images/culture/Gorontalo/gorontalo-1.jpg','images/culture/Gorontalo/gorontalo-2.jpg'],
  'sulawesi-tengah':  ['images/provinces/sulteng-hero.jpg','images/culture/Sulawesi_Tengah/sulteng-1.jpg','images/culture/Sulawesi_Tengah/sulteng-2.jpg'],
  'sulawesi-barat':   ['images/provinces/sulbar-hero.jpg', 'images/culture/Sulawesi_Barat/sulbar-1.jpg','images/culture/Sulawesi_Barat/sulbar-2.jpg'],
  'sulawesi-selatan': ['images/provinces/sulsel-hero.jpg', 'images/culture/Sulawesi_Selatan/sulsel-1.jpg','images/culture/Sulawesi_Selatan/sulsel-2.jpg'],
  'sulawesi-tenggara':['images/provinces/sultra-hero.jpg', 'images/culture/Sulawesi_Tenggara/sultra-1.jpg','images/culture/Sulawesi_Tenggara/sultra-2.jpg'],
  'maluku':           ['images/provinces/maluku-hero.jpg', 'images/culture/Maluku/maluku-1.jpg',        'images/culture/Maluku/maluku-2.jpg'],
  'maluku-utara':     ['images/provinces/malut-hero.jpg',  'images/culture/Maluku_Utara/malut-1.jpg',   'images/culture/Maluku_Utara/malut-2.jpg'],
  'papua-barat':      ['images/provinces/papbar-hero.jpg', 'images/culture/Papua_Barat/papbar-1.jpg',   'images/culture/Papua_Barat/papbar-2.jpg'],
  'papua':            ['images/provinces/papua-hero.jpg',  'images/culture/Papua/papua-1.jpg',          'images/culture/Papua/papua-2.jpg'],
};

function getPuzzleImages(slug) {
  return PROVINCE_PUZZLES[slug] || [
    'images/provinces/bali-hero.jpg',
    'images/culture/Bali/bali-1.jpg',
    'images/culture/Jawa_Tengah/jateng-1.jpg',
  ];
}

var MARQUEE_ITEMS = [
  'Batik Nusantara','Wayang Kulit','Gamelan Jawa','Tari Kecak',
  'Rumah Adat','Rempah Nusantara','Candi Borobudur','Tenun Ikat',
  'Tari Saman','Angklung','Perahu Pinisi','Rendang Minang',
];