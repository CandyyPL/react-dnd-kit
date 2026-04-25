import { useState } from 'react';
import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragStartEvent,
  DragOverlay,
  type UniqueIdentifier,
} from '@dnd-kit/core';
import Column from '@/components/Column.tsx';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import type { Item } from '@/components/ListItem.tsx';

export default function List() {
  const [items, setItems] = useState<Item[]>([
    { id: '0', content: 'Item 0' },
    { id: '1', content: 'Item 1' },
    { id: '2', content: 'Item 2' },
    { id: '3', content: 'Item 3' },
    { id: '4', content: 'Item 4' },
  ]);

  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);

    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      setItems(() => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const getActiveItem = () => items.find((item) => item.id === activeId);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  return (
    <main className='flex h-full flex-col items-center justify-center gap-10 font-sans'>
      <h1 className='font-serif text-6xl font-bold text-zinc-200'>Sortable List</h1>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
        collisionDetection={closestCorners}>
        <SortableContext
          items={items.map((item) => item.id)}
          strategy={verticalListSortingStrategy}>
          <Column column={{ id: 'col', name: 'List', items }} />
        </SortableContext>
        <DragOverlay
          adjustScale={true}
          dropAnimation={{
            duration: 150,
          }}>
          {activeId ? (
            <div className='flex h-16 cursor-grabbing items-center rounded-md bg-black p-4 text-white'>
              {getActiveItem()?.content}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </main>
  );
}
