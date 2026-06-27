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
    expect(genres).toHaveLength(32);
    expect(getGenreById('detroit-techno')?.name).toBe('Detroit Techno');
    expect(getGenreById('uk-garage')?.name).toBe('UK Garage');
  });

  it('adds deeper subgenre nodes with graph relationships', () => {
    const subgenreIds = [
      'microhouse',
      'rominimal',
      'hypnotic-techno',
      'peak-time-techno',
      'hardgroove',
      'birmingham-techno',
      'ghettotech',
      'future-garage',
    ];

    for (const genreId of subgenreIds) {
      expect(getGenreById(genreId)).toBeDefined();
      expect(getRelationshipsForGenre(genreId).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('has at least two tracks per genre', () => {
    for (const genre of genres) {
      expect(getTracksForGenre(genre.id).length).toBeGreaterThanOrEqual(2);
    }
  });

  it('provides a canonical real-track candidate with platform and free-audio playback options for each genre', () => {
    for (const genre of genres) {
      const canonical = getTracksForGenre(genre.id).filter((track) => track.canonical);
      expect(canonical).toHaveLength(1);
      expect(canonical[0].playbackStatus).toBe('metadata-only');
      expect(canonical[0].sourceKind).toBe('curated-reference');
      expect(canonical[0].playbackOptions?.some((option) => option.group === 'platform-embed')).toBe(true);
      expect(canonical[0].playbackOptions?.some((option) => option.group === 'free-audio')).toBe(true);
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
      expect(['placeholder', 'local-file', 'external-url', 'curated-reference']).toContain(track.sourceKind);
      expect(['ready', 'reserved', 'metadata-only']).toContain(track.playbackStatus);
      if (track.playbackStatus === 'ready') {
        expect(track.audioSrc).toMatch(/^\/audio\/placeholder-/);
      }
    }
  });

  it('reserves a future audio slot for each genre', () => {
    for (const genre of genres) {
      const reserved = getTracksForGenre(genre.id).filter((track) => track.playbackStatus === 'reserved');
      expect(reserved).toHaveLength(1);
      expect(reserved[0].sourceKind).toBe('local-file');
      expect(reserved[0].audioSrc).toBe(`/audio/future/${genre.id}.mp3`);
    }
  });

  it('returns layer-specific relationships for a genre', () => {
    const history = getRelationshipsForGenre('detroit-techno', 'history');
    expect(history.length).toBeGreaterThan(0);
    expect(history.every((relationship) => relationship.type === 'history')).toBe(true);
  });
});
