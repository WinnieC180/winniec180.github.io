import { useEffect, useLayoutEffect, useRef } from "react";
import cloudUrl from "../assets/sea/cloud.svg";
import "./intro.css";

// Sky loader (~2.6s): fall through the sky (clouds, or stars + comets at night),
// a fog bank rises up and blocks the view, then fades off to reveal the hero.
const T = 2600;

function IntroAnimation({ onEnter }) {
  const stage = useRef(null);
  const enterRef = useRef(onEnter);

  useEffect(() => {
    enterRef.current = onEnter;
  }, [onEnter]);

  useLayoutEffect(() => {
    const st = stage.current;
    const N = document.documentElement.getAttribute("data-theme") === "dark";
    const W = window.innerWidth, H = window.innerHeight;
    const el = (tag, css, parent) => { const e = document.createElement(tag); e.style.cssText = css; parent.appendChild(e); return e; };
    const FOG_FULL = 0.46 * T;

    const sky = el("div", `position:absolute;inset:0;background:${N
      ? "linear-gradient(180deg,rgb(18,27,54) 0%,rgb(34,52,94) 60%,rgb(72,106,152) 100%)"
      : "linear-gradient(180deg,rgb(206,230,248) 0%,rgb(234,244,252) 55%,#fff 100%)"};`, st);

    if (N) {
      // stars drift up with the fall (closer = faster), a few twinkle
      const stars = el("div", "position:absolute;inset:0;", sky);
      for (let i = 0; i < 90; i++) {
        const z = Math.random(), r = 1 + z * 1.8, x = Math.random() * W, y = Math.random() * H * 1.6;
        const s = el("div", `position:absolute;left:${x}px;top:${y}px;width:${r}px;height:${r}px;border-radius:50%;background:rgb(${z > 0.8 ? "255,236,190" : "235,242,255"});opacity:${0.4 + z * 0.6};box-shadow:0 0 ${r * 3}px rgba(235,242,255,${0.3 + z * 0.4});`, stars);
        s.animate([{ transform: "translateY(0)" }, { transform: `translateY(${-H * (0.25 + z * 0.55)}px)` }], { duration: T, easing: "cubic-bezier(.45,0,.85,.55)", fill: "forwards" });
        if (i % 6 === 0) s.animate([{ opacity: 1 }, { opacity: 0.25 }, { opacity: 1 }], { duration: 500 + Math.random() * 600, iterations: Infinity, composite: "add" });
      }
      // comets streak diagonally across
      [[0.15, 0.08, 0.05], [0.75, 0.2, 0.22], [0.35, 0.05, 0.38]].forEach(([x, y, d]) => {
        const len = 140 + Math.random() * 60, ang = 28, dist = W * 0.45;
        const c = el("div", `position:absolute;left:${x * W}px;top:${y * H}px;width:${len}px;height:2px;border-radius:2px;background:linear-gradient(90deg,rgba(235,242,255,0),rgba(235,242,255,.9) 85%,#fff);box-shadow:0 0 8px rgba(200,220,255,.6);transform-origin:100% 50%;opacity:0;`, sky);
        c.animate([
          { transform: `rotate(${ang}deg) translateX(0) scaleX(.3)`, opacity: 0 },
          { transform: `rotate(${ang}deg) translateX(${dist * 0.3}px) scaleX(1)`, opacity: 1, offset: 0.25 },
          { transform: `rotate(${ang}deg) translateX(${dist}px) scaleX(.6)`, opacity: 0 },
        ], { duration: 700, delay: d * T, easing: "ease-out", fill: "both" });
      });
    }

    const m = `url("${cloudUrl}") center/contain no-repeat`;
    const cloud = (parent, x, y, w, op, color) => el("div", `position:absolute;left:${x - w / 2}px;top:${y}px;width:${w}px;height:${w * 141 / 253}px;background:${color};opacity:${op};-webkit-mask:${m};mask:${m};`, parent);

    // small clouds rush upward while falling
    [[0.08, 0.15, 260], [0.72, 0.32, 220], [0.18, 0.62, 180], [0.82, 0.85, 300], [0.4, 1.1, 200]].forEach(([x, y, w], i) => {
      cloud(sky, x * W, y * H, w, N ? 0.3 : 0.9, N ? "rgb(120,140,180)" : "#fff")
        .animate([{ transform: "translateY(0)" }, { transform: `translateY(${-H * (1.2 + i * 0.05)}px)` }], { duration: FOG_FULL, easing: "cubic-bezier(.45,0,.85,.55)", fill: "forwards" });
    });

    // fog bank: rises into view, blocks the view, then trails off in a soft fade
    const fc = N ? "rgb(64,84,126)" : "rgb(246,250,254)", rgb = N ? "64,84,126" : "246,250,254";
    const EDGE = 0.3 * H, CORE = 2 * H, FADE = 0.8 * H, BANK = EDGE + CORE + FADE;
    const fog = el("div", `position:absolute;left:0;top:0;width:100%;height:${BANK}px;`, st);
    el("div", `position:absolute;left:0;top:${EDGE}px;width:100%;height:${CORE}px;background:${fc};`, fog);
    const stops = [1, 0.92, 0.78, 0.6, 0.42, 0.26, 0.14, 0.06, 0.02, 0].map((o, i) => `rgba(${rgb},${o}) ${(i * 100) / 9}%`).join(",");
    el("div", `position:absolute;left:0;top:${EDGE + CORE - 1}px;width:100%;height:${FADE}px;background:linear-gradient(180deg,${stops});`, fog);
    const n = Math.max(4, Math.ceil(W / 260));
    for (let i = 0; i <= n; i++) {
      const w = (W / n) * (1.7 + (i % 3) * 0.35), x = (i / n) * W + (i % 2 ? 20 : -20);
      cloud(fog, x, EDGE - (w * 141) / 253 * 0.62 + (i % 2) * 18, w, 1, fc);
    }
    const v = (5.2 * H) / T, t0 = 0.2 * T, covered = t0 + (H + EDGE + 0.4 * H) / v;
    fog.animate([{ transform: `translateY(${H}px)` }, { transform: `translateY(${-BANK}px)` }], { duration: (H + BANK) / v, delay: t0, easing: "linear", fill: "both" });
    sky.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 1, delay: covered, fill: "forwards" });

    // unlock the page while the fog is still covering it, unmount once it has fully passed
    const unlock = setTimeout(() => document.body.classList.remove("noScroll"), covered);
    const done = setTimeout(() => enterRef.current?.(), t0 + (H + BANK) / v);

    return () => {
      clearTimeout(unlock);
      clearTimeout(done);
      st.getAnimations({ subtree: true }).forEach((a) => a.cancel());
      st.innerHTML = "";
    };
  }, []);

  return <div ref={stage} className="fishIntro" role="img" aria-label="Loading" />;
}

export default IntroAnimation;