import { useEffect, useRef, useState } from "react";
import "./scrollSteps.css";

export const ScrollSteps = ({ eyebrow = "Overview", steps }) => {
  const trackRef = useRef(null);
  const [step, setStep] = useState(0);

  // Work out which step we're on from how far the user has scrolled through the section
  useEffect(() => {
    const onScroll = () => {
      const el = trackRef.current;
      if (!el) return;
      const total = el.offsetHeight - window.innerHeight;
      const p = Math.min(Math.max(-el.getBoundingClientRect().top / total, 0), 0.9999);
      setStep(Math.floor(p * steps.length));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [steps.length]);

  // Restart and play the current video; pause the others after they slide away
  useEffect(() => {
    const vids = trackRef.current?.querySelectorAll("video") ?? [];
    const timers = [];
    vids.forEach((v, i) => {
      v.muted = true;
      v.playsInline = true;
      if (i === step) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        timers.push(setTimeout(() => v.pause(), 700));
      }
    });
    return () => timers.forEach(clearTimeout);
  }, [step]);

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / steps.length);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const state = (i) => (i === step ? "is-active" : i < step ? "is-past" : "is-next");

  return (
    <div ref={trackRef} className="ss-track" style={{ height: `${steps.length * 100}vh` }}>
      <div className="ss-sticky">
        <div className="ss-grid">
          <div className="ss-text">
            <div className="cs-eyebrow">{eyebrow}</div>
            <div className="ss-copy">
              {steps.map((s, i) => (
                <div key={i} className={`ss-step ${state(i)}`} aria-hidden={i !== step}>
                  <h2 className="ss-title">{s.title}</h2>
                  <p className="ss-body">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="ss-dots">
              {steps.map((s, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={s.title} className={i === step ? "active" : ""}>
                  <span />
                </button>
              ))}
            </div>
          </div>

          <div className="ss-phone-wrap">
            <div className="ss-phone">
              <div className="ss-screen">
                {steps.map((s, i) => (
                  <video
                    key={i}
                    src={s.video}
                    className={`ss-video ${s.crop ? "crop" : ""} ${i <= step ? "in" : ""}`}
                    style={{ zIndex: i + 1 }}
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};