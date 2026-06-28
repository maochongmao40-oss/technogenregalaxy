import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./galaxy/GenreGalaxy', () => ({
  GenreGalaxy: () => <div data-testid="genre-galaxy" />,
}));

vi.mock('./galaxy/SceneGalaxy', () => ({
  SceneGalaxy: () => <div data-testid="scene-galaxy" />,
}));

describe('App', () => {
  it('hides the selected genre panel when the all tracks panel opens', async () => {
    render(<App />);

    expect(screen.getByRole('complementary', { name: 'Detroit Techno details' })).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'All Tracks' }));

    expect(screen.getByRole('complementary', { name: 'All tracks' })).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: 'Detroit Techno details' })).not.toBeInTheDocument();
  });

  it('switches to scene mode and shows a cultural scene card', async () => {
    render(<App />);

    expect(screen.getByTestId('genre-galaxy')).toBeInTheDocument();

    await userEvent.click(screen.getByRole('button', { name: 'Scene Mode' }));

    expect(screen.getByTestId('scene-galaxy')).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Detroit scene details' })).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: 'Detroit Techno details' })).not.toBeInTheDocument();
  });
});
