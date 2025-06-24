import React from 'react';
import { LogOut, User, CheckSquare } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion } from 'framer-motion';
import img from '../../assets/bg.png';

export function Header() {
  const { user, signOut } = useAuth();

  return (
    <motion.header
      className="bg-gradient-to-r from-purple-900 via-indigo-900 to-pink-800 shadow-md border-b border-purple-200"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow">
              <img src={img} alt="logo" className="w-10 h-10 object-cover " />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-pink-400 drop-shadow">TaskFlow</h1>
              <p className="text-sm text-purple-200">Manage your tasks efficiently</p>
            </div>
          </motion.div>

          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-white">
              <User className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold">
                {user?.user_metadata?.name || user?.name}
              </span>
            </div>
            <button
              onClick={signOut}
              className="flex items-center gap-2 px-4 py-2 text-white hover:text-pink-200 hover:bg-pink-600 rounded-lg transition-colors font-semibold"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
}