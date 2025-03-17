'use client';

import { motion } from 'framer-motion';
import { MapPin, ChevronLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useCartStore } from '../store/cart-store';
import { useState } from 'react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  instructions: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { cart, setCart } = useCartStore();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCart(cart.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ).filter(item => item.quantity > 0));
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const deliveryFee = 5.99;
    const tax = subtotal * 0.08;
    return {
      subtotal: subtotal.toFixed(2),
      deliveryFee: deliveryFee.toFixed(2),
      tax: tax.toFixed(2),
      total: (subtotal + deliveryFee + tax).toFixed(2)
    };
  };

  const handleOrderConfirmation = (formData: FormData) => {
    setOrderPlaced(true);
    setCart([]); // Clear cart after order

    // Store order details
    const orderDetails = {
      ...formData,
      items: cart,
      total: calculateTotal().total,
      orderDate: new Date().toISOString()
    };
    localStorage.setItem('currentOrder', JSON.stringify(orderDetails));
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          className="text-center max-w-md p-8 bg-white rounded-xl shadow-lg"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Your order has been received and is being prepared. 
            We'll notify you when it's on the way!
          </p>
          <Link href="/restaurants" className="bg-orange-500 text-white px-6 py-3 rounded-full hover:bg-orange-600 transition">
            Back to Restaurants
          </Link>
        </motion.div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
          <Link href="/restaurants" className="text-orange-500 hover:underline">
            Browse restaurants
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-8">
        <Link href="/restaurants" className="flex items-center text-gray-600 mb-8">
          <ChevronLeft className="mr-2" />
          Continue Shopping
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Delivery Details */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl p-6 shadow-sm mb-8">
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <MapPin className="mr-2 text-orange-500" /> Delivery Details
              </h2>

              <form onSubmit={handleSubmit(handleOrderConfirmation)}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Full Name</label>
                    <input {...register('name', { required: 'Required' })} className="w-full p-3 border rounded-lg" />
                    {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Email</label>
                    <input type="email" {...register('email', { required: 'Required' })} className="w-full p-3 border rounded-lg" />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Phone</label>
                    <input type="tel" {...register('phone', { required: 'Required' })} className="w-full p-3 border rounded-lg" />
                    {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium">Delivery Address</label>
                    <input {...register('address', { required: 'Required' })} className="w-full p-3 border rounded-lg" />
                    {errors.address && <span className="text-red-500 text-sm">{errors.address.message}</span>}
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <label className="block text-sm font-medium">Delivery Instructions</label>
                  <textarea {...register('instructions')} className="w-full p-3 border rounded-lg" rows={3} placeholder="Gate code, floor number, etc." />
                </div>

                <div className="mt-8">
                  <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-full hover:bg-orange-600 transition">
                    Confirm Order
                  </button>
                </div>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-xl p-6 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.restaurantName}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-orange-500 hover:text-orange-600">-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-orange-500 hover:text-orange-600">+</button>
                    </div>
                  </div>
                  <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <div className="pt-4 border-t mt-6">
                <div className="flex justify-between font-bold text-lg pt-4">
                  <span>Total</span>
                  <span>${calculateTotal().total}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
