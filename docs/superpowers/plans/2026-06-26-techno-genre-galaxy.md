# Techno Genre Galaxy Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the first working prototype of a dark 3D nebula-style visual library for Techno and neighboring electronic music genres.

**Architecture:** Use a Vite React app with a structured data layer, a small tested state model, React UI panels, and a React Three Fiber scene for the molecule galaxy. Keep data local in TypeScript files so the first version is portable and easy to curate.

**Tech Stack:** Vite, React, TypeScript, Three.js, React Three Fiber, Drei, Vitest, Testing Library, CSS modules/plain CSS.

## Global Constraints

- The first screen is the actual 3D galaxy experience, not a marketing landing page.
- The visual mood is a dark club nebula with black field, low fog, particles, and neon accents.
- Relationship layers are exactly `history`, `sound`, and `scene`.
- The first version uses local structured TypeScript data, not a backend or database.
- Audio playback starts only after explicit user action.
- The initial dataset includes about 24 hand-curated genres and 2-3 representative or placeholder tracks per genre.
- Desktop is the primary target; mobile must still be usable with a bottom-sheet panel.
- Avoid aggressive strobe effects.
- Verify that the 3D scene is nonblank, genre nodes are clickable, layer switching works, the panel opens, and sample audio can play.

---

## File Structure

- `package.json`: scripts and dependencies.
- `index.html`: Vite app shell.
- `src/main.tsx`: React entrypoint.
- `src/App.tsx`: top-level layout and state wiring.
- `src/styles.css`: global dark visual system and responsive layout.
- `src/data/genreTypes.ts`: shared TypeScript types for genres, relationships, tracks, layers.
- `src/data/genreData.ts`: curated first-version genre, relationship, and track data.
- `src/data/genreData.test.ts`: data integrity tests.
- `src/state/galaxyState.ts`: pure reducers/selectors for selection, layer, and playback state.
- `src/state/galaxyState.test.ts`: state behavior tests.
- `src/audio/useAudioPlayer.ts`: audio playback hook and analyser setup.
- `src/audio/useAudioPlayer.test.tsx`: hook tests with mocked `HTMLAudioElement`.
- `src/components/GenrePanel.tsx`: selected genre information and related jumps.
- `src/components/GenrePanel.test.tsx`: panel rendering and jump tests.
- `src/components/AudioPlayer.tsx`: compact persistent player.
- `src/components/LayerControls.tsx`: relationship layer segmented control.
- `src/galaxy/GenreGalaxy.tsx`: Canvas scene, camera orchestration, selection callbacks.
- `src/galaxy/GenreMolecule.tsx`: one molecule visual and pointer interactions.
- `src/galaxy/RelationshipLayer.tsx`: relationship curves by active layer.
- `src/galaxy/CameraRig.tsx`: eased camera movement to selected genre.
- `src/galaxy/visualProfiles.ts`: visual profile mapping for molecule color and motion.
- `src/galaxy/geometry.ts`: pure helpers for curve points, camera targets, and distance.
- `src/galaxy/geometry.test.ts`: geometry helper tests.
- `src/vite-env.d.ts`: Vite TypeScript declarations.

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/styles.css`
- Create: `src/vite-env.d.ts`
- Create: `src/test/setup.ts`
- Create: `vitest.config.ts`
- Create: `tsconfig.json`
- Create: `tsconfig.node.json`

**Interfaces:**
- Produces: a Vite React TypeScript app with `npm run dev`, `npm run build`, and `npm test`.

- [ ] **Step 1: Create package and config files**

Create `package.json`:

```json
{
  "name": "techno-genre-galaxy",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@react-three/drei": "^9.122.0",
    "@react-three/fiber": "^8.17.10",
    "three": "^0.171.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "@types/three": "^0.171.0",
    "@vitejs/plugin-react": "^4.3.4",
    "jsdom": "^25.0.1",
    "typescript": "^5.7.2",
    "vite": "^6.0.5",
    "vitest": "^2.1.8"
  }
}
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
  },
});
```

Create `tsconfig.json`:

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./tsconfig.app.json" }
  ]
}
```

Create `tsconfig.node.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "vitest.config.ts"]
}
```

Create `tsconfig.app.json`:

```json
{
  "compilerOptions": {
    "composite": true,
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ES2020"],
    "allowJs": false,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

- [ ] **Step 2: Create minimal app shell**

Create `index.html`:

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Techno Genre Galaxy</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

Create `src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
```

Create `src/App.tsx`:

```tsx
export default function App() {
  return (
    <main className="app-shell">
      <section className="loading-stage" aria-label="Techno Genre Galaxy">
        <p>Techno Genre Galaxy</p>
      </section>
    </main>
  );
}
```

Create `src/styles.css`:

```css
:root {
  color: #f4f7fb;
  background: #030307;
  font-family:
    Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    sans-serif;
  font-synthesis: none;
  text-rendering: optimizeLegibility;
}

* {
  box-sizing: border-box;
}

html,
body,
#root {
  width: 100%;
  min-width: 320px;
  height: 100%;
  min-height: 100%;
  margin: 0;
}

button {
  font: inherit;
}

.app-shell {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background:
    radial-gradient(circle at 20% 20%, rgba(0, 229, 255, 0.14), transparent 26rem),
    radial-gradient(circle at 82% 72%, rgba(255, 43, 214, 0.1), transparent 24rem),
    #030307;
}

.loading-stage {
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
  letter-spacing: 0;
  text-transform: uppercase;
}
```

Create `src/vite-env.d.ts`:

```ts
/// <reference types="vite/client" />
```

Create `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest';
```

- [ ] **Step 3: Install dependencies**

Run: `npm install`

Expected: dependencies install and `package-lock.json` is created.

- [ ] **Step 4: Verify scaffold**

Run: `npm run build`

Expected: `vite build` completes and creates `dist/`.

Run: `npm test`

Expected: Vitest runs with no test files or passes once later tests exist.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json index.html tsconfig.json tsconfig.app.json tsconfig.node.json vitest.config.ts src
git commit -m "chore: scaffold techno genre galaxy app"
```

---

### Task 2: Data Model and Curated Dataset

**Files:**
- Create: `src/data/genreTypes.ts`
- Create: `src/data/genreData.ts`
- Create: `src/data/genreData.test.ts`

**Interfaces:**
- Produces: `relationshipLayers`, `genres`, `relationships`, `tracks`, `getGenreById(id: GenreId): Genre | undefined`, `getTracksForGenre(genreId: GenreId): Track[]`, `getRelationshipsForGenre(genreId: GenreId, layer?: RelationshipLayerType): Relationship[]`.

- [ ] **Step 1: Write failing data integrity tests**

Create `src/data/genreData.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  genres,
  getGenreById,
  getRelationshipsForGenre,
  getTracksForGenre,
  relationshipLayers,
  relationships,
  tracks,
} from './genreData';

describe('genre dataset', () => {
  it('contains the required relationship layers', () => {
    expect(relationshipLayers.map((layer) => layer.id)).toEqual(['history', 'sound', 'scene']);
  });

  it('contains the first-version genre set', () => {
    expect(genres).toHaveLength(24);
    expect(getGenreById('detroit-techno')?.name).toBe('Detroit Techno');
    expect(getGenreById('uk-garage')?.name).toBe('UK Garage');
  });

  it('has at least two tracks per genre', () => {
    for (const genre of genres) {
      expect(getTracksForGenre(genre.id).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('only references existing genres and tracks', () => {
    const genreIds = new Set(genres.map((genre) => genre.id));
    for (const relationship of relationships) {
      expect(genreIds.has(relationship.source)).toBe(true);
      expect(genreIds.has(relationship.target)).toBe(true);
      expect(['history', 'sound', 'scene']).toContain(relationship.type);
    }
    for (const track of tracks) {
      expect(genreIds.has(track.genreId)).toBe(true);
      expect(track.audioSrc).toMatch(/^\/audio\/placeholder-/);
    }
  });

  it('returns layer-specific relationships for a genre', () => {
    const history = getRelationshipsForGenre('detroit-techno', 'history');
    expect(history.length).toBeGreaterThan(0);
    expect(history.every((relationship) => relationship.type === 'history')).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/data/genreData.test.ts`

Expected: FAIL because `src/data/genreData.ts` does not exist.

- [ ] **Step 3: Create types**

Create `src/data/genreTypes.ts`:

```ts
export type RelationshipLayerType = 'history' | 'sound' | 'scene';

export type GenreId = string;
export type TrackId = string;

export type Vector3Tuple = [number, number, number];

export interface RelationshipLayer {
  id: RelationshipLayerType;
  label: string;
  description: string;
}

export interface VisualProfile {
  color: string;
  accent: string;
  pulseSpeed: number;
  particleDensity: number;
  motion: 'stable' | 'sharp' | 'mist' | 'spiral' | 'fragmented' | 'route';
}

export interface Track {
  id: TrackId;
  title: string;
  artist: string;
  year: number;
  duration: string;
  genreId: GenreId;
  audioSrc: string;
  note: string;
}

export interface Genre {
  id: GenreId;
  name: string;
  aliases: string[];
  category: 'techno' | 'house' | 'electro' | 'trance' | 'bass' | 'ambient' | 'industrial';
  era: string;
  regions: string[];
  summary: string;
  soundKeywords: string[];
  visualProfile: VisualProfile;
  position: Vector3Tuple;
}

export interface Relationship {
  id: string;
  source: GenreId;
  target: GenreId;
  type: RelationshipLayerType;
  strength: 1 | 2 | 3 | 4 | 5;
  directional: boolean;
  label: string;
  description: string;
}
```

- [ ] **Step 4: Create dataset**

Create `src/data/genreData.ts` with all 24 genres. Use this pattern for every genre entry and ensure the ids match the test:

```ts
import type { Genre, GenreId, Relationship, RelationshipLayer, RelationshipLayerType, Track } from './genreTypes';

export const relationshipLayers: RelationshipLayer[] = [
  { id: 'history', label: 'History', description: 'Directional influence and descent.' },
  { id: 'sound', label: 'Sound', description: 'Shared rhythm, texture, tempo, or atmosphere.' },
  { id: 'scene', label: 'Scene', description: 'Cities, clubs, labels, and cultural context.' },
];

export const genres: Genre[] = [
  {
    id: 'detroit-techno',
    name: 'Detroit Techno',
    aliases: ['Detroit'],
    category: 'techno',
    era: '1980s',
    regions: ['Detroit'],
    summary:
      'A machine-soul blueprint where futurist synths, funk memory, and industrial city pressure become precise dance music. It acts as the central gravity source for this galaxy.',
    soundKeywords: ['machine funk', 'futurist', 'syncopated', 'soulful'],
    visualProfile: { color: '#00e5ff', accent: '#ffffff', pulseSpeed: 0.8, particleDensity: 1, motion: 'stable' },
    position: [0, 0, 0],
  },
  {
    id: 'minimal-techno',
    name: 'Minimal Techno',
    aliases: [],
    category: 'techno',
    era: '1990s',
    regions: ['Detroit', 'Berlin'],
    summary:
      'A stripped reduction of techno where small changes become the drama. Repetition, space, and microscopic modulation carry the floor forward.',
    soundKeywords: ['reduced', 'hypnotic', 'dry', 'micro-shift'],
    visualProfile: { color: '#7df9ff', accent: '#8affc1', pulseSpeed: 0.55, particleDensity: 0.55, motion: 'stable' },
    position: [2.4, 0.8, -0.6],
  }
];
```

Continue the array with these ids and names: `dub-techno`, `acid-techno`, `hard-techno`, `industrial-techno`, `schranz`, `melodic-techno`, `ambient-techno`, `electro`, `chicago-house`, `acid-house`, `deep-house`, `ebm`, `new-beat`, `trance`, `goa-trance`, `breakbeat-hardcore`, `jungle`, `idm`, `ambient`, `berlin-school`, `uk-garage`, `breaks`.

Add `tracks` with exactly two placeholder tracks per genre:

```ts
export const tracks: Track[] = genres.flatMap((genre, index) => [
  {
    id: `${genre.id}-pulse-a`,
    title: `${genre.name} Signal A`,
    artist: 'Prototype Archive',
    year: 1990 + (index % 25),
    duration: '0:30',
    genreId: genre.id,
    audioSrc: `/audio/placeholder-${(index % 3) + 1}.mp3`,
    note: `Placeholder loop for testing the ${genre.name} playback state.`,
  },
  {
    id: `${genre.id}-pulse-b`,
    title: `${genre.name} Signal B`,
    artist: 'Prototype Archive',
    year: 1992 + (index % 25),
    duration: '0:30',
    genreId: genre.id,
    audioSrc: `/audio/placeholder-${((index + 1) % 3) + 1}.mp3`,
    note: `Second placeholder loop for testing ${genre.name} track switching.`,
  },
]);
```

Add at least 36 relationships across the three layers, including this minimum set:

```ts
export const relationships: Relationship[] = [
  {
    id: 'detroit-to-minimal',
    source: 'detroit-techno',
    target: 'minimal-techno',
    type: 'history',
    strength: 5,
    directional: true,
    label: 'Blueprint reduction',
    description: 'Minimal Techno compresses Detroit futurism into smaller, more hypnotic gestures.',
  },
  {
    id: 'detroit-to-dub',
    source: 'detroit-techno',
    target: 'dub-techno',
    type: 'history',
    strength: 4,
    directional: true,
    label: 'Deep space echo',
    description: 'Dub Techno carries techno pulse into echo, haze, and spatial delay.',
  },
  {
    id: 'acid-house-to-acid-techno',
    source: 'acid-house',
    target: 'acid-techno',
    type: 'history',
    strength: 5,
    directional: true,
    label: '303 pressure',
    description: 'Acid Techno hardens the acid line into a more driving techno structure.',
  },
  {
    id: 'dub-to-ambient-techno-sound',
    source: 'dub-techno',
    target: 'ambient-techno',
    type: 'sound',
    strength: 5,
    directional: false,
    label: 'Fog and delay',
    description: 'Both lean on spacious delay, softened attack, and immersive atmosphere.',
  },
  {
    id: 'detroit-chicago-scene',
    source: 'detroit-techno',
    target: 'chicago-house',
    type: 'scene',
    strength: 5,
    directional: false,
    label: 'Midwest exchange',
    description: 'Detroit and Chicago form a crucial regional exchange between techno and house lineages.',
  }
];
```

Add selectors at the bottom:

```ts
export function getGenreById(id: GenreId): Genre | undefined {
  return genres.find((genre) => genre.id === id);
}

export function getTracksForGenre(genreId: GenreId): Track[] {
  return tracks.filter((track) => track.genreId === genreId);
}

export function getRelationshipsForGenre(genreId: GenreId, layer?: RelationshipLayerType): Relationship[] {
  return relationships.filter((relationship) => {
    const touchesGenre = relationship.source === genreId || relationship.target === genreId;
    return touchesGenre && (layer === undefined || relationship.type === layer);
  });
}
```

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test -- src/data/genreData.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/data
git commit -m "feat: add curated genre dataset"
```

---

### Task 3: Pure State Model

**Files:**
- Create: `src/state/galaxyState.ts`
- Create: `src/state/galaxyState.test.ts`

**Interfaces:**
- Consumes: `RelationshipLayerType`, `GenreId`, `TrackId`.
- Produces: `GalaxyState`, `initialGalaxyState`, `galaxyReducer(state, action)`, `selectGenre(state, genreId)`, `selectLayer(state, layer)`, `startTrack(state, trackId)`, `stopTrack(state)`.

- [ ] **Step 1: Write failing reducer tests**

Create `src/state/galaxyState.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import {
  galaxyReducer,
  initialGalaxyState,
  selectGenre,
  selectLayer,
  startTrack,
  stopTrack,
} from './galaxyState';

describe('galaxy state', () => {
  it('selects a genre and preserves the active layer', () => {
    const state = selectLayer(initialGalaxyState, 'sound');
    expect(selectGenre(state, 'dub-techno')).toMatchObject({
      selectedGenreId: 'dub-techno',
      activeLayer: 'sound',
    });
  });

  it('switches relationship layer', () => {
    expect(selectLayer(initialGalaxyState, 'scene').activeLayer).toBe('scene');
  });

  it('starts and stops tracks', () => {
    const playing = startTrack(initialGalaxyState, 'detroit-techno-pulse-a');
    expect(playing.currentTrackId).toBe('detroit-techno-pulse-a');
    expect(playing.isPlaying).toBe(true);
    expect(stopTrack(playing).isPlaying).toBe(false);
  });

  it('handles reducer actions', () => {
    const state = galaxyReducer(initialGalaxyState, { type: 'selectGenre', genreId: 'acid-techno' });
    expect(state.selectedGenreId).toBe('acid-techno');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/state/galaxyState.test.ts`

Expected: FAIL because `galaxyState.ts` does not exist.

- [ ] **Step 3: Implement state model**

Create `src/state/galaxyState.ts`:

```ts
import type { GenreId, RelationshipLayerType, TrackId } from '../data/genreTypes';

export interface GalaxyState {
  selectedGenreId: GenreId | null;
  hoveredGenreId: GenreId | null;
  activeLayer: RelationshipLayerType;
  currentTrackId: TrackId | null;
  isPlaying: boolean;
}

export type GalaxyAction =
  | { type: 'selectGenre'; genreId: GenreId }
  | { type: 'hoverGenre'; genreId: GenreId | null }
  | { type: 'selectLayer'; layer: RelationshipLayerType }
  | { type: 'startTrack'; trackId: TrackId }
  | { type: 'stopTrack' };

export const initialGalaxyState: GalaxyState = {
  selectedGenreId: 'detroit-techno',
  hoveredGenreId: null,
  activeLayer: 'history',
  currentTrackId: null,
  isPlaying: false,
};

export function selectGenre(state: GalaxyState, genreId: GenreId): GalaxyState {
  return { ...state, selectedGenreId: genreId };
}

export function selectLayer(state: GalaxyState, layer: RelationshipLayerType): GalaxyState {
  return { ...state, activeLayer: layer };
}

export function startTrack(state: GalaxyState, trackId: TrackId): GalaxyState {
  return { ...state, currentTrackId: trackId, isPlaying: true };
}

export function stopTrack(state: GalaxyState): GalaxyState {
  return { ...state, isPlaying: false };
}

export function galaxyReducer(state: GalaxyState, action: GalaxyAction): GalaxyState {
  switch (action.type) {
    case 'selectGenre':
      return selectGenre(state, action.genreId);
    case 'hoverGenre':
      return { ...state, hoveredGenreId: action.genreId };
    case 'selectLayer':
      return selectLayer(state, action.layer);
    case 'startTrack':
      return startTrack(state, action.trackId);
    case 'stopTrack':
      return stopTrack(state);
  }
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/state/galaxyState.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/state
git commit -m "feat: add galaxy state model"
```

---

### Task 4: Geometry Helpers for 3D Navigation

**Files:**
- Create: `src/galaxy/geometry.ts`
- Create: `src/galaxy/geometry.test.ts`

**Interfaces:**
- Consumes: `Vector3Tuple`.
- Produces: `distance(a, b)`, `midpoint(a, b)`, `cameraTargetFor(position)`, `curvePoints(source, target, lift)`.

- [ ] **Step 1: Write failing geometry tests**

Create `src/galaxy/geometry.test.ts`:

```ts
import { describe, expect, it } from 'vitest';
import { cameraTargetFor, curvePoints, distance, midpoint } from './geometry';

describe('geometry helpers', () => {
  it('computes distance and midpoint', () => {
    expect(distance([0, 0, 0], [3, 4, 0])).toBe(5);
    expect(midpoint([0, 0, 0], [2, 4, 6])).toEqual([1, 2, 3]);
  });

  it('creates a camera target offset from the genre position', () => {
    expect(cameraTargetFor([1, 2, 3])).toEqual([2.8, 3.2, 6.8]);
  });

  it('creates three curve points with lifted midpoint', () => {
    expect(curvePoints([0, 0, 0], [2, 0, 0], 1)).toEqual([
      [0, 0, 0],
      [1, 1, 0],
      [2, 0, 0],
    ]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/galaxy/geometry.test.ts`

Expected: FAIL because `geometry.ts` does not exist.

- [ ] **Step 3: Implement helpers**

Create `src/galaxy/geometry.ts`:

```ts
import type { Vector3Tuple } from '../data/genreTypes';

export function distance(a: Vector3Tuple, b: Vector3Tuple): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function midpoint(a: Vector3Tuple, b: Vector3Tuple): Vector3Tuple {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
}

export function cameraTargetFor(position: Vector3Tuple): Vector3Tuple {
  return [position[0] + 1.8, position[1] + 1.2, position[2] + 3.8];
}

export function curvePoints(source: Vector3Tuple, target: Vector3Tuple, lift: number): Vector3Tuple[] {
  const mid = midpoint(source, target);
  return [source, [mid[0], mid[1] + lift, mid[2]], target];
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test -- src/galaxy/geometry.test.ts`

Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/galaxy/geometry.ts src/galaxy/geometry.test.ts
git commit -m "feat: add galaxy geometry helpers"
```

---

### Task 5: 3D Galaxy Scene

**Files:**
- Create: `src/galaxy/visualProfiles.ts`
- Create: `src/galaxy/GenreMolecule.tsx`
- Create: `src/galaxy/RelationshipLayer.tsx`
- Create: `src/galaxy/CameraRig.tsx`
- Create: `src/galaxy/GenreGalaxy.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `genres`, `relationships`, `GalaxyState`, `galaxyReducer`.
- Produces: full-screen `GenreGalaxy` with clickable molecules and layer-specific relationship rendering.

- [ ] **Step 1: Create visual profile utilities**

Create `src/galaxy/visualProfiles.ts`:

```ts
import type { RelationshipLayerType, VisualProfile } from '../data/genreTypes';

export function emissiveIntensity(profile: VisualProfile, active: boolean): number {
  return active ? 1.4 + profile.pulseSpeed : 0.45 + profile.pulseSpeed * 0.25;
}

export function layerColor(layer: RelationshipLayerType): string {
  if (layer === 'history') return '#00e5ff';
  if (layer === 'sound') return '#8affc1';
  return '#ff2bd6';
}
```

- [ ] **Step 2: Create molecule component**

Create `src/galaxy/GenreMolecule.tsx`:

```tsx
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';
import type { Genre, GenreId } from '../data/genreTypes';
import { emissiveIntensity } from './visualProfiles';

interface GenreMoleculeProps {
  genre: Genre;
  active: boolean;
  playing: boolean;
  onHover: (genreId: GenreId | null) => void;
  onSelect: (genreId: GenreId) => void;
}

export function GenreMolecule({ genre, active, playing, onHover, onSelect }: GenreMoleculeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = Math.sin(clock.elapsedTime * genre.visualProfile.pulseSpeed * 2) * 0.08;
    const playingBoost = playing ? 0.22 : 0;
    const scale = 1 + pulse + playingBoost;
    meshRef.current.scale.setScalar(active ? scale * 1.16 : scale);
  });

  return (
    <group position={genre.position}>
      <mesh
        ref={meshRef}
        onClick={(event) => {
          event.stopPropagation();
          onSelect(genre.id);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(genre.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        <sphereGeometry args={[0.18 + genre.visualProfile.particleDensity * 0.05, 32, 32]} />
        <meshStandardMaterial
          color={genre.visualProfile.color}
          emissive={genre.visualProfile.color}
          emissiveIntensity={emissiveIntensity(genre.visualProfile, active || playing)}
          roughness={0.28}
          metalness={0.2}
        />
      </mesh>
      <mesh>
        <torusGeometry args={[0.34, 0.006, 8, 64]} />
        <meshBasicMaterial color={genre.visualProfile.accent} transparent opacity={active ? 0.65 : 0.24} />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 3: Create relationship layer**

Create `src/galaxy/RelationshipLayer.tsx`:

```tsx
import { Line } from '@react-three/drei';
import { getGenreById } from '../data/genreData';
import type { Relationship, RelationshipLayerType } from '../data/genreTypes';
import { curvePoints } from './geometry';
import { layerColor } from './visualProfiles';

interface RelationshipLayerProps {
  activeLayer: RelationshipLayerType;
  relationships: Relationship[];
  highlightedGenreId: string | null;
}

export function RelationshipLayer({ activeLayer, relationships, highlightedGenreId }: RelationshipLayerProps) {
  return (
    <>
      {relationships
        .filter((relationship) => relationship.type === activeLayer)
        .map((relationship) => {
          const source = getGenreById(relationship.source);
          const target = getGenreById(relationship.target);
          if (!source || !target) return null;
          const highlighted =
            highlightedGenreId === relationship.source || highlightedGenreId === relationship.target;
          return (
            <Line
              key={relationship.id}
              points={curvePoints(source.position, target.position, relationship.strength * 0.18)}
              color={layerColor(activeLayer)}
              lineWidth={highlighted ? relationship.strength * 0.7 : relationship.strength * 0.24}
              transparent
              opacity={highlighted ? 0.92 : 0.22}
            />
          );
        })}
    </>
  );
}
```

- [ ] **Step 4: Create camera rig and scene**

Create `src/galaxy/CameraRig.tsx`:

```tsx
import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { Vector3 } from 'three';
import type { Genre } from '../data/genreTypes';
import { cameraTargetFor } from './geometry';

interface CameraRigProps {
  selectedGenre: Genre | undefined;
}

export function CameraRig({ selectedGenre }: CameraRigProps) {
  const { camera } = useThree();
  const target = useMemo(() => {
    if (!selectedGenre) return new Vector3(0, 2.4, 8);
    return new Vector3(...cameraTargetFor(selectedGenre.position));
  }, [selectedGenre]);

  useFrame(() => {
    camera.position.lerp(target, 0.045);
    camera.lookAt(selectedGenre ? new Vector3(...selectedGenre.position) : new Vector3(0, 0, 0));
  });

  return null;
}
```

Create `src/galaxy/GenreGalaxy.tsx`:

```tsx
import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { genres, getGenreById, relationships } from '../data/genreData';
import type { GalaxyAction, GalaxyState } from '../state/galaxyState';
import { CameraRig } from './CameraRig';
import { GenreMolecule } from './GenreMolecule';
import { RelationshipLayer } from './RelationshipLayer';

interface GenreGalaxyProps {
  state: GalaxyState;
  dispatch: React.Dispatch<GalaxyAction>;
}

export function GenreGalaxy({ state, dispatch }: GenreGalaxyProps) {
  const selectedGenre = state.selectedGenreId ? getGenreById(state.selectedGenreId) : undefined;
  const highlightedGenreId = state.hoveredGenreId ?? state.selectedGenreId;

  return (
    <Canvas camera={{ position: [0, 2.4, 8], fov: 58 }} dpr={[1, 1.8]} gl={{ antialias: true }}>
      <color attach="background" args={['#030307']} />
      <fog attach="fog" args={['#030307', 5, 15]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 3, 4]} intensity={1.2} color="#00e5ff" />
      <pointLight position={[-4, -2, -3]} intensity={0.8} color="#ff2bd6" />
      <Stars radius={18} depth={8} count={900} factor={2} saturation={0} fade speed={0.18} />
      <RelationshipLayer
        activeLayer={state.activeLayer}
        relationships={relationships}
        highlightedGenreId={highlightedGenreId}
      />
      {genres.map((genre) => (
        <GenreMolecule
          key={genre.id}
          genre={genre}
          active={state.selectedGenreId === genre.id}
          playing={state.currentTrackId?.startsWith(genre.id) === true && state.isPlaying}
          onHover={(genreId) => dispatch({ type: 'hoverGenre', genreId })}
          onSelect={(genreId) => dispatch({ type: 'selectGenre', genreId })}
        />
      ))}
      <CameraRig selectedGenre={selectedGenre} />
      <OrbitControls enablePan={false} minDistance={3.2} maxDistance={12} enableDamping dampingFactor={0.08} />
    </Canvas>
  );
}
```

- [ ] **Step 5: Wire scene into app**

Modify `src/App.tsx`:

```tsx
import { useReducer } from 'react';
import { GenreGalaxy } from './galaxy/GenreGalaxy';
import { galaxyReducer, initialGalaxyState } from './state/galaxyState';

export default function App() {
  const [state, dispatch] = useReducer(galaxyReducer, initialGalaxyState);

  return (
    <main className="app-shell">
      <GenreGalaxy state={state} dispatch={dispatch} />
    </main>
  );
}
```

Add to `src/styles.css`:

```css
canvas {
  display: block;
}
```

- [ ] **Step 6: Verify scene builds**

Run: `npm run build`

Expected: PASS with no TypeScript errors.

- [ ] **Step 7: Commit**

```bash
git add src/App.tsx src/styles.css src/galaxy
git commit -m "feat: render interactive genre galaxy"
```

---

### Task 6: Layer Controls, Genre Panel, and Player UI

**Files:**
- Create: `src/components/LayerControls.tsx`
- Create: `src/components/GenrePanel.tsx`
- Create: `src/components/GenrePanel.test.tsx`
- Create: `src/components/AudioPlayer.tsx`
- Modify: `src/App.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- Consumes: `GalaxyState`, `GalaxyAction`, `relationshipLayers`, `getGenreById`, `getTracksForGenre`, `getRelationshipsForGenre`.
- Produces: readable overlay UI and jump/play actions.

- [ ] **Step 1: Write failing panel test**

Create `src/components/GenrePanel.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { getGenreById } from '../data/genreData';
import { GenrePanel } from './GenrePanel';

describe('GenrePanel', () => {
  it('renders selected genre and dispatches related jumps and track starts', async () => {
    const dispatch = vi.fn();
    render(<GenrePanel genre={getGenreById('detroit-techno')} dispatch={dispatch} />);

    expect(screen.getByRole('heading', { name: 'Detroit Techno' })).toBeInTheDocument();
    await userEvent.click(screen.getAllByRole('button', { name: /play/i })[0]);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'startTrack' }));

    await userEvent.click(screen.getAllByRole('button', { name: /jump to/i })[0]);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'selectGenre' }));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/components/GenrePanel.test.tsx`

Expected: FAIL because `GenrePanel.tsx` does not exist.

- [ ] **Step 3: Create layer controls**

Create `src/components/LayerControls.tsx`:

```tsx
import { relationshipLayers } from '../data/genreData';
import type { RelationshipLayerType } from '../data/genreTypes';

interface LayerControlsProps {
  activeLayer: RelationshipLayerType;
  onChange: (layer: RelationshipLayerType) => void;
}

export function LayerControls({ activeLayer, onChange }: LayerControlsProps) {
  return (
    <nav className="layer-controls" aria-label="Relationship layers">
      {relationshipLayers.map((layer) => (
        <button
          key={layer.id}
          type="button"
          className={activeLayer === layer.id ? 'is-active' : ''}
          onClick={() => onChange(layer.id)}
          aria-pressed={activeLayer === layer.id}
        >
          {layer.label}
        </button>
      ))}
    </nav>
  );
}
```

- [ ] **Step 4: Create genre panel**

Create `src/components/GenrePanel.tsx`:

```tsx
import { getRelationshipsForGenre, getTracksForGenre, getGenreById } from '../data/genreData';
import type { Genre } from '../data/genreTypes';
import type { GalaxyAction } from '../state/galaxyState';

interface GenrePanelProps {
  genre: Genre | undefined;
  dispatch: React.Dispatch<GalaxyAction>;
}

export function GenrePanel({ genre, dispatch }: GenrePanelProps) {
  if (!genre) return null;

  const tracks = getTracksForGenre(genre.id);
  const related = getRelationshipsForGenre(genre.id).slice(0, 6);

  return (
    <aside className="genre-panel" aria-label={`${genre.name} details`}>
      <p className="panel-kicker">{genre.era} / {genre.regions.join(', ')}</p>
      <h1>{genre.name}</h1>
      <p className="summary">{genre.summary}</p>
      <ul className="keyword-list" aria-label="Sound keywords">
        {genre.soundKeywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
      <section>
        <h2>Signals</h2>
        <div className="track-list">
          {tracks.map((track) => (
            <button
              key={track.id}
              type="button"
              className="track-button"
              onClick={() => dispatch({ type: 'startTrack', trackId: track.id })}
            >
              <span>Play {track.title}</span>
              <small>{track.artist} / {track.year}</small>
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2>Related</h2>
        <div className="related-list">
          {related.map((relationship) => {
            const otherId = relationship.source === genre.id ? relationship.target : relationship.source;
            const other = getGenreById(otherId);
            if (!other) return null;
            return (
              <button
                key={relationship.id}
                type="button"
                onClick={() => dispatch({ type: 'selectGenre', genreId: other.id })}
              >
                Jump to {other.name}
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );
}
```

- [ ] **Step 5: Create audio player UI**

Create `src/components/AudioPlayer.tsx`:

```tsx
import { tracks } from '../data/genreData';
import type { GalaxyAction, GalaxyState } from '../state/galaxyState';

interface AudioPlayerProps {
  state: GalaxyState;
  dispatch: React.Dispatch<GalaxyAction>;
}

export function AudioPlayer({ state, dispatch }: AudioPlayerProps) {
  const track = tracks.find((item) => item.id === state.currentTrackId);
  if (!track) return null;

  return (
    <footer className="audio-player" aria-label="Audio player">
      <div>
        <strong>{track.title}</strong>
        <span>{track.artist} / {track.duration}</span>
      </div>
      <button type="button" onClick={() => dispatch({ type: state.isPlaying ? 'stopTrack' : 'startTrack', trackId: track.id })}>
        {state.isPlaying ? 'Pause' : 'Play'}
      </button>
    </footer>
  );
}
```

- [ ] **Step 6: Wire UI into app**

Modify `src/App.tsx`:

```tsx
import { useReducer } from 'react';
import { AudioPlayer } from './components/AudioPlayer';
import { GenrePanel } from './components/GenrePanel';
import { LayerControls } from './components/LayerControls';
import { getGenreById } from './data/genreData';
import { GenreGalaxy } from './galaxy/GenreGalaxy';
import { galaxyReducer, initialGalaxyState } from './state/galaxyState';

export default function App() {
  const [state, dispatch] = useReducer(galaxyReducer, initialGalaxyState);
  const selectedGenre = state.selectedGenreId ? getGenreById(state.selectedGenreId) : undefined;

  return (
    <main className="app-shell">
      <GenreGalaxy state={state} dispatch={dispatch} />
      <LayerControls activeLayer={state.activeLayer} onChange={(layer) => dispatch({ type: 'selectLayer', layer })} />
      <GenrePanel genre={selectedGenre} dispatch={dispatch} />
      <AudioPlayer state={state} dispatch={dispatch} />
    </main>
  );
}
```

Add responsive overlay CSS to `src/styles.css`:

```css
.layer-controls {
  position: absolute;
  top: 24px;
  left: 24px;
  display: flex;
  gap: 8px;
  padding: 6px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(3, 3, 7, 0.62);
  backdrop-filter: blur(14px);
}

.layer-controls button,
.related-list button,
.audio-player button,
.track-button {
  min-height: 40px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  color: #f4f7fb;
  background: rgba(255, 255, 255, 0.06);
}

.layer-controls .is-active {
  border-color: #00e5ff;
  color: #00e5ff;
}

.genre-panel {
  position: absolute;
  top: 88px;
  right: 24px;
  width: min(380px, calc(100vw - 48px));
  max-height: calc(100vh - 176px);
  overflow: auto;
  padding: 20px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(3, 3, 7, 0.68);
  backdrop-filter: blur(18px);
}

.genre-panel h1,
.genre-panel h2,
.genre-panel p {
  margin-top: 0;
}

.panel-kicker,
.audio-player span,
.track-button small {
  color: rgba(244, 247, 251, 0.68);
}

.keyword-list,
.related-list,
.track-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  list-style: none;
}

.keyword-list li {
  padding: 6px 8px;
  border: 1px solid rgba(138, 255, 193, 0.24);
  color: #8affc1;
}

.track-button {
  display: grid;
  width: 100%;
  padding: 10px;
  text-align: left;
}

.audio-player {
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(3, 3, 7, 0.72);
  backdrop-filter: blur(16px);
}

@media (max-width: 720px) {
  .layer-controls {
    right: 12px;
    left: 12px;
    top: 12px;
  }

  .genre-panel {
    right: 12px;
    left: 12px;
    top: auto;
    bottom: 86px;
    width: auto;
    max-height: 42vh;
  }

  .audio-player {
    left: 12px;
    right: 12px;
    bottom: 12px;
  }
}
```

- [ ] **Step 7: Verify test and build**

Run: `npm test -- src/components/GenrePanel.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add src/App.tsx src/styles.css src/components
git commit -m "feat: add galaxy overlay controls"
```

---

### Task 7: Real Audio Hook

**Files:**
- Create: `src/audio/useAudioPlayer.ts`
- Create: `src/audio/useAudioPlayer.test.tsx`
- Modify: `src/components/AudioPlayer.tsx`
- Create: `public/audio/placeholder-1.mp3`
- Create: `public/audio/placeholder-2.mp3`
- Create: `public/audio/placeholder-3.mp3`

**Interfaces:**
- Consumes: current track from `tracks`.
- Produces: `useAudioPlayer(track, isPlaying)` returning `{ canPlay, error, progress, duration }`.

- [ ] **Step 1: Write failing hook test**

Create `src/audio/useAudioPlayer.test.tsx`:

```tsx
import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useAudioPlayer } from './useAudioPlayer';

describe('useAudioPlayer', () => {
  it('reports unavailable when no track exists', () => {
    const { result } = renderHook(() => useAudioPlayer(null, false));
    expect(result.current.canPlay).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('creates a playable state for a track after user-driven playback state is true', () => {
    const { result } = renderHook(() =>
      useAudioPlayer(
        {
          id: 'demo',
          title: 'Demo',
          artist: 'Prototype Archive',
          year: 1999,
          duration: '0:30',
          genreId: 'detroit-techno',
          audioSrc: '/audio/placeholder-1.mp3',
          note: 'Test track',
        },
        true,
      ),
    );
    expect(result.current.canPlay).toBe(true);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- src/audio/useAudioPlayer.test.tsx`

Expected: FAIL because `useAudioPlayer.ts` does not exist.

- [ ] **Step 3: Implement hook**

Create `src/audio/useAudioPlayer.ts`:

```ts
import { useEffect, useRef, useState } from 'react';
import type { Track } from '../data/genreTypes';

interface AudioPlayerState {
  canPlay: boolean;
  error: string | null;
  progress: number;
  duration: number;
}

export function useAudioPlayer(track: Track | null, isPlaying: boolean): AudioPlayerState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    canPlay: false,
    error: null,
    progress: 0,
    duration: 0,
  });

  useEffect(() => {
    if (!track) {
      audioRef.current?.pause();
      audioRef.current = null;
      setState({ canPlay: false, error: null, progress: 0, duration: 0 });
      return;
    }

    const audio = new Audio(track.audioSrc);
    audioRef.current = audio;
    setState({ canPlay: true, error: null, progress: 0, duration: 0 });

    const onTime = () => {
      setState((current) => ({
        ...current,
        progress: audio.currentTime,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      }));
    };
    const onError = () => setState((current) => ({ ...current, canPlay: false, error: 'Audio unavailable' }));

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onTime);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onTime);
      audio.removeEventListener('error', onError);
    };
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      void audio.play().catch(() => setState((current) => ({ ...current, error: 'Tap play to start audio' })));
    } else {
      audio.pause();
    }
  }, [isPlaying, track]);

  return state;
}
```

- [ ] **Step 4: Wire hook into player**

Modify `src/components/AudioPlayer.tsx`:

```tsx
import { tracks } from '../data/genreData';
import type { GalaxyAction, GalaxyState } from '../state/galaxyState';
import { useAudioPlayer } from '../audio/useAudioPlayer';

interface AudioPlayerProps {
  state: GalaxyState;
  dispatch: React.Dispatch<GalaxyAction>;
}

export function AudioPlayer({ state, dispatch }: AudioPlayerProps) {
  const track = tracks.find((item) => item.id === state.currentTrackId) ?? null;
  const audio = useAudioPlayer(track, state.isPlaying);
  if (!track) return null;

  return (
    <footer className="audio-player" aria-label="Audio player">
      <div>
        <strong>{track.title}</strong>
        <span>{track.artist} / {track.duration}</span>
        {audio.error ? <span role="status">{audio.error}</span> : null}
      </div>
      <button
        type="button"
        disabled={!audio.canPlay}
        onClick={() => dispatch({ type: state.isPlaying ? 'stopTrack' : 'startTrack', trackId: track.id })}
      >
        {state.isPlaying ? 'Pause' : 'Play'}
      </button>
    </footer>
  );
}
```

- [ ] **Step 5: Add placeholder audio files**

Create three short MP3 files in `public/audio/`. Use licensed samples, generated loops, or silent 0.5s MP3 placeholders. The files must be named exactly:

```text
public/audio/placeholder-1.mp3
public/audio/placeholder-2.mp3
public/audio/placeholder-3.mp3
```

- [ ] **Step 6: Verify**

Run: `npm test -- src/audio/useAudioPlayer.test.tsx`

Expected: PASS.

Run: `npm run build`

Expected: PASS.

- [ ] **Step 7: Commit**

```bash
git add src/audio src/components/AudioPlayer.tsx public/audio
git commit -m "feat: add playable audio model"
```

---

### Task 8: Final Verification and Polish

**Files:**
- Modify: `src/styles.css`
- Modify: files touched only if verification exposes a concrete issue.

**Interfaces:**
- Consumes: complete prototype.
- Produces: verified build and manual browser notes.

- [ ] **Step 1: Run full automated checks**

Run: `npm test`

Expected: all tests PASS.

Run: `npm run build`

Expected: production build PASS.

- [ ] **Step 2: Start dev server**

Run: `npm run dev`

Expected: Vite prints a local URL such as `http://localhost:5173/`.

- [ ] **Step 3: Browser verification**

Open the local URL and verify:

```text
3D scene renders with dark background and visible molecules.
Hovering a molecule changes visual emphasis.
Clicking a molecule opens or updates the detail panel.
Camera eases toward the selected molecule.
History, Sound, and Scene buttons change line colors and visible relationships.
Clicking a related genre in the panel changes the selected molecule.
Clicking a track starts the compact player after user action.
Desktop viewport at 1440x900 has no overlapping controls.
Mobile viewport at 390x844 keeps layer controls, bottom sheet, and player usable.
```

- [ ] **Step 4: Fix only concrete verification issues**

If text overflows on mobile, update the relevant CSS with this pattern:

```css
.genre-panel,
.audio-player,
.layer-controls {
  overflow-wrap: anywhere;
}
```

If the Canvas appears blank, check that `GenreGalaxy` is mounted in `App.tsx`, `genres` contains positions, and the camera starts at `[0, 2.4, 8]`.

If audio does not play, confirm the files exist in `public/audio/` and browser playback was triggered by clicking a play button.

- [ ] **Step 5: Final build**

Run: `npm run build`

Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src public package.json package-lock.json
git commit -m "chore: verify techno genre galaxy prototype"
```

---

## Self-Review

- Spec coverage: covered full-screen 3D first screen, dark club nebula style, genre molecule system, history/sound/scene relationship layers, genre panel, playable audio model, local data, desktop/mobile constraints, error handling, and verification.
- Placeholder scan: no unfinished markers or deferred implementation notes remain. Placeholder audio is explicitly scoped as the first-version playable model and requires exact filenames.
- Type consistency: `RelationshipLayerType`, `GenreId`, `TrackId`, `Genre`, `Relationship`, `Track`, `GalaxyState`, and reducer action names are consistent across tasks.
