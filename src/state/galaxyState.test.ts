import { describe, expect, it } from 'vitest';
import {
  galaxyReducer,
  initialGalaxyState,
  selectGenre,
  selectLayer,
  startTrack,
  stopTrack,
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

  it('starts and stops tracks', () => {
    const playing = startTrack(initialGalaxyState, 'detroit-techno-pulse-a');
    expect(playing.currentTrackId).toBe('detroit-techno-pulse-a');
    expect(playing.isPlaying).toBe(true);
    expect(stopTrack(playing).isPlaying).toBe(false);
  });

  it('handles reducer actions', () => {
    const state = galaxyReducer(initialGalaxyState, { type: 'selectGenre', genreId: 'acid-techno' });
    expect(state.selectedGenreId).toBe('acid-techno');
  });
});
