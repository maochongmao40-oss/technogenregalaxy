import { describe, expect, it } from 'vitest';
import { cameraTargetFor, curvePoints, distance, midpoint, relationshipCurvePoints } from './geometry';

describe('geometry helpers', () => {
  it('computes distance and midpoint', () => {
    expect(distance([0, 0, 0], [3, 4, 0])).toBe(5);
    expect(midpoint([0, 0, 0], [2, 4, 6])).toEqual([1, 2, 3]);
  });

  it('creates a camera target offset from the genre position', () => {
    expect(cameraTargetFor([1, 2, 3])).toEqual([1.75, 2.45, 7.25]);
  });

  it('creates three curve points with lifted midpoint', () => {
    expect(curvePoints([0, 0, 0], [2, 0, 0], 1)).toEqual([
      [0, 0, 0],
      [1, 1, 0],
      [2, 0, 0],
    ]);
  });

  it('creates semantic curves with multiple sampled points', () => {
    const history = relationshipCurvePoints([0, 0, 0], [2, 0, 0], 'history', 5);
    const sound = relationshipCurvePoints([0, 0, 0], [2, 0, 0], 'sound', 5);
    const scene = relationshipCurvePoints([0, 0, 0], [2, 0, 0], 'scene', 5);

    expect(history.length).toBeGreaterThan(10);
    expect(sound.length).toBeGreaterThan(10);
    expect(scene.length).toBeGreaterThan(history.length);
    expect(history[10][1]).toBeGreaterThan(0);
    expect(sound[10][1]).toBeLessThan(0);
  });
});
