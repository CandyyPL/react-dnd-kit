import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  DragOverlay,
  type DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  type UniqueIdentifier,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Column, { type ColumnType } from '@/components/Column.tsx';

const COLUMNS = [
  {
    id: 'c0',
    name: 'First',
    items: [
      {
        id: 'i0',
        content: 'Item 0',
      },
      {
        id: 'i1',
        content: 'Item 1',
      },
      {
        id: 'i2',
        content: 'Item 2',
      },
    ],
  },
  {
    id: 'c1',
    name: 'Second',
    items: [],
  },
  {
    id: 'c2',
    name: 'Third',
    items: [],
  },
];

export default function Kanban() {
  const [columns, setColumns] = useState<ColumnType[]>(COLUMNS);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeItemId = active.id;
    const overId = over.id;

    const activeColumnId = getColumnId(activeItemId);
    const overColumnId = getColumnId(overId);

    if (!activeColumnId || !overColumnId) return;
    if (activeColumnId === overColumnId) return;

    setColumns((prev) => {
      const activeColumn = prev.find((col) => col.id === activeColumnId);
      if (!activeColumn) return prev;

      const activeItem = activeColumn.items.find((item) => item.id === activeItemId);
      if (!activeItem) return prev;

      return prev.map((col) => {
        if (col.id === activeColumnId) {
          return { ...col, items: col.items.filter((item) => item.id !== activeItemId) };
        }

        if (col.id === overColumnId) {
          if (overId === overColumnId) {
            return {
              ...col,
              items: [...col.items, activeItem],
            };
          }

          const overItemIndex = col.items.findIndex((item) => item.id === overId);

          if (overItemIndex !== -1) {
            return {
              ...col,
              items: [
                ...col.items.slice(0, overItemIndex + 1),
                activeItem,
                ...col.items.slice(overItemIndex + 1),
              ],
            };
          }
        }

        return col;
      });
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeItemId = active.id;
    const overId = over.id;

    const activeColumnId = getColumnId(activeItemId);
    const overColumnId = getColumnId(overId);

    if (!activeColumnId || !overColumnId) {
      setActiveId(null);
      return;
    }

    if (activeColumnId === overColumnId && activeItemId !== overId) {
      const activeColumnIndex = columns.findIndex((col) => col.id === activeColumnId);
      if (activeColumnIndex === -1) {
        setActiveId(null);
        return;
      }

      const activeColumn = columns[activeColumnIndex];

      const activeIndex = activeColumn.items.findIndex((item) => item.id === activeItemId);
      const overIndex = activeColumn.items.findIndex((item) => item.id === overId);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newItems = arrayMove(activeColumn.items, activeIndex, overIndex);

        setColumns((prev) => {
          return prev.map((col, idx) => {
            if (idx === activeColumnIndex) {
              return { ...col, items: newItems };
            }

            return col;
          });
        });
      }
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const getColumnId = (itemId: UniqueIdentifier): UniqueIdentifier | null => {
    if (columns.some((col) => col.id === itemId)) return itemId;

    return columns.find((col) => col.items.some((item) => item.id === itemId))?.id ?? null;
  };

  const getActiveItem = () => {
    for (const column of columns) {
      const item = column.items.find((item) => item.id === activeId);
      if (item) return item;
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
    useSensor(TouchSensor)
  );

  return (
    <section className='flex h-full flex-col items-center justify-center gap-10 font-sans'>
      <h1 className='font-serif text-6xl font-bold text-zinc-200'>Kanban Board</h1>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}>
        <div className='flex flex-row gap-4'>
          {columns.map((col) => (
            <Column
              key={col.id}
              column={col}
            />
          ))}
        </div>
        <DragOverlay
          dropAnimation={{
            duration: 200,
          }}>
          {activeId ? (
            <div className='flex h-16 cursor-grabbing items-center rounded-md bg-black p-4 text-white'>
              {getActiveItem()?.content}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
