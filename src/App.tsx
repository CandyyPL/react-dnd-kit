import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { useState } from 'react';
import Column from '@/components/Column.tsx';
import { arrayMove } from '@dnd-kit/sortable';

export type TaskType = {
  id: number;
  content: string;
};

export default function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 0, content: 'Lorem ipsum.' },
    { id: 1, content: 'Dolor sit amet.' },
    { id: 2, content: 'Consectetur adipiscing elit.' },
  ]);

  const getTaskPosition = (id: number) => tasks.findIndex((task) => task.id === id);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;

    if (!over || active.id === over.id) return;

    setTasks(() => {
      const originalPosition = getTaskPosition(active.id as number);
      const newPosition = getTaskPosition(over.id as number);

      return arrayMove(tasks, originalPosition, newPosition);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-10 bg-zinc-900 font-sans'>
      <h1 className='font-serif text-6xl font-bold text-zinc-200'>Task List</h1>
      <DndContext
        sensors={sensors}
        onDragEnd={(e) => handleDragEnd(e)}
        collisionDetection={closestCorners}>
        <Column tasks={tasks} />
      </DndContext>
    </main>
  );
}
