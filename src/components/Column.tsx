import type { TaskType } from '@/App.tsx';
import Task from '@/components/Task';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';

type Props = {
  tasks: TaskType[];
};

export default function Column({ tasks }: Props) {
  return (
    <div className='flex min-h-80 w-80 flex-col gap-4 rounded-md bg-zinc-600 p-4'>
      <SortableContext
        items={tasks}
        strategy={verticalListSortingStrategy}>
        {tasks.map((task) => (
          <Task
            task={task}
            key={task.id}
          />
        ))}
      </SortableContext>
    </div>
  );
}
