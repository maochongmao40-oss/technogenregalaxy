import { useMemo } from 'react';
import { CatmullRomCurve3, Vector3 } from 'three';
import { getGenreById } from '../data/genreData';
import type { Relationship, RelationshipViewType } from '../data/genreTypes';
import { relationshipCurvePoints } from './geometry';
import { graphPositionFor } from './graphLayout';
import { layerColor, relationshipLineWidth, relationshipOpacity } from './visualProfiles';

interface RelationshipLayerProps {
  activeLayer: RelationshipViewType;
  relationships: Relationship[];
  highlightedGenreId: string | null;
}

export function RelationshipLayer({ activeLayer, relationships, highlightedGenreId }: RelationshipLayerProps) {
  return (
    <>
      {relationships
        .filter((relationship) => activeLayer === 'all' || relationship.type === activeLayer)
        .map((relationship) => {
          const source = getGenreById(relationship.source);
          const target = getGenreById(relationship.target);
          if (!source || !target) return null;
          const highlighted =
            highlightedGenreId === relationship.source || highlightedGenreId === relationship.target;
          return (
            <RelationshipCurve
              key={relationship.id}
              relationship={relationship}
              highlighted={highlighted}
              dimmed={activeLayer === 'all' && !highlighted}
            />
          );
        })}
    </>
  );
}

function RelationshipCurve({
  relationship,
  highlighted,
  dimmed,
}: {
  relationship: Relationship;
  highlighted: boolean;
  dimmed: boolean;
}) {
  const source = getGenreById(relationship.source);
  const target = getGenreById(relationship.target);
  const curve = useMemo(() => {
    if (!source || !target) return null;
    const points = relationshipCurvePoints(
      graphPositionFor(source),
      graphPositionFor(target),
      relationship.type,
      relationship.strength,
    ).map((point) => new Vector3(...point));
    return new CatmullRomCurve3(points);
  }, [relationship, source, target]);

  if (!curve) return null;

  const radius = relationshipLineWidth(relationship.type, relationship.strength, highlighted) * 0.0028;
  const opacity = dimmed ? relationshipOpacity(relationship.type, highlighted) * 0.68 : relationshipOpacity(relationship.type, highlighted);

  return (
    <mesh>
      <tubeGeometry args={[curve, 56, radius, 8, false]} />
      <meshStandardMaterial
        color={layerColor(relationship.type)}
        emissive={layerColor(relationship.type)}
        emissiveIntensity={highlighted ? 1.35 : 0.45}
        transparent
        opacity={opacity}
        roughness={0.38}
        metalness={0.12}
        depthWrite={false}
      />
    </mesh>
  );
}
