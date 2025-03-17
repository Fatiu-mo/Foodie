// app/restaurants/[id]/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Clock, Star, Plus, Minus } from 'lucide-react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useCartStore } from '@/app/store/cart-store';
import Link from 'next/link';

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
  const cart = useCartStore((state) => state.cart);

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

  // Add item to cart
  const handleAddToCart = (item: MenuItem) => {
    useCartStore.setState((state) => {
      const existingItem = state.cart.find((i) => i.id === item.id);
      if (existingItem) {
        // Update quantity if item already exists
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      } else {
        // Add new item to cart
        return {
          cart: [
            ...state.cart,
            {
              id: item.id,
              name: item.name,
              price: item.price,
              quantity: 1,
              restaurantId: restaurant.id,
              restaurantName: restaurant.name,
            },
          ],
        };
      }
    });
  };

  // Remove item from cart
  const handleRemoveFromCart = (itemId: string) => {
    useCartStore.setState((state) => ({
      cart: state.cart.filter((item) => item.id !== itemId),
    }));
  };

  // Update item quantity
  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    useCartStore.setState((state) => ({
      cart: state.cart
        .map((item) =>
          item.id === itemId ? { ...item, quantity } : item
        )
        .filter((item) => item.quantity > 0), // Remove if quantity is 0
    }));
  };

  // Calculate total price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
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
                      {item.dietary.map((diet) => (
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
                    onClick={() => handleAddToCart(item)}
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
              {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity - 1)
                            }
                            className="text-orange-500 hover:text-orange-600"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              handleUpdateQuantity(item.id, item.quantity + 1)
                            }
                            className="text-orange-500 hover:text-orange-600"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  <div className="pt-4 border-t mt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>${calculateTotal().toFixed(2)}</span>
                    </div>
                    <Link
                      href="/cart"
                      className="w-full bg-orange-500 text-white py-4 rounded-full mt-6 hover:bg-orange-600 transition block text-center"
                    >
                      Checkout
                    </Link>
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