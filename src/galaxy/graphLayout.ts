import type { Genre, Vector3Tuple } from '../data/genreTypes';

const graphPositions: Record<string, Vector3Tuple> = {
  'detroit-techno': [0, 0, 0],
  'minimal-techno': [1.55, 0.9, 0.05],
  'dub-techno': [1.25, -0.95, -0.05],
  'acid-techno': [-1.45, 1.0, 0.04],
  'hard-techno': [0.85, 1.95, -0.02],
  'industrial-techno': [2.05, 1.9, 0.04],
  schranz: [2.75, 2.7, 0],
  'melodic-techno': [-0.45, 2.25, 0.03],
  'ambient-techno': [0.45, -2.05, -0.04],
  electro: [-1.75, -0.2, 0.03],
  'chicago-house': [-2.55, -0.9, 0.04],
  'acid-house': [-2.55, 0.62, -0.04],
  'deep-house': [-3.15, -1.95, 0.02],
  ebm: [2.35, 0.32, -0.03],
  'new-beat': [3.15, -0.62, 0.03],
  trance: [-1.15, 2.95, -0.02],
  'goa-trance': [-2.1, 3.65, 0.02],
  'breakbeat-hardcore': [-1.45, -2.85, 0.04],
  jungle: [-0.65, -3.65, -0.02],
  idm: [1.35, -3.0, 0.03],
  ambient: [1.75, -4.05, -0.04],
  'berlin-school': [2.85, -3.05, 0.02],
  'uk-garage': [-2.85, -3.35, -0.03],
  breaks: [-2.25, -2.22, 0.03],
  microhouse: [2.1, 0.12, 0.05],
  rominimal: [2.65, 0.82, -0.03],
  'hypnotic-techno': [1.55, -0.15, 0.02],
  'peak-time-techno': [0.05, 3.05, 0.04],
  hardgroove: [-0.72, 1.72, -0.02],
  'birmingham-techno': [2.55, 2.28, 0.03],
  ghettotech: [-2.1, 0.72, -0.04],
  'future-garage': [-3.45, -3.95, 0.02],
};

export function graphPositionFor(genre: Genre): Vector3Tuple {
  return graphPositions[genre.id] ?? genre.position;
}
