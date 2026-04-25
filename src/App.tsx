import { useState } from 'react';
import Button from '@/components/Button.tsx';
import Basic from '@/components/Basic.tsx';
import List from '@/components/List.tsx';
import Kanban from '@/components/Kanban.tsx';

const Tab = {
  BASIC: 0,
  LIST: 1,
  KANBAN: 2,
};

type Tab = (typeof Tab)[keyof typeof Tab];

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.BASIC);

  return (
    <main className='flex h-full flex-col items-center bg-zinc-800 p-10'>
      <div className='flex flex-row gap-4'>
        <Button onClick={() => setActiveTab(Tab.BASIC)}>BASIC</Button>
        <Button onClick={() => setActiveTab(Tab.LIST)}>LIST</Button>
        <Button onClick={() => setActiveTab(Tab.KANBAN)}>KANBAN</Button>
      </div>
      {activeTab === Tab.BASIC && <Basic />}
      {activeTab === Tab.LIST && <List />}
      {activeTab === Tab.KANBAN && <Kanban />}
    </main>
  );
}
