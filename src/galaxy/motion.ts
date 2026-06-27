export interface AtomShape {
  radius: number;
  scale: {
    x: number;
    y: number;
    z: number;
  };
  material: {
    opacity: number;
    roughness: number;
    metalness: number;
    clearcoat: number;
    emissiveIntensity: number;
  };
  animation: {
    scalePulse: number;
    playingScaleBoost: number;
  };
}

export function softSpring(t: number): number {
  const clamped = clamp01(t);
  const smooth = clamped * clamped * clamped * (clamped * (clamped * 6 - 15) + 10);
  return 1 - Math.pow(1 - smooth, 2.25);
}

export function atomShapeFor(active: boolean, particleDensity: number): AtomShape {
  const radius = 0.18 + particleDensity * 0.05;

  if (!active) {
    return {
      radius,
      scale: { x: 1.12, y: 1.12, z: 0.18 },
      material: {
        opacity: 0.84,
        roughness: 0.42,
        metalness: 0.08,
        clearcoat: 0.08,
        emissiveIntensity: 0.38,
      },
      animation: {
        scalePulse: 0,
        playingScaleBoost: 0,
      },
    };
  }

  return {
    radius: radius * 1.82,
    scale: { x: 1, y: 1, z: 1 },
    material: {
      opacity: 1,
      roughness: 0.18,
      metalness: 0.12,
      clearcoat: 0.92,
      emissiveIntensity: 0.08,
    },
    animation: {
      scalePulse: 0,
      playingScaleBoost: 0,
    },
  };
}

export function mixAtomShape(from: AtomShape, to: AtomShape, amount: number): AtomShape {
  const t = softSpring(amount);

  return {
    radius: lerp(from.radius, to.radius, t),
    scale: {
      x: lerp(from.scale.x, to.scale.x, t),
      y: lerp(from.scale.y, to.scale.y, t),
      z: lerp(from.scale.z, to.scale.z, t),
    },
    material: {
      opacity: lerp(from.material.opacity, to.material.opacity, t),
      roughness: lerp(from.material.roughness, to.material.roughness, t),
      metalness: lerp(from.material.metalness, to.material.metalness, t),
      clearcoat: lerp(from.material.clearcoat, to.material.clearcoat, t),
      emissiveIntensity: lerp(from.material.emissiveIntensity, to.material.emissiveIntensity, t),
    },
    animation: {
      scalePulse: lerp(from.animation.scalePulse, to.animation.scalePulse, t),
      playingScaleBoost: lerp(from.animation.playingScaleBoost, to.animation.playingScaleBoost, t),
    },
  };
}

function lerp(from: number, to: number, amount: number): number {
  return from + (to - from) * amount;
}

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}
