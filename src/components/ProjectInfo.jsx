import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { ProjectData } from "../data/ProjectData.js";
import "./projectInfo.css";
import NavBar from "./Navbar.jsx";
import { ScrollVideo } from "./ScrollVideo.jsx";

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

// Hero band color for each project, keyed by project id. Change these hex codes anytime.
const HERO_COLORS = {
  darn: "#195cae",
  FamJam: "#ff8c49",
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
  { id: "creator-cuts", name: "Creator's Cuts", desc: "Giving viewers control over their YouTube recommendations", year: "2025", imageDay: CreatorCutsDay, imageNight: CreatorCutsNight, to: "/creator-cuts" },
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
    const onScroll = () => {
      // Which section is on screen
      let cur = sections[0]?.id;
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.4) cur = s.id;
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
    return null;
  };

  return (
    <div className="cs-page" style={themeVars}>
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
        <div className="cs-band-inner">
          <div className="cs-hero">
            <img src={project.banner || project.image} alt={project.subTitle} />
          </div>

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
      </header>

      {/* Content */}
      <main ref={mainRef} className="cs-main">
        {sections.map((section) => (
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
        ))}

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