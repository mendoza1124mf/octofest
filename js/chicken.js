import { CONFIG } from './config.js';

export function initChicken({ unlock, goTo }) {
  const btn = document.getElementById('chicken');
  const pollo = btn.querySelector('img');
  const audio = new Audio(CONFIG.chickenAudio);
  const IMG1 = 'assets/img/pollo1.png';
  const IMG2 = 'assets/img/pollo2.png';
  let played = false;

  new Image().src = IMG2;   // precarga pollo2 para que el cambio sea instantáneo

  const finish = () => {
    btn.classList.remove('cluck');
    document.dispatchEvent(new CustomEvent('music:duck', { detail: false }));
    unlock('chicken');
    setTimeout(() => goTo(7), 600);
  };

  btn.addEventListener('click', () => {
    if (played) return;
    played = true;
    pollo.src = IMG2;                 // cambia al pollo 2
    btn.classList.add('cluck');
    document.dispatchEvent(new CustomEvent('music:duck', { detail: true }));
    audio.addEventListener('ended', finish, { once: true });
    audio.addEventListener('error', () => setTimeout(finish, 2000), { once: true });
    audio.play().catch(() => setTimeout(finish, 2000));
  });

  // Al volver a la pantalla 7 se reinicia el pollo
  document.addEventListener('screenchange', (e) => {
    if (e.detail.screen === 7) { pollo.src = IMG1; played = false; }
  });
}