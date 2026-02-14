
export enum TaskStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  CLAIMED = 'CLAIMED'
}

export interface Task {
  id: string;
  title: string;
  description: string;
  rewardType: 'XRP' | 'RLUSD';
  rewardAmount: number;
  status: TaskStatus;
  category: 'Booth' | 'Session' | 'Social';
  location?: string;
}

export interface Transaction {
  id: string;
  timestamp: Date;
  type: 'AIRDROP' | 'SEND' | 'RECEIVE';
  asset: 'XRP' | 'RLUSD';
  amount: number;
  status: 'SUCCESS' | 'PENDING';
}

export type Tab = 'Tasks' | 'History' | 'MyPage';
