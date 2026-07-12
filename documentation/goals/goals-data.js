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
  "Showcase bonus levels with alternate takes on locations significant to Morrowind's modding history, outside the constraints of the modlist.",
  "Bring increased accessibility and exposure to modded cells.",
  "Develop systems also applicable to architectural visualisations.",
  "Develop a control system for versatile traversal and environmental control.",
  "Act as a proof of concept for what's possible with this approach.",
  "Keep the scope feasible, including handling mod updates.",
  "Keep the workflow straightforward and elegant to allow continual expansion.",
  "Inform and intersect with architectural work, as part of a wider vision of presenting and exploring spaces, imagined or built, at different scales."
];

const GOALS_HINT = "Morrowind Visualisation Project is not a remaster, and won't aim to be playable beyond exploration. It is not associated with Tamriel Rebuilt or Project Tamriel, and no material here should be taken as official promotion for either.";

const GOALS_SECTIONS = [
  {
    title: "Export Cells",
    seeAlso: 'See <a href="https://github.com/ms-arch-mvp/Export_Cells">Export Cells</a> on GitHub.',
    items: [
      "Develop a robust, artist-friendly framework for exporting modded cells from Morrowind using MWSE.",
      "Design the JSON exporter module to streamline complexity and readability.",
      'Develop <a href="https://github.com/ms-arch-mvp/io_scene_mw_mvp">io_scene_mw_mvp</a> to effectively handle imports from Export Cells.',
      "Develop extended export modes to handle multiple scenarios."
    ]
  },
  {
    title: "Pipeline",
    seeAlso: 'See <a href="https://ms-arch.gitbook.io/morrowind-visualisation-project/pipeline/nif-to-ue5">NIF to UE5</a> and <a href="https://ms-arch.gitbook.io/morrowind-visualisation-project/pipeline/json-to-ue5">JSON to UE5</a>.',
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
      "Add more lights.",
      "Add more clutter.",
      "Avoid changing the footprint of any major city.",
      'Use vanilla mods rather than <a href="https://www.nexusmods.com/morrowind/mods/49231">BCoM</a> for more control over the project.',
      "Resolve any unpatched conflicts through manual edits in Unreal."
    ]
  },
  {
    title: "Inspirations / References",
    items: [
      '<a href="https://www.youtube.com/@gregcoulthard5565/videos">Bethesda Unreal projects by Greg Coulthard</a> (MorrowindUnreal, ObliviUnreal, SkyrimUnreal, FalloutNVUnreal)',
      '<a href="https://www.youtube.com/watch?v=n89NFtIUWDI">Morrowind to Elden Ring</a>',
      '<a href="https://www.nexusmods.com/games/oblivion/search?keyword=twmp">TWMP for Oblivion</a>',
      '<a href="https://noclip.website/">noclip.website</a>',
      '<a href="https://kida-mnesia.com/">Radiohead \u2013 KID A MNESIA EXHIBITION</a>'
    ]
  }
];
