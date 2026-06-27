import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react';
import { Vector3 } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import type { Genre } from '../data/genreTypes';
import { cameraTargetFor } from './geometry';
import { graphPositionFor } from './graphLayout';

interface CameraRigProps {
  selectedGenre: Genre | undefined;
  controlsRef: MutableRefObject<OrbitControlsImpl | null>;
}

export function CameraRig({ selectedGenre, controlsRef }: CameraRigProps) {
  const { camera } = useThree();
  const focusProgress = useRef(1);
  const target = useMemo(() => {
    if (!selectedGenre) return new Vector3(0, 2.4, 8);
    return new Vector3(...cameraTargetFor(graphPositionFor(selectedGenre)));
  }, [selectedGenre]);
  const lookAtTarget = useMemo(() => {
    if (!selectedGenre) return new Vector3(0, 0, 0);
    return new Vector3(...graphPositionFor(selectedGenre));
  }, [selectedGenre]);

  useEffect(() => {
    focusProgress.current = 0;
  }, [selectedGenre]);

  useFrame(() => {
    if (focusProgress.current >= 1) return;
    focusProgress.current = Math.min(1, focusProgress.current + 0.045);
    const easing = 1 - Math.pow(1 - focusProgress.current, 3);
    camera.position.lerp(target, 0.055 + easing * 0.035);
    const controls = controlsRef.current;
    if (controls) {
      controls.target.lerp(lookAtTarget, 0.08 + easing * 0.04);
      controls.update();
    } else {
      camera.lookAt(lookAtTarget);
    }
  });

  return null;
}
