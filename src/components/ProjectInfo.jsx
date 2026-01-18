import { Link, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ProjectData } from "../data/ProjectData.js";
import "./projectInfo.css";
import NavBar from "./Navbar.jsx";
import { ScrollVideo } from "./ScrollVideo.jsx";

function ProjectInfo() {
  const { projectId } = useParams();
  const { hash } = useLocation();
  const project = ProjectData.find((p) => p.id === projectId);

  useEffect(() => {
    if (hash) {
      // Remove the '#' from the start (e.g., '#overview' -> 'overview')
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  if (!project) return <div>Project not found</div>;

  return (
    <div>
      <NavBar />
      <div className="project-container">
        <aside className="sidebar">
          <Link
            to="/"
            className="back-link"
            style={{
              backgroundColor: "var(--clr-primary-500)",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            ← Home
          </Link>
          <nav>
            {project.sections.map((section) => (
              <a key={section.id} href={`#/${project.id}#${section.id}`}>
                {section.label}
              </a>
            ))}
          </nav>
        </aside>

        <main className="content-area centerFlex">
          <div
            className="centerFlex"
            style={{
              flexDirection: "column",
              backgroundColor: "var(--clr-primary-650)",
              width: "100%",
              padding: "30px",
              borderRadius: "20px",
            }}
          >
            <img
              className="content-image"
              src={project.image}
              alt="A image of the home page of my project"
            />
            <h1>{project.subTitle}</h1>
          </div>

          {project.sections.map((section, id) => (
            <div className="section-body centerFlex" key={id} id={section.id}>
              {Array.isArray(section.content) ? (
                <ul className="overview-list">
                  {section.content.map((item, i) => {
                    const [label, value] = Object.entries(item)[0];
                    return (
                      <li
                        key={i}
                        className="centerFlex"
                        style={{ gap: "10px" }}
                      >
                        <strong style={{ color: "var(--clr-secondary-300)" }}>
                          {label} <br />
                        </strong>{" "}
                        <span> {value} </span>
                      </li>
                    );
                  })}
                </ul>
              ) : section.videos ? (
                <div>
                  <p
                    style={{
                      color: "var(--clr-secondary-300)",
                      marginBottom: "20px",
                    }}
                  >
                    {section.label}
                  </p>
                  <p>{section.subLabel}</p>

                  <div className="video-section">
                    <div className="video-grid">
                      {section.videos.map((vid, index) => (
                        <ScrollVideo
                          key={index}
                          src={vid.link}
                          name={vid.name}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  style={{
                    gap: "20px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <p style={{ color: "var(--clr-secondary-300)" }}>
                    {section.label}
                  </p>
                  <p>{section.content}</p>
                  {section.peopleProblem && (
                    <div
                      className="people-problem-box centerFlex"
                      style={{ gap: "20px" }}
                    >
                      <div
                        className="centerFlex"
                        style={{
                          backgroundColor: "var(--clr-secondary-300)",
                          width: "10px",
                          height: "100px",
                        }}
                      ></div>
                      <p className="problem-text">
                        <b>{section.peopleProblem}</b>
                      </p>
                    </div>
                  )}
                  {section.personas && (
                    <div className="persona-grid centerFlex" style={{flexDirection: "column", gap: "30px"}}>
                      {section.personas.map((personaImg, index) => (
                        <img
                          key={index}
                          src={personaImg}
                          alt={`User Persona ${index + 1}`}
                          className="persona-image"
                          style={{maxWidth: "45vw", marginTop: "20px"}}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </main>
      </div>
    </div>
  );
}

export default ProjectInfo;
