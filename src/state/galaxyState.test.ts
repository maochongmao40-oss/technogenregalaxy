import { describe, expect, it } from 'vitest';
import {
  galaxyReducer,
  initialGalaxyState,
  selectGenre,
  selectLayer,
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
  });
});
