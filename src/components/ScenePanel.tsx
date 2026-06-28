import type { Dispatch } from 'react';
import type { SceneNode } from '../data/sceneTypes';
import type { GalaxyAction } from '../state/galaxyState';
import { useDraggablePanel } from './useDraggablePanel';

interface ScenePanelProps {
  node: SceneNode | undefined;
  dispatch: Dispatch<GalaxyAction>;
}

export function ScenePanel({ node, dispatch }: ScenePanelProps) {
  const { panelStyle, startDrag } = useDraggablePanel();

  if (!node) return null;

  return (
    <aside className="genre-panel scene-panel" aria-label={`${node.name} scene details`} style={panelStyle}>
      <div className="panel-drag-handle" data-testid="scene-panel-drag-handle" onPointerDown={startDrag}>
        <p className="panel-kicker">
          {node.type} / {node.era} / {node.region}
        </p>
      </div>
      <h1>{node.name}</h1>
      <p className="summary">{node.summary}</p>
      <section>
        <h2>Historical Role</h2>
        <p>{node.historicalRole}</p>
      </section>
      <section>
        <h2>Sound Signature</h2>
        <ul className="keyword-list" aria-label="Sound signature">
          {node.soundSignature.map((keyword) => (
            <li key={keyword}>{keyword}</li>
          ))}
        </ul>
      </section>
      <SceneList title="Key Places / Labels" items={node.keyPlaces} />
      <SceneList title="Key Artists" items={node.keyArtists} />
      <SceneList title="Related Genres" items={node.relatedGenres} />
      <section>
        <h2>Listen / Search</h2>
        <div className="playback-options" aria-label={`${node.name} platform links`}>
          {node.links.map((link) => (
            <a
              key={link.provider}
              className={`provider-link provider-link--${link.provider}`}
              href={link.url}
              target="_blank"
              rel="noreferrer"
            >
              {link.label.replace(' embed', '')}
              <small>platform</small>
            </a>
          ))}
        </div>
      </section>
      <button type="button" className="scene-panel-clear" onClick={() => dispatch({ type: 'selectViewMode', viewMode: 'genre' })}>
        Back to Genre Mode
      </button>
    </aside>
  );
}

function SceneList({ title, items }: { title: string; items: string[] }) {
  if (items.length === 0) return null;
  return (
    <section>
      <h2>{title}</h2>
      <div className="scene-chip-list">
        {items.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </section>
  );
}
