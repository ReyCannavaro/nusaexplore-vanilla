var mapState = { hoveredId:null, selectedId:null, isSelected:false };

function renderMap() {
  document.title = 'Peta Interaktif — NusaExplore';

  setPage(
    navbarHTML('/map') +
    '<div class="map-page">' +
      '<div class="map-loading" id="map-loading">' +
        '<div class="map-loading-spinner"></div>' +
        '<p class="map-loading-text">Memuat Peta Indonesia...</p>' +
      '</div>' +
      '<div class="map-hero" id="map-content" style="display:none">' +
        '<div class="map-hero-header">' +
          '<div class="section-label">Peta Interaktif</div>' +
          '<h2 class="map-info-title">Jelajahi <em>Indonesia</em></h2>' +
          '<p style="font-size:13px;color:var(--text2);margin-top:4px">Klik provinsi untuk melihat detail budaya</p>' +
        '</div>' +
        '<button class="map-back-btn" onclick="navigate(\'/\')">← Kembali</button>' +
        '<div class="map-hero-inner">' +
          '<div class="map-container">' +
            '<svg id="indonesia-map" class="map-svg" viewBox="-10 0 807 340" xmlns="http://www.w3.org/2000/svg">' +
              buildMapSVG() +
            '</svg>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="region-popup-overlay" id="region-popup" style="display:none" onclick="closeMapPopupOverlay(event)">' +
        '<div class="region-popup" id="region-popup-inner"></div>' +
      '</div>' +
    '</div>' +
    footerHTML()
  );

  initNavbar();

  setTimeout(function() {
    var loading = document.getElementById('map-loading');
    var content = document.getElementById('map-content');
    if (loading) loading.style.display = 'none';
    if (content) content.style.display = 'flex';
    initMapEvents();
    mapState = { hoveredId:null, selectedId:null, isSelected:false };
  }, 1000);
}

function buildMapSVG() {
  return regions.map(function(r) {
    return '<path id="path-' + r.id + '" class="province-path" data-id="' + r.id + '" data-name="' + r.name + '" d="' + r.d + '"/>';
  }).join('');
}

function initMapEvents() {
  var svg = document.getElementById('indonesia-map');
  if (!svg) return;
  var paths = svg.querySelectorAll('.province-path');
  paths.forEach(function(path) {
    path.addEventListener('mouseenter', function() {
      if (!mapState.isSelected) {
        path.style.fill = 'var(--green-light, #40916C)';
        showMapTooltip(path.dataset.name);
      }
    });
    path.addEventListener('mouseleave', function() {
      if (!mapState.isSelected) {
        path.style.fill = '';
        hideMapTooltip();
      }
    });
    path.addEventListener('click', function() { handleMapClick(path); });
  });
}

var _tooltip = null;
function showMapTooltip(name) {
  hideMapTooltip();
  _tooltip = document.createElement('div');
  _tooltip.style.cssText = 'position:fixed;pointer-events:none;z-index:250;background:var(--bg2);border:1px solid var(--border);color:var(--text);padding:6px 14px;border-radius:8px;font-size:13px;font-weight:600;font-family:Plus Jakarta Sans,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,.3);white-space:nowrap;';
  _tooltip.textContent = name;
  document.body.appendChild(_tooltip);
  document.addEventListener('mousemove', moveTooltip);
}
function moveTooltip(e) {
  if (!_tooltip) return;
  _tooltip.style.left = (e.clientX + 14) + 'px';
  _tooltip.style.top  = (e.clientY - 34) + 'px';
}
function hideMapTooltip() {
  if (_tooltip) { _tooltip.remove(); _tooltip = null; }
  document.removeEventListener('mousemove', moveTooltip);
}

function handleMapClick(path) {
  if (mapState.isSelected) return;
  var id   = path.dataset.id;
  var name = path.dataset.name;
  mapState.selectedId = id;
  mapState.isSelected = true;
  path.style.fill = 'var(--gold, #C9A84C)';
  hideMapTooltip();
  showRegionPopup(id, name);
}

function showRegionPopup(id, name) {
  var islandKey = regionToIslandMap[id] || '';
  var region    = regionData[islandKey] || {};
  var detail    = null;
  for (var i = 0; i < provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug === id) { detail = provinceDetailData[i]; break; }
  }

  var tagsHTML = '';
  if (region.tags) {
    tagsHTML = '<div class="popup-tags">' +
      region.tags.slice(0,4).map(function(t) { return '<span class="popup-tag">✦ ' + t + '</span>'; }).join('') +
    '</div>';
  }

  var cardsHTML = '';
  if (detail) {
    cardsHTML = '<div class="popup-cards">' +
      '<div class="popup-card"><div class="popup-card-icon">🏛️</div><div class="popup-card-title">Ibu Kota</div><div class="popup-card-sub">' + detail.capital + '</div></div>' +
      '<div class="popup-card"><div class="popup-card-icon">👥</div><div class="popup-card-title">Populasi</div><div class="popup-card-sub">' + detail.population + '</div></div>' +
      '<div class="popup-card"><div class="popup-card-icon">🗣️</div><div class="popup-card-title">Bahasa</div><div class="popup-card-sub">' + detail.language.split(',')[0] + '</div></div>' +
    '</div>';
  }

  var btnsHTML = '<div class="popup-btn-row">' +
    (detail ? '<button class="popup-btn-primary" onclick="navigate(\'/province/' + id + '\')">📖 Lihat Detail</button>' : '') +
    '<button class="popup-btn-secondary" onclick="closeMapPopup()">Tutup</button>' +
  '</div>';

  var inner = document.getElementById('region-popup-inner');
  if (!inner) return;
  inner.innerHTML =
    '<button class="popup-close-btn" onclick="closeMapPopup()">✕</button>' +
    '<div class="popup-region-label">' + (region.name || 'Indonesia') + '</div>' +
    '<h2 class="popup-section-title">' + name + '</h2>' +
    '<p class="popup-desc-text">' + (detail ? detail.description : (region.desc || 'Provinsi kaya budaya Indonesia.')) + '</p>' +
    tagsHTML + cardsHTML + btnsHTML;

  var popup = document.getElementById('region-popup');
  if (popup) popup.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeMapPopup() {
  var popup = document.getElementById('region-popup');
  if (popup) popup.style.display = 'none';
  document.body.style.overflow = '';
  if (mapState.selectedId) {
    var el = document.getElementById('path-' + mapState.selectedId);
    if (el) el.style.fill = '';
  }
  mapState.selectedId = null;
  mapState.isSelected = false;
}

function closeMapPopupOverlay(e) {
  if (e.target && e.target.id === 'region-popup') closeMapPopup();
}