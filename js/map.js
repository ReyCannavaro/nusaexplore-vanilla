var mapState = { selectedId:null, isSelected:false, showingHow:false };
function isProvinceUnlocked(id) {
  var ud = getUserData();
  return !!(ud.unlockedRegions && ud.unlockedRegions.indexOf(id) !== -1);
}

function unlockProvince(id) {
  var ud   = getUserData();
  var diff = getDifficultyInfo(id);
  if (ud.keys < diff.unlockCost) return false;
  ud.keys -= diff.unlockCost;
  if (!ud.unlockedRegions) ud.unlockedRegions = [];
  if (ud.unlockedRegions.indexOf(id) === -1) ud.unlockedRegions.push(id);
  saveUserData(ud);
  return true;
}

function _resetMapState() {
  if (mapState.selectedId) {
    var el = document.getElementById('path-'+mapState.selectedId);
    if (el) el.style.fill = '';
  }
  mapState.selectedId = null;
  mapState.isSelected = false;
  document.body.style.overflow = '';
  var ov = document.getElementById('region-popup-overlay');
  if (ov) ov.classList.remove('active');
  var ul = document.getElementById('unlock-overlay');
  if (ul) ul.style.display = 'none';
}

function _lockSVG(sz) {
  return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
}
function _keySVG(sz) {
  return '<svg width="'+sz+'" height="'+sz+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>';
}

(function() {
  if (document.getElementById('map-lock-styles')) return;
  var s = document.createElement('style');
  s.id  = 'map-lock-styles';
  s.textContent = [
    '.province-locked{fill:var(--bg3,#1e2030);opacity:.7;cursor:pointer;transition:fill .2s,opacity .2s}',
    '.province-locked:hover{opacity:1}',
    '.province-unlocked{fill:var(--bg3,#1e2030);cursor:pointer;transition:fill .2s}',
    '.province-unlocked:hover{fill:#40916C!important}',
    '@keyframes unlockBurst{0%{transform:scale(1);filter:brightness(1)}30%{transform:scale(1.18);filter:brightness(1.6)}60%{transform:scale(0.95);filter:brightness(1.2)}100%{transform:scale(1);filter:brightness(1)}}',
    '@keyframes unlockRipple{0%{r:0;opacity:.7}100%{r:40;opacity:0}}',
    '@keyframes unlockShine{0%,100%{opacity:0}40%{opacity:.55}}',
    '.province-unlocked.just-unlocked{animation:unlockBurst .6s ease forwards}',
    '#how-to-play-panel{transition:transform .3s ease}',
  ].join('');
  document.head.appendChild(s);
})();

function renderMap() {
  document.title = 'Peta Jelajah — NusaExplore';
  var ud = getUserData();

  var unlockedCount = (ud.unlockedRegions||[]).length;
  var totalCount    = regions.length;
  var pct           = totalCount ? Math.round((unlockedCount/totalCount)*100) : 0;

  var svgPaths = regions.map(function(r) {
    var unlocked = isProvinceUnlocked(r.id);
    return '<path id="path-'+r.id+'" class="province-path'+(unlocked?' province-unlocked':' province-locked')+'" '+
      'data-id="'+r.id+'" data-name="'+r.name+'" data-unlocked="'+(unlocked?'1':'0')+'" d="'+r.d+'"/>';
  }).join('');

  setPage(
    navbarHTML('/map')+
    '<div style="background:var(--bg);min-height:100vh">'+

      '<div id="map-content" class="map-hero">'+

        '<div class="map-hero-header">'+
          '<div class="map-header-top">'+
            '<div class="map-header-left">'+
              '<div class="section-label">MAP GAME</div>'+
              '<h2 class="map-info-title">Jelajahi <em>Indonesia</em></h2>'+
            '</div>'+
            '<div class="map-header-right">'+
              '<div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">'+
                '<div style="display:flex;align-items:center;gap:6px">'+
                  '<span style="font-size:20px;font-weight:800;color:var(--gold);font-family:\'Playfair Display\',serif">'+unlockedCount+'</span>'+
                  '<span style="font-size:12px;color:var(--text2)">/ '+totalCount+' Provinsi</span>'+
                '</div>'+
                '<div style="width:140px;height:5px;background:var(--bg3);border-radius:10px;overflow:hidden">'+
                  '<div id="map-prog-bar" style="height:100%;width:'+pct+'%;background:linear-gradient(90deg,#40916C,var(--gold));border-radius:10px;transition:width .6s"></div>'+
                '</div>'+
              '</div>'+
              '<div style="width:1px;height:32px;background:var(--border)"></div>'+
              '<div id="map-key-counter" style="display:inline-flex;align-items:center;gap:8px;background:var(--bg2);border:1px solid var(--border);border-radius:12px;padding:8px 16px">'+
                _keySVG(16)+
                '<span id="map-key-val" style="font-size:14px;font-weight:700;color:var(--text)">'+ud.keys+'</span>'+
                '<span style="font-size:12px;color:var(--text2)">Kunci</span>'+
              '</div>'+
              '<div style="width:1px;height:32px;background:var(--border)"></div>'+
              '<button onclick="toggleHowToPlay()" style="display:inline-flex;align-items:center;gap:6px;background:var(--bg2);border:1px solid var(--border);color:var(--text);padding:8px 16px;border-radius:10px;cursor:pointer;font-size:13px;font-weight:600;font-family:Plus Jakarta Sans,sans-serif;white-space:nowrap;transition:border-color .2s,color .2s" onmouseenter="this.style.borderColor=\'var(--gold)\';this.style.color=\'var(--gold)\'" onmouseleave="this.style.borderColor=\'var(--border)\';this.style.color=\'var(--text)\'">'+
                '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Cara Bermain'+
              '</button>'+
            '</div>'+
          '</div>'+
          '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">'+
            '<span style="font-size:11px;color:var(--text3)">Level:</span>'+
            '<span style="font-size:11px;font-weight:700;color:#40916C;background:rgba(64,145,108,.12);padding:3px 10px;border-radius:20px;display:inline-flex;align-items:center;gap:3px">Mudah — 1'+_keySVG(12)+'</span>'+
            '<span style="font-size:11px;font-weight:700;color:#C9A84C;background:rgba(201,168,76,.12);padding:3px 10px;border-radius:20px;display:inline-flex;align-items:center;gap:3px">Sedang — 2'+_keySVG(12)+'</span>'+
            '<span style="font-size:11px;font-weight:700;color:#e74c3c;background:rgba(231,76,60,.12);padding:3px 10px;border-radius:20px;display:inline-flex;align-items:center;gap:3px">Susah — 3'+_keySVG(12)+'</span>'+
          '</div>'+
        '</div>'+

        '<div class="map-hero-inner">'+
          '<div class="map-container" style="position:relative">'+
            '<svg id="indonesia-map" class="map-svg" viewBox="-10 0 807 340" xmlns="http://www.w3.org/2000/svg" style="pointer-events:all">'+
              '<g id="unlock-fx-layer"></g>'+
              svgPaths+
            '</svg>'+
            '<div id="lock-icons-layer" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden"></div>'+
          '</div>'+
        '</div>'+

      '</div>'+

      '<div id="how-to-play-panel" style="display:none;position:fixed;top:0;right:0;height:100vh;width:min(340px,90vw);background:var(--bg2);border-left:1px solid var(--border);z-index:350;overflow-y:auto;box-shadow:-8px 0 40px rgba(0,0,0,.4);padding:28px 24px">'+
        '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:20px">'+
          '<div>'+
            '<div style="font-size:11px;font-weight:700;letter-spacing:.08em;color:var(--gold);margin-bottom:4px">PANDUAN</div>'+
            '<h3 style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:800;color:var(--text);margin:0">Map Explorer</h3>'+
            '<p style="font-size:12px;color:var(--text3);margin:4px 0 0">Buka semua '+totalCount+' provinsi Indonesia!</p>'+
          '</div>'+
          '<button onclick="toggleHowToPlay()" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);width:34px;height:34px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'+
          '</button>'+
        '</div>'+
        '<div style="background:rgba(64,145,108,.12);border:1px solid rgba(64,145,108,.3);border-radius:12px;padding:14px;margin-bottom:20px;display:flex;align-items:flex-start;gap:10px">'+
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#40916C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink:0;margin-top:1px"><path d="M20 12v10H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>'+
          '<div>'+
            '<div style="font-size:13px;font-weight:700;color:var(--text);margin-bottom:2px">Kamu punya <span style="color:#40916C">3 kunci gratis</span>!</div>'+
            '<div style="font-size:12px;color:var(--text2)">Gunakan untuk memulai petualangan menjelajahi Indonesia.</div>'+
          '</div>'+
        '</div>'+
        _howStep('1',_lockSVG(16),'Pilih Provinsi','Klik provinsi terkunci di peta')+
        _howStep('2',_keySVG(16),'Gunakan Kunci','Bayar kunci sesuai level provinsi')+
        _howStep('3','<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>','Quiz & Puzzle','Selesaikan quiz dan puzzle provinsi')+
        _howStep('4','<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>','Klaim Reward','Dapat kunci baru untuk buka lebih banyak!')+
        '<div style="background:var(--bg3);border-radius:12px;padding:16px;margin-top:8px">'+
          '<div style="font-size:11px;font-weight:700;letter-spacing:.06em;color:var(--text3);margin-bottom:10px">LEVEL PROVINSI</div>'+
          _levelRow('Mudah','#40916C','1'+_keySVG(12)+' untuk buka','+2'+_keySVG(12)+' reward')+
          _levelRow('Sedang','#C9A84C','2'+_keySVG(12)+' untuk buka','+3'+_keySVG(12)+' reward')+
          _levelRow('Susah','#e74c3c','3'+_keySVG(12)+' untuk buka','+5'+_keySVG(12)+' reward')+
        '</div>'+
      '</div>'+

      '<div id="unlock-overlay" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:300;align-items:center;justify-content:center;padding:20px" onclick="closeUnlockOverlay(event)">'+
        '<div id="unlock-popup" style="background:var(--bg2);border:1px solid var(--border);border-radius:20px;max-width:400px;width:100%;padding:28px;box-shadow:0 24px 60px rgba(0,0,0,.5)" onclick="event.stopPropagation()"></div>'+
      '</div>'+

      '<div id="region-popup-overlay" class="region-popup-overlay" onclick="closeMapPopupOverlay(event)">'+
        '<div class="region-popup" id="region-popup-inner"></div>'+
      '</div>'+

    '</div>'+
    footerHTML()
  );

  initNavbar();
  _resetMapState();
    setTimeout(function() {
    initMapEvents();
    _renderLockIcons();
    setTimeout(_renderLockIcons, 200);
    setTimeout(_renderLockIcons, 500);
  }, 250);
}

function _howStep(num, iconSVG, title, desc) {
  return '<div style="display:flex;align-items:flex-start;gap:12px;margin-bottom:16px">'+
    '<div style="width:32px;height:32px;border-radius:50%;background:var(--gold);color:#111;font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0">'+num+'</div>'+
    '<div>'+
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:2px">'+
        '<span style="color:var(--text2)">'+iconSVG+'</span>'+
        '<span style="font-size:13px;font-weight:700;color:var(--text)">'+title+'</span>'+
      '</div>'+
      '<div style="font-size:12px;color:var(--text3)">'+desc+'</div>'+
    '</div>'+
  '</div>';
}
function _levelRow(label, color, cost, reward) {
  return '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px">'+
    '<span style="font-size:12px;font-weight:700;color:'+color+';background:'+color+'18;padding:2px 10px;border-radius:20px">'+label+'</span>'+
    '<span style="font-size:11px;color:var(--text2);display:inline-flex;align-items:center;gap:3px">'+cost+'</span>'+
    '<span style="font-size:11px;color:#40916C;font-weight:700;display:inline-flex;align-items:center;gap:3px">'+reward+'</span>'+
  '</div>';
}

function _renderLockIcons() {
  var svg   = document.getElementById('indonesia-map');
  var layer = document.getElementById('lock-icons-layer');
  if (!svg||!layer) return;

  var svgRect   = svg.getBoundingClientRect();
  var layerRect = layer.getBoundingClientRect();
  var vb        = svg.viewBox.baseVal;
  var scaleX    = svgRect.width  / vb.width;
  var scaleY    = svgRect.height / vb.height;

  layer.innerHTML = '';

  regions.forEach(function(r) {
    var unlocked = isProvinceUnlocked(r.id);
    var path     = document.getElementById('path-'+r.id);
    if (!path) return;

    var bb;
    try { bb = path.getBBox(); } catch(e) { return; }
    if (!bb || bb.width===0 || bb.height===0) return;

    var screenX = (bb.x + bb.width/2  - vb.x) * scaleX;
    var screenY = (bb.y + bb.height/2 - vb.y) * scaleY;
    var relX    = screenX + (svgRect.left - layerRect.left);
    var relY    = screenY + (svgRect.top  - layerRect.top);
    var iconSz  = Math.max(10, Math.min(22, bb.width*scaleX*0.28));
    var diff    = getDifficultyInfo(r.id);
    var color   = unlocked ? '#40916C' : diff.color;

    var icon = document.createElement('div');
    icon.style.cssText = [
      'position:absolute','left:'+relX+'px','top:'+relY+'px',
      'transform:translate(-50%,-50%)','pointer-events:none',
      'display:flex','align-items:center','justify-content:center',
      'width:'+(iconSz*1.8)+'px','height:'+(iconSz*1.8)+'px',
      'border-radius:50%',
      'background:'+(unlocked?'rgba(64,145,108,.25)':'rgba(0,0,0,.55)'),
      'border:1.5px solid '+color,'color:'+color,'transition:all .2s',
    ].join(';');
    icon.innerHTML = unlocked
      ? '<svg width="'+iconSz+'" height="'+iconSz+'" viewBox="0 0 24 24" fill="none" stroke="'+color+'" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
      : '<svg width="'+iconSz+'" height="'+iconSz+'" viewBox="0 0 24 24" fill="none" stroke="'+color+'" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>';
    layer.appendChild(icon);
  });
}

var _tip = null;
function _showTooltip(name, id, unlocked) {
  _hideTooltip();
  var diff = getDifficultyInfo(id);
  _tip = document.createElement('div');
  _tip.style.cssText = 'position:fixed;pointer-events:none;z-index:250;background:var(--bg2);border:1px solid var(--border);color:var(--text);padding:8px 14px;border-radius:10px;font-size:13px;font-weight:600;font-family:Plus Jakarta Sans,sans-serif;box-shadow:0 4px 20px rgba(0,0,0,.3);white-space:nowrap;display:flex;align-items:center;gap:6px';
  var icon = unlocked
    ? '<span style="color:#40916C;display:inline-flex;align-items:center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg></span>'
    : '<span style="color:'+diff.color+'">' + _lockSVG(12) + '</span>';
  _tip.innerHTML = icon+name+(unlocked?'':' <span style="font-size:11px;color:'+diff.color+'">'+diff.label+'</span>');
  document.body.appendChild(_tip);
  document.addEventListener('mousemove', _moveTip);
}
function _moveTip(e) {
  if (_tip) { _tip.style.left=(e.clientX+14)+'px'; _tip.style.top=(e.clientY-34)+'px'; }
}
function _hideTooltip() {
  if (_tip) { _tip.remove(); _tip=null; }
  document.removeEventListener('mousemove',_moveTip);
}

function initMapEvents() {
  var svg = document.getElementById('indonesia-map');
  if (!svg) return;
  svg.querySelectorAll('.province-path').forEach(function(path) {
    var id = path.dataset.id;
    path.addEventListener('mouseenter', function() {
      if (mapState.isSelected) return;
      var unlocked = isProvinceUnlocked(id);
      path.style.fill = unlocked ? '#40916C' : getDifficultyInfo(id).color+'88';
      _showTooltip(path.dataset.name, id, unlocked);
    });
    path.addEventListener('mouseleave', function() {
      if (mapState.isSelected) return;
      path.style.fill = '';
      _hideTooltip();
    });
    path.addEventListener('click', function(e) {
      e.stopPropagation();
      if (mapState.isSelected) return;
      _hideTooltip();
      if (isProvinceUnlocked(id)) {
        mapState.selectedId = id;
        mapState.isSelected = true;
        path.style.fill = 'var(--gold)';
        showRegionPopup(id, path.dataset.name);
      } else {
        showUnlockPopup(id, path.dataset.name);
      }
    });
  });
}

function showUnlockPopup(id, name) {
  var ud       = getUserData();
  var diff     = getDifficultyInfo(id);
  var canAfford = ud.keys >= diff.unlockCost;
  var popup    = document.getElementById('unlock-popup');
  var overlay  = document.getElementById('unlock-overlay');
  if (!popup||!overlay) return;

  popup.innerHTML =
    '<button onclick="closeUnlockOverlay()" style="position:absolute;top:16px;right:16px;background:var(--bg3);border:1px solid var(--border);color:var(--text);width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center">'+
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'+
    '</button>'+
    '<div style="width:64px;height:64px;border-radius:50%;background:'+diff.color+'18;border:2px solid '+diff.color+';display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:'+diff.color+'">'+_lockSVG(28)+'</div>'+
    '<h3 style="font-family:\'Playfair Display\',serif;font-size:22px;font-weight:800;color:var(--text);text-align:center;margin-bottom:6px">'+name+'</h3>'+
    '<div style="text-align:center;margin-bottom:16px"><span style="font-size:12px;font-weight:700;color:'+diff.color+';background:'+diff.color+'18;padding:3px 12px;border-radius:20px">'+diff.label+'</span></div>'+
    '<div style="background:var(--bg3);border-radius:12px;padding:14px;margin-bottom:18px;text-align:center">'+
      '<div style="font-size:12px;color:var(--text3);margin-bottom:6px">Biaya Membuka</div>'+
      '<div style="display:flex;align-items:center;justify-content:center;gap:8px">'+
        '<span style="color:var(--gold)">'+_keySVG(20)+'</span>'+
        '<span style="font-size:24px;font-weight:800;color:var(--text)">'+diff.unlockCost+'</span>'+
        '<span style="font-size:14px;color:var(--text2)">Kunci</span>'+
      '</div>'+
    '</div>'+
    '<div style="display:flex;align-items:center;justify-content:space-between;font-size:13px;color:var(--text2);margin-bottom:16px;padding:0 4px">'+
      '<span>Kunci kamu saat ini:</span>'+
      '<span style="font-weight:700;color:'+(canAfford?'var(--text)':'#e74c3c')+'">'+ud.keys+' Kunci</span>'+
    '</div>'+
    (!canAfford
      ? '<div style="background:rgba(231,76,60,.1);border:1px solid rgba(231,76,60,.3);border-radius:10px;padding:12px;margin-bottom:16px;font-size:12px;color:#e74c3c;text-align:center;line-height:1.5">Kunci tidak cukup!<br><span style="color:var(--text2)">Selesaikan quiz & puzzle provinsi lain untuk mendapatkan kunci tambahan.</span></div>'
      : '')+
    '<div style="display:flex;gap:10px">'+
      (canAfford
        ? '<button onclick="confirmUnlock(\''+id+'\',\''+name+'\')" style="flex:1;background:var(--gold);color:#111;border:none;border-radius:12px;padding:12px;cursor:pointer;font-size:14px;font-weight:700;font-family:Plus Jakarta Sans,sans-serif;display:flex;align-items:center;justify-content:center;gap:8px">'+_lockSVG(16)+' Gunakan Kunci</button>'
        : '<button disabled style="flex:1;background:var(--bg3);border:1px solid var(--border);color:var(--text3);border-radius:12px;padding:12px;cursor:not-allowed;font-size:14px;font-weight:700;font-family:Plus Jakarta Sans,sans-serif">Kunci Tidak Cukup</button>')+
      '<button onclick="closeUnlockOverlay()" style="background:var(--bg3);border:1px solid var(--border);color:var(--text);border-radius:12px;padding:12px 18px;cursor:pointer;font-size:14px;font-family:Plus Jakarta Sans,sans-serif">Batal</button>'+
    '</div>';

  overlay.style.display       = 'flex';
  overlay.style.alignItems    = 'center';
  overlay.style.justifyContent = 'center';
  popup.style.position = 'relative';
  document.body.style.overflow = 'hidden';
}

function closeUnlockOverlay(e) {
  if (e && e.type==='click' && e.currentTarget && e.currentTarget.id !== 'unlock-overlay') return;
  var overlay = document.getElementById('unlock-overlay');
  if (overlay) overlay.style.display = 'none';
  document.body.style.overflow = '';
}

function confirmUnlock(id, name) {
  var success = unlockProvince(id);
  if (!success) { showToast('Kunci tidak cukup!','#e74c3c'); closeUnlockOverlay(); return; }

  var path = document.getElementById('path-'+id);
  if (path) {
    path.dataset.unlocked = '1';
    path.classList.remove('province-locked');
    path.classList.add('province-unlocked');
  }

  var ud  = getUserData();
  var kv  = document.getElementById('map-key-val');
  if (kv) kv.textContent = ud.keys;
  var pct = regions.length ? Math.round(((ud.unlockedRegions||[]).length/regions.length)*100) : 0;
  var pb  = document.getElementById('map-prog-bar');
  if (pb) pb.style.width = pct+'%';

  closeUnlockOverlay();

  _playUnlockAnim(id, function() {
    setTimeout(_renderLockIcons, 50);
    showToast(''+name+' berhasil dibuka!','#2D6A4F');
    _resetMapState();
    if (path) {
      mapState.selectedId = id;
      mapState.isSelected = true;
      path.style.fill = 'var(--gold)';
    }
    showRegionPopup(id, name);
  });
}

function _playUnlockAnim(id, onDone) {
  var svg  = document.getElementById('indonesia-map');
  var path = document.getElementById('path-'+id);
  var fxLayer = document.getElementById('unlock-fx-layer');
  if (!svg||!path||!fxLayer) { if (onDone) onDone(); return; }

  path.classList.add('just-unlocked');
  path.style.fill = '#40916C';
  setTimeout(function() { path.style.fill = ''; }, 650);

  var bb;
  try { bb = path.getBBox(); } catch(e) { bb = null; }
  if (bb && bb.width > 0) {
    var cx = bb.x + bb.width/2;
    var cy = bb.y + bb.height/2;
    var diff = getDifficultyInfo(id);

    [0, 150, 300].forEach(function(delay) {
      var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
      circle.setAttribute('cx', cx);
      circle.setAttribute('cy', cy);
      circle.setAttribute('r',  '0');
      circle.setAttribute('fill','none');
      circle.setAttribute('stroke', diff.color);
      circle.setAttribute('stroke-width','1.5');
      circle.setAttribute('opacity','0.7');
      fxLayer.appendChild(circle);

      var start = null;
      var duration = 700;
      function frame(ts) {
        if (!start) start = ts + delay;
        var elapsed = ts - start;
        if (elapsed < 0) { requestAnimationFrame(frame); return; }
        var t = Math.min(elapsed/duration, 1);
        circle.setAttribute('r',  String(t*38));
        circle.setAttribute('opacity', String((1-t)*0.65));
        if (t < 1) { requestAnimationFrame(frame); }
        else { if (circle.parentNode) circle.parentNode.removeChild(circle); }
      }
      requestAnimationFrame(frame);
    });

    var shine = document.createElementNS('http://www.w3.org/2000/svg','ellipse');
    shine.setAttribute('cx', cx);
    shine.setAttribute('cy', cy);
    shine.setAttribute('rx', String(bb.width/2 + 4));
    shine.setAttribute('ry', String(bb.height/2 + 4));
    shine.setAttribute('fill','white');
    shine.setAttribute('opacity','0');
    fxLayer.appendChild(shine);
    var shineStart = null;
    function shineFrame(ts) {
      if (!shineStart) shineStart = ts;
      var t = (ts - shineStart) / 350;
      if (t <= 1) {
        shine.setAttribute('opacity', String(Math.sin(t*Math.PI)*0.45));
        requestAnimationFrame(shineFrame);
      } else {
        if (shine.parentNode) shine.parentNode.removeChild(shine);
      }
    }
    requestAnimationFrame(shineFrame);
  }

  setTimeout(function() {
    path.classList.remove('just-unlocked');
    if (onDone) onDone();
  }, 620);
}

function toggleHowToPlay() {
  var panel = document.getElementById('how-to-play-panel');
  if (!panel) return;
  var visible = panel.style.display !== 'none';
  panel.style.display = visible ? 'none' : 'block';
  mapState.showingHow = !visible;
}

function showRegionPopup(id, name) {
  var islandKey = regionToIslandMap[id] || '';
  var region    = regionData[islandKey] || {};
  var detail    = null;
  for (var i=0; i<provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug===id) { detail=provinceDetailData[i]; break; }
  }

  var ud       = getUserData();
  var completed = ud.completedGames && ud.completedGames[id] ? ud.completedGames[id] : [];
  var quizDone  = completed.indexOf('quiz')   !== -1;
  var puzzDone  = completed.indexOf('puzzle') !== -1;

  var tagsHTML = '';
  if (region.tags && region.tags.length) {
    tagsHTML = '<div class="popup-tags">'+
      region.tags.slice(0,4).map(function(t){ return '<span class="popup-tag">'+t+'</span>'; }).join('')+
    '</div>';
  }

  var cardsHTML = '';
  if (detail) {
    cardsHTML = '<div class="popup-cards">'+
      _popupCard('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>','Ibu Kota',detail.capital)+
      _popupCard('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>','Populasi',detail.population)+
      _popupCard('<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>','Bahasa',detail.language.split(',')[0])+
    '</div>';
  }

  var statusHTML = '<div style="display:flex;gap:8px;margin-bottom:14px;flex-wrap:wrap">'+
    _gameStatus(quizDone,'Quiz')+_gameStatus(puzzDone,'Puzzle')+
  '</div>';

  var inner = document.getElementById('region-popup-inner');
  if (!inner) return;
  inner.innerHTML =
    '<button class="popup-close-btn" onclick="closeMapPopup()" style="display:flex;align-items:center;justify-content:center">'+
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'+
    '</button>'+
    '<div class="popup-region-label">'+(region.name||'Indonesia')+'</div>'+
    '<h2 class="popup-section-title">'+name+'</h2>'+
    '<p class="popup-desc-text">'+(detail?detail.description:(region.desc||'Provinsi kaya budaya Indonesia.'))+'</p>'+
    tagsHTML+statusHTML+cardsHTML+
    '<div class="popup-btn-row" style="display:flex;flex-direction:column;gap:8px">'+
      (detail?'<button class="popup-btn-primary" onclick="navigate(\'/province/'+id+'\')">Lihat Detail Provinsi</button>':'')+
      '<div style="display:flex;gap:8px">'+
        '<button onclick="navigate(\'/quiz/'+id+'\')" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(64,145,108,.12);border:1px solid rgba(64,145,108,.3);color:#40916C;border-radius:10px;padding:10px;cursor:pointer;font-size:13px;font-weight:700;font-family:Plus Jakarta Sans,sans-serif">'+(quizDone?'Ulang Quiz':'Mulai Quiz')+'</button>'+
        '<button onclick="navigate(\'/puzzle/'+id+'\')" style="flex:1;display:flex;align-items:center;justify-content:center;gap:6px;background:rgba(201,168,76,.1);border:1px solid rgba(201,168,76,.3);color:var(--gold);border-radius:10px;padding:10px;cursor:pointer;font-size:13px;font-weight:700;font-family:Plus Jakarta Sans,sans-serif">'+(puzzDone?'Ulang Puzzle':'Mulai Puzzle')+'</button>'+
      '</div>'+
      '<button class="popup-btn-secondary" onclick="closeMapPopup()">Tutup</button>'+
    '</div>';

  var overlay = document.getElementById('region-popup-overlay');
  if (overlay) { overlay.classList.add('active'); document.body.style.overflow='hidden'; }
}

function _popupCard(icon, label, val) {
  return '<div class="popup-card">'+
    '<div class="popup-card-icon">'+icon+'</div>'+
    '<div class="popup-card-title">'+label+'</div>'+
    '<div class="popup-card-sub">'+val+'</div>'+
  '</div>';
}
function _gameStatus(done, label) {
  var iconSvg = done ? '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>' : '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>';
  return '<div style="display:flex;align-items:center;gap:5px;font-size:12px;padding:4px 10px;border-radius:20px;background:'+(done?'rgba(64,145,108,.15)':'var(--bg3)')+';border:1px solid '+(done?'#40916C':'var(--border)')+';color:'+(done?'#40916C':'var(--text3)')+'">'+iconSvg+' '+label+'</div>';
}

function closeMapPopup() { _resetMapState(); }
function closeMapPopupOverlay(e) {
  if (e.target && e.target.id==='region-popup-overlay') _resetMapState();
}