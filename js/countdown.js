import { CONFIG } from './config.js';
import { pad } from './utils.js';

export function initCountdown(onDone) {
  const h = document.getElementById('cd-h'), m = document.getElementById('cd-m'), s = document.getElementById('cd-s');
  let last = -1, timer;

  function set(el, v) { if (el.textContent !== v) { el.textContent = v; el.classList.remove('tick'); void el.offsetWidth; el.classList.add('tick'); } }

  function tick() {
    const total = Math.max(0, Math.ceil((CONFIG.targetDate - Date.now()) / 1000));
    if (total === last) return;
    last = total;
    set(h, pad(Math.floor(total / 3600)));   // horas totales (pueden pasar de 24)
    set(m, pad(Math.floor((total % 3600) / 60)));
    set(s, pad(total % 60));
    if (total === 0) { clearInterval(timer); onDone(); }
  }
  tick();
  timer = setInterval(tick, 200);
}
