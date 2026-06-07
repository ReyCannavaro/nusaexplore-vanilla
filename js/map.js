var mapState = { selectedId: null, isSelected: false };

function renderMap() {
  document.title = 'Peta Interaktif — NusaExplore';

  var svgPaths = regions.map(function(r) {
    return '<path id="path-' + r.id + '" class="province-path" data-id="' + r.id + '" data-name="' + r.name + '" d="' + r.d + '"/>';
  }).join('');

  setPage(
    navbarHTML('/map') +
    '<div style="background:var(--bg);min-height:100vh">' +
      '<div id="map-loading" class="map-loading">' +
        '<div class="map-loading-spinner"></div>' +
        '<p class="map-loading-text">Memuat Peta Indonesia...</p>' +
      '</div>' +
      '<div id="map-content" class="map-hero" style="display:none">' +
        '<div class="map-hero-header">' +
          '<div class="section-label">Peta Interaktif</div>' +
          '<h2 class="map-info-title">Jelajahi <em>Indonesia</em></h2>' +
          '<p style="font-size:13px;color:var(--text2);margin-top:4px">Hover untuk nama provinsi &mdash; klik untuk detail budaya</p>' +
        '</div>' +
        '<button class="map-back-btn" onclick="navigate(\'/\')">&#8592; Kembali</button>' +
        '<div class="map-hero-inner">' +
          '<div class="map-container">' +
            '<svg id="indonesia-map" class="map-svg" viewBox="-10 0 807 340" xmlns="http://www.w3.org/2000/svg">' +
              svgPaths +
            '</svg>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div id="region-popup-overlay" style="display:none" class="region-popup-overlay" onclick="closeMapPopupOverlay(event)">' +
        '<div class="region-popup" id="region-popup-inner"></div>' +
      '</div>' +
    '</div>' +
    footerHTML()
  );

  initNavbar();
  mapState = { selectedId: null, isSelected: false };

  setTimeout(function() {
    document.getElementById('map-loading').style.display = 'none';
    document.getElementById('map-content').style.display = 'flex';
    initMapEvents();
  }, 1000);
}

function initMapEvents() {
  var svg = document.getElementById('indonesia-map');
  if (!svg) return;

  svg.querySelectorAll('.province-path').forEach(function(path) {
    path.addEventListener('mouseenter', function() {
      if (mapState.isSelected) return;
      path.style.fill = '#40916C';
      showMapTooltip(path.dataset.name);
    });
    path.addEventListener('mouseleave', function() {
      if (mapState.isSelected) return;
      path.style.fill = '';
      hideMapTooltip();
    });
    path.addEventListener('click', function() {
      if (mapState.isSelected) return;
      mapState.selectedId = path.dataset.id;
      mapState.isSelected = true;
      path.style.fill = 'var(--gold)';
      hideMapTooltip();
      showRegionPopup(path.dataset.id, path.dataset.name);
    });
  });
}

var _tip = null;
function showMapTooltip(name) {
  hideMapTooltip();
  _tip = document.createElement('div');
  _tip.style.cssText = 'position:fixed;pointer-events:none;z-index:250;background:var(--bg2);border:1px solid var(--border);color:var(--text);padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;font-family:Plus Jakarta Sans,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,.3);white-space:nowrap;transition:opacity .1s;';
  _tip.textContent = name;
  document.body.appendChild(_tip);
  document.addEventListener('mousemove', _moveTip);
}
function _moveTip(e) {
  if (_tip) { _tip.style.left = (e.clientX + 14) + 'px'; _tip.style.top = (e.clientY - 34) + 'px'; }
}
function hideMapTooltip() {
  if (_tip) { _tip.remove(); _tip = null; }
  document.removeEventListener('mousemove', _moveTip);
}

function showRegionPopup(id, name) {
  var islandKey = regionToIslandMap[id] || '';
  var region    = regionData[islandKey] || {};
  var detail    = null;
  for (var i = 0; i < provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug === id) { detail = provinceDetailData[i]; break; }
  }

  var tagsHTML = '';
  if (region.tags && region.tags.length) {
    tagsHTML = '<div class="popup-tags">' +
      region.tags.slice(0, 4).map(function(t) {
        return '<span class="popup-tag">' + t + '</span>';
      }).join('') +
    '</div>';
  }

  var cardsHTML = '';
  if (detail) {
    cardsHTML = '<div class="popup-cards">' +
      '<div class="popup-card">' +
        '<div class="popup-card-icon">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>' +
        '</div>' +
        '<div class="popup-card-title">Ibu Kota</div>' +
        '<div class="popup-card-sub">' + detail.capital + '</div>' +
      '</div>' +
      '<div class="popup-card">' +
        '<div class="popup-card-icon">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>' +
        '</div>' +
        '<div class="popup-card-title">Populasi</div>' +
        '<div class="popup-card-sub">' + detail.population + '</div>' +
      '</div>' +
      '<div class="popup-card">' +
        '<div class="popup-card-icon">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>' +
        '</div>' +
        '<div class="popup-card-title">Bahasa</div>' +
        '<div class="popup-card-sub">' + detail.language.split(',')[0] + '</div>' +
      '</div>' +
    '</div>';
  }

  document.getElementById('region-popup-inner').innerHTML =
    '<button class="popup-close-btn" onclick="closeMapPopup()" style="display:flex;align-items:center;justify-content:center">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
    '</button>' +
    '<div class="popup-region-label">' + (region.name || 'Indonesia') + '</div>' +
    '<h2 class="popup-section-title">' + name + '</h2>' +
    '<p class="popup-desc-text">' + (detail ? detail.description : (region.desc || 'Provinsi kaya budaya Indonesia.')) + '</p>' +
    tagsHTML + cardsHTML +
    '<div class="popup-btn-row">' +
      (detail ? '<button class="popup-btn-primary" onclick="navigate(\'/province/' + id + '\')">Lihat Detail Provinsi</button>' : '') +
      '<button class="popup-btn-secondary" onclick="closeMapPopup()">Tutup</button>' +
    '</div>';

  document.getElementById('region-popup-overlay').style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeMapPopup() {
  document.getElementById('region-popup-overlay').style.display = 'none';
  document.body.style.overflow = '';
  if (mapState.selectedId) {
    var el = document.getElementById('path-' + mapState.selectedId);
    if (el) el.style.fill = '';
  }
  mapState.selectedId = null;
  mapState.isSelected = false;
}

function closeMapPopupOverlay(e) {
  if (e.target && e.target.id === 'region-popup-overlay') closeMapPopup();
}