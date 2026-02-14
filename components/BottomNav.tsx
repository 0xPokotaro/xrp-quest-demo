import React from 'react';
import { Tab } from '../types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => (
  <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto h-20 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-900 px-6 flex items-center justify-between z-40">
    <button
      onClick={() => onTabChange('Tasks')}
      className={`flex flex-col items-center space-y-1 ${activeTab === 'Tasks' ? 'text-blue-500' : 'text-zinc-500'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
      <span className="text-[10px] font-bold uppercase">Tasks</span>
    </button>
    <button
      onClick={() => onTabChange('History')}
      className={`flex flex-col items-center space-y-1 ${activeTab === 'History' ? 'text-blue-500' : 'text-zinc-500'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9" />
        <polyline points="16 5 12 9 8 5" />
      </svg>
      <span className="text-[10px] font-bold uppercase">History</span>
    </button>
    <button
      onClick={() => onTabChange('MyPage')}
      className={`flex flex-col items-center space-y-1 ${activeTab === 'MyPage' ? 'text-blue-500' : 'text-zinc-500'}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
      <span className="text-[10px] font-bold uppercase">Profile</span>
    </button>
  </nav>
);

export default BottomNav;
