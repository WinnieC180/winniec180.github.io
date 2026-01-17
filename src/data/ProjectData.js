import OhMyCamel from "../imgProjects/Oh-My-Camel.svg";
import QuackAGoose from "../imgProjects/Quack-A-Goose.svg";
import CreatorsCut from "../imgProjects/CreatorsCuts.svg";
import StudyBuddy from "../imgProjects/StudyBuddy.svg";

export const ProjectData = [
  {
    id: "oh-my-camel",
    subTitle: "Oh My Camel!",
    image: OhMyCamel,
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Team: "4 developers" },
          { Role: "Developer & Artist" },
          { Timeline: "Fall 2025 \n(3 weeks)" },
          { Tools: "OCaml, Raylib, \nMedibang Paint Pro" },
        ],
      },
      {
        id: "description",
        label: "Description",
        content:
          "Oh My Camel is a game created for the CS 3110 (Data Structures and Functional Programming) course. A camel pet simulator game with turn-based logic. The player starts with a petcamel with happiness, hunger, and hygiene statistics set at a maximum value of 100 and a certainamount of coins. \n\nThe player can choose what to do in each turn/day: play with a pet, feed a pet, clean a pet, or play mini games.",
      },
      {
        id: "reflection",
        label: "Reflection",
        content:
          "Overall, working on Oh My Camel was an incredibly fun and rewarding experience. It was a fast-paced, highly collaborative coding project that grew to over 1,600 lines of code and required constant iteration and refinement of our ideas. As a team, we explored multiple concepts, evaluating what was both feasible and impactful, in order to meet the project requirements and complete it within the allotted time. \n\n Through this process, I learned a great deal about collaboration and the realities of building a project as a group. Balancing creativity with practicality. I also gained valuable experience in prioritizing features, understanding when to refine ideas, and recognizing which features to set aside to keep the project reasonable, functional, and enjoyable for everyone.",
      },
    ],
  },
  {
    id: "quack-a-goose",
    subTitle: "Quack A Goose",
    image: QuackAGoose,
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Team: "2 developers" },
          { Role: "Developer & Artist" },
          { Timeline: "Spring 2023 \n(1 month)" },
          { Tools: "Java, \nMedibang Paint Pro" },
        ],
      },
      {
        id: "description",
        label: "Description",
        content:
          "Quack a Goose is a fun, fast-paced game inspired by Whack-a-Mole, where players try to quack geese as they pop up on the screen. Within a 30-second time limit, players test their reaction speed by hitting as many geese as possible, with the challenge increasing as more geese spawn over time. But there’s a twist! The game features an alternate mode called “People,” where—thanks to volunteers from our AP Computer Science A class—photos of fellow CS students and even our teacher take on the role of the geese, adding a personalized and humorous element to the gameplay.",
      },
      {
        id: "reflection",
        label: "Reflection",
        content:
          "For our final project, we presented Quack a Goose! to our AP Computer Science A class, and it was chosen as the second-best project by our peers. And of course, the $5 Amazon gift card we earned felt like a fun and rewarding bonus after all the hard work. Creating Quack a Goose was both an enjoyable and educational experience that challenged me to think deeply about game design, user engagement, and collaboration. Designing a fast-paced game within a 30-second time limit required careful consideration of pacing and difficulty, especially as more geese spawned over time to keep players engaged. This project also marked my first time working collaboratively on a large-scale coding project, which taught me how important communication and teamwork are when developing complex programs. One of the most rewarding aspects of the project was adding the “People” game mode. Incorporating photos of classmates and our teacher, with their permission, made the game more personal and entertaining, and demonstrated how small creative decisions can significantly enhance the user experience. This feature pushed me to think beyond basic functionality and consider how personalization and humor can make a project more memorable.",
      },
    ],
  },
  {
    id: "study-buddy",
    subTitle: "Study Buddy",
    image: StudyBuddy,
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Team: "2 frontend developers \n2 backend developers \n1 UI/UX designer" },
          { Role: "UI/UX Designer" },
          { Timeline: "Fall 2025 \n(1 week)" },
          { Tools: "Figma" },
        ],
      },
    ],
  },
  {
    id: "creator-cuts",
    subTitle: "Creator's Cuts",
    image: CreatorsCut,
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Team: "Solo" },
          { Role: "UI/UX Designer" },
          { Timeline: "Fall 2025 \n(3 months)" },
          { Tools: "Figma" },
        ],
      },
    ],
  },
];
