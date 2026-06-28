import type { GenreId, RelationshipViewType, TrackId } from '../data/genreTypes';
import type { SceneNodeId } from '../data/sceneTypes';

export type GalaxyViewMode = 'genre' | 'scene';

export interface GalaxyState {
  viewMode: GalaxyViewMode;
  selectedGenreId: GenreId | null;
  hoveredGenreId: GenreId | null;
  selectedSceneNodeId: SceneNodeId | null;
  hoveredSceneNodeId: SceneNodeId | null;
  activeLayer: RelationshipViewType;
  currentTrackId: TrackId | null;
  isPlaying: boolean;
}

export type GalaxyAction =
  | { type: 'selectViewMode'; viewMode: GalaxyViewMode }
  | { type: 'selectGenre'; genreId: GenreId }
  | { type: 'clearSelectedGenre' }
  | { type: 'hoverGenre'; genreId: GenreId | null }
  | { type: 'selectSceneNode'; nodeId: SceneNodeId }
  | { type: 'hoverSceneNode'; nodeId: SceneNodeId | null }
  | { type: 'selectLayer'; layer: RelationshipViewType }
  | { type: 'startTrack'; trackId: TrackId }
  | { type: 'stopTrack' };

export const initialGalaxyState: GalaxyState = {
  viewMode: 'genre',
  selectedGenreId: 'detroit-techno',
  hoveredGenreId: null,
  selectedSceneNodeId: null,
  hoveredSceneNodeId: null,
  activeLayer: 'all',
  currentTrackId: null,
  isPlaying: false,
};

export function selectGenre(state: GalaxyState, genreId: GenreId): GalaxyState {
  return { ...state, viewMode: 'genre', selectedGenreId: genreId, selectedSceneNodeId: null };
}

export function clearSelectedGenre(state: GalaxyState): GalaxyState {
  return { ...state, selectedGenreId: null };
}

export function selectSceneMode(state: GalaxyState, viewMode: GalaxyViewMode): GalaxyState {
  if (viewMode === 'scene') {
    return {
      ...state,
      viewMode,
      selectedGenreId: null,
      hoveredGenreId: null,
      selectedSceneNodeId: state.selectedSceneNodeId ?? 'detroit',
    };
  }
  return {
    ...state,
    viewMode,
    selectedGenreId: state.selectedGenreId ?? 'detroit-techno',
    selectedSceneNodeId: null,
    hoveredSceneNodeId: null,
  };
}

export function selectSceneNode(state: GalaxyState, nodeId: SceneNodeId): GalaxyState {
  return {
    ...state,
    viewMode: 'scene',
    selectedSceneNodeId: nodeId,
    selectedGenreId: null,
  };
}

export function selectLayer(state: GalaxyState, layer: RelationshipViewType): GalaxyState {
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
    case 'selectViewMode':
      return selectSceneMode(state, action.viewMode);
    case 'selectGenre':
      return selectGenre(state, action.genreId);
    case 'clearSelectedGenre':
      return clearSelectedGenre(state);
    case 'hoverGenre':
      return { ...state, hoveredGenreId: action.genreId };
    case 'selectSceneNode':
      return selectSceneNode(state, action.nodeId);
    case 'hoverSceneNode':
      return { ...state, hoveredSceneNodeId: action.nodeId };
    case 'selectLayer':
      return selectLayer(state, action.layer);
    case 'startTrack':
      return startTrack(state, action.trackId);
    case 'stopTrack':
      return stopTrack(state);
  }
}
