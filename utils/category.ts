import { Task } from '../types';

const CATEGORY_STYLES: Record<Task['category'], string> = {
  Booth: 'bg-indigo-500/20 text-indigo-400',
  Session: 'bg-amber-500/20 text-amber-400',
  Social: 'bg-purple-500/20 text-purple-400',
  DeFi: 'bg-emerald-500/20 text-emerald-400',
  NFT: 'bg-rose-500/20 text-rose-400',
};

export function getCategoryBadgeClass(category: Task['category']): string {
  return CATEGORY_STYLES[category] ?? 'bg-purple-500/20 text-purple-400';
}

export function formatReward(amount: number): string {
  return Number(amount).toFixed(1);
}
