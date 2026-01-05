import "./about.css";
import Anchor from "../assets/anchor.svg";

function Experience() {
  const devTools = [
    "Python",
    "Java",
    "OCaml",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "GitHub",
  ];

  const designTools = ["Figma", "Medibang Paint"];

  return (
    <div className="toolsNEdu">
      <div
        className="toolkit"
        style={{ display: "flex", flexDirection: "column", gap: "30px" }}
      >
        <div className="" style={{ display: "flex", gap: "10px" }}>
          <img src={Anchor} alt="An icon of a blue anchor" />
          <h2>
            <em>Technical Toolkit</em>
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ color: "var(--clr-secondary-300)" }}>DEV TOOLS</p>

          <div className="devTools">
            {devTools.map((devTool, index) => (
              <div key={index} className="centerFlex devTool">
                {devTool}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ color: "var(--clr-secondary-300)" }}>DESIGN TOOLS</p>

          <div className="designTools">
            {designTools.map((designTool, index) => (
              <div key={index} className="centerFlex designTool">
                {designTool}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="education" style={{ display: "flex", flexDirection: "column", gap: "30px", width: "380px" }}>
        <div>
            <h2>
                <em>Education</em>
            </h2>
        </div>

        <div>
            <p>✦ Brooklyn Technical High School</p>
        </div>
      </div>
    </div>
  );
}

export default Experience;
