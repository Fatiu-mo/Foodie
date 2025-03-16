import React from 'react'
import { motion } from 'framer-motion';

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 w-full bg-white shadow-sm z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                >
                <h1 className="text-2xl font-bold text-orange-500">Foodie</h1>
                </motion.div>
                
                <div className="flex items-center space-x-4">
                <button className="text-gray-600 hover:text-orange-500">Sign In</button>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 transition">
                    Sign Up
                </button>
                </div>
            </div>
        </nav>
  );
};

export default Navbar;