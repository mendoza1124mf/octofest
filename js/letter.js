import { CONFIG } from './config.js';
import { saveBlob } from './utils.js';

export function initLetter({ unlock, goTo }) {
  const seal = document.getElementById('seal'), env = document.getElementById('envelope'),
        card = document.getElementById('letter-card');

  card.innerHTML = `<h3>${CONFIG.letter.title}</h3>` + CONFIG.letter.body.map((p) => `<p>${p}</p>`).join('');

  seal.addEventListener('click', () => {
    seal.classList.add('broken');
    setTimeout(() => { unlock('seal'); goTo(3); }, 700);
  });

  // El sobre se abre cada vez que entras a la pantalla 4
  document.addEventListener('screenchange', (e) => {
    env.classList.remove('open');
    if (e.detail.screen === 4) setTimeout(() => env.classList.add('open'), 500);
  });

  document.getElementById('save-letter').addEventListener('click', async () => {
    const canvas = await html2canvas(card, { scale: 2, backgroundColor: '#FBF6E4' });
    canvas.toBlob((b) => b && saveBlob(b, 'mi-carta.png'), 'image/png');
  });
}
