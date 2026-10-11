import { useEffect, useRef, useState } from "react";
import NavBar from "../components/Navbar";
import Footer from "../components/Footer";
import { INVENTORY, PHOTOS } from "../data/aboutData";
import "../components/aboutPage.css";

import portrait from "../assets/about/portrait.jpg";
import minnow from "../assets/sea/minnow.png";
import blob from "../assets/sea/blob.png";
import eel from "../assets/sea/eel.png";
import puffer from "../assets/sea/puffer.png";
import reef from "../assets/sea/reef.png";
import roundfish from "../assets/sea/roundfish-gold.png";

const BUBBLES = [[8, 10, 7, 0], [22, 6, 9, 2.5], [40, 12, 8, 5], [63, 7, 10, 1.2], [78, 14, 9, 3.6], [90, 8, 7, 6]];
const TAPES = ["tapeStripe", "tapeDots", "tapeBands", "tapePlain"];
const pctX = (px) => `${(px / 14.4).toFixed(2)}%`;
const pctY = (px) => `${(px / 9).toFixed(2)}%`;

// Adds "isVisible" once the element scrolls into view
function useInView() {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => e.isIntersecting && setSeen(true), { threshold: 0.15 });
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, seen];
}

function Intro() {
  return (
    <section className="aboutIntro">
      <div className="aboutPortrait">
        <img src={portrait} alt="Winnie Chan" className="aboutPortraitImg" />
        <img src={minnow} alt="" className="bob" style={{ left: -28, top: -7, width: 66, rotate: "-55deg", animationDuration: "4.2s" }} />
        <img src={blob} alt="" className="bob" style={{ left: -22, top: 357, width: 52, rotate: "12deg", animationDuration: "3.6s", animationDelay: "-2.2s" }} />
        <img src={eel} alt="" className="bob" style={{ right: -16, top: 360, width: 56, rotate: "172deg", animationDuration: "4.6s", animationDelay: "-.8s" }} />
        <img src={reef} alt="" className="bob" style={{ left: -67, top: 300, width: 60, height: 57, rotate: "-102deg", scale: "-1.05 1.19", animationDuration: "5s", animationDelay: "-1.4s" }} />
      </div>
      <div className="aboutCopy">
        <img src={puffer} alt="" className="bob" style={{ right: 10, top: 6, width: 76, scale: "-1 1", animationDuration: "4.5s" }} />
        <h1>Hello, I’m <span className="aboutName">Winnie</span> :)</h1>
        <h2>A <b>designer</b>, <b>artist</b>, and <b>engineer</b></h2>
        <div className="aboutParas">
          <p>Experimenting with different mediums of art as a kid shaped how I solve problems, always looking for a new, creative angle.</p>
          <p>That mindset led me to computer science and technology, where I found the same joy in building something from nothing. Then, during my sophomore year of college, I discovered product design. A way to bring that my creativity into the visual world and directly shape how users experience a product.</p>
          <p>Now, I combine my technical background with my design sensibility to build solutions that are as thoughtful as they are functional.</p>
          <p className="aboutMajor">Major: Computer Science | Minors: Game Design &amp; Information Science</p>
        </div>
      </div>
    </section>
  );
}

function Inventory() {
  const [ref, seen] = useInView();
  const [sel, setSel] = useState(0);
  const [chars, setChars] = useState(0);
  const cur = INVENTORY[sel];
  const pick = (i) => { if (i !== sel) { setSel(i); setChars(0); } };

  // typewriter
  useEffect(() => {
    const total = cur.notes.join("").length;
    const t = setInterval(() => setChars((c) => (c >= total ? (clearInterval(t), c) : c + 1)), 28);
    return () => clearInterval(t);
  }, [sel, cur.notes]);

  // arrow keys
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") pick((sel + 1) % INVENTORY.length);
      if (e.key === "ArrowLeft") pick((sel + INVENTORY.length - 1) % INVENTORY.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const starts = cur.notes.map((_, i) =>
    cur.notes.slice(0, i).reduce((sum, n) => sum + n.length, 0)
  );
  const total = cur.notes.join("").length;
  const typed = cur.notes
    .map((n, i) => {
      const take = Math.max(0, Math.min(n.length, chars - starts[i]));
      const isLast = i === cur.notes.length - 1;
      const caret = (take > 0 && take < n.length) || (isLast && chars >= total);
      return { text: n.slice(0, take), caret, show: take > 0 || i === 0 };
    })
    .filter((t) => t.show);

  return (
    <section ref={ref} className={`inv${seen ? " isVisible" : ""}`}>
      <div className="invHeading"><span className="invRule" /><span>INVENTORY LOG</span><span className="invRule" /></div>
      <div className="invBody">
        <div className="invStage">
          <div className="invBubbles">
            {BUBBLES.map(([x, s, d, delay], i) => (
              <span key={i} style={{ left: `${x}%`, width: s, height: s, animationDuration: `${d}s`, animationDelay: `${delay}s` }} />
            ))}
          </div>
          <div className="invItemWrap">
            <div className="invItem" key={sel}>
              <img src={cur.icon} alt={cur.title} />
            </div>
            <div className="invShadow" />
          </div>
          <div className="invDialog">
            <div className="invDialogBg" />
            <div className="invTitle">{cur.title}</div>
            <ul>
              {typed.map((t, i) => <li key={i}>{t.text}{t.caret && <span className="invCaret">▍</span>}</li>)}
            </ul>
            <button type="button" className="invNext" aria-label="Next item" onClick={() => pick((sel + 1) % INVENTORY.length)}>
              <svg width="16" height="20" viewBox="0 0 16 20"><path d="M2 2 L14 10 L2 18 Z" fill="#fff" stroke="#fff" strokeWidth="2" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </div>

        <div className="invSide">
          <div className="invGrid">
            {INVENTORY.map((it, i) => (
              <button key={it.title} type="button" title={it.title} aria-label={it.title}
                className={`invSlot${i === sel ? " isSelected" : ""}`} onClick={() => pick(i)}>
                <img src={it.icon} alt="" />
              </button>
            ))}
            <div className="invFrame" style={{ transform: `translate(calc(${sel % 4} * (100% + 16px)), calc(${Math.floor(sel / 4)} * (100% + 16px)))` }} />
          </div>
          <div className="invStats">
            {cur.stats.map(([label, v], i) => (
              <div key={i} className="invStat">
                <div className="invStatLabel"><span>{label}</span><span>{seen ? v : 0}/100</span></div>
                <div className="invBar"><div style={{ width: `${seen ? v : 0}%`, transitionDelay: `${i * 0.08}s` }} /></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DailyLife() {
  const [ref, seen] = useInView();
  const [flip, setFlip] = useState(-1);

  return (
    <section ref={ref} className={`life${seen ? " isVisible" : ""}`}>
      <div className="lifeBoard">
        {PHOTOS.map((p, i) => (
          <div key={i} className="lifeCard"
            style={{ left: pctX(p.x - 4), top: pctY(p.y - 4), width: pctX(p.w + 8), "--rot": `${p.rot}deg`, "--rotIn": `${p.rot * 4}deg`, transitionDelay: `${i * 0.09}s` }}>
            <div className="lifeHit" onMouseEnter={() => setFlip(i)} onMouseLeave={() => setFlip((f) => (f === i ? -1 : f))}>
              <div className={`lifeFlip${flip === i ? " isFlipped" : ""}`}>
                <div className="lifeFront">
                  <img src={p.src} alt="" style={{ aspectRatio: `${p.w}/${p.h}` }} />
                  <div className="lifeLip" />
                </div>
                <div className="lifeBack">
                  <div className="lifeBackTitle">{p.title}</div>
                  <div className="lifeBackText">{p.caption}</div>
                </div>
              </div>
            </div>
            <div className={`lifeTape ${TAPES[i % 4]}`} style={{ rotate: `${(i % 2 ? 1 : -1) * (2 + (i % 3) * 2)}deg` }} />
          </div>
        ))}

        {/* decorations */}
        <div className="deco postStamp" style={{ left: "78%", top: "61%" }}>
          <div><img src={roundfish} alt="" /><span>SEA · 26</span></div>
        </div>
        <div className="deco inkStamp" style={{ left: "16%", top: "60%" }}>MADE<br />WITH<br />CARE</div>
        <div className="deco looseTape tapeStripe" style={{ left: "6.39%", top: "20.78%", width: "10%", rotate: "-62deg" }} />
        <div className="deco looseTape tapeDots" style={{ right: "7.15%", top: "17.22%", width: "12%", rotate: "88deg" }} />
        <svg className="deco decoArrow" viewBox="0 0 120 40" style={{ left: "58%", top: "53%", width: "5%" }} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M4 30 C20 4 34 4 40 22 S62 38 70 18 S96 2 116 14" /><path d="M106 6 L116 14 L104 20" />
        </svg>
        <svg className="deco decoClip" viewBox="0 0 24 60" style={{ left: "68%", top: "-0.1%", width: "1.4%", rotate: "18deg" }} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
          <path d="M16 14 V48 a6 6 0 0 1 -12 0 V10 a8 8 0 0 1 16 0 V44 a4 4 0 0 1 -8 0 V16" />
        </svg>

        <div className="deco lifeTitle" style={{ left: "41%", top: "40%" }}>
          <div className="lifeSmall">Exploring my</div>
          <div className="lifeScript" style={{ marginLeft: "5%" }}>Daily Life</div>
          <div className="lifeSmall" style={{ marginLeft: "62%", marginTop: -4 }}>and my</div>
          <div className="lifeScript" style={{ marginLeft: "24%" }}>Communities</div>
        </div>
      </div>
    </section>
  );
}

function About() {
  useEffect(() => { document.title = "About Winnie"; }, []);
  return (
    <div className="aboutPage">
      <NavBar />
      <main>
        <Intro />
        <Inventory />
        <DailyLife />
      </main>
      <footer><Footer /></footer>
    </div>
  );
}

export default About;