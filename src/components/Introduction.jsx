import "./about.css";
import Hello from "../assets/Hello.svg";
import Photo from "../assets/photo.jpg";
import winLogo from "../assets/logo.svg";
import winLogoLight from "../assets/logo-light.svg";

function Introduction() {
  return (
    <div className="centerFlex myBio">
      <div className="intro">
        <h3 className="hello hellowwin">
          Hello, I'm{" "}
          <span className="winHoverWrap">
            <span className="winText" style={{ color: "var(--clr-project-border)" }}>
              Win
            </span>
            <img src={winLogo} alt="" className="winLogoSlide winLogoSlide-default" />
            <img src={winLogoLight} alt="" className="winLogoSlide winLogoSlide-dark" />
          </span>
          nie Chan
        </h3>
        <div className="bioText" style={{ maxWidth: "500px", width: "100%", padding: "20px" }}>
          Currently at Cornell University studying Computer Science, and pursuing minors in Game Design & Information Science. 
          <br />
          <br />
          Outside of technology and design:
          <ul style={{marginLeft: "25px"}}>
            <li>Crocheting custom plushies</li>
            <li>Sculpting figurines</li>
            <li>Laughing with friends</li>
          </ul> 
          <br />
          I build projects that connect both technology and creativity, and to me, that's
          what make my experience truly colorful.
        </div>
      </div>
      <div style={{padding: "20px"}}>
        <div className="myPhoto">
          <img src={Photo} alt="" style={{ width: "380px", height: "450px" }} />
        </div>
      </div>
    </div>
  );
}

export default Introduction;