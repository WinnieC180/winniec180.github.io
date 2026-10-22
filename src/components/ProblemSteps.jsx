import { useEffect, useRef, useState } from "react";
import "./problemSteps.css";

export const ProblemSteps = ({ eyebrow = "Problem", steps }) => {
  const trackRef = useRef(null);
  const [step, setStep] = useState(0);

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

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    const top = el.getBoundingClientRect().top + window.scrollY + total * ((i + 0.5) / steps.length);
    window.scrollTo({ top, behavior: "smooth" });
  };

  const state = (i) => (i === step ? "is-active" : i < step ? "is-past" : "is-next");

  return (
    <div ref={trackRef} className="ps-track" style={{ height: `${steps.length * 100}vh` }}>
      <div className="ps-sticky">
        <div className="ps-grid">
          <div className="ps-text">
            <div className="cs-eyebrow">{eyebrow}</div>

            <h2 className={`ps-title step-${step}`}>
              What’s{" "}
              <span className="ps-slot ps-the"><span className="ps-pop">the </span></span>
              <span className="ps-slot ps-my">
                <span className="ps-my-word">my<span className="ps-strike" /></span>{" "}
              </span>
              <span className="ps-problem">problem</span>
              <span className="ps-slot ps-space"><span className="ps-pop"> space</span></span>?
            </h2>

            <div className="ps-copy">
              {steps.map((s, i) => (
                <div key={i} className={`ps-step ${state(i)}`} aria-hidden={i !== step}>
                  <p className="ps-body">{s.body}</p>
                  {s.list && (
                    <ol className="ps-list">
                      {s.list.map((item, j) => <li key={j}>{item}</li>)}
                    </ol>
                  )}
                </div>
              ))}
            </div>

            <div className="ss-dots">
              {steps.map((s, i) => (
                <button key={i} onClick={() => goTo(i)} aria-label={`Step ${i + 1}`} className={i === step ? "active" : ""}>
                  <span />
                </button>
              ))}
            </div>
          </div>

          <div className="ps-art-wrap">
            <div className="ps-art">
              {steps.map((s, i) => (
                <img key={i} src={s.image} alt={s.alt || ""} className={i === step ? "in" : ""} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};