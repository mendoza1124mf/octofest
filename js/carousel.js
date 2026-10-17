import { CONFIG } from './config.js';
import { saveFromUrl } from './utils.js';

export function initCarousel() {
  const box = document.getElementById('carousel'), dots = document.getElementById('carousel-dots');

  CONFIG.media.forEach((m, i) => {
    const slide = document.createElement('div');
    slide.className = 'slide';
    const ext = m.src.split('.').pop();
    slide.innerHTML = m.type === 'video'
      ? `<video src="${m.src}" controls playsinline preload="metadata"></video>`
      : `<img src="${m.src}" alt="Recuerdo ${i + 1}" loading="lazy">`;
    const btn = document.createElement('button');
    btn.textContent = 'Guardar';
    btn.addEventListener('click', () => saveFromUrl(m.src, `recuerdo-${i + 1}.${ext}`));
    slide.append(btn);
    box.append(slide);
    dots.insertAdjacentHTML('beforeend', '<span class="dot"></span>');

    // Baja la música mientras se reproduce un video
    const v = slide.querySelector('video');
    if (v) {
      const duck = (on) => document.dispatchEvent(new CustomEvent('music:duck', { detail: on }));
      v.addEventListener('play', () => duck(true));
      v.addEventListener('pause', () => duck(false));
      v.addEventListener('ended', () => duck(false));
    }
  });

  const update = () => {
    const slides = [...box.children];
    const mid = box.scrollLeft + box.clientWidth / 2;
    const idx = slides.reduce((best, s, i) =>
      Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid) < Math.abs(slides[best].offsetLeft + slides[best].offsetWidth / 2 - mid) ? i : best, 0);
    [...dots.children].forEach((d, i) => d.classList.toggle('on', i === idx));
    slides.forEach((s, i) => { if (i !== idx) s.querySelector('video')?.pause(); });
  };
  box.addEventListener('scroll', update, { passive: true });
  update();
}
