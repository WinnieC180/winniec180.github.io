import "./about.css";
import Hello from "../assets/Hello.svg";
import Photo from "../assets/photo.png"

function Introduction() {
  return (
    <div className="centerFlex myBio">
      <div className="centerFlex intro">
        <img className= "hello" src={Hello} alt="The photo of hello" />
        <p style={{maxWidth: "500px", width: "100%"}}>
          I’m Winnie, a sophomore studying Computer
          Science, and pursuing minors in Game Design & Information Science. 
          <br />
          <br />
          My love for creativity started long before code, back when I collected
          every color imaginable. Markers, paints, clay, balloons… and
          eventually, those colors moved onto a screen. The digital world became
          my playground where I could blend art and programming into interactive
          experiences. 
          <br />
          <br />
          Now I build projects that connect both worlds, and to me,
          that’s what make my experience truly colorful.
        </p>
      </div>
      <div className="myPhoto">
        <img src={Photo} alt="" style={{width: "380px", height: "450px"}}/>
        <div style={{display: "flex", gap: "5px", flexDirection: "column"}}>
            <h2 style={{color: "var(--clr-primary-800)", fontSize: "1.5rem"}}>Cornell University | Engineering</h2>
            <p style={{color: "var(--clr-primary-500)"}}>Developer ✦ Designer ✦ Queens NY</p>
        </div>
      </div>
    </div>
  );
}

export default Introduction;
