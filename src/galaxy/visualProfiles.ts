import type { RelationshipLayerType, VisualProfile } from '../data/genreTypes';

export function emissiveIntensity(profile: VisualProfile, active: boolean): number {
  return active ? 1.4 + profile.pulseSpeed : 0.45 + profile.pulseSpeed * 0.25;
}

export function layerColor(layer: RelationshipLayerType): string {
  if (layer === 'history') return '#00e5ff';
  if (layer === 'sound') return '#8affc1';
  return '#ff2bd6';
}
