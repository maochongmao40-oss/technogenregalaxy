import { useReducer, useState } from 'react';
import { AllTracksPanel } from './components/AllTracksPanel';
import { AudioPlayer } from './components/AudioPlayer';
import { GenrePanel } from './components/GenrePanel';
import { LayerControls } from './components/LayerControls';
import { getGenreById } from './data/genreData';
import { GenreGalaxy } from './galaxy/GenreGalaxy';
import { galaxyReducer, initialGalaxyState } from './state/galaxyState';

export default function App() {
  const [state, dispatch] = useReducer(galaxyReducer, initialGalaxyState);
  const [tracksOpen, setTracksOpen] = useState(false);
  const selectedGenre = state.selectedGenreId ? getGenreById(state.selectedGenreId) : undefined;

  return (
    <main className="app-shell">
      <GenreGalaxy state={state} dispatch={dispatch} />
      <LayerControls activeLayer={state.activeLayer} onChange={(layer) => dispatch({ type: 'selectLayer', layer })} />
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
      <AudioPlayer state={state} dispatch={dispatch} />
    </main>
  );
}
