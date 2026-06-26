import { useFrame, useThree } from '@react-three/fiber';
import { useMemo } from 'react';
import { Vector3 } from 'three';
import type { Genre } from '../data/genreTypes';
import { cameraTargetFor } from './geometry';

interface CameraRigProps {
  selectedGenre: Genre | undefined;
}

export function CameraRig({ selectedGenre }: CameraRigProps) {
  const { camera } = useThree();
  const target = useMemo(() => {
    if (!selectedGenre) return new Vector3(0, 2.4, 8);
    return new Vector3(...cameraTargetFor(selectedGenre.position));
  }, [selectedGenre]);

  useFrame(() => {
    camera.position.lerp(target, 0.045);
    camera.lookAt(selectedGenre ? new Vector3(...selectedGenre.position) : new Vector3(0, 0, 0));
  });

  return null;
}
