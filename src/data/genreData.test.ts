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

  it('has exactly three real reference tracks per genre', () => {
    for (const genre of genres) {
      const genreTracks = getTracksForGenre(genre.id);
      expect(genreTracks).toHaveLength(3);
      expect(genreTracks.every((track) => track.sourceKind === 'curated-reference')).toBe(true);
      expect(genreTracks.every((track) => track.playbackStatus === 'metadata-only')).toBe(true);
    }
  });

  it('provides Spotify and YouTube platform playback links for every track', () => {
    for (const track of tracks) {
      expect(track.playbackOptions?.map((option) => option.provider)).toEqual(['spotify', 'youtube']);
      for (const option of track.playbackOptions ?? []) {
        expect(option.group).toBe('platform-embed');
        expect(option.url).toMatch(/^https:\/\//);
        expect(option.authorization).toBe('platform-managed');
        expect(option.authorizationNote.length).toBeGreaterThan(12);
      }
    }
  });

  it('provides one canonical real-track candidate for each genre', () => {
    for (const genre of genres) {
      const canonical = getTracksForGenre(genre.id).filter((track) => track.canonical);
      expect(canonical).toHaveLength(1);
      expect(canonical[0].playbackStatus).toBe('metadata-only');
      expect(canonical[0].sourceKind).toBe('curated-reference');
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
      expect(track.sourceKind).toBe('curated-reference');
      expect(track.playbackStatus).toBe('metadata-only');
      expect(track.audioSrc).toBe('');
    }
  });

  it('removes prototype signals and future-reserved audio slots from the public track library', () => {
    expect(tracks.some((track) => /signal|prototype archive|reserved audio source/i.test(`${track.title} ${track.artist}`))).toBe(false);
    expect(tracks.some((track) => track.duration === '0:30' || track.duration === 'TBD')).toBe(false);
    expect(tracks.some((track) => track.sourceKind === 'placeholder' || track.sourceKind === 'local-file')).toBe(false);
  });

  it('returns layer-specific relationships for a genre', () => {
    const history = getRelationshipsForGenre('detroit-techno', 'history');
    expect(history.length).toBeGreaterThan(0);
    expect(history.every((relationship) => relationship.type === 'history')).toBe(true);
  });
});
