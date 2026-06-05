// ============================================================
// province.js — Halaman Detail Provinsi
// ============================================================

function renderProvince(slug) {
  document.title = 'Memuat... — NusaExplore';
  setPage(`
    ${navbarHTML('')}
    ${loadingHTML('Memuat Data Provinsi...')}
  `);
  initNavbar();

  setTimeout(() => {
    const province = provinceDetailData.find(p => p.slug === slug);
    if (!province) { navigate('/map'); return; }

    const diff = getDifficultyInfo(slug);
    const ud   = getUserData();
    const isUnlocked = ud.unlockedRegions.includes(slug);
    const canClaim   = canClaimReward(slug);
    const claimed    = hasClaimedReward(slug);

    document.title = `${province.name} — NusaExplore`;

    setPage(`
      ${navbarHTML('')}

      <div class="detail-map-page">

        <!-- Hero -->
        <section class="detail-hero reveal"
          style="background-image:linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.3)), url('${province.heroImage}');background-size:cover;background-position:center">
          <div class="detail-hero-content">
            <button class="detail-back-btn" onclick="history.back()">← Kembali ke Peta</button>
            <div class="detail-hero-text" style="margin-top:16px">
              <span class="detail-badge">${province.region}</span>
              <h1 class="detail-title">${province.name}</h1>
              <p class="detail-subtitle">${province.tagline}</p>
            </div>
          </div>
        </section>

        <!-- Quick Info -->
        <div class="detail-container">
          <div class="quick-info-grid">
            <div class="quick-info-card">
              <div class="quick-info-icon">🏛️</div>
              <div><h3>Ibu Kota</h3><p>${province.capital}</p></div>
            </div>
            <div class="quick-info-card">
              <div class="quick-info-icon">👥</div>
              <div><h3>Populasi</h3><p>${province.population}</p></div>
            </div>
            <div class="quick-info-card">
              <div class="quick-info-icon">📐</div>
              <div><h3>Luas Wilayah</h3><p>${province.area}</p></div>
            </div>
            <div class="quick-info-card">
              <div class="quick-info-icon">🗣️</div>
              <div><h3>Bahasa Daerah</h3><p>${province.language}</p></div>
            </div>
          </div>

          <!-- Deskripsi -->
          <div class="detail-section reveal">
            <div class="detail-section-header">
              <div class="section-label">Tentang Provinsi</div>
              <h2>${province.name}</h2>
            </div>
            <p style="font-size:15px;line-height:1.8;color:var(--text2)">${province.description}</p>
          </div>

          <!-- Budaya -->
          ${province.culture && province.culture.length ? `
          <div class="detail-section reveal">
            <div class="detail-section-header">
              <div class="section-label">Budaya &amp; Tradisi</div>
              <h2>Warisan Budaya</h2>
            </div>
            <div class="media-grid">
              ${province.culture.map(c => `
                <div class="media-card">
                  <div class="media-img" style="background-image:url('${c.image}');background-color:var(--bg3)">
                    <div class="media-overlay">
                      <h3>${c.title}</h3>
                      <p>${c.description}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          <!-- Wisata -->
          ${province.tourism && province.tourism.length ? `
          <div class="detail-section reveal">
            <div class="detail-section-header">
              <div class="section-label">Wisata</div>
              <h2>Destinasi Unggulan</h2>
            </div>
            <div class="media-grid">
              ${province.tourism.map(t => `
                <div class="media-card">
                  <div class="media-img" style="background-image:url('${t.image}');background-color:var(--bg3)">
                    <div class="media-overlay">
                      <h3>${t.name}</h3>
                      <p>📍 ${t.location} — ${t.description}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          <!-- Kuliner -->
          ${province.culinary && province.culinary.length ? `
          <div class="detail-section reveal">
            <div class="detail-section-header">
              <div class="section-label">Kuliner</div>
              <h2>Cita Rasa Khas</h2>
            </div>
            <div class="media-grid">
              ${province.culinary.map(c => `
                <div class="media-card">
                  <div class="media-img" style="background-image:url('${c.image}');background-color:var(--bg3)">
                    <div class="media-overlay">
                      <h3>${c.name}</h3>
                      <p>${c.description}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          <!-- Fakta Menarik -->
          ${province.facts && province.facts.length ? `
          <div class="detail-section reveal">
            <div class="detail-section-header">
              <div class="section-label">Fakta</div>
              <h2>Tahukah Kamu?</h2>
            </div>
            <div class="facts-grid">
              ${province.facts.map((f, i) => `
                <div class="fact-card">
                  <div class="fact-icon">✦</div>
                  <div class="fact-index">${String(i+1).padStart(2,'0')}</div>
                  <p>${f}</p>
                </div>
              `).join('')}
            </div>
          </div>` : ''}

          <!-- CTA Games -->
          <div class="detail-cta-section reveal">
            <div class="section-label">Mini Games</div>
            <h2 class="section-title" style="font-size:clamp(28px,3vw,42px);margin-bottom:10px">
              Uji Pengetahuanmu tentang <em style="color:var(--gold);font-style:italic">${province.name}</em>
            </h2>
            <p style="font-size:15px;color:var(--text2);max-width:480px;margin:0 auto 8px;line-height:1.7">
              Main quiz budaya atau puzzle gambar dan klaim hadiah kunci!
            </p>
            <p style="font-size:13px;color:var(--text3);margin-bottom:20px">
              Tingkat Kesulitan: 
              <span style="color:${diff.color};font-weight:700">${diff.label}</span> · 
              Reward: <span style="color:var(--gold);font-weight:700">🗝️ ${diff.keyReward} kunci</span>
            </p>
            <div class="cta-btn-row">
              <button class="btn-play-game" onclick="navigate('/quiz/${slug}')">🧠 Quiz Budaya</button>
              <button class="btn-play-game" onclick="navigate('/puzzle/${slug}')">🧩 Puzzle Nusantara</button>
              ${canClaim ? `
              <button class="claim-reward-btn claim-reward-active" onclick="claimReward('${slug}', ${diff.keyReward})">
                🗝️ Klaim ${diff.keyReward} Kunci
              </button>` : claimed ? `
              <button class="claim-reward-btn claim-reward-disabled" disabled>✅ Reward Diklaim</button>
              ` : `
              <button class="claim-reward-btn claim-reward-disabled" disabled title="Selesaikan game dulu">
                🗝️ Klaim Reward
              </button>`}
            </div>
          </div>

        </div>
      </div>

      ${footerHTML()}
    `);

    initNavbar();
    initReveal();
  }, 1000);
}

function claimReward(slug, keyReward) {
  const success = claimProvinceReward(slug, keyReward);
  if (success) {
    const ud = getUserData();
    showToast(`🗝️ +${keyReward} kunci! Total: ${ud.keys} kunci`, '🎉');
    // Re-render to update button state
    renderProvince(slug);
  }
}
