import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export function AddTaskForm({ onAddTask, loading }) {
  const [title, setTitle] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onAddTask(title.trim());
    setTitle('');
    setIsExpanded(false);
  };

  if (!isExpanded) {
    return (
      <button
        onClick={() => setIsExpanded(true)}
        className="w-full p-4 border-2 border-dashed bg-slate-400 bg-opacity-70 border-gray-700 rounded-lg text-gray-800 font-bold hover:border-blue-400 hover:text-blue-600 transition-colors duration-200 flex items-center justify-center gap-2"
      >
        <Plus className="w-5 h-5" />
        Add new task
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-black bg-opacity-65 rounded-lg shadow-sm border border-gray-700 p-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title..."
        className="w-full px-3 py-2 border bg-gray-600 bg-opacity-55 text-white border-gray-500 rounded-md focus:ring-2 focus:ring-blue-800 focus:border-transparent mb-3"
        autoFocus
      />
      
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={!title.trim() || loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Task'}
        </button>
        <button
          type="button"
          onClick={() => {
            setTitle('');
            setIsExpanded(false);
          }}
          className="px-4 py-2 text-gray-400 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}