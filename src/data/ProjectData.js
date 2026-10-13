import OhMyCamel from "../imgProjects/Oh-My-Camel.svg";
import QuackAGoose from "../imgProjects/Quack-A-Goose.svg";
import CreatorsCut from "../imgProjects/CreatorsCuts.svg";
import StudyBuddy from "../imgProjects/StudyBuddy.svg";
import Darn from "../imgProjects/Darn.svg";
import YouTubeBanner from "../assets/banners/YouTubeBanner.png";
import DarnBanner from "../assets/banners/DarnBanner.png";
import FamJamBanner from "../assets/banners/FamJamBanner.png";
import CornellGoBanner from "../assets/banners/CornellGoBanner.png";
import LoopBanner from "../assets/banners/LoopBanner.png";

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
          "Oh My Camel is a game created for CS 3110 (Data Structures and Functional Programming). It is a turn-based camel pet simulator. The player starts with a pet camel whose happiness, hunger, and hygiene stats begin at a maximum of 100, along with a set amount of coins. \n\nEach turn (or day), the player chooses what to do: play with the camel, feed it, clean it, or play minigames.",
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
          "Working on Oh My Camel was an incredibly fun and rewarding experience. It was a fast-paced, highly collaborative project that grew to over 1,600 lines of code and required constant iteration on our ideas. As a team, we explored multiple concepts and weighed what was both feasible and impactful so we could meet the project requirements within the allotted time. \n\nThrough this process, I learned a great deal about collaboration and the realities of building a project as a group, especially how to balance creativity with practicality. I also gained experience prioritizing features: knowing when to refine an idea and when to set one aside to keep the project reasonable, functional, and enjoyable for everyone.",
      },
    ],
  },
  {
    id: "FamJam",
    subTitle: "FamJam",
    title: "FamJam: Closing the gap between generations through play",
    image: FamJamBanner,
    banner: FamJamBanner,
    link: "https://devpost.com/software/team-tennn",
    linkLabel: "View on Devpost",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Role: "Designer" },
          { Timeline: "Spring 2026 \n(2 days)" },
          { Team: "4 designers" },
          { Tools: "Figma" },
        ],
      },
      {
        id: "context",
        label: "Context",
        heading: "What is FamJam?",
        content: [
          {
            type: "text",
            value: "Communication is key, but there’s no denying that it can be difficult, especially when it feels like you’re separated by so much. Within families, obstacles such as differing values, priorities, and opinions can lead to generational divides, making each member even more unlikely to share their true thoughts.",
          },
          {
            type: "text",
            value: "FamJam fills the silence, and encourages authentic communication through a series of activities facilitated by a relaxed, living-room friendly mobile app. Players can create and join fams, vote on what to play next, and collect biscuits, which can be exchanged for personalized favors in the shop.",
          },
          {
            type: "text",
            value: "People are busy, so FamJam is ready to go whenever they are. Whether players have a quick ten minutes before dinner or an entire game night ahead, with customizable sprites and games suited for players both young and old, FamJam seeks to help families break bread and connect, with healthy doses of delicious fruit jams, of course.",
          },
          {
            type: "highlight",
            label: "Rice Design-a-thon 2026",
            value: "Won Best Beginner Design.",
          },
        ],
      },
      {
        id: "user-research",
        label: "Research",
        eyebrow: "User research",
        heading: "Surveying 99 people across generations",
        content: [
          {
            type: "text",
            value: "To get a better understanding of the needs of our users, we created a survey with both short response and multiple-choice questions, and fielded responses from Discord, Reddit, and personal group chats. We aimed for a range of participants, posting in online spaces where we could reach people in different age ranges, and collected data on respondents’ birth years, preferred communication styles, and family misunderstandings.",
          },
          {
            type: "text",
            value: "From 99 respondents ranging from Gen X to Gen Alpha, a common pattern emerged: while people care for each other, how this is communicated can often lead to arguments.",
          },
          {
            type: "list",
            items: [
              "97% believe they have learned important lessons, values, or traditions from older generations in their family.",
              "93% believe technology helps cross-generational family connection.",
            ],
          },
          {
            type: "text",
            value: "The short responses gave us greater clarity into the problem space, and we kept several representative quotes in mind throughout the design process:",
          },
          {
            type: "highlight",
            label: "Survey respondent",
            value: "“Their values are a lot more traditional than mine, so having to explain that I considered taking a gap year to explore career possibilities was a difficult conversation.”",
          },
          {
            type: "highlight",
            label: "Survey respondent",
            value: "“My mother often doesn’t understand the importance I place on having a robust support network outside of family (friends, peers, etc.) and this leads to many disagreements about priorities.”",
          },
          {
            type: "highlight",
            label: "Survey respondent (parent)",
            value: "“When I am expressing concern for their safety, my daughter will think I am nagging.”",
          },
        ],
      },
      {
        id: "secondary-research",
        label: "Secondary research",
        heading: "Why play?",
        content: [
          {
            type: "text",
            value: "We paired this primary research with secondary research on existing ways of promoting connection. Studies showed that playing games gives both children and parents an opportunity to see how the other reacts when challenges arise, making it a learning opportunity for both. Playing together also helps people understand other points of view.",
          },
          {
            type: "text",
            value: "Many of our Gen X parent respondents mentioned a difference in communication style as part of the reason misunderstandings occurred, so we focused on parent-child relationships. Participating in leisure activities improves communication and collaboration, and competitive games in particular foster pro-social behaviors in children, such as cooperation and patience.",
          },
        ],
        peopleProblem:
          "How might we use the low-stakes environment of a family game night to encourage conversations between parents and children that may not otherwise come about naturally?",
      },
      {
        id: "design-decisions",
        label: "Design decisions",
        heading: "Turning research into features",
        content: [
          {
            type: "text",
            value: "User interface: many older respondents mentioned they missed physical buttons on mobile phones. We added elevated buttons with strong shadows throughout the app, so it is accessible for kids and gives a more intuitive, physical feel. We also added avatar customization so family members can design a sprite that reflects themselves. Our differences are what make us special, and we wanted FamJam to help people understand different backgrounds, not erase them.",
          },
          { type: "image", value: "./photos/famjam-ui.png", size: "mobile" },
          {
            type: "text",
            value: "Game content: we centered our games around topics commonly believed to be sources of misunderstanding. “Story Jam” was a direct response to our survey, where 67 respondents reported misunderstandings over values or beliefs. Players progress by voting for the answer they agree with most and cannot vote for themselves, which prompts them to think about why other family members answered the way they did.",
          },
          { type: "image", value: "./photos/famjam-story-jam.png", size: "mobile" },
          {
            type: "text",
            value: "Voting on games: some respondents, often younger family members, felt they were not properly heard by their parents and elders. Letting everyone vote on what to play next means all players contribute equally, so family members can discuss as equals.",
          },
          {
            type: "text",
            value: "Biscuits and the chore shop: since competition can promote pro-social behavior, winners earn biscuits they can exchange for personalized favors. Navigating the shop together lets children see how their parents make decisions, and parents see how their children think.",
          },
          { type: "image", value: "./photos/famjam-shop.png", size: "mobile" },
        ],
      },
      {
        id: "ai-process",
        label: "Using AI",
        heading: "AI as a second pair of eyes",
        content: [
          {
            type: "text",
            value: "We used AI to check that our survey questions weren’t leading, which made the questionnaire clearer and the responses more meaningful. After collecting responses, we used AI to summarize the data and surface recurring keywords.",
          },
          {
            type: "text",
            value: "“Tech literacy” came up often: Gen X respondents struggled with it, while Gen Z saw it as a major barrier between generations. The issue wasn’t technology itself, but keeping up with rapidly changing UI. Users preferred simple, intuitive buttons, which guided our choice of a design style that works for both generations.",
          },
        ],
      },
      {
        id: "reflections",
        label: "Reflections",
        heading: "What did I learn in two days?",
        content: [
          {
            type: "text",
            value: "I learned the importance of organization when designing on the spot very quickly, and that getting research done first really helps with generating ideas.",
          },
          {
            type: "text",
            value: "This was my first designathon, and I found it very fun to design with others and to create our submission video.",
          },
        ],
      },
    ],
  },
    {
    id: "Loop",
    subTitle: "Loop",
    title: "Loop: Cutting through listserv clutter for Cornell students",
    image: LoopBanner,
    banner: LoopBanner,
    link: "https://cornell-loop.com/",
    linkLabel: "Visit cornell-loop.com",
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Role: "Product Designer" },
          { Timeline: "Fall 2026 \n(Ongoing)" },
          { Team: "1 PM, 1 APM, 1 TPM, 3 devs, 2 designers, 2 PMMs" },
          { Tools: "Figma, VSCode, Notion, Slack" },
        ],
      },
      {
        id: "context",
        label: "Context",
        heading: "What is Loop?",
        content: [
          {
            type: "text",
            value: "Loop is a Chrome extension that helps Cornell students cut through listserv clutter and find the events, opportunities, and resources that matter to them.",
          },
          {
            type: "highlight",
            label: "Coming soon",
            value: "Loop is launching soon. Right now I’m refining the designs based on user research and feedback, and designing a new feature.",
          },
        ],
      },
      {
        id: "preview",
        label: "Preview",
        heading: "Take a look",
        content: [{ type: "preview", value: "https://cornell-loop.com/" }],
      },
    ],
  },
  {
    id: "CornellGO",
    subTitle: "Cornell GO",
    image: CornellGoBanner,
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Team: "1 PM, 1 APM, 1 TPM, 4 devs, 2 designers, 1 PMM" },
          { Role: "Designer" },
          { Timeline: "Spring 2026 \n(2 months)" },
          { Tools: "Figma, Notion, Slack" },
        ],
      },
      {
        id: "description",
        label: "Description",
        content: "",
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
          { Team: "2 frontend developers \n2 backend developers \n1 UI/UX designer" },
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
        pictures: ["./photos/Persona1-studybuddy.svg", "./photos/Persona2-studybuddy.svg"],
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
          { type: "text", value: "Entry point: how do users view their cuts?" },
          { type: "image", value: "./photos/DesignChoices1YT.png" },
          { type: "text", value: "How do users edit and delete a cut?" },
          { type: "image", value: "./photos/DesignChoices2YT.png" },
          // TODO: this block duplicated the one above (same text + image). Swap in the third decision, or delete.
          { type: "text", value: "How do users edit and delete a cut?" },
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
    title: "DARN: A public website and secure Counselor Portal for a Bexley nonprofit",
    image: Darn,
    banner: DarnBanner,
    sections: [
      {
        id: "overview",
        label: "Overview",
        content: [
          { Role: "Product Designer" },
          { Timeline: "Summer 2026 \n(16 weeks)" },
          { Team: "1 PM, 1 TPM, 2 developers, 3 designers" },
          { Tools: "Figma, WordPress, UiChemy, Claude Code" },
        ],
      },
      {
        id: "context",
        label: "Context",
        heading: "Who is DARN?",
        content: [
          {
            type: "text",
            value: "DARN (Developmental Assets Resource Network) is a community organization in Bexley, Ohio that uses local resources to meet local needs. Since 2003, it has supported families and youth through summer food programs, bike distributions, and emergency and grocery assistance.",
          },
          {
            type: "text",
            value: "Through Develop for Good, our team of designers and engineers worked with DARN for 16 weeks to redesign their public website and build a secure Counselor Portal where school counselors submit and track support requests.",
          },
        ],
      },
      {
        id: "problem",
        label: "Problem",
        heading: "What wasn't working?",
        content: [
          {
            type: "text",
            value: "DARN already had real impact: 49+ families supported with summer food assistance, 70+ bikes given to youth, and 40+ families helped with emergency and grocery assistance each year. Very little of that showed up online.",
          },
          { type: "image", value: "./photos/darn-old-site.png" },
          {
            type: "text",
            value: "The website received around 20 visitors a month and said little about DARN's programs. Behind the scenes, counselors requested help for families through a Google Form, and DARN managed those requests in spreadsheets and email.",
          },
          { type: "image", value: "./photos/darn-old-form.png" },
          {
            type: "list",
            items: [
              "Limited online presence: the site did not explain DARN's programs, resources, or impact.",
              "Manual request management: requests moved between Google Forms, a coded spreadsheet, and email threads.",
              "No visibility for counselors: after submitting a request, counselors had no way to see what happened to it.",
            ],
          },
        ],
      },
      {
        id: "problem-space",
        label: "Reframing",
        eyebrow: "Problem space",
        heading: "Two products, four kinds of users",
        content: [
          {
            type: "text",
            value: "Because the problems split cleanly between the public and DARN's internal workflow, we divided the project into two products: a public website for resources, programs, and donations, and a Counselor Portal for submitting and tracking requests.",
          },
          {
            type: "list",
            items: [
              "School counselors: submit requests and track their status.",
              "Donors: understand DARN's impact and give securely.",
              "Community members: find local resources and programs.",
              "DARN administrators: manage requests, counselors, and site content.",
            ],
          },
        ],
        peopleProblem:
          "How might we make DARN's resources easy for families to find, while giving counselors a secure, transparent way to request and follow up on support?",
      },
      {
        id: "user-flows",
        label: "User flows",
        heading: "Mapping each user's journey",
        content: [
          {
            type: "text",
            value: "We mapped the main journeys for each user group and revised them over three versions as requirements became clearer. The Counselor Portal flow covers login, password reset, account requests, submitting a request, and searching or filtering request history.",
          },
          { type: "image", value: "./photos/darn-user-flows.png" },
          { type: "image", value: "./photos/darn-counselor-flow.png" },
        ],
      },
      {
        id: "information-architecture",
        label: "Information architecture",
        heading: "Organizing around what people need most",
        content: [
          {
            type: "text",
            value: "The public site was reorganized around four needs: programs and services, community resources, donations, and the Counselor Portal. The homepage gives each of the three highest-priority actions, Find Resources, Donate, and Counselor Portal, a clear entry point.",
          },
          { type: "image", value: "./photos/darn-sitemap.png" },
          {
            type: "text",
            value: "The Counselor Portal has separate site maps for counselors and administrators. Both log in through the same button, and what they see depends on their role.",
          },
          { type: "image", value: "./photos/darn-portal-sitemap.png" },
        ],
      },
      {
        id: "privacy",
        label: "Privacy",
        heading: "Designing for sensitive family information",
        content: [
          {
            type: "text",
            value: "Family information was stored in a shared spreadsheet, so privacy shaped the portal from the start. The design and data model were built to:",
          },
          {
            type: "list",
            items: [
              "Require authenticated, invite-only access.",
              "Use role-based permissions for counselors and admins.",
              "Identify families by reference codes instead of names.",
              "Limit each counselor to the requests they are authorized to see.",
            ],
          },
        ],
      },
      {
        id: "ideation",
        label: "Ideation",
        heading: "Low-fidelity wireframes",
        content: [
          {
            type: "text",
            value: "We sketched page layouts, CTA placement, and mobile behavior for the public site first, annotating each screen with the content and behavior it needed.",
          },
          { type: "image", value: "./photos/darn-lowfi-website.png" },
          { type: "image", value: "./photos/darn-lowfi-donate.png" },
          {
            type: "text",
            value: "For the portal, we wireframed the admin dashboard, resource requests, counselor management, and the request form, focusing on making request statuses readable at a glance.",
          },
          { type: "image", value: "./photos/darn-lowfi-portal.png" },
        ],
      },
      {
        id: "design",
        label: "Design system",
        heading: "From components to high fidelity",
        content: [
          {
            type: "text",
            value: "DARN had no formal design system, so we built one in Figma: headers, buttons, search, resource tags, cards, status badges, and dashboard tabs shared across the website and the portal.",
          },
          { type: "image", value: "./photos/darn-design-system.png" },
          { type: "image", value: "./photos/darn-hifi-website.png" },
          { type: "image", value: "./photos/darn-hifi-requests.png" },
          {
            type: "text",
            value: "With UiChemy and Claude Code, we moved designs from Figma into WordPress quickly. We chose WordPress because DARN already knew it, which made handoff to volunteers smoother.",
          },
        ],
      },
      {
        id: "iteration",
        label: "Iteration",
        heading: "Simplifying request statuses",
        content: [
          {
            type: "text",
            value: "We met with DARN weekly and adjusted as feedback came in and technical constraints became clearer. The biggest change was request tracking. We had planned a detailed set of statuses with admin-only notes on every request.",
          },
          {
            type: "highlight",
            label: "What we learned",
            value: "Counselors mainly needed quick visibility and reassurance, not a detailed pipeline.",
          },
          {
            type: "text",
            value: "We simplified it to a short, counselor-friendly sequence: Submitted, In Review, Approved, and Fulfilled. Admins see the same statuses as a board and can add notes when they need more information.",
          },
          { type: "image", value: "./photos/darn-counselor-dashboard.png" },
          { type: "image", value: "./photos/darn-admin-board.png" },
        ],
      },
      {
        id: "results",
        label: "Results",
        heading: "What we delivered",
        content: [
          {
            type: "list",
            items: [
              "Security: an invite-only portal with role-based permissions and family codes replaced the spreadsheet workflow.",
              "Visibility: counselors submit and track requests in one place instead of following up by email.",
              "Maintainability: volunteers can update the public site in WordPress without developer support.",
              "Resource discovery: programs and community resources are organized into clear pathways by category.",
            ],
          },
          { type: "image", value: "./photos/darn-request-form.png" },
          { type: "image", value: "./photos/darn-request-detail.png" },
          { type: "image", value: "./photos/darn-resources.png" },
        ],
      },
      {
        id: "reflections",
        label: "Reflections",
        heading: "What did I learn from working with a real client?",
        content: [
          {
            type: "text",
            value: "DARN was my first project with a real client and real users. Weekly check-ins meant our assumptions were tested quickly, and the status tracking change showed me that a simpler design can serve users better than a more complete one.",
          },
          {
            type: "text",
            value: "Designing around sensitive family data also changed how I approached the portal. Decisions like using family codes and limiting what each role can see were design decisions as much as technical ones, and I worked through them closely with our engineers.",
          },
          {
            type: "text",
            value: "Moving designs into WordPress with UiChemy and Claude Code shortened the path from Figma to a working site. If I continued the project, I would run usability tests with counselors after launch to see how the portal holds up across a full school year.",
          },
        ],
      },
    ],
  },
];