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
  const reserved = track.playbackStatus === 'reserved';

  return (
    <footer className="audio-player" aria-label="Audio player">
      <div>
        <strong>{track.title}</strong>
        <span>
          {track.artist} / {track.duration} / {track.sourceKind}
        </span>
        {reserved ? <span role="status">Reserved for future audio</span> : null}
        {!reserved && audio.error ? <span role="status">{audio.error}</span> : null}
      </div>
      <button
        type="button"
        disabled={reserved || !audio.canPlay}
        onClick={() => {
          if (reserved) return;
          if (state.isPlaying) {
            dispatch({ type: 'stopTrack' });
          } else {
            dispatch({ type: 'startTrack', trackId: track.id });
          }
        }}
      >
        {reserved ? 'Reserved' : state.isPlaying ? 'Pause' : 'Play'}
      </button>
    </footer>
  );
}
