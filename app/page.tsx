// app/page.tsx
'use client';
import React from 'react'
import { motion } from 'framer-motion';
import { ArrowRight, Star, Clock, ShieldCheck, Truck } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link'
import Navbar from './components/navbar'

interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  image: string;
}

export default function Home() {
  const featuredRestaurants: Restaurant[] = [
    {
      id: 1,
      name: 'Burger Palace',
      cuisine: 'American',
      rating: 4.5,
      deliveryTime: '25-35 min',
      image: '/images/burger.jpg',
    },
    {
      id: 2,
      name: 'Sushi Master',
      cuisine: 'Japanese',
      rating: 4.8,
      deliveryTime: '30-40 min',
      image: '/images/burger.jpg',
    },
    {
      id: 3,
      name: 'Pizza Haven',
      cuisine: 'Italian',
      rating: 4.3,
      deliveryTime: '20-30 min',
      image: '/images/burger.jpg',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/*Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <main>
        <section className="pt-24 pb-12 bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h1 className="text-5xl font-bold mb-6 text-gray-800">
                Craving something delicious?
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Get your favorite meals delivered fast to your doorstep
              </p>

              {/* Search Bar */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="max-w-2xl mx-auto bg-white rounded-full shadow-lg p-2 flex items-center"
              >
                <div className="flex-1 pl-6">
                  {/* <Search className="text-gray-400 inline-block mr-2" size={20} /> */}
                  <input
                    type="text"
                    placeholder="Search by location or cuisine..."
                    className="w-full outline-none bg-transparent"
                  />
                </div>
                <button className="bg-orange-500 text-white px-8 py-4 rounded-full flex items-center hover:bg-orange-600 transition">
                  Search
                  <ArrowRight className="ml-2" size={20} />
                </button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
              >
              <Link
                href="/restaurants"
                className="bg-white text-orange-500 px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-shadow font-medium flex items-center"
              >
                <span>Browse All Restaurants</span>
                <ArrowRight className="ml-2" size={20} />
              </Link>
              
              <Link
                href="/cuisines"
                className="bg-gray-100 text-gray-600 px-8 py-4 rounded-full hover:bg-gray-200 transition-colors font-medium"
              >
                Browse by Cuisine
              </Link>
            </motion.div>

          </div>
        </section>

        {/* Featured Restaurants */}
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">Featured Restaurants</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <Image
                width={100}
                height={100}
                  src={restaurant.image}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{restaurant.name}</h3>
                    <span className="flex items-center text-sm bg-orange-100 text-orange-600 px-2 py-1 rounded">
                      <Star className="mr-1" size={16} />
                      {restaurant.rating}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">{restaurant.cuisine}</p>
                  <p className="text-sm text-gray-500">
                    Delivery: {restaurant.deliveryTime}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/restaurants"
              className="inline-block bg-orange-500 text-white px-8 py-4 rounded-full hover:bg-orange-600 transition-colors font-medium"
              >
              Show All {featuredRestaurants.length * 5}+ Restaurants
            </Link>
          </div>
        </section>
      </main>


{/*  Value proposition section */}
<section className="bg-gray-50 py-16">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-center mb-12"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-4">
        Why Choose Foodie?
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto">
        We are committed to delivering not just food, but exceptional experiences
      </p>
    </motion.div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        {
          icon: Truck,
          title: "Fast Delivery",
          description: "Get your food delivered in under 40 minutes",
          color: "text-blue-500",
        },
        {
          icon: ShieldCheck,
          title: "Quality Assured",
          description: "100% hygiene & quality checked restaurants",
          color: "text-green-500",
        },
        {
          icon: Clock,
          title: "24/7 Service",
          description: "Order anytime, anywhere - day or night",
          color: "text-purple-500",
        },
      ].map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`mb-6 ${item.color}`}>
            <item.icon className="w-12 h-12" strokeWidth={1.5} />
          </div>
          <h3 className="text-xl font-semibold mb-3 text-gray-800">
            {item.title}
          </h3>
          <p className="text-gray-600">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Foodie</h3>
              <p className="text-gray-400">
                Delivering happiness one meal at a time
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}