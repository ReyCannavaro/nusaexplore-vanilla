function renderGames() {
  document.title = 'Mini Games — NusaExplore';
  var ud = getUserData();

  var provinceListHTML = regions.map(function(r) {
    var diff = getDifficultyInfo(r.id);
    return '<div class="province-item" data-name="' + r.name.toLowerCase() + '" ' +
      'onclick="selectProvince(\'' + r.id + '\')" ' +
      'style="background:var(--bg3);border:1px solid var(--border2);border-radius:10px;padding:12px 14px;cursor:pointer;transition:border-color .2s;display:flex;align-items:center;justify-content:space-between;" ' +
      'onmouseenter="this.style.borderColor=\'var(--gold)\'" onmouseleave="this.style.borderColor=\'var(--border2)\'">' +
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
        '<div style="display:flex;align-items:center;gap:12px;margin-top:16px">' +
          '<div class="map-key-display">🗝️ ' + ud.keys + ' Kunci</div>' +
          '<span style="font-size:12px;color:var(--text3)">·</span>' +
          '<span style="font-size:12px;color:var(--text2)">' + ud.gamesPlayed + ' game dimainkan</span>' +
        '</div>' +
      '</div>' +

      '<div class="games-select">' +

        '<div class="game-select-card" onclick="showProvinceSelector(\'quiz\')">' +
          '<div class="gsc-top">' +
            '<span class="gsc-badge b-quiz">🧠 Quiz</span>' +
            '<div class="gsc-icon" style="background:rgba(45,106,79,.15)">' +
              '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#40916C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>' +
            '</div>' +
          '</div>' +
          '<div class="gsc-body">' +
            '<h2 class="gsc-title">Quiz Budaya</h2>' +
            '<p class="gsc-desc">Jawab 5 pertanyaan tentang budaya, tradisi, dan keunikan provinsi pilihanmu. Timer 30 detik per soal!</p>' +
            '<div class="gsc-pills">' +
              '<span class="gsc-pill">5 Soal Per Sesi</span>' +
              '<span class="gsc-pill">⏱ 30 Detik/Soal</span>' +
              '<span class="gsc-pill">Skor 0–100</span>' +
            '</div>' +
            '<button class="gsc-cta">Pilih Provinsi →</button>' +
          '</div>' +
        '</div>' +

        '<div class="game-select-card" onclick="showProvinceSelector(\'puzzle\')">' +
          '<div class="gsc-top">' +
            '<span class="gsc-badge b-puzzle">🧩 Puzzle</span>' +
            '<div class="gsc-icon" style="background:rgba(201,168,76,.12)">' +
              '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>' +
            '</div>' +
          '</div>' +
          '<div class="gsc-body">' +
            '<h2 class="gsc-title">Puzzle Nusantara</h2>' +
            '<p class="gsc-desc">Susun 9 kepingan gambar budaya Indonesia. Klik dua kepingan untuk menukarnya dan selesaikan puzzle!</p>' +
            '<div class="gsc-pills">' +
              '<span class="gsc-pill">3×3 Grid</span>' +
              '<span class="gsc-pill">Klik &amp; Tukar</span>' +
              '<span class="gsc-pill">3 Gambar/Provinsi</span>' +
            '</div>' +
            '<button class="gsc-cta">Pilih Provinsi →</button>' +
          '</div>' +
        '</div>' +

      '</div>' +

      // Province Selector Modal
      '<div id="province-selector" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(8px);z-index:300;align-items:center;justify-content:center;padding:20px" onclick="closeSelectorOverlay(event)">' +
        '<div style="background:var(--bg2);border:1px solid var(--border);border-radius:20px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;padding:28px" onclick="event.stopPropagation()">' +
          '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">' +
            '<h3 style="font-family:\'Playfair Display\',serif;font-size:20px;font-weight:800;color:var(--text)" id="selector-title">Pilih Provinsi</h3>' +
            '<button onclick="closeProvinceSelector()" style="background:var(--bg3);border:none;color:var(--text);width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center">✕</button>' +
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

var _currentGameType = 'quiz';

function showProvinceSelector(gameType) {
  _currentGameType = gameType;
  var sel   = document.getElementById('province-selector');
  var title = document.getElementById('selector-title');
  if (sel)   sel.style.display = 'flex';
  if (title) title.textContent  = 'Pilih Provinsi — ' + (gameType === 'quiz' ? 'Quiz Budaya' : 'Puzzle Nusantara');
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
  var q = (document.getElementById('province-search').value || '').toLowerCase();
  document.querySelectorAll('.province-item').forEach(function(el) {
    el.style.display = el.dataset.name.indexOf(q) !== -1 ? '' : 'none';
  });
}

function selectProvince(id) {
  closeProvinceSelector();
  navigate('/' + _currentGameType + '/' + id);
}

var _quiz = {};

function renderQuiz(slug) {
  var province = null;
  for (var i = 0; i < provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug === slug) { province = provinceDetailData[i]; break; }
  }
  var pName = province ? province.name : slug.replace(/-/g,' ').replace(/\b\w/g, function(c){return c.toUpperCase();});
  var questions = getQuizForProvince(slug);

  _quiz = { slug:slug, pName:pName, questions:questions, current:0, score:0, answered:false, timer:null, timeLeft:30 };
  document.title = 'Quiz ' + pName + ' — NusaExplore';

  setPage(
    navbarHTML('/games') +
    '<div style="min-height:100vh;padding:80px 0 48px">' +
      '<div style="max-width:700px;margin:0 auto;padding:0 24px">' +
        '<div id="quiz-header">' + buildQuizHeader() + '</div>' +
        '<div id="quiz-body">'   + buildQuizQuestion() + '</div>' +
      '</div>' +
    '</div>' +
    footerHTML()
  );
  initNavbar();
  startQuizTimer();
}

function buildQuizHeader() {
  var pct = (_quiz.current / _quiz.questions.length) * 100;
  return '<div class="quiz-header">' +
    '<button class="quiz-back" onclick="navigate(\'/games\')">← Games</button>' +
    '<div><div class="quiz-title">Quiz — ' + _quiz.pName + '</div></div>' +
  '</div>' +
  '<div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-prog" style="width:' + pct + '%"></div></div>';
}

function buildQuizQuestion() {
  var q = _quiz.questions[_quiz.current];
  if (!q) return '';
  return '<div class="quiz-card">' +
    '<div class="quiz-num">Soal ' + (_quiz.current+1) + ' / ' + _quiz.questions.length + ' &nbsp;·&nbsp; <span id="timer-display" style="color:var(--gold)">⏱ ' + _quiz.timeLeft + 's</span></div>' +
    '<div class="quiz-question">' + q.q + '</div>' +
    '<div class="quiz-options">' +
      q.opts.map(function(opt,i) {
        return '<button class="quiz-opt" id="opt-' + i + '" onclick="answerQuiz(' + i + ')">' + opt + '</button>';
      }).join('') +
    '</div>' +
  '</div>';
}

function startQuizTimer() {
  clearInterval(_quiz.timer);
  _quiz.timeLeft = 30;
  _quiz.timer = setInterval(function() {
    _quiz.timeLeft--;
    var d = document.getElementById('timer-display');
    if (d) {
      d.textContent = '⏱ ' + _quiz.timeLeft + 's';
      if (_quiz.timeLeft <= 10) d.style.color = '#e74c3c';
    }
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
      showQuizResult();
    } else {
      var body = document.getElementById('quiz-body');
      var prog = document.getElementById('quiz-prog');
      if (body) body.innerHTML = buildQuizQuestion();
      if (prog) prog.style.width = (_quiz.current / _quiz.questions.length * 100) + '%';
      startQuizTimer();
    }
  }, 1200);
}

function showQuizResult() {
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
    showToast('🗝️ +' + diff.keyReward + ' kunci! Total: ' + ud.keys, '🎉');
    rewardHTML = '<div style="display:inline-flex;align-items:center;gap:8px;background:rgba(45,106,79,.15);border:1px solid #40916C;color:#40916C;padding:10px 20px;border-radius:20px;font-weight:700;font-size:13px;margin-bottom:20px">🗝️ +' + diff.keyReward + ' Kunci Didapat!</div><br>';
  }

  var body = document.getElementById('quiz-body');
  if (!body) return;
  body.innerHTML =
    '<div class="quiz-result">' +
      '<div class="result-icon-wrap ' + (pass ? 'result-pass' : 'result-fail') + '">' + (pass ? '✅' : '❌') + '</div>' +
      '<div class="result-score">' + pct + '</div>' +
      '<div class="result-label">Skor Akhir</div>' +
      '<div class="result-verdict ' + (pass ? 'verdict-pass' : 'verdict-fail') + '">' + (pass ? '🎉 Lulus!' : '😔 Coba Lagi') + '</div>' +
      '<p class="result-msg">' + _quiz.score + ' dari ' + total + ' soal benar. ' + (pass ? 'Pengetahuanmu tentang ' + _quiz.pName + ' sangat baik!' : 'Pelajari lebih lanjut dan coba lagi!') + '</p>' +
      rewardHTML +
      '<div class="result-actions">' +
        '<button class="result-btn result-btn-retry" onclick="renderQuiz(\'' + _quiz.slug + '\')">🔄 Ulang Quiz</button>' +
        '<button class="result-btn" onclick="navigate(\'/province/' + _quiz.slug + '\')">📖 Detail Provinsi</button>' +
        '<button class="result-btn" onclick="navigate(\'/games\')">🎮 Games Lain</button>' +
      '</div>' +
    '</div>';
}

var _pz = {};

function renderPuzzle(slug) {
  var province = null;
  for (var i = 0; i < provinceDetailData.length; i++) {
    if (provinceDetailData[i].slug === slug) { province = provinceDetailData[i]; break; }
  }
  var pName  = province ? province.name : slug.replace(/-/g,' ').replace(/\b\w/g,function(c){return c.toUpperCase();});
  var images = getPuzzleImages(slug);

  _pz = { slug:slug, pName:pName, images:images, round:0, moves:0, pieces:[], selected:null, GRID:3, hint:false };
  document.title = 'Puzzle ' + pName + ' — NusaExplore';

  setPage(
    navbarHTML('/games') +
    '<div style="min-height:100vh;padding:80px 0 48px">' +
      '<div style="max-width:640px;margin:0 auto;padding:0 24px">' +
        '<div class="puzzle-header">' +
          '<button class="quiz-back" onclick="navigate(\'/games\')">← Games</button>' +
          '<div>' +
            '<div class="quiz-title">Puzzle — ' + pName + '</div>' +
            '<div class="puzzle-round-info" id="round-info">Ronde 1 dari ' + images.length + '</div>' +
          '</div>' +
        '</div>' +
        '<div id="puzzle-body"></div>' +
      '</div>' +
    '</div>' +
    footerHTML()
  );
  initNavbar();
  startPuzzleRound();
}

function startPuzzleRound() {
  if (_pz.round >= _pz.images.length) { showPuzzleAllDone(); return; }
  _pz.moves = 0; _pz.selected = null; _pz.hint = false;

  var total = _pz.GRID * _pz.GRID;
  var pieces = [];
  for (var i = 0; i < total; i++) pieces.push(i);

  var tries = 0;
  do {
    for (var i = pieces.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = pieces[i]; pieces[i] = pieces[j]; pieces[j] = tmp;
    }
    tries++;
  } while (puzzleIsSolved(pieces) && tries < 20);

  _pz.pieces = pieces;
  renderPuzzleBoard();
}

function puzzleIsSolved(pieces) {
  for (var i = 0; i < pieces.length; i++) { if (pieces[i] !== i) return false; }
  return true;
}

function renderPuzzleBoard() {
  var ri = document.getElementById('round-info');
  if (ri) ri.textContent = 'Ronde ' + (_pz.round+1) + ' dari ' + _pz.images.length;

  var imgSrc  = _pz.images[_pz.round];
  var GRID    = _pz.GRID;
  var pieces  = _pz.pieces;
  var correct = 0;
  for (var i = 0; i < pieces.length; i++) { if (pieces[i] === i) correct++; }
  var pct = Math.round(correct / pieces.length * 100);

  var hintHTML = _pz.hint
    ? '<img src="' + imgSrc + '" style="width:100%;max-width:480px;border-radius:12px;margin:0 auto 16px;display:block;border:2px solid var(--gold)" onerror="this.style.display=\'none\'" alt="Hint">'
    : '';

  var piecesHTML = pieces.map(function(correctIdx, pos) {
    var row = Math.floor(correctIdx / GRID);
    var col = correctIdx % GRID;
    var sel = _pz.selected === pos;
    var ok  = correctIdx === pos;
    return '<div onclick="clickPiece(' + pos + ')" style="' +
      'aspect-ratio:1;cursor:pointer;' +
      'background-image:url(\'' + imgSrc + '\');' +
      'background-size:' + (GRID * 100) + '%;' +
      'background-position:' + ((GRID > 1 ? col/(GRID-1) : 0)*100) + '% ' + ((GRID > 1 ? row/(GRID-1) : 0)*100) + '%;' +
      'background-color:var(--bg4);' +
      'outline:' + (sel ? '3px solid var(--gold)' : (ok ? '2px solid rgba(64,145,108,.6)' : 'none')) + ';' +
      'transition:outline .15s;' +
    '"></div>';
  }).join('');

  var body = document.getElementById('puzzle-body');
  if (!body) return;
  body.innerHTML =
    hintHTML +
    '<div style="display:grid;grid-template-columns:repeat(' + GRID + ',1fr);gap:4px;max-width:480px;margin:0 auto;border:2px solid var(--border);border-radius:12px;overflow:hidden;background:var(--bg3)">' +
      piecesHTML +
    '</div>' +
    '<div class="puzzle-controls">' +
      '<button class="puzzle-ctrl-btn" onclick="togglePuzzleHint()">' + (_pz.hint ? '🙈 Sembunyikan' : '💡 Hint') + '</button>' +
      '<span class="puzzle-moves">🔄 ' + _pz.moves + ' langkah</span>' +
      '<button class="puzzle-ctrl-btn" onclick="shufflePuzzleBoard()">🔀 Acak Ulang</button>' +
    '</div>' +
    '<div style="margin:10px auto 0;background:var(--bg3);border-radius:8px;height:6px;max-width:480px;overflow:hidden">' +
      '<div style="height:100%;background:linear-gradient(90deg,var(--green),var(--gold));width:' + pct + '%;transition:width .4s;border-radius:8px"></div>' +
    '</div>' +
    '<p style="text-align:center;font-size:12px;color:var(--text3);margin-top:6px">' + pct + '% kepingan benar</p>';
}

function clickPiece(pos) {
  if (_pz.selected === null) {
    _pz.selected = pos;
  } else {
    var from = _pz.selected;
    var to   = pos;
    if (from !== to) {
      var tmp = _pz.pieces[from]; _pz.pieces[from] = _pz.pieces[to]; _pz.pieces[to] = tmp;
      _pz.moves++;
    }
    _pz.selected = null;
    if (puzzleIsSolved(_pz.pieces)) {
      renderPuzzleBoard();
      setTimeout(showRoundComplete, 400);
      return;
    }
  }
  renderPuzzleBoard();
}

function togglePuzzleHint() { _pz.hint = !_pz.hint; renderPuzzleBoard(); }

function shufflePuzzleBoard() {
  var total = _pz.GRID * _pz.GRID;
  var p = [];
  for (var i = 0; i < total; i++) p.push(i);
  var tries = 0;
  do {
    for (var i = p.length-1; i > 0; i--) { var j=Math.floor(Math.random()*(i+1)); var t=p[i]; p[i]=p[j]; p[j]=t; }
    tries++;
  } while (puzzleIsSolved(p) && tries < 20);
  _pz.pieces = p; _pz.selected = null; _pz.moves = 0;
  renderPuzzleBoard();
}

function showRoundComplete() {
  markGameCompleted(_pz.slug, 'puzzle');
  var isLast = _pz.round >= _pz.images.length - 1;
  var body = document.getElementById('puzzle-body');
  if (!body) return;
  body.innerHTML =
    '<div class="puzzle-result">' +
      '<div style="font-size:64px;margin-bottom:12px">🎉</div>' +
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:26px;font-weight:800;color:var(--gold);margin-bottom:8px">Ronde ' + (_pz.round+1) + ' Selesai!</h2>' +
      '<p style="font-size:14px;color:var(--text2);margin-bottom:24px">Diselesaikan dalam <strong>' + _pz.moves + '</strong> langkah.</p>' +
      (isLast
        ? '<button class="btn-gold" onclick="showPuzzleAllDone()">🏆 Lihat Hasil Akhir</button>'
        : '<button class="btn-gold" onclick="nextPuzzleRound()">➡️ Ronde Berikutnya</button>') +
    '</div>';
}

function nextPuzzleRound() { _pz.round++; startPuzzleRound(); }

function showPuzzleAllDone() {
  var diff = getDifficultyInfo(_pz.slug);
  markGameCompleted(_pz.slug, 'puzzle');
  var rewardHTML = '';
  if (canClaimReward(_pz.slug)) {
    claimProvinceReward(_pz.slug, diff.keyReward);
    var ud = getUserData();
    showToast('🗝️ Puzzle selesai! +' + diff.keyReward + ' kunci', '🎉');
    rewardHTML = '<div style="display:inline-flex;align-items:center;gap:8px;background:rgba(45,106,79,.15);border:1px solid #40916C;color:#40916C;padding:10px 20px;border-radius:20px;font-weight:700;font-size:13px;margin-bottom:20px">🗝️ +' + diff.keyReward + ' Kunci Didapat!</div><br>';
  }
  var body = document.getElementById('puzzle-body');
  if (!body) return;
  body.innerHTML =
    '<div class="puzzle-all-done">' +
      '<div style="font-size:80px;margin-bottom:16px">🏆</div>' +
      '<h2>Semua Puzzle Selesai!</h2>' +
      '<p style="font-size:14px;color:var(--text2);margin-bottom:20px">Kamu telah menyelesaikan semua puzzle <strong>' + _pz.pName + '</strong>. Luar biasa!</p>' +
      rewardHTML +
      '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
        '<button class="btn-gold" onclick="renderPuzzle(\'' + _pz.slug + '\')">🔄 Main Lagi</button>' +
        '<button class="btn-outline" onclick="navigate(\'/province/' + _pz.slug + '\')">📖 Detail Provinsi</button>' +
        '<button class="btn-outline" onclick="navigate(\'/games\')">🎮 Games Lain</button>' +
      '</div>' +
    '</div>';
}