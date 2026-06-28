import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { getSceneNodeById } from '../data/sceneData';
import { ScenePanel } from './ScenePanel';

describe('ScenePanel', () => {
  it('renders cultural context, related entities, and platform links for a scene node', () => {
    render(<ScenePanel node={getSceneNodeById('detroit')} dispatch={vi.fn()} />);

    expect(screen.getByRole('complementary', { name: 'Detroit scene details' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Detroit' })).toBeInTheDocument();
    expect(screen.getByText(/machine-soul origin point/i)).toBeInTheDocument();
    expect(screen.getByText(/Underground Resistance/i)).toBeInTheDocument();
    expect(screen.getByText(/Juan Atkins/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /spotify platform/i })).toHaveAttribute('href', expect.stringContaining('spotify'));
    expect(screen.getByRole('link', { name: /youtube platform/i })).toHaveAttribute('href', expect.stringContaining('youtube'));
    expect(screen.getByRole('link', { name: /spotify platform/i })).toHaveClass('provider-link--spotify');
    expect(screen.getByRole('link', { name: /youtube platform/i })).toHaveClass('provider-link--youtube');
  });

  it('can be dragged by its handle like a genre card', () => {
    render(<ScenePanel node={getSceneNodeById('detroit')} dispatch={vi.fn()} />);

    const panel = screen.getByRole('complementary', { name: 'Detroit scene details' });
    const handle = screen.getByTestId('scene-panel-drag-handle');

    fireEvent(handle, Object.assign(new Event('pointerdown', { bubbles: true }), { pointerId: 1, clientX: 100, clientY: 120 }));
    act(() => {
      window.dispatchEvent(Object.assign(new Event('pointermove'), { clientX: 148, clientY: 154 }));
    });
    fireEvent.pointerUp(window);

    expect(panel).toHaveStyle({ transform: 'translate3d(48px, 34px, 0)' });
  });
});
