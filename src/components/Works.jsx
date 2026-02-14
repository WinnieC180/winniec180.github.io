import Line from "../assets/line.png";
import Projects from "./Projects";
import { useEffect } from "react";

function Works() {
  const gap = {
    margin: "50px 0",
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
        <img src={Line} alt="A short line" style={{ width: "28vw" }} />
        <p style={{ fontSize: "clamp(10px, 1.0vw + 0.5rem, 18px)" }}>
          EXPEDITION LOG
        </p>
        <img src={Line} alt="A short line" style={{ width: "28vw" }} />
      </div>
      <Projects />
    </section>
  );
}

export default Works;
