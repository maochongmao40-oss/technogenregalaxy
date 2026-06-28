import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import { getSceneNodeById } from '../data/sceneData';
import type { SceneRelationship, SceneRelationshipType } from '../data/sceneTypes';

interface SceneRelationshipLayerProps {
  relationships: SceneRelationship[];
  highlightedNodeId: string | null;
}

const colors: Record<SceneRelationshipType, string> = {
  origin: '#38bdf8',
  influence: '#c084fc',
  scene: '#f472b6',
  release: '#93c5fd',
  migration: '#d946ef',
};

export function SceneRelationshipLayer({ relationships, highlightedNodeId }: SceneRelationshipLayerProps) {
  return (
    <>
      {relationships.map((relationship) => (
        <SceneRelationshipCurve
          key={relationship.id}
          relationship={relationship}
          highlighted={highlightedNodeId === relationship.source || highlightedNodeId === relationship.target}
        />
      ))}
    </>
  );
}

function SceneRelationshipCurve({ relationship, highlighted }: { relationship: SceneRelationship; highlighted: boolean }) {
  const source = getSceneNodeById(relationship.source);
  const target = getSceneNodeById(relationship.target);
  const curve = useMemo(() => {
    if (!source || !target) return null;
    const start = new Vector3(...source.position);
    const end = new Vector3(...target.position);
    const midpoint = start.clone().lerp(end, 0.5);
    midpoint.y += relationship.type === 'migration' ? 1.1 : 0.45 + relationship.strength * 0.08;
    midpoint.z += relationship.type === 'release' ? -0.35 : 0.28;
    return new CatmullRomCurve3([start, midpoint, end]);
  }, [relationship, source, target]);

  if (!curve) return null;

  return (
    <mesh>
      <tubeGeometry args={[curve, 48, (highlighted ? 0.012 : 0.007) + relationship.strength * 0.0012, 8, false]} />
      <meshStandardMaterial
        color={colors[relationship.type]}
        emissive={colors[relationship.type]}
        emissiveIntensity={highlighted ? 1.1 : 0.36}
        transparent
        opacity={highlighted ? 0.9 : 0.36}
        roughness={0.42}
        metalness={0.1}
        depthWrite={false}
      />
    </mesh>
  );
}
