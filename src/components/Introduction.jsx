import "./about.css";
import Hello from "../assets/Hello.svg";
import Photo from "../assets/photo.jpg";

function Introduction() {
  return (
    <div className="centerFlex myBio">
      <div className="intro">
        <h3 className="hello hellowwin">Hello, I'm Winnie Chan</h3>
        <p style={{ maxWidth: "500px", width: "100%", padding: "20px" }}>
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
          <br />
          I build projects that connect both technology and creativity, and to me, that's
          what make my experience truly colorful.
        </p>
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
