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
        id: "play-through",
        label: "Play Throughs",
        subLabel: "Minigames that could earn you coins!",
        videos: [
          { name: "Jumping Game", link: "./videos/Jumping.mp4" },
          { name: "Memory Game", link: "./videos/Memorygame.mp4" },
          { name: "Number Game & Inventory", link: "./videos/numberGame.mp4" },
          { name: "Dune!", link: "./videos/Dune!.mp4" },
        ],
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
        id: "play-through",
        label: "Play Throughs",
        subLabel: "",
        videos: [
          { name: "Geese Mode", link: "./videos/Quack-a-Goose.mp4" },
          { name: "People Mode", link: "./videos/peopleMode.mp4" },
        ],
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
          {
            Team: "2 frontend developers \n2 backend developers \n1 UI/UX designer",
          },
          { Role: "UI/UX Designer" },
          { Timeline: "Fall 2025 \n(1 week)" },
          { Tools: "Figma" },
        ],
      },
      {
        id: "context",
        label: "Context",
        content:
          "Study Buddy is a mobile application created for Cornell University students to help them find compatible study partners based on shared study habits, schedules, and preferences. By reducing the friction of coordinating study sessions, Study Buddy aims to ease academic stress during high-pressure periods such as prelims and finals, while fostering accountability, collaboration, and community among students.",
      },
      {
        id: "problem-space",
        label: "Problem Space",
        content:
          "Students often experience intense academic pressure, especially during prelim and final seasons. While studying with others can improve motivation and understanding, finding a compatible study partner is challenging. Students struggle with: \n\n• Mismatched study styles (quiet vs. collaborative)\n• Scheduling conflicts\n• Awkward or time-consuming coordination through group chats\n• Lack of a centralized platform for finding study companions\n\n",
        peopleProblem:
          "How might we make it easier for students to find the right people to study with during high-stress academic periods?",
      },
      {
        id: "user-personas",
        label: "User Personas",
        content:
          "As this was a fast-paced, one-week project, there was limited time to conduct in-depth user research. To guide our design decisions, we created two representative personas based on common student experiences at Cornell, informal conversations with peers, and our own academic experiences. These personas helped us stay user-focused while prioritizing core needs and constraints.",
        pictures: [
          "./photos/Persona1-studybuddy.svg",
          "./photos/Persona2-studybuddy.svg",
        ],
      },
      {
        id: "ideation",
        label: "Ideation",
        content: [
          {
            type: "text",
            value:
              "I created low-fidelity sketches to quickly visualize and refine the core experience of Study Buddy, centering on swipe-based study partner matching, calendar-based planning, and group messaging to make organizing study sessions effortless.",
          },
          { type: "image", value: "./photos/LowFi-studdybuddy.png" },
          {
            type: "text",
            value:
              "As a developer myself, I had to turn off my developer side and not constraint myself based on feasibility and how something is implemented, so I won't constraint what i could design based on feasibility in the early stage. After the low-fi and discussing constraints with the development team, we determined that within the limited timeframe we could realistically implement the core features, including swipe-based profile matching, group chat, and study partner matches.",
          },
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
      {
        id: "context",
        label: "Context",
        content:
          "Creator’s Cuts is a YouTube feature concept that allows users to organize videos and Shorts into custom, color-coded categories they create themselves. By intentionally categorizing content, users can influence their recommendation feed, enabling YouTube to surface videos that better match their interests and viewing intent while reducing irrelevant recommendations.",
      },
      {
        id: "case-preview",
        label: "Preview",
        subLabel: "",
        videos: [
          { name: "Entry points", link: "./videos/entry-point.mp4" },
          { name: "Creating a new cut", link: "./videos/creating-cut.mp4" },
          { name: "Editing & Deleting existing cuts", link: "./videos/edit-delete-cut.mp4" },
        ],
      },
      {
        id: "problem-space",
        label: "Problem Space",
        content:
          "YouTube allows users to find specific content they are searching for during a break, but it is difficult to find that content because… \n\n1. Users prefer quick, effortless discovery instead of actively searching for videos\n2. Users often get distracted by other visually appealing content, straying away from original goal",
        peopleProblem:
          "How might we enable users to effortlessly find specific content on YouTube during breaks while minimizing distractions from visually appealing but irrelevant videos?",
      },
      {
        id: "user-research",
        label: "User Research",
        content: [
          {
            type: "text",
            value:
              "YouTube allows users to find specific content they are searching for during a break, but it is difficult to find that content because… \n\n1. Users prefer quick, effortless discovery instead of actively searching for videos\n2. Users often get distracted by other visually appealing content, straying away from original goal",
          },
          {
            type: "highlight",
            value:
              "Originally I had a different people problem, so how did I come up with this people problem?",
          },
          {
            type: "text",
            value: 
              "After conducting some reasearch, I have created some personas"
          },
          {
            type: "image",
            value: 
              ""
          },
          {
            type: "text",
            value: 
              "After conducting some reasearch, I have created some personas"
          },
        ],
      },
    ],
  },
];
