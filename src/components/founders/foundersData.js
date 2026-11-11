// Content for the redesigned home's hero. For now it only holds the ventures the hero
// closes on; the rest of the page will read the existing content files.

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
        alt: "Melissa Chowdhury in a Cornell sweatshirt, surrounded by stacked cases of Yerba Madre",
        caption: ["Melissa Chowdhury", "Co-founder, BUZZ"],
        width: 648,
        height: 810,
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
        caption: ["Sebastian Dominguez", "Founder, N1X"],
        width: 800,
        height: 1000,
        focus: "center",
      },
    ],
  },
];
