// ============================================================
// games.js — Games Hub + Quiz + Puzzle
// ============================================================

// ── GAMES HUB ────────────────────────────────────────────────
function renderGames() {
  document.title = 'Mini Games — NusaExplore';
  const ud = getUserData();

  setPage(`
    ${navbarHTML('/games')}
    <div class="games-page">
      <div class="games-header">
        <div class="section-label">Mini Games Edukatif</div>
        <h1 class="games-title">Main &amp; <em>Belajar</em></h1>
        <p class="games-sub">Pilih game, pilih provinsi, dan mulai petualangan budayamu!</p>
        <div style="display:flex;align-items:center;gap:12px;margin-top:16px">
          <div class="map-key-display">🗝️ ${ud.keys} Kunci</div>
          <span style="font-size:12px;color:var(--text3)">·</span>
          <span style="font-size:12px;color:var(--text2)">${ud.gamesPlayed} game dimainkan</span>
        </div>
      </div>

      <div class="games-select">

        <!-- QUIZ CARD -->
        <div class="game-select-card" onclick="showProvinceSelector('quiz')">
          <div class="gsc-top">
            <span class="gsc-badge b-quiz">🧠 Quiz</span>
            <div class="gsc-icon" style="background:rgba(45,106,79,.15)">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#40916C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                <line x1="12" y1="17" x2="12.01" y2="17"/>
              </svg>
            </div>
          </div>
          <div class="gsc-body">
            <h2 class="gsc-title">Quiz Budaya</h2>
            <p class="gsc-desc">Jawab 5 pertanyaan tentang budaya, tradisi, dan keunikan provinsi pilihanmu. Timer 30 detik per soal!</p>
            <div class="gsc-pills">
              <span class="gsc-pill">5 Soal Per Sesi</span>
              <span class="gsc-pill">⏱ 30 Detik/Soal</span>
              <span class="gsc-pill">Skor 0–100</span>
            </div>
            <button class="gsc-cta">Pilih Provinsi →</button>
          </div>
        </div>

        <!-- PUZZLE CARD -->
        <div class="game-select-card" onclick="showProvinceSelector('puzzle')">
          <div class="gsc-top">
            <span class="gsc-badge b-puzzle">🧩 Puzzle</span>
            <div class="gsc-icon" style="background:rgba(201,168,76,.12)">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                <line x1="7" y1="7" x2="7.01" y2="7"/>
              </svg>
            </div>
          </div>
          <div class="gsc-body">
            <h2 class="gsc-title">Puzzle Nusantara</h2>
            <p class="gsc-desc">Susun 9 kepingan gambar budaya Indonesia. Klik dua kepingan untuk menukarnya dan selesaikan puzzle!</p>
            <div class="gsc-pills">
              <span class="gsc-pill">3x3 Grid</span>
              <span class="gsc-pill">Drag &amp; Klik</span>
              <span class="gsc-pill">3 Gambar/Provinsi</span>
            </div>
            <button class="gsc-cta">Pilih Provinsi →</button>
          </div>
        </div>
      </div>

      <!-- Province Selector Modal -->
      <div id="province-selector" style="display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);z-index:300;align-items:center;justify-content:center;padding:20px">
        <div style="background:var(--bg2);border:1px solid var(--border);border-radius:20px;max-width:600px;width:100%;max-height:80vh;overflow-y:auto;padding:28px">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
            <h3 style="font-family:'Playfair Display',serif;font-size:22px;font-weight:800;color:var(--text)">Pilih Provinsi</h3>
            <button onclick="closeProvinceSelector()" style="background:var(--bg3);border:none;color:var(--text);width:32px;height:32px;border-radius:50%;cursor:pointer;font-size:16px">✕</button>
          </div>
          <input id="province-search" type="text" placeholder="Cari provinsi..." oninput="filterProvinces()"
            style="width:100%;padding:10px 16px;border-radius:8px;border:1px solid var(--border);background:var(--bg3);color:var(--text);font-family:'Plus Jakarta Sans',sans-serif;font-size:14px;margin-bottom:16px;outline:none">
          <div id="province-list" style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px">
            ${buildProvinceList()}
          </div>
        </div>
      </div>

    </div>
    ${footerHTML()}
  `);

  initNavbar();
}

let currentGameType = 'quiz';
function showProvinceSelector(gameType) {
  currentGameType = gameType;
  const sel = document.getElementById('province-selector');
  sel.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}
function closeProvinceSelector() {
  document.getElementById('province-selector').style.display = 'none';
  document.body.style.overflow = '';
}

function buildProvinceList() {
  return regions.map(r => {
    const diff = getDifficultyInfo(r.id);
    const hasDetail = provinceDetailData.some(p => p.slug === r.id);
    return `
      <div class="province-item" data-name="${r.name.toLowerCase()}"
        onclick="selectProvince('${r.id}','${r.name}')"
        style="background:var(--bg3);border:1px solid var(--border2);border-radius:10px;padding:12px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:space-between"
        onmouseenter="this.style.borderColor='var(--gold)'" onmouseleave="this.style.borderColor='var(--border2)'">
        <span style="font-size:13px;font-weight:600;color:var(--text)">${r.name}</span>
        <span style="font-size:11px;font-weight:700;color:${diff.color}">${diff.label}</span>
      </div>`;
  }).join('');
}

function filterProvinces() {
  const q = document.getElementById('province-search').value.toLowerCase();
  document.querySelectorAll('.province-item').forEach(el => {
    el.style.display = el.dataset.name.includes(q) ? '' : 'none';
  });
}

function selectProvince(id, name) {
  closeProvinceSelector();
  navigate(`/${currentGameType}/${id}`);
}

// ── QUIZ GAME ─────────────────────────────────────────────────
let quizState = {};

function renderQuiz(slug) {
  const questions = getQuizForProvince(slug);
  const province = provinceDetailData.find(p => p.slug === slug);
  const provinceName = province ? province.name : slug.replace(/-/g, ' ');

  quizState = {
    slug, provinceName, questions,
    current: 0, score: 0,
    answered: false, timer: null,
    timeLeft: 30,
  };

  document.title = `Quiz ${provinceName} — NusaExplore`;
  setPage(`
    ${navbarHTML('/games')}
    <div class="quiz-game" style="min-height:100vh;padding-top:80px">
      <div style="max-width:700px;margin:0 auto">
        ${buildQuizHeader()}
        <div id="quiz-body">${buildQuizQuestion()}</div>
      </div>
    </div>
    ${footerHTML()}
  `);
  initNavbar();
  startQuizTimer();
}

function buildQuizHeader() {
  const { current, questions, slug, provinceName } = quizState;
  const pct = (current / questions.length) * 100;
  return `
    <div class="quiz-header">
      <button class="quiz-back" onclick="navigate('/games')">← Games</button>
      <div>
        <div class="quiz-title">Quiz — ${provinceName}</div>
      </div>
    </div>
    <div class="quiz-progress-bar">
      <div class="quiz-progress-fill" id="quiz-prog" style="width:${pct}%"></div>
    </div>
  `;
}

function buildQuizQuestion() {
  const { current, questions, timeLeft } = quizState;
  const q = questions[current];
  if (!q) return '';
  return `
    <div class="quiz-card">
      <div class="quiz-num">Soal ${current+1} / ${questions.length} &nbsp;·&nbsp; <span id="timer-display" style="color:var(--gold)">⏱ ${timeLeft}s</span></div>
      <div class="quiz-question">${q.q}</div>
      <div class="quiz-options">
        ${q.opts.map((opt, i) => `
          <button class="quiz-opt" id="opt-${i}" onclick="answerQuiz(${i})">${opt}</button>
        `).join('')}
      </div>
    </div>
  `;
}

function startQuizTimer() {
  clearInterval(quizState.timer);
  quizState.timeLeft = 30;
  quizState.timer = setInterval(() => {
    quizState.timeLeft--;
    const disp = document.getElementById('timer-display');
    if (disp) {
      disp.textContent = `⏱ ${quizState.timeLeft}s`;
      if (quizState.timeLeft <= 10) disp.style.color = '#e74c3c';
    }
    if (quizState.timeLeft <= 0) {
      clearInterval(quizState.timer);
      if (!quizState.answered) answerQuiz(-1); // time out
    }
  }, 1000);
}

function answerQuiz(chosen) {
  if (quizState.answered) return;
  quizState.answered = true;
  clearInterval(quizState.timer);

  const q = quizState.questions[quizState.current];
  const correct = q.ans;
  const isCorrect = chosen === correct;
  if (isCorrect) quizState.score++;

  // Show feedback
  document.querySelectorAll('.quiz-opt').forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('wrong');
  });

  // Auto-advance
  setTimeout(() => {
    quizState.current++;
    quizState.answered = false;
    if (quizState.current >= quizState.questions.length) {
      showQuizResult();
    } else {
      const body = document.getElementById('quiz-body');
      if (body) body.innerHTML = buildQuizQuestion();
      // Update progress
      const prog = document.getElementById('quiz-prog');
      if (prog) prog.style.width = `${(quizState.current / quizState.questions.length) * 100}%`;
      startQuizTimer();
    }
  }, 1200);
}

function showQuizResult() {
  const { score, questions, slug, provinceName } = quizState;
  const total = questions.length;
  const pct   = Math.round((score / total) * 100);
  const pass  = pct >= 60;
  const diff  = getDifficultyInfo(slug);

  // Save score & mark game complete
  saveQuizScore(slug, pct);
  markGameCompleted(slug, 'quiz');

  // Auto-claim reward if passed
  let rewardMsg = '';
  if (pass && canClaimReward(slug)) {
    claimProvinceReward(slug, diff.keyReward);
    const ud = getUserData();
    rewardMsg = `<div class="result-reward-badge">🗝️ +${diff.keyReward} Kunci! Total: ${ud.keys}</div>`;
    showToast(`🗝️ Reward diklaim! +${diff.keyReward} kunci`, '🎉');
  }

  document.getElementById('quiz-body').innerHTML = `
    <div class="quiz-result">
      <div class="result-icon-wrap ${pass?'result-pass':'result-fail'}">
        ${pass ? '✅' : '❌'}
      </div>
      <div class="result-score">${pct}</div>
      <div class="result-label">Skor Akhir</div>
      <div class="result-verdict ${pass?'verdict-pass':'verdict-fail'}">
        ${pass ? '🎉 Lulus!' : '😔 Coba Lagi'}
      </div>
      <p class="result-msg">
        ${score} dari ${total} soal benar.
        ${pass ? `Keren! Pengetahuanmu tentang ${provinceName} sangat baik!` : `Pelajari lebih lanjut tentang ${provinceName} dan coba lagi!`}
      </p>
      ${rewardMsg}
      <div class="result-actions">
        <button class="result-btn result-btn-retry" onclick="renderQuiz('${slug}')">🔄 Ulang Quiz</button>
        <button class="result-btn" onclick="navigate('/province/${slug}')">📖 Detail Provinsi</button>
        <button class="result-btn" onclick="navigate('/games')">🎮 Games Lain</button>
      </div>
    </div>
  `;
}

// ── PUZZLE GAME ──────────────────────────────────────────────
let puzzleState = {};

function renderPuzzle(slug) {
  const province = provinceDetailData.find(p => p.slug === slug);
  const provinceName = province ? province.name : slug.replace(/-/g, ' ');
  const images = getPuzzleImages(slug);

  puzzleState = {
    slug, provinceName, images,
    currentRound: 0, moves: 0,
    completed: [],
    pieces: [], selected: null,
    GRID: 3, showHint: false,
  };

  document.title = `Puzzle ${provinceName} — NusaExplore`;
  setPage(`
    ${navbarHTML('/games')}
    <div class="puzzle-game" style="min-height:100vh;padding-top:80px">
      <div style="max-width:640px;margin:0 auto">
        <div class="puzzle-header">
          <button class="quiz-back" onclick="navigate('/games')">← Games</button>
          <div>
            <div class="quiz-title">Puzzle — ${provinceName}</div>
            <div class="puzzle-round-info" id="round-info">Ronde 1 dari ${images.length}</div>
          </div>
        </div>
        <div id="puzzle-body"></div>
      </div>
    </div>
    ${footerHTML()}
  `);

  initNavbar();
  startPuzzleRound();
}

function startPuzzleRound() {
  const { currentRound, images, GRID } = puzzleState;
  if (currentRound >= images.length) {
    showPuzzleAllDone();
    return;
  }

  puzzleState.moves = 0;
  puzzleState.selected = null;
  puzzleState.showHint = false;

  // Generate shuffled pieces
  const total = GRID * GRID;
  let pieces = Array.from({length: total}, (_, i) => i);
  // Fisher-Yates shuffle — ensure not sorted
  do {
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
  } while (isSolved(pieces));
  puzzleState.pieces = pieces;

  renderPuzzleBoard();
}

function isSolved(pieces) {
  return pieces.every((p, i) => p === i);
}

function renderPuzzleBoard() {
  const { currentRound, images, pieces, GRID, moves, showHint } = puzzleState;
  const imgSrc = images[currentRound];
  const pct = Math.round(((GRID * GRID) - countWrong(pieces)) / (GRID * GRID) * 100);

  document.getElementById('round-info').textContent = `Ronde ${currentRound+1} dari ${images.length}`;

  document.getElementById('puzzle-body').innerHTML = `
    ${showHint ? `<img src="${imgSrc}" class="puzzle-hint-img" alt="Hint" onerror="this.style.display='none'">` : ''}

    <div id="puzzle-grid" style="
      display:grid;
      grid-template-columns:repeat(${GRID},1fr);
      gap:4px;max-width:480px;margin:0 auto;
      border:2px solid var(--border);border-radius:12px;overflow:hidden;background:var(--bg3)
    ">
      ${pieces.map((correctIdx, pos) => {
        const row = Math.floor(correctIdx / GRID);
        const col = correctIdx % GRID;
        const isCorrect = correctIdx === pos;
        const isSelected = puzzleState.selected === pos;
        return `
          <div class="puzzle-piece" data-pos="${pos}" onclick="clickPiece(${pos})"
            style="
              aspect-ratio:1;cursor:pointer;position:relative;overflow:hidden;
              background-image:url('${imgSrc}');
              background-size:${GRID * 100}%;
              background-position:${(col/(GRID-1))*100}% ${(row/(GRID-1))*100}%;
              background-color:var(--bg4);
              outline:${isSelected ? '3px solid var(--gold)' : isCorrect ? '2px solid rgba(64,145,108,.5)' : 'none'};
              transition:outline .15s;
            "
          ></div>`;
      }).join('')}
    </div>

    <div class="puzzle-controls">
      <button class="puzzle-ctrl-btn" onclick="toggleHint()">
        ${showHint ? '🙈 Sembunyikan' : '💡 Tampilkan Hint'}
      </button>
      <span class="puzzle-moves">🔄 ${moves} langkah</span>
      <button class="puzzle-ctrl-btn" onclick="shufflePuzzle()">🔀 Acak Ulang</button>
    </div>

    <div style="margin-top:12px;background:var(--bg3);border-radius:8px;overflow:hidden;height:6px;max-width:480px;margin-left:auto;margin-right:auto">
      <div style="height:100%;background:linear-gradient(90deg,var(--green),var(--gold));width:${pct}%;transition:width .4s;border-radius:8px"></div>
    </div>
    <p style="text-align:center;font-size:12px;color:var(--text3);margin-top:6px">${pct}% benar</p>
  `;
}

function countWrong(pieces) {
  return pieces.filter((p, i) => p !== i).length;
}

function clickPiece(pos) {
  if (puzzleState.selected === null) {
    puzzleState.selected = pos;
    renderPuzzleBoard();
  } else {
    const from = puzzleState.selected;
    const to   = pos;
    if (from !== to) {
      // Swap
      [puzzleState.pieces[from], puzzleState.pieces[to]] = [puzzleState.pieces[to], puzzleState.pieces[from]];
      puzzleState.moves++;
    }
    puzzleState.selected = null;

    if (isSolved(puzzleState.pieces)) {
      renderPuzzleBoard();
      setTimeout(showRoundComplete, 500);
    } else {
      renderPuzzleBoard();
    }
  }
}

function toggleHint() {
  puzzleState.showHint = !puzzleState.showHint;
  renderPuzzleBoard();
}

function shufflePuzzle() {
  const total = puzzleState.GRID * puzzleState.GRID;
  let pieces = Array.from({length: total}, (_, i) => i);
  do {
    for (let i = pieces.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pieces[i], pieces[j]] = [pieces[j], pieces[i]];
    }
  } while (isSolved(pieces));
  puzzleState.pieces = pieces;
  puzzleState.selected = null;
  puzzleState.moves = 0;
  renderPuzzleBoard();
}

function showRoundComplete() {
  const { currentRound, images, moves, slug } = puzzleState;
  markGameCompleted(slug, 'puzzle');
  const isLast = currentRound >= images.length - 1;

  document.getElementById('puzzle-body').innerHTML = `
    <div class="puzzle-result">
      <div style="font-size:64px;margin-bottom:16px">🎉</div>
      <h2 style="font-family:'Playfair Display',serif;font-size:28px;font-weight:800;color:var(--gold);margin-bottom:8px">Ronde ${currentRound+1} Selesai!</h2>
      <p style="font-size:14px;color:var(--text2);margin-bottom:24px">Diselesaikan dalam <strong>${moves}</strong> langkah.</p>
      ${isLast
        ? `<button class="btn-gold" onclick="showPuzzleAllDone()">🏆 Lihat Hasil Akhir</button>`
        : `<button class="btn-gold" onclick="nextPuzzleRound()">➡️ Ronde Berikutnya</button>`
      }
    </div>
  `;
}

function nextPuzzleRound() {
  puzzleState.currentRound++;
  startPuzzleRound();
}

function showPuzzleAllDone() {
  const { slug, images, provinceName } = puzzleState;
  const diff = getDifficultyInfo(slug);
  markGameCompleted(slug, 'puzzle');

  let rewardMsg = '';
  if (canClaimReward(slug)) {
    claimProvinceReward(slug, diff.keyReward);
    const ud = getUserData();
    rewardMsg = `<div class="result-reward-badge" style="display:inline-flex;align-items:center;gap:8px;background:rgba(45,106,79,.15);border:1px solid var(--green-light);color:var(--green-light);padding:10px 20px;border-radius:20px;font-weight:700;font-size:13px;margin-bottom:20px">🗝️ +${diff.keyReward} Kunci! Total: ${ud.keys}</div>`;
    showToast(`🗝️ Puzzle selesai! +${diff.keyReward} kunci`, '🎉');
  }

  document.getElementById('puzzle-body').innerHTML = `
    <div class="puzzle-all-done">
      <div style="font-size:80px;margin-bottom:16px">🏆</div>
      <h2>Semua Puzzle Selesai!</h2>
      <p style="font-size:14px;color:var(--text2);margin-bottom:20px">
        Kamu telah menyelesaikan semua puzzle ${provinceName}. Luar biasa!
      </p>
      ${rewardMsg}
      <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
        <button class="btn-gold" onclick="renderPuzzle('${slug}')">🔄 Main Lagi</button>
        <button class="btn-outline" onclick="navigate('/province/${slug}')">📖 Detail Provinsi</button>
        <button class="btn-outline" onclick="navigate('/games')">🎮 Games Lain</button>
      </div>
    </div>
  `;
}
