import React from 'react';
import { motion } from 'framer-motion';
import { TaskColumn } from './TaskColumn';
import { useTasks } from '../../hooks/useTasks';
import { AddTaskForm } from './AddTaskForm';

const columns = [
  { key: 'todo', label: 'To Do', color: 'bg-blue-100', accent: 'border-blue-400' },
  { key: 'in_progress', label: 'In Progress', color: 'bg-yellow-100', accent: 'border-yellow-400' },
  { key: 'done', label: 'Done', color: 'bg-green-100', accent: 'border-green-400' },
];

export function TaskBoard() {
  const { tasks, loading, addTask, updateTask, deleteTask, getTasksByStatus } = useTasks();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <AddTaskForm onAddTask={addTask} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col, idx) => (
          <motion.div
            key={col.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx, duration: 0.5 }}
          >
            <TaskColumn
              title={col.label}
              tasks={tasks.filter(t => t.status === col.key)}
              color={col.color}
              accent={col.accent}
              status={col.key}
              onUpdateTask={updateTask}
              onDeleteTask={deleteTask}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}