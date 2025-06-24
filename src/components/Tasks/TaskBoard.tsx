import React from 'react';
import { Clock, Play, CheckCircle } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';
import { TaskColumn } from './TaskColumn';
import { AddTaskForm } from './AddTaskForm';

export function TaskBoard() {
  const { tasks, loading, addTask, updateTask, deleteTask, getTasksByStatus } = useTasks();

  const todoTasks = getTasksByStatus('todo');
  const inProgressTasks = getTasksByStatus('in_progress');
  const doneTasks = getTasksByStatus('done');

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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <TaskColumn
          title="To Do"
          status="todo"
          tasks={todoTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          icon={<Clock className="w-5 h-5 text-gray-600" />}
          colorClass="border-gray-400"
        />
        
        <TaskColumn
          title="In Progress"
          status="in_progress"
          tasks={inProgressTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          icon={<Play className="w-5 h-5 text-blue-600" />}
          colorClass="border-blue-400"
        />
        
        <TaskColumn
          title="Done"
          status="done"
          tasks={doneTasks}
          onUpdateTask={updateTask}
          onDeleteTask={deleteTask}
          icon={<CheckCircle className="w-5 h-5 text-green-600" />}
          colorClass="border-green-400"
        />
      </div>
    </div>
  );
}