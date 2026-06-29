import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';

vi.mock('./galaxy/GenreGalaxy', () => ({
  GenreGalaxy: () => <div data-testid="genre-galaxy" />,
}));

vi.mock('./galaxy/SceneGalaxy', () => ({
  SceneGalaxy: () => <div data-testid="scene-galaxy" />,
}));

describe('App', () => {
  it('hides the selected genre panel when the all tracks panel opens', () => {
    render(<App />);

    expect(screen.getByRole('complementary', { name: 'Detroit Techno details' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'All Tracks' }));

    expect(screen.getByRole('complementary', { name: 'All tracks' })).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: 'Detroit Techno details' })).not.toBeInTheDocument();
  });

  it('switches to scene mode and shows a cultural scene card', () => {
    render(<App />);

    expect(screen.getByTestId('genre-galaxy')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Scene Mode' }));

    expect(screen.getByTestId('scene-galaxy')).toBeInTheDocument();
    expect(screen.getByRole('complementary', { name: 'Detroit scene details' })).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: 'Detroit Techno details' })).not.toBeInTheDocument();
  });

  it('hides the selected scene card when the all tracks panel opens', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'Scene Mode' }));
    expect(screen.getByRole('complementary', { name: 'Detroit scene details' })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'All Tracks' }));

    expect(screen.getByRole('complementary', { name: 'All tracks' })).toBeInTheDocument();
    expect(screen.queryByRole('complementary', { name: 'Detroit scene details' })).not.toBeInTheDocument();
  });

  it('opens the UnknownCrystal contact card from the project capsule', () => {
    render(<App />);

    fireEvent.click(screen.getByRole('button', { name: 'A project by UnknownCrystal' }));

    expect(screen.getByRole('complementary', { name: 'Contact UnknownCrystal' })).toBeInTheDocument();
    expect(screen.getByText('UnknownCrystal')).toHaveClass('contact-capsule-name');
    expect(screen.getByText('Shanghai,CN')).toHaveClass('contact-capsule');
    expect(screen.getByText('email:maoson888@outlook.com')).toHaveClass('contact-capsule');
    expect(screen.queryByRole('link', { name: /Explore more of my projects/i })).not.toBeInTheDocument();
  });
});
