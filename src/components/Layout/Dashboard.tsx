import React from 'react';
import { Header } from './Header';
import { TaskBoard } from '../Tasks/TaskBoard';
import { motion } from 'framer-motion';

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-200">
      <Header />
      <motion.main
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold text-purple-800 mb-2">My Tasks</h2>
          <p className="text-purple-500">Organize and track your work progress</p>
        </motion.div>
        <TaskBoard />
      </motion.main>
    </div>
  );
}