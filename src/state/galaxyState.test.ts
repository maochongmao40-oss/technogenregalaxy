import { describe, expect, it } from 'vitest';
import {
  galaxyReducer,
  initialGalaxyState,
  selectGenre,
  selectLayer,
  selectSceneMode,
  selectSceneNode,
  startTrack,
  stopTrack,
  clearSelectedGenre,
} from './galaxyState';

describe('galaxy state', () => {
  it('selects a genre and preserves the active layer', () => {
    const state = selectLayer(initialGalaxyState, 'sound');
    expect(selectGenre(state, 'dub-techno')).toMatchObject({
      selectedGenreId: 'dub-techno',
      activeLayer: 'sound',
    });
  });

  it('switches relationship layer', () => {
    expect(selectLayer(initialGalaxyState, 'scene').activeLayer).toBe('scene');
  });

  it('clears the selected genre', () => {
    expect(clearSelectedGenre(initialGalaxyState).selectedGenreId).toBeNull();
  });

  it('defaults to showing all relationship layers', () => {
    expect(initialGalaxyState.activeLayer).toBe('all');
  });

  it('switches between genre mode and scene mode', () => {
    const sceneState = selectSceneMode(initialGalaxyState, 'scene');
    expect(sceneState.viewMode).toBe('scene');
    expect(sceneState.selectedGenreId).toBeNull();
    expect(sceneState.selectedSceneNodeId).toBe('detroit');

    const genreState = selectSceneMode(sceneState, 'genre');
    expect(genreState.viewMode).toBe('genre');
    expect(genreState.selectedGenreId).toBe('detroit-techno');
    expect(genreState.selectedSceneNodeId).toBeNull();
  });

  it('selects a scene node', () => {
    const state = selectSceneNode(selectSceneMode(initialGalaxyState, 'scene'), 'tresor');
    expect(state.viewMode).toBe('scene');
    expect(state.selectedSceneNodeId).toBe('tresor');
    expect(state.selectedGenreId).toBeNull();
  });

  it('starts and stops tracks', () => {
    const playing = startTrack(initialGalaxyState, 'detroit-techno-pulse-a');
    expect(playing.currentTrackId).toBe('detroit-techno-pulse-a');
    expect(playing.isPlaying).toBe(true);
    expect(stopTrack(playing).isPlaying).toBe(false);
  });

  it('handles reducer actions', () => {
    const state = galaxyReducer(initialGalaxyState, { type: 'selectGenre', genreId: 'acid-techno' });
    expect(state.selectedGenreId).toBe('acid-techno');
    expect(galaxyReducer(state, { type: 'clearSelectedGenre' }).selectedGenreId).toBeNull();
    expect(galaxyReducer(state, { type: 'selectViewMode', viewMode: 'scene' }).viewMode).toBe('scene');
  });
});
