import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { UniqueIdentifier } from '@dnd-kit/core';

type Props = {
  item: Item;
};

export type Item = {
  id: UniqueIdentifier;
  content: string;
};

export default function ListItem({ item }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex h-16 cursor-grab items-center rounded-md bg-black p-4 text-white ${isDragging && 'border-2 border-dashed border-zinc-200 opacity-50'}`}>
      {!isDragging && item.content}
    </div>
  );
}
