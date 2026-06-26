import type { Dispatch } from 'react';
import { tracks } from '../data/genreData';
import type { GalaxyAction, GalaxyState } from '../state/galaxyState';

interface AudioPlayerProps {
  state: GalaxyState;
  dispatch: Dispatch<GalaxyAction>;
}

export function AudioPlayer({ state, dispatch }: AudioPlayerProps) {
  const track = tracks.find((item) => item.id === state.currentTrackId);
  if (!track) return null;

  return (
    <footer className="audio-player" aria-label="Audio player">
      <div>
        <strong>{track.title}</strong>
        <span>
          {track.artist} / {track.duration}
        </span>
      </div>
      <button
        type="button"
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
