// Guardar archivos: en móvil abre la hoja de compartir (opción "Guardar imagen/video");
// si no está disponible, descarga el archivo.
export async function saveBlob(blob, name) {
  const file = new File([blob], name, { type: blob.type });
  if (navigator.canShare?.({ files: [file] })) {
    try { await navigator.share({ files: [file] }); return; }
    catch (e) { if (e.name === 'AbortError') return; }
  }
  const url = URL.createObjectURL(blob);
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export async function saveFromUrl(url, name) {
  const res = await fetch(url);
  return saveBlob(await res.blob(), name);
}

export const pad = (n) => String(n).padStart(2, '0');

export function confettiBurst(big = false) {
  if (typeof confetti !== 'function') return;
  if (!big) return confetti({ particleCount: 90, spread: 70, origin: { y: 0.7 } });
  const end = Date.now() + 3000;
  (function frame() {
    confetti({ particleCount: 6, angle: 60, spread: 60, origin: { x: 0 } });
    confetti({ particleCount: 6, angle: 120, spread: 60, origin: { x: 1 } });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
