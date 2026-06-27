import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef, type Dispatch } from 'react';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { genres, getGenreById, relationships } from '../data/genreData';
import type { GalaxyAction, GalaxyState } from '../state/galaxyState';
import { CameraRig } from './CameraRig';
import { GenreMolecule } from './GenreMolecule';
import { RelationshipLayer } from './RelationshipLayer';

interface GenreGalaxyProps {
  state: GalaxyState;
  dispatch: Dispatch<GalaxyAction>;
}

export function GenreGalaxy({ state, dispatch }: GenreGalaxyProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const selectedGenre = state.selectedGenreId ? getGenreById(state.selectedGenreId) : undefined;
  const highlightedGenreId = state.hoveredGenreId ?? state.selectedGenreId;

  return (
    <Canvas camera={{ position: [0, 0.5, 7.2], fov: 54 }} dpr={[1, 1.8]} gl={{ antialias: true }}>
      <color attach="background" args={['#030307']} />
      <fog attach="fog" args={['#030307', 6, 18]} />
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
      <CameraRig selectedGenre={selectedGenre} controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enablePan
        minDistance={2.1}
        maxDistance={14}
        enableDamping
        dampingFactor={0.08}
      />
    </Canvas>
  );
}
