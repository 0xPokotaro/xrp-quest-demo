import React from 'react';
import { Task, TaskStatus } from '../types';
import Modal from './Modal';
import { getCategoryBadgeClass, formatReward } from '../utils/category';

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onClaimReward: (taskId: string) => void;
}

const TaskDetailModal: React.FC<TaskDetailModalProps> = ({ isOpen, onClose, task, onClaimReward }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Task Detail">
    {task && (
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded w-fit ${getCategoryBadgeClass(task.category)}`}>
            {task.category}
          </span>
          <h3 className="text-2xl font-bold leading-tight">{task.title}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed">{task.description}</p>
        </div>

        <div className="p-4 glass rounded-2xl border-zinc-800 bg-zinc-800/20">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-zinc-400">Reward</span>
            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-bold text-emerald-400 mono">{formatReward(task.rewardAmount)}</span>
              <span className="text-xs font-bold text-zinc-500 mono">{task.rewardType}</span>
            </div>
          </div>
        </div>

        {task.status === TaskStatus.PENDING && (
          <button
            className="w-full py-4 bg-zinc-800 text-zinc-400 font-bold rounded-2xl border border-zinc-700 opacity-50 cursor-not-allowed"
            disabled
          >
            Scan QR to Complete
          </button>
        )}

        {task.status === TaskStatus.COMPLETED && (
          <button
            onClick={() => onClaimReward(task.id)}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-900/40 active:scale-[0.98] transition-all"
          >
            Claim Reward
          </button>
        )}

        {task.status === TaskStatus.CLAIMED && (
          <div className="w-full py-4 bg-emerald-500/10 text-emerald-400 font-bold rounded-2xl border border-emerald-500/20 flex items-center justify-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Reward Claimed</span>
          </div>
        )}
      </div>
    )}
  </Modal>
);

export default TaskDetailModal;
