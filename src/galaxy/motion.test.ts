import { describe, expect, it } from 'vitest';
import { atomShapeFor, softSpring } from './motion';

describe('motion helpers', () => {
  it('uses a smooth spring without overshooting the destination', () => {
    expect(softSpring(0)).toBe(0);
    expect(softSpring(1)).toBe(1);
    expect(softSpring(0.25)).toBeGreaterThan(0.05);
    expect(softSpring(0.5)).toBeGreaterThan(softSpring(0.25));
    expect(softSpring(0.75)).toBeGreaterThan(softSpring(0.5));
    expect(softSpring(0.75)).toBeLessThan(1);
  });

  it('turns inactive atoms from a flattened disc into a dimensional selected sphere', () => {
    const inactive = atomShapeFor(false, 0.2);
    const active = atomShapeFor(true, 0.2);

    expect(inactive.scale.z).toBeLessThan(inactive.scale.x);
    expect(active.scale.z).toBeCloseTo(active.scale.x);
    expect(active.radius).toBeGreaterThan(inactive.radius);
    expect(active.material.opacity).toBeGreaterThan(inactive.material.opacity);
    expect(active.material.emissiveIntensity).toBeLessThan(inactive.material.emissiveIntensity);
  });

  it('keeps atom scale stable over time instead of applying a breathing pulse', () => {
    const scale = atomShapeFor(true, 0.4);

    expect(scale.animation.scalePulse).toBe(0);
    expect(scale.animation.playingScaleBoost).toBe(0);
  });
});
