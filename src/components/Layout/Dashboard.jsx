import React from 'react';
import { Header } from './Header';
import { TaskBoard } from '../Tasks/TaskBoard';
import { motion } from 'framer-motion';
import img from '../../assets/bg.png';

const bgImageUrl = img; 

export function Dashboard() {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-200"
      style={{
        backgroundImage: `linear-gradient(to bottom right, #818cf8 0%, #a78bfa 50%, #fbcfe8 100%), url('${bgImageUrl}')`,
        backgroundSize: 'fit',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay'
      }}
    >
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
          <h2 className="text-3xl font-extrabold text-purple-200 mb-2">My Tasks</h2>
          <p className="text-green-700  font-bold">Organize and track your work progress</p>
        </motion.div>
        
        <TaskBoard />
      </motion.main>
    </div>
  );
}