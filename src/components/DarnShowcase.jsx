import { useEffect, useRef, useState } from "react";
import "./darnShowcase.css";

const clamp = (v) => Math.min(Math.max(v, 0), 1);
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function DarnShowcase({ eyebrow, heading, content, showcase }) {
  const { mockup, frame, flyScreen, flows } = showcase;
  const ovRef = useRef(null);
  const trackRef = useRef(null);
  const mockRef = useRef(null);
  const lapRef = useRef(null);
  const screenRef = useRef(null);
  const vidRefs = useRef([]);
  const [demo, setDemo] = useState(0);
  const [s, setS] = useState({ ov: 0, dm: 0, t: 0, fly: null });

  useEffect(() => {
    const prog = (el) => {
      if (!el) return 0;
      const vh = window.innerHeight;
      return clamp((vh - el.getBoundingClientRect().top) / (vh * 0.75));
    };
    const onScroll = () => {
      const sy = window.scrollY, vh = window.innerHeight;
      const m = mockRef.current, l = lapRef.current, tr = trackRef.current;
      let t = 0, fly = null;
      if (m && l && tr) {
        const mr = m.getBoundingClientRect();
        const lr = l.getBoundingClientRect();
        const trTop = tr.getBoundingClientRect().top;
        // Where the laptop sits once the demo section is pinned
        const finalTop = lr.top - Math.max(trTop, 0);
        // Start: mockup centered on screen. End: demo section pinned.
        const s0 = mr.top + sy + mr.height / 2 - vh / 2;
        const s1 = trTop + sy;
        t = s1 > s0 ? clamp((sy - s0) / (s1 - s0)) : 1;
        const e = easeInOut(t);
        const lerp = (a, b) => a + (b - a) * e;
        fly = {
          left: lerp(mr.left, lr.left),
          top: lerp(vh / 2 - mr.height / 2, finalTop),
          width: lerp(mr.width, lr.width),
          e,
        };
      }
      setS({ ov: prog(ovRef.current), dm: prog(trackRef.current), t, fly });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    if (screenRef.current) screenRef.current.scrollTop = 0;
    vidRefs.current.forEach((v, i) => {
      if (!v) return;
      v.muted = true;
      if (i === demo) { v.currentTime = 0; v.play().catch(() => {}); }
      else v.pause();
    });
  }, [demo]);

  const o = easeOut(s.ov);
  const d = easeOut(s.dm);
  const fe = s.fly ? s.fly.e : 0;
  const flying = s.fly && s.t > 0 && s.t < 1;
  const tabsIn = s.t >= 1;

  return (
    <>
      {/* Overview: text + angled laptop mockup */}
      <div ref={ovRef} className="ds-overview">
        <div className="ds-text" style={{ opacity: o, transform: `translateY(${(1 - o) * 50}px)` }}>
          <div className="cs-eyebrow">{eyebrow}</div>
          {heading && <h2 className="cs-heading">{heading}</h2>}
          {content.map((item, i) => <p key={i} className="cs-body">{item.value}</p>)}
        </div>
        <div ref={mockRef} className="ds-mock">
          <img
            src={mockup}
            alt="DARN website on a laptop"
            style={{
              opacity: s.t > 0 ? 0 : o,
              transform: `translateX(${(1 - o) * 30}%) rotate(${(1 - o) * 6}deg) scale(${0.85 + o * 0.15})`,
            }}
          />
        </div>
      </div>

      {/* Morph layer: angled mockup turns into the front-facing MacBook */}
      {flying && (
        <div className="ds-fly" style={{ left: s.fly.left, top: s.fly.top, width: s.fly.width }}>
          <img
            src={mockup}
            alt=""
            className="ds-fly-mock"
            style={{ opacity: Math.max(0, 1 - fe * 1.6), transform: `rotateY(${fe * 25}deg)` }}
          />
          <div
            className="ds-fly-frame"
            style={{
              opacity: clamp((fe - 0.25) * 1.6),
              transform: `rotateY(${(1 - fe) * -25}deg) scale(${0.92 + fe * 0.08})`,
            }}
          >
            <img src={frame} alt="" className="ds-frame-img" />
            {flyScreen && <img src={flyScreen} alt="" className="ds-screen ds-screen-img" />}
          </div>
        </div>
      )}

      {/* Demo: tall track so the section stays pinned after the laptop lands */}
      <div id="demo" ref={trackRef} className="ds-demo-track">
        <div className="ds-demo">
          <div className="ds-demo-left">
            <div className="ds-demo-word" style={{ opacity: d, transform: `translateY(${(1 - d) * 80}px)` }}>DEMO</div>
            <div ref={lapRef} className="ds-laptop" style={{ opacity: s.t >= 1 ? 1 : 0 }}>
              <img src={frame} alt="" className="ds-frame-img" />
              <div ref={screenRef} className="ds-screen">
                {flows.map((f, i) =>
                  f.video ? (
                    <video
                      key={f.label}
                      ref={(el) => (vidRefs.current[i] = el)}
                      src={f.video}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      className="ds-video"
                      style={{
                        opacity: i === demo ? 1 : 0,
                        top: f.cropTop ? `-${f.cropTop}%` : 0,
                        height: f.cropTop ? `${100 + f.cropTop}%` : "100%",
                      }}                    />
                  ) : (
                    i === demo && <img key={f.label} src={f.image} alt={f.label} className="ds-screen-full" />
                  )
                )}
              </div>
            </div>
          </div>

          <div className="ds-tabs">
            <div className="ds-tabs-label" style={{ opacity: tabsIn ? 1 : 0 }}>Choose a flow</div>
            {flows.map((f, i) => (
              <button
                key={f.label}
                onClick={() => setDemo(i)}
                className={i === demo ? "ds-tab active" : "ds-tab"}
                style={{
                  opacity: tabsIn ? 1 : 0,
                  transform: `translateX(${tabsIn ? 0 : 40}px)`,
                  transitionDelay: `0s, 0s, 0s, ${i * 0.1}s, ${i * 0.1}s`,
                }}
              >
                <span className="ds-tab-num">0{i + 1}</span>
                <span className="ds-tab-label">{f.label}</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="ds-tab-arrow">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}