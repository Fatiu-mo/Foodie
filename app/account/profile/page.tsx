'use client';

import { motion } from 'framer-motion';
import { User, Package, MapPin, CreditCard } from 'lucide-react';
import { useState } from 'react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [userData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 890'
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-8"
      >
        Account Settings
      </motion.h1>
      
      <div className="grid md:grid-cols-4 gap-8">
        {/* Navigation */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-3 rounded-lg flex items-center gap-2 ${
              activeTab === 'profile' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
            }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>
          
          <button 
            onClick={() => setActiveTab('orders')}
            className={`w-full text-left p-3 rounded-lg flex items-center gap-2 ${
              activeTab === 'orders' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
            }`}
          >
            <Package className="w-5 h-5" />
            Orders
          </button>
          
          <button 
            onClick={() => setActiveTab('addresses')}
            className={`w-full text-left p-3 rounded-lg flex items-center gap-2 ${
              activeTab === 'addresses' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
            }`}
          >
            <MapPin className="w-5 h-5" />
            Addresses
          </button>
          
          <button 
            onClick={() => setActiveTab('payments')}
            className={`w-full text-left p-3 rounded-lg flex items-center gap-2 ${
              activeTab === 'payments' ? 'bg-orange-100 text-orange-600' : 'hover:bg-gray-100'
            }`}
          >
            <CreditCard className="w-5 h-5" />
            Payments
          </button>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white rounded-xl p-6 shadow-sm">
          {activeTab === 'profile' && (
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-6"
            >
              <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={userData.name}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={userData.email}
                    disabled
                    className="w-full p-3 border rounded-lg bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    defaultValue={userData.phone}
                    className="w-full p-3 border rounded-lg"
                  />
                </div>
                <button className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition">
                  Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              initial={{ x: 10, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              {/* Order History Content */}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}