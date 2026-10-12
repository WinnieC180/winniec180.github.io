import Line from "../assets/line.png";
import Projects from "./Projects";
import { useEffect, useState } from "react";
import LineLight from "../assets/line-light.png";

const FILTERS = ["All", "Featured", "Coding & Design", "Case Studies", "Web", "Mobile"];

function ThemedImg({ src, srcDark, alt, className = "", style }) {
  return (
    <>
      <img src={src} alt={alt} className={`${className} themeImg-default`} style={style} />
      <img src={srcDark} alt={alt} className={`${className} themeImg-dark`} style={style} />
    </>
  );
}

function Works() {
  const [filter, setFilter] = useState("Featured");

  const gap = {
    padding: "8px 0",
  };

  const direction = {
    flexDirection: "column",
  };

  useEffect(() => {
    document.title = "Winnie Chan";
  }, []);

  return (
    <section
      className="centerFlex"
      style={{ ...direction, ...gap, scrollMarginTop: "120px", backgroundColor: "var(--clr-works-bg)", }}
      id="work"
    >
      <div className="centerFlex">
        <ThemedImg src={Line} srcDark={LineLight} alt="A short line" style={{ width: "28vw" }} />
        <p style={{ fontSize: "clamp(10px, 1.0vw + 0.5rem, 16px)", color: "var(--clr-page-text)" }}>
          EXPEDITION LOG
        </p>
        <ThemedImg src={Line} srcDark={LineLight} alt="A short line" style={{ width: "28vw" }} />
      </div>

      <div className="filterTags" role="tablist" aria-label="Filter projects">
        {FILTERS.map((label) => (
          <button
            key={label}
            type="button"
            role="tab"
            aria-selected={filter === label}
            className={filter === label ? "filterTag active" : "filterTag"}
            onClick={() => setFilter(label)}
          >
            {label}
          </button>
        ))}
      </div>

      <Projects filter={filter} />
    </section>
  );
}

export default Works;