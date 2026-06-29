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
  {
    id: 'microhouse',
    name: 'Microhouse',
    aliases: ['Microsound House'],
    category: 'house',
    era: '1990s-2000s',
    regions: ['Germany', 'Europe'],
    summary:
      'A microscopic house branch where clicks, tiny edits, and reduced groove logic turn minimal repetition into a close-listening club form.',
    soundKeywords: ['clicks', 'micro-edit', 'reduced groove', 'dry'],
    visualProfile: { color: '#6366f1', accent: '#c084fc', pulseSpeed: 0.48, particleDensity: 0.62, motion: 'stable' },
    position: [2.1, 0.2, 0.4],
  },
  {
    id: 'rominimal',
    name: 'Rominimal',
    aliases: ['Romanian Minimal'],
    category: 'house',
    era: '2000s-2010s',
    regions: ['Romania'],
    summary:
      'A long-form Romanian minimal language built from elastic bass, negative space, and tiny shifts that reward patient floor attention.',
    soundKeywords: ['elastic', 'long-form', 'negative space', 'subtle'],
    visualProfile: { color: '#8b5cf6', accent: '#60a5fa', pulseSpeed: 0.4, particleDensity: 0.68, motion: 'stable' },
    position: [2.5, 0.9, 0.5],
  },
  {
    id: 'hypnotic-techno',
    name: 'Hypnotic Techno',
    aliases: ['Deep Hypnotic Techno'],
    category: 'techno',
    era: '2000s-2010s',
    regions: ['Berlin', 'Europe'],
    summary:
      'A deep, looping techno form where phase, texture, and pressure create trance without needing overt melody or peak-time drama.',
    soundKeywords: ['looping', 'phase', 'deep pressure', 'textural'],
    visualProfile: { color: '#4f46e5', accent: '#38bdf8', pulseSpeed: 0.52, particleDensity: 0.92, motion: 'mist' },
    position: [1.2, -0.1, 0.55],
  },
  {
    id: 'peak-time-techno',
    name: 'Peak-Time Techno',
    aliases: ['Peak Time'],
    category: 'techno',
    era: '2010s-2020s',
    regions: ['Europe', 'Global'],
    summary:
      'A modern high-impact techno lane designed for large-room release: direct drops, bright tension, and a polished pressure curve.',
    soundKeywords: ['large-room', 'drop', 'polished', 'tension'],
    visualProfile: { color: '#ec4899', accent: '#38bdf8', pulseSpeed: 1.28, particleDensity: 1.15, motion: 'sharp' },
    position: [0.1, 3.2, 0.45],
  },
  {
    id: 'hardgroove',
    name: 'Hardgroove',
    aliases: ['Groove Techno'],
    category: 'techno',
    era: '1990s-2000s',
    regions: ['US', 'UK', 'Europe'],
    summary:
      'Percussive techno centered on funk, rolling drums, and fast interlocking groove rather than pure distortion or cinematic scale.',
    soundKeywords: ['percussive', 'funky', 'rolling', 'fast groove'],
    visualProfile: { color: '#d946ef', accent: '#22d3ee', pulseSpeed: 1.08, particleDensity: 1.05, motion: 'fragmented' },
    position: [-0.6, 1.8, 0.5],
  },
  {
    id: 'birmingham-techno',
    name: 'Birmingham Techno',
    aliases: ['Birmingham Sound'],
    category: 'industrial',
    era: '1990s',
    regions: ['Birmingham'],
    summary:
      'A stripped, metallic, and loop-driven UK techno pressure point whose austerity feeds later industrial and hard techno languages.',
    soundKeywords: ['metallic', 'loop-driven', 'austere', 'UK'],
    visualProfile: { color: '#7c3aed', accent: '#ec4899', pulseSpeed: 0.98, particleDensity: 0.95, motion: 'sharp' },
    position: [2.45, 2.25, 0.5],
  },
  {
    id: 'ghettotech',
    name: 'Ghettotech',
    aliases: ['Detroit Ghettotech'],
    category: 'electro',
    era: '1990s',
    regions: ['Detroit', 'Chicago'],
    summary:
      'Fast, raw, and direct club music connecting Detroit electro, Miami bass energy, and jacking machine rhythm.',
    soundKeywords: ['fast', 'raw', 'electro-bass', 'jacking'],
    visualProfile: { color: '#f472b6', accent: '#38bdf8', pulseSpeed: 1.18, particleDensity: 1.0, motion: 'fragmented' },
    position: [-2.0, 0.65, 0.55],
  },
  {
    id: 'future-garage',
    name: 'Future Garage',
    aliases: [],
    category: 'bass',
    era: '2000s-2010s',
    regions: ['UK'],
    summary:
      'A shadowed UK garage descendant where shuffled drums, vocal ghosts, and bass weight move through post-dubstep atmosphere.',
    soundKeywords: ['shuffled', 'vocal ghosts', 'bass weight', 'shadowed'],
    visualProfile: { color: '#60a5fa', accent: '#f472b6', pulseSpeed: 0.66, particleDensity: 0.86, motion: 'mist' },
    position: [-3.45, -3.85, 0.55],
  },
];

interface CanonicalTrackSeed {
  title: string;
  artist: string;
  year: number;
  note: string;
}

const canonicalTracksByGenre: Record<GenreId, CanonicalTrackSeed> = {
  'detroit-techno': {
    title: 'Strings of Life',
    artist: 'Rhythim Is Rhythim',
    year: 1987,
    note: 'A central Detroit techno reference for machine soul, piano release, and futurist dance emotion.',
  },
  'minimal-techno': {
    title: 'Minus',
    artist: 'Robert Hood',
    year: 1994,
    note: 'A concise reference for stripped Detroit minimalism and reduced functional pressure.',
  },
  'dub-techno': {
    title: 'M4',
    artist: 'Maurizio',
    year: 1995,
    note: 'A canonical dub techno reference for chords, delay, and deep spatial repetition.',
  },
  'acid-techno': {
    title: 'Acperience 1',
    artist: 'Hardfloor',
    year: 1992,
    note: 'A key 303 reference that connects acid house energy to harder techno propulsion.',
  },
  'hard-techno': {
    title: 'The Bells',
    artist: 'Jeff Mills',
    year: 1996,
    note: 'A peak techno reference for pressure, repetition, and direct floor impact.',
  },
  'industrial-techno': {
    title: 'Magneze',
    artist: 'Surgeon',
    year: 1994,
    note: 'A metallic UK techno reference with austere loops and industrial pressure.',
  },
  schranz: {
    title: 'Dandu Groove',
    artist: 'Chris Liebing',
    year: 2001,
    note: 'A hard, compressed reference point for the faster German schranz lineage.',
  },
  'melodic-techno': {
    title: 'Singularity',
    artist: 'Stephan Bodzin',
    year: 2015,
    note: 'A modern melodic techno reference for cinematic arpeggios and long-form tension.',
  },
  'ambient-techno': {
    title: 'Virtual',
    artist: 'The Black Dog',
    year: 1989,
    note: 'A listening-techno reference where rhythm and atmosphere share the structure.',
  },
  electro: {
    title: 'Planet Rock',
    artist: 'Afrika Bambaataa & The Soulsonic Force',
    year: 1982,
    note: 'A foundational electro reference for machine funk, vocoder energy, and breakbeat futurism.',
  },
  'chicago-house': {
    title: 'Your Love',
    artist: 'Frankie Knuckles',
    year: 1987,
    note: 'A classic Chicago house reference for warehouse warmth and direct emotional groove.',
  },
  'acid-house': {
    title: 'Acid Tracks',
    artist: 'Phuture',
    year: 1987,
    note: 'A defining acid house record built around the TB-303 as a club signal.',
  },
  'deep-house': {
    title: 'Can You Feel It',
    artist: 'Mr. Fingers',
    year: 1986,
    note: 'A deep house reference for warm chords, machine soul, and understated lift.',
  },
  ebm: {
    title: 'Headhunter',
    artist: 'Front 242',
    year: 1988,
    note: 'A central EBM reference for sequenced body rhythm and industrial club attitude.',
  },
  'new-beat': {
    title: 'Flesh',
    artist: 'A Split-Second',
    year: 1986,
    note: 'A key Belgian slow-body reference that fed the new beat tempo mutation.',
  },
  trance: {
    title: 'Cafe Del Mar',
    artist: 'Energy 52',
    year: 1993,
    note: 'A trance reference for long euphoric tension and melodic release.',
  },
  'goa-trance': {
    title: 'Teleport',
    artist: 'Man With No Name',
    year: 1994,
    note: 'A Goa trance reference for psychedelic lead motion and extended outdoor energy.',
  },
  'breakbeat-hardcore': {
    title: 'Charly',
    artist: 'The Prodigy',
    year: 1991,
    note: 'A UK rave reference for sampled breaks, stabs, speed, and cartoonish pressure.',
  },
  jungle: {
    title: 'Inner City Life',
    artist: 'Goldie',
    year: 1994,
    note: 'A jungle reference for breakbeat architecture, bass weight, and emotional scale.',
  },
  idm: {
    title: 'Windowlicker',
    artist: 'Aphex Twin',
    year: 1999,
    note: 'A late-1990s IDM reference for fractured programming, digital detail, and listening-club ambiguity.',
  },
  ambient: {
    title: '1/1',
    artist: 'Brian Eno',
    year: 1978,
    note: 'A core ambient reference for music as environment, duration, and spatial perception.',
  },
  'berlin-school': {
    title: 'Phaedra',
    artist: 'Tangerine Dream',
    year: 1974,
    note: 'A Berlin School reference for sequencer drift and long-form electronic motion.',
  },
  'uk-garage': {
    title: 'Never Gonna Let You Go',
    artist: 'Tina Moore',
    year: 1997,
    note: 'A UK garage reference for swing, vocal chop energy, and bassline elasticity.',
  },
  breaks: {
    title: 'Da Antidote',
    artist: 'Stanton Warriors',
    year: 2001,
    note: 'A breaks reference for syncopated club drive and early-2000s breakbeat pressure.',
  },
  microhouse: {
    title: 'Beau Mot Plage',
    artist: 'Isolee',
    year: 1998,
    note: 'A microhouse reference for reduced funk, tiny edits, and close-grained club detail.',
  },
  rominimal: {
    title: 'Slagare',
    artist: 'Rhadoo',
    year: 2007,
    note: 'A Romanian minimal reference for elastic phrasing, restraint, and long-form groove.',
  },
  'hypnotic-techno': {
    title: 'Cassandra',
    artist: 'Donato Dozzy',
    year: 2015,
    note: 'A hypnotic techno reference for deep looping pressure and textural trance.',
  },
  'peak-time-techno': {
    title: 'Your Mind',
    artist: 'Adam Beyer & Bart Skils',
    year: 2018,
    note: 'A modern peak-time reference for polished tension, vocal hook, and large-room techno force.',
  },
  hardgroove: {
    title: 'Manipulated',
    artist: 'Ben Sims',
    year: 2000,
    note: 'A hardgroove reference for percussive funk and rolling techno propulsion.',
  },
  'birmingham-techno': {
    title: 'Magneze',
    artist: 'Surgeon',
    year: 1994,
    note: 'A Birmingham techno reference for metallic minimal pressure and industrial loop discipline.',
  },
  ghettotech: {
    title: 'Ass-N-Titties',
    artist: 'DJ Assault',
    year: 1997,
    note: 'A Detroit ghettotech reference for fast, raw electro-bass club directness.',
  },
  'future-garage': {
    title: 'Archangel',
    artist: 'Burial',
    year: 2007,
    note: 'A future garage reference for shadowed swing, vocal ghosts, and post-dubstep atmosphere.',
  },
};

const additionalTracksByGenre: Record<GenreId, [CanonicalTrackSeed, CanonicalTrackSeed]> = {
  'detroit-techno': [
    { title: 'No UFOs', artist: 'Model 500', year: 1985, note: 'Foundational Juan Atkins record for Detroit machine funk and early techno language.' },
    { title: 'Clear', artist: 'Cybotron', year: 1983, note: 'Electro-techno bridge that shaped Detroit futurism before techno was fully named.' },
  ],
  'minimal-techno': [
    { title: 'Spastik', artist: 'Plastikman', year: 1993, note: 'Minimal percussion study that turns reduction into a hypnotic club weapon.' },
    { title: 'Minus Orange', artist: 'Richie Hawtin', year: 1999, note: 'A precise late-1990s minimal reference for lean pressure and microscopic control.' },
  ],
  'dub-techno': [
    { title: 'Phylyps Trak', artist: 'Basic Channel', year: 1993, note: 'A Basic Channel cornerstone for echo, chords, and submerged Berlin techno architecture.' },
    { title: 'Quadrant Dub', artist: 'Basic Channel', year: 1994, note: 'A deep dub techno reference where rhythm and delay become one pressure field.' },
  ],
  'acid-techno': [
    { title: 'London Acid City', artist: 'Lochi', year: 1996, note: 'A squat-party acid techno anthem with raw 303 drive and London free-party bite.' },
    { title: 'One Night in Hackney', artist: 'Dynamo City', year: 2001, note: 'A cult acid techno narrative record tied to the London acid techno circuit.' },
  ],
  'hard-techno': [
    { title: 'La Real', artist: 'Chris Liebing', year: 1999, note: 'Hard techno reference for compressed drive, impact, and late-1990s European pressure.' },
    { title: 'Energy Flash', artist: 'Joey Beltram', year: 1990, note: 'A hard-edged rave-techno classic whose riff and weight fed harder techno forms.' },
  ],
  'industrial-techno': [
    { title: 'Atol', artist: 'Regis', year: 1996, note: 'Austere industrial techno pressure from the Downwards/Birmingham axis.' },
    { title: 'Blood Witness', artist: 'Ancient Methods', year: 2008, note: 'A modern industrial techno reference for martial rhythm and metallic abrasion.' },
  ],
  schranz: [
    { title: 'Stigmata 10/10', artist: 'Chris Liebing', year: 2000, note: 'A compressed German hard-techno reference adjacent to the schranz vocabulary.' },
    { title: 'Get On Up', artist: 'DJ Rush', year: 1998, note: 'A raw, driving hard techno record associated with the harder looped club lineage.' },
  ],
  'melodic-techno': [
    { title: 'Atlas', artist: 'Tale Of Us', year: 2015, note: 'A modern melodic techno reference for widescreen synth drama and festival-scale tension.' },
    { title: 'Domino', artist: 'Oxia', year: 2006, note: 'A melodic techno/minimal crossover classic with a durable arpeggiated hook.' },
  ],
  'ambient-techno': [
    { title: 'Smokebelch II', artist: 'The Sabres of Paradise', year: 1993, note: 'A downtempo ambient-techno classic where club pulse dissolves into atmosphere.' },
    { title: 'Vletrmx', artist: 'Autechre', year: 1995, note: 'A soft-focus electronic reference for listening techno ambience and suspended rhythm.' },
  ],
  electro: [
    { title: 'Al-Naafiysh (The Soul)', artist: 'Hashim', year: 1983, note: 'A foundational electro record for drum-machine syncopation and robotic funk.' },
    { title: 'Numbers', artist: 'Kraftwerk', year: 1981, note: 'A crucial electronic rhythm template feeding electro, hip-hop, and techno futures.' },
  ],
  'chicago-house': [
    { title: 'Move Your Body', artist: 'Marshall Jefferson', year: 1986, note: 'The house music anthem that defined Chicago piano energy and warehouse release.' },
    { title: 'No Way Back', artist: 'Adonis', year: 1986, note: 'Raw Chicago house minimalism with a bassline and vocal hook built for warehouse pressure.' },
  ],
  'acid-house': [
    { title: 'Voodoo Ray', artist: 'A Guy Called Gerald', year: 1988, note: 'UK acid house classic that carried 303 psychedelia into rave culture.' },
    { title: 'Acid Over', artist: 'Tyree', year: 1987, note: 'Chicago acid house reference for stripped drum-machine swing and TB-303 motion.' },
  ],
  'deep-house': [
    { title: 'Mystery of Love', artist: 'Fingers Inc.', year: 1986, note: 'Deep house foundation for soulful mood, machine groove, and late-night warmth.' },
    { title: 'Promised Land', artist: 'Joe Smooth', year: 1987, note: 'A classic deep house record joining gospel uplift with Chicago club structure.' },
  ],
  ebm: [
    { title: 'Join in the Chant', artist: 'Nitzer Ebb', year: 1987, note: 'A central EBM body-music chant with sequenced force and industrial discipline.' },
    { title: 'Let Your Body Learn', artist: 'Nitzer Ebb', year: 1987, note: 'EBM classic for command vocals, rigid rhythm, and physical club energy.' },
  ],
  'new-beat': [
    { title: 'The Sound of C', artist: "The Confetti's", year: 1988, note: 'Belgian new beat hit for slowed-down club swing and playful machine rhythm.' },
    { title: 'I Sit on Acid', artist: 'Lords of Acid', year: 1988, note: 'Belgian acid/new beat reference with slow, provocative electronic club pressure.' },
  ],
  trance: [
    { title: 'The Age of Love', artist: 'Age of Love', year: 1990, note: 'Early trance blueprint for euphoric repetition and long-form melodic lift.' },
    { title: 'For An Angel', artist: 'Paul van Dyk', year: 1994, note: 'A trance classic for bright melody, emotional lift, and club-scale release.' },
  ],
  'goa-trance': [
    { title: 'Mahadeva', artist: 'Astral Projection', year: 1995, note: 'Goa trance reference for psychedelic leads and high-energy outdoor propulsion.' },
    { title: 'LSD', artist: 'Hallucinogen', year: 1995, note: 'Psychedelic Goa classic for twisting synthesis and hallucinatory arrangement.' },
  ],
  'breakbeat-hardcore': [
    { title: 'Trip II the Moon', artist: 'Acen', year: 1992, note: 'Breakbeat hardcore classic for chopped breaks, rave stabs, and cinematic sampling.' },
    { title: 'Out of Space', artist: 'The Prodigy', year: 1992, note: 'UK rave anthem connecting breakbeat hardcore energy to mainstream club memory.' },
  ],
  jungle: [
    { title: 'Original Nuttah', artist: 'Shy FX & UK Apachi', year: 1994, note: 'Jungle anthem for ragga vocal energy, chopped breaks, and bass pressure.' },
    { title: 'Valley of the Shadows', artist: 'Origin Unknown', year: 1993, note: 'Dark jungle classic for break architecture and atmosphere-heavy bass movement.' },
  ],
  idm: [
    { title: 'Xtal', artist: 'Aphex Twin', year: 1992, note: 'IDM/ambient techno reference for fragile melody, texture, and listening-room rhythm.' },
    { title: 'Roygbiv', artist: 'Boards of Canada', year: 1998, note: 'IDM classic for nostalgic synthesis, compact structure, and home-listening warmth.' },
  ],
  ambient: [
    { title: 'An Ending (Ascent)', artist: 'Brian Eno', year: 1983, note: 'A defining ambient piece for suspended harmony and environmental listening.' },
    { title: '#3', artist: 'Aphex Twin', year: 1994, note: 'Ambient classic for emotional stillness, soft texture, and minimal melodic drift.' },
  ],
  'berlin-school': [
    { title: 'Rubycon', artist: 'Tangerine Dream', year: 1975, note: 'Berlin School landmark for sequenced expansion and long-form electronic motion.' },
    { title: 'E2-E4', artist: 'Manuel Gottsching', year: 1984, note: 'A hypnotic sequencer classic bridging Berlin electronics, minimalism, and dance music.' },
  ],
  'uk-garage': [
    { title: 'RipGroove', artist: 'Double 99', year: 1997, note: 'UK garage/bassline classic for swung drums, pressure bass, and club immediacy.' },
    { title: 'Gabriel', artist: 'Roy Davis Jr. feat. Peven Everett', year: 1996, note: 'A soulful garage classic central to UK garage vocal and swing identity.' },
  ],
  breaks: [
    { title: 'B-Boy Stance', artist: 'Freestylers', year: 1998, note: 'Big beat/breaks reference for hip-hop breaks and late-1990s club punch.' },
    { title: 'Block Rockin Beats', artist: 'The Chemical Brothers', year: 1997, note: 'Breakbeat-driven classic for heavy drums, hooks, and crossover club force.' },
  ],
  microhouse: [
    { title: 'Easy Lee', artist: 'Ricardo Villalobos', year: 2003, note: 'Microhouse landmark for tiny rhythmic details, vocal fragments, and elastic minimal funk.' },
    { title: 'Dexter', artist: 'Ricardo Villalobos', year: 2003, note: 'A microhouse/minimal classic where small edits and groove details carry the track.' },
  ],
  rominimal: [
    { title: 'Sakadat', artist: 'Petre Inspirescu', year: 2009, note: 'Romanian minimal reference for spacious phrasing and deep understated groove.' },
    { title: 'Fizheuer Zieheuer', artist: 'Ricardo Villalobos', year: 2006, note: 'Long-form minimal reference strongly tied to the extended Romanian minimal sensibility.' },
  ],
  'hypnotic-techno': [
    { title: 'S.T.', artist: 'Voices From The Lake', year: 2012, note: 'Hypnotic techno reference for deep looping immersion and aquatic pressure.' },
    { title: 'Lustrations', artist: 'Mike Parker', year: 2013, note: 'Hypnotic techno classic for tunneling synth motion and precise low-end repetition.' },
  ],
  'peak-time-techno': [
    { title: 'Space Date', artist: 'Adam Beyer, Layton Giordani & Green Velvet', year: 2018, note: 'Modern peak-time reference for vocal hooks, polished impact, and big-room drive.' },
    { title: 'Teach Me', artist: 'Adam Beyer', year: 2014, note: 'Peak-time techno reference for rolling tension and streamlined festival-room force.' },
  ],
  hardgroove: [
    { title: 'Remanipulated', artist: 'Ben Sims', year: 2004, note: 'Hardgroove reference for looped funk, percussion pressure, and techno propulsion.' },
    { title: 'Lanicor', artist: 'Umek', year: 2000, note: 'Percussive techno classic connected to the rolling hardgroove era.' },
  ],
  'birmingham-techno': [
    { title: 'Badger Bite', artist: 'Surgeon', year: 1995, note: 'Birmingham techno reference for hard-edged loops and austere machine pressure.' },
    { title: 'Speak to Me', artist: 'Regis', year: 1996, note: 'Downwards/Birmingham reference for stripped industrial techno severity.' },
  ],
  ghettotech: [
    { title: 'Sex on the Beach', artist: 'DJ Assault', year: 1997, note: 'Ghettotech classic for raw Detroit electro-bass, speed, and direct club chants.' },
    { title: 'Shake It Baby', artist: 'DJ Godfather', year: 1999, note: 'Detroit ghettotech reference for fast drums, callouts, and street-level machine funk.' },
  ],
  'future-garage': [
    { title: 'Night Air', artist: 'Jamie Woon', year: 2010, note: 'Future garage-adjacent classic for shadowed swing, space, and vocal atmosphere.' },
    { title: 'Hyph Mngo', artist: 'Joy Orbison', year: 2009, note: 'Post-garage/future-garage touchstone for emotional chords and broken UK swing.' },
  ],
};

export const tracks: Track[] = genres
  .flatMap((genre) => [
    canonicalTrackFor(genre.id),
    ...additionalTracksByGenre[genre.id].map((seed, index) => referenceTrackFor(genre.id, seed, index + 2)),
  ])
  .map((track) => ({ ...track, playbackOptions: playbackOptionsFor(track) }));

function canonicalTrackFor(genreId: GenreId): Track {
  const seed = canonicalTracksByGenre[genreId];

  return {
    id: `${genreId}-canonical`,
    title: seed.title,
    artist: seed.artist,
    year: seed.year,
    duration: 'Source pending',
    genreId,
    audioSrc: '',
    sourceKind: 'curated-reference',
    playbackStatus: 'metadata-only',
    canonical: true,
    note: seed.note,
  };
}

function referenceTrackFor(genreId: GenreId, seed: CanonicalTrackSeed, position: number): Track {
  return {
    id: `${genreId}-reference-${position}`,
    title: seed.title,
    artist: seed.artist,
    year: seed.year,
    duration: 'Platform search',
    genreId,
    audioSrc: '',
    sourceKind: 'curated-reference',
    playbackStatus: 'metadata-only',
    note: seed.note,
  };
}

function playbackOptionsFor(seed: Pick<Track, 'artist' | 'title'>): Track['playbackOptions'] {
  const query = `${seed.artist} ${seed.title}`;
  const encoded = encodeURIComponent(query);

  return [
    {
      group: 'platform-embed',
      provider: 'spotify',
      label: 'Spotify embed',
      status: 'confirmed-search-url',
      authorization: 'platform-managed',
      authorizationNote: 'Use the platform embed/player; do not download or self-host the recording.',
      url: `https://open.spotify.com/search/${encodeURIComponent(query)}`,
    },
    {
      group: 'platform-embed',
      provider: 'youtube',
      label: 'YouTube embed',
      status: 'confirmed-search-url',
      authorization: 'platform-managed',
      authorizationNote: 'Use the YouTube embedded player and keep playback inside YouTube terms.',
      url: `https://www.youtube.com/results?search_query=${encoded}`,
    },
  ];
}

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
  rel('minimal-to-microhouse', 'minimal-techno', 'microhouse', 'history', 4, true, 'Minimal enters house detail'),
  rel('microhouse-to-rominimal', 'microhouse', 'rominimal', 'history', 4, true, 'Micro detail stretches long'),
  rel('minimal-to-hypnotic', 'minimal-techno', 'hypnotic-techno', 'history', 4, true, 'Reduction deepens into hypnosis'),
  rel('hard-to-peak-time', 'hard-techno', 'peak-time-techno', 'history', 3, true, 'Modern large-room pressure'),
  rel('detroit-to-hardgroove', 'detroit-techno', 'hardgroove', 'history', 3, true, 'Funk pressure accelerates'),
  rel('birmingham-to-industrial', 'birmingham-techno', 'industrial-techno', 'history', 5, true, 'Austere UK metal route'),
  rel('electro-to-ghettotech', 'electro', 'ghettotech', 'history', 4, true, 'Fast Detroit bass mutation'),
  rel('ukg-to-future-garage', 'uk-garage', 'future-garage', 'history', 4, true, 'Swing enters shadow space'),

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
  rel('rominimal-to-dub-sound', 'rominimal', 'dub-techno', 'sound', 3, false, 'Deep patience and sub detail'),
  rel('hypnotic-to-dub-sound', 'hypnotic-techno', 'dub-techno', 'sound', 4, false, 'Pressure through space'),
  rel('hardgroove-to-peak-sound', 'hardgroove', 'peak-time-techno', 'sound', 3, false, 'Groove versus impact'),
  rel('birmingham-to-hard-sound', 'birmingham-techno', 'hard-techno', 'sound', 4, false, 'Looped metallic pressure'),
  rel('ghettotech-to-acid-sound', 'ghettotech', 'acid-techno', 'sound', 3, false, 'Raw machine bite'),
  rel('future-garage-to-idm-sound', 'future-garage', 'idm', 'sound', 3, false, 'Broken emotional texture'),

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
  rel('romania-minimal-scene', 'rominimal', 'minimal-techno', 'scene', 4, false, 'Romanian minimal circuit'),
  rel('birmingham-uk-scene', 'birmingham-techno', 'ebm', 'scene', 3, false, 'UK industrial club pressure'),
  rel('detroit-ghetto-scene', 'ghettotech', 'detroit-techno', 'scene', 4, false, 'Detroit street-level machine funk'),
  rel('future-garage-uk-scene', 'future-garage', 'uk-garage', 'scene', 4, false, 'Post-garage UK continuum'),
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
