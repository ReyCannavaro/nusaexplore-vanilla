function getRoutes() {
  return {
    '/':      renderHome,
    '/map':   renderMap,
    '/games': renderGames,
  };
}

function navigate(path, state = {}) {
  history.pushState(state, '', path);
  render(path, state);
}

function render(path, state = {}) {
  if (path.startsWith('/province/')) { renderProvince(path.replace('/province/', '')); return; }
  if (path.startsWith('/quiz/'))     { renderQuiz(path.replace('/quiz/', ''));         return; }
  if (path.startsWith('/puzzle/'))   { renderPuzzle(path.replace('/puzzle/', ''));     return; }
  const fn = getRoutes()[path];
  if (fn) fn(state); else renderHome();
}

window.addEventListener('popstate', () => render(location.pathname));

window.addEventListener('load', () => {
  applyTheme(getTheme());
  render(location.pathname);
});

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  saveTheme(t);
  const btn  = document.getElementById('theme-toggle');
  const btnM = document.getElementById('theme-toggle-mobile');
  if (btn)  btn.textContent  = t === 'dark' ? '☀️' : '🌙';
  if (btnM) btnM.textContent = (t === 'dark' ? '☀️ ' : '🌙 ') + (t === 'dark' ? 'Mode Terang' : 'Mode Gelap');
}

function toggleTheme() {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

function navbarHTML(active) {
  active = active || '';
  const links = [
    { path:'/',      label:'Beranda' },
    { path:'/map',   label:'Peta'    },
    { path:'/games', label:'Games'   },
  ];
  const theme = getTheme();
  return '<div class="nav-wrapper" id="nav-wrapper">' +
    '<nav id="main-nav">' +
      '<div class="nav-logo" onclick="navigate(\'/\')">Nusa<span>Explore</span></div>' +
      '<div class="nav-divider"></div>' +
      '<div class="nav-links" id="nav-links">' +
        links.map(function(l) {
          return '<button class="nav-btn' + (active === l.path ? ' active' : '') + '" onclick="navigate(\'' + l.path + '\')">' + l.label + '</button>';
        }).join('') +
        '<button class="nav-btn primary" onclick="navigate(\'/map\')">Mulai Jelajah</button>' +
        '<button class="nav-btn theme-btn-mobile" id="theme-toggle-mobile" onclick="toggleTheme()">' +
          (theme === 'dark' ? '☀️ Mode Terang' : '🌙 Mode Gelap') +
        '</button>' +
      '</div>' +
      '<button class="theme-toggle theme-toggle-desktop" id="theme-toggle" onclick="toggleTheme()" title="Toggle Theme">' +
        (theme === 'dark' ? '☀️' : '🌙') +
      '</button>' +
      '<button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">' +
        '<span></span><span></span><span></span>' +
      '</button>' +
    '</nav>' +
  '</div>';
}

function initNavbar() {
  var wrapper = document.getElementById('nav-wrapper');
  var nav     = document.getElementById('main-nav');
  var ham     = document.getElementById('nav-hamburger');
  var links   = document.getElementById('nav-links');
  if (!wrapper || !nav || !ham || !links) return;

  window.addEventListener('scroll', function() {
    var scrolled = window.scrollY > 40;
    wrapper.classList.toggle('scrolled', scrolled);
    nav.classList.toggle('scrolled', scrolled);
  }, { passive: true });

  ham.addEventListener('click', function() {
    var open = links.classList.toggle('open');
    ham.classList.toggle('active', open);
    ham.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });

  document.addEventListener('click', function(e) {
    if (nav && !nav.contains(e.target)) {
      links.classList.remove('open');
      ham.classList.remove('active');
      ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

function initReveal() {
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function(el) { obs.observe(el); });
}

function footerHTML() {
  return '<footer>' +
    '<div class="footer-logo">Nusa<span>Explore</span></div>' +
    '<div class="footer-copy">© 2025 NusaExplore · Bangga Budaya Indonesia</div>' +
    '<div class="footer-links">' +
      '<a href="#">Tentang</a>' +
      '<a href="#">Kontak</a>' +
      '<a href="#">Kebijakan</a>' +
    '</div>' +
  '</footer>';
}

function showToast(msg, icon, color) {
  icon  = icon  || '🎉';
  color = color || '#2D6A4F';
  var existing = document.querySelector('.reward-toast-popup');
  if (existing) existing.remove();
  var el = document.createElement('div');
  el.className = 'reward-toast-popup';
  el.style.background = color;
  el.innerHTML = '<span style="font-size:20px">' + icon + '</span> ' + msg;
  document.body.appendChild(el);
  setTimeout(function() { if (el.parentNode) el.remove(); }, 3500);
}

function loadingHTML(text) {
  text = text || 'Memuat...';
  return '<div class="map-loading">' +
    '<div class="map-loading-spinner"></div>' +
    '<p class="map-loading-text">' + text + '</p>' +
  '</div>';
}

function setPage(html) {
  var app = document.getElementById('app');
  if (!app) return;
  app.innerHTML = html;
  window.scrollTo(0, 0);
  setTimeout(initReveal, 100);
}