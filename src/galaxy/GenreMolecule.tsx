import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, type Mesh, type MeshPhysicalMaterial } from 'three';
import type { Genre, GenreId } from '../data/genreTypes';
import { graphPositionFor } from './graphLayout';
import { atomShapeFor, mixAtomShape } from './motion';

interface GenreMoleculeProps {
  genre: Genre;
  active: boolean;
  playing: boolean;
  onHover: (genreId: GenreId | null) => void;
  onSelect: (genreId: GenreId) => void;
}

export function GenreMolecule({ genre, active, playing, onHover, onSelect }: GenreMoleculeProps) {
  const meshRef = useRef<Mesh>(null);
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const shapeProgress = useRef(0);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    shapeProgress.current = MathUtils.damp(shapeProgress.current, active ? 1 : 0, 4.8, delta);
    const shape = mixAtomShape(
      atomShapeFor(false, genre.visualProfile.particleDensity),
      atomShapeFor(true, genre.visualProfile.particleDensity),
      shapeProgress.current,
    );
    meshRef.current.scale.set(
      shape.radius * shape.scale.x,
      shape.radius * shape.scale.y,
      shape.radius * shape.scale.z,
    );
    meshRef.current.rotation.y += active ? 0.006 : 0.0016;
    if (materialRef.current) {
      materialRef.current.opacity = shape.material.opacity;
      materialRef.current.roughness = shape.material.roughness;
      materialRef.current.metalness = shape.material.metalness;
      materialRef.current.clearcoat = shape.material.clearcoat;
      materialRef.current.emissiveIntensity = playing
        ? shape.material.emissiveIntensity + 0.1
        : shape.material.emissiveIntensity;
    }
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
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color={genre.visualProfile.color}
          emissive={genre.visualProfile.color}
          emissiveIntensity={atomShapeFor(false, genre.visualProfile.particleDensity).material.emissiveIntensity}
          opacity={1}
          roughness={0.36}
          metalness={0.08}
          clearcoat={0.18}
          reflectivity={0.6}
        />
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
