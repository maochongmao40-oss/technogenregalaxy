import { useReducer, useState } from 'react';
import { AllTracksPanel } from './components/AllTracksPanel';
import { AudioPlayer } from './components/AudioPlayer';
import { GenrePanel } from './components/GenrePanel';
import { LayerControls } from './components/LayerControls';
import { ModeControls } from './components/ModeControls';
import { ScenePanel } from './components/ScenePanel';
import { getGenreById } from './data/genreData';
import { getSceneNodeById } from './data/sceneData';
import { GenreGalaxy } from './galaxy/GenreGalaxy';
import { SceneGalaxy } from './galaxy/SceneGalaxy';
import { galaxyReducer, initialGalaxyState } from './state/galaxyState';

export default function App() {
  const [state, dispatch] = useReducer(galaxyReducer, initialGalaxyState);
  const [tracksOpen, setTracksOpen] = useState(false);
  const selectedGenre = state.viewMode === 'genre' && state.selectedGenreId ? getGenreById(state.selectedGenreId) : undefined;
  const selectedSceneNode = state.viewMode === 'scene' && state.selectedSceneNodeId ? getSceneNodeById(state.selectedSceneNodeId) : undefined;

  return (
    <main className="app-shell">
      {state.viewMode === 'scene' ? <SceneGalaxy state={state} dispatch={dispatch} /> : <GenreGalaxy state={state} dispatch={dispatch} />}
      <ModeControls activeMode={state.viewMode} onChange={(viewMode) => dispatch({ type: 'selectViewMode', viewMode })} />
      {state.viewMode === 'genre' ? (
        <LayerControls activeLayer={state.activeLayer} onChange={(layer) => dispatch({ type: 'selectLayer', layer })} />
      ) : null}
      <AllTracksPanel
        open={tracksOpen}
        onToggle={() => {
          setTracksOpen((open) => {
            if (!open) dispatch({ type: 'clearSelectedGenre' });
            return !open;
          });
        }}
        dispatch={dispatch}
      />
      <GenrePanel genre={selectedGenre} dispatch={dispatch} />
      <ScenePanel node={selectedSceneNode} dispatch={dispatch} />
      <AudioPlayer state={state} dispatch={dispatch} />
    </main>
  );
}
