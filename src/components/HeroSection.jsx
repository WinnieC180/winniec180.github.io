import { Link } from "react-router-dom";
import backFishes from "../assets/backFishes.svg";
import frontFishes from "../assets/frontFishes.svg";
import DTI from "../assets/DTI.svg";
import SUSB from "../assets/SUSB_Logo.svg";

import "./style.css";

function HeroSection() {
  return (
    <section>
      <div className="heroesection centerFlex">
        <picture className="fishes back">
          <img
            src={backFishes}
            alt="A digital drawing of some blue cartoon fishes"
          />
        </picture>

        <div className="label">
          <div className="description centerFlex">
            <p className="basedin">
              <span>●</span> CURRENTLY BASED IN: NEW YORK
            </p>
            <h1 className="nametag">Winnie</h1>
            <div className="breifintro centerFlex">
                {/* <h3 className="quote">Navigating the depths of technology</h3> */}
                
                <div className="icons">
              <a
                href="https://github.com/WinnieC180"
                target="_blank"
                className="centerFlex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-github-icon lucide-github"
                >
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
                Github
              </a>{" "}
              |
              <a
                href="https://www.linkedin.com/in/winnie-chan-503804367/"
                target="_blank"
                className="centerFlex"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-linkedin-icon lucide-linkedin"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
                LinkedIn
              </a>
            </div>

              <p className="briefme">
                A <span>computer science student</span> focused on{" "}
                <span>frontend</span> development & <span>UI/UX</span> design,
                as well as exploring <span>backend</span> development.
              </p>
            </div>
            <div className="more">
              <Link to="/about">More about me &gt;</Link>
            </div>
          </div>

          <div className="teams centerFlex" style={{ gap: "10px" }}>
            <div className="centerFlex" style={{ gap: "10px" }}>
              <h3 style={{ color: "var(--clr-neutral-100)" }}>
                Designer || Developer @
              </h3>
              <a
                href="https://new.cornelldti.org/"
                target="_blank"
                className="centerFlex"
              >
                <img
                  src={DTI}
                  alt="The logo of Cornell Digital Tech & Innovation"
                  className="team"
                  style={{
                    borderRadius: "50px",
                  }}
                />
              </a>
            </div>
            <div className="centerFlex" style={{ gap: "10px" }}>
              <a
                href="https://www.sustainabytes.org/"
                target="_blank"
                className="centerFlex"
              >
                <img
                  src={SUSB}
                  alt="The logo of Cornell computational sustainability club"
                  className="team"
                />
              </a>
            </div>
          </div>
          
        </div>
        <img
          src={frontFishes}
          alt="A digital drawing of some blue cartoon fishes"
          className="fishes front"
        />
      </div>
    </section>
  );
}

export default HeroSection;
