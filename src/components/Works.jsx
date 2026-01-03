import Line from "../assets/line.png";

function Works() {
  const gap = {
    marginTop: "100px",
  };

  const direction = {
    flexDirection: "column",
  };

  return (
    <section className="centerFlex" style={{...direction}}>
      <div className="centerFlex" style={gap}>
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
    </section>
  );
}

export default Works;
