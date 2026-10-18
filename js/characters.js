import { CONFIG } from './config.js';

const BUBBLE_SECONDS = 4;   // segundos que se queda visible cada mensaje

export function initCharacters() {
  const host = document.getElementById('character');
  let timers = [];

  function build(c) {
    const el = document.createElement('div');
    el.className = 'char' + (c.side === 'right' ? ' char--right' : '');
    el.innerHTML = '<div class="bubble"><p class="bubble-text"></p></div><img alt="" class="character-img">';
    const bubble = el.querySelector('.bubble');
    el.querySelector('.bubble-text').textContent = c.text;
    el.querySelector('img').src = c.img;

    let timer;
    const show = () => {
      bubble.classList.remove('hidden');
      clearTimeout(timer);
      timer = setTimeout(() => bubble.classList.add('hidden'), BUBBLE_SECONDS * 1000);
      timers.push(timer);
    };
    el.querySelector('img').addEventListener('click', show);
    show();
    return el;
  }

  document.addEventListener('screenchange', (e) => {
    timers.forEach(clearTimeout); timers = [];
    host.innerHTML = '';
    const entry = CONFIG.characters[e.detail.screen];
    const list = entry ? [].concat(entry) : [];   // acepta objeto o arreglo
    host.classList.toggle('hidden', list.length === 0);
    list.forEach((c) => host.append(build(c)));
  });
}