import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation, useNavigate } from "react-router-dom";
import fishLogo from "../assets/sea/roundfish-gold.png";
import hookFish from "../assets/sea/hookfish.png";
import "./style.css"; // global site styles (centerFlex etc.) — keep this
import "./footer.css";

const MY_EMAIL = "wc679@cornell.edu";

// Opens a Gmail compose window pre-filled with what the visitor typed.
const gmailUrl = ({ name, email, msg }) => {
  const subject = `Message in a bottle from ${name || email}`;
  const body = `${msg}\n\n— ${name ? name + " · " : ""}${email}`;
  const q = new URLSearchParams({ view: "cm", fs: "1", to: MY_EMAIL, su: subject, body });
  return `https://mail.google.com/mail/?${q.toString()}`;
};

const NAV = [
  { label: "Home", to: "/" },
  { label: "Work", target: "work" },
  { label: "About", to: "/about" },
  { label: "Explorations", to: "/explorations" },
];
const PROJECTS = [
  { label: "BeeWitched", to: "https://store.steampowered.com/app/4811560/BeeWitched/" },
  { label: "YouTube Creator’s Cuts", to: "/creator-cuts" },
  { label: "Oh-My-Camel", to: "/oh-my-camel" },
  { label: "Cornell GO", to: "/CornellGO" },
  { label: "Qu-wack a Mole", to: "/quack-a-goose" },
  { label: "Loop", to: "/Loop" },
  { label: "Sustainabytes", to: "https://sustainabytes.org" },
  { label: "FamJam", to: "/FamJam" },
];

const RIPPLE_MASK = "radial-gradient(ellipse 80% 95% at 70% 0%,#000 45%,transparent 100%)";

function drawRipple(cv, time) {
  if (!cv) return;
  const ctx = cv.getContext("2d"), W = cv.width, H = cv.height, img = ctx.createImageData(W, H), d = img.data, TAU = Math.PI * 2, inten = 0.005;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const px = (x / W * 1.4) * TAU - 250, py = (y / H * 0.6) * TAU - 250;
    let ix = px, iy = py, c = 1;
    for (let n = 0; n < 4; n++) {
      const t = time * (1 - 3.5 / (n + 1));
      const nx = px + Math.cos(t - ix) + Math.sin(t + iy), ny = py + Math.sin(t - iy) + Math.cos(t + ix);
      ix = nx; iy = ny;
      const ax = px / (Math.sin(ix + t) / inten), ay = py / (Math.cos(iy + t) / inten);
      c += 1 / Math.sqrt(ax * ax + ay * ay);
    }
    c = 1.17 - Math.pow(c / 4, 1.4);
    const k = (y * W + x) * 4;
    d[k] = 205; d[k + 1] = 236; d[k + 2] = 255; d[k + 3] = Math.min(1, Math.pow(Math.abs(c), 8)) * 190;
  }
  ctx.putImageData(img, 0, 0);
}

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });
  const [toast, setToast] = useState("");

  const r = {
    ripple: useRef(), ripple2: useRef(), rays: useRef(), bubbles: useRef(),
    hookLayer: useRef(), hook: useRef(), hookBob: useRef(),
    bottleFly: useRef(), bottleBob: useRef(), cork: useRef(), paper: useRef(),
    overlay: useRef(), card: useRef(),
  };
  const st = useRef({ anims: [], bubs: 0, corked: true, busy: false, anim: false, sending: false });

  const valid = /\S+@\S+\.\S+/.test(form.email) && form.msg.trim().length > 0;

  useEffect(() => {
    const s = st.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    drawRipple(r.ripple.current, 31);
    drawRipple(r.ripple2.current, 47);
    if (!reduce) [r.ripple.current, r.ripple2.current].forEach((cv, i) => cv && s.anims.push(cv.animate(
      [{ opacity: 0.55, translate: "0 0" }, { opacity: 1, translate: `${i ? -18 : 18}px 0` }, { opacity: 0.55, translate: "0 0" }],
      { duration: 7000 + i * 2500, iterations: Infinity, easing: "ease-in-out" })));

    const L = r.rays.current;
    [[8, 70, 300, -14, 7], [19, 46, 220, -10, 9], [31, 90, 340, -16, 8], [44, 54, 240, -12, 11], [57, 80, 320, -15, 7.5], [69, 40, 200, -9, 10], [80, 74, 300, -13, 8.5], [92, 50, 230, -11, 9.5]]
      .forEach(([x, w, len, sk, dur], i) => {
        const ray = document.createElement("div");
        ray.className = "footRay";
        ray.style.cssText = `left:${x}%;width:${w}px;height:${len}px;transform:skewX(${sk - 10}deg);`;
        L.appendChild(ray);
        s.anims.push(ray.animate([{ opacity: 0 }, { opacity: 1, offset: 0.35 }, { opacity: 0.55, offset: 0.6 }, { opacity: 0 }],
          { duration: dur * 1000, iterations: Infinity, easing: "ease-in-out", delay: -((i * 2.7) % dur) * 1000 }));
      });

    if (r.hookBob.current) s.hookBobA = r.hookBob.current.animate(
      [{ transform: "translateY(0) rotate(-2deg)" }, { transform: "translateY(12px) rotate(2deg)" }, { transform: "translateY(0) rotate(-2deg)" }],
      { duration: 6000, iterations: Infinity, easing: "ease-in-out" });
    if (r.bottleFly.current) s.bottleBobA = r.bottleFly.current.animate(
      [{ transform: "translateY(0) rotate(-3deg)" }, { transform: "translateY(-10px) rotate(4deg)" }, { transform: "translateY(0) rotate(-3deg)" }],
      { duration: 4200, iterations: Infinity, easing: "ease-in-out", composite: "add" });

    const spawn = (initial) => {
      const B = r.bubbles.current; if (!B) return;
      const R = Math.random, H = B.clientHeight || 780, size = 10 + R() * 22;
      const b = document.createElement("div");
      b.className = "footBubble";
      b.style.cssText = `left:${4 + R() * 92}%;width:${size}px;height:${size}px;margin:-${size / 2}px 0 0 -${size / 2}px;`;
      B.appendChild(b); s.bubs++;
      const dur = (11 + R() * 9) * 1000, sway = 10 + R() * 18, frames = [];
      for (let j = 0; j <= 12; j++) {
        const t = j / 12;
        frames.push({ transform: `translate(${Math.sin(t * Math.PI * 4) * sway}px,${H + 30 - t * (H + 80)}px)`, opacity: t < 0.05 ? t * 20 : t > 0.9 ? (1 - t) * 10 : 1 });
      }
      const a = b.animate(frames, { duration: dur, easing: "linear", delay: initial ? -R() * dur : 0, fill: "both" });
      let done = false;
      const kill = () => { if (done) return; done = true; s.bubs--; b.remove(); };
      a.onfinish = kill;
      b.addEventListener("click", () => {
        if (done) return;
        const tf = getComputedStyle(b).transform;
        a.cancel(); b.style.transform = tf; b.style.pointerEvents = "none";
        b.animate([{ transform: tf + " scale(1)", opacity: 1 }, { transform: tf + " scale(1.5)", opacity: 0 }], { duration: 180, easing: "ease-out", fill: "forwards" }).onfinish = kill;
        const m = new DOMMatrix(tf), cx = b.offsetLeft + m.e, cy = m.f;
        for (let i = 0; i < 8; i++) {
          const p = document.createElement("div"), ang = i / 8 * Math.PI * 2 + R() * 0.4, dist = size * (0.8 + R() * 0.6), ps = 2 + R() * 2.5;
          p.className = "footDroplet";
          p.style.cssText = `left:${cx}px;top:${cy}px;width:${ps}px;height:${ps}px;margin:-${ps / 2}px;`;
          B.appendChild(p);
          p.animate([{ transform: "translate(0,0)", opacity: 1 }, { transform: `translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist}px)`, opacity: 0 }],
            { duration: 380 + R() * 160, easing: "cubic-bezier(.2,.7,.4,1)" }).onfinish = () => p.remove();
        }
      });
    };
    if (!reduce) {
      for (let i = 0; i < 16; i++) spawn(true);
      s.bt = setInterval(() => { if (s.bubs < 16 && !document.hidden) spawn(false); }, 900);
    }

    return () => {
      clearInterval(s.bt); clearTimeout(s.hk); clearTimeout(s.tt);
      s.anims.forEach((a) => a.cancel()); s.anims = [];
      if (L) L.innerHTML = "";
      if (r.bubbles.current) r.bubbles.current.innerHTML = "";
      s.bubs = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (open && r.card.current) r.card.current.animate(
      [{ transform: "translateY(30px) rotate(-4deg) scale(.92)", opacity: 0 }, { transform: "rotate(-1deg)", opacity: 1 }],
      { duration: 420, easing: "cubic-bezier(.2,.9,.3,1.2)" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  /* ---------- hook: catch a fish, then back to top ---------- */
  const catchFish = () => {
    const s = st.current;
    if (s.busy) return;
    const L = r.hookLayer.current, hk = r.hook.current, bob = r.hookBob.current; if (!L || !hk) return;
    s.busy = true;
    const Lr = L.getBoundingClientRect(), br = bob.getBoundingClientRect();
    const bx = br.left - Lr.left + 20, by = br.top - Lr.top + 179;
    const w = 76, fh = w * 0.6;
    const fish = document.createElement("div");
    fish.className = "footCaught";
    fish.style.width = w + "px";
    fish.innerHTML = `<img src="${hookFish}" alt="" />`;
    L.appendChild(fish);
    const ex = bx - w, ey = by - fh / 2, sx = -w - 20, sy = Math.min(L.clientHeight - fh - 40, by + 180);
    const frames = [];
    for (let j = 0; j <= 16; j++) {
      const t = j / 16, e = 1 - Math.pow(1 - t, 2);
      const x = sx + (ex - sx) * e, y = sy + (ey - sy) * (t * t * (3 - 2 * t)) + Math.sin(t * Math.PI * 3) * 10 * (1 - t);
      frames.push({ transform: `translate(${x}px,${y}px) rotate(${-12 * (1 - t) + Math.sin(t * 20) * 4}deg)` });
    }
    fish.animate(frames, { duration: 800, easing: "linear", fill: "forwards" }).onfinish = () => {
      s.hookBobA?.pause();
      const lift = by + 160;
      hk.animate([{ transform: "translateY(0)" }, { transform: "translateY(10px)", offset: 0.12 }, { transform: `translateY(${-lift}px)` }],
        { duration: 1100, easing: "cubic-bezier(.5,0,.6,1)", fill: "forwards" });
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 450);
      
      fish.animate([0, 0.12, 0.3, 0.5, 0.7, 1].map((o, i) => ({
        offset: o,
        transform: `translate(${ex}px,${ey + (o === 0 ? 0 : o === 0.12 ? 10 : -lift * ((o - 0.12) / 0.88) ** 1.6)}px) rotate(${o === 0 ? 0 : (i % 2 ? -1 : 1) * 14 - 50}deg)`,
      })), { duration: 1100, easing: "linear", fill: "forwards" });
      s.hk = setTimeout(() => {
        fish.remove();
        hk.animate([{ transform: `translateY(${-lift}px)` }, { transform: "translateY(0)" }],
          { duration: 1400, easing: "cubic-bezier(.3,.7,.4,1)", fill: "forwards" }).onfinish = () => { s.hookBobA?.play(); s.busy = false; };
      }, 1150);
    };
  };

  /* ---------- bottle ---------- */
  const uncork = () => {
    const s = st.current, k = r.cork.current;
    if (!k || !s.corked) return Promise.resolve();
    s.corked = false;
    return k.animate([
      { transform: "translate(0,0) rotate(0) scaleX(1)" },
      { transform: "translate(0,-2px) rotate(0) scaleX(.6)", offset: 0.15 },
      { transform: "translate(0,-4px) rotate(0) scaleX(1)", offset: 0.3 },
      { transform: "translate(0,-6px) rotate(0) scaleX(.6)", offset: 0.45 },
      { transform: "translate(0,-8px) rotate(0) scaleX(1)", offset: 0.6 },
      { transform: "translate(-14px,-40px) rotate(-70deg) scaleX(1)", offset: 0.82 },
      { transform: "translate(-26px,-30px) rotate(-110deg) scaleX(1)" },
    ], { duration: 750, easing: "ease-out", fill: "forwards" }).finished;
  };
  const recork = () => {
    const s = st.current, k = r.cork.current;
    if (!k || s.corked) return Promise.resolve();
    s.corked = true;
    return k.animate([
      { transform: "translate(-26px,-30px) rotate(-110deg)" },
      { transform: "translate(-8px,-46px) rotate(-30deg)", offset: 0.45 },
      { transform: "translate(0,-8px) rotate(0)", offset: 0.75 },
      { transform: "translate(0,2px) rotate(0) scaleY(.85)", offset: 0.88 },
      { transform: "translate(0,0) rotate(0) scaleY(1)" },
    ], { duration: 600, easing: "cubic-bezier(.4,0,.3,1)", fill: "forwards" }).finished;
  };

  const openNote = async (e) => {
    e?.preventDefault();
    const s = st.current;
    if (open || s.anim) return;
    s.anim = true;
    await uncork();
    if (r.paper.current) r.paper.current.style.opacity = "0";
    s.anim = false;
    setOpen(true);
  };
  const closeNote = () => {
    if (st.current.sending) return;
    setOpen(false);
    if (r.paper.current) r.paper.current.style.opacity = "1";
    setTimeout(recork, 150);
  };

  const showToast = (text, url) => {
    setToast({ text, url });
    clearTimeout(st.current.tt);
    st.current.tt = setTimeout(() => setToast(""), url ? 12000 : 5000);
  };

  const sail = (name, url) => {
    const f = r.bottleFly.current;
    f.animate([{ transform: "translate(0,0) scale(1.1)" }, { transform: "translate(-20px,10px) scale(1)", offset: 0.15 }, { transform: "translate(60vw,-120px) rotate(30deg)", opacity: 0 }],
      { duration: 1600, easing: "cubic-bezier(.6,0,.4,1)", fill: "forwards" }).onfinish = () => {
      // Bottle is off-screen: open the pre-filled Gmail draft.
      const win = window.open(url, "_blank");
      if (win) win.opener = null;
      else showToast(`Your bottle is ready${name ? `, ${name.split(" ")[0]}` : ""}! Your browser blocked the new tab.`, url);
      f.animate([{ transform: "translateY(60px)", opacity: 0 }, { transform: "translateY(0)", opacity: 1 }],
        { duration: 900, easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" });
    };
    showToast(`Your bottle is drifting to Gmail${name ? `, ${name.split(" ")[0]}` : ""}. Hit send there and it's on its way!`);
  };

  const send = (e) => {
    e.preventDefault();
    const s = st.current;
    if (!valid || s.sending) return;
    s.sending = true;
    const { name, email, msg } = form;

    const url = gmailUrl({ name, email, msg });

    const c = r.card.current, cr = c.getBoundingClientRect();
    const rollH = 34, ease = "cubic-bezier(.45,0,.4,1)";
    s.bottleBobA?.pause();

    const roll = document.createElement("div");
    roll.className = "footRoll";
    roll.style.cssText = `left:${cr.left + cr.width / 2}px;top:${cr.bottom}px;width:${cr.width + 8}px;height:${rollH}px;border-radius:${rollH / 2}px;`;
    const flat = document.createElement("div"); flat.className = "footRollFlat";
    const tie = document.createElement("div"); tie.className = "footRollTie";
    roll.append(flat, tie);
    document.body.appendChild(roll);

    c.style.transform = "none";
    c.animate([{ clipPath: "inset(0 0 0 0)" }, { clipPath: "inset(0 0 100% 0)" }], { duration: 750, easing: ease, fill: "forwards" });
    roll.animate([{ top: cr.bottom + "px", height: rollH + "px" }, { top: cr.top + "px", height: "40px" }], { duration: 750, easing: ease, fill: "forwards" }).onfinish = () => {
      r.overlay.current?.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 450, fill: "forwards" });
      const p = r.paper.current, m = p.getScreenCTM();
      const pc = new DOMPoint(40, 111).matrixTransform(m);
      const sc = Math.hypot(m.a, m.b), ang = Math.atan2(m.b, m.a) * 180 / Math.PI;
      const rFinal = ang + 90, rad = ang * Math.PI / 180;
      const Lw = 54 * sc, Th = 30 * sc, cx = cr.left + cr.width / 2;
      const ux = Math.sin(rad), uy = -Math.cos(rad);
      const hiX = pc.x + ux * 150 * sc, hiY = pc.y + uy * 150 * sc, nkX = pc.x + ux * 92 * sc, nkY = pc.y + uy * 92 * sc;
      const thin = 11 * sc, longW = 46 * sc;
      tie.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, delay: 250, fill: "forwards" });
      flat.animate([{ opacity: 0 }, { opacity: 0, offset: 0.82 }, { opacity: 1 }], { duration: 1800, fill: "forwards" });
      roll.animate([
        { left: cx + "px", top: cr.top + "px", width: cr.width + 8 + "px", height: "40px", borderRadius: "20px", boxShadow: "0 6px 14px rgba(0,0,0,.25)", transform: "translate(-50%,-50%) rotate(0deg)", offset: 0 },
        { left: cx + "px", top: cr.top + "px", width: "96px", height: "40px", borderRadius: "20px", boxShadow: "0 6px 14px rgba(0,0,0,.25)", transform: "translate(-50%,-50%) rotate(0deg)", offset: 0.22 },
        { left: hiX + "px", top: hiY + "px", width: longW + "px", height: thin + "px", borderRadius: thin / 2 + "px", boxShadow: "0 3px 6px rgba(0,0,0,.2)", transform: `translate(-50%,-50%) rotate(${rFinal}deg)`, offset: 0.55 },
        { left: nkX + "px", top: nkY + "px", width: longW + "px", height: thin + "px", borderRadius: thin / 2 + "px", boxShadow: "0 1px 2px rgba(0,0,0,.15)", transform: `translate(-50%,-50%) rotate(${rFinal}deg)`, offset: 0.66 },
        { left: pc.x + "px", top: pc.y + "px", width: longW + "px", height: thin + "px", borderRadius: thin / 2 + "px", boxShadow: "0 0 0 rgba(0,0,0,0)", transform: `translate(-50%,-50%) rotate(${rFinal}deg)`, offset: 0.82 },
        { left: pc.x + "px", top: pc.y + "px", width: Lw + "px", height: Th + "px", borderRadius: 4 * sc + "px", boxShadow: "0 0 0 rgba(0,0,0,0)", transform: `translate(-50%,-50%) rotate(${rFinal}deg)`, offset: 1 },
      ], { duration: 1800, easing: "cubic-bezier(.4,0,.3,1)", fill: "forwards" }).onfinish = async () => {
        p.style.opacity = "1";
        roll.remove();
        setOpen(false);
        setForm({ name: "", email: "", msg: "" });
        await recork();
        s.bottleBobA?.play();
        s.sending = false;
        sail(name, url);
      };
    };
  };

  const goTo = (item) => (e) => {
    if (item.target) {
      e.preventDefault();
      if (location.pathname === "/") {
        const el = document.getElementById(item.target);
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY, behavior: "smooth" });
      } else {
        sessionStorage.setItem("scrollTarget", item.target);
        navigate("/");
      }
    } else if (item.to === location.pathname) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="footReveal">
      <div className="footFixed">
        <div className="footSea">
          <canvas ref={r.ripple2} width="200" height="100" className="footRipple footRippleLeft" style={{ WebkitMaskImage: RIPPLE_MASK, maskImage: RIPPLE_MASK }} />
          <canvas ref={r.ripple} width="200" height="100" className="footRipple footRippleRight" style={{ WebkitMaskImage: RIPPLE_MASK, maskImage: RIPPLE_MASK }} />
          <div ref={r.rays} className="footLayer" />

          <div ref={r.hookLayer} className="footLayer footHookLayer">
            <div ref={r.hook} className="footHook">
              <div ref={r.hookBob} className="footHookBob" onClick={catchFish} title="Cast the line">
                <div className="footHookLine" />
                <svg width="84" height="210" viewBox="0 0 60 150">
                  <path d="M30 0 V44" stroke="rgba(255,255,255,.85)" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d="M25.5 18.8 L34.5 21.2" stroke="rgba(255,255,255,.85)" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d="M25.5 22.8 L34.5 25.2" stroke="rgba(255,255,255,.85)" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d="M25.5 26.8 L34.5 29.2" stroke="rgba(255,255,255,.85)" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <path d="M25.5 30.8 L34.5 33.2" stroke="rgba(255,255,255,.85)" strokeWidth="2.6" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                  <ellipse cx="30" cy="44.2" rx="1.3" ry="1.9" fill="rgba(255,255,255,.85)" />
                  <circle cx="30" cy="43" r="5" fill="none" stroke="rgb(214,226,240)" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                  <path d="M30 48 V114 C30 138 4 138 4 116 V108" fill="none" stroke="rgb(214,226,240)" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
                  <path d="M2.9 108.5 L4 99.5 L5.1 108.5 Z" fill="rgb(214,226,240)" />
                  <path d="M4.8 117 Q8 113.2 12.5 112.6 Q8.6 115.6 5.6 120 Z" fill="rgb(214,226,240)" />
                </svg>
                <div className="footHookLabel">back to top</div>
              </div>
            </div>
          </div>

          <div ref={r.bubbles} className="footLayer footBubbles" />

          <div className="footContent">
            <Link to="/" onClick={goTo({ to: "/" })} className="footBrand">
              <img src={fishLogo} alt="" />
              <span>Winnie Chan</span>
            </Link>

            <div className="footBottom">
              <div className="footBottle">
                <div className="footBottleText">
                  <div className="footBottleTitle">Send me a message</div>
                  <div className="footBottleSub">Write a note, cork it, and send it from Gmail</div>
                  <svg width="56" height="22" viewBox="0 0 56 22"><path d="M2 4 C18 18 34 20 50 12 M44 6 L51 12 L43 16" fill="none" stroke="rgb(190,210,235)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <div ref={r.bottleFly}>
                  <button ref={r.bottleBob} onClick={openNote} className="footBottleBtn" title="Write to Winnie" aria-label="Write Winnie an email">
                    <svg width="78" height="156" viewBox="0 0 80 160">
                      <path d="M30 46 C30 58 12 62 12 82 V142 Q12 154 24 154 H56 Q68 154 68 142 V82 C68 62 50 58 50 46 Z" fill="rgba(170,215,240,.22)" stroke="rgba(220,240,255,.75)" strokeWidth="2" />
                      <rect x="30" y="18" width="20" height="30" rx="4" fill="rgba(170,215,240,.22)" stroke="rgba(220,240,255,.75)" strokeWidth="2" />
                      <g ref={r.cork} style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }}>
                        <rect x="31" y="4" width="18" height="18" rx="3" fill="rgb(176,128,84)" />
                        <path d="M34 9 H46 M34 13 H46 M34 17 H46" stroke="rgb(140,98,62)" strokeWidth="1.2" />
                      </g>
                      <g ref={r.paper} transform="rotate(-8 40 112)">
                        <rect x="25" y="84" width="30" height="54" rx="4" fill="rgb(240, 235, 219)" />
                        <path d="M25 110 H55" stroke="rgb(186,72,72)" strokeWidth="2.5" />
                      </g>
                      <path d="M20 92 V136" stroke="rgba(255,255,255,.55)" strokeWidth="3" strokeLinecap="round" />
                    </svg>
                  </button>
                </div>
                {toast && (
                  <div className="footToast">
                    {toast.text}
                    {toast.url && <a className="footToastLink" href={toast.url} target="_blank" rel="noreferrer" onClick={() => setToast("")}>Open Gmail</a>}
                  </div>
                )}
              </div>

              <nav className="footCols">
                <div className="footCol">
                  <h4>Navigation</h4>
                  <ul>
                    {NAV.map((n) => (
                      <li key={n.label}><Link to={n.to || "/"} onClick={goTo(n)}>{n.label}</Link></li>
                    ))}
                  </ul>
                </div>
                <div className="footCol">
                  <h4>Projects</h4>
                  <ul className="footProjectGrid">
                    {PROJECTS.map((p) => (
                      <li key={p.label}>
                        {p.to.startsWith("https")
                          ? <a href={p.to} target="_blank" rel="noopener noreferrer">{p.label}</a>
                          : <Link to={p.to}>{p.label}</Link>}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="footCol">
                  <h4>Links</h4>
                  <ul>
                    <li><a href="https://github.com/WinnieC180" target="_blank" rel="noreferrer">GitHub</a></li>
                    <li><a href="https://www.linkedin.com/in/winnie-chan8/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                    <li><a href={`mailto:${MY_EMAIL}`} onClick={openNote}>Email</a></li>
                  </ul>
                </div>
              </nav>

              <p className="footCopy">© 2026 Winnie Chan | Made with React.js, Figma, &amp; the support of some amazing individuals!</p>
            </div>
          </div>
        </div>
      </div>

      {open && createPortal(
        <div ref={r.overlay} className="footOverlay" onClick={closeNote}>
          <form ref={r.card} className="footNote" onClick={(e) => e.stopPropagation()} onSubmit={send}>
            <button type="button" className="footNoteClose" onClick={closeNote} aria-label="Close">×</button>
            <div className="footNoteHead">
              <div className="footNoteTitle">A message in a bottle</div>
              <div className="footNoteTo">To: Winnie · {MY_EMAIL}</div>
            </div>
            <div className="footNoteRow">
              <label>Your name
                <input value={form.name} onChange={set("name")} placeholder="Hello :)" />
              </label>
              <label>Your email
                <input type="email" value={form.email} onChange={set("email")} placeholder="example@email.com" required />
              </label>
            </div>
            <label>Message
              <textarea value={form.msg} onChange={set("msg")} rows="5" placeholder="Ask away!" required />
            </label>
            <div className="footNoteFoot">
              <div className="footNoteHint">{valid ? "Opens in Gmail, ready to send" : "Add your email and a message"}</div>
              <button type="submit" className="footNoteSend" style={{ opacity: valid ? 1 : 0.45 }}>Cork it &amp; send</button>
            </div>
          </form>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Footer;
