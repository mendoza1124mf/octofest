export class Music {
  constructor(src) {
    this.a = new Audio(src);
    this.a.loop = true;
    this.vol = 0.8;
    this.ducked = false;
    // Los navegadores exigen un gesto del usuario: "desbloqueamos" con el primer toque.
    addEventListener('pointerdown', () => this.#unlock(), { once: true });
  }
  #unlock() {
    if (!this.a.paused) return;
    this.a.muted = true;
    this.a.play().then(() => { this.a.pause(); this.a.muted = false; this.a.currentTime = 0; }).catch(() => { this.a.muted = false; });
  }
  fade(to, ms = 600) {
    clearInterval(this._f);
    const from = this.a.volume, steps = 15;
    let i = 0;
    this._f = setInterval(() => {
      i++; this.a.volume = Math.min(1, Math.max(0, from + (to - from) * (i / steps)));
      if (i >= steps) clearInterval(this._f);
    }, ms / steps);
  }
  async play() {
    if (!this.a.paused) return;
    this.a.volume = 0;
    try { await this.a.play(); this.fade(this.ducked ? 0.15 : this.vol); }
    catch { addEventListener('pointerdown', () => this.play(), { once: true }); } // reintenta al siguiente toque
  }
  pause() {
    if (this.a.paused) return;
    this.fade(0, 500);
    setTimeout(() => this.a.pause(), 520);
  }
  duck(on) { this.ducked = on; if (!this.a.paused) this.fade(on ? 0.15 : this.vol, 400); }
}

export function bindPlayer(music) {
  const bar = document.getElementById('p-bar'), cur = document.getElementById('p-cur'),
        dur = document.getElementById('p-dur'), btn = document.getElementById('p-toggle');
  const fmt = (t) => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(Math.floor(t % 60)).padStart(2, '0')}`;
  music.a.addEventListener('timeupdate', () => {
    cur.textContent = fmt(music.a.currentTime);
    if (music.a.duration) { dur.textContent = fmt(music.a.duration); bar.style.width = `${(music.a.currentTime / music.a.duration) * 100}%`; }
  });
  music.a.addEventListener('play', () => (btn.textContent = '❚❚'));
  music.a.addEventListener('pause', () => (btn.textContent = '▶'));
  btn.addEventListener('click', () => (music.a.paused ? music.play() : music.pause()));
}
