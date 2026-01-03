import Line from "../assets/line.png";
import Projects from "./Projects";

function Works() {
  const gap = {
    margin: "100px 0",
  };

  const direction = {
    flexDirection: "column",
  };

  return (
    <section className="centerFlex" style={{...direction, ...gap}} id="work" >
      <div className="centerFlex">
        <img src={Line} alt="A short line" />
        <p>EXPEDITION LOG</p>
        <img src={Line} alt="A short line" />
      </div>
      <div className="centerFlex" style={{ marginTop: "20px", ...direction, gap: "14px"}}>
        <h1 className="exploring">
          Exploring <span style={{ color: "#4ED3FF" }}>My Work</span>
        </h1>
        <p style={{textAlign: "center", width: "40%"}}>
          Each project represents a voyage into the unknown waters where I
          discover new challenges and skills along the way ~
        </p>
      </div>
      <Projects />
    </section>
  );
}

export default Works;
