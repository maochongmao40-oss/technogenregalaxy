export type TrackpadWheelIntent = 'pan' | 'zoom';

export interface TrackpadWheelLike {
  ctrlKey: boolean;
  metaKey: boolean;
}

const minZoomDistance = 2.1;
const maxZoomDistance = 14;
const zoomSpeed = 0.0018;

export function trackpadWheelIntent(event: TrackpadWheelLike): TrackpadWheelIntent {
  return event.ctrlKey || event.metaKey ? 'zoom' : 'pan';
}

export function nextZoomDistance(currentDistance: number, deltaY: number): number {
  return clamp(currentDistance * Math.exp(deltaY * zoomSpeed), minZoomDistance, maxZoomDistance);
}

export function smoothZoomDistance(currentDistance: number, targetDistance: number, deltaSeconds: number): number {
  const amount = 1 - Math.exp(-14 * deltaSeconds);
  return currentDistance + (targetDistance - currentDistance) * amount;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
