// Keeps decoded images alive for the whole visit so the pond never re-decodes them.
const ready = new Set();
const pending = new Map();
const keep = new Map(); // strong refs — stops the browser from discarding decoded images

export function preloadImage(src) {
  if (ready.has(src)) return Promise.resolve();
  if (pending.has(src)) return pending.get(src);
  const img = new Image();
  img.src = src;
  keep.set(src, img);
  const p = img.decode()
    .catch(() => {})
    .then(() => { ready.add(src); pending.delete(src); });
  pending.set(src, p);
  return p;
}

export const isReady = (src) => ready.has(src);

export function preloadInBackground(srcs) {
  const go = () => srcs.forEach(preloadImage);
  if ("requestIdleCallback" in window) requestIdleCallback(go, { timeout: 3000 });
  else setTimeout(go, 1500);
}