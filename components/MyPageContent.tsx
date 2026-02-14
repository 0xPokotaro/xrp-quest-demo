import React from 'react';

interface MyPageContentProps {
  claimedCount: number;
}

const MyPageContent: React.FC<MyPageContentProps> = ({ claimedCount }) => (
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
        <p className="text-2xl font-bold mono">{claimedCount}</p>
      </div>
      <div className="p-4 glass rounded-3xl border-zinc-800">
        <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest mb-1">NFT Items</p>
        <p className="text-2xl font-bold mono">3</p>
      </div>
    </div>

    <button className="w-full py-4 text-rose-500 font-bold bg-rose-500/10 rounded-2xl border border-rose-500/20 active:scale-[0.98] transition-all">
      Disconnect Wallet
    </button>
  </div>
);

export default MyPageContent;
