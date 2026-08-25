import "./about.css";
import Anchor from "../assets/anchor.svg";
import Line from "../assets/line.png";

function Experience() {
  return (
    <div>
        <div className="centerFlex">
            <img src={Line} alt="A short line" style={{width: "28vw"}}/>
            <p style={{fontSize: "clamp(12px, 1.5vw + 0.5rem, 20px)"}}>ADVENTURE LOG</p>
            <img src={Line} alt="A short line" style={{width: "28vw"}}/>
        </div>
    </div>
  );
}

export default Experience;
