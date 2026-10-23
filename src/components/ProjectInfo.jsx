import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ProjectData } from "../data/ProjectData.js";
import "./projectInfo.css";
import NavBar from "./Navbar.jsx";
import { ScrollVideo } from "./ScrollVideo.jsx";
import { ScrollSteps } from "./ScrollSteps.jsx";
import { ProblemSteps } from "./ProblemSteps.jsx";
import { PersonaCard } from "./PersonaCard.jsx";

// Day images
import LoopDay from "../imgProjects/day/Loop.svg";
import CornellGODay from "../imgProjects/day/CornellGO.svg";
import CreatorCutsDay from "../imgProjects/day/CreatorsCuts.svg";
import FamJamDay from "../imgProjects/day/FamJam.svg";
import DarnDay from "../imgProjects/day/Darn.svg";
// Night images
import LoopNight from "../imgProjects/Loop.svg";
import CornellGONight from "../imgProjects/CornellGO.svg";
import CreatorCutsNight from "../imgProjects/CreatorsCuts.svg";
import FamJamNight from "../imgProjects/FamJam.svg";
import DarnNight from "../imgProjects/Darn.svg";
import { DarnShowcase } from "./DarnShowcase.jsx";

// Hero band color for each project, keyed by project id. Change these hex codes anytime.
const HERO_COLORS = {
  darn: "#003297",
  FamJam: "#eb6b21",
  Loop: "#2F5DA8",
  CornellGO: "#df5049",
  "creator-cuts": "#dd4c47",
  "oh-my-camel": "#f0b259",
  "quack-a-goose": "#4fd6d8",
  "study-buddy": "#6C63B5",
};
const DEFAULT_HERO = "#2A4D87";

// Projects that are not ready yet; hidden from "Explore more"
const COMING_SOON = ["Loop"];

// "Explore more" cards: first two that aren't the current page are shown
const MORE = [
  { id: "darn", name: "DARN", desc: "Redesigning a nonprofit's internal and admin website", year: "2026", imageDay: DarnDay, imageNight: DarnNight, to: "/darn" },
  { id: "creator-cuts", name: "Creators Cuts", desc: "Giving viewers control over their YouTube recommendations", year: "2025", imageDay: CreatorCutsDay, imageNight: CreatorCutsNight, to: "/creator-cuts" },
  { id: "Loop", name: "Loop", desc: "Chrome extension that helps Cornell students cut through listserv clutter", year: "2026", imageDay: LoopDay, imageNight: LoopNight, to: "/Loop" },
  { id: "CornellGO", name: "CornellGO", desc: "A scavenger hunt app that makes discovering campus easy and fun", year: "2026", imageDay: CornellGODay, imageNight: CornellGONight, to: "/CornellGO" },
  { id: "FamJam", name: "FamJam", desc: "An inclusive game that closes the gap between generations", year: "2026", imageDay: FamJamDay, imageNight: FamJamNight, to: "/FamJam" },
];

// Is this hex color light enough to need dark text on top of it?
function isLight(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255 > 0.6;
}

function Callout({ label, text, dark }) {
  return (
    <div className={dark ? "cs-callout dark" : "cs-callout"}>
      {label && <span className="cs-callout-label">{label}</span>}
      <p>{text}</p>
    </div>
  );
}

function Slideshow({ items }) {
  const trackRef = useRef(null);
  const [i, setI] = useState(0);
  const go = (n) => {
    const t = trackRef.current;
    const next = (n + items.length) % items.length;
    t.scrollTo({ left: next * t.clientWidth, behavior: "smooth" });
  };
  const onScroll = () => {
    const t = trackRef.current;
    setI(Math.round(t.scrollLeft / t.clientWidth));
  };
  return (
    <div className="cs-slideshow">
      <div className="cs-slides-wrap">
        <div ref={trackRef} className="cs-slides" onScroll={onScroll}>
          {items.map((src, k) => (
            <div key={k} className="cs-slide">
              <img src={src} alt="" />
            </div>
          ))}
        </div>
        <div className="cs-slide-dots">
          {items.map((_, k) => (
            <button key={k} className={k === i ? "active" : ""} onClick={() => go(k)} aria-label={`Slide ${k + 1}`} />
          ))}
        </div>
        <div className="cs-slide-nav">
          <button className="cs-slide-btn" onClick={() => go(i - 1)} aria-label="Previous">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 5l-7 7 7 7" /></svg>
          </button>
          <button className="cs-slide-btn" onClick={() => go(i + 1)} aria-label="Next">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

function Compare({ kicker, question, sides }) {
  const [hov, setHov] = useState(null);
  return (
    <div className="cs-compare">
      <div className="cs-compare-head">
        {kicker && <span className="cs-compare-kicker">{kicker}</span>}
        {question && <h3 className="cs-compare-q">{question}</h3>}
      </div>
      <div className="cs-compare-grid">
        {sides.map((s, k) => {
          const other = sides[1 - k];
          const active = hov === k;
          const showInfo = hov !== null && hov !== k;
          return (
            <div
              key={k}
              className={`cs-compare-card${active ? " is-active" : ""}${showInfo ? " is-info" : ""}${k === 0 ? " is-left" : " is-right"}`}
              onMouseEnter={() => setHov(k)}
              onMouseLeave={() => setHov(null)}
              onClick={() => setHov(k)}
            >
              <div className="cs-compare-glow">
                <span className="cs-compare-outline cs-compare-outline-top">{s.name}</span>
              </div>
              <img className="cs-compare-img" src={s.img} alt={s.name} />
              {kicker && <span className="cs-compare-outline cs-compare-outline-bottom">{kicker}</span>}
              <div className="cs-compare-info">
                <span className="cs-compare-name">{other.name}</span>
                <ul>
                  {other.pros.map((t, i) => (
                    <li key={"p" + i}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgb(134,214,141)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M7.5 12.5l3 3 6-6.5" /></svg>
                      <span>{t}</span>
                    </li>
                  ))}
                  {other.cons.map((t, i) => (
                    <li key={"c" + i}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgb(255,138,128)" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10" /><path d="M8.5 8.5l7 7M15.5 8.5l-7 7" /></svg>
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
      <p className="cs-compare-hint">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l7 17 2.5-7.5L21 11z" /></svg>
        Hover to see the pros and cons to each iteration
      </p>
    </div>
  );
}

function ProjectInfo() {
  const { projectId } = useParams();
  const project = ProjectData.find((p) => p.id === projectId);

  const overview = project?.sections.find((s) => s.id === "overview");
  const sections = project ? project.sections.filter((s) => s.id !== "overview") : [];

  const [active, setActive] = useState(sections[0]?.id);
  const [progress, setProgress] = useState(0);
  const [pastHero, setPastHero] = useState(false);
  const [onHero, setOnHero] = useState(true);
  const heroRef = useRef(null);
  const mainRef = useRef(null);

    useEffect(() => {
    window.scrollTo(0, 0);
    const ids = (ProjectData.find((p) => p.id === projectId)?.sections ?? [])
      .filter((s) => s.id !== "overview")
      .map((s) => s.id);

    const onScroll = () => {
      // Which section is on screen
      let cur = ids[0];
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = id;
      });
      setActive(cur);

      // Progress bar starts after the colored header
      const hero = heroRef.current;
      const main = mainRef.current;
      if (!hero || !main) return;
      const y = window.scrollY;
      const start = hero.getBoundingClientRect().bottom + y;
      const end = main.getBoundingClientRect().bottom + y - window.innerHeight;
      setPastHero(y >= start - 1);
      setOnHero(y + window.innerHeight / 2 < start); // tab lines sit over the header
      setProgress(end > start ? Math.min(1, Math.max(0, (y - start) / (end - start))) : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [projectId]);

  const goTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
  };

  if (!project) return <div>Project not found</div>;

  const more = MORE.filter((m) => m.id !== project.id && !COMING_SOON.includes(m.id)).slice(0, 2);

  const heroBg = HERO_COLORS[project.id] || DEFAULT_HERO;
  const light = isLight(heroBg);
  const themeVars = {
    "--hero-bg": heroBg,
    "--hero-text": light ? "#1F2B4A" : "#FFFFFF",
    "--hero-muted": light ? "#000000" : "#dadada",
    "--hero-line-off": light ? "rgba(31,43,74,0.3)" : "rgba(255,255,255,0.4)",
  };

  const renderItem = (item, idx) => {
    if (item.type === "text") return <p key={idx} className="cs-body">{item.value}</p>;
    if (item.type === "highlight") return <Callout key={idx} label={item.label} text={item.value} />;
    if (item.type === "slideshow") return <Slideshow key={idx} items={item.items} />;
    if (item.type === "compare") return <Compare key={idx} {...item} />;
    if (item.type === "list")
      return (
        <ol key={idx} className="cs-list">
          {item.items.map((li, i) => <li key={i}>{li}</li>)}
        </ol>
      );
    if (item.type === "image")
      return <img key={idx} src={item.value} alt="" className={item.size === "mobile" ? "cs-image mobile" : "cs-image"} />;
    if (item.type === "preview")
      return (
        <div key={idx} className="cs-preview">
          <div className="cs-preview-bar">
            <span /><span /><span />
            <a href={item.value} target="_blank" rel="noreferrer">{item.value.replace(/^https?:\/\//, "").replace(/\/$/, "")}</a>
          </div>
          <iframe src={item.value} title="Live site preview" loading="lazy" />
        </div>
      );
    if (item.type === "trends")
      return (
        <div key={idx} className="cs-trends">
          {item.items.map((t, i) => <div key={i}>{t}</div>)}
        </div>
      );
    if (item.type === "personas")
      return (
        <div key={idx}>
          <div className="cs-personas">
            {item.items.map((p, i) => <PersonaCard key={i} p={p} />)}
          </div>
          <div className="cs-hint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 11V5a2 2 0 0 1 4 0v5" /><path d="M13 10a2 2 0 0 1 4 0v1" /><path d="M17 11a2 2 0 0 1 4 0v4a7 7 0 0 1-7 7h-1a7 7 0 0 1-6-3.5L4 15a2 2 0 0 1 3.4-2L9 15" /></svg>
            Tap Pain points or Scenario on each profile to explore
          </div>
        </div>
      );
    return null;
  };

  return (
    <div className="cs-page" data-project={project.id} style={themeVars}>
      <NavBar />

      {/* Reading progress bar, in the project's color */}
      <div className={pastHero ? "cs-progress show" : "cs-progress"}>
        <div style={{ width: `${progress * 100}%` }} />
      </div>

      {/* Side tabs: lines, label shows on hover */}
      <aside className={onHero ? "cs-toc on-hero" : "cs-toc"}>
        <ol>
          {sections.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                onClick={(e) => goTo(e, s.id)}
                className={active === s.id ? "active" : ""}
                aria-label={s.label}
              >
                <span className="cs-toc-line" />
                <span className="cs-toc-label">{s.label}</span>
              </a>
            </li>
          ))}
        </ol>
      </aside>

      {/* Colored header */}
      <header ref={heroRef} className="cs-band">
        <div className={project.heroWord ? "cs-band-inner has-word" : "cs-band-inner"}>
          {project.heroWord && <div className="cs-hero-word" aria-hidden="true">{project.heroWord}</div>}
          <div className="cs-hero">
            <img src={project.banner || project.image} alt={project.subTitle} />
          </div>

          <div className="cs-hero-text">
            <h1 className="cs-title">{project.title || project.subTitle}</h1>

            {project.link && (
              <a href={project.link} target="_blank" rel="noreferrer" className="cs-link">
                {project.linkLabel || "View project"} ↗
              </a>
            )}

            {overview && (
              <div className="cs-meta">
                {overview.content.map((item, i) => {
                  const [label, value] = Object.entries(item)[0];
                  return (
                    <div key={i}>
                      <span className="cs-meta-label">{label}</span>
                      <span className="cs-meta-value">{value}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
        </div>
      </header>

      {/* Content */}
      <main ref={mainRef} className="cs-main">
        {sections.map((section) =>
          section.showcase ? (
            <section key={section.id} id={section.id}>
              <DarnShowcase
                eyebrow={section.label}
                heading={section.heading}
                content={section.content}
                showcase={section.showcase}
              />
            </section>
          ) : section.problemSteps ? (
            <section key={section.id} id={section.id}>
              <ProblemSteps eyebrow={section.label} steps={section.problemSteps} />
            </section>
          ) : section.steps ? (
            <section key={section.id} id={section.id}>
              <ScrollSteps eyebrow={section.label} steps={section.steps} />
            </section>
          ) : (
            <section key={section.id} id={section.id} className="cs-section">
              <div className="cs-eyebrow">{section.eyebrow || section.label}</div>
              {section.heading && <h2 className="cs-heading">{section.heading}</h2>}
              {section.subLabel && <p className="cs-body">{section.subLabel}</p>}

              {section.videos ? (
                <div className="cs-videos">
                  {section.videos.map((vid, i) => (
                    <ScrollVideo key={i} src={vid.link} name={vid.name} />
                  ))}
                </div>
              ) : Array.isArray(section.content) ? (
                section.content.map(renderItem)
              ) : (
                section.content && <p className="cs-body">{section.content}</p>
              )}

              {section.peopleProblem && <Callout dark label="How might we" text={section.peopleProblem} />}

              {section.pictures &&
                section.pictures.map((pic, i) => <img key={i} src={pic} alt="" className="cs-image" />)}
            </section>
          )
        )}

        {more.length > 0 && (
          <section className="cs-more">
            <h2>Explore more of my projects!</h2>
            <div className="cs-more-grid">
              {more.map((m) => {
                const inner = (
                  <>
                    <div className="cs-more-img">
                      <img src={m.imageDay} alt={m.name} className="moreDay" />
                      <img src={m.imageNight} alt="" className="moreNight" />
                    </div>
                    <div className="cs-more-text">
                      <p><strong>{m.name}</strong></p>
                      <span>{m.year}</span>
                    </div>
                  </>
                );
                return m.to ? (
                  <Link key={m.id} to={m.to} className="cs-more-card">{inner}</Link>
                ) : (
                  <a key={m.id} href={m.link} target="_blank" rel="noreferrer" className="cs-more-card">{inner}</a>
                );
              })}
            </div>
          </section>
        )}

        <Link to="/" className="cs-back">← Back to the Expedition Log</Link>
      </main>
    </div>
  );
}

export default ProjectInfo;