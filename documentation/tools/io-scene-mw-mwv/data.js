// io_scene_mw_mwv — page data
// Tab IDs must match the keys in TABS below.
// Each tab has a label and a sections array.
// Each section: { heading, level (h2|h3|h4), id, hint, content (html string array) }

window.IO_SCENE_TABS = [
    { id: 'functions', label: 'Functions' }
];

window.IO_SCENE_DATA = {
    functions: {
        hint: 'These scripts are based on the 0.8.111 build of the Morrowind Blender Plugin. The changes and fixes documented affect that version. The scripts should still work when overwriting the latest plugin.',
        sections: [
            {
                heading: 'General Additions',
                level: 'h3',
                id: 'general-additions',
                items: [
                    {
                        heading: 'Extended_Material_Names',
                        id: 'extended-material-names',
                        content: [
                            'Added option to extend material names: various inclusions and exclusions to make material name more specific, making use of the longer data-block names introduced in Blender 5. Off by default.',
                            'Include <code>diffuse:</code> if non default. Default is <code>#ffffff</code> or include <code>diffuse:Col</code> if the mesh has vertex colors.',
                            'Include <code>emissive:</code> if non default. Default is <code>#000000</code>.',
                            'Include <code>alpha:</code> if non default. Combines NiAlphaProperty blending mode and NiMaterialProperty (Opacity): <code>alpha:t</code> for alpha test, <code>alpha:a</code> for additive blending, <code>alpha:b</code> for blending, <code>alpha:0.5</code> and so on for material\'s own alpha.',
                            'Include <code>(Clamp)</code> and <code>(UV1)</code> etc. on textures with non default clamping or UV set.',
                            'Include <code>property:</code> when there is no texture, instead of a generic name.',
                            'Include <code>stencil:</code>: <code>stencil:m</code> for mask, <code>stencil:a</code> for area.',
                            'Include <code>decal_0</code>, but exclude <code>decal_1</code>, <code>decal_2</code>, etc. to preserve material name length.',
                            'The goal is to maintain a level of uniqueness when deduplicating materials, while still grouping materials where appropriate.',
                            'The naming has been designed such that external programs such as Unreal are able to setup the materials entirely based on text with Python. Although the Morrowind shader in Blender can be converted to standard materials, Unreal still does a messy job of translating materials and it is better to work with new materials entirely.',
                        ]
                    },
                    {
                        heading: 'Use_Texture_Fallbacks',
                        id: 'use-texture-fallbacks',
                        content: [
                            'Tries the NIF\'s own extension first, then DDS, TGA and BMP. On by default.',
                        ]
                    },
                    {
                        heading: 'Use_Texture_Path_In_Material_Name',
                        id: 'use-texture-path-in-material-name',
                        content: [
                            'Include <code>path:</code>, the folder of the base texture. Off by default.',
                            'Prevents deduplication when texture names match but paths differ. Deduplicating these is often useful, as the textures are usually identical duplicates, and it unifies materials to one source of truth.',
                        ]
                    },
                    {
                        heading: 'Normalize_Prefix',
                        id: 'normalize-prefix',
                        content: [
                            'Lowercases a 1–3 letter prefix followed by an underscore or space, e.g. <code>EX_Foo.nif</code> → <code>ex_Foo.nif</code>. It applies only to mesh names (node names containing <code>.nif</code>) and material names. Record IDs, bones and other node names are never changed. Off by default.',
                            '<code>normalize_prefix_max_length</code> sets the longest prefix it will lowercase (default 3). <code>normalize_prefix_root</code> extends the rule to the root node, which is usually the file name. It only works while <code>normalize_prefix</code> is on.',
                            'The aim is consistent, readable mesh names. Plugins often refer to the same mesh with different casing, and mesh files themselves mix <code>ex_</code> / <code>Ex_</code> / <code>EX_</code>. This evens that out without lowercasing whole names. Morrowind\'s naming isn\'t fully consistent, so treat it as a best-effort cleanup.',
                        ]
                    },
                    {
                        heading: 'Path Normalization',
                        id: 'path-normalization',
                        content: [
                            'Directory portions of names are lowercased (as exported from Export Cells). Always applied.',
                            'Also handles any inconsistent slashes.',
                        ]
                    },
                    {
                        heading: 'Name Sanitization',
                        id: 'name-sanitization',
                        content: [
                            'Removes invalid surrogate and non-printable characters from names. Always applied.',
                            'Prevents errors caused by malformed text in NIF files.',
                        ]
                    },
                    {
                        heading: 'Root Name',
                        id: 'root-name',
                        content: [
                            'Uses the file name without extension when no root name is present (such as when using exporters from Morrowind), or with extension if <code>always_use_file_name_for_root_name = True</code>.',
                        ]
                    },
                    {
                        heading: 'Lights',
                        id: 'lights',
                        content: [
                            'Added light imports.',
                            'Imports lights with the diffuse color and intensity.',
                        ]
                    },
                    {
                        heading: 'Proxy Mode',
                        id: 'proxy-mode',
                        content: [
                            'Added <code>proxy_mode</code> setting.',
                            'Imports the file as cubes for the first mesh in every nif for fast imports, debugs and processing.',
                        ]
                    },
                    {
                        heading: 'NiBillboardNodes',
                        id: 'nibillboardnodes',
                        content: [
                            'Added <code>NiBillboardNodes</code> import support.',
                            'These can also contain geometry and effects.',
                            'Does not work like an actual billboard.',
                        ]
                    },
                    {
                        heading: 'NiBSParticleNode',
                        id: 'nibsparticlenode',
                        content: [
                            'Added <code>NiBSParticleNode</code> import support.',
                            'Typically only exists as an empty, does not contain actual particles.',
                        ]
                    },
                    {
                        heading: 'NiSortAdjustNode',
                        id: 'nisortadjustnode',
                        content: [
                            'Added NiSortAdjustNode import support.',
                        ]
                    },
                    {
                        heading: 'Preserve_Root_Scale',
                        id: 'preserve-root-scale',
                        content: [
                            'Keeps the root node\'s per-axis scale when discarding its transform, retaining actor body proportions (race weight/height) encoded by Morrowind on the root node.',
                            '<code>preserve_root_scale</code> only has any effect when <code>discard_root_transforms</code> is <code>True</code>.',
                            'Useful when exporting actors from Export Cells.',
                        ]
                    },
                    {
                        heading: 'Multiple Armature Support',
                        id: 'multiple-armature-support',
                        content: [
                            'NIFs containing multiple independent skeletons now import.',
                        ]
                    },
                    {
                        heading: 'Authored_Rest_Pose',
                        id: 'authored-rest-pose',
                        content: [
                            '<strong>On</strong> (default): the rest pose comes from the NIF\'s own node transforms, which is how the model actually looks in the game. This is the correct pose, and animation is played relative to it.',
                            '<strong>Off</strong>: the rest pose comes from the skin\'s bind matrices, which is the pose the mesh was modelled in. That can be a completely different shape from the real one.',
                        ]
                    },
                    {
                        heading: 'nif_mvp.py',
                        id: 'nif-mvp-py',
                        content: [
                            'New file with additional helpers that need neither Blender nor importer state.',
                            'Kept as a separate file to keep separation from <code>nif_import.py</code>.',
                        ]
                    },
                ]
            },
            {
                heading: 'Ignores',
                level: 'h3',
                id: 'ignores',
                items: [
                    {
                        heading: 'Ignore_Animations',
                        id: 'ignore-animations',
                        content: [
                            'Added a check for <code>ignore_animations</code> at the start of <code>create_vertex_morphs()</code>.',
                        ]
                    },
                    {
                        heading: 'Ignore_Armatures',
                        id: 'ignore-armatures',
                        content: [
                            'Added <code>ignore_armatures</code> setting.',
                            'Recommended usage with Export Cells to avoid issues with multiple armatures.',
                            'Can avoid errors in rare cases.',
                        ]
                    },
                    {
                        heading: 'Ignore_Billboard_Nodes',
                        id: 'ignore-billboard-nodes',
                        content: [
                            'Added <code>ignore_billboard_nodes</code> setting.',
                        ]
                    },
                    {
                        heading: 'Ignore_Particle_Nodes',
                        id: 'ignore-particle-nodes',
                        content: [
                            'Added <code>ignore_particle_nodes</code> setting.',
                        ]
                    },
                    {
                        heading: 'Ignore_Collision_Nodes',
                        id: 'ignore-collision-nodes',
                        content: [
                            'Added ignores for <code>NiNodes</code> that are named Collision in addition to the existing ignore for <code>RootCollisionNodes</code>.',
                            'Strips suffix.',
                        ]
                    },
                    {
                        heading: 'Ignore_Emissive_Color',
                        id: 'ignore-emissive-color',
                        content: [
                            'Added <code>ignore_emissive_color</code> setting.',
                            'Prevents the emissive color from being imported and can be used to normalize the appearance of meshes, as the Blender Morrowind Plugin does not handle the emissive color correctly in the renderer.',
                        ]
                    },
                    {
                        heading: 'Ignore_Tri_Shadow',
                        id: 'ignore-tri-shadow',
                        content: [
                            'Added <code>ignore_tri_shadow</code> setting. This filters out shadow meshes by the NIF\'s shadow flag (<code>NiGeometry</code> 0x0040) or by name (<code>tri shadow</code>, <code>shadow</code>).',
                        ]
                    },
                    {
                        heading: 'Ignore_Nodes',
                        id: 'ignore-nodes',
                        content: [
                            'Added <code>ignore_nodes</code> setting.',
                            'Ignore any node and its subtree by name.',
                            'Example: <code>ignore_nodes = "Lightning"</code>',
                            'Comma separated, case insensitive, strips suffix.',
                        ]
                    },
                    {
                        heading: 'Ignore_Nodes_Under_Switches',
                        id: 'ignore-nodes-under-switches',
                        content: [
                            'Added <code>ignore_nodes_under_switches</code> setting.',
                            'Ignores children of a NiSwitchNode by name.',
                            'Example: <code>ignore_nodes_under_switches = "OFF, HARVESTED, Closed"</code>',
                            'Should be considered for Glow in the Dahrk, Graphic Herbalism etc.',
                            'Comma separated, case insensitive, strips suffix.',
                        ]
                    },
                    {
                        heading: 'Filter_Best_LOD',
                        id: 'filter-best-lod',
                        content: [
                            'Added <code>filter_best_lod</code> setting.',
                            'For each NiLODNode, imports only the highest-detail level and ignores the rest.',
                            'The level shown nearest the camera is selected using the node\'s <code>lod_levels</code> ranges.',
                            'Levels that can never render (far ≤ near) are skipped.',
                            'Applies to any child type; a level may be a NiNode wrapping several shapes or a bare NiTriShape. Without usable level data, the first child is kept.',
                        ]
                    },
                ]
            },
            {
                heading: 'Fixes',
                level: 'h3',
                id: 'fixes',
                items: [
                    {
                        heading: 'Armatures',
                        id: 'fixes-armatures',
                        subhead: true,
                        content: [
                            'Various fixes to improve armature imports including:',
                        ],
                        list: [
                            'Promote rigid nodes: run bone-chain validation before/after promotion.',
                            'Bake skins when ignoring armatures: apply_skin so skinned parts import posed.',
                            'Handle mirrored nodes: treat BSMirroredNode as empty; bake uniform −1 scale.',
                            'Preserve degenerate bone orientation: keep tail direction, no collapse.',
                            'Fallback display length: half the parent\'s length for zero-length bones.',
                            'Fix spurious pose-bone translations that pulled bone chains apart on rigs with no translation keys.',
                            'Fix snapping between keyframes from quaternion keys on opposite hemispheres.',
                            'Added support for custom creature rigs: euler-keyed animations, scaled skeletons, and mixed rigid/skinned bones. Verified on <code>sky_minotaur_01.nif</code> and <code>tr_seacrab.nif</code>, but other custom rigs may hit uncovered cases.',
                        ]
                    },
                    {
                        heading: 'nif_mvp.py',
                        id: 'fixes-nif-mvp-py',
                        subhead: true,
                        content: []
                    },
                    {
                        heading: 'A skin root must be one of its mesh\'s own parents',
                        id: 'skin-root-parent',
                        content: [
                            'Fixed misplaced geometry.',
                            'Some NIFs contain two nodes with the same name, and a skinned mesh can end up pointing at the wrong copy.',
                            'The repair pass trusted that bad reference and shifted the mesh far from where it belongs.',
                            'It now requires a skin\'s root to be one of the mesh\'s own parents, and repoints it if not.',
                            'Skin roots that are broken in other ways are still repointed to the nearest common ancestor, and skins referencing nodes outside the scene are dropped so the mesh imports as static rather than failing.',
                        ]
                    },
                    {
                        heading: 'lib/es3/nif/NiRotData.py',
                        id: 'fixes-nirotdata',
                        subhead: true,
                        content: []
                    },
                    {
                        heading: 'Euler rotation keys ignored axes that had no key at that moment',
                        id: 'euler-rotation-keys',
                        content: [
                            'Morrowind stores X, Y and Z rotation as three separate curves that rarely share timestamps.',
                            'The conversion treated each key as if the other two axes were at zero, so any rotation with un-synchronised channels came out wrong.',
                            'All three axes are now sampled at every key time and composed together.',
                            'The resulting quaternions are kept on one hemisphere so they interpolate the short way round.',
                        ]
                    },
                ]
            },
            {
                heading: 'Crashes',
                level: 'h3',
                id: 'crashes',
                items: [
                    {
                        heading: 'nif_import.py',
                        id: 'crashes-nif-import-py',
                        subhead: true,
                        content: []
                    },
                    {
                        heading: 'Empty Root Safeguard',
                        id: 'empty-root-safeguard',
                        content: [
                            'Added safeguard when root output is missing.',
                            'This can happen if the NIF imports nothing, e.g. the NIF only contains a billboard node that is ignored. Instead of erroring, it is handled.',
                        ]
                    },
                    {
                        heading: 'Spatial Object Filtering Safeguard',
                        id: 'spatial-object-filtering-safeguard',
                        content: [
                            'Avoids errors related to <code>AttributeError</code> when encountering property blocks at the root or within child lists.',
                            'Ensures that only objects with spatial transformations (NiAVObject) are processed as scene nodes.',
                        ]
                    },
                    {
                        heading: 'Create_UV_Controller Safeguard',
                        id: 'create-uv-controller-safeguard',
                        content: [
                            'Added validation/coercion around UV key arrays to avoid errors.',
                        ]
                    },
                    {
                        heading: 'Armature Edit Mode Safeguard',
                        id: 'armature-edit-mode-safeguard',
                        content: [
                            'Avoids error related to <code>Cannot edit hidden object</code>.',
                            'Saves and clears <code>hide_viewport</code> on the armature object.',
                            'Recursively searches the layer collection tree to find the active collection and clears its <code>hide_viewport</code> too.',
                            'Restores both after exiting Edit Mode.',
                        ]
                    },
                    {
                        heading: 'Allow Long Animation Marker Names On Import',
                        id: 'allow-long-animation-marker-names',
                        content: [
                            'Removed an assertion ("Marker exceeds character limit") that prevented importing NIF files containing animation marker names longer than 63 characters to avoid errors.',
                            'Long animation marker names are likely not an issue in Blender 5.',
                        ]
                    },
                    {
                        heading: 'lib/es3/nif/NiStencilProperty.py',
                        id: 'crashes-nistencilproperty',
                        subhead: true,
                        content: []
                    },
                    {
                        heading: 'NiStencilProperty Safeguard',
                        id: 'nistencilproperty-safeguard',
                        content: [
                            'Added <code>safe_enum</code> helper function to handle invalid enum values to avoid errors.',
                        ]
                    },
                    {
                        heading: 'lib/es3/nif/NiAVObject.py',
                        id: 'crashes-niavobject',
                        subhead: true,
                        content: []
                    },
                    {
                        heading: 'A node compared against itself crashes the import',
                        id: 'node-self-comparison-crash',
                        content: [
                            'Asking a node for its position relative to itself made the code search for that node among its own children, never find it, and error out. Now it returns "no movement needed" instead.',
                        ]
                    },
                ]
            },
            {
                heading: 'Known Issues',
                level: 'h3',
                id: 'known-issues',
                items: [
                    {
                        heading: 'Armatures',
                        id: 'known-armatures',
                        content: [
                            'Numerous issues occur with Export Cells/Export Sphere exports that contain multiple armatures with multiple NPCs, banners, etc.',
                            'Issues may occur if actors are imported as mid animation.',
                        ]
                    },
                    {
                        heading: 'Particle Support',
                        id: 'known-particles',
                        content: [
                            'Particles are unsupported.',
                        ]
                    },
                ]
            },
        ]
    }
};
