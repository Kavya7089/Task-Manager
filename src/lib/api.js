import axios from 'axios';

const API_BASE_URL = 'http://localhost:5002/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  signup: (userData) => api.post('/auth/signup', userData),
  login: (credentials) => api.post('/auth/login', credentials),
};

// Tasks API
export const tasksAPI = {
  getTasks: () => api.get('/tasks'),
  createTask: (taskData) => api.post('/tasks', taskData),
  updateTask: (id, updates) => api.put(`/tasks/${id}`, updates),
  deleteTask: (id) => api.delete(`/tasks/${id}`),
};

export default api;