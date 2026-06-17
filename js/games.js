function renderGames() {
  document.title = 'Mini Games — NusaExplore';
  document.body.style.overflow = '';
  var ud = getUserData();

  var provinceListHTML = regions.map(function(r) {
    var diff = getDifficultyInfo(r.id);
    return '<div class="province-item" data-name="' + r.name.toLowerCase() + '" onclick="selectProvince(\'' + r.id + '\')" ' +
      'style="background:var(--bg3);border:1px solid var(--border2);border-radius:10px;padding:12px 14px;cursor:pointer;' +
      'transition:border-color .2s,background .2s;display:flex;align-items:center;justify-content:space-between;" ' +
      'onmouseenter="this.style.borderColor=\'var(--gold)\';this.style.background=\'var(--bg4,var(--bg2))\'" ' +
      'onmouseleave="this.style.borderColor=\'var(--border2)\';this.style.background=\'var(--bg3)\'">' +
      '<span style="font-size:13px;font-weight:600;color:var(--text)">' + r.name + '</span>' +
      '<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:20px;background:' + diff.color + '22;color:' + diff.color + '">' + diff.label + '</span>' +
    '</div>';
  }).join('');

  setPage(
    navbarHTML('/games') +
    '<div class="games-page">' +

      '<div class="games-header">' +
        '<div class="section-label">Mini Games Edukatif</div>' +
        '<h1 class="games-title">Main &amp; <em>Belajar</em></h1>' +
        '<p class="games-sub">Pilih game, pilih provinsi, dan mulai petualangan budayamu!</p>' +
        '<div style="display:flex;align-items:center;gap:12px;margin-top:16px;flex-wrap:wrap">' +
          '<div class="map-key-display" style="display:inline-flex;align-items:center;gap:6px">' +
            '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' +
            ud.keys + ' Kunci' +
          '</div>' +
          '<span style="font-size:12px;color:var(--text3)">&middot;</span>' +
          '<span style="font-size:12px;color:var(--text2)">' + (ud.gamesPlayed || 0) + ' game dimainkan</span>' +
        '</div>' +
      '</div>' +

      '<div class="games-select">' +

        '<div class="game-select-card" onclick="showProvinceSelector(\'quiz\')" style="cursor:pointer">' +
          '<div class="gsc-top">' +
            '<span class="gsc-badge b-quiz" style="display:inline-flex;align-items:center;gap:5px">' +
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> Quiz' +
            '</span>' +
            '<div class="gsc-icon" style="background:rgba(45,106,79,.15)">' +
              '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#40916C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
            '</div>' +
          '</div>' +
          '<div class="gsc-body">' +
            '<h2 class="gsc-title">Quiz Budaya</h2>' +
            '<p class="gsc-desc">Jawab 5 pertanyaan tentang budaya, tradisi, dan keunikan provinsi pilihanmu. Timer 30 detik per soal!</p>' +
            '<div class="gsc-pills">' +
              '<span class="gsc-pill">5 Soal Per Sesi</span>' +
              '<span class="gsc-pill" style="display:inline-flex;align-items:center;gap:3px"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg> 30 Detik/Soal</span>' +
              '<span class="gsc-pill">Skor 0–100</span>' +
            '</div>' +
            '<button class="gsc-cta" style="display:inline-flex;align-items:center;gap:6px">Pilih Provinsi <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>' +
          '</div>' +
        '</div>' +

        '<div class="game-select-card" onclick="showProvinceSelector(\'puzzle\')" style="cursor:pointer">' +
          '<div class="gsc-top">' +
            '<span class="gsc-badge b-puzzle" style="display:inline-flex;align-items:center;gap:5px">' +
              '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> Puzzle' +
            '</span>' +
            '<div class="gsc-icon" style="background:rgba(201,168,76,.12)">' +
              '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' +
            '</div>' +
          '</div>' +
          '<div class="gsc-body">' +
            '<h2 class="gsc-title">Puzzle Nusantara</h2>' +
            '<p class="gsc-desc">Susun 9 kepingan gambar budaya Indonesia menjadi gambar utuh. Klik dua kepingan untuk menukarnya!</p>' +
            '<div class="gsc-pills">' +
              '<span class="gsc-pill">3&times;3 Grid</span>' +
              '<span class="gsc-pill">Klik &amp; Tukar</span>' +
              '<span class="gsc-pill">3 Gambar/Provinsi</span>' +
            '</div>' +
            '<button class="gsc-cta" style="display:inline-flex;align-items:center;gap:6px">Pilih Provinsi <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></button>' +
          '</div>' +
        '</div>' +

      '</div>' +

      '<div id="province-selector" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.78);' +
        'backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:300;' +
        'align-items:center;justify-content:center;padding:20px" ' +
        'onclick="closeSelectorOverlay(event)">' +
        '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:20px;' +
          'max-width:620px;width:100%;max-height:82vh;overflow-y:auto;padding:28px;' +
          'box-shadow:0 24px 60px rgba(0,0,0,.5)" onclick="event.stopPropagation()">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
            '<h3 style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:800;color:var(--text)" id="selector-title">Pilih Provinsi</h3>' +
            '<button onclick="closeProvinceSelector()" style="background:var(--bg3);border:1px solid var(--border);' +
              'color:var(--text);width:34px;height:34px;border-radius:50%;cursor:pointer;' +
              'display:flex;align-items:center;justify-content:center;flex-shrink:0">' +
              '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
          '</div>' +
          '<input id="province-search" type="text" placeholder="Cari provinsi..." oninput="filterProvinces()" ' +
            'style="width:100%;padding:10px 16px;border-radius:10px;border:1px solid var(--border);' +
            'background:var(--bg3);color:var(--text);font-family:Plus Jakarta Sans,sans-serif;' +
            'font-size:14px;margin-bottom:14px;outline:none;box-sizing:border-box;transition:border-color .2s" ' +
            'onfocus="this.style.borderColor=\'var(--gold)\'" onblur="this.style.borderColor=\'var(--border)\'">' +
          '<div id="province-list" style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">' +
            provinceListHTML +
          '</div>' +
        '</div>' +
      '</div>' +

    '</div>' +
    footerHTML(),
    function() { initNavbar(); }
  );
}

var _currentGameType = 'quiz';

function showProvinceSelector(gameType) {
  _currentGameType = gameType;
  var sel   = document.getElementById('province-selector');
  var title = document.getElementById('selector-title');
  if (!sel) return;
  sel.style.display = 'flex';
  if (title) title.textContent = 'Pilih Provinsi — ' + (gameType === 'quiz' ? 'Quiz Budaya' : 'Puzzle Nusantara');
  document.body.style.overflow = 'hidden';
  var inp = document.getElementById('province-search');
  if (inp) { inp.value = ''; filterProvinces(); }
}

function closeProvinceSelector() {
  var sel = document.getElementById('province-selector');
  if (sel) sel.style.display = 'none';
  document.body.style.overflow = '';
}

function closeSelectorOverlay(e) {
  if (e.target && e.target.id === 'province-selector') closeProvinceSelector();
}

function filterProvinces() {
  var inp = document.getElementById('province-search');
  var q   = inp ? inp.value.toLowerCase() : '';
  document.querySelectorAll('.province-item').forEach(function(el) {
    el.style.display = (el.dataset.name || '').indexOf(q) !== -1 ? '' : 'none';
  });
}

function selectProvince(id) {
  closeProvinceSelector();
  navigate('/' + _currentGameType + '/' + id);
}

var _quiz = {};

function renderQuiz(slug) {
  document.body.style.overflow = '';
  document.title = 'Quiz — NusaExplore';

  var province = null;
  for (var i = 0; i < provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug === slug) { province = provinceDetailData[i]; break; }
  }
  var pName     = province ? province.name : _slugToName(slug);
  var questions = getQuizForProvince(slug);

  _quiz = { slug: slug, pName: pName, questions: questions, current: 0, score: 0, answered: false, timer: null, timeLeft: 30 };
  document.title = 'Quiz ' + pName + ' — NusaExplore';

  setPage(
    navbarHTML('/games') +
    '<div style="min-height:100vh;padding:120px 0 60px;background:var(--bg)">' +
      '<div style="max-width:700px;margin:0 auto;padding:0 24px">' +
        '<div id="quiz-header"></div>' +
        '<div id="quiz-body"></div>' +
      '</div>' +
    '</div>' +
    footerHTML(),
    function() {
      initNavbar();
      _renderQuizHeader();
      _showQuizCountdown();
    }
  );
}

function _showQuizCountdown() {
  var body = document.getElementById('quiz-body');
  if (!body) { _renderQuizQuestion(); _startQuizTimer(); return; }

  var count = 3;
  body.innerHTML =
    '<div style="text-align:center;padding:60px 20px">' +
      '<p style="font-size:13px;font-weight:600;color:var(--text3);letter-spacing:.08em;text-transform:uppercase;margin-bottom:16px">Quiz dimulai dalam</p>' +
      '<div id="countdown-num" style="font-size:96px;font-weight:900;color:var(--gold);line-height:1;' +
        'transition:transform .25s,opacity .25s;">' + count + '</div>' +
      '<p style="color:var(--text2);margin-top:16px;font-size:14px">Bersiap menjawab soal&hellip;</p>' +
    '</div>';

  var cd = setInterval(function() {
    count--;
    var el = document.getElementById('countdown-num');
    if (!el) { clearInterval(cd); return; }
    if (count > 0) {
      el.style.opacity = '0';
      el.style.transform = 'scale(1.3)';
      setTimeout(function() {
        var el2 = document.getElementById('countdown-num');
        if (!el2) return;
        el2.textContent = count;
        el2.style.opacity = '1';
        el2.style.transform = 'scale(1)';
      }, 150);
    } else {
      clearInterval(cd);
      requestAnimationFrame(function() {
        _renderQuizQuestion();
        setTimeout(_startQuizTimer, 80);
      });
    }
  }, 1000);
}

function _slugToName(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, function(c) { return c.toUpperCase(); });
}

function _renderQuizHeader() {
  var pct = (_quiz.current / _quiz.questions.length) * 100;
  var el  = document.getElementById('quiz-header');
  if (!el) return;
  el.innerHTML =
    '<div class="quiz-header">' +
      '<button class="quiz-back" onclick="navigate(\'/games\')" style="display:inline-flex;align-items:center;gap:6px">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Games' +
      '</button>' +
      '<div><div class="quiz-title">Quiz — ' + _quiz.pName + '</div></div>' +
    '</div>' +
    '<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-prog" style="width:' + pct + '%"></div></div>';
}

function _renderQuizQuestion() {
  var q  = _quiz.questions[_quiz.current];
  var el = document.getElementById('quiz-body');
  if (!q || !el) return;
  el.innerHTML =
    '<div class="quiz-card">' +
      '<div class="quiz-num" style="display:flex;align-items:center;gap:8px">' +
        'Soal ' + (_quiz.current + 1) + ' / ' + _quiz.questions.length +
        ' &nbsp;&middot;&nbsp; ' +
        '<span id="timer-display" style="color:var(--gold);display:inline-flex;align-items:center;gap:4px">' +
          '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>' +
          '<span id="timer-val">' + _quiz.timeLeft + 's</span>' +
        '</span>' +
      '</div>' +
      '<div class="quiz-question">' + q.q + '</div>' +
      '<div class="quiz-options">' +
        q.opts.map(function(opt, i) {
          return '<button class="quiz-opt" id="opt-' + i + '" onclick="answerQuiz(' + i + ')">' + opt + '</button>';
        }).join('') +
      '</div>' +
    '</div>';
}

function _startQuizTimer() {
  clearInterval(_quiz.timer);
  _quiz.timeLeft = 30;
  _quiz.timer = setInterval(function() {
    _quiz.timeLeft--;
    var valEl  = document.getElementById('timer-val');
    var dispEl = document.getElementById('timer-display');
    if (valEl)  valEl.textContent = _quiz.timeLeft + 's';
    if (dispEl && _quiz.timeLeft <= 10) dispEl.style.color = '#e74c3c';
    if (_quiz.timeLeft <= 0) { clearInterval(_quiz.timer); if (!_quiz.answered) answerQuiz(-1); }
  }, 1000);
}

function answerQuiz(chosen) {
  if (_quiz.answered) return;
  _quiz.answered = true;
  clearInterval(_quiz.timer);

  var correct   = _quiz.questions[_quiz.current].ans;
  var isCorrect = chosen === correct;
  if (isCorrect) _quiz.score++;

  for (var i = 0; i < 4; i++) {
    var btn = document.getElementById('opt-' + i);
    if (!btn) continue;
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('wrong');
  }

  setTimeout(function() {
    _quiz.current++;
    _quiz.answered = false;
    if (_quiz.current >= _quiz.questions.length) {
      _showQuizResult();
    } else {
      var prog = document.getElementById('quiz-prog');
      if (prog) prog.style.width = (_quiz.current / _quiz.questions.length * 100) + '%';
      _renderQuizQuestion();
      _startQuizTimer();
    }
  }, 1200);
}

function _showQuizResult() {
  var total = _quiz.questions.length;
  var pct   = Math.round((_quiz.score / total) * 100);
  var pass  = pct >= 60;
  var diff  = getDifficultyInfo(_quiz.slug);

  saveQuizScore(_quiz.slug, pct);
  markGameCompleted(_quiz.slug, 'quiz');

  var rewardHTML = '';
  if (pass && canClaimReward(_quiz.slug)) {
    claimProvinceReward(_quiz.slug, diff.keyReward);
    var ud = getUserData();
    showToast('+' + diff.keyReward + ' kunci! Total: ' + ud.keys + ' kunci', 'success');
    rewardHTML =
      '<div style="display:inline-flex;align-items:center;gap:8px;background:rgba(45,106,79,.15);' +
        'border:1px solid #40916C;color:#40916C;padding:10px 20px;border-radius:20px;' +
        'font-weight:700;font-size:13px;margin-bottom:20px">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' +
        '+' + diff.keyReward + ' Kunci Didapat!' +
      '</div><br>';
  }

  var body = document.getElementById('quiz-body');
  if (!body) return;
  body.innerHTML =
    '<div class="quiz-result">' +
      '<div class="result-icon-wrap ' + (pass ? 'result-pass' : 'result-fail') + '">' +
        (pass
          ? '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
          : '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>') +
      '</div>' +
      '<div class="result-score">' + pct + '</div>' +
      '<div class="result-label">Skor Akhir</div>' +
      '<div class="result-verdict ' + (pass ? 'verdict-pass' : 'verdict-fail') + '" style="display:inline-flex;align-items:center;gap:6px">' +
        (pass ? 'Lulus!' : 'Coba Lagi') +
      '</div>' +
      '<p class="result-msg">' + _quiz.score + ' dari ' + total + ' soal benar. ' +
        (pass ? 'Pengetahuanmu tentang ' + _quiz.pName + ' sangat baik!' : 'Pelajari lebih lanjut dan coba lagi!') +
      '</p>' +
      rewardHTML +
      '<div class="result-actions">' +
        '<button class="result-btn result-btn-retry" onclick="renderQuiz(\'' + _quiz.slug + '\')" style="display:inline-flex;align-items:center;gap:6px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Ulang Quiz' +
        '</button>' +
        '<button class="result-btn" onclick="navigate(\'/province/' + _quiz.slug + '\')" style="display:inline-flex;align-items:center;gap:6px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> Detail Provinsi' +
        '</button>' +
        '<button class="result-btn" onclick="navigate(\'/games\')" style="display:inline-flex;align-items:center;gap:6px">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="11" x2="15.01" y2="11"/><line x1="18" y1="13" x2="18.01" y2="13"/></svg> Games Lain' +
        '</button>' +
      '</div>' +
    '</div>';
}

var _pz = {};

function renderPuzzle(slug) {
  document.body.style.overflow = '';
  document.title = 'Puzzle — NusaExplore';

  var province = null;
  for (var i = 0; i < provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug === slug) { province = provinceDetailData[i]; break; }
  }
  var pName = province ? province.name : _slugToName(slug);

  var rawImages = getPuzzleImages(slug);
  var images = rawImages.map(function(p) {
    if (!p) return p;
    if (p.charAt(0) === '/' || p.indexOf('http') === 0) return p;
    return '/' + p;
  });

  _pz = {
    slug: slug, pName: pName, images: images,
    round: 0, moves: 0,
    pieces: [], selected: null,
    GRID: 3,
    hint: false,
  };
  document.title = 'Puzzle ' + pName + ' — NusaExplore';

  setPage(
    navbarHTML('/games') +
    '<div style="min-height:100vh;padding:120px 0 60px;background:var(--bg)">' +
      '<div style="max-width:600px;margin:0 auto;padding:0 20px">' +
        '<div style="display:flex;align-items:flex-start;gap:16px;margin-bottom:28px">' +
          '<button class="quiz-back" onclick="navigate(\'/games\')" style="display:inline-flex;align-items:center;gap:6px;flex-shrink:0;margin-top:2px">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg> Games' +
          '</button>' +
          '<div>' +
            '<div class="quiz-title">Puzzle — ' + pName + '</div>' +
            '<div id="round-info" style="font-size:13px;color:var(--text2);margin-top:2px">Ronde 1 dari ' + images.length + '</div>' +
          '</div>' +
        '</div>' +
        '<div id="puzzle-body"></div>' +
      '</div>' +
    '</div>' +
    footerHTML(),
    function() {
      initNavbar();
      _startPuzzleRound();
    }
  );
}

function _preloadImage(src, callback) {
  var img = new Image();
  img.onload  = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = src;
}

function _startPuzzleRound() {
  if (_pz.round >= _pz.images.length) { _showPuzzleAllDone(); return; }
  _pz.moves    = 0;
  _pz.selected = null;
  _pz.hint     = false;

  var total  = _pz.GRID * _pz.GRID;
  var pieces = [];
  for (var i = 0; i < total; i++) pieces.push(i);

  var tries = 0;
  do {
    for (var j = pieces.length - 1; j > 0; j--) {
      var k = Math.floor(Math.random() * (j + 1));
      var t = pieces[j]; pieces[j] = pieces[k]; pieces[k] = t;
    }
    tries++;
  } while (_puzzleIsSolved(pieces) && tries < 30);

  _pz.pieces = pieces;

  var body = document.getElementById('puzzle-body');
  if (body) {
    body.innerHTML =
      '<div style="text-align:center;padding:80px 20px">' +
        '<div style="display:inline-block;width:44px;height:44px;border:4px solid var(--border2);' +
          'border-top-color:var(--gold);border-radius:50%;animation:pz-spin 0.7s linear infinite"></div>' +
        '<p style="color:var(--text3);margin-top:16px;font-size:13px">Memuat gambar puzzle&hellip;</p>' +
      '</div>' +
      '<style>@keyframes pz-spin{to{transform:rotate(360deg)}}</style>';
  }

  _preloadImage(_pz.images[_pz.round], function() {
    _renderPuzzleBoard();
  });
}

function _puzzleIsSolved(pieces) {
  for (var i = 0; i < pieces.length; i++) { if (pieces[i] !== i) return false; }
  return true;
}

function _renderPuzzleBoard() {
  var ri = document.getElementById('round-info');
  if (ri) ri.textContent = 'Ronde ' + (_pz.round + 1) + ' dari ' + _pz.images.length;

  var GRID     = _pz.GRID;
  var imgSrc   = _pz.images[_pz.round];
  var pieces   = _pz.pieces;

  var correctCount = 0;
  for (var ci = 0; ci < pieces.length; ci++) { if (pieces[ci] === ci) correctCount++; }
  var pct = Math.round(correctCount / pieces.length * 100);

  var hintHTML = _pz.hint
    ? '<div style="margin-bottom:12px;text-align:center">' +
        '<img src="' + imgSrc + '" ' +
          'style="width:100%;max-width:520px;border-radius:10px;border:2px solid var(--gold);display:block;margin:0 auto" ' +
          'onerror="this.style.display=\'none\'" alt="Referensi">' +
        '<p style="font-size:11px;color:var(--text3);margin:5px 0 0">Gambar Referensi</p>' +
      '</div>'
    : '';

  var bgSizePct = (GRID * 100) + '%';

  var piecesHTML = pieces.map(function(correctIdx, pos) {
    var row   = Math.floor(correctIdx / GRID);
    var col   = correctIdx % GRID;
    var isSel = _pz.selected === pos;
    var isOk  = correctIdx === pos;

    var outline = isSel
      ? '3px solid var(--gold)'
      : (isOk ? '2px solid rgba(64,145,108,.8)' : '2px solid transparent');

    var bgXpct = GRID === 1 ? '0%' : (col / (GRID - 1) * 100) + '%';
    var bgYpct = GRID === 1 ? '0%' : (row / (GRID - 1) * 100) + '%';

    return '<div ' +
      'id="pz-piece-' + pos + '" ' +
      'data-pos="' + pos + '" ' +
      'data-row="' + row + '" ' +
      'data-col="' + col + '" ' +
      'onclick="clickPuzzlePiece(' + pos + ')" ' +
      'style="' +
        'cursor:pointer;' +
        'background-image:url(\'' + imgSrc + '\');' +
        'background-color:var(--bg3);' +
        'background-repeat:no-repeat;' +
        'background-size:' + bgSizePct + ' ' + bgSizePct + ';' +
        'background-position:' + bgXpct + ' ' + bgYpct + ';' +
        'width:100%;' +
        'height:100%;' +
        'outline:' + outline + ';' +
        'outline-offset:-2px;' +
        'border-radius:2px;' +
        'transform:' + (isSel ? 'scale(0.94)' : 'scale(1)') + ';' +
        'transition:outline .12s,transform .12s;' +
      '">' +
    '</div>';
  }).join('');

  var body = document.getElementById('puzzle-body');
  if (!body) return;

  body.innerHTML =
    hintHTML +

    '<div id="pz-grid" style="' +
      'display:grid;' +
      'grid-template-columns:repeat(' + GRID + ',1fr);' +
      'grid-template-rows:repeat(' + GRID + ',1fr);' +
      'gap:3px;' +
      'border:2px solid var(--border);' +
      'border-radius:12px;' +
      'overflow:hidden;' +
      'background:var(--bg3);' +
      'width:100%;' +
      'max-width:520px;' +
      'margin:0 auto;' +
      'aspect-ratio:1;' +
    '">' +
      piecesHTML +
    '</div>' +

    '<div style="display:flex;align-items:center;justify-content:space-between;max-width:520px;margin:12px auto 0;gap:10px">' +
      '<button class="puzzle-ctrl-btn" onclick="togglePuzzleHint()" style="display:inline-flex;align-items:center;gap:5px">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> ' +
        (_pz.hint ? 'Sembunyikan' : 'Tampilkan Referensi') +
      '</button>' +
      '<span style="font-size:13px;color:var(--text2);display:inline-flex;align-items:center;gap:4px">' +
        '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> ' +
        _pz.moves + ' langkah' +
      '</span>' +
      '<button class="puzzle-ctrl-btn" onclick="shufflePuzzleBoard()" style="display:inline-flex;align-items:center;gap:5px">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg> Acak Ulang' +
      '</button>' +
    '</div>' +

    '<div style="max-width:520px;margin:10px auto 0">' +
      '<div style="background:var(--bg3);border-radius:8px;height:6px;overflow:hidden">' +
        '<div style="height:100%;background:linear-gradient(90deg,#40916C,var(--gold));width:' + pct + '%;transition:width .4s;border-radius:8px"></div>' +
      '</div>' +
      '<p style="text-align:center;font-size:12px;color:var(--text3);margin:5px 0 0">' + pct + '% kepingan benar</p>' +
    '</div>';

}

function clickPuzzlePiece(pos) {
  if (_pz.selected === null) {
    _pz.selected = pos;
  } else {
    var from = _pz.selected;
    if (from !== pos) {
      var tmp        = _pz.pieces[from];
      _pz.pieces[from] = _pz.pieces[pos];
      _pz.pieces[pos]  = tmp;
      _pz.moves++;
    }
    _pz.selected = null;

    if (_puzzleIsSolved(_pz.pieces)) {
      _renderPuzzleBoard();
      setTimeout(_showRoundComplete, 500);
      return;
    }
  }
  _renderPuzzleBoard();
}

function togglePuzzleHint()   { _pz.hint = !_pz.hint; _renderPuzzleBoard(); }

function shufflePuzzleBoard() {
  var p = _pz.pieces.slice();
  var tries = 0;
  do {
    for (var i = p.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = p[i]; p[i] = p[j]; p[j] = t;
    }
    tries++;
  } while (_puzzleIsSolved(p) && tries < 30);
  _pz.pieces   = p;
  _pz.selected = null;
  _pz.moves    = 0;
  _renderPuzzleBoard();
}

function _showRoundComplete() {
  markGameCompleted(_pz.slug, 'puzzle');
  var isLast = _pz.round >= _pz.images.length - 1;
  var body   = document.getElementById('puzzle-body');
  if (!body) return;
  body.innerHTML =
    '<div style="text-align:center;padding:48px 20px">' +
      '<div class="result-icon-wrap result-pass" style="margin:0 auto 18px;width:80px;height:80px;display:flex;align-items:center;justify-content:center">' +
        '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a2 2 0 0 1-2 2h-2"/><rect x="6" y="18" width="12" height="4"/><path d="M6 9a6 6 0 0 0 12 0"/></svg>' +
      '</div>' +
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:26px;font-weight:800;color:var(--gold);margin-bottom:8px">Ronde ' + (_pz.round + 1) + ' Selesai!</h2>' +
      '<p style="font-size:14px;color:var(--text2);margin-bottom:28px">Diselesaikan dalam <strong style="color:var(--text)">' + _pz.moves + '</strong> langkah.</p>' +
      (isLast
        ? '<button class="btn-gold" onclick="_showPuzzleAllDone()" style="display:inline-flex;align-items:center;gap:8px">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg> Lihat Hasil Akhir' +
          '</button>'
        : '<button class="btn-gold" onclick="nextPuzzleRound()" style="display:inline-flex;align-items:center;gap:8px">' +
            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg> Ronde Berikutnya' +
          '</button>') +
    '</div>';
}

function nextPuzzleRound() { _pz.round++; _startPuzzleRound(); }

function _showPuzzleAllDone() {
  var diff = getDifficultyInfo(_pz.slug);
  markGameCompleted(_pz.slug, 'puzzle');

  var rewardHTML = '';
  if (canClaimReward(_pz.slug)) {
    claimProvinceReward(_pz.slug, diff.keyReward);
    var ud = getUserData();
    showToast('Puzzle selesai! +' + diff.keyReward + ' kunci. Total: ' + ud.keys, 'success');
    rewardHTML =
      '<div style="display:inline-flex;align-items:center;gap:8px;background:rgba(45,106,79,.15);' +
        'border:1px solid #40916C;color:#40916C;padding:10px 20px;border-radius:20px;' +
        'font-weight:700;font-size:13px;margin-bottom:24px">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>' +
        '+' + diff.keyReward + ' Kunci Didapat!' +
      '</div><br>';
  }

  var body = document.getElementById('puzzle-body');
  if (!body) return;
  body.innerHTML =
    '<div style="text-align:center;padding:48px 20px">' +
      '<div style="width:100px;height:100px;border-radius:50%;background:rgba(45,106,79,.15);' +
        'border:2px solid #40916C;display:flex;align-items:center;justify-content:center;margin:0 auto 22px">' +
        '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#40916C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></svg>' +
      '</div>' +
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:28px;font-weight:800;color:var(--gold);margin-bottom:10px">Semua Puzzle Selesai!</h2>' +
      '<p style="font-size:14px;color:var(--text2);max-width:400px;margin:0 auto 20px;line-height:1.7">' +
        'Kamu telah menyelesaikan semua ' + _pz.images.length + ' puzzle <strong style="color:var(--text)">' + _pz.pName + '</strong>. Luar biasa!' +
      '</p>' +
      rewardHTML +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn-gold" onclick="renderPuzzle(\'' + _pz.slug + '\')" style="display:inline-flex;align-items:center;gap:7px">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg> Main Lagi' +
        '</button>' +
        '<button class="btn-outline" onclick="navigate(\'/province/' + _pz.slug + '\')" style="display:inline-flex;align-items:center;gap:7px">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg> Detail Provinsi' +
        '</button>' +
        '<button class="btn-outline" onclick="navigate(\'/games\')" style="display:inline-flex;align-items:center;gap:7px">' +
          '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><line x1="6" y1="12" x2="10" y2="12"/><line x1="8" y1="10" x2="8" y2="14"/><line x1="15" y1="11" x2="15.01" y2="11"/><line x1="18" y1="13" x2="18.01" y2="13"/></svg> Games Lain' +
        '</button>' +
      '</div>' +
    '</div>';
}