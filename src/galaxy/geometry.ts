import type { Vector3Tuple } from '../data/genreTypes';

export function distance(a: Vector3Tuple, b: Vector3Tuple): number {
  const dx = a[0] - b[0];
  const dy = a[1] - b[1];
  const dz = a[2] - b[2];
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

export function midpoint(a: Vector3Tuple, b: Vector3Tuple): Vector3Tuple {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
}

export function cameraTargetFor(position: Vector3Tuple): Vector3Tuple {
  return [position[0] + 1.8, position[1] + 1.2, position[2] + 3.8];
}

export function curvePoints(source: Vector3Tuple, target: Vector3Tuple, lift: number): Vector3Tuple[] {
  const mid = midpoint(source, target);
  return [source, [mid[0], mid[1] + lift, mid[2]], target];
}
