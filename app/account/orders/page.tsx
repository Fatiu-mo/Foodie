'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Clock, CheckCircle, XCircle } from 'lucide-react';

const mockOrders = [
  {
    id: '#1234',
    date: 'March 15, 2024',
    status: 'Delivered',
    total: 45.99,
    items: ['Classic Cheeseburger x2', 'French Fries x1', 'Cola x2']
  },
  {
    id: '#1235',
    date: 'March 12, 2024',
    status: 'Cancelled',
    total: 32.50,
    items: ['Vegetarian Pizza x1', 'Garlic Bread x1']
  }
];

export default function OrderHistoryPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-3xl font-bold mb-8"
      >
        Order History
      </motion.h1>

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <motion.div
            key={order.id}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="font-medium">{order.id}</span>
                  <span className="text-sm text-gray-500">{order.date}</span>
                  <span className={`px-2 py-1 rounded-full text-sm flex items-center gap-1 ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-red-100 text-red-600'
                  }`}>
                    {order.status === 'Delivered' ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )}
                    {order.status}
                  </span>
                </div>
                <div className="text-gray-600 space-y-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-lg font-medium">${order.total}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {mockOrders.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <Clock className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          No orders found
        </div>
      )}
    </div>
  );
}