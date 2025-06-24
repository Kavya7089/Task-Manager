import React, { useState } from 'react';
import { User, Mail, Lock, UserPlus } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { motion, AnimatePresence } from 'framer-motion';

export function SignupForm({ onToggleMode }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signUp, loading } = useAuth();
  const [error, setError] = useState(null);

  // Simple password strength check
  const getPasswordStrength = (pwd) => {
    if (pwd.length < 6) return 'Weak';
    if (pwd.match(/[A-Z]/) && pwd.match(/[0-9]/) && pwd.length >= 8) return 'Strong';
    return 'Medium';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    const result = await signUp({ name, email, password });
    if (result && result.error) {
      setError(result.error);
    }
  };

  const passwordStrength = password ? getPasswordStrength(password) : '';

  return (
    <motion.div
      className="w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className=" rounded-2xl shadow-xl p-8 bg-gray-800 bg-opacity-55">
        <div className="text-center mb-8">
          <motion.div
            className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h2
            className="text-3xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Create Account
          </motion.h2>
          <motion.p
            className="text-gray-100 font-bold mt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Join us and start managing your tasks
          </motion.p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence>
            {error && (
              <motion.div
                className="bg-red-100 text-red-700 px-4 py-2 rounded mb-2 text-sm text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-2">
              Full Name
            </label>
            <div className="relative ">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none hover:border-green-400"
                placeholder="Enter your full name"
                required
                autoComplete="name"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none hover:border-green-400"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all outline-none hover:border-green-400"
                placeholder="Create a password"
                required
                minLength={6}
                autoComplete="new-password"
              />
            </div>
            <AnimatePresence>
              {password && (
                <motion.div
                  className={`mt-1 text-xs font-medium ${
                    passwordStrength === 'Strong'
                      ? 'text-green-600'
                      : passwordStrength === 'Medium'
                      ? 'text-yellow-600'
                      : 'text-red-600'
                  }`}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  Password strength: {passwordStrength}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-200">
            Already have an account?{' '}
            <button
              onClick={onToggleMode}
              className="text-green-600 hover:text-green-700 font-semibold transition-colors"
              type="button"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}