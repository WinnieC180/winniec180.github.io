import OhMyCamel from "../imgProjects/Oh-My-Camel.svg";
import QuackAGoose from "../imgProjects/Quack-A-Goose.svg";
import CreatorsCut from "../imgProjects/CreatorsCuts.svg";
import StudyBuddy from "../imgProjects/StudyBuddy.svg";
import Darn from "../imgProjects/Darn.svg";
import YouTubeBanner from "../assets/banners/YouTubeBanner.png";

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
          { Role: "Developer &amp; Artist" },
          { Timeline: "Fall 2025 \n(3 weeks)" },
          { Tools: "OCaml, Raylib, \nMedibang Paint Pro" },
        ],
      },
      {
        id: "description",
        label: "Description",
        content:
          "Oh My Camel is a game created for CS 3110 (Data Structures and Functional Programming). It is a turn-based camel pet simulator. The player starts with a pet camel whose happiness, hunger, and hygiene stats begin at a maximum of 100, along with a set amount of coins. \n\nEach turn (or day), the player chooses what to do: play with the camel, feed it, clean it, or play minigames.",
      },
      {
        id: "play-through",
        label: "Play Throughs",
        subLabel: "Minigames that could earn you coins!",
        videos: [
          { name: "Jumping Game", link: "./videos/Jumping.mp4" },
          { name: "Memory Game", link: "./videos/Memorygame.mp4" },
          { name: "Number Game &amp; Inventory", link: "./videos/numberGame.mp4" },
          { name: "Dune!", link: "./videos/Dune!.mp4" },
        ],
      },
      {
        id: "reflection",
        label: "Reflection",
        content:
          "Working on Oh My Camel was an incredibly fun and rewarding experience. It was a fast-paced, highly collaborative project that grew to over 1,600 lines of code and required constant iteration on our ideas. As a team, we explored multiple concepts and weighed what was both feasible and impactful so we could meet the project requirements within the allotted time. \n\nThrough this process, I learned a great deal about collaboration and the realities of building a project as a group, especially how to balance creativity with practicality. I also gained experience prioritizing features: knowing when to refine an idea and when to set one aside to keep the project reasonable, functional, and enjoyable for everyone.",
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
          { Role: "Developer &amp; Artist" },
          { Timeline: "Spring 2023 \n(1 month)" },
          { Tools: "Java, \nMedibang Paint Pro" },
        ],
      },
      {
        id: "description",
        label: "Description",
        content:
          "Quack a Goose is a fun, fast-paced game inspired by Whack-a-Mole, where players try to quack geese as they pop up on the screen. Within a 30-second time limit, players test their reaction speed by hitting as many geese as possible, with the challenge increasing as more geese spawn over time. But there’s a twist! The game features an alternate mode called “People,” where, thanks to volunteers from our AP Computer Science A class, photos of fellow CS students and even our teacher take the place of the geese, adding a personal and humorous touch to the gameplay.",
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
          "We presented Quack a Goose! to our AP Computer Science A class as our final project, and our peers voted it the second-best project. The $5 Amazon gift card we earned was a fun bonus after all the hard work. Creating Quack a Goose was both enjoyable and educational, and it challenged me to think deeply about game design, user engagement, and collaboration. Designing a fast-paced game within a 30-second time limit required careful attention to pacing and difficulty, especially as more geese spawned over time to keep players engaged. This project was also my first time working collaboratively on a large coding project, which taught me how important communication and teamwork are when developing complex programs. One of the most rewarding parts was adding the “People” game mode. Incorporating photos of classmates and our teacher, with their permission, made the game more personal and entertaining, and showed me how small creative decisions can significantly improve the user experience. This feature pushed me to think beyond basic functionality and consider how personalization and humor can make a project more memorable.",
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
          "Study Buddy is a mobile app created for Cornell University students to help them find compatible study partners based on shared study habits, schedules, and preferences. By reducing the friction of coordinating study sessions, Study Buddy aims to ease academic stress during high-pressure periods such as prelims and finals, while fostering accountability, collaboration, and community among students.",
      },
      {
        id: "problem-space",
        label: "Problem Space",
        content:
          "Students often experience intense academic pressure, especially during prelim and finals season. While studying with others can improve motivation and understanding, finding a compatible study partner is challenging. Students struggle with: \n\n• Mismatched study styles (quiet vs. collaborative)\n• Scheduling conflicts\n• Awkward or time-consuming coordination through group chats\n• No centralized platform for finding study companions\n\n",
        peopleProblem:
          "How might we make it easier for students to find the right people to study with during high-stress academic periods?",
      },
      {
        id: "user-personas",
        label: "User Personas",
        content:
          "Because this was a fast-paced, one-week project, there was limited time for in-depth user research. To guide our design decisions, we created two representative personas based on common student experiences at Cornell, informal conversations with peers, and our own academic experiences. These personas helped us stay user-focused while prioritizing core needs and constraints.",
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
              "I created low-fidelity sketches to quickly visualize and refine the core experience of Study Buddy, centered on swipe-based study partner matching, calendar-based planning, and group messaging to make organizing study sessions effortless.",
          },
          { type: "image", value: "./photos/LowFi-studdybuddy.png" },
          {
            type: "text",
            value:
              "As a developer myself, I had to switch off my developer mindset during the early stages so that feasibility and implementation details wouldn't limit what I designed. After sharing the low-fi sketches and discussing constraints with the development team, we determined that within the limited timeframe we could realistically build the core features: swipe-based profile matching, group chat, and study partner matches.",
          },
        ],
      },
    ],
  },
  {
    id: "creator-cuts",
    subTitle: "Creator's Cuts",
    title: "Creator’s Cuts: Giving viewers control over their YouTube recommendations",
    image: CreatorsCut,
    banner: YouTubeBanner,
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Role: "UI/UX Designer" },
          { Timeline: "Fall 2025 (3 months)" },
          { Team: "Solo" },
          { Tools: "Figma" },
        ],
      },
      {
        id: "context",
        label: "Context",
        heading: "What is Creator’s Cuts?",
        content:
          "Creator’s Cuts is a YouTube feature concept that lets viewers divide their For You page into custom, color-coded categories they define themselves. By sorting content intentionally, viewers send clearer signals to the recommendation algorithm, so YouTube can surface videos that match their interests and viewing intent while showing fewer irrelevant suggestions.",
      },
      {
        id: "case-preview",
        label: "Final designs",
        heading: "Three core flows",
        videos: [
          { name: "Entry points", link: "./videos/entry-point.mp4" },
          { name: "Creating a new cut", link: "./videos/creating-cut.mp4" },
          { name: "Editing and deleting cuts", link: "./videos/edit-delete-cut.mp4" },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        heading: "How did my first problem statement hold up?",
        content: [
          { type: "text", value: "I started this case study with a people problem drawn from my own viewing habits:" },
          {
            type: "highlight",
            label: "Original people problem",
            value: "As someone who often doom-scrolls, I want to watch short, funny clips from long streams I didn’t have time to see.",
          },
          { type: "image", value: "./photos/But....png" },
          {
            type: "text",
            value: "This statement described my own frustration, not a need I had confirmed with other viewers. Before designing anything, I needed to find out whether other people shared it.",
          },
        ],
      },
      {
        id: "problem-space",
        label: "Reframing",
        eyebrow: "Problem space",
        heading: "Reframing the problem",
        content: [
          {
            type: "text",
            value: "Viewers often open YouTube during a break to find something specific, but getting to it is harder than it should be:",
          },
          {
            type: "list",
            items: [
              "Viewers prefer quick, effortless discovery over actively searching for videos.",
              "Eye-catching but unrelated videos pull viewers away from what they came to watch.",
            ],
          },
        ],
        peopleProblem:
          "How might we enable users to effortlessly find specific content on YouTube during breaks while minimizing distractions from visually appealing but irrelevant videos?",
      },
      {
        id: "user-research",
        label: "Research",
        eyebrow: "User research",
        heading: "Learning from YouTube viewers",
        content: [
          {
            type: "text",
            value: "To make sure I was solving a shared problem rather than my own, I interviewed both frequent and occasional YouTube users about how they find videos and where they get stuck.",
          },
          {
            type: "text",
            value: "From their most common pain points, I created a persona, Felix, to represent the people I was designing for:",
          },
          { type: "image", value: "./photos/Felix.png" },
          {
            type: "text",
            value: "This led to the central question: how might we make finding content effortless for someone like Felix?",
          },
        ],
      },
      {
        id: "brainstorm",
        label: "Ideation",
        heading: "From insights to ideas",
        content: [
          {
            type: "text",
            value: "Using the patterns from my interviews, I wrote How Might We statements, sketched possible solutions, and voted on which ideas were worth pursuing.",
          },
          { type: "image", value: "./photos/HMW.png" },
          { type: "image", value: "./photos/Solutions.png" },
          { type: "image", value: "./photos/vote.png" },
          {
            type: "text",
            value: "I then sketched low-fidelity wireframes for the three most-voted and most feasible ideas:",
          },
          {
            type: "list",
            items: [
              "Historical Archives: a playlist-like folder that resurfaces creators you watch often so you can rewatch their videos.",
              "Break Timer: a Pomodoro-style timer, similar to what many third-party apps offer.",
              "Custom Category Tags: letting users group videos together and get more recommendations like them in categorized folders.",
            ],
          },
          {
            type: "text",
            value: "After gathering feedback, I moved forward with Custom Category Tags, which later became Creator’s Cuts.",
          },
          { type: "image", value: "./photos/YouTubeLow1.png" },
          { type: "image", value: "./photos/YouTubeLow2.png" },
        ],
      },
      {
        id: "design-decisions",
        label: "Design decisions",
        heading: "What did I change, and what did I keep?",
        content: [
          {
            type: "text",
            value: "Entry point: how do users view their cuts?",
          },
          { type: "image", value: "./photos/DesignChoices1YT.png" },
          {
            type: "text",
            value: "How do users edit and delete a cut?",
          },
          { type: "image", value: "./photos/DesignChoices2YT.png" },
          // TODO: this block duplicated the one above (same text + image). Swap in the third decision, or delete.
          {
            type: "text",
            value: "How do users edit and delete a cut?",
          },
          { type: "image", value: "./photos/DesignChoices2YT.png" },
        ],
      },
      {
        id: "reflections",
        label: "Reflections",
        heading: "What did I learn from my first case study?",
        content: [
          {
            type: "text",
            value: "Creator’s Cuts was my first full case study, and the biggest lesson came before I designed a single screen: my starting problem was my own. I assumed other viewers wanted what I wanted, short clips from long streams. Interviewing frequent and occasional YouTube users showed me the shared problem was different. People wanted to find something specific during a break without getting pulled away by eye-catching, unrelated videos.",
          },
          {
            type: "highlight",
            label: "Key takeaway",
            value: "Validate the problem before solving it. My own frustration was a starting point, not evidence.",
          },
          {
            type: "text",
            value: "Working through How Might We statements, solution sketches, and voting taught me to go wide before narrowing down. I wireframed three directions and let feedback decide which one to pursue, rather than committing to my first idea. Keeping Felix in mind made later design decisions, like where cuts live and how they are edited, easier to make and explain.",
          },
          {
            type: "text",
            value: "Since this was a solo project, I was responsible for every step, from research to final flows. If I continued Creator’s Cuts, I would run usability tests on the final designs with the same viewers I interviewed to see whether sorting their feed into cuts actually helps them find what they came for.",
          },
        ],
      },
    ],
  },
  {
    id: "darn",
    subTitle: "DARN",
    image: Darn,
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Team: "1 PM, 1 TPM, 2 developers, 3 designers" },
          { Role: "Designer" },
          { Timeline: "Summer 2026 \n(2 months)" },
          { Tools: "Figma, Claude Code, UiChemy, WordPress" },
        ],
      },
      {
        id: "description",
        label: "Description",
        content:
          "DARN (Developmental Assets Resource Network) is a nonprofit organization based in Bexley, Ohio. We connected with DARN through the Develop for Good program. As a designer, I helped redesign their internal website and counselor/admin pages to better manage resources among counselors across Ohio. We met with a DARN representative throughout the project, and with the help of Claude Code and UiChemy, we moved our designs quickly from Figma to WordPress and delivered a finished product.",
      },
    ],
  },
];
