// Guardar archivos: en móvil abre la hoja de compartir (opción "Guardar imagen/video");
// si no está disponible, descarga el archivo.
export async function saveBlob(blob, filename) {
  const file = new File([blob], filename, { type: blob.type || 'image/png' });

  // 1) Móvil: hoja de compartir del sistema (aquí aparece "Guardar imagen")
  if (navigator.canShare && navigator.canShare({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return;
    } catch (err) {
      if (err.name === 'AbortError') return;   // el usuario cerró la hoja
      // si falla por otro motivo, sigue al plan B
    }
  }

  // 2) Escritorio y algunos Android: descarga directa
  const url = URL.createObjectURL(blob);
  const isTouch = matchMedia('(pointer: coarse)').matches;
  if (!isTouch) {
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.append(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 4000);
    return;
  }

  // 3) Plan B en móvil: mostrar la imagen para mantenerla presionada y guardarla
  const ov = document.createElement('div');
  ov.style.cssText = 'position:fixed;inset:0;z-index:100;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem;padding:1rem;background:rgba(0,0,0,.85)';
  ov.innerHTML = `<p style="color:#fff;font-size:.85rem;text-align:center">Mantén presionada la imagen y elige "Guardar imagen"</p>
    <img src="${url}" style="max-width:100%;max-height:70dvh;object-fit:contain;border-radius:4px">
    <button style="padding:.5rem 1.25rem;border-radius:999px;background:#F2C230;color:#1F4A3C;font-weight:600">Cerrar</button>`;
  ov.querySelector('button').onclick = () => { ov.remove(); URL.revokeObjectURL(url); };
  document.body.append(ov);
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
