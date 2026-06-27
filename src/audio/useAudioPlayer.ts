import { useEffect, useRef, useState } from 'react';
import type { Track } from '../data/genreTypes';

interface AudioPlayerState {
  canPlay: boolean;
  error: string | null;
  progress: number;
  duration: number;
}

export function useAudioPlayer(track: Track | null, isPlaying: boolean): AudioPlayerState {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [state, setState] = useState<AudioPlayerState>({
    canPlay: false,
    error: null,
    progress: 0,
    duration: 0,
  });

  useEffect(() => {
    if (!track) {
      audioRef.current?.pause();
      audioRef.current = null;
      setState({ canPlay: false, error: null, progress: 0, duration: 0 });
      return;
    }

    if (track.playbackStatus === 'reserved') {
      audioRef.current?.pause();
      audioRef.current = null;
      setState({ canPlay: false, error: 'Audio slot reserved', progress: 0, duration: 0 });
      return;
    }

    const audio = new Audio(track.audioSrc);
    audioRef.current = audio;
    setState({ canPlay: true, error: null, progress: 0, duration: 0 });

    const onTime = () => {
      setState((current) => ({
        ...current,
        progress: audio.currentTime,
        duration: Number.isFinite(audio.duration) ? audio.duration : 0,
      }));
    };
    const onError = () => setState((current) => ({ ...current, canPlay: false, error: 'Audio unavailable' }));

    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onTime);
    audio.addEventListener('error', onError);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onTime);
      audio.removeEventListener('error', onError);
    };
  }, [track]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      const playResult = audio.play();
      if (playResult && typeof playResult.catch === 'function') {
        void playResult.catch(() => setState((current) => ({ ...current, error: 'Tap play to start audio' })));
      }
    } else {
      audio.pause();
    }
  }, [isPlaying, track]);

  return state;
}
