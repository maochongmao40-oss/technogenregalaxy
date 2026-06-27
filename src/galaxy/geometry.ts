import type { RelationshipLayerType, Vector3Tuple } from '../data/genreTypes';

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
  return [position[0] + 0.75, position[1] + 0.45, position[2] + 4.25];
}

export function curvePoints(source: Vector3Tuple, target: Vector3Tuple, lift: number): Vector3Tuple[] {
  const mid = midpoint(source, target);
  return [source, [mid[0], mid[1] + lift, mid[2]], target];
}

export function relationshipCurvePoints(
  source: Vector3Tuple,
  target: Vector3Tuple,
  type: RelationshipLayerType,
  strength: number,
): Vector3Tuple[] {
  const dx = target[0] - source[0];
  const dy = target[1] - source[1];
  const length = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
  const normal: Vector3Tuple = [-dy / length, dx / length, 0];
  const bend = (0.18 + strength * 0.08) * (type === 'sound' ? -1 : 1);
  const lift = type === 'history' ? 0.18 + strength * 0.035 : type === 'scene' ? 0.08 : 0.02;

  if (type === 'scene') {
    const controlA: Vector3Tuple = [
      source[0] + dx * 0.3 + normal[0] * bend,
      source[1] + dy * 0.3 + normal[1] * bend,
      source[2] + lift,
    ];
    const controlB: Vector3Tuple = [
      source[0] + dx * 0.7 - normal[0] * bend,
      source[1] + dy * 0.7 - normal[1] * bend,
      target[2] + lift,
    ];
    return cubicBezierPoints(source, controlA, controlB, target, 22);
  }

  const control: Vector3Tuple = [
    source[0] + dx * 0.5 + normal[0] * bend,
    source[1] + dy * 0.5 + normal[1] * bend,
    (source[2] + target[2]) / 2 + lift,
  ];
  return quadraticBezierPoints(source, control, target, 20);
}

function quadraticBezierPoints(
  start: Vector3Tuple,
  control: Vector3Tuple,
  end: Vector3Tuple,
  segments: number,
): Vector3Tuple[] {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const t = index / segments;
    const oneMinusT = 1 - t;
    return [
      oneMinusT * oneMinusT * start[0] + 2 * oneMinusT * t * control[0] + t * t * end[0],
      oneMinusT * oneMinusT * start[1] + 2 * oneMinusT * t * control[1] + t * t * end[1],
      oneMinusT * oneMinusT * start[2] + 2 * oneMinusT * t * control[2] + t * t * end[2],
    ];
  });
}

function cubicBezierPoints(
  start: Vector3Tuple,
  controlA: Vector3Tuple,
  controlB: Vector3Tuple,
  end: Vector3Tuple,
  segments: number,
): Vector3Tuple[] {
  return Array.from({ length: segments + 1 }, (_, index) => {
    const t = index / segments;
    const oneMinusT = 1 - t;
    return [
      oneMinusT ** 3 * start[0] + 3 * oneMinusT ** 2 * t * controlA[0] + 3 * oneMinusT * t * t * controlB[0] + t ** 3 * end[0],
      oneMinusT ** 3 * start[1] + 3 * oneMinusT ** 2 * t * controlA[1] + 3 * oneMinusT * t * t * controlB[1] + t ** 3 * end[1],
      oneMinusT ** 3 * start[2] + 3 * oneMinusT ** 2 * t * controlA[2] + 3 * oneMinusT * t * t * controlB[2] + t ** 3 * end[2],
    ];
  });
}
