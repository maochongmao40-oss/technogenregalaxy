import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { Genre } from '../data/genreTypes';
import { cameraTargetFor } from './geometry';
import { graphPositionFor } from './graphLayout';
import { softSpring } from './motion';

interface CameraRigProps {
  selectedGenre: Genre | undefined;
  controlsRef: MutableRefObject<OrbitControlsImpl | null>;
}

export function CameraRig({ selectedGenre, controlsRef }: CameraRigProps) {
  const { camera } = useThree();
  const focus = useRef({
    active: false,
    elapsed: 0,
    duration: 1.18,
    fromCamera: new Vector3(),
    toCamera: new Vector3(),
    fromTarget: new Vector3(),
    toTarget: new Vector3(),
  });
  const target = useMemo(() => {
    if (!selectedGenre) return new Vector3(0, 2.4, 8);
    return new Vector3(...cameraTargetFor(graphPositionFor(selectedGenre)));
  }, [selectedGenre]);
  const lookAtTarget = useMemo(() => {
    if (!selectedGenre) return new Vector3(0, 0, 0);
    return new Vector3(...graphPositionFor(selectedGenre));
  }, [selectedGenre]);

  useEffect(() => {
    const controls = controlsRef.current;
    focus.current = {
      active: true,
      elapsed: 0,
      duration: selectedGenre ? 1.18 : 0.95,
      fromCamera: camera.position.clone(),
      toCamera: target.clone(),
      fromTarget: controls?.target.clone() ?? new Vector3(0, 0, 0),
      toTarget: lookAtTarget.clone(),
    };
  }, [camera, controlsRef, lookAtTarget, selectedGenre, target]);

  useFrame((_, delta) => {
    const transition = focus.current;
    if (!transition.active) return;

    transition.elapsed = Math.min(transition.duration, transition.elapsed + delta);
    const t = transition.elapsed / transition.duration;
    const eased = softSpring(t);
    camera.position.lerpVectors(transition.fromCamera, transition.toCamera, eased);
    const controls = controlsRef.current;
    if (controls) {
      controls.target.lerpVectors(transition.fromTarget, transition.toTarget, eased);
      controls.update();
    } else {
      camera.lookAt(transition.toTarget);
    }

    if (transition.elapsed >= transition.duration) {
      camera.position.copy(transition.toCamera);
      if (controls) {
        controls.target.copy(transition.toTarget);
        controls.update();
      }
      transition.active = false;
    }
  });

  return null;
}
