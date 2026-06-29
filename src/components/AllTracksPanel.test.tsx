import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { AllTracksPanel } from './AllTracksPanel';

describe('AllTracksPanel', () => {
  it('opens the full track list with playback URLs and authorization labels', () => {
    const dispatch = vi.fn();
    const onToggle = vi.fn();

    render(<AllTracksPanel open onToggle={onToggle} dispatch={dispatch} />);

    expect(screen.getByRole('complementary', { name: 'All tracks' })).toBeInTheDocument();
    expect(screen.getByText('Strings of Life')).toBeInTheDocument();
    expect(screen.getByText('No UFOs')).toBeInTheDocument();
    expect(screen.getByText('Clear')).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /spotify platform/i })[0]).toHaveAttribute(
      'href',
      expect.stringContaining('spotify'),
    );
    expect(screen.getAllByRole('link', { name: /spotify platform/i })[0]).toHaveClass('provider-link--spotify');
    expect(screen.getAllByRole('link', { name: /youtube platform/i })[0]).toHaveAttribute(
      'href',
      expect.stringContaining('youtube'),
    );
    expect(screen.getAllByRole('link', { name: /youtube platform/i })[0]).toHaveClass('provider-link--youtube');
    expect(screen.queryByRole('link', { name: /internet archive/i })).not.toBeInTheDocument();

    expect(screen.queryByText(/signal/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/reserved/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Play' })).not.toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();
  });

  it('renders only the top button when closed', () => {
    render(<AllTracksPanel open={false} onToggle={vi.fn()} dispatch={vi.fn()} />);

    expect(screen.getByRole('button', { name: 'All Tracks' })).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: 'All tracks' })).not.toBeInTheDocument();
  });
});
