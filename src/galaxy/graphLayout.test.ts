import { describe, expect, it } from 'vitest';
import { genres } from '../data/genreData';
import { graphPositionFor } from './graphLayout';

describe('genre graph layout', () => {
  it('keeps genres distributed through real 3D depth', () => {
    const zValues = genres.map((genre) => graphPositionFor(genre)[2]);
    expect(Math.max(...zValues) - Math.min(...zValues)).toBeGreaterThan(5);
  });
});
