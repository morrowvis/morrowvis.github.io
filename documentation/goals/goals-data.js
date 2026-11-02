// Goals data for Morrowind Visualisation Project.
// Edit this file to add/remove/reorder goals - the page renders from it directly.
// Items can include inline HTML (e.g. links).

const GOALS_MAIN = [
  "Showcase Morrowind mods in a new light, using UE5 for visualisation and exploration.",
  "Continually develop the project long term.",
  "Push technical boundaries with few compromises on rendering Morrowind worlds in their entirety.",
  "Integrate mods such as adventures and dungeons which can be explored separately.",
  "Build immersive experiences and linear, intentional exploration paths in non-world maps that guide the player through multiple cells toward points of interest.",
  "Integrate commentary nodes that provide a guided experience and receive direct input from mod authors.",
  "Implement concepts from mods that were omitted due to technical limitations or otherwise.",
  "Showcase bonus mods outside the constraints of the modlist which have significance in Morrowind's modding history.",
  "Bring increased accessibility and exposure to modded cells.",
  "Develop the crepuscular ray plugin to enhance atmosphere.",
  "Make changes where appropriate to improve visuals.",
  "Act as a proof of concept for what's possible with this approach.",
  "Keep the workflow straightforward and elegant to allow continual expansion.",
  "Develop systems also applicable to architectural visualisations.",
  "Be a driving part of a wider vision about immersive digital spaces."
];
const GOALS_SECTIONS = [
  {
    title: "Why Morrowind",
    items: [
      "Impressive, diverse modded worlds that can be meaningfully transformed.",
      "One of the most compelling settings to work with.",
      "Permission friendly, cathedral aligned modding scene.",
      "Unique low poly art style that is complemented by UE5 lighting.",
      "The modlist can change the game into something almost entirely new."
    ]
  },
  {
    title: "Vvardenworks",
    seeAlso: 'See <a href="https://github.com/morrowvis/Vvardenworks">Vvardenworks</a> on GitHub.',
    items: [
      "Develop a robust, accurate framework for targeted cell JSON exports with a basis in Blender scene graph translation first and foremost.",
      "Ensure accuracy of NIF representation with some tweaks to ensure better graphical results.",
      "Develop a versatile, unified toolset within Vvardenworks to support the project as well as modders and video creators.",
      "Focus on developing useful functions such as object window, linked cells and map overlays.",
      "Allow use for review and co-ordination, inspired by federated BIM projects.",
      "Support the viewing of Bethesda games, modlists (particularly from Mod Organizer 2) as well as total conversions from Morrowind to Fallout 4.",
      "Provide accessible exploration of worldspaces free from certain constraints of their engines, including installed version.",
      "Provide prototypical support for worldspaces in Morrowind.",
      "Render Bethesda games in a way that is truer to concept than what their vanilla engines would allow.",
      "Support and simplify switching between modlists for comparisons.",
      "Maximise the use of Distant Land and LODs as a foundation for maps, overviews and orthographics.",
      "Develop a fleshed out sandbox for screw-around gameplay and experimentation.",
      "Provide a lightweight alternative to Morrowind Visualisation Project, especially for lower end hardware.",
      "Achieve fast load times, easy streaming and optimised performance, at least at medium settings.",
      "Allow easy modlist review, particularly for additions or updates along with easy integrated Distant Land generation for every game.",
      "Explore the possibilities of Rust and build a foundation for other projects.",
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
      "Overhaul Vvardenfell with many areas and assets redone, while still keeping the world familiar.",
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
