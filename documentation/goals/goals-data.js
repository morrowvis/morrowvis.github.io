// Goals data for Morrowind Visualisation Project.
// Edit this file to add/remove/reorder goals - the page renders from it directly.
// Items can include inline HTML (e.g. links).

const GOALS_MAIN = [
  "Showcase Morrowind mods in a new light, using UE5 for visualisation and exploration: rendered videos, screen-captured walkthroughs, high resolution orthographics, and executable packages.",
  'Develop an ecosystem of export, data, and visualisation <a href="../../tools">tools</a> as part of the overall project.',
  "Continually develop the project long term.",
  "Visualise all of Vvardenfell with Tamriel Rebuilt and Project Tamriel combined, once they join up.",
  "Push technical boundaries with few compromises on rendering worlds in their entirety with thousands of shadow-casting lights.",
  "Build immersive experiences and linear, intentional exploration paths in non-world maps that guide the player through multiple cells toward points of interest.",
  "Integrate commentary nodes that provide a guided experience and receive direct input from mod authors.",
  "Implement concepts from mods that were omitted due to technical limitations or otherwise.",
  "Emphasise vivid colours and the interplay between shadow and light, with a focus on HDR.",
  "Implement a modlist that overhauls and fleshes out Morrowind without going overboard or significantly contradicting the original vision.",
  "Showcase bonus mods outside the constraints of the modlist which have significance in Morrowind's modding history.",
  "Bring increased accessibility and exposure to modded cells.",
  "Develop systems also applicable to architectural visualisations.",
  "Develop a powerful traversal system with real-time environmental control.",
  "Develop the crepuscular ray plugin to achieve a striking atmosphere.",
  "Act as a proof of concept for what's possible with this approach.",
  "Keep the scope feasible, including handling mod updates.",
  "Keep the workflow straightforward and elegant to allow continual expansion.",
  "Inform and intersect with architectural work, as part of a wider vision of presenting and exploring spaces, imagined or built, at different scales."
];

const GOALS_SECTIONS = [
  {
    title: "Vvardenworks",
    seeAlso: 'See <a href="https://github.com/morrowvis/Vvardenworks">Vvardenworks</a> on GitHub.',
    items: [
      "Develop a robust, artist-friendly framework for exporting cells and landmasses from Morrowind for use in other programs such as UE5.",
      "Develop a versatile, unified toolset within Vvardenworks to support the project as well as modders.",
      "Support viewing Bethesda games, modlists and total conversions from Morrowind to Fallout 4.",
      "Support worldspaces in Morrowind and multiple Bethesda games.",
      "Support and simplify switching between modlists for comparisons.",
      "Maximise the use of Distant Land and LODs as a foundation for maps, overviews and orthographics.",
      "Develop a fleshed out sandbox for screw-around gameplay and experimentation.",
      "Provide a lightweight alternative to Morrowind Visualisation Project, especially for lower end hardware."
    ]
  },
  {
    title: "Pipeline",
    items: [
      "Maximise speed, accuracy, and ease of use when setting up UE5 levels from Morrowind's exported scene graph data.",
      "Simplify the architecture of scenes by translating NIF hierarchies into a more standard Unreal structure.",
      "Develop all-in-one buttons that set up complete worlds and interior cell levels.",
      "Make full use of the capabilities of targeted exports.",
      "Enable custom behaviours and placements that extend past Morrowind's own limitations."
    ]
  },
  {
    title: "Modlist",
    items: [
      "Populate and fill out Vvardenfell while keeping it familiar.",
      "Avoid changing the footprint of any major city.",
      "Add more lights.",
      "Add more clutter.",
      "Include unique and atmospheric interiors.",
      'Use vanilla mods rather than <a href="https://www.nexusmods.com/morrowind/mods/49231">BCoM</a> for more control over the project.',
      "Resolve any unpatched conflicts through manual edits in Unreal."
    ]
  },
  {
    title: "Inspirations / References",
    items: [
      '<a href="https://www.youtube.com/@gregcoulthard5565/videos">Bethesda Unreal projects by Greg Coulthard</a><span class="goal-note">MorrowindUnreal, ObliviUnreal, SkyrimUnreal, FalloutNVUnreal</span>',
      '<a href="https://www.youtube.com/watch?v=n89NFtIUWDI">Morrowind to Elden Ring</a>',
      '<a href="https://www.nexusmods.com/games/oblivion/search?keyword=twmp">TWMP for Oblivion</a>',
      '<a href="https://noclip.website/">noclip.website</a>',
      '<a href="https://kida-mnesia.com/">Radiohead \u2013 KID A MNESIA EXHIBITION</a>'
    ]
  }
];
