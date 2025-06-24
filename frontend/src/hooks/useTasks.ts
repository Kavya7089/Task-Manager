import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

// Define your Task type here or import it from your models
export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'done';
  user_id: number;
  created_at: string;
}

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  // Helper to get token from localStorage
  const getToken = () => localStorage.getItem('token');

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
    // eslint-disable-next-line
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await fetch('/api/tasks', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error('Failed to fetch tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error: any) {
      toast.error('Error fetching tasks: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title: string) => {
    if (!user) return;
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ title }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      const data = await res.json();
      setTasks((prev) => [data, ...prev]);
      toast.success('Task added successfully!');
      return data;
    } catch (error: any) {
      toast.error('Error adding task: ' + error.message);
    }
  };

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) throw new Error('Failed to update task');
      const data = await res.json();
      setTasks((prev) => prev.map((task) => (task.id === id ? data : task)));
      toast.success('Task updated successfully!');
      return data;
    } catch (error: any) {
      toast.error('Error updating task: ' + error.message);
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const res = await fetch(`/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      if (!res.ok) throw new Error('Failed to delete task');
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error: any) {
      toast.error('Error deleting task: ' + error.message);
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter((task) => task.status === status);
  };

  return {
    tasks,
    loading,
    addTask,
    updateTask,
    deleteTask,
    getTasksByStatus,
    refetch: fetchTasks,
  };
}