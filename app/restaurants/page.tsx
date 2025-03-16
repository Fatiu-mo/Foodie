// app/restaurants/page.tsx
'use client';

import { motion } from 'framer-motion';
import { Search, Clock, Star, Filter, Vegan } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/navbar';

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  price: string;
  dietary: string[];
  image: string;
}

export default function RestaurantListings() {
  const searchParams = useSearchParams();
  const cuisineFilter = searchParams.get('cuisine');

  // Mock data - replace with API call
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Green Bowl',
      cuisine: 'Healthy',
      rating: 4.7,
      deliveryTime: '25-35 min',
      price: '$$',
      dietary: ['vegan', 'gluten-free'],
      image: '/images/macdonalds.jpg',
    },
    {
      id: 2,
      name: 'Taco Fiesta',
      cuisine: 'Mexican',
      rating: 4.4,
      deliveryTime: '30-40 min',
      price: '$$',
      dietary: ['vegetarian'],
      image: '/images/macdonalds.jpg',
    },
    // Add more restaurants...
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <Navbar />

      {/* Search & Filters Section */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto mt-10 px-4 py-6">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-8 mt-6"
          >
            <div className="bg-white rounded-full shadow-md p-2 flex items-center">
              <Search className="text-gray-400 ml-4 mr-2" size={20} />
              <input
                type="text"
                placeholder="Search restaurants..."
                className="w-full outline-none bg-transparent"
                defaultValue={searchParams.get('query') || ''}
              />
              <button className="bg-orange-500 text-white px-6 py-3 rounded-full flex items-center hover:bg-orange-600 transition">
                <Filter className="mr-2" size={18} />
                Filters
              </button>
            </div>
          </motion.div>

          {/* Active Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            {cuisineFilter && (
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full flex items-center text-sm"
              >
                {cuisineFilter}
                <button className="ml-2 hover:text-orange-700">×</button>
              </motion.div>
            )}
          </div>

          {/* Sorting */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">
              {cuisineFilter ? `${cuisineFilter} Restaurants` : 'All Restaurants'}
            </h1>
            <select className="bg-gray-100 px-4 py-2 rounded-lg">
              <option>Sort by: Delivery Time</option>
              <option>Sort by: Rating</option>
              <option>Sort by: Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Restaurant Grid */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant, index) => (
            <motion.div
              key={restaurant.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <Link href={`/restaurants/${restaurant.id}`}>
                <div className="relative">  
                  <Image width={200} height={200}
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover rounded-t-xl"
                  />
                  <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Star className="w-4 h-4 mr-1 text-yellow-500" />
                    {restaurant.rating}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                    <span className="text-gray-600">{restaurant.price}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{restaurant.cuisine}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-2" size={16} />
                    {restaurant.deliveryTime}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {restaurant.dietary.map((diet) => (
                      <span
                        key={diet}
                        className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs"
                      >
                        {diet}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}