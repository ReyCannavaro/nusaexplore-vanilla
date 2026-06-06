function renderProvince(slug) {
  document.title = 'Memuat... — NusaExplore';
  setPage(navbarHTML('') + loadingHTML('Memuat Data Provinsi...'));
  initNavbar();

  setTimeout(function() {
    var province = null;
    for (var i = 0; i < provinceDetailData.length; i++) {
      if (provinceDetailData[i].slug === slug) { province = provinceDetailData[i]; break; }
    }
    if (!province) { navigate('/map'); return; }

    var diff    = getDifficultyInfo(slug);
    var canC    = canClaimReward(slug);
    var claimed = hasClaimedReward(slug);
    document.title = province.name + ' — NusaExplore';

    var quickInfo =
      '<div class="quick-info-grid">' +
        qCard('🏛️','Ibu Kota',province.capital) +
        qCard('👥','Populasi',province.population) +
        qCard('📐','Luas Wilayah',province.area) +
        qCard('🗣️','Bahasa Daerah',province.language) +
      '</div>';

    function mediaSection(label, heading, items, cardFn) {
      if (!items || !items.length) return '';
      return '<div class="detail-section reveal">' +
        '<div class="detail-section-header"><div class="section-label">' + label + '</div><h2>' + heading + '</h2></div>' +
        '<div class="media-grid">' + items.map(cardFn).join('') + '</div>' +
      '</div>';
    }

    var cultureSection = mediaSection('Budaya & Tradisi','Warisan Budaya', province.culture, function(c) {
      return mediaCard(c.image, c.title, c.description, '');
    });
    var tourismSection = mediaSection('Wisata','Destinasi Unggulan', province.tourism, function(t) {
      return mediaCard(t.image, t.name, '📍 ' + t.location + ' — ' + t.description, '');
    });
    var culinarySection = mediaSection('Kuliner','Cita Rasa Khas', province.culinary, function(c) {
      return mediaCard(c.image, c.name, c.description, '');
    });

    var factsHTML = '';
    if (province.facts && province.facts.length) {
      factsHTML = '<div class="detail-section reveal">' +
        '<div class="detail-section-header"><div class="section-label">Fakta</div><h2>Tahukah Kamu?</h2></div>' +
        '<div class="facts-grid">' +
          province.facts.map(function(f, i) {
            return '<div class="fact-card">' +
              '<div class="fact-icon">✦</div>' +
              '<div class="fact-index">' + String(i+1).padStart(2,'0') + '</div>' +
              '<p>' + f + '</p>' +
            '</div>';
          }).join('') +
        '</div>' +
      '</div>';
    }

    var claimBtn = '';
    if (canC) {
      claimBtn = '<button class="claim-reward-btn claim-reward-active" onclick="claimReward(\'' + slug + '\',' + diff.keyReward + ')">🗝️ Klaim ' + diff.keyReward + ' Kunci</button>';
    } else if (claimed) {
      claimBtn = '<button class="claim-reward-btn claim-reward-disabled" disabled>✅ Reward Diklaim</button>';
    } else {
      claimBtn = '<button class="claim-reward-btn claim-reward-disabled" disabled>🗝️ Klaim Reward</button>';
    }

    var ctaSection =
      '<div class="detail-cta-section reveal">' +
        '<div class="section-label">Mini Games</div>' +
        '<h2 style="font-family:\'Playfair Display\',serif;font-size:clamp(26px,3vw,38px);font-weight:800;color:var(--text);margin-bottom:10px">' +
          'Uji Pengetahuanmu tentang <em style="color:var(--gold);font-style:italic">' + province.name + '</em>' +
        '</h2>' +
        '<p style="font-size:15px;color:var(--text2);max-width:480px;margin:0 auto 8px;line-height:1.7">Main quiz budaya atau puzzle gambar dan klaim hadiah kunci!</p>' +
        '<p style="font-size:13px;color:var(--text3);margin-bottom:20px">Tingkat: <span style="color:' + diff.color + ';font-weight:700">' + diff.label + '</span> · Reward: <span style="color:var(--gold);font-weight:700">🗝️ ' + diff.keyReward + ' kunci</span></p>' +
        '<div class="cta-btn-row">' +
          '<button class="btn-play-game" onclick="navigate(\'/quiz/' + slug + '\')">🧠 Quiz Budaya</button>' +
          '<button class="btn-play-game" onclick="navigate(\'/puzzle/' + slug + '\')">🧩 Puzzle Nusantara</button>' +
          claimBtn +
        '</div>' +
      '</div>';

    setPage(
      navbarHTML('') +
      '<div class="detail-map-page">' +
        '<section class="detail-hero reveal" style="background-image:linear-gradient(to top,rgba(0,0,0,.8),rgba(0,0,0,.3)),url(\'' + province.heroImage + '\');background-size:cover;background-position:center">' +
          '<div class="detail-hero-content">' +
            '<button class="detail-back-btn" onclick="navigate(\'/map\')">← Kembali ke Peta</button>' +
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

    initNavbar();
    setTimeout(initReveal, 100);
  }, 800);
}

function qCard(icon, label, value) {
  return '<div class="quick-info-card">' +
    '<div class="quick-info-icon">' + icon + '</div>' +
    '<div><h3>' + label + '</h3><p>' + value + '</p></div>' +
  '</div>';
}

function mediaCard(img, title, desc) {
  return '<div class="media-card">' +
    '<div class="media-img" style="background-image:url(\'' + img + '\');background-color:var(--bg3)">' +
      '<div class="media-overlay"><h3>' + title + '</h3><p>' + desc + '</p></div>' +
    '</div>' +
  '</div>';
}

function claimReward(slug, keyReward) {
  var success = claimProvinceReward(slug, keyReward);
  if (success) {
    var ud = getUserData();
    showToast('🗝️ +' + keyReward + ' kunci! Total: ' + ud.keys + ' kunci', '🎉');
    renderProvince(slug);
  }
}