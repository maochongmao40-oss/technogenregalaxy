import type { Dispatch } from 'react';
import { useAudioPlayer } from '../audio/useAudioPlayer';
import { tracks } from '../data/genreData';
import type { GalaxyAction, GalaxyState } from '../state/galaxyState';

interface AudioPlayerProps {
  state: GalaxyState;
  dispatch: Dispatch<GalaxyAction>;
}

export function AudioPlayer({ state, dispatch }: AudioPlayerProps) {
  const track = tracks.find((item) => item.id === state.currentTrackId) ?? null;
  const audio = useAudioPlayer(track, state.isPlaying);
  if (!track) return null;

  return (
    <footer className="audio-player" aria-label="Audio player">
      <div>
        <strong>{track.title}</strong>
        <span>
          {track.artist} / {track.duration}
        </span>
        {audio.error ? <span role="status">{audio.error}</span> : null}
      </div>
      <button
        type="button"
        disabled={!audio.canPlay}
        onClick={() => {
          if (state.isPlaying) {
            dispatch({ type: 'stopTrack' });
          } else {
            dispatch({ type: 'startTrack', trackId: track.id });
          }
        }}
      >
        {state.isPlaying ? 'Pause' : 'Play'}
      </button>
    </footer>
  );
}
