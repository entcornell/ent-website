// Content for the redesigned home: the ventures the hero spotlights, the wall of every
// venture it ends on (read from the existing content file), and the program section.
import { studentventures } from "../StudentVenturesData";

// The ventures the hero closes on, in order: each with its site and two photos (from the
// venture's own site or socials), one on each side of the screen, captioned as
// [left, right] in small caps under the photo. A photo with `logoOn` is a logo, shown
// centered on that color.
export const heroSpotlights = [
  {
    name: "Stride",
    site: "https://striderunningcompany.com",
    photos: [
      {
        src: "/ventures/stride/lake.webp",
        alt: "Kate Stiens in a Stride vest by a mountain lake, in sepia",
        caption: ["Kate Stiens", "Co-founder, Stride"],
        width: 1415,
        height: 1200,
        focus: "18% center",
      },
      {
        src: "/ventures/stride/summit.webp",
        alt: "Brooke Wilcox in a Stride vest stretching on a mountain summit, in black and white",
        caption: ["Brooke Wilcox", "Co-founder, Stride"],
        width: 880,
        height: 1101,
        focus: "center",
      },
    ],
  },
  {
    name: "BUZZ",
    site: "https://www.bringthebuzzover.com",
    photos: [
      {
        src: "/ventures/buzz/melissa.webp",
        alt: "Melissa Chowdhury holding cans and a case of UPDATE at a BUZZ campus activation",
        caption: ["Melissa Chowdhury", "Co-founder, BUZZ"],
        width: 880,
        height: 1100,
        focus: "center",
      },
      {
        // The brand itself: BUZZ's logo on its own pink, instead of a second photo.
        src: "/ventures/buzz/logo.svg",
        alt: "BUZZ logo",
        logoOn: "#F7366D",
        caption: ["Campus marketing", "Powered by students"],
        width: 2560,
        height: 1164,
      },
    ],
  },
  {
    name: "N1X",
    site: "https://www.n1x.ai",
    photos: [
      {
        src: "/ventures/n1x/logo.webp",
        alt: "N1X logo",
        logoOn: "#292929",
        caption: ["AI systems", "For every operation"],
        width: 919,
        height: 263,
      },
      {
        src: "/ventures/n1x/sebastian.webp",
        alt: "Sebastian Dominguez speaking on a panel at Cornell's SC Johnson College of Business",
        caption: ["Sebastian Dominguez", "Founder, N1X Technologies"],
        width: 800,
        height: 1000,
        focus: "center",
      },
    ],
  },
  {
    name: "Hotake",
    site: "https://www.hotake.tech",
    photos: [
      {
        // The October 2026 identity (hotake repo, brand/ on vet-pilot): "hotake" in
        // Manrope 800 with a drawn asterisk, rendered to an image and reversed onto the
        // brand's deep green.
        src: "/ventures/hotake/logo.webp",
        alt: "Hotake logo",
        logoOn: "#0A362D",
        caption: ["AI intake for vets", "Better visits start before arrival"],
        width: 1656,
        height: 311,
      },
      {
        src: "/ventures/hotake/kate.webp",
        alt: "Kate Sahin talking, seated in a sunlit room",
        caption: ["Kate Sahin", "Founder, Hotake"],
        width: 688,
        height: 860,
        focus: "center",
      },
    ],
  },
];

// The collage shows logos only, in their own colours. Ventures with a usable logo image
// list it here (copies in public/ventures/logos/ trimmed to the mark, so each one centers
// in its tile, with their width-to-height ratio); light logos made for a dark ground keep that ground (`dark`). Every other
// venture is set as its name, so the wall stays uniform.
const LOGOS = {
  BUZZ: { image: "/ventures/logos/buzz.webp", ratio: 3.28 },
  Clark: { image: "/ventures/logos/clark.webp", ratio: 4.91 },
  Syndeo: { image: "/ventures/logos/syndeo.webp", ratio: 3.74 },
  TalentTap: { image: "/ventures/logos/talenttap.webp", ratio: 4.61 },
  DishPlay: { image: "/ventures/logos/dishplay.webp", ratio: 4.84 },
  SmartSip: { image: "/ventures/logos/smartsip.webp", ratio: 3.12 },
  Jaden: { image: "/ventures/logos/jaden.webp", ratio: 2.56 },
  "TennisB&B": { image: "/ventures/logos/tennisbnb.webp", ratio: 1.44 },
  AnchorSmart: { image: "/ventures/logos/anchorsmart.webp", ratio: 5.77 },
  Crescendo: { image: "/ventures/logos/crescendo.webp", ratio: 2.81, dark: "#000000" },
  Pitch: { image: "/ventures/logos/pitch.webp", ratio: 1.46, dark: "#000000" },
  N1X: { image: "/ventures/logos/n1x.webp", ratio: 3.49, dark: "#292929" },
  Hotake: { image: "/ventures/logos/hotake.webp", ratio: 5.33, dark: "#0A362D" },
};
// Stride's wordmark is set in type, close to its own heavy italic sans.
const WORDMARK_STYLE = { Stride: "sans" };
// Ventures that aren't in StudentVenturesData: N1X and Hotake, Tempest (named as their own
// in a brother's profile in BrothersData) and The Outdoor Wholesaler (Dylan Seale '25, per
// the Cornell Chronicle). 24 in all, so the four-across wall ends on a full row.
const EXTRA_NAMES = ["N1X", "Hotake", "Tempest", "The Outdoor Wholesaler"];
const DISPLAY_NAMES = { Stride: "STRIDE." };

const COLLAGE_COLS = 4;
// Logos of every shape get the same visual weight: each covers about the same area of
// its tile, so a wide wordmark runs longer and a compact mark stays smaller. Returns the
// logo's width as a % of the tile, from its width-to-height ratio.
const LOGO_AREA = 0.09;
const LOGO_MAX_WIDTH = 72;
function logoWidth(ratio) {
  return Math.min(LOGO_MAX_WIDTH, Math.round(Math.sqrt(LOGO_AREA * ratio) * 100));
}

const allTiles = [...studentventures.map((v) => v.title), ...EXTRA_NAMES].map((name) => ({
  name,
  label: DISPLAY_NAMES[name] ?? name,
  logo: LOGOS[name]?.image ?? "",
  logoWidth: LOGOS[name] ? logoWidth(LOGOS[name].ratio) : 0,
  dark: LOGOS[name]?.dark ?? "",
  style: WORDMARK_STYLE[name] ?? "serif",
}));

// Logos and set names alternate like a checkerboard (offset on every other row), so the
// names never bunch together; whichever kind runs out first, the other fills the rest.
function checkerboard(tiles) {
  const logos = tiles.filter((t) => t.logo);
  const names = tiles.filter((t) => !t.logo);
  const out = [];
  while (logos.length || names.length) {
    const row = Math.floor(out.length / COLLAGE_COLS);
    const wantLogo = (out.length + row) % 2 === 0;
    out.push((wantLogo ? logos : names).shift() ?? (wantLogo ? names : logos).shift());
  }
  return out;
}

export const collageVentures = checkerboard(allTiles);

// "A year at ENT": the chapter's year in real moments, fall to spring, from the ENT media
// library (converted into public/images/year/). Season and place are from the folders the
// photos came in; the lines describe only what the photo shows.
export const yearMoments = [
  {
    season: "Fall",
    place: "Arts Quad",
    title: "Clubfest",
    line: "It starts under a rocket on the Arts Quad.",
    image: "/images/year/clubfest.webp",
    alt: "Students crowding the ENT table at Clubfest, with rocket and ENT balloons overhead",
  },
  {
    season: "Fall",
    place: "Arts Quad",
    title: "Cornell Creators Market",
    line: "Student brands, a table each, McGraw Tower behind them.",
    image: "/images/year/market.webp",
    alt: "Student vendors at the Cornell Creators Market on the Arts Quad",
  },
  {
    season: "Fall",
    place: "eHub",
    title: "Faculty Panel",
    line: "Entrepreneurship faculty, a few rows away.",
    image: "/images/year/panel.webp",
    alt: "A packed room at the Epsilon Nu Tau entrepreneurship faculty panel",
  },
  {
    season: "Fall",
    place: "Entrepreneurship at Cornell",
    title: "Pitch Competition",
    line: "Suits on, slides ready.",
    image: "/images/year/pitchcomp.webp",
    alt: "ENT members in suits at the Entrepreneurship at Cornell pitch competition",
  },
  {
    season: "Spring",
    place: "eHub",
    title: "Workshops",
    line: "Laptops open, building with the people who've done it.",
    image: "/images/year/workshop.webp",
    alt: "A workshop at the eHub with members working on laptops",
  },
  {
    season: "Spring",
    place: "eHub",
    title: "Fish Tank",
    line: "Pitch night, hosted by the chapter.",
    image: "/images/year/fishtank.webp",
    alt: "A full room at Fish Tank, ENT's pitch night",
  },
  {
    season: "Spring",
    place: "Trip",
    title: "The chapter",
    line: "And the people you build it all with.",
    image: "/images/year/vineyard.webp",
    alt: "The chapter together in a vineyard at sunset",
  },
];

// "The chapter": candid photos of brothers together, from the ENT media library
// (public/images/chapter/) and the existing site images. Split into four drifting rows,
// each photo at its own shape.
const CHAPTER = [
  ["chapter/5k-1", "Brothers in their Epsilon Nu Skirun shirts at the 5K"],
  ["chapter/formal-2023", "The chapter at spring formal"],
  ["chapter/nyc-cornell-tech", "Brothers at Cornell Tech on the New York trip"],
  ["chapter/workshop-laughs", "Two members laughing at a workshop"],
  ["chapter/escape-room", "Brothers at an escape room"],
  ["chapter/suits-2022", "The chapter in suits for headshots"],
  ["chapter/5k-3", "Two brothers in Skirun shirts on campus"],
  ["chapter/dinner", "Brothers at a chapter dinner"],
  ["chapter/barbecue", "The Future Founders Barbecue"],
  ["chapter/formal-2021", "Brothers dressed up at fall formal"],
  ["chapter/selfie", "A group selfie at a chapter event"],
  ["b10", "Three brothers on a vineyard trip at sunset"],
  ["chapter/5k-2", "Three brothers smiling after the 5K"],
  ["chapter/party", "The chapter together at a party"],
  ["chapter/nyc-subway", "Brothers on the subway in New York"],
  ["chapter/workshop-group", "Members together at a workshop"],
  ["chapter/suits-2021", "The chapter in suits"],
  ["chapter/ehub", "Two brothers at the eHub"],
  ["chapter/5k-4", "Brothers posing in Skirun shirts"],
  ["chapter/dinner-2020", "A chapter dinner"],
  ["chapter/formal-2023-b", "Brothers at spring formal"],
  ["b7", "Brothers together at a chapter dinner"],
  ["chapter/5k-5", "Brothers in Skirun shirts by the quad"],
  ["b12", "Brothers cheering on a vineyard trip"],
  ["chapter/recruitment-2021", "The chapter at fall recruitment"],
  ["chapter/barbecue-trio", "Three brothers at the Future Founders Barbecue"],
  ["chapter/5k-6", "Brothers in Skirun shirts on the quad"],
  ["chapter/pitch-suits", "Two brothers in suits at the pitch competition"],
  ["chapter/workshop-pizza", "Two members with pizza at a workshop"],
  ["chapter/5k-7", "Brothers celebrating at the 5K"],
  ["chapter/barbecue-friends", "Friends at the Future Founders Barbecue"],
  ["chapter/5k-8", "Brothers laughing in Skirun shirts"],
  ["chapter/barbecue-duo", "Two brothers at the barbecue"],
  ["chapter/5k-9", "Brothers on campus after the 5K"],
  ["chapter/pitch-audience", "The chapter in the audience at the pitch competition"],
];
export const communityPhotos = CHAPTER.map(([file, alt]) => ({
  src: `/images/${file}.webp`,
  alt,
}));
