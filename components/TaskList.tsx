import React from 'react';
import { Task, TaskStatus } from '../types';
import { getCategoryBadgeClass, formatReward } from '../utils/category';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => (
  <div className="px-4 py-6 space-y-4 pb-24">
    <h2 className="text-lg font-bold text-zinc-100 flex items-center space-x-2">
      <span>Available Tasks</span>
      <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-[10px] text-zinc-400 font-mono">
        {tasks.filter((t) => t.status !== TaskStatus.CLAIMED).length}
      </span>
    </h2>

    {tasks.map((task) => (
      <div
        key={task.id}
        onClick={() => onTaskClick(task)}
        className={`relative p-5 rounded-2xl border transition-all active:scale-[0.97] ${
          task.status === TaskStatus.CLAIMED ? 'bg-zinc-900/50 border-zinc-900 opacity-60' : 'glass border-zinc-800 shadow-xl'
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="flex flex-col space-y-1">
            <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded w-fit ${getCategoryBadgeClass(task.category)}`}>
              {task.category}
            </span>
            <h3 className="font-bold text-zinc-100">{task.title}</h3>
            {task.location && (
              <div className="flex items-center text-xs text-zinc-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                {task.location}
              </div>
            )}
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-emerald-400 mono">+{formatReward(task.rewardAmount)}</p>
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
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </div>
      </div>
    ))}
  </div>
);

export default TaskList;
