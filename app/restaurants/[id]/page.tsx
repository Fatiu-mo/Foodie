// app/restaurants/[id]/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Clock, Star, Utensils, Salad, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  dietary: string[];
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  minOrder: number;
  image: string;
  menu: MenuItem[];
}

export default function RestaurantPage() {
  const { id } = useParams();
  const [cart, setCart] = useState<{ [key: string]: number }>({});

  // Mock data - replace with API call
  const restaurant: Restaurant = {
    id: '1',
    name: 'Burger Palace',
    cuisine: 'American',
    rating: 4.5,
    deliveryTime: '25-35 min',
    minOrder: 15,
    image: '/images/burger.jpg',
    menu: [
      {
        id: '1',
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with melted cheese and fresh vegetables',
        price: 12.99,
        category: 'Burgers',
        dietary: ['gluten-free'],
      },
      {
        id: '2',
        name: 'BBQ Bacon Burger',
        description: 'Smoky BBQ sauce with crispy bacon',
        price: 15.99,
        category: 'Burgers',
        dietary: [],
      },
      // Add more menu items...
    ],
  };

  const addToCart = (itemId: string) => {
    setCart(prev => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
  };

  const removeFromCart = (itemId: string) => {
    if (cart[itemId] > 1) {
      setCart(prev => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    } else {
      const newCart = { ...cart };
      delete newCart[itemId];
      setCart(newCart);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Restaurant Header */}
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="md:col-span-1"
            >
              <Image
                src={restaurant.image}
                alt={restaurant.name}
                width={400}
                height={300}
                className="rounded-xl object-cover h-64 w-full"
              />
            </motion.div>
            
            <div className="md:col-span-2">
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold">{restaurant.name}</h1>
                <div className="flex items-center space-x-4 text-gray-600">
                  <span className="flex items-center">
                    <Star className="w-5 h-5 mr-1 text-yellow-500" />
                    {restaurant.rating}
                  </span>
                  <span className="flex items-center">
                    <Clock className="w-5 h-5 mr-1 text-blue-500" />
                    {restaurant.deliveryTime}
                  </span>
                  <span>Min. ${restaurant.minOrder}</span>
                </div>
                <p className="text-lg text-gray-600">{restaurant.cuisine} Cuisine</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu & Cart Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Menu Items */}
          <div className="lg:col-span-3">
            {restaurant.menu.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 mb-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <p className="text-gray-600 mt-2">{item.description}</p>
                    <div className="mt-2 flex items-center space-x-4">
                      <span className="text-lg font-medium">${item.price}</span>
                      {item.dietary.map(diet => (
                        <span
                          key={diet}
                          className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-sm"
                        >
                          {diet}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(item.id)}
                    className="ml-4 bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition"
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg sticky top-8"
            >
              <h2 className="text-2xl font-bold mb-6">Your Order</h2>
              {Object.keys(cart).length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {restaurant.menu
                    .filter(item => cart[item.id])
                    .map(item => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-orange-500 hover:text-orange-600"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span>{cart[item.id]}</span>
                            <button
                              onClick={() => addToCart(item.id)}
                              className="text-orange-500 hover:text-orange-600"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <span className="font-medium">
                          ${(item.price * cart[item.id]).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  <div className="pt-4 border-t mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>
                        $
                        {restaurant.menu
                          .reduce((sum, item) => sum + item.price * (cart[item.id] || 0), 0)
                          .toFixed(2)}
                      </span>
                    </div>
                    <button className="w-full bg-orange-500 text-white py-4 rounded-full mt-6 hover:bg-orange-600 transition">
                      Checkout
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}