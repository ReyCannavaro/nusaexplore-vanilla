// ============================================================
// app.js — Core app: router, navbar, theme, animations
// ============================================================

// ── Router ───────────────────────────────────────────────────
const routes = {
  '/':          renderHome,
  '/map':       renderMap,
  '/games':     renderGames,
};

function navigate(path, state = {}) {
  history.pushState(state, '', path);
  render(path, state);
}

function render(path, state = {}) {
  // Check dynamic routes
  if (path.startsWith('/province/')) {
    const slug = path.replace('/province/', '');
    renderProvince(slug);
    return;
  }
  if (path.startsWith('/quiz/')) {
    const slug = path.replace('/quiz/', '');
    renderQuiz(slug);
    return;
  }
  if (path.startsWith('/puzzle/')) {
    const slug = path.replace('/puzzle/', '');
    renderPuzzle(slug);
    return;
  }
  const fn = routes[path];
  if (fn) fn(state);
  else renderHome();
}

window.addEventListener('popstate', () => render(location.pathname));
window.addEventListener('DOMContentLoaded', () => {
  applyTheme(getTheme());
  render(location.pathname);
});

// ── Theme ────────────────────────────────────────────────────
function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  saveTheme(t);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = t === 'dark' ? '☀️' : '🌙';
  const btnM = document.getElementById('theme-toggle-mobile');
  if (btnM) btnM.textContent = (t === 'dark' ? '☀️ ' : '🌙 ') + (t === 'dark' ? 'Mode Terang' : 'Mode Gelap');
}

function toggleTheme() {
  const cur = getTheme();
  const next = cur === 'dark' ? 'light' : 'dark';
  applyTheme(next);
}

// ── Navbar HTML ──────────────────────────────────────────────
function navbarHTML(active = '') {
  const links = [
    { path: '/',      label: 'Beranda'  },
    { path: '/map',   label: 'Peta'     },
    { path: '/games', label: 'Games'    },
  ];
  const theme = getTheme();
  return `
<div class="nav-wrapper" id="nav-wrapper">
  <nav id="main-nav">
    <div class="nav-logo" onclick="navigate('/')">Nusa<span>Explore</span></div>
    <div class="nav-divider"></div>
    <div class="nav-links" id="nav-links">
      ${links.map(l => `
        <button class="nav-btn${active===l.path?' active':''}" onclick="navigate('${l.path}')">${l.label}</button>
      `).join('')}
      <button class="nav-btn primary" onclick="navigate('/map')">Mulai Jelajah</button>
      <button class="nav-btn theme-btn-mobile" id="theme-toggle-mobile" onclick="toggleTheme()">
        ${theme==='dark'?'☀️ Mode Terang':'🌙 Mode Gelap'}
      </button>
    </div>
    <button class="theme-toggle theme-toggle-desktop" id="theme-toggle" onclick="toggleTheme()" title="Toggle Theme">
      ${theme==='dark'?'☀️':'🌙'}
    </button>
    <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </nav>
</div>`;
}

function initNavbar() {
  const wrapper = document.getElementById('nav-wrapper');
  const nav     = document.getElementById('main-nav');
  const ham     = document.getElementById('nav-hamburger');
  const links   = document.getElementById('nav-links');
  if (!wrapper || !nav || !ham || !links) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 40;
    wrapper.classList.toggle('scrolled', scrolled);
    nav.classList.toggle('scrolled', scrolled);
  }, { passive: true });

  ham.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    ham.classList.toggle('active', open);
    ham.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      links.classList.remove('open');
      ham.classList.remove('active');
      ham.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });
}

// ── Scroll Reveal ────────────────────────────────────────────
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.1 });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}

// ── Footer HTML ──────────────────────────────────────────────
function footerHTML() {
  return `
<footer>
  <div class="footer-logo">Nusa<span>Explore</span></div>
  <div class="footer-copy">© 2025 NusaExplore · Bangga Budaya Indonesia</div>
  <div class="footer-links">
    <a href="#">Tentang</a>
    <a href="#">Kontak</a>
    <a href="#">Kebijakan</a>
  </div>
</footer>`;
}

// ── Toast ────────────────────────────────────────────────────
function showToast(msg, icon = '🎉', color = '#2D6A4F') {
  const existing = document.querySelector('.reward-toast-popup');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'reward-toast-popup';
  el.style.background = color;
  el.innerHTML = `<span style="font-size:20px">${icon}</span> ${msg}`;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3500);
}

// ── Loading spinner ──────────────────────────────────────────
function loadingHTML(text = 'Memuat...') {
  return `
<div class="map-loading">
  <div class="map-loading-spinner"></div>
  <p class="map-loading-text">${text}</p>
</div>`;
}

// ── App root ─────────────────────────────────────────────────
function setPage(html) {
  document.getElementById('app').innerHTML = html;
  window.scrollTo(0, 0);
  setTimeout(initReveal, 50);
}
