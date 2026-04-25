import { type UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import ListItem, { type Item } from '@/components/ListItem.tsx';
import { SortableContext } from '@dnd-kit/sortable';

type Props = {
  column: ColumnType;
};

export type ColumnType = {
  id: UniqueIdentifier;
  name: string;
  items: Item[];
};

export default function Column({ column }: Props) {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      className='flex min-h-120 w-80 flex-col gap-4 rounded-md bg-zinc-600 p-4'>
      <h1 className='text-2xl font-medium text-white'>{column.name}</h1>
      <SortableContext items={column.items}>
        {column.items.map((item) => (
          <ListItem
            key={item.id}
            item={item}
          />
        ))}
      </SortableContext>
    </div>
  );
}
