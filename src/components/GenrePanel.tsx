import { useRef, useState, type Dispatch, type PointerEvent } from 'react';
import { getGenreById, getRelationshipsForGenre, getTracksForGenre } from '../data/genreData';
import type { Genre } from '../data/genreTypes';
import type { GalaxyAction } from '../state/galaxyState';

interface GenrePanelProps {
  genre: Genre | undefined;
  dispatch: Dispatch<GalaxyAction>;
}

export function GenrePanel({ genre, dispatch }: GenrePanelProps) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  if (!genre) return null;

  const tracks = getTracksForGenre(genre.id);
  const related = getRelationshipsForGenre(genre.id).slice(0, 6);

  return (
    <aside
      className="genre-panel"
      aria-label={`${genre.name} details`}
      style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
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
        <h2>Signals</h2>
        <div className="track-list">
          {tracks.map((track) => {
            const playable = track.playbackStatus === 'ready';
            const reserved = track.playbackStatus === 'reserved';
            const platformOptions = track.playbackOptions?.filter((option) => option.group === 'platform-embed') ?? [];
            return (
              <button
                key={track.id}
                type="button"
                className={`track-button${track.canonical ? ' is-canonical' : ''}`}
                disabled={!playable}
                onClick={() => {
                  if (playable) dispatch({ type: 'startTrack', trackId: track.id });
                }}
              >
                <span>{track.canonical ? 'Classic ' : reserved ? 'Reserved ' : 'Play '}{track.title}</span>
                <small>
                  {track.artist} / {track.duration} / {track.sourceKind}
                </small>
                {track.canonical ? (
                  <span className="playback-options">
                    <span>Embed: {platformOptions.map((option) => option.label.replace(' embed', '')).join(', ')}</span>
                  </span>
                ) : null}
              </button>
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

  function startDrag(event: PointerEvent<HTMLDivElement>) {
    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
    const move = (moveEvent: globalThis.PointerEvent) => {
      if (!dragRef.current.dragging) return;
      setOffset({
        x: clamp(dragRef.current.originX + moveEvent.clientX - dragRef.current.startX, -window.innerWidth + 120, window.innerWidth - 120),
        y: clamp(dragRef.current.originY + moveEvent.clientY - dragRef.current.startY, -window.innerHeight + 120, window.innerHeight - 120),
      });
    };
    const end = () => {
      dragRef.current.dragging = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
