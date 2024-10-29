import { createElement } from "react";
import { Monitor, Users, Swords, BookOpen, Target, Shield, Share2, Database, Compass, Info, PenTool, Code } from "lucide-react";

export const siteSections = [
  {
    title: "Play Chess",
    displayOnHomePage: true,
    features: [
      {
        icon: createElement(Monitor, { className: "h-8 w-8 text-amber-700" }),
        title: "Play vs Computer",
        description: "Challenge the computer in a game of chess",
        link: "/play-vs-computer",
        comingSoon: false,
      },
      {
        icon: createElement(Users, { className: "h-8 w-8 text-amber-700" }),
        title: "Hand and Brain vs Computer",
        description: "Play as the hand while the computer is the brain",
        link: "#",
        comingSoon: true,
      },
    ],
  },
  {
    title: "Train Your Skills",
    displayOnHomePage: true,
    features: [
      {
        icon: createElement(Swords, { className: "h-8 w-8 text-amber-700" }),
        title: "Endgame Trainer",
        description: "Master crucial endgame techniques",
        link: "/endgame-trainer",
        comingSoon: false,
      },
      {
        icon: createElement(BookOpen, { className: "h-8 w-8 text-amber-700" }),
        title: "Openings Trainer",
        description: "Learn and practice chess openings",
        link: "#",
        comingSoon: true,
      },
      {
        icon: createElement(Target, { className: "h-8 w-8 text-amber-700" }),
        title: "Attacking Trainer",
        description: "Improve your offensive skills",
        link: "#",
        comingSoon: true,
      },
      {
        icon: createElement(Shield, { className: "h-8 w-8 text-amber-700" }),
        title: "Defending Trainer",
        description: "Enhance your defensive techniques",
        link: "#",
        comingSoon: true,
      },
    ],
  },
  {
    title: "Explore and Analyze",
    displayOnHomePage: true,
    features: [
      {
        icon: createElement(Share2, { className: "h-8 w-8 text-amber-700" }),
        title: "Analysis Board",
        description: "Analyze positions with the engine",
        link: "/analysis",
        comingSoon: false,
      },
      {
        icon: createElement(Database, { className: "h-8 w-8 text-amber-700" }),
        title: "Master Games",
        description: "Explore games by chess masters",
        link: "#",
        comingSoon: true,
      },
      {
        icon: createElement(Compass, { className: "h-8 w-8 text-amber-700" }),
        title: "Openings Explorer",
        description: "Explore chess opening variations",
        link: "#",
        comingSoon: true,
      },
    ],
  },
  {
    title: "About",
    displayOnHomePage: false,
    features: [
      {
        icon: createElement(Info, { className: "h-8 w-8 text-amber-700" }),
        title: "About Us",
        description: "Learn more about our mission and team",
        link: "/about",
        comingSoon: false,
      },
      {
        icon: createElement(PenTool, { className: "h-8 w-8 text-amber-700" }),
        title: "Blog",
        description: "Read our latest articles and updates",
        link: "/blog",
        comingSoon: true,
      },
      {
        icon: createElement(Code, { className: "h-8 w-8 text-amber-700" }),
        title: "Contribute",
        description: "Join us in improving our platform",
        link: "/contribute",
        comingSoon: false,
      },
    ],
  },
];