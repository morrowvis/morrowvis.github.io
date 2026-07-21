// NIF to UE5 pipeline documentation.

const SECTIONS = [
  {
    title: "Meshes",
    subsections: [
      {
        subtitle: "NIF to glTF",
        items: [
          'Every object is exported from Morrowind using <a href="https://github.com/morrowvis/Export_Cells">Export Cells</a>.',
          "All files are batch processed as Blender files.",
          "The imports simplify node switching and Glow in the Dahrk geometry.",
          "The meshes are merged.",
          "Blender files are exported as a couple of glTF files with vertex colors.",
          "These can then be imported into Unreal.",
          "There are some special exceptions that need to be handled separately. Example: trees where the bark and the leaves are one material and need to be broken up."
        ]
      },
      {
        subtitle: "glTF to Unreal library",
        items: [
          "Meshes are imported in a separate project.",
          "Meshes are reorganised into folders automatically based on their path name.",
          "Material instances are reorganised into folders automatically based on their prefix.",
          "Material instances have material parents and variables set up according to their material name. Textures are assigned based on a lookup in the textures folder.",
          "Nanite and collisions are setup based on the material instances."
        ]
      }
    ]
  },
  {
    title: "Landscape Meshes",
    items: [
      "Landscape NIFs are exported using Export Cell's 2x2 mode.",
      "Each landscape NIF is merged by cell and exported as a glTF Separate file with vertex colors through parallelization.",
      "All binary data is concatenated into a final glTF file which can be directly imported with Unreal.",
      "Concatenating also causes loss of certain data, such as the Morrowind materials. However, these are not needed in Unreal since material instances are set according to name."
    ]
  },
  {
    title: "Parallelization",
    items: [
      "The script processes NIF files in parallel using PowerShell's Start-Process with -PassThru to launch each Blender instance as a separate background process.",
      "A throttle limit ($MaxJobs, default 20) controls how many Blender instances run simultaneously.",
      "Once all files are dispatched, the script enters a final loop that waits for every remaining process to finish before moving on to the next stage (glTF export, merging, finalization, etc.).",
      "Each Blender instance runs independently with its own arguments and writes its own output file.",
      'Parallelization is similarly used in <a href="https://github.com/morrowvis/Morrowind_Thumbnail_Generator">Morrowind Thumbnail Generator</a>.'
    ]
  }
];