import type { PlaybackOption, Vector3Tuple } from './genreTypes';

export type SceneNodeId = string;
export type SceneNodeType = 'city' | 'organization' | 'artist' | 'genre';
export type SceneRelationshipType = 'origin' | 'influence' | 'scene' | 'release' | 'migration';

export interface SceneNode {
  id: SceneNodeId;
  name: string;
  type: SceneNodeType;
  era: string;
  region: string;
  summary: string;
  historicalRole: string;
  soundSignature: string[];
  relatedGenres: string[];
  keyPlaces: string[];
  keyArtists: string[];
  links: PlaybackOption[];
  position: Vector3Tuple;
  color: string;
  accent: string;
}

export interface SceneRelationship {
  id: string;
  source: SceneNodeId;
  target: SceneNodeId;
  type: SceneRelationshipType;
  strength: 1 | 2 | 3 | 4 | 5;
  directional: boolean;
  label: string;
  description: string;
}
