import { Task, TaskStatus } from '../types';

export const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'ウォレット接続', description: 'Connect Walletボタンからウォレットを接続してください。', rewardType: 'XRP', rewardAmount: 2, status: TaskStatus.COMPLETED, category: 'Booth', location: '' },
  { id: '2', title: 'Doppler Finance', description: 'Doppler Financeのセッションに参加し、出席確認を行ってください。', rewardType: 'XRP', rewardAmount: 2, status: TaskStatus.PENDING, category: 'DeFi', location: 'Main Stage' },
  { id: '3', title: 'xrp.cafe', description: 'xrp.cafeのセッションに参加し、出席確認を行ってください。', rewardType: 'XRP', rewardAmount: 2, status: TaskStatus.PENDING, category: 'NFT' },
  { id: '4', title: 'フィードバック回答', description: '本日のセッションに関するアンケートに回答して特典を受け取りましょう。', rewardType: 'XRP', rewardAmount: 2, status: TaskStatus.PENDING, category: 'Session' },
];
