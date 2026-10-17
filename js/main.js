import { CONFIG } from './config.js';
import { Music, bindPlayer } from './audio.js';
import { initCountdown } from './countdown.js';
import { initLetter } from './letter.js';
import { initPuzzle } from './puzzle.js';
import { initCarousel } from './carousel.js';
import { initChicken } from './chicken.js';
import { initCharacters } from './characters.js';
import { confettiBurst } from './utils.js';

const screens = [...document.querySelectorAll('.screen')];
const total = screens.length;
const prevBtn = document.getElementById('nav-prev'), nextBtn = document.getElementById('nav-next');
const dotsBox = document.getElementById('dots'), player = document.getElementById('player');
const music = new Music(CONFIG.music);

// Pantalla (índice 0) que queda bloqueada hasta cumplir su condición
const LOCKS = { 0: 'countdown', 2: 'seal', 4: 'puzzle', 6: 'chicken' };
const done = new Set();
let current = -1;

const unlocked = (i) => CONFIG.testMode || !LOCKS[i] || done.has(LOCKS[i]);

function goTo(i) {
  if (i < 0 || i >= total || i === current) return;
  if (i > current) for (let k = Math.max(current, 0); k < i; k++) if (!unlocked(k)) return shake();
  current = i;
  screens.forEach((s, idx) => { s.classList.toggle('active', idx === i); s.classList.toggle('before', idx < i); });
  const n = i + 1;
  document.getElementById('screen-title').textContent = CONFIG.titles[n];
  player.classList.toggle('hidden', !CONFIG.playerScreens.includes(n));
  CONFIG.musicScreens.includes(n) ? music.play() : music.pause();
  updateNav();
  document.dispatchEvent(new CustomEvent('screenchange', { detail: { index: i, screen: n } }));
}

const next = () => goTo(current + 1);
const prev = () => goTo(current - 1);
const unlock = (key) => { done.add(key); updateNav(); };

function shake() { nextBtn.classList.remove('shake'); void nextBtn.offsetWidth; nextBtn.classList.add('shake'); }

function updateNav() {
  prevBtn.disabled = current <= 0;
  nextBtn.disabled = current >= total - 1 || !unlocked(current);
  [...dotsBox.children].forEach((d, i) => d.classList.toggle('on', i === current));
}

// ---------- Init ----------
document.getElementById('event-name').textContent = CONFIG.eventName;
screens.forEach(() => dotsBox.insertAdjacentHTML('beforeend', '<span class="d"></span>'));
prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);
document.querySelectorAll('[data-next]').forEach((el) => el.addEventListener('click', next));
addEventListener('keydown', (e) => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); });

// Gestos: deslizar para navegar (se ignora dentro de puzzle y carrusel)
let sx = 0, sy = 0, skip = false;
const stage = document.getElementById('stage');
stage.addEventListener('touchstart', (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; skip = !!e.target.closest('[data-noswipe]'); }, { passive: true });
stage.addEventListener('touchend', (e) => {
  if (skip) return;
  const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
  if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) dx < 0 ? next() : prev();
}, { passive: true });

document.addEventListener('music:duck', (e) => music.duck(e.detail));

bindPlayer(music);
initCharacters();
initLetter({ unlock, goTo });
initPuzzle({ unlock, goTo });
initCarousel();
initChicken({ unlock, goTo });
initCountdown(() => {
  confettiBurst(true);
  unlock('countdown');
  setTimeout(() => { if (current === 0) goTo(1); }, 3500);   // avanza solo tras el confeti
});

goTo(0);
