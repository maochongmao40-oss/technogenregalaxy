import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, type Mesh, type MeshPhysicalMaterial } from 'three';
import type { Genre, GenreId } from '../data/genreTypes';
import { graphPositionFor } from './graphLayout';
import { atomShapeFor, mixAtomShape } from './motion';
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
  const materialRef = useRef<MeshPhysicalMaterial>(null);
  const ringRef = useRef<Mesh>(null);
  const shellRef = useRef<Mesh>(null);
  const shapeProgress = useRef(0);

  useFrame(({ clock }, delta) => {
    if (!meshRef.current) return;
    shapeProgress.current = MathUtils.damp(shapeProgress.current, active ? 1 : 0, 4.8, delta);
    const pulse = Math.sin(clock.elapsedTime * genre.visualProfile.pulseSpeed * 2) * 0.06;
    const playingBoost = playing ? 0.18 : 0;
    const shape = mixAtomShape(
      atomShapeFor(false, genre.visualProfile.particleDensity),
      atomShapeFor(true, genre.visualProfile.particleDensity),
      shapeProgress.current,
    );
    const scale = 1 + pulse + playingBoost;
    meshRef.current.scale.set(
      shape.radius * shape.scale.x * scale,
      shape.radius * shape.scale.y * scale,
      shape.radius * shape.scale.z * scale,
    );
    meshRef.current.rotation.y += active ? 0.006 : 0.0016;
    meshRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.35) * 0.08 * shapeProgress.current;
    if (materialRef.current) {
      materialRef.current.opacity = shape.material.opacity;
      materialRef.current.roughness = shape.material.roughness;
      materialRef.current.metalness = shape.material.metalness;
      materialRef.current.clearcoat = shape.material.clearcoat;
      materialRef.current.emissiveIntensity = emissiveIntensity(genre.visualProfile, active || playing);
    }
    if (shellRef.current) {
      const shellScale = shapeProgress.current * (1 + pulse * 0.4);
      shellRef.current.scale.setScalar(shellScale);
      shellRef.current.visible = shellScale > 0.02;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.002 + genre.visualProfile.pulseSpeed * 0.0008;
      ringRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.22) * 0.18;
    }
  });

  return (
    <group position={graphPositionFor(genre)}>
      <mesh ref={shellRef} visible={false}>
        <sphereGeometry args={[0.48, 48, 48]} />
        <meshPhysicalMaterial
          color={genre.visualProfile.color}
          emissive={genre.visualProfile.color}
          emissiveIntensity={0.28}
          transparent
          opacity={0.14}
          roughness={0.05}
          metalness={0.08}
          clearcoat={1}
          depthWrite={false}
        />
      </mesh>
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
        <sphereGeometry args={[1, 48, 48]} />
        <meshPhysicalMaterial
          ref={materialRef}
          color={genre.visualProfile.color}
          emissive={genre.visualProfile.color}
          emissiveIntensity={emissiveIntensity(genre.visualProfile, active || playing)}
          transparent
          opacity={0.84}
          roughness={0.34}
          metalness={0.16}
          clearcoat={0.12}
        />
      </mesh>
      {active ? (
        <>
          <mesh rotation={[0.72, 0.18, 0.35]}>
            <torusGeometry args={[0.47, 0.01, 10, 96]} />
            <meshBasicMaterial color={genre.visualProfile.color} transparent opacity={0.42} />
          </mesh>
          <mesh rotation={[-0.38, 0.92, -0.16]}>
            <torusGeometry args={[0.54, 0.006, 8, 96]} />
            <meshBasicMaterial color={genre.visualProfile.accent} transparent opacity={0.34} />
          </mesh>
          <mesh rotation={[0.2, -0.44, 0.92]}>
            <torusGeometry args={[0.38, 0.004, 8, 96]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.18} />
          </mesh>
        </>
      ) : null}
      <mesh ref={ringRef}>
        <torusGeometry args={[0.34, 0.006, 8, 64]} />
        <meshBasicMaterial color={genre.visualProfile.accent} transparent opacity={active ? 0.65 : 0.24} />
      </mesh>
      <mesh position={[-0.08, 0.08, 0.24]} visible={active}>
        <sphereGeometry args={[0.065, 24, 24]} />
        <meshPhysicalMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.16}
          transparent
          opacity={0.72}
          roughness={0.02}
          metalness={0}
          clearcoat={1}
          depthWrite={false}
        />
      </mesh>
      {!active ? (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.18, 0.36, 64]} />
          <meshPhysicalMaterial
            color={genre.visualProfile.color}
            emissive={genre.visualProfile.color}
            emissiveIntensity={0.12}
            transparent
            opacity={0.14}
            roughness={0.2}
            metalness={0.12}
            clearcoat={0.3}
            depthWrite={false}
          />
        </mesh>
      ) : null}
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
