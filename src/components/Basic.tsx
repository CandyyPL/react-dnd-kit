import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
  pointerWithin,
} from '@dnd-kit/core';
import { useState } from 'react';
import * as React from 'react';

function Draggable() {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable',
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className={`flex h-20 w-50 cursor-grab items-center justify-center rounded-md bg-blue-400 px-6 py-4 text-lg font-medium text-black ${isDragging ? 'cursor-grabbing' : null}`}>
      DRAGGABLE
    </div>
  );
}

function Droppable({ children }: { children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex h-80 w-80 flex-col items-center justify-center rounded-md bg-zinc-400 text-4xl font-medium text-zinc-800/50 ${isOver ? 'border-2 border-amber-400 bg-zinc-500' : null}`}>
      {children || 'DROPZONE'}
    </div>
  );
}

export default function Basic() {
  const [isDropped, setIsDropped] = useState(false);

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    } else {
      setIsDropped(false);
    }
  };

  return (
    <main className='flex h-full flex-col items-center justify-center gap-10 font-sans'>
      <h1 className='font-serif text-6xl font-bold text-zinc-200'>Basic Drag & Drop</h1>
      <DndContext
        onDragEnd={(e) => handleDragEnd(e)}
        collisionDetection={pointerWithin}>
        {!isDropped && <Draggable />}
        <Droppable>{isDropped && <Draggable />}</Droppable>
      </DndContext>
    </main>
  );
}
