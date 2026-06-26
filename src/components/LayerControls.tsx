import { relationshipLayers } from '../data/genreData';
import type { RelationshipLayerType } from '../data/genreTypes';

interface LayerControlsProps {
  activeLayer: RelationshipLayerType;
  onChange: (layer: RelationshipLayerType) => void;
}

export function LayerControls({ activeLayer, onChange }: LayerControlsProps) {
  return (
    <nav className="layer-controls" aria-label="Relationship layers">
      {relationshipLayers.map((layer) => (
        <button
          key={layer.id}
          type="button"
          className={activeLayer === layer.id ? 'is-active' : ''}
          onClick={() => onChange(layer.id)}
          aria-pressed={activeLayer === layer.id}
          title={layer.description}
        >
          {layer.label}
        </button>
      ))}
    </nav>
  );
}
