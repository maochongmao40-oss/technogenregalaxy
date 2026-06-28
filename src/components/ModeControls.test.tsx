import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ModeControls } from './ModeControls';

describe('ModeControls', () => {
  it('switches between genre mode and scene mode', async () => {
    const onChange = vi.fn();
    render(<ModeControls activeMode="genre" onChange={onChange} />);

    expect(screen.getByRole('button', { name: 'Genre Mode' })).toHaveClass('is-active');
    await userEvent.click(screen.getByRole('button', { name: 'Scene Mode' }));

    expect(onChange).toHaveBeenCalledWith('scene');
  });
});
