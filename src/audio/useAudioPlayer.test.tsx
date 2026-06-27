import { renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { Track } from '../data/genreTypes';
import { useAudioPlayer } from './useAudioPlayer';

const demoTrack: Track = {
  id: 'demo',
  title: 'Demo',
  artist: 'Prototype Archive',
  year: 1999,
  duration: '0:30',
  genreId: 'detroit-techno',
  audioSrc: '/audio/placeholder-1.mp3',
  sourceKind: 'placeholder',
  playbackStatus: 'ready',
  note: 'Test track',
};

const reservedTrack: Track = {
  ...demoTrack,
  id: 'reserved-demo',
  audioSrc: '/audio/future/detroit-techno.mp3',
  sourceKind: 'local-file',
  playbackStatus: 'reserved',
};

describe('useAudioPlayer', () => {
  beforeEach(() => {
    class MockAudio extends EventTarget {
      currentTime = 0;
      duration = 30;
      src: string;

      constructor(src: string) {
        super();
        this.src = src;
      }

      play = vi.fn().mockResolvedValue(undefined);
      pause = vi.fn();
    }

    vi.stubGlobal('Audio', MockAudio);
  });

  it('reports unavailable when no track exists', () => {
    const { result } = renderHook(() => useAudioPlayer(null, false));
    expect(result.current.canPlay).toBe(false);
    expect(result.current.progress).toBe(0);
  });

  it('creates a playable state for a track after user-driven playback state is true', () => {
    const { result } = renderHook(() => useAudioPlayer(demoTrack, true));
    expect(result.current.canPlay).toBe(true);
  });

  it('keeps reserved future audio slots unavailable until a real file is added', () => {
    const { result } = renderHook(() => useAudioPlayer(reservedTrack, true));
    expect(result.current.canPlay).toBe(false);
    expect(result.current.error).toBe('Audio slot reserved');
  });
});
