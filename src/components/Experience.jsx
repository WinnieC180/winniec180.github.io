import "./about.css";
import Anchor from "../assets/anchor.svg";
import Line from "../assets/line.png";

function Experience() {
  const devTools = [
    "Python",
    "Java",
    "OCaml",
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "GitHub",
  ];

  const designTools = ["Figma", "Medibang Paint"];

  const educations = [
    {
        school: "Brooklyn Technical High School",
        major: "Software Engineering",
        gradClass: "2024"
    }, 
    {
        school: "Cornell University",
        major: "Computer Science",
        gradClass: "2028"
    }
  ]

  const experiences = [
    {
        work: "Sustainabytes | Organization @ Cornell",
        role: "Web-Development (co-lead)",
        timeline: "Feb 2025 ~ Present"
    },
    {
        work: "Cornell Housing & Residential Life",
        role: "Resident Advisor (RA)",
        timeline: "Aug 2025 ~ Present"
    },
    {
        work: "Advantage Academy | Summer/After School",
        role: "STEM Teacher and Teacher Assistant ",
        timeline: "June 2022 ~ Aug 2025"
    },
    {
        work: "Novick's Cafe @ Cornell Dining",
        role: "Student Dining Associate | Barista & Cashier",
        timeline: "Aug 2024 ~ Feb 2025"
    }, 
    {
        work: "Pathfinders",
        role: "Computer Science Student Intern",
        timeline: "Feb 2023 ~ Aug 2023"
    }
  ]

  return (
    <div className="kit" style={{display: "flex", flexDirection: "column", marginTop: "70px"}}>
        <div className="centerFlex">
            <img src={Line} alt="A short line" style={{width: "28vw"}}/>
            <p style={{fontSize: "clamp(12px, 1.5vw + 0.5rem, 20px)"}}>EXPERIENCE LOG</p>
            <img src={Line} alt="A short line" style={{width: "28vw"}}/>
        </div>

        <div className= "centerFlex myBio" style={{marginTop: "30px"}}>
            <div className="toolsNEdu">
                <div
                    className="toolkit"
                    style={{ display: "flex", flexDirection: "column", gap: "30px" }}
                >
                    <div style={{ display: "flex", gap: "10px" }}>
                        <img src={Anchor} alt="An icon of a blue anchor" />
                        <h2>
                            <em>Technical Toolkit</em>
                        </h2>
                    </div>

                    <div className="myTools" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <p style={{ color: "var(--clr-secondary-300)" }}>DEV TOOLS</p>

                        <div className="devTools">
                            {devTools.map((devTool, index) => (
                            <div key={index} className="centerFlex devTool">
                                {devTool}
                            </div>
                            ))}
                        </div>
                    </div>

                    <div className="myTools" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        <p style={{ color: "var(--clr-secondary-300)" }}>DESIGN TOOLS</p>

                        <div className="designTools">
                            {designTools.map((designTool, index) => (
                            <div key={index} className="centerFlex designTool">
                                {designTool}
                            </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="education" style={{ display: "flex", flexDirection: "column", gap: "30px",  width: "380px"}}>
                    <div>
                        <h2>
                            <em>Education</em>
                        </h2>
                    </div>

                    {educations.map((education, eduIndex) => (
                        <div className="school" key={eduIndex}>
                            <p><span style={{color: "var(--clr-secondary-300)"}}>✦</span> {education.school}</p>
                            <p style={{color: "var(--clr-neutral-200)"}}>{education.major}</p>
                            <p style={{color: "var(--clr-secondary-300)"}}>Class of {education.gradClass}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className= "myExperiences">
                <div className="experiences" style={{ display: "flex", flexDirection: "column", gap: "30px", width: "380px" }}>
                    <div>
                        <h2>
                            <em>Experiences</em>
                        </h2>
                    </div>
                    {
                        experiences.map((experience, index) => (
                            <div className="experience" key={index}>
                                <p style={{color: "var(--clr-secondary-300)"}}>{experience.timeline}</p>
                                <p className="workPlace">{experience.work}</p>
                                <p style={{color: "var(--clr-neutral-200)"}}>{experience.role}</p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </div>
  );
}

export default Experience;
