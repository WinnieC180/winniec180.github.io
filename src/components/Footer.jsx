import { Link, NavLink } from "react-router-dom";
import winLogo from "../assets/logo-light.svg";
import Line from "../assets/line.png";
import { ArrowUpRight } from "lucide-react";
import frontFishes from "../assets/frontFishes.svg";

function Footer() {
  const footer = {
    flexDirection: "column",
    gap: "30px",
    backgroundColor: "var(--clr-primary-800)",
    padding: "50px 10vw",
  };

  return (
    <div className="footer" style={{ ...footer, width: "100%", position: "relative" }}>
      <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
        <img src={winLogo} alt="Winnie's Logo, Chinese character for win" style={{ width: "6vw" }} />
        <div style={{ display: "flex", gap: "20px", flexDirection: "column" }}>
          <h3 style={{ fontWeight: "300", width: "305px" }}>
            <em>
              To dive into the depths, is to believe there is something new worth
              discovering
            </em>
          </h3>
          <p style={{ color: "var(--clr-primary-600)" }}>wc679@cornell.edu</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            gap: "32px",
            position: "absolute",
            top: "0",
            marginTop: "70px",
            textDecoration: "none",
            alignSelf: "flex-end",
            marginRight: "3vw",
          }}
        >
          <p>Pages:</p>
          <a
            href={"##work"}
            style={{
              textDecoration: "none",
              color: "var(--clr-primary-400)"
            }} 
          >
            Work
          </a>
          <NavLink
            to={"/about"}
            style={{
              textDecoration: "none",
              color: "var(--clr-primary-400)"
            }} 
          >
            About
          </NavLink>
          <NavLink
            to={"/explorations"}
            style={{
              textDecoration: "none",
              color: "var(--clr-primary-400)"
            }} 
          >
            Explorations
          </NavLink>
        </div>

        <div
            style={{
            display: "flex",
            gap: "32px",
            position: "absolute",
            top: "0",
            marginTop: "110px",
            textDecoration: "none",
            alignSelf: "flex-end",
            marginRight: "3vw",
          }}
          >
            <div className="centerFlex" style={{ gap: "10px" }}>
              <ArrowUpRight size={20} color="var(--clr-primary-400)" />
              <a
                href="https://github.com/WinnieC180"
                style={{ textDecoration: "none", color: "var(--clr-primary-300)" }}
                target="_blank"
                rel="noreferrer"
              >
                <p>GitHub</p>
              </a>
            </div>
            <div className="centerFlex" style={{ gap: "10px" }}>
              <ArrowUpRight size={20} color="var(--clr-primary-400)" />
              <a
                href="https://www.linkedin.com/in/winnie-chan-503804367/"
                style={{ textDecoration: "none", color: "var(--clr-primary-300)" }}
                target="_blank"
                rel="noreferrer"
              >
                <p>LinkedIn</p>
              </a>
            </div>
          </div>
      </div>

      <div className="centerFlex">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            className="centerFlex"
            style={{
              textDecoration: "none",
              backgroundColor: "var(--clr-primary-400)",
              padding: "8px 16px",
              borderRadius: "8px",
              width: "10vw",
              alignSelf: "flex-end",
              marginRight: "3vw",
            }}
          >
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{ textDecoration: "none", color: "var(--clr-primary-800)" }}
            >
              <p>Back To Top</p>
            </Link>
          </div>

          <img src={Line} alt="A short line" style={{ width: "80vw", height: "1px", margin: "10px 0" }} />

          <div
            className="footerBio"
            style={{
              color: "var(--clr-primary-400)",
              gap: "14vw",
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "3vw",
            }}
          >
            <div>
              <p style={{ textAlign: "center" }}>
                © 2026 Winnie Chan | Made with &lt;3 & the support of some amazing
                individuals!
              </p>
            </div>
          </div>
        </div>

        <img
          src={frontFishes}
          alt="A digital drawing of some blue cartoon fishes"
          className="footerFishes"
        />
      </div>
    </div>
  );
}

export default Footer;