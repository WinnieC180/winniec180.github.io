import "./projects.css"

function Projects() {
  const projects = [
    {
      title: "Your Desert Buddy",
      subTitle: "Oh My Camel!",
      description:
        "A wholesome pet sim… with a very lumpy twist! A fun game developed and designed for the CS3110 final project.",
      timeSpent: "3 weeks",
      tools: ["OCaml", "Raylib"],
      isComplete: true
    },
    {
      title: "A mole, a goose, or...?",
      subTitle: "Qu-wack a Mole",
      description:
        "A whack a mole game but without a mole?? drew and implemented a interactive project for APCSA.",
      timeSpent: "1 month",
      tools: ["Java", "Medibang Paint"],
      isComplete: true
    },
    {
      title: "A Friend to Lock in with",
      subTitle: "Study Buddy",
      description:
        "Won best backend award in AppDev’s Hack Challenge. An app that helps Cornell students study friends!",
      timeSpent: "1 week",
      tools: ["Figma", "Swift", "Docker"],
      isComplete: true
    },
    {
      title: "YouTube Case Study",
      subTitle: "Creator’s Cuts",
      description:
        "Conducted user research to design a new feature of YouTube to help users create more personalized recommendations.",
      timeSpent: "3 months",
      tools: ["Figma"],
      isComplete: true
    },
    {
      title: "Sustainabytes",
      subTitle: "Club Website",
      description:
        "Developing the website of Sustainabytes @ Cornell University. Spreading Computational Sustainability.",
      timeSpent: "......",
      tools: ["Figma", "React", "CSS", "JavaScript"],
      isComplete: false
    },
  ];

  return (
    <div className="projects">
        {projects.map((project) => (
            <div className={project.isComplete ? "project" : "project notDone"}>
                {project.isComplete ? 
                    (<div className="header" style={{color: "var(--clr-secondary-300)"}}>
                        <p>MISSON COMPLETE</p>
                        <p>~ {project.timeSpent}</p>
                    </div>) : 
                    (<div className="header" style={{color: "hsl(352 100% 65%)"}}>
                        <p>CURRENTLY EXPLORING</p>
                        <p>......</p>
                    </div>
                    )
                }
                
                <div className="image">

                </div>

                <div className="name" style={{display: "flex"}}>
                    <h2 className="title">{project.title} <span>✦ {project.subTitle}</span></h2>
                </div>
                
                <p className="projectBio" style={{color: "var(--clr-primary-500)"}}>
                    {project.description}
                </p>

                <div className="tools">
                    {project.tools.map ((tool) => (
                        <p className="tool">{tool}</p>
                    ))}
                </div>
            </div>
        ))}
    </div>
  );
}

export default Projects;
