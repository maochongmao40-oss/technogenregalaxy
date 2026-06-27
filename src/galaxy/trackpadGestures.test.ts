import { describe, expect, it } from 'vitest';
import { nextZoomDistance, smoothZoomDistance, trackpadWheelIntent } from './trackpadGestures';

describe('trackpad gesture mapping', () => {
  it('maps pinch-style wheel events to zoom', () => {
    expect(trackpadWheelIntent({ ctrlKey: true, metaKey: false })).toBe('zoom');
    expect(trackpadWheelIntent({ ctrlKey: false, metaKey: true })).toBe('zoom');
  });

  it('maps ordinary two-finger wheel movement to canvas panning', () => {
    expect(trackpadWheelIntent({ ctrlKey: false, metaKey: false })).toBe('pan');
  });

  it('converts pinch deltas into bounded zoom targets', () => {
    expect(nextZoomDistance(7, -120)).toBeLessThan(7);
    expect(nextZoomDistance(7, 120)).toBeGreaterThan(7);
    expect(nextZoomDistance(2.1, -10000)).toBe(2.1);
    expect(nextZoomDistance(14, 10000)).toBe(14);
  });

  it('smoothly approaches the zoom target without jumping in one frame', () => {
    const next = smoothZoomDistance(7, 3, 1 / 60);

    expect(next).toBeLessThan(7);
    expect(next).toBeGreaterThan(3);
  });
});
