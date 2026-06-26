import { Line } from '@react-three/drei';
import { getGenreById } from '../data/genreData';
import type { Relationship, RelationshipLayerType } from '../data/genreTypes';
import { curvePoints } from './geometry';
import { layerColor } from './visualProfiles';

interface RelationshipLayerProps {
  activeLayer: RelationshipLayerType;
  relationships: Relationship[];
  highlightedGenreId: string | null;
}

export function RelationshipLayer({ activeLayer, relationships, highlightedGenreId }: RelationshipLayerProps) {
  return (
    <>
      {relationships
        .filter((relationship) => relationship.type === activeLayer)
        .map((relationship) => {
          const source = getGenreById(relationship.source);
          const target = getGenreById(relationship.target);
          if (!source || !target) return null;
          const highlighted =
            highlightedGenreId === relationship.source || highlightedGenreId === relationship.target;
          return (
            <Line
              key={relationship.id}
              points={curvePoints(source.position, target.position, relationship.strength * 0.18)}
              color={layerColor(activeLayer)}
              lineWidth={highlighted ? relationship.strength * 0.7 : relationship.strength * 0.24}
              transparent
              opacity={highlighted ? 0.92 : 0.22}
            />
          );
        })}
    </>
  );
}
