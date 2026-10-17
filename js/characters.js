import { CONFIG } from './config.js';

const BUBBLE_SECONDS = 4;   // cuántos segundos se queda visible el mensaje

export function initCharacters() {
  const host = document.getElementById('character');
  const img = host.querySelector('img'), text = host.querySelector('.bubble-text'), bubble = host.querySelector('.bubble');
  let timer;

  function showBubble() {
    bubble.classList.remove('hidden');
    bubble.style.animation = 'none'; void bubble.offsetWidth; bubble.style.animation = '';  // reinicia la animación de entrada
    clearTimeout(timer);
    timer = setTimeout(() => bubble.classList.add('hidden'), BUBBLE_SECONDS * 1000);
  }

  // Al tocar al personaje, el mensaje vuelve a salir
  img.addEventListener('click', showBubble);

  document.addEventListener('screenchange', (e) => {
    const c = CONFIG.characters[e.detail.screen];
    host.classList.toggle('hidden', !c);
    clearTimeout(timer);
    if (!c) return;
    img.src = c.img;
    text.textContent = c.text;
    showBubble();
  });
}