import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { LayerControls } from './LayerControls';

describe('LayerControls', () => {
  it('labels the filter group as relationship controls', () => {
    render(<LayerControls activeLayer="all" onChange={vi.fn()} />);

    expect(screen.getByText('Relationship')).toBeInTheDocument();
    expect(screen.queryByText('RELATIONSHIP')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'All' })).toHaveAttribute('aria-pressed', 'true');
  });
});
