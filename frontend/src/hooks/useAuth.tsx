import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import toast from 'react-hot-toast';

// Define your User type
export interface User {
  id: number;
  email: string;
  name?: string;
}

// Define the AuthContext type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (userData: { email: string; password: string; name?: string }) => Promise<{ success: boolean; error?: string }>;
  signIn: (credentials: { email: string; password: string }) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on app load
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  const signUp = async (userData: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) throw new Error(data.message || 'Signup failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Account created successfully!');
      return { success: true };
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
      return { success: false, error: error.message || 'Signup failed' };
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (credentials: { email: string; password: string }) => {
    try {
      setLoading(true);
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      let data = {};
      try {
        data = await res.json();
      } catch {
        data = {};
      }
      if (!res.ok) throw new Error(data.message || 'Sign in failed');
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setUser(data.user);
      toast.success('Signed in successfully!');
      return { success: true };
    } catch (error: any) {
      const message = error.message || 'Sign in failed';
      toast.error(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Signed out successfully!');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};