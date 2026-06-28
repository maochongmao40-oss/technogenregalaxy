import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, type Mesh } from 'three';
import type { Genre, GenreId } from '../data/genreTypes';
import { graphPositionFor } from './graphLayout';

interface GenreMoleculeProps {
  genre: Genre;
  active: boolean;
  playing: boolean;
  onHover: (genreId: GenreId | null) => void;
  onSelect: (genreId: GenreId) => void;
}

export function GenreMolecule({ genre, active, playing, onHover, onSelect }: GenreMoleculeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const baseScale = 0.48 + genre.visualProfile.particleDensity * 0.1;
    const targetScale = active ? baseScale * 1.18 : playing ? baseScale * 1.08 : baseScale;
    const scale = MathUtils.damp(meshRef.current.scale.x, targetScale, 5, delta);
    meshRef.current.scale.setScalar(scale);
    meshRef.current.rotation.y += active ? 0.006 : 0.002;
    meshRef.current.rotation.x += genre.visualProfile.motion === 'sharp' ? 0.002 : 0.0008;
  });

  return (
    <group position={graphPositionFor(genre)}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
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
        {genre.category === 'industrial' ? <octahedronGeometry args={[0.58, 1]} /> : <sphereGeometry args={[0.52, 40, 40]} />}
        <meshBasicMaterial
          color={genre.visualProfile.color}
          transparent
          opacity={active ? 1 : 0.88}
        />
      </mesh>
      <Html
        position={[0, -0.86, 0.04]}
        center
        zIndexRange={[1, 0]}
        className={`scene-node-label genre-node-label${active ? ' is-active' : ''}`}
      >
        <span>{genre.name}</span>
      </Html>
    </group>
  );
}
