import { CONFIG } from './config.js';

export function initChicken({ unlock, goTo }) {
  const btn = document.getElementById('chicken');
  const audio = new Audio(CONFIG.chickenAudio);
  let played = false;

  const finish = () => {
    btn.classList.remove('cluck');
    document.dispatchEvent(new CustomEvent('music:duck', { detail: false }));
    unlock('chicken');
    setTimeout(() => goTo(7), 600);
  };

  btn.addEventListener('click', () => {
    if (played) return;
    played = true;
    btn.classList.add('cluck');
    document.dispatchEvent(new CustomEvent('music:duck', { detail: true }));
    audio.addEventListener('ended', finish, { once: true });
    audio.addEventListener('error', () => setTimeout(finish, 2000), { once: true }); // si falta el audio
    audio.play().catch(() => setTimeout(finish, 2000));
  });
}
