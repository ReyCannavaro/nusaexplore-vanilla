function renderProvince(slug) {
  document.body.style.overflow = '';

  document.title = 'Memuat... — NusaExplore';
  setPage(navbarHTML('') + '<div class="map-loading"><div class="map-loading-spinner"></div><p class="map-loading-text">Memuat Data Provinsi...</p></div>');
  initNavbar();

  setTimeout(function() {
    document.body.style.overflow = '';

    var province = null;
    for (var i = 0; i < provinceDetailData.length; i++) {
      if (provinceDetailData[i].slug === slug) { province = provinceDetailData[i]; break; }
    }
    if (!province) { navigate('/map'); return; }

    var diff    = getDifficultyInfo(slug);
    var canC    = canClaimReward(slug);
    var claimed = hasClaimedReward(slug);
    document.title = province.name + ' — NusaExplore';

    function qCard(svgIcon, label, value) {
      return '<div class="quick-info-card">' +
        '<div class="quick-info-icon">' + svgIcon + '</div>' +
        '<div><h3>' + label + '</h3><p>' + value + '</p></div>' +
      '</div>';
    }
    var iconHome   = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
    var iconPeople = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>';
    var iconArea   = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3H3v18h18V3z"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/></svg>';
    var iconLang   = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>';

    var quickInfo = '<div class="quick-info-grid">' +
      qCard(iconHome,   'Ibu Kota',     province.capital) +
      qCard(iconPeople, 'Populasi',     province.population) +
      qCard(iconArea,   'Luas Wilayah', province.area) +
      qCard(iconLang,   'Bahasa Daerah',province.language) +
    '</div>';

    function mediaSection(sectionLabel, heading, items, getImg, getTitle, getDesc) {
      if (!items || !items.length) return '';
      var cards = items.map(function(item) {
        return '<div class="media-card">' +
          '<div class="media-img" style="background-image:url(\'' + getImg(item) + '\');background-color:var(--bg3)">' +
            '<div class="media-overlay">' +
              '<h3>' + getTitle(item) + '</h3>' +
              '<p>' + getDesc(item) + '</p>' +
            '</div>' +
          '</div>' +
        '</div>';
      }).join('');
      return '<div class="detail-section reveal">' +
        '<div class="detail-section-header"><div class="section-label">' + sectionLabel + '</div><h2>' + heading + '</h2></div>' +
        '<div class="media-grid">' + cards + '</div>' +
      '</div>';
    }

    var cultureSection  = mediaSection('Budaya &amp; Tradisi', 'Warisan Budaya',     province.culture,  function(c){return c.image;}, function(c){return c.title;},  function(c){return c.description;});
    var tourismSection  = mediaSection('Wisata',               'Destinasi Unggulan', province.tourism,  function(t){return t.image;}, function(t){return t.name;},   function(t){return '&#x1F4CD; '+t.location+' &mdash; '+t.description;});
    var culinarySection = mediaSection('Kuliner',              'Cita Rasa Khas',     province.culinary, function(c){return c.image;}, function(c){return c.name;},   function(c){return c.description;});

    var factsHTML = '';
    if (province.facts && province.facts.length) {
      var factCards = province.facts.map(function(f, idx) {
        return '<div class="fact-card">' +
          '<div class="fact-icon">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>' +
          '</div>' +
          '<div class="fact-index">0' + (idx + 1) + '</div>' +
          '<p>' + f + '</p>' +
        '</div>';
      }).join('');
      factsHTML = '<div class="detail-section reveal">' +
        '<div class="detail-section-header"><div class="section-label">Fakta Unik</div><h2>Tahukah Kamu?</h2></div>' +
        '<div class="facts-grid">' + factCards + '</div>' +
      '</div>';
    }

    var claimBtn = '';
    if (canC) {
      claimBtn = '<button class="claim-reward-btn claim-reward-active" onclick="claimProvinceRewardUI(\'' + slug + '\',' + diff.keyReward + ')">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' +
        'Klaim ' + diff.keyReward + ' Kunci' +
      '</button>';
    } else if (claimed) {
      claimBtn = '<button class="claim-reward-btn claim-reward-disabled" disabled>&#10003; Reward Diklaim</button>';
    } else {
      claimBtn = '<button class="claim-reward-btn claim-reward-disabled" disabled>Klaim Reward</button>';
    }

    var ctaSection = '<div class="detail-cta-section reveal">' +
      '<div class="section-label">Mini Games</div>' +
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:clamp(26px,3vw,38px);font-weight:800;color:var(--text);margin-bottom:10px">' +
        'Uji Pengetahuanmu tentang <em style="color:var(--gold);font-style:italic">' + province.name + '</em>' +
      '</h2>' +
      '<p style="font-size:15px;color:var(--text2);max-width:480px;margin:0 auto 8px;line-height:1.7">Main quiz budaya atau puzzle gambar dan klaim hadiah kunci!</p>' +
      '<p style="font-size:13px;color:var(--text3);margin-bottom:20px">' +
        'Tingkat: <span style="color:' + diff.color + ';font-weight:700">' + diff.label + '</span>' +
        ' &nbsp;&middot;&nbsp; Reward: <span style="color:var(--gold);font-weight:700">' + diff.keyReward + ' kunci</span>' +
      '</p>' +
      '<div class="cta-btn-row">' +
        '<button class="btn-play-game" onclick="navigate(\'/quiz/' + slug + '\')">Quiz Budaya</button>' +
        '<button class="btn-play-game" onclick="navigate(\'/puzzle/' + slug + '\')">Puzzle Nusantara</button>' +
        claimBtn +
      '</div>' +
    '</div>';

    var heroOverlay = 'linear-gradient(to top,rgba(0,0,0,.85) 0%,rgba(0,0,0,.35) 50%,rgba(0,0,0,.1) 100%)';

    setPage(
      navbarHTML('') +
      '<div>' +

        '<section class="detail-hero reveal" style="background-image:' + heroOverlay + ',url(\'' + province.heroImage + '\');background-size:cover;background-position:center">' +
          '<div class="detail-hero-content">' +
            '<button class="detail-back-btn" onclick="navigate(\'/map\')">' +
              '&#8592; Kembali ke Peta' +
            '</button>' +
            '<div style="margin-top:16px">' +
              '<span class="detail-badge">' + province.region + '</span>' +
              '<h1 class="detail-title">' + province.name + '</h1>' +
              '<p class="detail-subtitle">' + province.tagline + '</p>' +
            '</div>' +
          '</div>' +
        '</section>' +

        '<div class="detail-container">' +
          quickInfo +
          '<div class="detail-section reveal">' +
            '<div class="detail-section-header"><div class="section-label">Tentang Provinsi</div><h2>' + province.name + '</h2></div>' +
            '<p style="font-size:15px;line-height:1.8;color:var(--text2)">' + province.description + '</p>' +
          '</div>' +
          cultureSection + tourismSection + culinarySection + factsHTML + ctaSection +
        '</div>' +
      '</div>' +
      footerHTML()
    );

    document.body.style.overflow = '';

    initNavbar();
    setTimeout(initReveal, 100);
  }, 600);
}

function claimProvinceRewardUI(slug, keyReward) {
  if (claimProvinceReward(slug, keyReward)) {
    var ud = getUserData();
    showToast('+' + keyReward + ' kunci! Total: ' + ud.keys + ' kunci');
    renderProvince(slug);
  }
}