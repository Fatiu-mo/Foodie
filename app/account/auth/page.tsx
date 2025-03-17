'use client';

import { useState } from 'react';
import { Google } from 'react-bootstrap-icons';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm p-8">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl font-bold mb-8 text-center"
        >
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </motion.h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          <button className="w-full bg-orange-500 text-white py-4 rounded-full hover:bg-orange-600 transition">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-2 w-full p-3 border rounded-lg hover:bg-gray-50 transition">
              <Google className="w-5 h-5" />
              <span>Google</span>
            </button>

            <button className="flex items-center justify-center gap-2 w-full p-3 border rounded-lg hover:bg-gray-50 transition">
              <Google className="w-5 h-5" />
              <span>GitHub</span>
            </button>
          </div>

          <p className="mt-8 text-center text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-orange-500 hover:underline"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}