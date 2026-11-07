// Thumbnail Generator (MWSE) — page data

window.THUMBNAIL_TABS = [
    { id: 'functions',   label: 'Functions' },
    { id: 'additional', label: 'Additional Information' },
    { id: 'examples',   label: 'Example Processes' }
];

window.THUMBNAIL_DATA = {

    functions: {
        hint: 'For libraries, it is recommended to set up a separate modlist with all the relevant data only, then render all or target a plugin file.',
        sections: [
            {
                heading: null,
                items: [
                    {
                        heading: null,
                        id: 'render-dir',
                        content: [
                            'Renders in Data Files; if using Mod Organizer 2 then default render directory is: <code>MO2 Instance\\overwrite\\Thumbnail Generator\\meshes</code> in <code>MO2 Instance\\overwrite\\Thumbnail Generator</code>',
                        ]
                    },
                    {
                        heading: '<kbd>Shift</kbd> + <kbd>G</kbd> — Batch',
                        id: 'shift-g-batch',
                        content: [
                            'Allows rendering of entire Morrowind library of objects.',
                            'Can be filtered by search.',
                            'Uses lowercased mesh path naming.',
                            'Uses <code>rotation_exceptions.txt</code> to set per mesh rotations, edit custom rules if needed.',
                            'NPCs render in a separate folder, as they are not standard meshes.',
                            'Flagged button reads <code>flagged_meshes.txt</code> from the output folder (if present) and renders thumbnails only for the meshes listed in it, one path per line.',
                            'Can skip existing thumbnails to render only new NIFs.',
                            'Can resume batch from number.',
                            'Recommended for: rendering libraries of objects for galleries.',
                        ]
                    },
                    {
                        heading: 'Preview',
                        id: 'preview',
                        content: [
                            '<kbd>Right Mouse Button</kbd> → Orbit &nbsp; <kbd>Scroll Wheel</kbd> → Zoom &nbsp; <kbd>WASD</kbd> → Pan',
                            'Allows objects to be viewed individually.',
                            'Renders in a separate previews folder.',
                            'Uses lowercased mesh path naming as intended for icons.',
                            'Search filters a list of objects for preview.',
                            'Searching without a list allows different plugins to be selected.',
                            '<code>Save to session</code> stores the current sliders and can be used for batch renders.',
                            '<code>Save profile</code> stores a session in a JSON file and allows it to be applied to all, current type or a search. Saved in output directory/profiles.',
                            'Recommended for: individual renders, icons, setting up profiles, debugging.',
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
                            'While it is recommended to view thumbnails through an app such as Vvardenworks, Thumbnail Generator can be used in cases where it is important to preserve full accuracy as it is rendered from the engine.',
                        ]
                    },
                    {
                        heading: 'Capabilities',
                        id: 'capabilities',
                        list: [
                            'Renders at a larger size, then resizes down to give the appearance of antialiasing.',
                            'Fits image to frame for both orthographic and perspective (renders, scans pixels, refits camera, re-renders).',
                            'Renders multiple passes against black/white backdrops to determine correct transparency.',
                            'Emulates orthographic projection.',
                            'NPCs render front on and are filtered.',
                            'Creatures render posed mid-idle.',
                            'Per-item/type camera and lighting overrides.',
                            'Skips empty renders; writes failed/empty logs.',
                            'Batch rendering resumes after memory crashes by checking existing thumbnails and re-rendering corrupt ones.',
                            'Live preview with real-time rotate/zoom and item search.',
                            'Per-type and per-mesh camera rotation overrides.',
                        ]
                    },
                    {
                        heading: 'Notes & Limitations',
                        id: 'notes-limitations',
                        list: [
                            'Orthographic preview might not render correctly if Distant Land is enabled in MGE XE.',
                            'Thumbnail Generator is designed to render following the meshes folder structure. NIFs are only rendered once with the intention that objects point to shared NIFs, rather than one for every ID.',
                            'Render time for libraries can take a while, and may require several rounds to work through crashes.',
                            'Preview has some issues displaying particles correctly. Per-pixel lighting can force particles to work better, but the preview becomes brighter as compared to the output.',
                            'There may be further investigations to improve render speed.',
                            'Search still shows results for all NPCs and already existing thumbnails.',
                            'Pngs are compressed, but <a href="https://github.com/oxipng/oxipng" target="_blank" rel="noopener noreferrer">oxipng</a> is not used.',
                        ]
                    },
                    {
                        heading: 'Galleries',
                        id: 'galleries',
                        content: [
                            'Use <a href="https://github.com/morrowvis/Morrowind_Library_Tools" target="_blank" rel="noopener noreferrer">Build_Gallery_Images</a> to build WebP image galleries after render.',
                        ]
                    },
                    {
                        heading: 'Icons',
                        id: 'icons',
                        content: [
                            'This tool can be made to use icons directly by setting output to 32×32 and format to DDS.',
                            'Icons for weapons are generally cropped, so these can be instead rendered at a higher resolution from preview, and cropped down to suit.',
                        ]
                    },
                    {
                        heading: 'Morrowind Blender Thumbnail Generator',
                        id: 'blender-thumbnail-generator',
                        content: [
                            '<a href="https://github.com/ms-arch-mvp/Morrowind_Blender_Thumbnail_Generator" target="_blank" rel="noopener noreferrer">Morrowind Blender Thumbnail Generator</a> can be useful for specific secondary tasks including:',
                        ],
                        list: [
                            'Rendering vertex normals.',
                            'Rendering loose files.',
                            'Render WIP Blender files.',
                            'Further debugging.',
                            'Rendering any thumbnails that failed.',
                        ]
                    },
                ]
            }
        ]
    },

    examples: {
        hint: null,
        sections: [
            {
                heading: null,
                items: [
                    {
                        heading: 'Example Process for Sword Icons',
                        id: 'sword-icons',
                        list: [
                            'Open up base sword in preview.',
                            'Turn off orthographic.',
                            'Rotate, pan, zoom to the desired framing.',
                            'Render.',
                            'Check previews folder in output to ensure framing is good.',
                            'Save profile to type.',
                            'Open up next sword.',
                            'Pan and zoom if needed.',
                            'Render.',
                            'Manually trim and crop.',
                            'Resize to 32×32.',
                            'Save to DDS.',
                        ]
                    },
                    {
                        heading: 'NPC to Blender',
                        id: 'npc-to-blender',
                        list: [
                            'Search for NPC.',
                            'Export.',
                            'Import into Blender with <a href="https://github.com/morrowvis/io_scene_mw_mwv" target="_blank" rel="noopener noreferrer">io_scene_mw_mwv</a>, ensuring that <code>discard_root_transforms = False</code>.',
                        ]
                    },
                ]
            }
        ]
    }
};
