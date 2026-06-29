import type { Dispatch } from 'react';
import { getGenreById, getRelationshipsForGenre, getTracksForGenre } from '../data/genreData';
import type { Genre } from '../data/genreTypes';
import type { GalaxyAction } from '../state/galaxyState';
import { useDraggablePanel } from './useDraggablePanel';

interface GenrePanelProps {
  genre: Genre | undefined;
  dispatch: Dispatch<GalaxyAction>;
}

export function GenrePanel({ genre, dispatch }: GenrePanelProps) {
  const { panelStyle, startDrag } = useDraggablePanel();

  if (!genre) return null;

  const tracks = getTracksForGenre(genre.id);
  const related = getRelationshipsForGenre(genre.id).slice(0, 6);

  return (
    <aside
      className="genre-panel"
      aria-label={`${genre.name} details`}
      style={panelStyle}
    >
      <div className="panel-drag-handle" onPointerDown={startDrag}>
        <p className="panel-kicker">
          {genre.era} / {genre.regions.join(', ')}
        </p>
      </div>
      <h1>{genre.name}</h1>
      <p className="summary">{genre.summary}</p>
      <ul className="keyword-list" aria-label="Sound keywords">
        {genre.soundKeywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
      <section>
        <h2>Tracks</h2>
        <div className="track-list">
          {tracks.map((track) => {
            const playable = track.playbackStatus === 'ready';
            const reserved = track.playbackStatus === 'reserved';
            const platformOptions = track.playbackOptions?.filter((option) => option.group === 'platform-embed') ?? [];
            return (
              <article key={track.id} className={`track-card${track.canonical ? ' is-canonical' : ''}`}>
                <button
                  type="button"
                  className="track-button"
                  disabled={!playable}
                  onClick={() => {
                    if (playable) dispatch({ type: 'startTrack', trackId: track.id });
                  }}
                >
                  <span>
                    {track.canonical ? 'Classic ' : reserved ? 'Reserved ' : 'Play '}
                    {track.title}
                  </span>
                  <small>
                    {track.artist} / {track.duration} / {track.sourceKind}
                  </small>
                </button>
                {platformOptions.length > 0 ? (
                  <div className="playback-options" aria-label={`${track.title} platform links`}>
                    {platformOptions.map((option) => (
                      <a
                        key={option.provider}
                        className={`provider-link provider-link--${option.provider}`}
                        href={option.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {option.label.replace(' embed', '')}
                        <small>platform</small>
                      </a>
                    ))}
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </section>
      <section>
        <h2>Related</h2>
        <div className="related-list">
          {related.map((relationship) => {
            const otherId = relationship.source === genre.id ? relationship.target : relationship.source;
            const other = getGenreById(otherId);
            if (!other) return null;
            return (
              <button
                key={relationship.id}
                type="button"
                onClick={() => dispatch({ type: 'selectGenre', genreId: other.id })}
              >
                Jump to {other.name}
              </button>
            );
          })}
        </div>
      </section>
    </aside>
  );

}
