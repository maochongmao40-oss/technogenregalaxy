import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, type MutableRefObject } from 'react';
import { Camera, MathUtils, PerspectiveCamera, Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { nextZoomDistance, smoothZoomDistance, trackpadWheelIntent } from './trackpadGestures';

interface TrackpadViewportControlsProps {
  controlsRef: MutableRefObject<OrbitControlsImpl | null>;
}

const minDistance = 2.1;
const maxDistance = 14;
const panSpeed = 0.78;

export function TrackpadViewportControls({ controlsRef }: TrackpadViewportControlsProps) {
  const { camera, gl } = useThree();
  const targetZoomDistance = useRef<number | null>(null);

  useEffect(() => {
    const element = gl.domElement;

    const onWheel = (event: WheelEvent) => {
      const controls = controlsRef.current;
      if (!controls) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      if (trackpadWheelIntent(event) === 'zoom') {
        targetZoomDistance.current = getNextZoomTarget(camera, controls, targetZoomDistance.current, event.deltaY);
      } else {
        targetZoomDistance.current = null;
        panCamera(camera, controls, element, event.deltaX, event.deltaY);
        controls.update();
      }
    };

    element.addEventListener('wheel', onWheel, { passive: false, capture: true });

    return () => {
      element.removeEventListener('wheel', onWheel, { capture: true });
    };
  }, [camera, controlsRef, gl.domElement]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    const targetDistance = targetZoomDistance.current;
    if (!controls || targetDistance === null) return;

    const currentDistance = camera.position.distanceTo(controls.target);
    const nextDistance = smoothZoomDistance(currentDistance, targetDistance, delta);
    applyZoomDistance(camera, controls, nextDistance);
    controls.update();

    if (Math.abs(nextDistance - targetDistance) < 0.01) {
      applyZoomDistance(camera, controls, targetDistance);
      targetZoomDistance.current = null;
    }
  });

  return null;
}

function getNextZoomTarget(
  camera: Camera,
  controls: OrbitControlsImpl,
  currentTargetDistance: number | null,
  deltaY: number,
) {
  const currentDistance = camera.position.distanceTo(controls.target);
  return nextZoomDistance(currentTargetDistance ?? currentDistance, deltaY);
}

function applyZoomDistance(camera: Camera, controls: OrbitControlsImpl, distance: number) {
  const target = controls.target;
  const offset = camera.position.clone().sub(target);
  const nextDistance = MathUtils.clamp(distance, minDistance, maxDistance);

  offset.setLength(nextDistance);
  camera.position.copy(target).add(offset);
}

function panCamera(
  camera: Camera,
  controls: OrbitControlsImpl,
  element: HTMLCanvasElement,
  deltaX: number,
  deltaY: number,
) {
  const target = controls.target;
  const distance = camera.position.distanceTo(target);
  const viewportHeight = camera instanceof PerspectiveCamera
    ? 2 * Math.tan(MathUtils.degToRad(camera.fov) / 2) * distance
    : distance;
  const viewportWidth = viewportHeight * (element.clientWidth / Math.max(1, element.clientHeight));
  const right = new Vector3().setFromMatrixColumn(camera.matrix, 0);
  const up = new Vector3().setFromMatrixColumn(camera.matrix, 1);
  const pan = right
    .multiplyScalar((deltaX / Math.max(1, element.clientWidth)) * viewportWidth * panSpeed)
    .add(up.multiplyScalar((-deltaY / Math.max(1, element.clientHeight)) * viewportHeight * panSpeed));

  camera.position.add(pan);
  target.add(pan);
}
