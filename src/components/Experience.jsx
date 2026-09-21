import "./about.css";
import Anchor from "../assets/anchor.svg";
import Line from "../assets/line.png";
import LineLight from "../assets/line-light.png";

function ThemedImg({ src, srcDark, alt, className = "", style }) {
  return (
    <>
      <img src={src} alt={alt} className={`${className} themeImg-default`} style={style} />
      <img src={srcDark} alt={alt} className={`${className} themeImg-dark`} style={style} />
    </>
  );
}

function Experience() {
  return (
    <div>
        <div className="centerFlex">
            <ThemedImg src={Line} srcDark={LineLight} alt="A short line" style={{ width: "28vw" }} />
            <p style={{fontSize: "clamp(12px, 1.5vw + 0.5rem, 20px)", color:"var(--clr-page-text)"}}>ADVENTURE LOG</p>
            <ThemedImg src={Line} srcDark={LineLight} alt="A short line" style={{ width: "28vw" }} />
        </div>
    </div>
  );
}

export default Experience;
