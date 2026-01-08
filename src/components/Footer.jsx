import winLogo from "../assets/logo-light.svg";
import Line from "../assets/line.png";
import { ArrowUpRight } from "lucide-react";

function Footer() {
  const footer = {
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "var(--clr-primary-800)",
    padding: "100px 50px 50px 50px",
  };

  return (
    <div className="footer centerFlex" style={{ ...footer, width: "100%" }}>
      <img src={winLogo} alt="Winnie's Logo, Chinese character for win" />
      <div
        className="centerFlex"
        style={{ gap: "20px", flexDirection: "column" }}
      >
        <h3 style={{ fontWeight: "300", width: "305px", textAlign: "center" }}>
          <em>
            To dive into the depths, is to believe there is something new worth
            discovering
          </em>
        </h3>
        <p style={{ color: "var(--clr-primary-600)" }}>wc679@cornell.edu</p>
      </div>

      <div style={{display: "flex", flexDirection: "column"}}>
        <div className="centerFlex" style={{ marginTop: "30px", color: "var(--clr-primary-400)" }}>
          <p>Developed and designed with React and Figma</p>
        </div>
        <img
          src={Line}
          alt="A short line"
          style={{ width: "80vw", height: "1px", margin: "10px 0"}}
        />
        <div
          className="footerBio"
          style={{
            color: "var(--clr-primary-400)",
            gap: "14vw",
            display: "flex",
          }}
        >
          <div className="centerFlex" style={{ gap: "20px" }}>
            <div className="centerFlex" style={{ gap: "10px" }}>
              <ArrowUpRight size={20} color="var(--clr-primary-400)" />
              <a
                href="https://github.com/WinnieC180"
                style={{
                  textDecoration: "none",
                  color: "var(--clr-primary-400)",
                }}
                target="_blank"
              >
                <p>GitHub</p>
              </a>
            </div>
            <div className="centerFlex" style={{ gap: "10px" }}>
              <ArrowUpRight size={20} color="var(--clr-primary-400)" />
              <a
                href="https://www.linkedin.com/in/winnie-chan-503804367/"
                style={{
                  textDecoration: "none",
                  color: "var(--clr-primary-400)",
                }}
                target="_blank"
              >
                <p>LinkedIn</p>
              </a>
            </div>
          </div>

          <div>
            <p style={{ textAlign: "center" }}>
              © 2026 Winnie Chan | Made with &lt;3 & the support of some amazing
              individuals!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
