import { relationshipLayers } from '../data/genreData';
import type { RelationshipViewType } from '../data/genreTypes';

interface LayerControlsProps {
  activeLayer: RelationshipViewType;
  onChange: (layer: RelationshipViewType) => void;
}

export function LayerControls({ activeLayer, onChange }: LayerControlsProps) {
  return (
    <nav className="layer-controls" aria-label="Relationship layers">
      <span className="layer-controls-label">Relationship</span>
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
