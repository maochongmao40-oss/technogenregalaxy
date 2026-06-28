import type { GalaxyViewMode } from '../state/galaxyState';

interface ModeControlsProps {
  activeMode: GalaxyViewMode;
  onChange: (mode: GalaxyViewMode) => void;
}

export function ModeControls({ activeMode, onChange }: ModeControlsProps) {
  return (
    <nav className="mode-controls" aria-label="Galaxy view mode">
      {(['genre', 'scene'] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          className={activeMode === mode ? 'is-active' : ''}
          aria-pressed={activeMode === mode}
          onClick={() => onChange(mode)}
        >
          {mode === 'genre' ? 'Genre Mode' : 'Scene Mode'}
        </button>
      ))}
    </nav>
  );
}
