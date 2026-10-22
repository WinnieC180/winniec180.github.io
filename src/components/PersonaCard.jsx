import { useState } from "react";

function BlankAvatar({ size }) {
  return (
    <div className="pc-avatar blank" style={{ width: size, height: size }}>
      <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 24 24" fill="#8a8a8a">
        <circle cx="12" cy="9" r="4.5" />
        <path d="M3 24c0-5 4-8.5 9-8.5s9 3.5 9 8.5z" />
      </svg>
    </div>
  );
}

function Avatar({ src, size }) {
  return src ? (
    <img src={src} alt="" className="pc-avatar" style={{ width: size, height: size }} />
  ) : (
    <BlankAvatar size={size} />
  );
}

export function PersonaCard({ p }) {
  const [tab, setTab] = useState(0);
  return (
    <div className="pc-card">
      <div className="pc-top">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 12H4M10 6l-6 6 6 6" /></svg>
        <div className="pc-top-right">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></svg>
          <svg width="6" height="22" viewBox="0 0 6 22" fill="#fff"><circle cx="3" cy="3" r="2.2" /><circle cx="3" cy="11" r="2.2" /><circle cx="3" cy="19" r="2.2" /></svg>
        </div>
      </div>

      <div className="pc-banner"><span>{p.banner}</span></div>

      <div className="pc-id">
        <Avatar src={p.avatar} size={64} />
        <div>
          <div className="pc-name">
            {p.name}
            <svg width="20" height="20" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#aaa" /><path d="M7.5 12.5l3 3 6-6.5" fill="none" stroke="#0f0f0f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <span className="pc-handle">{p.handle}</span>
        </div>
      </div>

      <p className="pc-bio">{p.bio}</p>

      <div className="pc-tabs">
        {["Pain points", "Scenario"].map((name, i) => (
          <button key={name} className={tab === i ? "active" : ""} onClick={() => setTab(i)}>{name}</button>
        ))}
      </div>

      <div className="pc-content">
        {tab === 0 ? (
          <div className="pc-stack">
            {p.pains.map((pt, i) => (
              <div key={i} className="pc-pain">
                <span className="pc-pain-t">{pt.t}</span>
                <span className="pc-pain-d">{pt.d}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="pc-stack">
            <span className="pc-scen-title">{p.scenarioTitle}</span>
            {p.scenario.map((t, i) => (
              <div key={i} className="pc-step">
                <span className="pc-num">{i + 1}</span>
                <span>{t}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <nav className="pc-nav">
        <div><img src="./photos/icon-home.png" alt="" />Home</div>
        <div><img src="./photos/icon-shorts.png" alt="" />Shorts</div>
        <div className="pc-plus"><svg width="22" height="22" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"><path d="M12 4v16M4 12h16" /></svg></div>
        <div><img src="./photos/icon-subs.png" alt="" />Subscriptions</div>
        <div><Avatar src={p.avatar} size={26} />You</div>
      </nav>
    </div>
  );
}