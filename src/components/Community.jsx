import "./projects.css";
import NewbieSocial from "../assets/NewbieSocial.jpg";
import RABoard from "../assets/RABoard.jpg";
import Advantage from "../assets/Advantage.jpg";
import BeeWitched from "../imgProjects/BeeWitched.svg";
import OhMyCamel from "../imgProjects/Oh-My-Camel.svg";
import FamJam from "../imgProjects/FamJam.svg";

function Communities() {
  const communities = [
    {
      id: "DTI",
      title: "Design Team Social",
      subTitle: "Newbie Social",
      description:
        "Had an amazing dinner with the design team on DTI!",
      image: NewbieSocial,
    },
    {
      id: "ResidentAdvisor",
      title: "Bulletin Board",
      subTitle: "RA",
      description:
        "Made a introduction bulletin board for the Fall 2026 semester!",
      image: RABoard,
    },
    {
      id: "AdvantageAcademy",
      title: "Last Day of STEM Class",
      subTitle: "Fun Experiment",
      description:
        "My last day teaching in the summer! We made ice cream from scratch to celebrate.",
      image: Advantage,
    },
  ];

  return (
    <div className="communities">
      {communities.map((project, index) => {
        return (
        <div
            key={index}
            className={"project"}
            style={{ cursor: "default" }}
        >

            <div className="comImage">
            <img src={project.image} alt="" />
            </div>

            <div className="name" style={{ display: "flex" }}>
            <h2 className={"title"}>
                {project.title} <span>✦ {project.subTitle}</span>
            </h2>
            </div>

            <p
            className="projectBio"
            style={{ color: "var(--clr-primary-500)" }}
            >
            {project.description}
            </p>
        </div>
        );
      })}
    </div>
  );
}

export default Communities;
