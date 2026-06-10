function renderHome() {
  document.title = 'NusaExplore — Jelajahi Budaya Indonesia';

  var marqueeItems = MARQUEE_ITEMS.concat(MARQUEE_ITEMS);
  var marqueeHTML = marqueeItems.map(function(item) {
    return '<span class="marquee-item" style="color: var(--gold);">' + item + '<span class="marquee-dot"></span></span>';
  }).join('');

  var cultureCardsHTML = culturesData.map(function(c) {
    var cls = 'culture-card ' + c.className;
    return '<div class="' + cls + '" onclick="openCultureModal(\'' + c.id + '\')">' +
      '<div class="cc-bg" style="position:relative;width:100%;height:100%">' +
        '<img src="' + c.image + '" alt="' + c.title + '" class="cc-bg-img" onerror="this.style.display=\'none\'">' +
      '</div>' +
      '<div class="cc-overlay"></div>' +
      '<div class="cc-content">' +
        '<div class="cc-tag">' + c.tag + '</div>' +
        '<div class="cc-title">' + c.title + '</div>' +
        '<div class="cc-sub">' + c.sub + '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  var iconMap = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>';
  var iconQuiz = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>';
  var iconPuzzle = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>';

  setPage(
    navbarHTML('/') +

    '<section class="hero">' +
      '<div class="hero-left">' +
        '<div class="hero-eyebrow">Platform Edukasi Budaya Indonesia</div>' +
        '<h1 class="hero-title">Jelajahi<br/><em>Warisan</em><br/><span class="outline">Nusantara</span></h1>' +
        '<p class="hero-desc">Dari batik Jawa hingga tarian Papua — temukan keajaiban budaya 17.000 pulau Indonesia lewat peta interaktif dan game edukatif yang seru.</p>' +
        '<div class="hero-actions">' +
          '<button class="btn-gold" onclick="navigate(\'/map\')">Mulai Eksplorasi</button>' +
          '<button class="btn-outline" onclick="navigate(\'/games\')">Coba Games</button>' +
        '</div>' +
        '<div class="hero-stats">' +
          '<div><div class="stat-num">1,340+</div><div class="stat-label">Suku Bangsa</div></div>' +
          '<div><div class="stat-num">746</div><div class="stat-label">Bahasa Daerah</div></div>' +
          '<div><div class="stat-num">38</div><div class="stat-label">Provinsi</div></div>' +
        '</div>' +
      '</div>' +
      '<div class="hero-right">' +
        '<div class="hero-img-main">' +
          '<img src="images/assets/batik.jpg" alt="Batik Nusantara" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.style.background=\'linear-gradient(135deg,#1A1228,#3D1B5C)\'">' +
        '</div>' +
        '<div class="hero-img-sm1">' +
          '<img src="images/assets/wayang.jpg" alt="Wayang Kulit" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.style.background=\'linear-gradient(135deg,#1A100A,#4A2A0A)\'">' +
          '<div class="img-tag">Tradisi · 1,000 Tahun</div>' +
        '</div>' +
        '<div class="hero-img-sm2">' +
          '<img src="images/assets/candi.jpg" alt="Candi Agung" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.style.background=\'linear-gradient(135deg,#0A1A14,#1A4A30)\'">' +
          '<div class="img-tag">Sejarah</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="marquee-wrap">' +
      '<div class="marquee-track">' + marqueeHTML + '</div>' +
    '</div>' +

    '<section class="section reveal">' +
      '<div class="culture-header">' +
        '<div>' +
          '<div class="section-label">Koleksi Budaya</div>' +
          '<h2 class="section-title">Temukan <em>Keajaiban</em><br/>di Setiap Sudut</h2>' +
        '</div>' +
        '<p class="section-sub">Setiap budaya punya cerita. Jelajahi koleksi seni, tradisi, dan warisan dari seluruh Nusantara yang telah diakui UNESCO &mdash; dikurasi untuk pengalaman belajar terbaik.</p>' +
      '</div>' +
      '<div class="culture-grid">' + cultureCardsHTML + '</div>' +
    '</section>' +

    '<section class="section section-alt reveal">' +
      '<div class="section-label">Fitur Platform</div>' +
      '<h2 class="section-title">Belajar dengan Cara <em>Baru</em></h2>' +
      '<div class="features-grid">' +
        '<div class="feat-card" onclick="navigate(\'/map\')">' +
          '<div class="feat-icon">' + iconMap + '</div>' +
          '<div class="feat-title">Peta Interaktif</div>' +
          '<div class="feat-desc">Klik provinsi manapun di peta Indonesia untuk menjelajahi kekayaan budaya, sejarah, dan tradisi daerah tersebut secara mendalam.</div>' +
        '</div>' +
        '<div class="feat-card" onclick="navigate(\'/games\')">' +
          '<div class="feat-icon">' + iconQuiz + '</div>' +
          '<div class="feat-title">Quiz Budaya</div>' +
          '<div class="feat-desc">Uji pengetahuanmu tentang budaya Indonesia dengan soal-soal edukatif yang mencakup semua provinsi dari Sabang sampai Merauke.</div>' +
        '</div>' +
        '<div class="feat-card" onclick="navigate(\'/games\')">' +
          '<div class="feat-icon">' + iconPuzzle + '</div>' +
          '<div class="feat-title">Puzzle Nusantara</div>' +
          '<div class="feat-desc">Susun potongan gambar budaya Indonesia &mdash; dari motif batik, candi, hingga tarian tradisional. Seru untuk semua umur!</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="quote-section reveal">' +
      '<p class="quote-text">"Bangsa yang besar adalah bangsa yang <span>mengenal dan menghargai</span> budaya leluhurnya"</p>' +
      '<div class="quote-attr">&mdash; Ir. Soekarno, Presiden Pertama RI</div>' +
    '</div>' +

    '<section class="cta-section reveal">' +
      '<h2 class="cta-title">Siap <em>Menjelajahi</em><br/>Nusantara?</h2>' +
      '<p class="cta-sub">Bergabunglah dan temukan keajaiban budaya Indonesia dari Sabang sampai Merauke.</p>' +
      '<button class="btn-gold" onclick="navigate(\'/map\')">Mulai Eksplorasi Gratis</button>' +
    '</section>' +

    footerHTML() +

    '<div id="culture-modal-overlay" class="culture-modal-overlay" onclick="closeCultureModalOverlay(event)">' +
      '<div class="culture-modal" id="culture-modal-inner" onclick="event.stopPropagation()"></div>' +
    '</div>'
  );

  initNavbar();
}

function openCultureModal(id) {
  var c = null;
  for (var i = 0; i < culturesData.length; i++) {
    if (String(culturesData[i].id) === String(id)) { c = culturesData[i]; break; }
  }
  if (!c) return;

  var parasHTML = c.description.split('\n\n').map(function(p) {
    return '<p class="modal-desc-para">' + p + '</p>';
  }).join('');

  var factsHTML = c.facts.map(function(f) {
    return '<div class="modal-fact-chip"><span class="modal-fact-dot"></span>' + f + '</div>';
  }).join('');

  document.getElementById('culture-modal-inner').innerHTML =
    '<div class="modal-hero-img">' +
      '<img src="' + c.popupImage + '" alt="' + c.titleFull + '" onerror="this.style.display=\'none\'">' +
      '<div class="modal-hero-gradient"></div>' +
      '<button class="modal-close" onclick="closeCultureModal()">&#x2715;</button>' +
      '<div class="modal-hero-badge">' + c.tag + '</div>' +
      '<h2 class="modal-hero-title">' + c.titleFull + '</h2>' +
    '</div>' +
    '<div class="modal-body">' +
      '<div class="modal-meta">' +
        '<div class="modal-meta-item">' +
          '<span class="modal-meta-icon" style="font-size:18px;color:var(--gold)">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
          '</span>' +
          '<div>' +
            '<div class="modal-meta-label">Asal Daerah</div>' +
            '<div class="modal-meta-value">' + c.origin + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="modal-meta-divider"></div>' +
        '<div class="modal-meta-item">' +
          '<span class="modal-meta-icon" style="font-size:18px;color:var(--gold)">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
          '</span>' +
          '<div>' +
            '<div class="modal-meta-label">Periode</div>' +
            '<div class="modal-meta-value">' + c.era + '</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="modal-section">' +
        '<h3 class="modal-section-title"><span class="modal-section-bar"></span>Sejarah &amp; Deskripsi</h3>' +
        parasHTML +
      '</div>' +
      '<div class="modal-section">' +
        '<h3 class="modal-section-title"><span class="modal-section-bar"></span>Fakta Menarik</h3>' +
        '<div class="modal-facts">' + factsHTML + '</div>' +
      '</div>' +
    '</div>';

  var overlay = document.getElementById('culture-modal-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCultureModal() {
  document.getElementById('culture-modal-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function closeCultureModalOverlay(e) {
  if (e.target && e.target.id === 'culture-modal-overlay') closeCultureModal();
}