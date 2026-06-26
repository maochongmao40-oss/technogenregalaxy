import { describe, expect, it } from 'vitest';
import {
  genres,
  getGenreById,
  getRelationshipsForGenre,
  getTracksForGenre,
  relationshipLayers,
  relationships,
  tracks,
} from './genreData';

describe('genre dataset', () => {
  it('contains the required relationship layers', () => {
    expect(relationshipLayers.map((layer) => layer.id)).toEqual(['history', 'sound', 'scene']);
  });

  it('contains the first-version genre set', () => {
    expect(genres).toHaveLength(24);
    expect(getGenreById('detroit-techno')?.name).toBe('Detroit Techno');
    expect(getGenreById('uk-garage')?.name).toBe('UK Garage');
  });

  it('has at least two tracks per genre', () => {
    for (const genre of genres) {
      expect(getTracksForGenre(genre.id).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('only references existing genres and tracks', () => {
    const genreIds = new Set(genres.map((genre) => genre.id));
    for (const relationship of relationships) {
      expect(genreIds.has(relationship.source)).toBe(true);
      expect(genreIds.has(relationship.target)).toBe(true);
      expect(['history', 'sound', 'scene']).toContain(relationship.type);
    }
    for (const track of tracks) {
      expect(genreIds.has(track.genreId)).toBe(true);
      expect(track.audioSrc).toMatch(/^\/audio\/placeholder-/);
    }
  });

  it('returns layer-specific relationships for a genre', () => {
    const history = getRelationshipsForGenre('detroit-techno', 'history');
    expect(history.length).toBeGreaterThan(0);
    expect(history.every((relationship) => relationship.type === 'history')).toBe(true);
  });
});
