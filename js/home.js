function renderHome() {
  document.title = 'NusaExplore — Jelajahi Budaya Indonesia';
  var marqueeItems = MARQUEE_ITEMS.concat(MARQUEE_ITEMS);

  var cultureCardsHTML = culturesData.map(function(c) {
    var minH = c.id === 1 ? '300px' : '220px';
    var span = c.id === 1 ? 'culture-card c1' : (c.id <= 3 ? 'culture-card c' + c.id : 'culture-card c' + c.id);
    return '<div class="' + span + '" onclick="openCulturePopup(' + c.id + ')" style="min-height:' + minH + '">' +
      '<div class="cc-bg" style="background-image:url(\'' + c.image + '\');background-color:#1C2E20;">' +
        '<div class="cc-overlay"></div>' +
        '<div class="cc-content">' +
          '<div class="cc-tag">' + c.tag + '</div>' +
          '<div class="cc-title">' + c.title + '</div>' +
          '<div class="cc-sub">' + c.sub + '</div>' +
        '</div>' +
      '</div>' +
    '</div>';
  }).join('');

  setPage(
    navbarHTML('/') +

    '<section class="hero">' +
      '<div class="hero-left">' +
        '<div class="hero-eyebrow">Platform Edukasi Budaya</div>' +
        '<h1 class="hero-title">Jelajahi<br/><em>Nusantara</em><br/><span class="outline">Bersama</span></h1>' +
        '<p class="hero-desc">Temukan keajaiban 38 provinsi Indonesia — dari batik Jawa, tari Kecak Bali, rempah Maluku, hingga ukiran Asmat Papua — semua dalam satu platform interaktif.</p>' +
        '<div class="hero-actions">' +
          '<button class="btn-gold" onclick="navigate(\'/map\')">🗺️ Mulai Jelajah</button>' +
          '<button class="btn-outline" onclick="navigate(\'/games\')">🎮 Main Games</button>' +
        '</div>' +
        '<div class="hero-stats">' +
          '<div><div class="stat-num">38</div><div class="stat-label">Provinsi</div></div>' +
          '<div><div class="stat-num">500+</div><div class="stat-label">Konten Budaya</div></div>' +
          '<div><div class="stat-num">3</div><div class="stat-label">Mini Games</div></div>' +
        '</div>' +
      '</div>' +
      '<div class="hero-right">' +
        '<div class="hero-img-main">' +
          '<img src="images/provinces/bali-hero.jpg" alt="Bali" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.style.background=\'linear-gradient(135deg,#1A2F1E,#2D6A4F)\'">' +
          '<div class="img-tag">🌺 Bali</div>' +
        '</div>' +
        '<div class="hero-img-sm1">' +
          '<img src="images/provinces/jogja-hero.jpg" alt="Yogyakarta" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.style.background=\'linear-gradient(135deg,#2A1A10,#6B3A1A)\'">' +
          '<div class="img-tag">🏯 Yogyakarta</div>' +
        '</div>' +
        '<div class="hero-img-sm2">' +
          '<img src="images/provinces/papua-hero.jpg" alt="Papua" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.style.background=\'linear-gradient(135deg,#1A1A35,#3A2A6A)\'">' +
          '<div class="img-tag">🦜 Papua</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="marquee-wrap">' +
      '<div class="marquee-track">' +
        marqueeItems.map(function(item) {
          return '<span class="marquee-item">' + item + '<span class="marquee-dot"></span></span>';
        }).join('') +
      '</div>' +
    '</div>' +

    '<section class="section section-alt">' +
      '<div style="padding:0 48px 0">' +
        '<div class="section-label">Kekayaan Budaya</div>' +
        '<h2 style="font-family:\'Playfair Display\',serif;font-size:clamp(26px,3vw,40px);font-weight:800;color:var(--text);margin-bottom:24px">Warisan <em style="color:var(--gold);font-style:italic">Leluhur</em> Kita</h2>' +
      '</div>' +
      '<div class="culture-grid" style="padding-top:0">' +
        cultureCardsHTML +
      '</div>' +
    '</section>' +

    '<section class="section section-alt">' +
      '<div style="max-width:1200px;margin:0 auto;padding:0 48px">' +
        '<div class="section-label">Fitur Platform</div>' +
        '<h2 style="font-family:\'Playfair Display\',serif;font-size:clamp(28px,3.5vw,46px);font-weight:800;color:var(--text);margin-bottom:12px">Belajar dengan Cara <em style="color:var(--gold);font-style:italic">Baru</em></h2>' +
        '<div class="features-grid">' +
          '<div class="feat-card" onclick="navigate(\'/map\')">' +
            '<div class="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg></div>' +
            '<div class="feat-title">Peta Interaktif</div>' +
            '<div class="feat-desc">Klik 38 provinsi di peta SVG Indonesia untuk menjelajahi kekayaan budaya, sejarah, dan tradisi daerah tersebut secara mendalam.</div>' +
          '</div>' +
          '<div class="feat-card" onclick="navigate(\'/games\')">' +
            '<div class="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>' +
            '<div class="feat-title">Quiz Budaya</div>' +
            '<div class="feat-desc">Uji pengetahuanmu tentang budaya Indonesia dengan soal-soal edukatif dari Sabang sampai Merauke.</div>' +
          '</div>' +
          '<div class="feat-card" onclick="navigate(\'/games\')">' +
            '<div class="feat-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg></div>' +
            '<div class="feat-title">Puzzle Nusantara</div>' +
            '<div class="feat-desc">Susun potongan gambar budaya Indonesia — batik, candi, hingga tarian tradisional. Seru untuk semua umur!</div>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</section>' +

    '<div class="quote-section reveal">' +
      '<p class="quote-text">"Bangsa yang besar adalah bangsa yang <span>mengenal dan menghargai</span> budaya leluhurnya"</p>' +
      '<div class="quote-attr">— Ir. Soekarno, Presiden Pertama RI</div>' +
    '</div>' +

    '<section class="cta-section reveal">' +
      '<h2 class="cta-title">Siap <em>Menjelajahi</em><br/>Nusantara?</h2>' +
      '<p class="cta-sub">Bergabunglah dan temukan keajaiban budaya Indonesia dari Sabang sampai Merauke.</p>' +
      '<button class="btn-gold" onclick="navigate(\'/map\')">Mulai Eksplorasi Gratis</button>' +
    '</section>' +

    footerHTML() +

    '<div class="culture-popup-overlay" id="culture-popup-overlay" onclick="closeCulturePopupOverlay(event)">' +
      '<div class="culture-popup" id="culture-popup"></div>' +
    '</div>'
  );

  initNavbar();
}

function openCulturePopup(id) {
  var c = null;
  for (var i = 0; i < culturesData.length; i++) { if (culturesData[i].id === id) { c = culturesData[i]; break; } }
  if (!c) return;

  var popup   = document.getElementById('culture-popup');
  var overlay = document.getElementById('culture-popup-overlay');
  if (!popup || !overlay) return;

  popup.innerHTML =
    '<button class="popup-close" onclick="closeCulturePopup()">✕</button>' +
    '<img class="popup-img" src="' + c.popupImage + '" alt="' + c.title + '" onerror="this.style.display=\'none\'">' +
    '<div class="popup-tag">' + c.tag + '</div>' +
    '<h2 class="popup-title">' + c.titleFull + '</h2>' +
    '<div class="popup-sub">📍 ' + c.origin + ' &nbsp;·&nbsp; ⏳ ' + c.era + '</div>' +
    '<p class="popup-desc">' + c.description.replace(/\n/g, '<br>') + '</p>' +
    '<div class="popup-facts">' +
      c.facts.map(function(f) { return '<div class="popup-fact">✦ ' + f + '</div>'; }).join('') +
    '</div>';

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCulturePopup() {
  var overlay = document.getElementById('culture-popup-overlay');
  if (overlay) overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function closeCulturePopupOverlay(e) {
  if (e.target && e.target.id === 'culture-popup-overlay') closeCulturePopup();
}