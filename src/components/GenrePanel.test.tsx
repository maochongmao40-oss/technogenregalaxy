import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { getGenreById } from '../data/genreData';
import { GenrePanel } from './GenrePanel';

describe('GenrePanel', () => {
  it('renders selected genre and dispatches related jumps and track starts', () => {
    const dispatch = vi.fn();
    render(<GenrePanel genre={getGenreById('detroit-techno')} dispatch={dispatch} />);

    expect(screen.getByRole('heading', { name: 'Detroit Techno' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /classic strings of life/i })).toBeDisabled();
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
    expect(screen.queryByText(/free audio/i)).not.toBeInTheDocument();

    fireEvent.click(screen.getAllByRole('button', { name: /play detroit techno signal/i })[0]);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'startTrack' }));
    expect(screen.getByRole('button', { name: /reserved/i })).toBeDisabled();

    fireEvent.click(screen.getAllByRole('button', { name: /jump to/i })[0]);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'selectGenre' }));
  });
});
