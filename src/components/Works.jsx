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
    <section className="centerFlex" style={{...direction, ...gap, scrollMarginTop: "120px"}} id="work" >
      <div className="centerFlex">
        <img src={Line} alt="A short line" style={{width: "28vw"}}/>
        <p style={{fontSize: "clamp(12px, 1.5vw + 0.5rem, 20px)"}}>EXPEDITION LOG</p>
        <img src={Line} alt="A short line" style={{width: "28vw"}}/>
      </div>
      <div className="centerFlex" style={{ marginTop: "20px", ...direction, gap: "14px"}}>
        <h1 style={{fontSize: "clamp(2rem, 3vw + 1rem, 5rem)"}}>
          Exploring <span style={{ color: "#4ED3FF" }}>My Work</span>
        </h1>
        <p style={{textAlign: "center", width: "min(580px, 80%)", fontSize: "clamp(12px, 1.5vw + 0.5rem, 20px)"}}>
          Each project represents a voyage into the unknown waters where I
          discover new challenges and skills along the way ~
        </p>
      </div>
      <Projects />
    </section>
  );
}

export default Works;
