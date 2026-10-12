import "./projects.css";
import { useRef, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../theme";

// Night images (main folder)
import BeeWitched from "../imgProjects/BeeWitched.svg";
import OhMyCamel from "../imgProjects/Oh-My-Camel.svg";
import Quack from "../imgProjects/Quack-A-Goose.svg";
import StudyBuddy from "../imgProjects/StudyBuddy.svg";
import CreatorCuts from "../imgProjects/CreatorsCuts.svg";
import SUSB from "../imgProjects/SUSB.svg";
import FamJam from "../imgProjects/FamJam.svg";
import CornellGO from "../imgProjects/CornellGO.svg";
import Loop from "../imgProjects/Loop.svg";
import Darn from "../imgProjects/Darn.svg";

// Day images
import BeeWitchedDay from "../imgProjects/day/BeeWitched.svg";
import OhMyCamelDay from "../imgProjects/day/Oh-My-Camel.svg";
import QuackDay from "../imgProjects/day/Quack-A-Goose.svg";
import CreatorCutsDay from "../imgProjects/day/CreatorsCuts.svg";
import SUSBDay from "../imgProjects/day/SUSB.svg";
import FamJamDay from "../imgProjects/day/FamJam.svg";
import CornellGODay from "../imgProjects/day/CornellGO.svg";
import LoopDay from "../imgProjects/day/Loop.svg";
import DarnDay from "../imgProjects/day/Darn.svg";

import loaderDay from "../assets/fishStatic.svg";
import loaderNight from "../assets/fishStaticNight.svg";

// Order of cards when "Featured" is selected
const FEATURED_ORDER = ["Loop", "BeeWitched", "CornellGO", "creator-cuts"];
const EASE = "cubic-bezier(.2,.7,.3,1)";

function Projects({ filter = "All" }) {
  const night = useTheme() === "dark";
  const gridRef = useRef(null);
  const prevIds = useRef(null);

  const projects = [
    {
      id: "Loop",
      title: "Loop",
      subTitle: "Chrome Extension",
      description:
        "Chrome extension that helps Cornell students cut through listserv clutter and find events, opportunities, and resources that matter to them.",
      timeSpent: "-----",
      tools: ["Launching Soon!"],
      categories: ["Featured", "Case Studies", "Web"],
      image: Loop,
      imageDay: LoopDay,
      isComplete: false,
      externalLink: "https://new.cornelldti.org/products#loop",
    },
    {
      id: "BeeWitched",
      title: "BeeWitched",
      subTitle: "Available on Steam",
      description:
        "A relaxing and charming gardening simulator combined with potion crafting. The shop depends on you!",
      timeSpent: "4 months",
      tools: ["Shipped", "BostonFig Finalist", "2026"],
      categories: ["Featured", "Coding & Design", "Web"],
      image: BeeWitched,
      imageDay: BeeWitchedDay,
      isComplete: true,
      externalLink: "https://store.steampowered.com/app/4811560/BeeWitched/",
    },
    {
      id: "CornellGO",
      title: "CornellGO",
      subTitle: "Gamified Navigation",
      description:
        "CornellGO is a scavenger hunt app that makes discovering campus easy and fun through interactive, location-based challenges.",
      timeSpent: "2 months",
      tools: ["Shipped", "2026"],
      categories: ["Featured", "Case Studies", "Mobile"],
      image: CornellGO,
      imageDay: CornellGODay,
      isComplete: true,
      externalLink: "https://new.cornelldti.org/products#cornellgo",
    },
    {
      id: "creator-cuts",
      title: "YouTube Case Study",
      subTitle: "Creator’s Cuts",
      description:
        "Conducted user research to design a new feature of YouTube to help users create more personalized recommendations.",
      timeSpent: "3 months",
      tools: ["Case-Study", "2025"],
      categories: ["Featured", "Case Studies", "Mobile"],
      image: CreatorCuts,
      imageDay: CreatorCutsDay,
      isComplete: true,
    },
    {
      id: "FamJam",
      title: "FamJam",
      subTitle: "Rice Design-a-thon 2026",
      description:
        "Created an inclusive game to close the gap between different generations. Won best beginner design!",
      timeSpent: "2 days",
      tools: ["Concept", "2026"],
      categories: ["Case Studies", "Mobile"],
      image: FamJam,
      imageDay: FamJamDay,
      isComplete: true,
      externalLink: "https://devpost.com/software/team-tennn?ref_content=my-projects-tab&ref_feature=my_projects",
    },
    {
      id: "darn",
      title: "Darn",
      subTitle: "Resource Website",
      description:
        "Redesigned DARN's internal and admin website utilizing Claude-code to speed up high-fis to production on wordpress within 2 months",
      timeSpent: "2 months",
      // tools: ["Figma", "Claude-Code", "UiChemy", "Wordpress"],
      tools: ["Shipped", "2026"],
      categories: ["Case Studies", "Web"],
      image: Darn,
      imageDay: DarnDay,
      isComplete: true,
    },
    {
      id: "oh-my-camel",
      title: "Your Desert Buddy",
      subTitle: "Oh My Camel!",
      description:
        "A wholesome pet sim… with a very lumpy twist! A fun game developed and designed for the CS3110 final project.",
      timeSpent: "3 weeks",
      tools: ["Prototype", "2025"],
      categories: ["Coding & Design", "Web"],
      image: OhMyCamel,
      imageDay: OhMyCamelDay,
      isComplete: true,
    },
    {
      id: "quack-a-goose",
      title: "A mole, a goose, or...?",
      subTitle: "Qu-wack a Mole",
      description:
        "A whack a mole game but without a mole?? drew and implemented a interactive project for APCSA.",
      timeSpent: "1 month",
      tools: ["Prototype", "2023"],
      categories: ["Coding & Design", "Web"],
      image: Quack,
      imageDay: QuackDay,
      isComplete: true,
    },
    {
      id: "SUSB",
      title: "Sustainabytes",
      subTitle: "Club Website",
      description:
        "Developing the website of Sustainabytes @ Cornell University. Spreading Computational Sustainability.",
      timeSpent: "1 month",
      tools: ["Shipped", "2025"],
      categories: ["Coding & Design", "Web"],
      image: SUSB,
      imageDay: SUSBDay,
      isComplete: true,
      externalLink: "https://sustainabytes.org",
    },

    // {
    //   id: "study-buddy",
    //   title: "A Friend to Lock in with",
    //   subTitle: "Study Buddy",
    //   description:
    //     "Won best backend award in AppDev’s Hack Challenge. An app that helps Cornell students study friends!",
    //   timeSpent: "1 week",
    //   tools: ["Concept", "2025"],
    //   categories: [],
    //   image: StudyBuddy,
    //   isComplete: true,
    // },
  ];

  let shown =
    filter === "All" ? projects : projects.filter((p) => p.categories.includes(filter));

  if (filter === "Featured") {
    shown = [...shown].sort(
      (a, b) => FEATURED_ORDER.indexOf(a.id) - FEATURED_ORDER.indexOf(b.id)
    );
  }

  // Shuffle animation: cards that stay slide to their new spot, new cards fade up one by one.
  // Safe to click quickly: each card starts from wherever it currently is on screen.
  useLayoutEffect(() => {
    const cards = [...gridRef.current.querySelectorAll("[data-pid]")];
    const old = prevIds.current;
    prevIds.current = new Set(cards.map((el) => el.dataset.pid));
    if (!old) return; // skip on first page load

    const visual = cards.map((el) => el.getBoundingClientRect());
    cards.forEach((el) => el.getAnimations().forEach((a) => a.cancel()));

    let i = 0;
    cards.forEach((el, n) => {
      const r = el.getBoundingClientRect();
      if (old.has(el.dataset.pid)) {
        const dx = visual[n].left - r.left, dy = visual[n].top - r.top;
        if (dx || dy) {
          el.animate(
            [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "none" }],
            { duration: 550, easing: EASE }
          );
        }
      } else {
        el.animate(
          [{ opacity: 0, transform: "translateY(28px) scale(.95)" }, { opacity: 1, transform: "none" }],
          { duration: 480, delay: 70 * i++, easing: EASE, fill: "backwards" }
        );
      }
    });
  }, [filter]);

  return (
    <div className="projects" ref={gridRef}>
      {shown.map((project) => {
        const isExternal = !!project.externalLink;
        const Tag = isExternal ? "a" : Link;

        return (
          <Tag
            key={project.id}
            data-pid={project.id}
            {...(isExternal
              ? {
                  href: project.externalLink,
                  target: "_blank",
                  rel: "noreferrer",
                }
              : { to: project.isComplete ? `/${project.id}` : "#" })}
            className="project-card-link"
            style={{ textDecoration: "none", color: "var(--clr-page-text)" }}
          >
            <div
              className={project.isComplete ? "project" : "project notDone"}
              style={project.isComplete ? {} : { cursor: "default" }}
            >
              <div className="image">
                <img src={project.imageDay || project.image} alt="" className="imgDay" />
                <img src={project.image} alt="" className="imgNight" />
              </div>

              <div className="name" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 className={project.isComplete ? "title" : "title not"}>
                  {project.title}
                </h2>

                <div className="tools">
                  {project.tools.map((tool, toolInd) => (
                    <p key={toolInd} className="tool">
                      {tool}
                    </p>
                  ))}
                </div>
              </div>

              <p
                className="projectBio"
                style={{ color: "var(--clr-secondary-500)" }}
              >
                {project.description}
              </p>
            </div>
          </Tag>
        );
      })}
      {shown.length % 2 === 0 ? (
        <div></div>
      ) : (
        <div
          className="centerFlex"
          style={{ flexDirection: "column", gap: "10px" }}
        >
          <img
            src={night ? loaderNight : loaderDay}
            alt="A fish leaping over the waves"
            style={{ width: "65%", display: "block", border: "4px solid hsl(209, 49%, 75%)", borderRadius: "22px"}}
          />
          <p>More projects to come!</p>
        </div>
      )}
    </div>
  );
}

export default Projects;