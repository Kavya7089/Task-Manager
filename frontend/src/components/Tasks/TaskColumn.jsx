import React from 'react';
import { TaskCard } from './TaskCard';

export function TaskColumn({ title, tasks, onUpdateTask, onDeleteTask, icon, colorClass }) {
  return (
    <div className="bg-gray-900 bg-opacity-70 rounded-lg p-4 min-h-[600px]">
      <div className={`flex items-center gap-2 mb-4 pb-3 border-b-2 ${colorClass}`}>
        {icon}
        <h2 className="font-semibold text-gray-200">{title}</h2>
        <span className="bg-white text-gray-800 text-sm px-2 py-1 rounded-full ml-auto">
          {tasks.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onUpdate={onUpdateTask}
            onDelete={onDeleteTask}
          />
        ))}
        
        {tasks.length === 0 && (
          <div className="text-gray-500 text-center py-8">
            <p>No tasks yet</p>
          </div>
        )}
      </div>
    </div>
  );
}