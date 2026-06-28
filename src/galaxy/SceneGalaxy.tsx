import { OrbitControls, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRef, type Dispatch } from 'react';
import { MOUSE, TOUCH } from 'three';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { sceneNodes, sceneRelationships } from '../data/sceneData';
import type { GalaxyAction, GalaxyState } from '../state/galaxyState';
import { SceneNodeObject } from './SceneNodeObject';
import { SceneRelationshipLayer } from './SceneRelationshipLayer';
import { TrackpadViewportControls } from './TrackpadViewportControls';

interface SceneGalaxyProps {
  state: GalaxyState;
  dispatch: Dispatch<GalaxyAction>;
}

export function SceneGalaxy({ state, dispatch }: SceneGalaxyProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);
  const highlightedNodeId = state.hoveredSceneNodeId ?? state.selectedSceneNodeId;

  return (
    <Canvas camera={{ position: [-0.5, 0.45, 7.6], fov: 58 }} dpr={[1, 1.8]} gl={{ antialias: true }} shadows>
      <color attach="background" args={['#030307']} />
      <fog attach="fog" args={['#030307', 7, 20]} />
      <ambientLight intensity={0.24} />
      <directionalLight position={[3.5, 4.2, 5.5]} intensity={1.55} color="#ffffff" castShadow />
      <pointLight position={[0, 3, 4]} intensity={1.2} color="#38bdf8" />
      <pointLight position={[-4, -2, -3]} intensity={0.86} color="#ec4899" />
      <Stars radius={18} depth={8} count={750} factor={2} saturation={0} fade speed={0.15} />
      <SceneRelationshipLayer relationships={sceneRelationships} highlightedNodeId={highlightedNodeId} />
      {sceneNodes.map((node) => (
        <SceneNodeObject
          key={node.id}
          node={node}
          active={state.selectedSceneNodeId === node.id}
          onHover={(nodeId) => dispatch({ type: 'hoverSceneNode', nodeId })}
          onSelect={(nodeId) => dispatch({ type: 'selectSceneNode', nodeId })}
        />
      ))}
      <TrackpadViewportControls controlsRef={controlsRef} />
      <OrbitControls
        ref={controlsRef}
        enablePan
        enableRotate
        minDistance={2.2}
        maxDistance={16}
        panSpeed={0.85}
        rotateSpeed={0.45}
        zoomSpeed={0.72}
        screenSpacePanning
        enableDamping
        dampingFactor={0.08}
        mouseButtons={{ LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }}
        touches={{ ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }}
      />
    </Canvas>
  );
}
