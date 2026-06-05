// ============================================================
// map.js — Peta Interaktif (edu mode, tanpa lock)
// ============================================================

let mapState = {
  hoveredId: null,
  selectedId: null,
  isSelected: false,
  zoom: 1,
  panX: 0,
  panY: 0,
};

function renderMap() {
  document.title = 'Peta Interaktif — NusaExplore';
  setPage(`
    ${navbarHTML('/map')}
    <div class="map-page">
      <div class="map-loading" id="map-loading">
        <div class="map-loading-spinner"></div>
        <p class="map-loading-text">Memuat Peta Indonesia...</p>
      </div>
      <div class="map-hero" id="map-content" style="display:none">
        <div class="map-hero-header">
          <div class="section-label">Peta Interaktif</div>
          <h2 class="map-info-title">Jelajahi <em>Indonesia</em></h2>
          <p style="font-size:13px;color:var(--text2);margin-top:4px">Klik provinsi untuk melihat detail budaya</p>
        </div>
        <button class="map-back-btn" onclick="navigate('/')">← Kembali</button>
        <div class="map-hero-inner">
          <div class="map-container">
            <svg id="indonesia-map" class="map-svg"
              viewBox="-10 0 807 340"
              xmlns="http://www.w3.org/2000/svg"
              style="transition: all 0.5s cubic-bezier(0.4,0,0.2,1)">
              ${buildMapSVG()}
            </svg>
          </div>
        </div>
      </div>
      <!-- Province Popup -->
      <div class="region-popup-overlay" id="region-popup" style="display:none">
        <div class="region-popup" id="region-popup-inner"></div>
      </div>
    </div>
    ${footerHTML()}
  `);

  initNavbar();
  setTimeout(() => {
    document.getElementById('map-loading').style.display = 'none';
    document.getElementById('map-content').style.display = 'flex';
    initMapEvents();
  }, 1200);
}

function buildMapSVG() {
  return regions.map(r => {
    const island = regionToIslandMap[r.id];
    const hasDetail = provinceDetailData.some(p => p.slug === r.id);
    return `<path
      id="path-${r.id}"
      class="province-path"
      data-id="${r.id}"
      data-name="${r.name}"
      data-island="${island || ''}"
      data-has-detail="${hasDetail}"
      d="${r.d}"
      title="${r.name}"
    />`;
  }).join('\n');
}

function initMapEvents() {
  const svg = document.getElementById('indonesia-map');
  if (!svg) return;

  svg.querySelectorAll('.province-path').forEach(path => {
    path.addEventListener('mouseenter', () => {
      if (!mapState.isSelected) {
        path.classList.add('hovered');
        showMapTooltip(path.dataset.name, path.dataset.id);
      }
    });
    path.addEventListener('mouseleave', () => {
      if (!mapState.isSelected) {
        path.classList.remove('hovered');
        hideMapTooltip();
      }
    });
    path.addEventListener('click', () => handleMapClick(path));
  });

  // Close popup on overlay click
  document.getElementById('region-popup').addEventListener('click', function(e) {
    if (e.target === this) closeMapPopup();
  });
}

// Simple tooltip near cursor
let tooltipEl = null;
function showMapTooltip(name, id) {
  hideMapTooltip();
  tooltipEl = document.createElement('div');
  tooltipEl.style.cssText = `
    position:fixed;pointer-events:none;z-index:250;
    background:var(--bg2);border:1px solid var(--border);
    color:var(--text);padding:6px 14px;border-radius:8px;
    font-size:13px;font-weight:600;font-family:'Plus Jakarta Sans',sans-serif;
    box-shadow:var(--shadow);white-space:nowrap;transition:opacity .15s;
  `;
  tooltipEl.textContent = name;
  document.body.appendChild(tooltipEl);
  document.addEventListener('mousemove', moveTooltip);
}
function moveTooltip(e) {
  if (!tooltipEl) return;
  tooltipEl.style.left = (e.clientX + 14) + 'px';
  tooltipEl.style.top  = (e.clientY - 30) + 'px';
}
function hideMapTooltip() {
  if (tooltipEl) { tooltipEl.remove(); tooltipEl = null; }
  document.removeEventListener('mousemove', moveTooltip);
}

function handleMapClick(path) {
  if (mapState.isSelected) return;

  const id   = path.dataset.id;
  const name = path.dataset.name;
  const island = path.dataset.island;

  mapState.selectedId = id;
  mapState.isSelected = true;

  // Highlight selected
  document.querySelectorAll('.province-path').forEach(p => p.classList.remove('hovered'));
  path.classList.add('selected');
  hideMapTooltip();

  showRegionPopup(id, name, island);
}

function showRegionPopup(id, name, islandKey) {
  const region = regionData[islandKey] || {};
  const detail = provinceDetailData.find(p => p.slug === id);
  const diff   = getDifficultyInfo(id);

  const popupEl = document.getElementById('region-popup-inner');
  popupEl.innerHTML = `
    <button class="popup-close-btn" onclick="closeMapPopup()">✕</button>
    <div class="popup-region-label">${region.name || islandKey || 'Indonesia'}</div>
    <h2 class="popup-section-title">${name}</h2>
    <p class="popup-desc-text">${detail ? detail.description : (region.desc || 'Provinsi kaya budaya Indonesia.')}</p>
    <div class="popup-tags">
      ${(region.tags || []).slice(0,4).map(t => `<span class="popup-tag">✦ ${t}</span>`).join('')}
    </div>
    ${detail ? `
    <div class="popup-cards">
      <div class="popup-card">
        <div class="popup-card-icon">🏛️</div>
        <div class="popup-card-title">Ibu Kota</div>
        <div class="popup-card-sub">${detail.capital}</div>
      </div>
      <div class="popup-card">
        <div class="popup-card-icon">👥</div>
        <div class="popup-card-title">Populasi</div>
        <div class="popup-card-sub">${detail.population}</div>
      </div>
      <div class="popup-card">
        <div class="popup-card-icon">🗣️</div>
        <div class="popup-card-title">Bahasa</div>
        <div class="popup-card-sub">${detail.language.split(',')[0]}</div>
      </div>
    </div>` : ''}
    <div class="popup-btn-row">
      ${detail ? `<button class="popup-btn-primary" onclick="navigate('/province/${id}')">📖 Lihat Detail</button>` : ''}
      <button class="popup-btn-secondary" onclick="closeMapPopup()">Tutup</button>
    </div>
  `;

  document.getElementById('region-popup').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeMapPopup() {
  document.getElementById('region-popup').style.display = 'none';
  document.body.style.overflow = '';
  if (mapState.selectedId) {
    const el = document.getElementById(`path-${mapState.selectedId}`);
    if (el) el.classList.remove('selected');
  }
  mapState.selectedId = null;
  mapState.isSelected = false;
}
