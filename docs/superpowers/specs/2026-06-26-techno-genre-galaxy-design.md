# Techno Genre Galaxy Design

## Purpose

Build an immersive web interaction program that acts as a visual library for Techno and neighboring electronic music genres. The experience should feel less like a conventional encyclopedia and more like entering a dark club-like 3D starfield where each genre is a floating molecule. Users explore genre history, sonic similarity, cultural scenes, and representative tracks by moving through this molecular universe.

The first version is a polished prototype: it should make the interaction model, visual language, relationship system, and audio playback feel complete, while keeping the dataset small enough to curate by hand.

## Product Direction

The chosen direction is a nebula-style explorer. Techno is the visual and narrative center. Neighboring genres such as House, Electro, EBM, Trance, Ambient, IDM, Breakbeat, Jungle, and UK Garage orbit around it as related clusters.

The user lands directly inside the 3D galaxy. There is no marketing landing page before the experience. The first screen should show the dark spatial environment, floating genre molecules, subtle fog, particles, and neon relationship traces. The main interaction is exploration:

- Hover a molecule to reveal its name and softly illuminate related connections.
- Click a molecule to move the camera toward it and open its detail panel.
- Click a related genre inside the panel or in the scene to fly smoothly along the relationship path to the next molecule.
- Switch relationship layers to reinterpret the same universe through history, sound, or scene culture.
- Play a representative track and see the current molecule and related lines pulse as the sound source.

## Experience Goals

- The experience should feel atmospheric, club-like, and exploratory.
- It should communicate that electronic music history is a network, not a simple tree.
- It should support curiosity: a user can start anywhere and jump naturally from genre to genre.
- Information should be concise and readable while the 3D scene stays alive behind it.
- Audio playback should affect the scene, not feel like a separate media widget.

## Visual Language

The visual mood is a dark club nebula:

- Background: deep black with faint depth, low fog, and subtle drifting particles.
- Genre molecules: luminous cores with outer shells, orbiting particles, and small animated trails.
- Light: neon cyan, acid green, hot magenta, amber, and cold white accents against a mostly dark field.
- Motion: each genre gets a different kinetic personality rather than only a different color.

Genre motion examples:

- Hard Techno: faster pulses, sharper flicker, more angular particle bursts.
- Dub Techno: slower breathing, mistier shell, deeper low-frequency glow.
- Acid Techno: spiraling motion and twisting line modulation.
- Ambient and IDM: more diffuse particles, fragmented or drifting motion.
- Detroit Techno: stable central glow, clean orbital structure, strong historical signal.

## Relationship Layers

The system uses one stable set of genre molecules and multiple relationship layers. Switching layers changes which lines are emphasized and how they behave.

### History Influence

History lines show influence and descent. They are directional neon trajectories with particles moving from the source genre toward the influenced genre. Stronger historical relationships are brighter, thicker, and more active. Weaker relationships are thinner and dimmer.

Example: Detroit Techno can send visible influence toward Minimal Techno, Dub Techno, and later Hard Techno-related branches.

### Sound Similarity

Sound similarity lines are non-directional and behave like magnetic or waveform fields. The two connected molecules breathe together. Higher similarity produces shorter, steadier, more coherent waves. Lower similarity produces looser, more unstable waves.

This layer should help users discover genres that share BPM ranges, sound design, rhythmic feel, atmosphere, or production techniques even when the historical path is not direct.

### Scene Culture

Scene culture lines behave more like underground transit routes or club map traces. They connect genres through cities, labels, scenes, clubs, social contexts, and time periods. These lines can be more segmented, grid-like, or route-like than the smoother history and sound lines.

Examples include Detroit, Chicago, Berlin, UK rave, Frankfurt, Goa, and New York as cultural forces that explain why certain genres developed near each other.

## Genre Detail Panel

Clicking a molecule opens a semi-transparent interface panel that feels like club equipment or a spectral control surface rather than a normal article card.

The panel includes:

- Genre name.
- Aliases when relevant.
- Main era and region.
- A concise 100-150 word description.
- Sonic keywords.
- Representative tracks.
- Related genres grouped by relationship type.
- A direct action to jump to each related genre.

Panel text should be short, vivid, and useful. It should avoid generic encyclopedia tone. The panel should preserve the sense that the user is still inside the galaxy.

## Audio Playback

The first version uses a playable interaction model with placeholder or legally available sample audio. The goal is to complete the interaction before the final music source is decided.

Track data includes:

- Title.
- Artist.
- Year.
- Duration.
- Associated genre.
- Audio URL or local sample URL.
- Optional note about why the track represents the genre.

When a user plays a track:

- A compact persistent player appears near the bottom of the interface.
- The selected genre molecule becomes the active sound source.
- The molecule shell pulses with the audio.
- Nearby related connections receive light flow or small rhythmic pulses.
- Navigation to another genre does not stop playback unless the user explicitly pauses or starts another track.

The prototype can use placeholder audio files or generated short loops. Later versions can replace this with licensed files, public preview clips, or embedded external platform players.

## First Version Dataset

The first version should include about 24 hand-curated genres and subgenres. This is enough to create a meaningful network without turning the project into a large data-entry task.

Initial genre set:

- Detroit Techno
- Minimal Techno
- Dub Techno
- Acid Techno
- Hard Techno
- Industrial Techno
- Schranz
- Melodic Techno
- Ambient Techno
- Electro
- Chicago House
- Acid House
- Deep House
- EBM
- New Beat
- Trance
- Goa Trance
- Breakbeat Hardcore
- Jungle
- IDM
- Ambient
- Berlin School
- UK Garage
- Breaks

Each genre should initially include 2-3 representative or placeholder tracks and a concise description. Relationship data should be manually curated for quality rather than generated automatically.

## Technical Architecture

The recommended stack is React with Three.js through React Three Fiber, built with Vite.

React handles:

- Detail panels.
- Layer controls.
- Audio player UI.
- Selection state.
- Track playback state.
- Responsive layout.

Three.js handles:

- 3D molecules.
- Relationship curves.
- Particle fields.
- Camera motion.
- Hover and click picking.
- Audio-reactive visual effects.

The first version does not need a backend or database. Data should live in structured TypeScript or JSON files inside the project. This keeps the prototype portable and makes the relationship network easy to revise.

## Data Model

Genre nodes should include:

- `id`
- `name`
- `aliases`
- `category`
- `era`
- `regions`
- `summary`
- `soundKeywords`
- `visualProfile`
- `position`
- `tracks`

Relationship edges should include:

- `source`
- `target`
- `type`: `history`, `sound`, or `scene`
- `strength`
- `directional`
- `label`
- `description`

Track entries should include:

- `id`
- `title`
- `artist`
- `year`
- `duration`
- `genreId`
- `audioSrc`
- `note`

## Component Boundaries

The implementation should keep responsibilities separated:

- `GenreGalaxy`: owns the main 3D scene, camera, selected genre, hover state, and layer rendering.
- `GenreMolecule`: renders one genre molecule and exposes hover/click interactions.
- `RelationshipLayer`: renders relationship lines according to the active layer and visual grammar.
- `GenrePanel`: renders selected genre information, track list, and related genre jump links.
- `AudioPlayer`: owns playback, current track, play/pause, progress, and audio analysis data.
- `genreData`: contains curated nodes, edges, and tracks.

## Camera and Interaction

Camera movement is part of the identity of the app. Selecting a genre should not simply open a panel; the camera should travel to the molecule with eased motion. Jumping to a related genre should feel like following the relationship path.

Expected interactions:

- Orbit or drag to inspect the galaxy.
- Scroll or pinch to zoom.
- Hover to preview.
- Click to select.
- Click related genre to animate to it.
- Switch relationship layer without losing current selection.
- Play, pause, and change tracks without leaving the 3D experience.

## Responsiveness and Accessibility

Desktop is the primary target for the first version because the 3D interaction benefits from screen space. Mobile should still be usable:

- The scene remains full screen.
- The panel becomes a bottom sheet.
- Controls stay reachable with touch.
- Text must not overflow panels or buttons.
- The user should be able to close the detail panel and return to exploration.

Accessibility considerations:

- Interactive controls should be reachable by keyboard where practical.
- Track buttons and layer controls should have clear labels.
- Motion should be smooth but not excessively flashing.
- The app should avoid aggressive strobe effects despite the club visual style.

## Error Handling

The prototype should gracefully handle:

- Missing audio files by disabling the play button for that track and showing a short unavailable state.
- Missing genre relationships by showing the molecule without highlighted connections.
- WebGL failure or unsupported devices with a simple fallback message.
- Audio autoplay restrictions by only starting playback after explicit user action.

## Verification

Completion for the first implementation should be verified by:

- Running a production build successfully.
- Opening the app in a browser and confirming the 3D scene is nonblank.
- Confirming at least several genre molecules render and can be hovered/clicked.
- Confirming camera movement animates to a selected molecule.
- Confirming history, sound, and scene layers can be switched.
- Confirming the detail panel opens with readable content.
- Confirming a placeholder or sample track can play after user action.
- Confirming the active track changes the selected molecule or nearby relationship lines visually.
- Checking desktop and mobile viewport widths for text overflow and unusable controls.

## Out Of Scope For First Version

- Full historical accuracy for every electronic genre.
- User accounts.
- Database-backed editing.
- Streaming platform API integration.
- Automatic recommendation algorithms.
- Complete discography browsing.
- A large music catalog.

These can be added after the core galaxy interaction proves itself.
