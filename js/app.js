function _getHash() {
  return location.hash.replace(/^#/, '') || '/';
}
function getRoutes() {
  return { '/': renderHome, '/map': renderMap, '/games': renderGames };
}
function navigate(path) {
  location.hash = path;
}
function render(path) {
  if (path.startsWith('/province/')) { renderProvince(path.replace('/province/','')); return; }
  if (path.startsWith('/quiz/'))     { renderQuiz(path.replace('/quiz/','')); return; }
  if (path.startsWith('/puzzle/'))   { renderPuzzle(path.replace('/puzzle/','')); return; }
  var fn = getRoutes()[path];
  if (fn) fn(); else renderHome();
}
window.addEventListener('hashchange', function() { render(_getHash()); });
window.addEventListener('load', function() {
  applyTheme(getTheme());
  render(_getHash());
});

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  saveTheme(t);
  _syncThemeBtn();
}
function toggleTheme() { applyTheme(getTheme()==='dark' ? 'light' : 'dark'); }
function _syncThemeBtn() {
  var t   = getTheme();
  var sun  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var moon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var icon  = t==='dark' ? sun : moon;
  var btn  = document.getElementById('theme-toggle');
  if (btn) btn.innerHTML = icon;
}

function navbarHTML(active) {
  active = active || '';
  var links = [{path:'/',label:'Beranda'},{path:'/map',label:'Peta'},{path:'/games',label:'Games'}];
  var t    = getTheme();
  var sun  = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';
  var moon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  var icon  = t==='dark' ? sun : moon;
  var label = t==='dark' ? 'Mode Terang' : 'Mode Gelap';
  var linksHTML = links.map(function(l) {
    return '<button class="nav-btn'+(active===l.path?' active':'')+'" onclick="navigate(\''+l.path+'\')">'+l.label+'</button>';
  }).join('');
  return '<div class="nav-wrapper" id="nav-wrapper">'+
    '<nav id="main-nav">'+
      '<div class="nav-logo" onclick="navigate(\'/\')">Nusa<span>Explore</span></div>'+
      '<div class="nav-divider"></div>'+
      '<div class="nav-links" id="nav-links">'+
        linksHTML+
        '<button class="nav-btn primary" onclick="navigate(\'/map\')">Mulai Jelajah</button>'+
        '<button class="nav-btn theme-mobile-btn" onclick="toggleTheme()" style="display:flex;align-items:center;gap:6px">'+icon+' '+label+'</button>'+
      '</div>'+
      '<button class="theme-toggle" id="theme-toggle" onclick="toggleTheme()" title="Toggle Theme">'+icon+'</button>'+
      '<button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">'+
        '<span></span><span></span><span></span>'+
      '</button>'+
    '</nav>'+
  '</div>';
}

function initNavbar() {
  var wrapper = document.getElementById('nav-wrapper');
  var nav     = document.getElementById('main-nav');
  var ham     = document.getElementById('nav-hamburger');
  var links   = document.getElementById('nav-links');
  if (!wrapper||!nav||!ham||!links) return;
  window.addEventListener('scroll', function() {
    var s = window.scrollY>40;
    wrapper.classList.toggle('scrolled',s);
    nav.classList.toggle('scrolled',s);
  }, {passive:true});
  ham.addEventListener('click', function(e) {
    e.stopPropagation();
    var open = links.classList.toggle('open');
    ham.classList.toggle('open',open);
    ham.setAttribute('aria-expanded',String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  });
  document.addEventListener('click', function(e) {
    if (links.classList.contains('open') && nav && !nav.contains(e.target)) {
      links.classList.remove('open');
      ham.classList.remove('open');
      ham.setAttribute('aria-expanded','false');
      document.body.style.overflow = '';
    }
  });
}

function initReveal() {
  var items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  var obs = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, {threshold:0.07});
  items.forEach(function(el) { obs.observe(el); });
}

function footerHTML() {
  return '<footer>'+
    '<div class="footer-logo">Nusa<span>Explore</span></div>'+
    '<div class="footer-copy">&copy; 2025 NusaExplore &middot; Bangga Budaya Indonesia</div>'+
    '<div class="footer-links"><a href="#">Tentang</a><a href="#">Kontak</a><a href="#">Kebijakan</a></div>'+
  '</footer>';
}

function showToast(msg, color) {
  color = color || '#2D6A4F';
  var old = document.querySelector('.reward-toast-popup');
  if (old) old.remove();
  var el = document.createElement('div');
  el.className = 'reward-toast-popup';
  el.style.background = color;
  el.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg> '+msg;
  document.body.appendChild(el);
  setTimeout(function() { if (el.parentNode) el.remove(); }, 3500);
}

function setPage(html) {
  var app = document.getElementById('app');
  if (!app) return;
  app.style.transition = 'opacity .18s ease, transform .18s ease';
  app.style.opacity    = '0';
  app.style.transform  = 'translateY(10px)';

  setTimeout(function() {
    app.innerHTML = html;
    window.scrollTo(0, 0);
    app.style.transition = 'none';
    app.style.opacity    = '0';
    app.style.transform  = 'translateY(18px)';
    void app.offsetHeight;
    app.style.transition = 'opacity .45s cubic-bezier(.16,1,.3,1), transform .45s cubic-bezier(.16,1,.3,1)';
    app.style.opacity    = '1';
    app.style.transform  = 'translateY(0)';

    setTimeout(initReveal, 80);
  }, 160);
}