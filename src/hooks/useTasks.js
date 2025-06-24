import { useState, useEffect } from 'react';
import { tasksAPI } from '../lib/api';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';
import axios from 'axios';

export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await tasksAPI.getTasks();
      setTasks(response.data);
    } catch (error) {
      toast.error('Error fetching tasks');
      console.error('Fetch tasks error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (title) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
      const data = await response.json();
      setTasks((prev) => [data, ...prev]);
      toast.success('Task added successfully!');
      return data;
    } catch (error) {
      toast.error('Error adding task');
      console.error('Add task error:', error);
    }
  };

  const updateTask = async (id, updates) => {
    try {
      const response = await tasksAPI.updateTask(id, updates);
      setTasks((prev) =>
        prev.map((task) => (task.id === id ? response.data : task))
      );
      toast.success('Task updated successfully!');
      return response.data;
    } catch (error) {
      toast.error('Error updating task');
      console.error('Update task error:', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await tasksAPI.deleteTask(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
      toast.success('Task deleted successfully!');
    } catch (error) {
      toast.error('Error deleting task');
      console.error('Delete task error:', error);
    }
  };

  const getTasksByStatus = (status) => {
    if (!Array.isArray(tasks)) return [];
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