import { describe, expect, it } from 'vitest';
import { cameraTargetFor, curvePoints, distance, midpoint } from './geometry';

describe('geometry helpers', () => {
  it('computes distance and midpoint', () => {
    expect(distance([0, 0, 0], [3, 4, 0])).toBe(5);
    expect(midpoint([0, 0, 0], [2, 4, 6])).toEqual([1, 2, 3]);
  });

  it('creates a camera target offset from the genre position', () => {
    expect(cameraTargetFor([1, 2, 3])).toEqual([2.8, 3.2, 6.8]);
  });

  it('creates three curve points with lifted midpoint', () => {
    expect(curvePoints([0, 0, 0], [2, 0, 0], 1)).toEqual([
      [0, 0, 0],
      [1, 1, 0],
      [2, 0, 0],
    ]);
  });
});
