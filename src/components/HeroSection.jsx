import { useEffect, useRef, useState } from "react";
import { useTheme, toggleTheme } from "../theme";
import "./hero.css";

const SPRITES = import.meta.glob("../assets/sea/*.png", { eager: true, import: "default" });
const sea = (name) => SPRITES[`../assets/sea/${name}.png`];

// n = the angle the sprite's nose points at in the image, w = base width
const JUMPERS = [
  { s: "puffer-gold", n: 0, w: 64 }, { s: "minnow", n: -20, w: 84 }, { s: "sunfish-gold", n: 12, w: 80 },
  { s: "minnow-gold", n: -15, w: 80 }, { s: "sardine", n: 6, w: 78 }, { s: "dolphin", n: -52, w: 88 },
  { s: "tinyfish-gold", n: -30, w: 56 }, { s: "roundfish-gold", n: 180, w: 62 }, { s: "angelfish-gold", n: -8, w: 72 },
];

const CLOUDS = [
  { top: 110, w: 190, delay: 0, flip: 1, o: 1 },
  { top: 262, w: 130, delay: -30, flip: -1, o: 0.85 },
  { top: 146, w: 215, delay: -60, flip: 1, o: 1 },
  { top: 318, w: 110, delay: -90, flip: -1, o: 0.75 },
  { top: 200, w: 160, delay: -120, flip: 1, o: 0.95 },
];

const BUBBLE = {
  depth: "Not just how it looks on the surface, but how it holds up below. The logic, the systems, the decisions that don\u2019t show up in a screenshot.",
  ships: "Bridging the gap between designers and engineers to build toward a shared vision that lasts.",
};

const CLOUD_PATH =
  "M89.1409 2.59201C61.9393 2.5922 39.8881 24.6434 39.8879 51.8449C39.8879 55.7229 40.3379 59.4958 41.1863 63.1152C41.6407 65.0537 40.0626 66.9738 38.0715 66.9738C19.1927 66.9739 3.88809 82.2777 3.88794 101.156C3.88794 120.035 19.1927 135.34 38.0715 135.34C50.5427 135.34 61.4536 128.661 67.4236 118.686C68.4928 116.899 70.8875 116.276 72.6653 117.36C80.0792 121.879 89.5573 124.592 99.8879 124.592C111.795 124.592 122.572 120.99 130.358 115.171C132.11 113.862 134.712 114.335 135.889 116.177C142.81 127.002 154.934 134.179 168.736 134.179C182.201 134.179 194.07 127.348 201.068 116.962C202.592 114.699 206.398 114.575 208.276 116.554C212.562 121.07 218.622 123.887 225.34 123.887C238.332 123.887 248.864 113.355 248.865 100.363C248.865 87.3716 238.332 76.8391 225.34 76.8391C220.159 76.8392 215.37 78.5147 211.483 81.353C209.278 82.9638 205.553 82.1522 204.46 79.6491C200.246 69.9911 192.231 62.3731 182.304 58.685C180.453 57.9974 179.44 55.9263 180.041 54.0456C181.29 50.1349 181.968 45.9469 181.968 41.592C181.968 20.0529 165.403 2.59201 144.968 2.59201C136.174 2.59201 128.098 5.82696 121.75 11.2281C120.503 12.2889 118.679 12.3948 117.337 11.4565C109.35 5.86983 99.6279 2.59201 89.1409 2.59201Z";

const BUBBLE_PATH =
  "M30 0 H370 A30 30 0 0 1 400 30 V42 A30 30 0 0 1 370 72 H160.3 C177.1 87.6 226.1 113.5 288 92.5 C260 106.4 191.2 121.8 140 72 H30 A30 30 0 0 1 0 42 V30 A30 30 0 0 1 30 0 Z";
const WAVE_PATH = "M0 16 " + "q60 -16 120 0 q60 16 120 0 ".repeat(14) + "V300 H0 Z";

const STARS = (() => {
  let z = 7;
  const r = () => (z = (z * 9301 + 49297) % 233280) / 233280;
  return Array.from({ length: 34 }, () => ({
    left: (r() * 100).toFixed(1) + "%",
    top: (4 + r() * 58).toFixed(1) + "%",
    size: (1.5 + r() * 2.5).toFixed(1) + "px",
    dur: (1.8 + r() * 2.4).toFixed(1) + "s",
    delay: (-r() * 4).toFixed(1) + "s",
  }));
})();

/* Jumping fish, splashes and the hover fish run outside React state (direct DOM + rAF) so they stay smooth. */
class Ocean {
  constructor(refs) {
    this.r = refs;
    this.fish = [];
    this.SURF = 540;
    this.Y0 = 630;
    this.G = 900;
  }
  start() {
    this.tick = () => {
      const h = this.r.fishLayer.current?.clientHeight;
      if (h) { this.SURF = h - 100; this.Y0 = h - 10; }
      this.step(performance.now());
      this.raf = requestAnimationFrame(this.tick);
    };
    this.raf = requestAnimationFrame(this.tick);
    this.to = setTimeout(() => { this.launch(); this.schedule(); }, 600);
  }
  stop() {
    cancelAnimationFrame(this.raf);
    [this.to, this.ht, this.ct].forEach(clearTimeout);
    this.fish.forEach((f) => f.el.remove());
    this.fish = [];
  }
  schedule() {
    this.to = setTimeout(() => {
      if (this.fish.length < 3) this.launch();
      this.schedule();
    }, 900 + Math.random() * 1400);
  }
  launch(o = {}) {
    const layer = this.r.fishLayer.current;
    if (!layer || document.hidden) return;
    const W = layer.clientWidth, R = Math.random;
    let x0, right;
    if (o.x0 != null) { x0 = o.x0; right = x0 > W / 2; }
    else {
      right = this.fish.length ? !this.fish[this.fish.length - 1].right : R() < 0.5;
      x0 = W * (right ? 0.72 + R() * 0.16 : 0.12 + R() * 0.16);
    }
    const sp = JUMPERS[Math.floor(R() * JUMPERS.length)];
    const h = o.h ?? 110 + R() * 160, H = h + (this.Y0 - this.SURF);
    const T = 2 * Math.sqrt((2 * H) / this.G) * 1000;
    const D = (right ? 1 : -1) * (80 + R() * 130);
    let n = sp.n, sx = 1;
    if ((D > 0) !== (Math.abs(n) < 90)) { sx = -1; n = 180 - n; }
    const w = sp.w * (0.85 + R() * 0.3);
    const el = document.createElement("div");
    el.className = "heroJumper";
    el.style.width = w + "px";
    el.innerHTML = `<img src="${sea(sp.s)}" alt="">`;
    layer.appendChild(el);
    this.fish.push({ el, x0, D, H, T, n, sx, w, right, t0: performance.now(), out: false, back: false });
    this.step(performance.now());
  }
  step(now) {
    this.fish = this.fish.filter((f) => {
      const s = (now - f.t0) / f.T;
      if (s >= 1) { f.el.remove(); return false; }
      const x = f.x0 + f.D * s, y = this.Y0 - 4 * f.H * s * (1 - s);
      const th = (Math.atan2(-4 * f.H * (1 - 2 * s), f.D) * 180) / Math.PI;
      let rot = th - f.n;
      rot = ((rot + 540) % 360) - 180;
      f.el.style.transform = `translate(${x}px,${y}px) translate(-50%,-50%) rotate(${rot}deg) scaleX(${f.sx})`;
      if (!f.out && y < this.SURF) { f.out = true; this.splash(x, f.w); }
      if (f.out && !f.back && s > 0.5 && y > this.SURF) { f.back = true; this.splash(x, f.w * 1.2); }
      return true;
    });
  }
  splash(x, size, y = this.SURF, count = 7) {
    const layer = this.r.splashLayer.current;
    if (!layer) return;
    const k = Math.min(1.4, size / 70);
    for (let i = 0; i < count; i++) {
      const d = document.createElement("div");
      const rr = (2.4 + Math.random() * 2.4) * k;
      d.className = "heroDrop";
      d.style.width = rr * 1.6 + "px";
      d.style.height = rr * 2 + "px";
      layer.appendChild(d);
      const c = (count - 1) / 2;
      const vx = (i - c) * (9 + Math.random() * 6) * k, up = (40 + Math.random() * 50) * k, frames = [];
      for (let j = 0; j <= 10; j++) {
        const t = j / 10;
        frames.push({ transform: `translate(${x + vx * t}px,${y + 4 - up * 4 * t * (1 - t) + 30 * t * t}px)`, opacity: t > 0.85 ? 0 : 1 });
      }
      d.animate(frames, { duration: 650 + Math.random() * 250, easing: "linear" }).onfinish = () => d.remove();
    }
  }
  bulge(x) {
    const layer = this.r.splashLayer.current;
    if (!layer) return;
    const d = document.createElement("div");
    d.className = "heroBulge";
    d.style.left = x - 70 + "px";
    d.style.top = this.SURF - 26 + "px";
    layer.appendChild(d);
    d.animate(
      [{ transform: "scale(.6,0)" }, { transform: "scale(1,1)", offset: 0.3 }, { transform: "scale(1.1,.4)", offset: 0.55 }, { transform: "scale(.95,.8)", offset: 0.75 }, { transform: "scale(.6,0)" }],
      { duration: 720, easing: "ease-in-out" }
    ).onfinish = () => d.remove();
  }
  waveClick(e) {
    const L = this.r.fishLayer.current.getBoundingClientRect(), x = e.clientX - L.left;
    this.bulge(x);
    clearTimeout(this.ct);
    this.ct = setTimeout(() => this.launch({ x0: x, h: 90 + Math.random() * 90 }), 420);
  }
  fishX(fr) {
    const r = this.r.hoverFish.current.getBoundingClientRect(), L = this.r.splashLayer.current.getBoundingClientRect();
    return r.left - L.left + r.width * fr;
  }
  hoverIn() {
    clearTimeout(this.ht);
    const f = this.r.hoverFish.current;
    if (!f) return;
    const cs = getComputedStyle(f);
    const from = { transform: cs.transform === "none" ? "translateY(150px)" : cs.transform, opacity: cs.opacity };
    const wasDown = parseFloat(cs.opacity) < 0.5;
    this.fa?.cancel();
    this.imgA?.cancel();
    this.fa = f.animate([from, { transform: "translateY(0px) rotate(0deg)", opacity: 1 }], { duration: 550, easing: "cubic-bezier(.34,1.56,.64,1)", fill: "forwards" });
    if (wasDown) this.ht = setTimeout(() => this.splash(this.fishX(0.5), 70), 140);
  }
  hoverOut() {
    clearTimeout(this.ht);
    const f = this.r.hoverFish.current, img = this.r.hoverImg.current;
    if (!f || !img) return;
    const cs = getComputedStyle(f);
    if (parseFloat(cs.opacity) < 0.5) return;
    const from = { transform: cs.transform === "none" ? "translateY(0px)" : cs.transform, opacity: 1 };
    this.fa?.cancel();
    this.imgA?.cancel();
    // arcs head-first into the water, flicks its tail, dips under
    this.fa = f.animate([
      from,
      { transform: "translate(-10px,-12px) rotate(-30deg)", opacity: 1, offset: 0.2, easing: "ease-in" },
      { transform: "translate(-22px,58px) rotate(-92deg)", opacity: 1, offset: 0.48 },
      { transform: "translate(-23px,62px) rotate(-94deg)", opacity: 1, offset: 0.72, easing: "ease-in" },
      { transform: "translate(-26px,170px) rotate(-98deg)", opacity: 1, offset: 0.97 },
      { transform: "translate(-26px,175px) rotate(-98deg)", opacity: 0 },
    ], { duration: 1150, fill: "forwards" });
    this.imgA = img.animate([
      { transform: "rotate(42deg)", offset: 0 }, { transform: "rotate(42deg)", offset: 0.5 },
      { transform: "rotate(54deg)", offset: 0.58 }, { transform: "rotate(32deg)", offset: 0.66 },
      { transform: "rotate(42deg)", offset: 0.73 }, { transform: "rotate(42deg)", offset: 1 },
    ], { duration: 1150, easing: "ease-in-out" });
    this.ht = setTimeout(() => {
      this.splash(this.fishX(0.3), 60);
      this.ht = setTimeout(() => this.splash(this.fishX(0.5), 44, this.SURF, 5), 520);
    }, 330);
  }
}

function Wave({ kind }) {
  return (
    <div className={`heroWave heroWave--${kind}`}>
      <svg width="3360" height="300" viewBox="0 0 3360 300"><path d={WAVE_PATH} /></svg>
      <svg className="heroWaveNight" width="3360" height="300" viewBox="0 0 3360 300"><path d={WAVE_PATH} /></svg>
    </div>
  );
}

function HeroSection() {
  const night = useTheme() === "dark";
  const [active, setActive] = useState(null);
  const [topic, setTopic] = useState("ships");
  const activeRef = useRef(null);
  const leaveTimer = useRef(0);
  const refs = {
    fishLayer: useRef(null),
    splashLayer: useRef(null),
    hoverFish: useRef(null),
    hoverImg: useRef(null),
  };
  const ocean = useRef(null);

  useEffect(() => {
    const o = new Ocean(refs);
    ocean.current = o;
    o.start();
    return () => { o.stop(); clearTimeout(leaveTimer.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enter = (k) => {
    clearTimeout(leaveTimer.current);
    const wasActive = !!activeRef.current;
    activeRef.current = k;
    setTopic(k);
    setActive(k);
    if (!wasActive) ocean.current?.hoverIn();
  };
  const leave = () => {
    clearTimeout(leaveTimer.current);
    leaveTimer.current = setTimeout(() => {
      activeRef.current = null;
      setActive(null);
      ocean.current?.hoverOut();
    }, 180);
  };
  const diveDown = (e) => {
    e.preventDefault();
    const el = document.getElementById("work");
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 40, behavior: "smooth" });
  };

  return (
    <header className={`hero${night ? " night" : ""}`}>
      <div className="heroSky heroSky--sunset" />
      <div className="heroSky heroSky--night" />
      <div className="heroSky heroStars">
        {STARS.map((s, i) => (
          <i key={i} style={{ left: s.left, top: s.top, width: s.size, height: s.size, animationDuration: s.dur, animationDelay: s.delay }} />
        ))}
      </div>

      {CLOUDS.map((c, i) => (
        <div key={i} className="heroCloudTrack" style={{ top: c.top, animationDelay: `${c.delay}s` }}>
          <div className="heroCloudShape" style={{ width: c.w, opacity: c.o, transform: `scaleX(${c.flip})` }}>
            <div className="heroCloud" />
          </div>
        </div>
      ))}

      <div className="heroOrbTrack heroOrbTrack--sun"><div className="heroSun" /></div>
      <div className="heroOrbTrack heroOrbTrack--moon"><div className="heroMoon" /></div>
      <button
        type="button"
        className="heroSunCloud"
        onClick={toggleTheme}
        title={night ? "Bring back the sun" : "Watch the sunset"}
        aria-label={night ? "Switch to day" : "Switch to night"}
      >
        <span className="heroHint" aria-hidden="true" style={{ marginTop: "8px", marginLeft: "4px" }}>
          <svg width="26" height="20" viewBox="0 0 26 20"><path d="M22 20 C14 18 8 12 6 3 M6 3 L2 9 M6 3 L11 7" /></svg>
          <span>{night ? "watch the sunrise" : "watch the sunset"}</span>
        </span>
        <span className="heroSunCloudShape"><span className="heroCloud" /><span className="heroCloud heroCloud--night" /></span>
        <svg className="heroCloudTrace" viewBox="0 0 253 141" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <defs>
            <mask id="heroCloudGap" maskUnits="userSpaceOnUse" x="-20" y="-20" width="293" height="181">
              <rect x="-20" y="-20" width="293" height="181" fill="#ffffff" />
              <path d={CLOUD_PATH} fill="#000" stroke="#000" strokeWidth="3.6" />
            </mask>
          </defs>
          <g mask="url(#heroCloudGap)">
            <path className="heroCloudTrace__base" pathLength="100" d={CLOUD_PATH} />
            <path className="heroCloudTrace__run" pathLength="100" d={CLOUD_PATH} />
          </g>
        </svg>
      </button>

      <Wave kind="back" />
      <Wave kind="mid" />
      <div ref={refs.fishLayer} className="heroLayer heroLayer--fish" />
      <div ref={refs.hoverFish} className="heroHoverFish">
        <img ref={refs.hoverImg} src={sea("roundfish")} alt="" />
      </div>
      <Wave kind="front" />
      <div className="heroWaterHit" onClick={(e) => ocean.current?.waveClick(e)} />
      <div ref={refs.splashLayer} className="heroLayer heroLayer--splash" />

      <div className="heroContent">
        <div className="heroLabel">PRODUCT DESIGNER ✦ ENGINEER</div>
        <h1 className="heroName">Winnie Chan</h1>
        <p className="heroTagline">
          is a designer that develops and{" "}
          <span className={`heroHot${active === "ships" ? " isActive" : ""}`} onMouseEnter={() => enter("ships")} onMouseLeave={leave}>
            ships meaningful experiences
          </span>{" "}
          with{" "}
          <span className={`heroHot${active === "depth" ? " isActive" : ""}`} onMouseEnter={() => enter("depth")} onMouseLeave={leave}>
            depth
          </span>
          .
        </p>
        <a href="#work" className="heroDive" onClick={diveDown}>dive down into my projects</a>
      </div>

      <div className={`heroBubble${active ? " isOn" : ""}`} aria-live="polite">
        <svg width="400" height="120" viewBox="0 0 400 120">
          <path d={BUBBLE_PATH} className="heroBubbleFill" />
          <path d={BUBBLE_PATH} className="heroBubbleStroke" pathLength="1" />
        </svg>
        <div className="heroBubbleText">{BUBBLE[topic]}</div>
      </div>
    </header>
  );
}

export default HeroSection;
