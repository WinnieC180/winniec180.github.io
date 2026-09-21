import Line from "../assets/line.png";
import Projects from "./Projects";
import { useEffect } from "react";
import LineLight from "../assets/line-light.png";

function ThemedImg({ src, srcDark, alt, className = "", style }) {
  return (
    <>
      <img src={src} alt={alt} className={`${className} themeImg-default`} style={style} />
      <img src={srcDark} alt={alt} className={`${className} themeImg-dark`} style={style} />
    </>
  );
}

function Works() {
  const gap = {
    margin: "24px 0",
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
      style={{ ...direction, ...gap, scrollMarginTop: "120px" }}
      id="work"
    >
      <div className="centerFlex">
        <ThemedImg src={Line} srcDark={LineLight} alt="A short line" style={{ width: "28vw" }} />
        <p style={{ fontSize: "clamp(10px, 1.0vw + 0.5rem, 16px)", color: "var(--clr-page-text)" }}>
          EXPEDITION LOG
        </p>
        <ThemedImg src={Line} srcDark={LineLight} alt="A short line" style={{ width: "28vw" }} />
      </div>
      <Projects />
    </section>
  );
}

export default Works;