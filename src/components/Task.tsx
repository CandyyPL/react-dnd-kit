import type { TaskType } from '@/App.tsx';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

type Props = {
  task: TaskType;
};

export default function Task({ task }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      key={task.id}
      style={style}
      className='cursor-pointer touch-none rounded-xl bg-zinc-300 p-4 shadow-lg'>
      {task.content}
    </div>
  );
}
