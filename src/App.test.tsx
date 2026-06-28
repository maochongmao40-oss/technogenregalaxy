import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./galaxy/GenreGalaxy', () => ({
  GenreGalaxy: () => <div data-testid="genre-galaxy" />,
}));

describe('App', () => {
  it('hides the selected genre panel when the all tracks panel opens', async () => {
    render(<App />);

    expect(screen.getByRole('complementary', { name: 'Detroit Techno details' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'All Tracks' }));

    expect(screen.getByRole('complementary', { name: 'All tracks' })).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: 'Detroit Techno details' })).not.toBeInTheDocument();
  });
});
