import { describe, expect, it } from 'vitest';
import {
  getSceneNodeById,
  getSceneRelationshipsForNode,
  sceneNodes,
  sceneRelationships,
} from './sceneData';

describe('scene culture dataset', () => {
  it('contains the first cultural map node set', () => {
    expect(sceneNodes.filter((node) => node.type === 'city').map((node) => node.id)).toEqual([
      'detroit',
      'chicago',
      'berlin',
      'london',
      'birmingham',
      'rotterdam',
      'belgium',
      'goa',
    ]);
    expect(getSceneNodeById('underground-resistance')?.name).toBe('Underground Resistance');
    expect(getSceneNodeById('juan-atkins')?.type).toBe('artist');
    expect(getSceneNodeById('detroit-techno-bridge')?.type).toBe('genre');
  });

  it('gives every scene node cultural card content and platform links', () => {
    for (const node of sceneNodes) {
      expect(node.summary.length).toBeGreaterThan(40);
      expect(node.soundSignature.length).toBeGreaterThan(0);
      expect(node.position).toHaveLength(3);
      expect(node.links.map((link) => link.provider)).toEqual(['spotify', 'youtube']);
      expect(node.links.every((link) => link.url?.startsWith('https://') === true)).toBe(true);
    }
  });

  it('connects scene nodes with cultural relationship semantics', () => {
    const nodeIds = new Set(sceneNodes.map((node) => node.id));
    const relationshipTypes = new Set(sceneRelationships.map((relationship) => relationship.type));

    expect(relationshipTypes).toEqual(new Set(['origin', 'influence', 'scene', 'release', 'migration']));
    expect(getSceneRelationshipsForNode('detroit').length).toBeGreaterThanOrEqual(4);

    for (const relationship of sceneRelationships) {
      expect(nodeIds.has(relationship.source)).toBe(true);
      expect(nodeIds.has(relationship.target)).toBe(true);
      expect(relationship.description.length).toBeGreaterThan(20);
    }
  });
});
