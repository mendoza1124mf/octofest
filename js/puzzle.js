import { CONFIG } from './config.js';
import { confettiBurst } from './utils.js';

const N = 3;

export function initPuzzle({ unlock, goTo }) {
  const el = document.getElementById('puzzle');
  let order = [...Array(N * N).keys()];   // order[posición] = id de pieza
  let selected = null, solved = false;

  const isSolved = () => order.every((id, i) => id === i);
  do { order.sort(() => Math.random() - 0.5); } while (isSolved());

  function render() {
    el.innerHTML = '';
    order.forEach((id, pos) => {
      const b = document.createElement('button');
      b.className = 'piece' + (selected === pos ? ' sel' : '');
      b.style.backgroundImage = `url(${CONFIG.puzzleImage})`;
      b.style.backgroundSize = `${N * 100}% ${N * 100}%`;
      b.style.backgroundPosition = `${((id % N) * 100) / (N - 1)}% ${(Math.floor(id / N) * 100) / (N - 1)}%`;
      b.setAttribute('aria-label', `Pieza ${pos + 1}`);
      b.addEventListener('click', () => tap(pos));
      el.append(b);
    });
  }

  function tap(pos) {
    if (solved) return;
    if (selected === null) selected = pos;
    else {
      [order[selected], order[pos]] = [order[pos], order[selected]];
      selected = null;
    }
    render();
    if (isSolved()) win();
  }

  function win() {
    solved = true;
    el.classList.add('solved');
    confettiBurst();
    unlock('puzzle');
    setTimeout(() => goTo(5), 1800);   // pasa al carrusel
  }
  render();
}
