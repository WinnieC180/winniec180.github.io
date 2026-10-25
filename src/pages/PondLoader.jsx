import { useEffect, useState } from "react";
import roundfish from "../assets/sea/roundfish.png";
import "./pondLoader.css";

function PondLoader({ loaded, total, done }) {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setGone(true), 700);
    return () => clearTimeout(t);
  }, [done]);
  if (gone) return null;

  const pct = total ? Math.round((loaded / total) * 100) : 0;
  return (
    <div className={`pond-loader${done ? " is-done" : ""}`} aria-live="polite" aria-busy={!done}>
      <div className="pond-loader-top">
        <p className="pond-loader-label"><em>Filling the pond…</em></p>
      </div>
      <div className="pond-loader-bar" aria-hidden="true">
        <div className="pond-loader-trail" style={{ width: `${pct}%` }} />
        <div className="pond-loader-fish" style={{ left: `calc(${pct}% - 28px)` }}>
          <img src={roundfish} alt="" className="pond-fish-body" />
          <img src={roundfish} alt="" className="pond-fish-tail" />
        </div>
      </div>
    </div>
  );
}

export default PondLoader;