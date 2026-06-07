var SVG = {
  quiz:   '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#40916C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  puzzle: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>',
  key:    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>',
  back:   '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  check:  '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#40916C" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x:      '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#B5382A" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  trophy: '<svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="8 21 12 21 16 21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M7 4H4a2 2 0 0 0-2 2v2c0 2.5 1.5 5 5 6"/><path d="M17 4h3a2 2 0 0 1 2 2v2c0 2.5-1.5 5-5 6"/><path d="M7 4h10v9a5 5 0 0 1-5 5v0a5 5 0 0 1-5-5V4z"/></svg>',
  shuffle:'<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>',
  hint:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>',
  hide:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>',
  retry:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>',
  book:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>',
  games:  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></svg>',
  star:   '<svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
};

function renderGames() {
  document.title = 'Mini Games — NusaExplore';
  var ud = getUserData();

  var provinceListHTML = regions.map(function(r) {
    var diff = getDifficultyInfo(r.id);
    return '<div class="province-item" data-name="' + r.name.toLowerCase() + '" onclick="selectProvince(\'' + r.id + '\')" ' +
      'style="background:var(--bg3);border:1px solid var(--border2);border-radius:10px;padding:12px 14px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:space-between" ' +
      'onmouseenter="this.style.borderColor=\'var(--gold)\';this.style.background=\'var(--bg4)\'" ' +
      'onmouseleave="this.style.borderColor=\'var(--border2)\';this.style.background=\'var(--bg3)\'">' +
      '<span style="font-size:13px;font-weight:600;color:var(--text)">' + r.name + '</span>' +
      '<span style="font-size:10px;font-weight:700;padding:2px 9px;border-radius:20px;background:' + diff.color + '22;color:' + diff.color + ';border:1px solid ' + diff.color + '44">' + diff.label + '</span>' +
    '</div>';
  }).join('');

  setPage(
    navbarHTML('/games') +
    '<div class="games-page">' +

      '<div class="games-header">' +
        '<div class="section-label">Mini Games Edukatif</div>' +
        '<h1 class="games-title">Main &amp; <em>Belajar</em></h1>' +
        '<p class="games-sub">Pilih game, pilih provinsi, dan mulai petualangan budayamu!</p>' +
        '<div style="display:flex;align-items:center;gap:12px;margin-top:16px">' +
          '<div class="map-key-display">' +
            SVG.key + ' ' + ud.keys + ' Kunci' +
          '</div>' +
          '<span style="font-size:12px;color:var(--border)">|</span>' +
          '<span style="font-size:12px;color:var(--text2)">' + ud.gamesPlayed + ' game dimainkan</span>' +
        '</div>' +
      '</div>' +

      '<div class="games-select">' +

        '<div class="game-select-card" onclick="showProvinceSelector(\'quiz\')">' +
          '<div class="gsc-top">' +
            '<span class="gsc-badge b-quiz">Quiz</span>' +
            '<div class="gsc-icon" style="background:rgba(45,106,79,.15)">' + SVG.quiz + '</div>' +
          '</div>' +
          '<div class="gsc-body">' +
            '<h2 class="gsc-title">Quiz Budaya</h2>' +
            '<p class="gsc-desc">Jawab 5 pertanyaan tentang budaya, tradisi, dan keunikan provinsi pilihanmu. Skor minimal 60 untuk klaim reward kunci!</p>' +
            '<div class="gsc-pills">' +
              '<span class="gsc-pill">5 Soal Per Sesi</span>' +
              '<span class="gsc-pill">30 Detik / Soal</span>' +
              '<span class="gsc-pill">Skor 0 &ndash; 100</span>' +
            '</div>' +
            '<button class="gsc-cta">Pilih Provinsi &#8594;</button>' +
          '</div>' +
        '</div>' +

        '<div class="game-select-card" onclick="showProvinceSelector(\'puzzle\')">' +
          '<div class="gsc-top">' +
            '<span class="gsc-badge b-puzzle">Puzzle</span>' +
            '<div class="gsc-icon" style="background:rgba(201,168,76,.12)">' + SVG.puzzle + '</div>' +
          '</div>' +
          '<div class="gsc-body">' +
            '<h2 class="gsc-title">Puzzle Nusantara</h2>' +
            '<p class="gsc-desc">Susun 9 kepingan gambar budaya Indonesia. Klik dua kepingan untuk menukar posisi dan selesaikan semua ronde!</p>' +
            '<div class="gsc-pills">' +
              '<span class="gsc-pill">Grid 3 &times; 3</span>' +
              '<span class="gsc-pill">Klik &amp; Tukar</span>' +
              '<span class="gsc-pill">3 Gambar / Provinsi</span>' +
            '</div>' +
            '<button class="gsc-cta">Pilih Provinsi &#8594;</button>' +
          '</div>' +
        '</div>' +

      '</div>' +

      '<div id="province-selector" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:300;align-items:center;justify-content:center;padding:20px" onclick="closeSelectorOverlay(event)">' +
        '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:20px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;padding:28px;box-shadow:var(--shadow)" onclick="event.stopPropagation()">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
            '<h3 id="selector-title" style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:800;color:var(--text)">Pilih Provinsi</h3>' +
            '<button onclick="closeProvinceSelector()" style="background:var(--bg3);border:1px solid var(--border2);color:var(--text);width:32px;height:32px;border-radius:50%;cursor:pointer;display:flex;align-items:center;justify-content:center">' +
              '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>' +
            '</button>' +
          '</div>' +
          '<input id="province-search" type="text" placeholder="Cari provinsi..." oninput="filterProvinces()" ' +
            'style="width:100%;padding:10px 16px;border-radius:8px;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-family:Plus Jakarta Sans,sans-serif;font-size:14px;margin-bottom:14px;outline:none;box-sizing:border-box">' +
          '<div id="province-list" style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px">' +
            provinceListHTML +
          '</div>' +
        '</div>' +
      '</div>' +

    '</div>' +
    footerHTML()
  );

  initNavbar();
}

var _gameType = 'quiz';
function showProvinceSelector(type) {
  _gameType = type;
  var sel = document.getElementById('province-selector');
  var ttl = document.getElementById('selector-title');
  if (sel) sel.style.display = 'flex';
  if (ttl) ttl.textContent = 'Pilih Provinsi — ' + (type === 'quiz' ? 'Quiz Budaya' : 'Puzzle Nusantara');
  document.body.style.overflow = 'hidden';
  var inp = document.getElementById('province-search');
  if (inp) { inp.value = ''; filterProvinces(); inp.focus(); }
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
  var q = (document.getElementById('province-search').value || '').toLowerCase();
  document.querySelectorAll('.province-item').forEach(function(el) {
    el.style.display = (el.dataset.name.indexOf(q) !== -1) ? '' : 'none';
  });
}
function selectProvince(id) {
  closeProvinceSelector();
  navigate('/' + _gameType + '/' + id);
}

var _Q = {};

function renderQuiz(slug) {
  var province = null;
  for (var i = 0; i < provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug === slug) { province = provinceDetailData[i]; break; }
  }
  var pName = province ? province.name : slug.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});

  _Q = { slug:slug, pName:pName, questions: getQuizForProvince(slug), current:0, score:0, answered:false, timer:null, timeLeft:30 };
  document.title = 'Quiz ' + pName + ' — NusaExplore';

  setPage(
    navbarHTML('/games') +
    '<div style="min-height:100vh;padding:80px 0 48px;background:var(--bg)">' +
      '<div style="max-width:700px;margin:0 auto;padding:0 24px">' +
        '<div id="qz-header"></div>' +
        '<div id="qz-body"></div>' +
      '</div>' +
    '</div>' +
    footerHTML()
  );
  initNavbar();
  _renderQuizHeader();
  _renderQuizQuestion();
  _startTimer();
}

function _renderQuizHeader() {
  var pct = (_Q.current / _Q.questions.length) * 100;
  var el = document.getElementById('qz-header');
  if (!el) return;
  el.innerHTML =
    '<div class="quiz-header">' +
      '<button class="quiz-back" onclick="navigate(\'/games\')">' + SVG.back + ' Games</button>' +
      '<div>' +
        '<div class="quiz-title">Quiz &mdash; ' + _Q.pName + '</div>' +
      '</div>' +
    '</div>' +
    '<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="qz-prog" style="width:' + pct + '%"></div></div>';
}

function _renderQuizQuestion() {
  var q = _Q.questions[_Q.current];
  if (!q) return;
  var el = document.getElementById('qz-body');
  if (!el) return;
  el.innerHTML =
    '<div class="quiz-card">' +
      '<div class="quiz-num">' +
        'Soal ' + (_Q.current + 1) + ' / ' + _Q.questions.length +
        ' &nbsp;&middot;&nbsp; ' +
        '<span id="qz-timer" style="color:var(--gold);font-weight:700">&#9201; ' + _Q.timeLeft + 's</span>' +
      '</div>' +
      '<div class="quiz-question">' + q.q + '</div>' +
      '<div class="quiz-options">' +
        q.opts.map(function(opt, i) {
          return '<button class="quiz-opt" id="qzopt-' + i + '" onclick="answerQuiz(' + i + ')">' + opt + '</button>';
        }).join('') +
      '</div>' +
    '</div>';
}

function _startTimer() {
  clearInterval(_Q.timer);
  _Q.timeLeft = 30;
  _Q.timer = setInterval(function() {
    _Q.timeLeft--;
    var d = document.getElementById('qz-timer');
    if (d) {
      d.innerHTML = '&#9201; ' + _Q.timeLeft + 's';
      d.style.color = _Q.timeLeft <= 10 ? '#B5382A' : 'var(--gold)';
    }
    if (_Q.timeLeft <= 0) { clearInterval(_Q.timer); if (!_Q.answered) answerQuiz(-1); }
  }, 1000);
}

function answerQuiz(chosen) {
  if (_Q.answered) return;
  _Q.answered = true;
  clearInterval(_Q.timer);

  var correct = _Q.questions[_Q.current].ans;
  if (chosen === correct) _Q.score++;

  for (var i = 0; i < 4; i++) {
    var btn = document.getElementById('qzopt-' + i);
    if (!btn) continue;
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('wrong');
  }

  setTimeout(function() {
    _Q.current++;
    _Q.answered = false;
    if (_Q.current >= _Q.questions.length) {
      _showQuizResult();
    } else {
      var prog = document.getElementById('qz-prog');
      if (prog) prog.style.width = (_Q.current / _Q.questions.length * 100) + '%';
      _renderQuizQuestion();
      _startTimer();
    }
  }, 1100);
}

function _showQuizResult() {
  var total = _Q.questions.length;
  var pct   = Math.round(_Q.score / total * 100);
  var pass  = pct >= 60;
  var diff  = getDifficultyInfo(_Q.slug);

  saveQuizScore(_Q.slug, pct);
  markGameCompleted(_Q.slug, 'quiz');

  var rewardHTML = '';
  if (pass && canClaimReward(_Q.slug)) {
    claimProvinceReward(_Q.slug, diff.keyReward);
    var ud = getUserData();
    showToast('+' + diff.keyReward + ' kunci didapat! Total: ' + ud.keys);
    rewardHTML =
      '<div style="display:inline-flex;align-items:center;gap:8px;background:rgba(45,106,79,.15);border:1px solid #40916C;color:#40916C;padding:10px 20px;border-radius:20px;font-weight:700;font-size:13px;margin-bottom:20px">' +
        SVG.key + ' +' + diff.keyReward + ' Kunci Didapat!' +
      '</div><br>';
  }

  var el = document.getElementById('qz-body');
  if (!el) return;
  el.innerHTML =
    '<div class="quiz-result">' +
      '<div class="result-icon-wrap ' + (pass ? 'result-pass' : 'result-fail') + '">' + (pass ? SVG.check : SVG.x) + '</div>' +
      '<div class="result-score">' + pct + '</div>' +
      '<div class="result-label">Skor Akhir</div>' +
      '<div class="result-verdict ' + (pass ? 'verdict-pass' : 'verdict-fail') + '">' + (pass ? 'Lulus!' : 'Coba Lagi') + '</div>' +
      '<p class="result-msg">' + _Q.score + ' dari ' + total + ' soal benar. ' + (pass ? 'Pengetahuanmu tentang ' + _Q.pName + ' sangat baik!' : 'Pelajari lebih lanjut tentang ' + _Q.pName + ' dan coba lagi!') + '</p>' +
      rewardHTML +
      '<div class="result-actions">' +
        '<button class="result-btn result-btn-retry" onclick="renderQuiz(\'' + _Q.slug + '\')">' + SVG.retry + ' Ulang Quiz</button>' +
        '<button class="result-btn" onclick="navigate(\'/province/' + _Q.slug + '\')">' + SVG.book + ' Detail Provinsi</button>' +
        '<button class="result-btn" onclick="navigate(\'/games\')">' + SVG.games + ' Games Lain</button>' +
      '</div>' +
    '</div>';
}

var _PZ = {};

function renderPuzzle(slug) {
  var province = null;
  for (var i = 0; i < provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug === slug) { province = provinceDetailData[i]; break; }
  }
  var pName = province ? province.name : slug.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});

  _PZ = { slug:slug, pName:pName, images:getPuzzleImages(slug), round:0, moves:0, pieces:[], selected:null, GRID:3, hint:false };
  document.title = 'Puzzle ' + pName + ' — NusaExplore';

  setPage(
    navbarHTML('/games') +
    '<div style="min-height:100vh;padding:80px 0 48px;background:var(--bg)">' +
      '<div style="max-width:640px;margin:0 auto;padding:0 24px">' +
        '<div class="puzzle-header">' +
          '<button class="quiz-back" onclick="navigate(\'/games\')">' + SVG.back + ' Games</button>' +
          '<div>' +
            '<div class="quiz-title">Puzzle &mdash; ' + pName + '</div>' +
            '<div class="puzzle-round-info" id="pz-round">Ronde 1 dari ' + _PZ.images.length + '</div>' +
          '</div>' +
        '</div>' +
        '<div id="pz-body"></div>' +
      '</div>' +
    '</div>' +
    footerHTML()
  );
  initNavbar();
  _startPuzzleRound();
}

function _startPuzzleRound() {
  if (_PZ.round >= _PZ.images.length) { _puzzleAllDone(); return; }
  _PZ.moves = 0; _PZ.selected = null; _PZ.hint = false;
  var n = _PZ.GRID * _PZ.GRID;
  var p = []; for (var i = 0; i < n; i++) p.push(i);
  var tries = 0;
  do {
    for (var i = p.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = p[i]; p[i] = p[j]; p[j] = t; }
  } while (_pzSolved(p) && ++tries < 30);
  _PZ.pieces = p;
  _renderPuzzle();
}

function _pzSolved(p) { for (var i = 0; i < p.length; i++) { if (p[i] !== i) return false; } return true; }

function _renderPuzzle() {
  var ri = document.getElementById('pz-round');
  if (ri) ri.textContent = 'Ronde ' + (_PZ.round + 1) + ' dari ' + _PZ.images.length;

  var img  = _PZ.images[_PZ.round];
  var G    = _PZ.GRID;
  var p    = _PZ.pieces;
  var ok   = 0; for (var i = 0; i < p.length; i++) { if (p[i] === i) ok++; }
  var pct  = Math.round(ok / p.length * 100);

  var hintHTML = _PZ.hint
    ? '<img src="' + img + '" style="width:100%;max-width:480px;border-radius:12px;margin:0 auto 16px;display:block;border:2px solid var(--gold);object-fit:cover;max-height:280px" onerror="this.style.display=\'none\'" alt="Hint">'
    : '';

  var pieces = p.map(function(correctIdx, pos) {
    var row = Math.floor(correctIdx / G);
    var col = correctIdx % G;
    var sel = _PZ.selected === pos;
    var right = correctIdx === pos;
    var bpX = G > 1 ? (col / (G - 1)) * 100 : 0;
    var bpY = G > 1 ? (row / (G - 1)) * 100 : 0;
    return '<div onclick="clickPiece(' + pos + ')" style="' +
      'aspect-ratio:1;cursor:pointer;' +
      'background-image:url(\'' + img + '\');' +
      'background-size:' + (G * 100) + '%;' +
      'background-position:' + bpX + '% ' + bpY + '%;' +
      'background-color:var(--bg4);' +
      'outline:' + (sel ? '3px solid var(--gold)' : (right ? '2px solid rgba(64,145,108,.7)' : 'none')) + ';' +
      'outline-offset:-2px;transition:outline .12s;' +
    '"></div>';
  }).join('');

  var body = document.getElementById('pz-body');
  if (!body) return;
  body.innerHTML =
    hintHTML +
    '<div style="display:grid;grid-template-columns:repeat(' + G + ',1fr);gap:3px;max-width:480px;margin:0 auto;border:2px solid var(--border);border-radius:14px;overflow:hidden;background:var(--bg3)">' +
      pieces +
    '</div>' +
    '<div class="puzzle-controls">' +
      '<button class="puzzle-ctrl-btn" onclick="toggleHint()">' +
        (_PZ.hint ? SVG.hide + ' Sembunyikan' : SVG.hint + ' Tampilkan Hint') +
      '</button>' +
      '<span class="puzzle-moves">' + _PZ.moves + ' langkah</span>' +
      '<button class="puzzle-ctrl-btn" onclick="shufflePuzzle()">' + SVG.shuffle + ' Acak Ulang</button>' +
    '</div>' +
    '<div style="margin:12px auto 0;background:var(--bg3);border-radius:8px;height:6px;max-width:480px;overflow:hidden">' +
      '<div style="height:100%;background:linear-gradient(90deg,var(--green),var(--gold));width:' + pct + '%;transition:width .4s;border-radius:8px"></div>' +
    '</div>' +
    '<p style="text-align:center;font-size:12px;color:var(--text3);margin-top:6px">' + pct + '% kepingan pada posisi benar</p>';
}

function clickPiece(pos) {
  if (_PZ.selected === null) {
    _PZ.selected = pos;
  } else {
    var from = _PZ.selected;
    if (from !== pos) {
      var t = _PZ.pieces[from]; _PZ.pieces[from] = _PZ.pieces[pos]; _PZ.pieces[pos] = t;
      _PZ.moves++;
    }
    _PZ.selected = null;
    if (_pzSolved(_PZ.pieces)) {
      _renderPuzzle();
      setTimeout(_roundDone, 350);
      return;
    }
  }
  _renderPuzzle();
}

function toggleHint()    { _PZ.hint = !_PZ.hint; _renderPuzzle(); }
function shufflePuzzle() {
  var n = _PZ.GRID * _PZ.GRID; var p = []; for (var i = 0; i < n; i++) p.push(i);
  var tries = 0;
  do { for (var i = p.length-1; i > 0; i--) { var j=Math.floor(Math.random()*(i+1)); var t=p[i]; p[i]=p[j]; p[j]=t; } } while (_pzSolved(p) && ++tries < 30);
  _PZ.pieces = p; _PZ.selected = null; _PZ.moves = 0; _renderPuzzle();
}

function _roundDone() {
  markGameCompleted(_PZ.slug, 'puzzle');
  var isLast = _PZ.round >= _PZ.images.length - 1;
  var body = document.getElementById('pz-body');
  if (!body) return;
  body.innerHTML =
    '<div class="puzzle-result">' +
      '<div style="display:flex;justify-content:center;margin-bottom:16px">' + SVG.trophy + '</div>' +
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:26px;font-weight:800;color:var(--gold);margin-bottom:8px;text-align:center">Ronde ' + (_PZ.round + 1) + ' Selesai!</h2>' +
      '<p style="font-size:14px;color:var(--text2);margin-bottom:24px;text-align:center">Diselesaikan dalam <strong>' + _PZ.moves + '</strong> langkah.</p>' +
      '<div style="display:flex;justify-content:center">' +
        (isLast
          ? '<button class="btn-gold" onclick="_puzzleAllDone()">' + SVG.trophy + ' Lihat Hasil Akhir</button>'
          : '<button class="btn-gold" onclick="_nextRound()">Ronde Berikutnya &#8594;</button>') +
      '</div>' +
    '</div>';
}

function _nextRound()   { _PZ.round++; _startPuzzleRound(); }

function _puzzleAllDone() {
  var diff = getDifficultyInfo(_PZ.slug);
  markGameCompleted(_PZ.slug, 'puzzle');
  var rewardHTML = '';
  if (canClaimReward(_PZ.slug)) {
    claimProvinceReward(_PZ.slug, diff.keyReward);
    var ud = getUserData();
    showToast('+' + diff.keyReward + ' kunci! Total: ' + ud.keys);
    rewardHTML =
      '<div style="display:inline-flex;align-items:center;gap:8px;background:rgba(45,106,79,.15);border:1px solid #40916C;color:#40916C;padding:10px 20px;border-radius:20px;font-weight:700;font-size:13px;margin-bottom:20px">' +
        SVG.key + ' +' + diff.keyReward + ' Kunci Didapat!' +
      '</div><br>';
  }
  var body = document.getElementById('pz-body');
  if (!body) return;
  body.innerHTML =
    '<div class="puzzle-all-done">' +
      '<div style="display:flex;justify-content:center;margin-bottom:16px">' + SVG.trophy + '</div>' +
      '<h2>Semua Puzzle Selesai!</h2>' +
      '<p style="font-size:14px;color:var(--text2);margin-bottom:20px">Luar biasa! Kamu telah menyelesaikan semua puzzle <strong>' + _PZ.pName + '</strong>.</p>' +
      rewardHTML +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn-gold" onclick="renderPuzzle(\'' + _PZ.slug + '\')">' + SVG.retry + ' Main Lagi</button>' +
        '<button class="btn-outline" onclick="navigate(\'/province/' + _PZ.slug + '\')">' + SVG.book + ' Detail Provinsi</button>' +
        '<button class="btn-outline" onclick="navigate(\'/games\')">' + SVG.games + ' Games Lain</button>' +
      '</div>' +
    '</div>';
}