import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef, type Dispatch } from 'react';
import { MOUSE, TOUCH } from 'three';
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
    <Canvas camera={{ position: [0, 0.5, 7.2], fov: 54 }} dpr={[1, 1.8]} gl={{ antialias: true }} shadows>
      <color attach="background" args={['#030307']} />
      <fog attach="fog" args={['#030307', 6, 18]} />
      <ambientLight intensity={0.18} />
      <directionalLight position={[3.5, 4.2, 5.5]} intensity={1.35} color="#ffffff" castShadow />
      <pointLight position={[0, 3, 4]} intensity={0.9} color="#38bdf8" />
      <pointLight position={[-4, -2, -3]} intensity={0.62} color="#ec4899" />
      <pointLight position={[2.8, -1.8, 2.4]} intensity={0.42} color="#fff4bf" />
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
        enableRotate
        minDistance={2.1}
        maxDistance={14}
        panSpeed={0.85}
        rotateSpeed={0.45}
        zoomSpeed={0.72}
        screenSpacePanning
        enableDamping
        dampingFactor={0.08}
        mouseButtons={{ LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }}
        touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }}
      />
    </Canvas>
  );
}
