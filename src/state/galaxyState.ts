import type { GenreId, RelationshipLayerType, TrackId } from '../data/genreTypes';

export interface GalaxyState {
  selectedGenreId: GenreId | null;
  hoveredGenreId: GenreId | null;
  activeLayer: RelationshipLayerType;
  currentTrackId: TrackId | null;
  isPlaying: boolean;
}

export type GalaxyAction =
  | { type: 'selectGenre'; genreId: GenreId }
  | { type: 'hoverGenre'; genreId: GenreId | null }
  | { type: 'selectLayer'; layer: RelationshipLayerType }
  | { type: 'startTrack'; trackId: TrackId }
  | { type: 'stopTrack' };

export const initialGalaxyState: GalaxyState = {
  selectedGenreId: 'detroit-techno',
  hoveredGenreId: null,
  activeLayer: 'history',
  currentTrackId: null,
  isPlaying: false,
};

export function selectGenre(state: GalaxyState, genreId: GenreId): GalaxyState {
  return { ...state, selectedGenreId: genreId };
}

export function selectLayer(state: GalaxyState, layer: RelationshipLayerType): GalaxyState {
  return { ...state, activeLayer: layer };
}

export function startTrack(state: GalaxyState, trackId: TrackId): GalaxyState {
  return { ...state, currentTrackId: trackId, isPlaying: true };
}

export function stopTrack(state: GalaxyState): GalaxyState {
  return { ...state, isPlaying: false };
}

export function galaxyReducer(state: GalaxyState, action: GalaxyAction): GalaxyState {
  switch (action.type) {
    case 'selectGenre':
      return selectGenre(state, action.genreId);
    case 'hoverGenre':
      return { ...state, hoveredGenreId: action.genreId };
    case 'selectLayer':
      return selectLayer(state, action.layer);
    case 'startTrack':
      return startTrack(state, action.trackId);
    case 'stopTrack':
      return stopTrack(state);
  }
}
