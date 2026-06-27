import type { Dispatch } from 'react';
import { getGenreById, tracks } from '../data/genreData';
import type { GalaxyAction } from '../state/galaxyState';

interface AllTracksPanelProps {
  open: boolean;
  onToggle: () => void;
  dispatch: Dispatch<GalaxyAction>;
}

export function AllTracksPanel({ open, onToggle, dispatch }: AllTracksPanelProps) {
  return (
    <>
      <button type="button" className="all-tracks-toggle" onClick={onToggle}>
        {open ? 'Hide Tracks' : 'All Tracks'}
      </button>
      {open ? (
        <aside className="all-tracks-panel" aria-label="All tracks">
          <header>
            <h2>All Tracks</h2>
            <button type="button" onClick={onToggle}>
              Close
            </button>
          </header>
          <div className="all-tracks-list">
            {tracks.map((track) => {
              const genre = getGenreById(track.genreId);
              const playable = track.playbackStatus === 'ready';
              const platformOptions = track.playbackOptions?.filter((option) => option.group === 'platform-embed') ?? [];
              const freeOptions = track.playbackOptions?.filter((option) => option.group === 'free-audio') ?? [];

              return (
                <article key={track.id} className="all-track-row">
                  <div>
                    <strong>{track.title}</strong>
                    <span>
                      {track.artist} / {track.year} / {genre?.name ?? track.genreId}
                    </span>
                  </div>
                  <span className="track-status">{statusLabel(track.playbackStatus)}</span>
                  {playable ? (
                    <button type="button" onClick={() => dispatch({ type: 'startTrack', trackId: track.id })}>
                      Play
                    </button>
                  ) : null}
                  {track.canonical ? (
                    <div className="all-track-options">
                      <LinkGroup label="Embed" options={platformOptions} />
                      <LinkGroup label="Free audio" options={freeOptions} />
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </aside>
      ) : null}
    </>
  );
}

function LinkGroup({ label, options }: { label: string; options: NonNullable<(typeof tracks)[number]['playbackOptions']> }) {
  return (
    <div>
      <span>{label}</span>
      <div>
        {options.map((option) => (
          <a key={option.provider} href={option.url} target="_blank" rel="noreferrer">
            {option.label.replace(' embed', '').replace(' search', '')}
            <small>{authorizationLabel(option.authorization)}</small>
          </a>
        ))}
      </div>
    </div>
  );
}

function statusLabel(status: (typeof tracks)[number]['playbackStatus']): string {
  if (status === 'ready') return 'Playable';
  if (status === 'reserved') return 'Reserved';
  return 'Classic / URL review';
}

function authorizationLabel(authorization: NonNullable<(typeof tracks)[number]['playbackOptions']>[number]['authorization']): string {
  if (authorization === 'platform-managed') return 'platform';
  if (authorization === 'needs-license-review') return 'license review';
  return 'user supplied';
}
