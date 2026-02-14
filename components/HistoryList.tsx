import React from 'react';
import { Transaction } from '../types';
import { formatReward } from '../utils/category';

interface HistoryListProps {
  history: Transaction[];
}

const HistoryList: React.FC<HistoryListProps> = ({ history }) => (
  <div className="px-4 py-6 space-y-4 pb-24">
    <h2 className="text-lg font-bold text-zinc-100">Transaction History</h2>
    {history.length === 0 ? (
      <div className="flex flex-col items-center justify-center py-20 text-zinc-600">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="mb-4 opacity-20">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9" />
          <polyline points="16 5 12 9 8 5" />
        </svg>
        <p className="text-sm">No activity recorded yet.</p>
      </div>
    ) : (
      <div className="space-y-3">
        {history.map((tx) => (
          <div key={tx.id} className="p-4 glass rounded-2xl border-zinc-800 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
                  <polyline points="17 6 23 6 23 12" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-200">{tx.type}</p>
                <p className="text-[10px] text-zinc-500 uppercase">{tx.timestamp.toLocaleTimeString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-white mono">+{formatReward(tx.amount)}</p>
              <p className="text-[10px] text-zinc-400 mono">{tx.asset}</p>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default HistoryList;
