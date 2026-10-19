import { CONFIG } from './config.js';
import { saveBlob } from './utils.js';

export function initLetter({ unlock, goTo }) {
  const seal = document.getElementById('seal'),
        sobre = document.getElementById('sobre'),
        paper = document.getElementById('paper'),
        card = document.getElementById('letter-card');

  card.innerHTML = `<h3>${CONFIG.letter.title}</h3>` + CONFIG.letter.body.map((p) => `<p>${p}</p>`).join('');

  seal.addEventListener('click', () => {
    if (seal.classList.contains('broken')) return;
    seal.classList.add('broken');          // el sello se rompe
    sobre.classList.add('open');           // la solapa se abre
    setTimeout(() => { unlock('seal'); goTo(3); }, 1100);
  });

  document.addEventListener('screenchange', (e) => {
    // Pantalla 3: el sobre vuelve a estar cerrado
    if (e.detail.screen === 3) {
      seal.classList.remove('broken');
      sobre.classList.remove('open');
    }
    // Pantalla 4: la hoja aparece y siempre empieza desde arriba
    paper.classList.remove('show');
    paper.scrollTop = 0;
    if (e.detail.screen === 4) setTimeout(() => paper.classList.add('show'), 350);
  });

 document.getElementById('save-letter').addEventListener('click', async () => {
  const canvas = await html2canvas(card, {
    scale: 2,
    backgroundColor: '#F8F0DA',
    onclone: (doc) => {
      const c = doc.getElementById('letter-card');
      // la hoja no debe recortar ni mover nada en la copia
      const p = c.parentElement;
      p.style.maxHeight = 'none';
      p.style.overflow = 'visible';
      p.style.transform = 'none';
      p.style.opacity = '1';
      // fondo simple: sin ruido SVG ni sombra interior
      c.style.background =
        'radial-gradient(ellipse at 50% 0%, rgba(255,255,255,.55), transparent 60%),' +
        'radial-gradient(ellipse at 100% 100%, rgba(185,145,85,.30), transparent 55%),' +
        'radial-gradient(ellipse at 0% 100%, rgba(185,145,85,.22), transparent 50%),' +
        '#F8F0DA';
      c.style.boxShadow = 'none';
    }
  });
  canvas.toBlob((b) => b && saveBlob(b, 'mi-carta.png'), 'image/png');
});
}