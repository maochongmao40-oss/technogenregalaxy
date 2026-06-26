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
