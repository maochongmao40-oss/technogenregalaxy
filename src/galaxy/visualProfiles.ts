import type { RelationshipLayerType, RelationshipViewType, VisualProfile } from '../data/genreTypes';

export function emissiveIntensity(profile: VisualProfile, active: boolean): number {
  return active ? 1.4 + profile.pulseSpeed : 0.45 + profile.pulseSpeed * 0.25;
}

export function layerColor(layer: RelationshipViewType): string {
  if (layer === 'all') return '#f4f7fb';
  if (layer === 'history') return '#38bdf8';
  if (layer === 'sound') return '#a855f7';
  return '#ec4899';
}

export function relationshipLineWidth(layer: RelationshipLayerType, strength: number, highlighted: boolean): number {
  const base = layer === 'history' ? 0.42 : layer === 'sound' ? 0.32 : 0.26;
  const highlightBoost = highlighted ? 0.42 : 0.12;
  return strength * (base + highlightBoost);
}

export function relationshipOpacity(layer: RelationshipLayerType, highlighted: boolean): number {
  if (highlighted) return layer === 'scene' ? 0.86 : 0.94;
  return layer === 'history' ? 0.2 : layer === 'sound' ? 0.16 : 0.24;
}
