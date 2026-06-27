import type { Genre, GenreId, Relationship, RelationshipLayer, RelationshipLayerType, Track } from './genreTypes';

export const relationshipLayers: RelationshipLayer[] = [
  { id: 'all', label: 'All', description: 'Show every relationship curve at once.' },
  { id: 'history', label: 'History', description: 'Directional influence and descent.' },
  { id: 'sound', label: 'Sound', description: 'Shared rhythm, texture, tempo, or atmosphere.' },
  { id: 'scene', label: 'Scene', description: 'Cities, clubs, labels, and cultural context.' },
];

export const genres: Genre[] = [
  {
    id: 'detroit-techno',
    name: 'Detroit Techno',
    aliases: ['Detroit'],
    category: 'techno',
    era: '1980s',
    regions: ['Detroit'],
    summary:
      'A machine-soul blueprint where futurist synths, funk memory, and industrial city pressure become precise dance music. It acts as the central gravity source for this galaxy.',
    soundKeywords: ['machine funk', 'futurist', 'syncopated', 'soulful'],
    visualProfile: { color: '#38bdf8', accent: '#c084fc', pulseSpeed: 0.8, particleDensity: 1, motion: 'stable' },
    position: [0, 0, 0],
  },
  {
    id: 'minimal-techno',
    name: 'Minimal Techno',
    aliases: [],
    category: 'techno',
    era: '1990s',
    regions: ['Detroit', 'Berlin'],
    summary:
      'A stripped reduction of techno where small changes become the drama. Repetition, space, and microscopic modulation carry the floor forward.',
    soundKeywords: ['reduced', 'hypnotic', 'dry', 'micro-shift'],
    visualProfile: { color: '#60a5fa', accent: '#a855f7', pulseSpeed: 0.55, particleDensity: 0.55, motion: 'stable' },
    position: [2.4, 0.8, -0.6],
  },
  {
    id: 'dub-techno',
    name: 'Dub Techno',
    aliases: [],
    category: 'techno',
    era: '1990s',
    regions: ['Berlin'],
    summary:
      'Techno submerged in echo chambers. Chords smear into fog, kicks move with patience, and delay turns the club into a deep pressure field.',
    soundKeywords: ['delay', 'fog', 'chords', 'deep'],
    visualProfile: { color: '#0ea5e9', accent: '#93c5fd', pulseSpeed: 0.42, particleDensity: 0.8, motion: 'mist' },
    position: [1.5, -1.1, -1.8],
  },
  {
    id: 'acid-techno',
    name: 'Acid Techno',
    aliases: ['Acid'],
    category: 'techno',
    era: '1990s',
    regions: ['London', 'Chicago'],
    summary:
      'The 303 line pushed into harder techno pressure. Its identity is liquid, biting, and unstable, always twisting toward another peak.',
    soundKeywords: ['303', 'squelch', 'driving', 'liquid'],
    visualProfile: { color: '#d946ef', accent: '#38bdf8', pulseSpeed: 1.15, particleDensity: 0.95, motion: 'spiral' },
    position: [-1.9, 1.0, -0.9],
  },
  {
    id: 'hard-techno',
    name: 'Hard Techno',
    aliases: [],
    category: 'techno',
    era: '1990s-2000s',
    regions: ['Berlin', 'Rotterdam'],
    summary:
      'A high-pressure branch built for impact: fast kicks, sharpened transients, compressed tension, and a direct physical reading of techno energy.',
    soundKeywords: ['fast', 'compressed', 'impact', 'peak-time'],
    visualProfile: { color: '#ec4899', accent: '#c084fc', pulseSpeed: 1.35, particleDensity: 1.2, motion: 'sharp' },
    position: [0.4, 2.6, -1.3],
  },
  {
    id: 'industrial-techno',
    name: 'Industrial Techno',
    aliases: [],
    category: 'industrial',
    era: '1990s-2010s',
    regions: ['Berlin', 'Birmingham'],
    summary:
      'Techno routed through metal, noise, and factory rhythm. It favors abrasion, weight, and harsh spatial texture over polished club shine.',
    soundKeywords: ['metallic', 'noise', 'factory', 'austere'],
    visualProfile: { color: '#8b5cf6', accent: '#f472b6', pulseSpeed: 0.95, particleDensity: 0.9, motion: 'sharp' },
    position: [1.8, 2.6, -2.6],
  },
  {
    id: 'schranz',
    name: 'Schranz',
    aliases: [],
    category: 'techno',
    era: '2000s',
    regions: ['Germany'],
    summary:
      'A brutalist acceleration of hard techno: relentless loops, abrasive drive, and a crushed sense of forward motion.',
    soundKeywords: ['relentless', 'distorted', 'looped', 'brutal'],
    visualProfile: { color: '#c084fc', accent: '#ec4899', pulseSpeed: 1.55, particleDensity: 1.35, motion: 'sharp' },
    position: [2.9, 3.2, -3.4],
  },
  {
    id: 'melodic-techno',
    name: 'Melodic Techno',
    aliases: [],
    category: 'techno',
    era: '2010s',
    regions: ['Berlin', 'Europe'],
    summary:
      'A cinematic, harmonically led techno branch where arpeggios, long breakdowns, and glowing synth lines shape the journey.',
    soundKeywords: ['arpeggiated', 'cinematic', 'emotional', 'polished'],
    visualProfile: { color: '#8b5cf6', accent: '#38bdf8', pulseSpeed: 0.72, particleDensity: 0.75, motion: 'stable' },
    position: [-0.8, 2.2, 1.9],
  },
  {
    id: 'ambient-techno',
    name: 'Ambient Techno',
    aliases: [],
    category: 'ambient',
    era: '1990s',
    regions: ['UK', 'Europe'],
    summary:
      'Techno structure diffused into atmosphere. Rhythm remains present, but pads, drift, and space become the primary architecture.',
    soundKeywords: ['atmospheric', 'drifting', 'soft pulse', 'immersive'],
    visualProfile: { color: '#93c5fd', accent: '#c084fc', pulseSpeed: 0.36, particleDensity: 1.05, motion: 'mist' },
    position: [-0.2, -2.4, -1.1],
  },
  {
    id: 'electro',
    name: 'Electro',
    aliases: [],
    category: 'electro',
    era: '1980s',
    regions: ['New York', 'Detroit'],
    summary:
      'Robotic funk, breakbeats, vocoders, and machine syncopation. Electro is one of techno historys closest electric relatives.',
    soundKeywords: ['breakbeat', 'robotic', 'vocoder', 'funk'],
    visualProfile: { color: '#22d3ee', accent: '#c084fc', pulseSpeed: 0.9, particleDensity: 0.8, motion: 'fragmented' },
    position: [-2.4, -0.1, 0.8],
  },
  {
    id: 'chicago-house',
    name: 'Chicago House',
    aliases: ['House'],
    category: 'house',
    era: '1980s',
    regions: ['Chicago'],
    summary:
      'Raw drum machines, jacking basslines, and warehouse function. It is a parallel Midwest engine to Detroit techno.',
    soundKeywords: ['jacking', 'warehouse', 'raw', 'swing'],
    visualProfile: { color: '#a855f7', accent: '#f472b6', pulseSpeed: 0.82, particleDensity: 0.8, motion: 'route' },
    position: [-3.2, -1.0, 1.4],
  },
  {
    id: 'acid-house',
    name: 'Acid House',
    aliases: [],
    category: 'house',
    era: '1980s',
    regions: ['Chicago', 'UK'],
    summary:
      'House music mutated by the TB-303. Its rubbery line became a shared chemical signal for club culture and rave expansion.',
    soundKeywords: ['303', 'rave', 'jacking', 'rubbery'],
    visualProfile: { color: '#d946ef', accent: '#60a5fa', pulseSpeed: 1.05, particleDensity: 0.9, motion: 'spiral' },
    position: [-3.4, 0.7, 0.2],
  },
  {
    id: 'deep-house',
    name: 'Deep House',
    aliases: [],
    category: 'house',
    era: '1980s-1990s',
    regions: ['Chicago', 'New York'],
    summary:
      'Warm chords, soulful depth, and a smoother body language. It connects club function to intimacy and long-form atmosphere.',
    soundKeywords: ['warm', 'soulful', 'chords', 'smooth'],
    visualProfile: { color: '#6366f1', accent: '#ec4899', pulseSpeed: 0.6, particleDensity: 0.65, motion: 'mist' },
    position: [-4.0, -2.2, 0.8],
  },
  {
    id: 'ebm',
    name: 'EBM',
    aliases: ['Electronic Body Music'],
    category: 'industrial',
    era: '1980s',
    regions: ['Belgium', 'Germany'],
    summary:
      'Body music built from sequenced bass, militarized rhythm, and industrial attitude. It feeds techno with dark physical discipline.',
    soundKeywords: ['body', 'sequenced', 'industrial', 'stark'],
    visualProfile: { color: '#7c3aed', accent: '#f472b6', pulseSpeed: 0.88, particleDensity: 0.7, motion: 'route' },
    position: [3.0, 0.2, -1.2],
  },
  {
    id: 'new-beat',
    name: 'New Beat',
    aliases: [],
    category: 'industrial',
    era: '1980s',
    regions: ['Belgium'],
    summary:
      'A slowed, heavy Belgian club mutation between EBM, acid, and early rave. It moves with a strange, low-slung menace.',
    soundKeywords: ['slow', 'heavy', 'Belgian', 'dark'],
    visualProfile: { color: '#a855f7', accent: '#ec4899', pulseSpeed: 0.5, particleDensity: 0.7, motion: 'route' },
    position: [3.8, -0.9, -0.2],
  },
  {
    id: 'trance',
    name: 'Trance',
    aliases: [],
    category: 'trance',
    era: '1990s',
    regions: ['Germany', 'Netherlands'],
    summary:
      'A hypnotic, ascending dance form built on repetition, long tension curves, and bright synthetic release.',
    soundKeywords: ['ascending', 'hypnotic', 'euphoric', 'long-form'],
    visualProfile: { color: '#38bdf8', accent: '#c084fc', pulseSpeed: 0.76, particleDensity: 0.75, motion: 'stable' },
    position: [-1.3, 3.4, 1.5],
  },
  {
    id: 'goa-trance',
    name: 'Goa Trance',
    aliases: [],
    category: 'trance',
    era: '1990s',
    regions: ['Goa', 'Europe'],
    summary:
      'A psychedelic trance branch with spiraling leads, long-form acceleration, and a bright outdoor ritual energy.',
    soundKeywords: ['psychedelic', 'spiral', 'ritual', 'bright'],
    visualProfile: { color: '#d946ef', accent: '#f472b6', pulseSpeed: 1.0, particleDensity: 1.0, motion: 'spiral' },
    position: [-2.4, 4.0, 2.4],
  },
  {
    id: 'breakbeat-hardcore',
    name: 'Breakbeat Hardcore',
    aliases: [],
    category: 'bass',
    era: '1990s',
    regions: ['UK'],
    summary:
      'A rave pressure system of sampled breaks, stabs, bass, and speed. It splinters into jungle and other UK continuum forms.',
    soundKeywords: ['rave', 'breaks', 'sampled', 'fast'],
    visualProfile: { color: '#f472b6', accent: '#22d3ee', pulseSpeed: 1.22, particleDensity: 1.05, motion: 'fragmented' },
    position: [-2.2, -2.8, 2.4],
  },
  {
    id: 'jungle',
    name: 'Jungle',
    aliases: [],
    category: 'bass',
    era: '1990s',
    regions: ['UK'],
    summary:
      'Breakbeats cut into fast, syncopated architecture over bass weight and sound-system space. It turns rave energy into dense rhythm design.',
    soundKeywords: ['breaks', 'bass', 'syncopated', 'sound-system'],
    visualProfile: { color: '#4f46e5', accent: '#ec4899', pulseSpeed: 1.28, particleDensity: 1.2, motion: 'fragmented' },
    position: [-1.1, -3.8, 3.2],
  },
  {
    id: 'idm',
    name: 'IDM',
    aliases: ['Intelligent Dance Music'],
    category: 'ambient',
    era: '1990s',
    regions: ['UK', 'Europe'],
    summary:
      'Dance music folded into listening experiments: fractured rhythm, digital texture, and emotional detail under precise programming.',
    soundKeywords: ['fractured', 'digital', 'detailed', 'listening'],
    visualProfile: { color: '#60a5fa', accent: '#c084fc', pulseSpeed: 0.68, particleDensity: 1.1, motion: 'fragmented' },
    position: [0.8, -3.2, 2.1],
  },
  {
    id: 'ambient',
    name: 'Ambient',
    aliases: [],
    category: 'ambient',
    era: '1970s-1990s',
    regions: ['UK', 'Germany', 'Global'],
    summary:
      'Music as environment: texture, duration, and space before rhythm. It gives the galaxy its fog, depth, and long horizon.',
    soundKeywords: ['space', 'texture', 'slow', 'environmental'],
    visualProfile: { color: '#93c5fd', accent: '#c084fc', pulseSpeed: 0.24, particleDensity: 1.3, motion: 'mist' },
    position: [1.0, -4.4, 0.2],
  },
  {
    id: 'berlin-school',
    name: 'Berlin School',
    aliases: [],
    category: 'ambient',
    era: '1970s',
    regions: ['Berlin'],
    summary:
      'Sequencer-driven electronic journeys that prefigure later hypnotic club structures. Long arpeggios become spatial machinery.',
    soundKeywords: ['sequencer', 'kosmische', 'arpeggio', 'long-form'],
    visualProfile: { color: '#6366f1', accent: '#38bdf8', pulseSpeed: 0.44, particleDensity: 0.75, motion: 'stable' },
    position: [2.5, -3.5, 1.5],
  },
  {
    id: 'uk-garage',
    name: 'UK Garage',
    aliases: ['UKG'],
    category: 'bass',
    era: '1990s',
    regions: ['UK'],
    summary:
      'Swinging drums, chopped vocals, and bassline elasticity. It connects house pressure to the UKs later bass continuum.',
    soundKeywords: ['swing', 'bassline', 'chopped vocal', 'shuffle'],
    visualProfile: { color: '#22d3ee', accent: '#f472b6', pulseSpeed: 0.95, particleDensity: 0.85, motion: 'route' },
    position: [-3.4, -3.2, 3.5],
  },
  {
    id: 'breaks',
    name: 'Breaks',
    aliases: ['Breakbeat'],
    category: 'bass',
    era: '1990s-2000s',
    regions: ['UK', 'US'],
    summary:
      'A broad breakbeat zone where syncopated drum programming replaces straight four-four as the main engine.',
    soundKeywords: ['syncopated', 'breakbeat', 'elastic', 'club'],
    visualProfile: { color: '#ec4899', accent: '#22d3ee', pulseSpeed: 1.02, particleDensity: 0.9, motion: 'fragmented' },
    position: [-3.0, -2.0, 2.7],
  },
];

export const tracks: Track[] = genres.flatMap((genre, index) => [
  {
    id: `${genre.id}-pulse-a`,
    title: `${genre.name} Signal A`,
    artist: 'Prototype Archive',
    year: 1990 + (index % 25),
    duration: '0:30',
    genreId: genre.id,
    audioSrc: `/audio/placeholder-${(index % 3) + 1}.mp3`,
    note: `Placeholder loop for testing the ${genre.name} playback state.`,
  },
  {
    id: `${genre.id}-pulse-b`,
    title: `${genre.name} Signal B`,
    artist: 'Prototype Archive',
    year: 1992 + (index % 25),
    duration: '0:30',
    genreId: genre.id,
    audioSrc: `/audio/placeholder-${((index + 1) % 3) + 1}.mp3`,
    note: `Second placeholder loop for testing ${genre.name} track switching.`,
  },
]);

export const relationships: Relationship[] = [
  rel('detroit-to-minimal', 'detroit-techno', 'minimal-techno', 'history', 5, true, 'Blueprint reduction'),
  rel('detroit-to-dub', 'detroit-techno', 'dub-techno', 'history', 4, true, 'Deep space echo'),
  rel('detroit-to-hard', 'detroit-techno', 'hard-techno', 'history', 3, true, 'Pressure branch'),
  rel('detroit-to-electro', 'electro', 'detroit-techno', 'history', 4, true, 'Machine funk feed'),
  rel('acid-house-to-acid-techno', 'acid-house', 'acid-techno', 'history', 5, true, '303 pressure'),
  rel('minimal-to-dub', 'minimal-techno', 'dub-techno', 'history', 3, true, 'Reduction into space'),
  rel('hard-to-schranz', 'hard-techno', 'schranz', 'history', 5, true, 'Harder acceleration'),
  rel('industrial-to-industrial-techno', 'ebm', 'industrial-techno', 'history', 4, true, 'Body machine discipline'),
  rel('new-beat-to-ebm', 'ebm', 'new-beat', 'history', 4, true, 'Slowed Belgian body music'),
  rel('trance-to-goa', 'trance', 'goa-trance', 'history', 4, true, 'Psychedelic expansion'),
  rel('breakbeat-to-jungle', 'breakbeat-hardcore', 'jungle', 'history', 5, true, 'Breakbeat splinter'),
  rel('ambient-to-ambient-techno', 'ambient', 'ambient-techno', 'history', 4, true, 'Atmosphere enters techno'),
  rel('berlin-school-to-trance', 'berlin-school', 'trance', 'history', 3, true, 'Sequencer hypnosis'),
  rel('chicago-to-acid-house', 'chicago-house', 'acid-house', 'history', 5, true, 'Warehouse acid signal'),
  rel('chicago-to-deep-house', 'chicago-house', 'deep-house', 'history', 4, true, 'Soulful deepening'),
  rel('breaks-to-ukg', 'breaks', 'uk-garage', 'history', 3, true, 'Broken swing route'),

  rel('dub-to-ambient-techno-sound', 'dub-techno', 'ambient-techno', 'sound', 5, false, 'Fog and delay'),
  rel('acid-to-goa-sound', 'acid-techno', 'goa-trance', 'sound', 4, false, 'Spiral line energy'),
  rel('minimal-to-melodic-sound', 'minimal-techno', 'melodic-techno', 'sound', 3, false, 'Hypnotic repetition'),
  rel('hard-to-industrial-sound', 'hard-techno', 'industrial-techno', 'sound', 4, false, 'Impact and abrasion'),
  rel('schranz-to-industrial-sound', 'schranz', 'industrial-techno', 'sound', 4, false, 'Distorted pressure'),
  rel('electro-to-breaks-sound', 'electro', 'breaks', 'sound', 4, false, 'Broken machine rhythm'),
  rel('deep-to-dub-sound', 'deep-house', 'dub-techno', 'sound', 3, false, 'Warm chord depth'),
  rel('trance-to-melodic-sound', 'trance', 'melodic-techno', 'sound', 4, false, 'Long melodic arcs'),
  rel('ambient-to-idm-sound', 'ambient', 'idm', 'sound', 4, false, 'Listening texture'),
  rel('idm-to-ambient-techno-sound', 'idm', 'ambient-techno', 'sound', 3, false, 'Digital drift'),
  rel('ukg-to-breaks-sound', 'uk-garage', 'breaks', 'sound', 4, false, 'Syncopated club swing'),
  rel('jungle-to-breaks-sound', 'jungle', 'breaks', 'sound', 5, false, 'Breakbeat architecture'),

  rel('detroit-chicago-scene', 'detroit-techno', 'chicago-house', 'scene', 5, false, 'Midwest exchange'),
  rel('detroit-berlin-scene', 'detroit-techno', 'minimal-techno', 'scene', 4, false, 'Detroit to Berlin'),
  rel('berlin-dub-scene', 'dub-techno', 'minimal-techno', 'scene', 5, false, 'Berlin deep axis'),
  rel('berlin-industrial-scene', 'industrial-techno', 'hard-techno', 'scene', 4, false, 'Warehouse pressure'),
  rel('belgium-ebm-newbeat-scene', 'ebm', 'new-beat', 'scene', 5, false, 'Belgian body route'),
  rel('uk-rave-breakbeat-scene', 'breakbeat-hardcore', 'jungle', 'scene', 5, false, 'UK rave continuum'),
  rel('ukg-jungle-scene', 'uk-garage', 'jungle', 'scene', 4, false, 'UK bass continuum'),
  rel('goa-trance-scene', 'goa-trance', 'trance', 'scene', 4, false, 'Outdoor trance route'),
  rel('chicago-uk-acid-scene', 'acid-house', 'acid-techno', 'scene', 4, false, 'Acid crosses the Atlantic'),
  rel('ambient-berlin-scene', 'ambient', 'berlin-school', 'scene', 4, false, 'Long-form electronic space'),
  rel('idm-uk-scene', 'idm', 'ambient-techno', 'scene', 3, false, 'UK listening rooms'),
  rel('electro-detroit-scene', 'electro', 'detroit-techno', 'scene', 4, false, 'Robotic funk city link'),
];

function rel(
  id: string,
  source: GenreId,
  target: GenreId,
  type: RelationshipLayerType,
  strength: Relationship['strength'],
  directional: boolean,
  label: string,
): Relationship {
  return {
    id,
    source,
    target,
    type,
    strength,
    directional,
    label,
    description: label,
  };
}

export function getGenreById(id: GenreId): Genre | undefined {
  return genres.find((genre) => genre.id === id);
}

export function getTracksForGenre(genreId: GenreId): Track[] {
  return tracks.filter((track) => track.genreId === genreId);
}

export function getRelationshipsForGenre(genreId: GenreId, layer?: RelationshipLayerType): Relationship[] {
  return relationships.filter((relationship) => {
    const touchesGenre = relationship.source === genreId || relationship.target === genreId;
    return touchesGenre && (layer === undefined || relationship.type === layer);
  });
}
