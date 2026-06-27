import { Line } from '@react-three/drei';
import { getGenreById } from '../data/genreData';
import type { Relationship, RelationshipLayerType } from '../data/genreTypes';
import { relationshipCurvePoints } from './geometry';
import { graphPositionFor } from './graphLayout';
import { layerColor, relationshipLineWidth, relationshipOpacity } from './visualProfiles';

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
              points={relationshipCurvePoints(
                graphPositionFor(source),
                graphPositionFor(target),
                activeLayer,
                relationship.strength,
              )}
              color={layerColor(activeLayer)}
              lineWidth={relationshipLineWidth(activeLayer, relationship.strength, highlighted)}
              transparent
              opacity={relationshipOpacity(activeLayer, highlighted)}
            />
          );
        })}
    </>
  );
}
