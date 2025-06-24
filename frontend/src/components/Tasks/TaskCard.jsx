import React, { useState } from 'react';
import { Edit2, Trash2, Check, X } from 'lucide-react';

export function TaskCard({ task, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== task.title) {
      onUpdate(task.id, { title: editTitle.trim() });
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setIsEditing(false);
  };

  const handleStatusChange = (newStatus) => {
    onUpdate(task.id, { status: newStatus });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo':
        return 'bg-orange-400 text-orange-800';
      case 'in_progress':
        return 'bg-yellow-200 text-yellow-800';
      case 'done':
        return 'bg-green-200 text-green-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'todo':
        return 'To Do';
      case 'in_progress':
        return 'In Progress';
      case 'done':
        return 'Done';
    }
  };

  const getNextStatus = (status) => {
    switch (status) {
      case 'todo':
        return 'in_progress';
      case 'in_progress':
        return 'done';
      case 'done':
        return null;
    }
  };

  const getPrevStatus = (status) => {
    switch (status) {
      case 'done':
        return 'in_progress';
      case 'in_progress':
        return 'todo';
      case 'todo':
        return null;
    }
  };

  return (
    <div className="bg-gray-500  bg-opacity-85 rounded-lg shadow-sm border border-black p-4 hover:shadow-md  hover:bg-gray-600 transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        {isEditing ? (
          <div className="flex-1 mr-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') handleCancel();
              }}
              autoFocus
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={handleSave}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
              >
                <Check className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-red-600 hover:bg-red-50 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-medium text-gray-900 flex-1">{task.title}</h3>
            <div className="flex gap-1 ml-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-100 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="p-1 text-red-600 hover:text-gray-600 hover:bg-red-50 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <>
          <div className="flex items-center justify-between">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {getStatusText(task.status)}
            </span>
            <div className="text-xs text-gray-950">
              {new Date(task.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            {getPrevStatus(task.status) && (
              <button
                onClick={() => handleStatusChange(getPrevStatus(task.status))}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
              >
                ← {getStatusText(getPrevStatus(task.status))}
              </button>
            )}
            {getNextStatus(task.status) && (
              <button
                onClick={() => handleStatusChange(getNextStatus(task.status))}
                className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-100 hover:bg-blue-200 rounded-md transition-colors"
              >
                {getStatusText(getNextStatus(task.status))} →
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}