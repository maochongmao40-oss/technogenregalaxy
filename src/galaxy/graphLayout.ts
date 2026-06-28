import type { Genre, Vector3Tuple } from '../data/genreTypes';

export function graphPositionFor(genre: Genre): Vector3Tuple {
  return genre.position;
}
