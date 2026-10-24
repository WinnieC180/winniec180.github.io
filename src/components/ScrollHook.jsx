import { useEffect, useRef } from "react";
import { useTheme } from "../theme";
import hookFishImg from "../assets/sea/hookfish.png";
import "./scrollHook.css";

const Y0 = 70;      // how far the hook hangs at the top (px of line showing)
const SCALE = 0.82; // hook size

function HookShape() {
  return (
    <>
      <path d="M30 0 V44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <path d="M25.5 18.8 L34.5 21.2 M25.5 22.8 L34.5 25.2 M25.5 26.8 L34.5 29.2 M25.5 30.8 L34.5 33.2" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx="30" cy="43" r="5" fill="none" stroke="currentColor" strokeWidth="3" vectorEffect="non-scaling-stroke" />
      <path d="M30 48 V114 C30 138 4 138 4 116 V108" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
      <path d="M2.9 108.5 L4 99.5 L5.1 108.5 Z" fill="currentColor" />
      <path d="M4.8 117 Q8 113.2 12.5 112.6 Q8.6 115.6 5.6 120 Z" fill="currentColor" />
    </>
  );
}

function ScrollHook() {
  const night = useTheme() === "dark";
  const nightRef = useRef(night);
  useEffect(() => { nightRef.current = night; }, [night]);

  const r = {
    rig: useRef(null), line: useRef(null), bob: useRef(null), dark: useRef(null), light: useRef(null),
    shrimp: useRef(null), tail: useRef(null), label: useRef(null), drops: useRef(null),
  };

  useEffect(() => {
    const s = { hy: null, vy: 0, atBottom: undefined, fish: null, busy: false, waitTop: 0, wasHidden: undefined };
    const hero = () => document.querySelector("header.hero");
    const footer = () => document.querySelector(".footReveal");
    const fishLayer = () => document.querySelector(".heroLayer--fish");
    const splashLayer = () => document.querySelector(".heroLayer--splash");
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    const tailA = r.tail.current?.animate(
      [{ transform: "rotate(-14deg)" }, { transform: "rotate(10deg)" }, { transform: "rotate(-14deg)" }],
      { duration: 700, iterations: Infinity, easing: "ease-in-out" });

    const showShrimp = (on) => {
      const w = r.shrimp.current; if (!w) return;
      w.style.opacity = on ? 1 : 0;
      w.style.transform = on ? "scale(1)" : "scale(.3)";
    };

    const drops = (layer, x, y, size, count) => {
      if (!layer) return;
      const k = Math.min(1.4, size / 70);
      for (let i = 0; i < count; i++) {
        const d = document.createElement("div"), rr = (2.4 + Math.random() * 2.4) * k;
        d.className = "heroDrop";
        d.style.width = rr * 1.6 + "px"; d.style.height = rr * 2 + "px";
        layer.appendChild(d);
        const vx = (i - (count - 1) / 2) * (9 + Math.random() * 6) * k, up = (40 + Math.random() * 50) * k, fr = [];
        for (let j = 0; j <= 10; j++) { const t = j / 10; fr.push({ transform: `translate(${x + vx * t}px,${y + 4 - up * 4 * t * (1 - t) + 30 * t * t}px)`, opacity: t > 0.85 ? 0 : 1 }); }
        d.animate(fr, { duration: 650 + Math.random() * 250, easing: "linear" }).onfinish = () => d.remove();
      }
    };

    const hookSplash = (x, sy) => {
      const L = r.drops.current; if (!L) return;
      const ring = document.createElement("div");
      ring.className = "scrollHookRing";
      ring.style.left = x + "px"; ring.style.top = sy + "px";
      L.appendChild(ring);
      ring.animate([{ transform: "scale(1)", opacity: 1 }, { transform: "scale(8,3.5)", opacity: 0 }], { duration: 700, easing: "cubic-bezier(.2,.7,.4,1)" }).onfinish = () => ring.remove();
      drops(L, x, sy, 60, 9);
    };

    const dropFish = () => {
      const fish = s.fish, fl = fishLayer();
      if (!fish || !fl) { s.fish = null; s.busy = false; return; }
      const fr = fish.getBoundingClientRect(), flr = fl.getBoundingClientRect(), x = fr.left - flr.left, y = fr.top - flr.top;
      fish.getAnimations().forEach((a) => a.cancel());
      fish.remove();
      fish.className = "scrollHookFallen";
      fl.appendChild(fish);
      const surf = fl.clientHeight - 100, dx = -40 - Math.random() * 40, end = Math.max(y + 80, surf + 50), frames = [];
      for (let j = 0; j <= 18; j++) {
        const t = j / 18, hop = -45 * Math.sin(Math.min(1, t * 2.4) * Math.PI);
        frames.push({ transform: `translate(${x + dx * t}px,${y + hop + (end - y) * t * t}px) rotate(${-180 * Math.min(1, t * 1.25)}deg)`, opacity: t > 0.94 ? (1 - t) * 16 : 1 });
      }
      const dur = 1000, hit = Math.sqrt(Math.max(0, Math.min(1, (surf - y) / (end - y))));
      fish.animate(frames, { duration: dur, easing: "linear", fill: "forwards" }).onfinish = () => fish.remove();
      later(() => drops(splashLayer(), x + dx * hit, surf, 80, 7), dur * hit);
      later(() => { s.busy = false; s.fish = null; }, dur + 100);
    };

    const onClick = () => {
      if (!s.atBottom || s.busy) return;
      s.busy = true;
      r.label.current.style.opacity = 0;
      showShrimp(true);
      const w = 92, fh = w * 0.55;
      const fish = document.createElement("div");
      fish.className = "scrollHookCaught";
      fish.innerHTML = `<div style="position:absolute;left:${-w}px;top:${-fh / 2}px;width:${w}px;transform-origin:100% 50%;transform:rotate(-90deg);"><img src="${hookFishImg}" alt="" style="width:100%;display:block;transform:scaleY(-1);"></div>`;
      r.bob.current.appendChild(fish);
      s.fish = fish;
      const fr = [];
      for (let j = 0; j <= 14; j++) {
        const t = j / 14, e = 1 - Math.pow(1 - t, 3);
        fr.push({ transform: `translate(${Math.sin(t * Math.PI * 4) * 8 * (1 - t)}px,${150 * (1 - e)}px) rotate(${Math.sin(t * 18) * 8 * (1 - t)}deg)`, opacity: Math.min(1, t * 3) });
      }
      fish.animate(fr, { duration: 750, easing: "linear", fill: "forwards" }).onfinish = () => {
        showShrimp(false);
        s.vy += 7;
        fish.animate([{ transform: "rotate(0)" }, { transform: "rotate(10deg)" }, { transform: "rotate(-10deg)" }, { transform: "rotate(0)" }], { duration: 600, iterations: 4, composite: "add" });
        later(() => { s.waitTop = performance.now(); window.scrollTo({ top: 0, behavior: "smooth" }); }, 300);
      };
    };
    const onEnter = () => { if (s.atBottom && !s.busy) showShrimp(true); };
    const onLeave = () => { if (!s.busy) showShrimp(false); };
    const bob = r.bob.current;
    bob.addEventListener("click", onClick);
    bob.addEventListener("mouseenter", onEnter);
    bob.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const rig = r.rig.current, line = r.line.current, fw = footer();
      if (!rig || !line || !fw) return;
      const now = performance.now(), ih = window.innerHeight, ft = fw.getBoundingClientRect().top;
      const max = Math.max(1, document.documentElement.scrollHeight - ih);
      const inWater = ft < ih * 0.55;
      const h = hero();
      const shown = !!s.fish || !h || h.getBoundingClientRect().bottom < ih * 0.35;
      const target = !shown ? -300 : inWater ? Math.min(ih - 240, Math.max(Y0, ft - 120)) : Y0;
      if (s.hy == null) { s.hy = target; s.vy = 0; }
      const prevY = s.hy;
      s.vy += (target - s.hy) * 0.05; s.vy *= 0.82; s.hy += s.vy;
      const y = s.hy;

      if (y < -100) s.wasHidden = true;
      if (shown && s.wasHidden && !s.fish && !inWater && prevY < target && y >= target) {
        s.wasHidden = false;
        const br = bob.getBoundingClientRect();
        hookSplash(br.left + 20, br.top + 150);
      }

      const a = Math.sin(now / 1500) * 0.35 + Math.max(-3, Math.min(3, s.vy * 0.12));
      rig.style.transformOrigin = `42px ${-y}px`;
      rig.style.transform = `translateY(${y}px) rotate(${a}deg)`;

      const dark = nightRef.current ? "rgb(197,216,230)" : "rgb(42,77,135)", light = "rgba(255,255,255,.85)";
      line.style.top = -y + "px";
      line.style.height = Math.max(0, y + 2) + "px";
      line.style.background = ft >= y ? dark : ft <= 0 ? light : `linear-gradient(180deg,${dark} 0,${dark} ${ft}px,${light} ${ft}px,${light} 100%)`;

      const cut = Math.max(-20, Math.min(230, (ft - y) / SCALE));
      r.dark.current.style.color = dark;
      r.dark.current.style.clipPath = `inset(-20px -20px ${210 - cut}px -20px)`;
      r.light.current.style.clipPath = `inset(${cut}px -20px -20px -20px)`;

      const atBottom = max - window.scrollY < 6 && ft < y;
      if (atBottom !== s.atBottom) {
        s.atBottom = atBottom;
        bob.style.pointerEvents = atBottom ? "auto" : "none";
        bob.style.cursor = atBottom ? "pointer" : "default";
        r.label.current.style.opacity = atBottom && !s.busy ? 1 : 0;
        if (!atBottom && !s.busy) showShrimp(false);
      }

      if (s.waitTop && s.fish) {
        const fl = fishLayer(), surf = fl ? fl.getBoundingClientRect().bottom - 100 : -1, fb = s.fish.getBoundingClientRect().top + 60;
        if ((surf > fb + 30 && surf < ih - 40) || window.scrollY < 4 || now - s.waitTop > 3500) { s.waitTop = 0; dropFish(); }
      }
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      timers.forEach(clearTimeout);
      tailA?.cancel();
      bob.removeEventListener("click", onClick);
      bob.removeEventListener("mouseenter", onEnter);
      bob.removeEventListener("mouseleave", onLeave);
      s.fish?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const O = "rgb(232,124,86)", F = "rgb(252,190,150)", HL = "rgb(255,232,214)";
  return (
    <>
      <div ref={r.drops} className="scrollHookDrops" />
      <div ref={r.rig} className="scrollHook">
        <div ref={r.line} className="scrollHookLine" />
        <div ref={r.bob} className="scrollHookBob" title="Back to top">
          <svg ref={r.dark} width="84" height="210" viewBox="0 0 60 150"><HookShape /></svg>
          <svg ref={r.light} className="scrollHookLight" width="84" height="210" viewBox="0 0 60 150"><HookShape /></svg>
          <svg width="84" height="210" viewBox="0 0 60 150">
            <g ref={r.shrimp} className="scrollHookShrimp">
              <g transform="translate(-0.5 113) scale(.37)" stroke={O} strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 38 C12 33 13 24 22 22 C36 19 52 17 60 15 C65 13 64 8 59 9 M23 35 C32 28 48 25 66 23 C72 21 71 15 66 16" fill="none" strokeWidth="2.6" />
                <path d="M28 52 l-3 7 M34 54 l-2 7 M41 54 l0 7 M48 54 l1 6" fill="none" strokeWidth="3.2" />
                <g ref={r.tail} style={{ transformBox: "fill-box", transformOrigin: "40% 0%" }}>
                  <path d="M60 77 C52 80 47 89 53 94 C57 91 59 89 61 86 C63 93 68 97 73 92 C71 86 67 81 65 79 Z" fill={F} strokeWidth="3.6" />
                  <path d="M57 86 L61 82 M64 84 L67 88" fill="none" strokeWidth="2" />
                </g>
                <path d="M17 43 C18 30 38 25 55 29 C71 33 82 47 79 62 C77 72 71 79 63 81 L58 72 C64 68 66 62 64 56 C60 47 49 46 38 50 C29 54 18 54 17 43 Z" fill={F} strokeWidth="3.8" />
                <path d="M39 29 Q46 40 39 50 M53 30 Q61 41 53 50 M67 37 Q73 49 63 55 M77 53 Q72 61 64 62 M75 67 Q69 71 62 71" fill="none" strokeWidth="3.2" />
                <ellipse cx="47" cy="34" rx="3.6" ry="2.2" fill={HL} stroke="none" />
                <ellipse cx="61" cy="36" rx="3.6" ry="2.2" fill={HL} stroke="none" transform="rotate(25 61 36)" />
                <ellipse cx="72" cy="48" rx="2.4" ry="3.4" fill={HL} stroke="none" transform="rotate(-20 72 48)" />
                <circle cx="27" cy="40" r="2.2" fill={O} stroke="none" />
              </g>
            </g>
          </svg>
          <div ref={r.label} className="scrollHookLabel">back to top</div>
        </div>
      </div>
    </>
  );
}

export default ScrollHook;