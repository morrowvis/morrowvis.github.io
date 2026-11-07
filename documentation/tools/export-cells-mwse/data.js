// Export Cells (MWSE) — page data

window.EXPORT_CELLS_TABS = [
    { id: 'functions',   label: 'Functions' },
    { id: 'additional', label: 'Additional Information' },
    { id: 'modes',      label: 'Export Modes' },
    { id: 'meshes',     label: 'Meshes' }
];

window.EXPORT_CELLS_DATA = {

    functions: {
        hint: 'Exports in Data Files; if using Mod Organizer 2 then default export directory is <code>MO2 Instance\\overwrite\\Export Cells</code>',
        sections: [
            {
                heading: null,
                items: [
                    {
                        heading: '<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>E</kbd> → Export 3×3 Active Cells',
                        id: 'ctrl-shift-e',
                        content: [
                            '<span class="export-grid">🟨🟨🟨<br>🟨🟢🟨<br>🟨🟨🟨</span>',
                            '<strong>Exteriors:</strong> exports all currently loaded cells around the player.',
                            '<strong>Interiors:</strong> exports entire interior cells as 1 file.',
                            'Default export mode: JSON.',
                            'Recommended for: quick exports of small areas, testing, single interiors.',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>1</kbd> → 1×1 Export Menu',
                        id: 'shift-1',
                        content: [
                            '<span class="export-grid">🟢🟢🟢<br>🟢🟢🟢 →<br>🟢🟢🟢</span>',
                            '<strong>Exteriors:</strong> exports a grid of cells centered on the player (1×1, 3×3, 5×5, …)',
                            '<strong>Interiors:</strong> see Export Interiors below.',
                            'Default export mode: Disabled.',
                            'Recommended for: revealing tiles, only use if needed or specifically wanted.',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>2</kbd> → 2×2 Export Menu',
                        id: 'shift-2',
                        content: [
                            '<span class="export-grid">⬛⬛⬛<br>⬛🟢🟨 →<br>⬛🟨🟨</span>',
                            '<strong>Exteriors:</strong> exports 2×2 cells, steps by multiples of 2 in a grid and exports plus +1X, −1Y in exteriors.',
                            '<strong>Interiors:</strong> see Export Interiors below.',
                            'Designed to handle edge decals that are only on the bottom and right borders of the active cells.',
                            'Teleports to closest cell that is a multiple of 2 at the start.',
                            'Default export mode: Landscape only.',
                            'Recommended for: exporting seamless, accurately blended landscapes.',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>3</kbd> → 3×3 Export Menu',
                        id: 'shift-3',
                        content: [
                            '<span class="export-grid">🟨🟨🟨<br>🟨🟢🟨 →<br>🟨🟨🟨</span>',
                            '<strong>Exteriors:</strong> exports 3×3 active cells, steps by multiples of 3 in a grid in exteriors.',
                            '<strong>Interiors:</strong> see Export Interiors below.',
                            'Teleports to closest cell that is a multiple of 3 at the start.',
                            'Default export mode: JSON.',
                            'Recommended for: exporting everything other than landscapes in exteriors, capturing world state.',
                        ]
                    },
                    {
                        heading: 'Legend',
                        id: 'legend',
                        table: [
                            ['Symbol', 'Description'],
                            ['🟢', 'Player'],
                            ['🟨', 'Active Cells exported'],
                            ['⬛', 'Active Cells ignored'],
                            ['→', 'Grid movement'],
                        ]
                    },
                    {
                        heading: 'Landmass Button',
                        id: 'landmass-button',
                        content: [
                            'Automatic grid option to export the entire landmass around the player cell.',
                            'Works on the same basis as the Landmass Report below.',
                            'It is safest to refer to this just as a guide on how big you need to export to include the entire landmass from the landmass center.',
                        ]
                    },
                    {
                        heading: 'Export Interiors',
                        id: 'export-interiors',
                        content: [
                            'Exports all interior cells from a mod when <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>1</kbd>, <kbd>2</kbd> or <kbd>3</kbd> are used in an interior.',
                            'Detects the parent mod from the initial cell and teleports to all cells that are owned or modified by the mod.',
                            'Uses the same export function as <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>.',
                            'Traverses through cells if the export mode is disabled for the relevant function.',
                            'Exports lists of interiors.',
                            'Recommended for: export and debugging.',
                        ]
                    },
                    {
                        heading: '<kbd>Space</kbd> → Cancel Ongoing Export',
                        id: 'space-cancel',
                        content: [
                            'Stops the export and returns to starting cell.',
                            'May hang during adjacent teleport.',
                            'Don\'t get worried if it hangs, especially in detailed areas. It may take a while to process everything.',
                        ]
                    },
                    {
                        heading: '<kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>R</kbd> → Report',
                        id: 'ctrl-shift-r',
                        content: [
                            '<strong>Exteriors:</strong> displays the extents and center of the landmass, displays cell names to check inclusions for landmass exports, displays extra info, can export a report as a text file with full cell names. Recommended for: planning grid export.',
                            '<strong>Interiors:</strong> displays information about the cell. Recommended for: debug, seeing which mods are affecting an interior.',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>8</kbd> → Export Scripts',
                        id: 'shift-8',
                        content: [
                            'Export scripts and globals from mods as text files.',
                            'Recommended for: reference purposes.',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>9</kbd> → Export Records',
                        id: 'shift-9',
                        content: [
                            'Export combined records with targeted input.',
                            'Recommended for: creating external databases of records.',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>0</kbd> → Export Meshes',
                        id: 'shift-0',
                        content: [
                            'Export combined NIFs with targeted input.',
                            'Useful to flatten currently used NIFs in game rather than dealing with file management between multiple mods outside of the game.',
                            'Useful to group objects into files so that they can be processed more easily, rather than trying to process tens of thousands of NIFs individually.',
                            'Recommended for: creating depositories, reviewing mesh libraries, identifying problematic meshes on crash.',
                            'See the <strong>Meshes</strong> tab for further information.',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>C</kbd> → Export Actors',
                        id: 'shift-c',
                        content: [
                            'Exports NPCs or creature at origin.',
                            'Can export with a target or all actors in active cells.',
                            'Used in conjunction with reset animation setting and actor export settings.',
                            'Recommended for: quick singular NPC or creature exports.',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>N</kbd> → Add Wearables to NPC',
                        id: 'shift-n',
                        content: [
                            'Adds wearables to a targeted NPC, including armor, clothing, rings and amulets.',
                            'Can search by string, matching the name or ID.',
                            'Can search by filename of mod.',
                            'Can replace all wearable items of an NPC.',
                            'Can open inventory of targeted NPC for finer control.',
                            'Recommended for: setting up NPCs and mannequins for export, experimentation.',
                        ]
                    },
                    {
                        heading: 'Console Toggles',
                        id: 'console-toggles',
                        content: [
                            'Sets tgm, tai, disablevanitymode, tcl one time at the start of traversal.',
                            'Assumes that all settings are off before traversal.',
                            'By default, re-enables tgm and tai on return to cell (can be set in config).',
                            'By default, collisions are left disabled after traversal to prevent crashes when returning to cell.',
                            'By default, vanity mode is left disabled after traversal.',
                            'Necessary for keeping traversal a smooth experience.',
                            'Is kept straightforward as MWSE struggles with checking the actual states.',
                        ]
                    },
                    {
                        heading: 'Console Custom Commands',
                        id: 'console-custom-commands',
                        content: [
                            'Runs specified commands when teleporting to landmass center.',
                            'Recommended for: setting globals or other scripts before export to get the intended result in exports.',
                        ]
                    },
                ]
            }
        ]
    },

    additional: {
        hint: null,
        sections: [
            {
                heading: null,
                items: [
                    {
                        heading: null,
                        id: 'intro',
                        content: [
                            'Export Cells has been largely superseded by Vvardenworks, which builds upon the basis of JSON exports. However, it still has its uses.',
                        ]
                    },
                    {
                        heading: 'Config / MCM',
                        id: 'config-mcm',
                        content: [
                            'Several settings have been provided in the MCM, and further tweaks can be made in <code>config.lua</code>. The config has been designed to give a lot of control for a variety of scenarios.',
                            'It is recommended to only change the export modes for the given scenario. The default export modes can be set in config. The MCM is designed to reset every time Morrowind is opened, but can be set in config. The idea is that you have a baseline config and you only tweak in game for specific scenarios.',
                            'Generally, the default settings outside of export modes are recommended. These are what is used for Morrowind Visualisation Project.',
                        ]
                    },
                    {
                        heading: 'Stability',
                        id: 'stability',
                        content: [
                            'If you are using MGE XE with DXVK, ensure that <em>Reduce texture memory use</em> is disabled in MGE XE. Otherwise, memory will not be released and larger exports can crash.',
                            'Keep MWSE up to date with <code>MWSE-Update.exe</code> for increased stability.',
                            '<strong>Exteriors:</strong> larger exports may crash on certain systems. You can alt-tab from Morrowind and it should still run and export without issues. It is recommended that collisions are kept disabled during and after export. Otherwise, crashes may occur when teleporting. This applies to both exteriors and interiors. The crash looks like: <code>Class: NiCollisionGroup: Unable to dereference</code>. Disabling XE Sky Variations is also recommended for stability.',
                            '<strong>Error messages:</strong> any error messages that pop up during traversal/export can cause unpredictable behaviour, including possible crashes. It is best to avoid any error messages during traversal in the first place, which can be solved for specific mods.',
                        ]
                    },
                    {
                        heading: 'Suggested Usage',
                        id: 'suggested-usage',
                        list: [
                            '2×2 grids: export landscape to desired size.',
                            'Import into Blender, merge by cell.',
                            '3×3 grids: export statics, import on top of landscape.',
                            'For interior cells, just run <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>.',
                            'Recommended to use a fresh save to prevent any save issues, and scripts should also be considered.',
                            'Connects separate islands into one landmass export if you fly between them before export, which registers the blank cells the flood fill otherwise can\'t cross.',
                        ]
                    },
                    {
                        heading: 'Morrowind Script Considerations',
                        id: 'script-considerations',
                        content: [
                            'Export Cells exports what is visible in the scene.',
                            'If lights are turned off with a script, then they will not export.',
                            'In some cases it is recommended to use togglescripts before entering the cell.',
                            'MWSE mods such as <a href="https://www.nexusmods.com/morrowind/mods/47912" target="_blank" rel="noopener noreferrer">Let There Be Darkness</a> affect exports.',
                            'Example: <code>set ColonyState to 100</code> can be used to have a completed Raven Rock for export.',
                        ]
                    },
                    {
                        heading: 'Renaming',
                        id: 'renaming',
                        content: [
                            'Export Cells has config options for renaming.',
                            'Designed by default to allow for easy merges.',
                        ]
                    },
                    {
                        heading: 'Teleportation Logic',
                        id: 'teleportation-logic',
                        content: [
                            'Uses teleports to load active cells for teleport.',
                            'Teleportation accounts for empty cells which cannot otherwise be teleported to directly.',
                            'Uses a timer to space out teleports. Timer can be increased for stability if required.',
                        ]
                    },
                    {
                        heading: 'Anchor Logic',
                        id: 'anchor-logic',
                        content: [
                            'Anchoring determines how the grid is positioned relative to the player.',
                            '1×1 grids: always centered on the player cell.',
                            '2×2 grids: anchored so the player cell is at the top-left of the grid.',
                            '3×3 grids: always centered on the player cell.',
                            '2×2 and 3×3 grids step by multiples of 2 or 3, ensuring seamless, non-overlapping coverage.',
                            'Anchoring ensures exported grids align perfectly and do not overlap or leave gaps.',
                        ]
                    },
                    {
                        heading: 'Custom Grid Size',
                        id: 'custom-grid-size',
                        content: [
                            'Allows a custom grid size in the grid menu.',
                            'Grid size always exports to the next odd number up.',
                        ]
                    },
                    {
                        heading: 'Mesh Names',
                        id: 'mesh-names',
                        content: [
                            'By default in Standard export, nodes use names in the format of <code>folder/mesh.nif</code> with children also inheriting this name.',
                            'Ensures merging and deduplication work correctly in Blender.',
                        ]
                    },
                    {
                        heading: 'Export Hidden',
                        id: 'export-hidden',
                        content: [
                            'Works similarly to Export Sphere, except there is extra case handling where the parent is NiCollisionSwitch to ensure that visible children nodes are not culled.',
                        ]
                    },
                    {
                        heading: 'Filter Best LOD',
                        id: 'filter-best-lod',
                        content: [
                            'Exports only the first LOD in a valid NiLODNode structure.',
                            'Similar to <code>filter_best_lod</code> in the importer.',
                            'While LODs can be filtered on import, it is still helpful to filter them on export to reduce file size and complexity of export as the geometry is not needed.',
                        ]
                    },
                    {
                        heading: 'applySkinDeform()',
                        id: 'apply-skin-deform',
                        content: [
                            'Recommended for layer exports, which can be useful for mannequins.',
                        ]
                    },
                    {
                        heading: 'JSON Notes',
                        id: 'json-notes',
                        content: [
                            'Includes types from config which are string labels assigned to each exported node that describes its role or NIF class, and can be customised beyond the raw NIF type to carry semantic meaning. Example: Emitters are defined as a type, but in Morrowind they are <code>NiNodes</code>.',
                            'Emitter nodes are included in the export when referenced by a particle node\'s controller.',
                            'Empty types represent a non-visual transform point used as a cell origin, a game object reference, or an internal hierarchy attachment point.',
                            'Fields are defined by config.',
                            'Serialization is handled manually rather than via MWSE\'s bundled JSON library: the module has precise control over float formatting and direct matrix serialization.',
                            'Children have transforms relative to their parent: NIFs are positioned relative to the root, and then their children are relative to the NIF.',
                            'Root node names in NIFs are overwritten by their object id as per the standard engine behaviour.',
                            'Colours are exported as floats rather than RGB values in line with UE5.',
                            'Generally there is enough data to construct scenes from JSON export alone.',
                        ]
                    },
                    {
                        heading: 'Particles',
                        id: 'particles',
                        content: [
                            'NiBSParticleNodes are included with transforms — sometimes these are in hierarchy independent world space (e.g. when there is no script or is not item).',
                            'For each NiBSParticleNode, the script reads <code>ctrl.emitter</code> to get the emitter node, then uses Lua\'s <code>==</code> operator during traversal to identify which NiNode in the scene graph is that same emitter.',
                        ]
                    },
                    {
                        heading: 'Mod Updates',
                        id: 'mod-updates',
                        content: [
                            'Generally it is better to load from a fresh save, then export. Even in interiors, references can move out of place if the mod was updated after the save was made.',
                            'Wrye Mash can be used in some cases to repair the saves and fix the references.',
                        ]
                    },
                ]
            }
        ]
    },

    modes: {
        hint: null,
        sections: [
            {
                heading: null,
                items: [
                    {
                        heading: null,
                        id: 'export-modes-table',
                        table: [
                            ['Export Mode', 'Description'],
                            ['<strong>Standard</strong>', 'Exports everything included under export types in config as a NIF file.'],
                            ['<strong>Landscape Only</strong>', 'Exports only the landscape.'],
                            ['<strong>Exclude Landscape</strong>', 'Exports included export types and excludes the landscape.'],
                            ['<strong>Layer</strong>', 'Exports only the object type selected in the MCM.'],
                            ['<strong>JSON</strong>', 'Creates a JSON file representing the cloned <code>sceneNode</code> hierarchy. Each node is exported with a normalized subtype (<code>EMPTY</code>, <code>MESH</code>, <code>POINTLIGHT</code>, etc.) that matches how the node behaves structurally when imported into Blender or Unreal.'],
                            ['<strong>Disabled</strong>', 'Traverses through cells only.'],
                        ]
                    }
                ]
            }
        ]
    },

    meshes: {
        hint: null,
        sections: [
            {
                heading: null,
                items: [
                    {
                        heading: null,
                        id: 'meshes-intro',
                        content: [
                            'This export takes every NIF queried, strips out unneeded data, and arranges them side-by-side into a physical grid layout.',
                            'The output is a single NIF file containing the arranged grid of meshes. Folders are broken up into smaller parts when they exceed a certain amount of objects. A JSON file can also be created alongside the NIF file if enabled in config.',
                            'The benefit of going through MWSE is that conflicts are resolved and it should be faster to work with combined NIF files rather than individual ones.',
                            'Meshes exported match the records. In some cases, NIFs in loose files won\'t be included because they are not used by any object.',
                            'There is no loss in geometry of exported meshes compared to NIFs because Morrowind loads NIFs into memory without converting them, so the vertex data is written straight back out on save.',
                        ]
                    },
                    {
                        heading: 'OK Button',
                        id: 'ok-button',
                        content: ['Used for targeted exports.'],
                        list: [
                            '<strong>Empty Box:</strong> export meshes from the root <code>meshes</code> folder only.',
                            '<strong>Mod Name (e.g. <code>OAAB_Data.esp</code>):</strong> exports meshes from objects in the ESP or ESM file.',
                            '<strong>Folder Name or Prefix (e.g. <code>f</code> or <code>flora</code>):</strong> export meshes from objects in folders.',
                        ]
                    },
                    {
                        heading: 'Flagged Button',
                        id: 'flagged-button',
                        content: ['Used to target specific mesh paths.'],
                        list: [
                            '<strong>Empty Box:</strong> reads <code>flagged_meshes.txt</code> in your export folder for paths.',
                            '<strong>Mod Name:</strong> reads <code>flagged_meshes.txt</code>, but adds a second filter — it will only export the flagged objects if they also belong to the <code>.esp</code>/<code>.esm</code> typed in the box.',
                        ]
                    },
                    {
                        heading: 'All Folders Button',
                        id: 'all-folders-button',
                        content: ['Used to export all meshes.'],
                        list: [
                            '<strong>Empty Box:</strong> exports every mesh in the game by folder.',
                            '<strong>Folder Name (Resume feature):</strong> resumes from a folder and continues to export all meshes. This is useful if the previous All Folders export ran out of memory and crashed.',
                        ]
                    },
                ]
            }
        ]
    }
};
