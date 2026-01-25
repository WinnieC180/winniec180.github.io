import "./projects.css";
import { Link } from "react-router-dom";
import WhirlPool from "../assets/whirlPool.svg";
import OhMyCamel from "../imgProjects/Oh-My-Camel.svg";
import Quack from "../imgProjects/Quack-A-Goose.svg";
import StudyBuddy from "../imgProjects/StudyBuddy.svg";
import CreatorCuts from "../imgProjects/CreatorsCuts.svg";
import SUSB from "../imgProjects/SUSB.svg";

function Projects() {
  const projects = [
    {
      id: "oh-my-camel",
      title: "Your Desert Buddy",
      subTitle: "Oh My Camel!",
      description:
        "A wholesome pet sim… with a very lumpy twist! A fun game developed and designed for the CS3110 final project.",
      timeSpent: "3 weeks",
      tools: ["OCaml", "Raylib"],
      image: OhMyCamel,
      isComplete: true,
    },
    {
      id: "quack-a-goose",
      title: "A mole, a goose, or...?",
      subTitle: "Qu-wack a Mole",
      description:
        "A whack a mole game but without a mole?? drew and implemented a interactive project for APCSA.",
      timeSpent: "1 month",
      tools: ["Java", "Medibang Paint"],
      image: Quack,
      isComplete: true,
    },
    {
      id: "study-buddy",
      title: "A Friend to Lock in with",
      subTitle: "Study Buddy",
      description:
        "Won best backend award in AppDev’s Hack Challenge. An app that helps Cornell students study friends!",
      timeSpent: "1 week",
      tools: ["Figma", "Swift", "Docker"],
      image: StudyBuddy,
      isComplete: true,
    },
    {
      id: "creator-cuts",
      title: "YouTube Case Study",
      subTitle: "Creator’s Cuts",
      description:
        "Conducted user research to design a new feature of YouTube to help users create more personalized recommendations.",
      timeSpent: "3 months",
      tools: ["Figma"],
      image: CreatorCuts,
      isComplete: true,
    },
    {
      id: "SUSB",
      title: "Sustainabytes",
      subTitle: "Club Website",
      description:
        "Developing the website of Sustainabytes @ Cornell University. Spreading Computational Sustainability.",
      timeSpent: "1 month",
      tools: ["Figma", "React", "CSS", "JavaScript"],
      image: SUSB,
      isComplete: true,
      externalLink: "https://sustainabytes.org",
    },
  ];

  return (
    <div className="projects">
      {projects.map((project, index) => {
        const isExternal = !!project.externalLink;

        const Tag = isExternal ? "a" : Link;
        return (
          <Tag
            key={index}
            {...(isExternal
              ? {
                  href: project.externalLink,
                  target: "_blank",
                  rel: "noreferrer",
                }
              : { to: project.isComplete ? `/${project.id}` : "#" })}
            className="project-card-link"
            style={{ textDecoration: "none", color: "var(--clr-neutral-100)" }}
          >
            <div
              key={index}
              className={project.isComplete ? "project" : "project notDone"}
              style={project.isComplete ? {} : { cursor: "default" }}
            >
              {project.isComplete ? (
                <div
                  className="header"
                  style={{ color: "var(--clr-secondary-300)" }}
                >
                  <p>MISSON COMPLETE</p>
                  <p>~ {project.timeSpent}</p>
                </div>
              ) : (
                <div className="header" style={{ color: "hsl(352 100% 65%)" }}>
                  <p>CURRENTLY EXPLORING</p>
                  <p>......</p>
                </div>
              )}

              <div className="image">
                <img src={project.image} alt="" />
              </div>

              <div className="name" style={{ display: "flex" }}>
                <h2 className={project.isComplete ? "title" : "title not"}>
                  {project.title} <span>✦ {project.subTitle}</span>
                </h2>
              </div>

              <p
                className="projectBio"
                style={{ color: "var(--clr-primary-500)" }}
              >
                {project.description}
              </p>

              <div className="tools">
                {project.tools.map((tool, toolInd) => (
                  <p key={toolInd} className="tool">
                    {tool}
                  </p>
                ))}
              </div>
            </div>
          </Tag>
        );
      })}
      {projects.length % 2 == 0 ? (
        <div></div>
      ) : (
        <div
          className="centerFlex"
          style={{ flexDirection: "column", gap: "10px" }}
        >
          <img
            src={WhirlPool}
            alt="A whirlpool of fish"
            style={{
              width: "65%",
              background:
                "radial-gradient(circle, var(--clr-primary-600) 0%, hsl( from var(--clr-primary-600) h s l / 0) 60% )",
            }}
          />

          <p>More projects to come!</p>
        </div>
      )}
    </div>
  );
}

export default Projects;
