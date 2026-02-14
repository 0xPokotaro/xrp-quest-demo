
import React, { useState, useEffect, useCallback } from 'react';
import { Task, TaskStatus, Transaction, Tab } from './types';
import Modal from './components/Modal';
import { getConciergeInsight } from './services/geminiService';

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'ブース訪問: XRPL Labs', description: 'XRPL Labsのブースにて最新のXumm Walletデモを体験し、QRコードをスキャンしてください。', rewardType: 'RLUSD', rewardAmount: 10, status: TaskStatus.PENDING, category: 'Booth', location: 'Expo Hall A' },
  { id: '2', title: '基調講演への出席', description: 'メインステージでの10:00からの基調講演に参加し、出席確認を行ってください。', rewardType: 'XRP', rewardAmount: 5, status: TaskStatus.COMPLETED, category: 'Session', location: 'Main Stage' },
  { id: '3', title: 'ネットワーキング', description: 'カンファレンス公式X(Twitter)アカウントをフォローし、#XRPTokyo2026 で投稿してください。', rewardType: 'RLUSD', rewardAmount: 20, status: TaskStatus.PENDING, category: 'Social' },
  { id: '4', title: 'フィードバック回答', description: '本日のセッションに関するアンケートに回答して特典を受け取りましょう。', rewardType: 'XRP', rewardAmount: 2.5, status: TaskStatus.PENDING, category: 'Session' },
];

const App: React.FC = () => {
  // Wallet State
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('rXRP...Tokyo2026');
  const [xrpBalance, setXrpBalance] = useState(150.25);
  const [rlusdBalance, setRlusdBalance] = useState(100.00);

  // App State
  const [activeTab, setActiveTab] = useState<Tab>('Tasks');
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [history, setHistory] = useState<Transaction[]>([]);
  const [insight, setInsight] = useState('カンファレンスを楽しんでください！');

  // UI State
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Load Insight
  useEffect(() => {
    const fetchInsight = async () => {
      if (isConnected) {
        const text = await getConciergeInsight('Explorer', { xrp: xrpBalance, rlusd: rlusdBalance });
        setInsight(text || '');
      }
    };
    fetchInsight();
  }, [isConnected]);

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsTaskModalOpen(true);
  };

  const handleClaimAirdrop = (taskId: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id === taskId) {
        // Apply rewards
        if (t.rewardType === 'XRP') setXrpBalance(b => b + t.rewardAmount);
        if (t.rewardType === 'RLUSD') setRlusdBalance(b => b + t.rewardAmount);
        
        // Record history
        const newTx: Transaction = {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
          type: 'AIRDROP',
          asset: t.rewardType,
          amount: t.rewardAmount,
          status: 'SUCCESS'
        };
        setHistory(h => [newTx, ...h]);

        return { ...t, status: TaskStatus.CLAIMED };
      }
      return t;
    }));
    setIsTaskModalOpen(false);
  };

  // Components within App for easier state access
  const RenderBalanceHeader = () => (
    <div className="sticky top-0 z-30 p-4 pt-8 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <span className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Event Token Balance</span>
          <div className="flex items-baseline space-x-2 mt-1">
             <h1 className="text-3xl font-bold tracking-tight text-white mono">{rlusdBalance.toFixed(2)}</h1>
             <span className="text-sm font-semibold text-blue-400">RLUSD</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
           <span className="text-xs text-zinc-500 font-medium uppercase tracking-widest">Network Asset</span>
           <div className="flex items-baseline space-x-2 mt-1">
             <h1 className="text-lg font-bold tracking-tight text-zinc-300 mono">{xrpBalance.toFixed(2)}</h1>
             <span className="text-xs font-semibold text-zinc-400">XRP</span>
          </div>
        </div>
      </div>
      
      {!isConnected ? (
        <button 
          onClick={handleConnect}
          className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
        >
          Connect Wallet
        </button>
      ) : (
        <div className="flex items-center justify-between p-3 glass rounded-2xl">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center">
               <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
            </div>
            <span className="text-sm font-medium text-zinc-300 mono">{walletAddress}</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
      )}
    </div>
  );

  const RenderTasks = () => (
    <div className="px-4 py-6 space-y-4 pb-24">
      <div className="p-4 rounded-2xl glass border-blue-900/30">
        <p className="text-xs font-bold text-blue-400 mb-1">AI INSIGHT</p>
        <p className="text-sm text-zinc-200 italic">"{insight}"</p>
      </div>

      <h2 className="text-lg font-bold text-zinc-100 flex items-center space-x-2">
        <span>Available Tasks</span>
        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400 font-mono">
          {tasks.filter(t => t.status !== TaskStatus.CLAIMED).length}
        </span>
      </h2>

      {tasks.map(task => (
        <div 
          key={task.id}
          onClick={() => handleTaskClick(task)}
          className={`relative p-5 rounded-2xl border transition-all active:scale-[0.97] ${
            task.status === TaskStatus.CLAIMED 
              ? 'bg-zinc-900/50 border-zinc-900 opacity-60' 
              : 'glass border-zinc-800 shadow-xl'
          }`}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col space-y-1">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded w-fit ${
                task.category === 'Booth' ? 'bg-indigo-500/20 text-indigo-400' :
                task.category === 'Session' ? 'bg-amber-500/20 text-amber-400' :
                'bg-purple-500/20 text-purple-400'
              }`}>
                {task.category}
              </span>
              <h3 className="font-bold text-zinc-100">{task.title}</h3>
              {task.location && (
                <div className="flex items-center text-xs text-zinc-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {task.location}
                </div>
              )}
            </div>
            
            <div className="text-right">
              <p className="text-sm font-bold text-emerald-400 mono">+{task.rewardAmount}</p>
              <p className="text-[10px] text-zinc-500 mono">{task.rewardType}</p>
            </div>
          </div>
          
          <div className="mt-4 flex items-center justify-between">
             <div className="flex items-center space-x-1">
                {task.status === TaskStatus.COMPLETED && (
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-bold">READY TO CLAIM</span>
                )}
                {task.status === TaskStatus.CLAIMED && (
                  <span className="text-[10px] bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded font-bold">REWARDED</span>
                )}
             </div>
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="m9 18 6-6-6-6"/></svg>
          </div>
        </div>
      ))}
    </div>
  );

  const RenderHistory = () => (
    <div className="px-4 py-6 space-y-4 pb-24">
      <h2 className="text-lg font-bold text-zinc-100">Transaction History</h2>
      {history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9"></path><polyline points="16 5 12 9 8 5"></polyline></svg>
          <p className="text-sm">No activity recorded yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map(tx => (
            <div key={tx.id} className="p-4 glass rounded-2xl border-zinc-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-200">{tx.type}</p>
                  <p className="text-[10px] text-zinc-500 uppercase">{tx.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-white mono">+{tx.amount}</p>
                <p className="text-[10px] text-zinc-400 mono">{tx.asset}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const RenderMyPage = () => (
    <div className="px-4 py-6 space-y-6 pb-24">
      <div className="flex flex-col items-center py-8">
        <div className="w-24 h-24 rounded-3xl bg-zinc-800 border-4 border-zinc-900 shadow-2xl overflow-hidden mb-4 p-4">
           <img src="https://picsum.photos/seed/xrp/200" alt="Avatar" className="w-full h-full rounded-2xl object-cover opacity-80" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight">XRPL Explorer</h2>
        <p className="text-sm text-zinc-500 mono mt-1">rXRP...Tokyo2026</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
         <div className="p-4 glass rounded-3xl border-zinc-800">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">Tasks Done</p>
            <p className="text-2xl font-bold mono">{tasks.filter(t => t.status === TaskStatus.CLAIMED).length}</p>
         </div>
         <div className="p-4 glass rounded-3xl border-zinc-800">
            <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">NFT Items</p>
            <p className="text-2xl font-bold mono">3</p>
         </div>
      </div>

      <div className="space-y-2">
        <button className="w-full p-4 glass rounded-2xl border-zinc-800 flex items-center justify-between group active:scale-[0.98] transition-all">
          <span className="font-medium text-zinc-200">Account Security</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <button className="w-full p-4 glass rounded-2xl border-zinc-800 flex items-center justify-between group active:scale-[0.98] transition-all">
          <span className="font-medium text-zinc-200">Export Keys</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="m9 18 6-6-6-6"/></svg>
        </button>
        <button className="w-full p-4 glass rounded-2xl border-zinc-800 flex items-center justify-between group active:scale-[0.98] transition-all">
          <span className="font-medium text-zinc-200">Help & Support</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="m9 18 6-6-6-6"/></svg>
        </button>
      </div>

      <button className="w-full py-4 text-rose-500 font-bold bg-rose-500/10 rounded-2xl border border-rose-500/20 active:scale-[0.98] transition-all">
        Disconnect Wallet
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto min-h-screen bg-zinc-950 flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="fixed -top-24 -right-24 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed top-1/2 -left-32 w-80 h-80 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <RenderBalanceHeader />

      <main className="flex-1">
        {activeTab === 'Tasks' && <RenderTasks />}
        {activeTab === 'History' && <RenderHistory />}
        {activeTab === 'MyPage' && <RenderMyPage />}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 px-6 flex items-center justify-between z-40">
        <button 
          onClick={() => setActiveTab('Tasks')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'Tasks' ? 'text-blue-500' : 'text-zinc-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
          <span className="text-[10px] font-bold uppercase">Tasks</span>
        </button>
        <button 
          onClick={() => setActiveTab('History')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'History' ? 'text-blue-500' : 'text-zinc-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9"></path><polyline points="16 5 12 9 8 5"></polyline></svg>
          <span className="text-[10px] font-bold uppercase">History</span>
        </button>
        <button 
          onClick={() => setActiveTab('MyPage')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'MyPage' ? 'text-blue-500' : 'text-zinc-500'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
          <span className="text-[10px] font-bold uppercase">Profile</span>
        </button>
      </nav>

      {/* Detail Modal */}
      <Modal 
        isOpen={isTaskModalOpen} 
        onClose={() => setIsTaskModalOpen(false)} 
        title="Task Detail"
      >
        {selectedTask && (
          <div className="space-y-6">
            <div className="flex flex-col space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded w-fit bg-blue-500/20 text-blue-400">
                {selectedTask.category}
              </span>
              <h3 className="text-2xl font-bold leading-tight">{selectedTask.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{selectedTask.description}</p>
            </div>

            <div className="p-4 glass rounded-2xl border-zinc-800 bg-zinc-800/20">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-400">Reward</span>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-emerald-400 mono">{selectedTask.rewardAmount}</span>
                  <span className="text-xs font-bold text-zinc-500 mono">{selectedTask.rewardType}</span>
                </div>
              </div>
            </div>

            {selectedTask.status === TaskStatus.PENDING && (
              <button 
                className="w-full py-4 bg-zinc-800 text-zinc-400 font-bold rounded-2xl border border-zinc-700 opacity-50 cursor-not-allowed"
                disabled
              >
                Scan QR to Complete
              </button>
            )}

            {selectedTask.status === TaskStatus.COMPLETED && (
              <button 
                onClick={() => handleClaimAirdrop(selectedTask.id)}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/40 active:scale-[0.98] transition-all"
              >
                Claim Reward
              </button>
            )}

            {selectedTask.status === TaskStatus.CLAIMED && (
              <div className="w-full py-4 bg-emerald-500/10 text-emerald-400 font-bold rounded-2xl border border-emerald-500/20 flex items-center justify-center space-x-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Reward Claimed</span>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default App;
