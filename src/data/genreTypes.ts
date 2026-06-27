export type RelationshipLayerType = 'history' | 'sound' | 'scene';
export type RelationshipViewType = 'all' | RelationshipLayerType;

export type GenreId = string;
export type TrackId = string;
export type TrackPlaybackStatus = 'ready' | 'reserved' | 'metadata-only';
export type TrackSourceKind = 'placeholder' | 'local-file' | 'external-url' | 'curated-reference';
export type PlaybackOptionGroup = 'platform-embed' | 'free-audio';
export type PlaybackProvider =
  | 'spotify'
  | 'apple-music'
  | 'soundcloud'
  | 'youtube'
  | 'internet-archive'
  | 'jamendo';

export type Vector3Tuple = [number, number, number];

export interface RelationshipLayer {
  id: RelationshipViewType;
  label: string;
  description: string;
}

export interface VisualProfile {
  color: string;
  accent: string;
  pulseSpeed: number;
  particleDensity: number;
  motion: 'stable' | 'sharp' | 'mist' | 'spiral' | 'fragmented' | 'route';
}

export interface Track {
  id: TrackId;
  title: string;
  artist: string;
  year: number;
  duration: string;
  genreId: GenreId;
  audioSrc: string;
  sourceKind: TrackSourceKind;
  playbackStatus: TrackPlaybackStatus;
  canonical?: boolean;
  playbackOptions?: PlaybackOption[];
  note: string;
}

export interface PlaybackOption {
  group: PlaybackOptionGroup;
  provider: PlaybackProvider;
  label: string;
  status: 'candidate' | 'pending-url' | 'available';
  url?: string;
}

export interface Genre {
  id: GenreId;
  name: string;
  aliases: string[];
  category: 'techno' | 'house' | 'electro' | 'trance' | 'bass' | 'ambient' | 'industrial';
  era: string;
  regions: string[];
  summary: string;
  soundKeywords: string[];
  visualProfile: VisualProfile;
  position: Vector3Tuple;
}

export interface Relationship {
  id: string;
  source: GenreId;
  target: GenreId;
  type: RelationshipLayerType;
  strength: 1 | 2 | 3 | 4 | 5;
  directional: boolean;
  label: string;
  description: string;
}
