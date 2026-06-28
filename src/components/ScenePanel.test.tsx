import { render, screen } from '@testing-library/react';
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
  });
});
