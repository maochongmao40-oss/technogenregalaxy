import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { getGenreById } from '../data/genreData';
import { GenrePanel } from './GenrePanel';

describe('GenrePanel', () => {
  it('renders selected genre and dispatches related jumps and track starts', async () => {
    const dispatch = vi.fn();
    render(<GenrePanel genre={getGenreById('detroit-techno')} dispatch={dispatch} />);

    expect(screen.getByRole('heading', { name: 'Detroit Techno' })).toBeInTheDocument();
    await userEvent.click(screen.getAllByRole('button', { name: /play/i })[0]);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'startTrack' }));

    await userEvent.click(screen.getAllByRole('button', { name: /jump to/i })[0]);
    expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({ type: 'selectGenre' }));
  });
});
