import { useRef, useState, type PointerEvent } from 'react';

export function useDraggablePanel() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ dragging: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  function startDrag(event: PointerEvent<HTMLElement>) {
    dragRef.current = {
      dragging: true,
      startX: event.clientX,
      startY: event.clientY,
      originX: offset.x,
      originY: offset.y,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);

    const move = (moveEvent: globalThis.PointerEvent) => {
      if (!dragRef.current.dragging) return;
      setOffset({
        x: clamp(dragRef.current.originX + moveEvent.clientX - dragRef.current.startX, -window.innerWidth + 120, window.innerWidth - 120),
        y: clamp(dragRef.current.originY + moveEvent.clientY - dragRef.current.startY, -window.innerHeight + 120, window.innerHeight - 120),
      });
    };
    const end = () => {
      dragRef.current.dragging = false;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', end);
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
  }

  return {
    panelStyle: { transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` },
    startDrag,
  };
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}
