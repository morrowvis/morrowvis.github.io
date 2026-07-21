// JSON to UE5 pipeline documentation.

const SECTIONS = [
  {
    title: "JSONs",
    items: [
      'Every world cell is exported from Morrowind using <a href="https://github.com/morrowvis/Export_Cells">Export Cells</a> as a JSON file that includes all references and no landscape.',
      "Interior cells that are being targeted in the project are all exported as JSON files."
    ]
  },
  {
    title: "JSON Structure",
    items: [
      "Object lists for concatenated JSONs, including worlds (imported as HISMs) and master records.",
      "Flat lists for individual cells."
    ]
  },
  {
    title: "Project Map",
    items: [
      "A Project Map is set which defines where all the JSONs are and distinguishes between exterior worlds and interior cells.",
      "The JSONs stay as the source of truth for spawning and are referred to from within Unreal Engine."
    ]
  },
  {
    title: "Meshes",
    items: [
      "Meshes are handled separately from anything dynamic, which is structurally different from Morrowind.",
      "The mesh part is spawned in as static meshes, or in the case of exterior worlds, as a HISM to make use of Unreal's instancing.",
      "All meshes are spawned in with matches to the pre-processed library."
    ]
  },
  {
    title: "Lights",
    items: [
      "All lights are spawned into place.",
      "Some are deactivated according to whether they are already handled by other Blueprints."
    ]
  },
  {
    title: "Blueprints",
    subsections: [
      {
        subtitle: "Spawning",
        items: [
          "Blueprints are spawned in as a non destructive layer on top and include special effects, creatures, candles, fires, lanterns, etc.",
          "The spawner looks up the project map, reads appropriate JSON files and spawns within streamed levels.",
          "The Python script for the importer has specific rules for each blueprint class.",
          "Any meshes that are replaced by blueprints are hidden. Example: lantern blueprints replace meshes of lanterns.",
          "Most blueprints are spawned at the reference position. Some blueprints are spawned at the position of specific nodes. Example: most candles spawn at the reference position, except for specific objects where there are more than 3 emitters in the object, where candles are spawned at every emitter position.",
          "Blueprints have the name of the Morrowind script applied as a tag for further behaviour control.",
          "Some blueprints have specific checks run on them after being spawned. Example: line traces are run for lanterns to determine if the lantern is sitting."
        ]
      },
      {
        subtitle: "Manual",
        items: [
          "Commentary nodes, start positions and level triggers are all handled manually in a separate folder in the persistent level."
        ]
      },
      {
        subtitle: "Runtime",
        items: [
          "Blueprints can read a table at runtime: a table containing custom assignments for that type (example: fire blueprints check a custom table to set the Niagara system based on name), and a table containing all the record data from Morrowind to pick light color, emitter positions, etc, where the object id is matched and variables are pulled from node data.",
          "Lanterns and sign blueprints have physics applied to them."
        ]
      }
    ]
  },
  {
    title: "Grass",
    items: [
      'Grass ESP files are converted into JSON files using <a href="https://github.com/Greatness7/tes3conv">tes3conv</a>.'
    ]
  },
  {
    title: "Cell Table",
    items: [
      "A cell table is constructed from the cell coordinates and contains cell name and region from the JSON export.",
      "This can then be used to display information about the player's current cell.",
      "Regions are drawn as splines from the data which can then be used for scattering."
    ]
  },
  {
    title: "Continuous Interior Cells",
    items: [
      "JSON cells are imported in as separate levels.",
      "They are then streamed into a persistent level.",
      "The root actor of each level is moved into place such that the levels line up.",
      "Anything blocking a transition between cells might be deleted or edited.",
      "Intersections are cleaned up."
    ]
  }
];
