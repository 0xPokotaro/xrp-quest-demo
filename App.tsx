import React, { useState } from 'react';
import { Task, TaskStatus, Transaction, Tab } from './types';
import { INITIAL_TASKS } from './constants/tasks';
import BalanceHeader from './components/BalanceHeader';
import TaskList from './components/TaskList';
import HistoryList from './components/HistoryList';
import MyPageContent from './components/MyPageContent';
import BottomNav from './components/BottomNav';
import TaskDetailModal from './components/TaskDetailModal';

function generateTxId(): string {
  return Math.random().toString(36).substring(2, 11);
}

const App: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress] = useState('rXRP...Tokyo2026');
  const [xrpBalance, setXrpBalance] = useState(150.25);
  const [rlusdBalance, setRlusdBalance] = useState(100.0);

  const [activeTab, setActiveTab] = useState<Tab>('Tasks');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [history, setHistory] = useState<Transaction[]>([]);

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const handleConnect = () => setIsConnected(true);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleClaimAirdrop = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (task.rewardType === 'XRP') setXrpBalance((b) => b + task.rewardAmount);
    if (task.rewardType === 'RLUSD') setRlusdBalance((b) => b + task.rewardAmount);

    setHistory((h) => [
      {
        id: generateTxId(),
        timestamp: new Date(),
        type: 'AIRDROP',
        asset: task.rewardType,
        amount: task.rewardAmount,
        status: 'SUCCESS',
      },
      ...h,
    ]);

    setTasks((prev) => prev.map((t) => (t.id === taskId ? { ...t, status: TaskStatus.CLAIMED } : t)));
    setIsTaskModalOpen(false);
  };

  const claimedCount = tasks.filter((t) => t.status === TaskStatus.CLAIMED).length;

  return (
    <div className="max-w-md mx-auto min-h-screen bg-zinc-950 flex flex-col relative overflow-hidden">
      <div className="fixed -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-1/2 -left-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <BalanceHeader
        isConnected={isConnected}
        walletAddress={walletAddress}
        xrpBalance={xrpBalance}
        rlusdBalance={rlusdBalance}
        onConnect={handleConnect}
      />

      <main className="flex-1">
        {activeTab === 'Tasks' && <TaskList tasks={tasks} onTaskClick={handleTaskClick} />}
        {activeTab === 'History' && <HistoryList history={history} />}
        {activeTab === 'MyPage' && <MyPageContent claimedCount={claimedCount} />}
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      <TaskDetailModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        task={selectedTask}
        onClaimReward={handleClaimAirdrop}
      />
    </div>
  );
};

export default App;
