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
    expect(relationshipLayers.map((layer) => layer.id)).toEqual(['all', 'history', 'sound', 'scene']);
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

  it('uses only the purple, blue, and pink atom color system', () => {
    const allowedColors = new Set([
      '#4f46e5',
      '#6366f1',
      '#7c3aed',
      '#8b5cf6',
      '#a855f7',
      '#c084fc',
      '#d946ef',
      '#ec4899',
      '#f472b6',
      '#0ea5e9',
      '#38bdf8',
      '#60a5fa',
      '#93c5fd',
      '#22d3ee',
    ]);

    for (const genre of genres) {
      expect(allowedColors.has(genre.visualProfile.color)).toBe(true);
      expect(allowedColors.has(genre.visualProfile.accent)).toBe(true);
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
