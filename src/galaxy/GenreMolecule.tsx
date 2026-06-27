import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';
import type { Genre, GenreId } from '../data/genreTypes';
import { graphPositionFor } from './graphLayout';
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
  const ringRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = Math.sin(clock.elapsedTime * genre.visualProfile.pulseSpeed * 2) * 0.06;
    const playingBoost = playing ? 0.18 : 0;
    const scale = 1 + pulse + playingBoost;
    meshRef.current.scale.setScalar(active ? scale * 1.16 : scale);
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.002 + genre.visualProfile.pulseSpeed * 0.0008;
      ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.18;
    }
  });

  return (
    <group position={graphPositionFor(genre)}>
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
      <mesh ref={ringRef}>
        <torusGeometry args={[0.34, 0.006, 8, 64]} />
        <meshBasicMaterial color={genre.visualProfile.accent} transparent opacity={active ? 0.65 : 0.24} />
      </mesh>
      <Text
        position={[0, -0.48, 0.02]}
        fontSize={active ? 0.12 : 0.095}
        maxWidth={0.95}
        anchorX="center"
        anchorY="middle"
        color={active ? '#ffffff' : 'rgba(244,247,251,0.72)'}
        outlineWidth={0.005}
        outlineColor="#030307"
      >
        {genre.name}
      </Text>
    </group>
  );
}
