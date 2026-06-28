import { Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { MathUtils, type Mesh } from 'three';
import type { SceneNode, SceneNodeId } from '../data/sceneTypes';

interface SceneNodeObjectProps {
  node: SceneNode;
  active: boolean;
  onHover: (nodeId: SceneNodeId | null) => void;
  onSelect: (nodeId: SceneNodeId) => void;
}

export function SceneNodeObject({ node, active, onHover, onSelect }: SceneNodeObjectProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const target = active ? 1.18 : node.type === 'city' ? 0.92 : node.type === 'genre' ? 0.76 : 0.66;
    const scale = MathUtils.damp(meshRef.current.scale.x, target, 5, delta);
    meshRef.current.scale.setScalar(scale);
    meshRef.current.rotation.y += active ? 0.006 : 0.002;
    meshRef.current.rotation.x += node.type === 'organization' ? 0.002 : 0;
  });

  return (
    <group position={node.position}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={(event) => {
          event.stopPropagation();
          onSelect(node.id);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          onHover(node.id);
        }}
        onPointerOut={() => onHover(null)}
      >
        {node.type === 'organization' ? <octahedronGeometry args={[0.7, 1]} /> : <sphereGeometry args={[0.62, 40, 40]} />}
        <meshBasicMaterial
          color={node.color}
          transparent
          opacity={active ? 1 : 0.86}
        />
      </mesh>
      <Html position={[0, -1, 0.04]} center className={`scene-node-label${active ? ' is-active' : ''}`}>
        <span>{node.name}</span>
      </Html>
    </group>
  );
}
