import React from 'react';

interface BalanceHeaderProps {
  isConnected: boolean;
  walletAddress: string;
  xrpBalance: number;
  rlusdBalance: number;
  onConnect: () => void;
}

const BalanceHeader: React.FC<BalanceHeaderProps> = ({
  isConnected,
  walletAddress,
  xrpBalance,
  rlusdBalance,
  onConnect,
}) => (
  <div className="sticky top-0 z-30 p-4 pt-8 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
    {!isConnected ? (
      <button
        onClick={onConnect}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
      >
        Connect Wallet
      </button>
    ) : (
      <>
        <div className="flex items-center justify-between p-3 glass rounded-2xl mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <span className="text-sm font-medium text-zinc-300 mono">{walletAddress}</span>
          </div>
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex flex-col min-w-0">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">XRP</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold tracking-tight text-white mono truncate">{xrpBalance.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col min-w-0">
            <span className="text-[10px] text-zinc-500 font-semibold uppercase tracking-widest">RLUSD</span>
            <div className="flex items-baseline space-x-2 mt-1">
              <span className="text-2xl font-bold tracking-tight text-white mono truncate">{rlusdBalance.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
);

export default BalanceHeader;
