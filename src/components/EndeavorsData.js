import {
  faRocket,
  faComputer,
  faShirt,
  faFire,
  faMicrophone,
  faPeopleGroup,
  faNewspaper,
  faCalendarAlt,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

export const endeavors = [
  {
    title: "Weekly Newsletter",
    img: "/images/weeklynewsletter.webp",
    desc: "Stay up to date with our weekly newsletter, which highlights ENT events along with entrepreneurship news!",
    projects: [
      {
        name: "News Updates",
        detail: "Weekly updates on the market and entrepreneurial news.",
        icon: faNewspaper,
      },
      {
        name: "ENT Events",
        detail: "Sharing our upcoming events and ENT updates.",
        icon: faCalendarAlt,
      },
      {
        name: "Alumni & Member Features",
        detail: "Spotlighting our member's entrepreneurial stories and journeys.",
        icon: faUserTie,
      },
    ],
    thumbs: [
      "/newsletters/issue1/1.webp",
      "/newsletters/issue5/3.webp",
      "/newsletters/issue6/4.webp",
    ],
    link: "/newsletter",
  },
  {
    title: "Speaker Events",
    img: "/images/speakerevent1.webp",
    desc: "Conversations with entrepreneurs, alumni, and industry leaders hosted weekly by our members.",
    projects: [
      {
        name: "Speaker Series",
        detail: "Talk to founders, learn about their personal journeys, and recieve advice.",
        icon: faFire,
      },
      {
        name: "Eclectic Convergence",
        detail: "Travel to NYC to attend Cornell's annual entrepreneurship conference.",
        icon: faPeopleGroup,
      },
      {
        name: "The Podcast Project",
        detail: "Converting our speaker series into podcasts for all to listen and enjoy.",
        icon: faMicrophone,
      },
    ],
    thumbs: [
      "/endeavors/elab-event.webp",
      "/endeavors/EcclecticConvergence1.webp",
      "/endeavors/speaker-event1.webp",
    ],
  },
  {
    title: "Small Business Collective",
    img: "/images/IMG_0162.webp",
    desc: "A collective run by our own members to help them gain hands-on entrepreneurial experience!",
    projects: [
      {
        name: "Merchandise Business",
        detail: "Our members create and sell merchandise, such as stickers and shirts.",
        icon: faShirt,
      },
      {
        name: "ENT Technology Ventures",
        detail: "Building and deploying applications and client websites.",
        icon: faComputer,
      },
      {
        name: "Growth Partners @ ENT",
        detail:
          "Develop long-term partnerships with local operations, startups, and alumni ventures.",
        icon: faRocket,
      },
    ],
    thumbs: [
      "/endeavors/SBC-Stickers.webp",
      "/endeavors/working-on-computer.webp",
      "/endeavors/NSA-Stickers.webp",
    ],
    link: "https://sbc.entcornell.com/",
  },
];
