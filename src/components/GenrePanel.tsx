import type { Dispatch } from 'react';
import { getGenreById, getRelationshipsForGenre, getTracksForGenre } from '../data/genreData';
import type { Genre } from '../data/genreTypes';
import type { GalaxyAction } from '../state/galaxyState';

interface GenrePanelProps {
  genre: Genre | undefined;
  dispatch: Dispatch<GalaxyAction>;
}

export function GenrePanel({ genre, dispatch }: GenrePanelProps) {
  if (!genre) return null;

  const tracks = getTracksForGenre(genre.id);
  const related = getRelationshipsForGenre(genre.id).slice(0, 6);

  return (
    <aside className="genre-panel" aria-label={`${genre.name} details`}>
      <p className="panel-kicker">
        {genre.era} / {genre.regions.join(', ')}
      </p>
      <h1>{genre.name}</h1>
      <p className="summary">{genre.summary}</p>
      <ul className="keyword-list" aria-label="Sound keywords">
        {genre.soundKeywords.map((keyword) => (
          <li key={keyword}>{keyword}</li>
        ))}
      </ul>
      <section>
        <h2>Signals</h2>
        <div className="track-list">
          {tracks.map((track) => (
            <button
              key={track.id}
              type="button"
              className="track-button"
              onClick={() => dispatch({ type: 'startTrack', trackId: track.id })}
            >
              <span>Play {track.title}</span>
              <small>
                {track.artist} / {track.year}
              </small>
            </button>
          ))}
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
