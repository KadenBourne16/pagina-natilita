'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navbar';
import { Heart, Smartphone, DollarSign, Shirt, Palette, Flame, IceCream, Gift } from 'lucide-react';

const WishList = () => {
  const wishItems = [
    { 
      id: 1, 
      title: 'Prayers', 
      description: 'Your heartfelt prayers and well-wishes',
      icon: <Heart className="w-8 h-8 text-pink-500" fill="currentColor" />
    },
    { 
      id: 2, 
      title: 'Bone Straight', 
      description: 'Yes, you read it well, bone straight. B-O-N-E S-T-R-A-I-G-H-T',
      icon: <span className="text-3xl">💇‍♀️</span>
    },
    { 
      id: 3, 
      title: 'iPhone 12 or Camon 40 Pro', 
      description: 'Latest smartphone for capturing memories',
      icon: <Smartphone className="w-8 h-8 text-blue-500" />
    },
    { 
      id: 4, 
      title: 'GHC 5,000', 
      description: 'For miscellaneous expenses',
      icon: <DollarSign className="w-8 h-8 text-green-500" />
    },
    { 
      id: 5, 
      title: 'Dress, Bag and Heel', 
      description: 'Complete stylish outfit',
      icon: <Shirt className="w-8 h-8 text-purple-500" />
    },
    { 
      id: 6, 
      title: 'Makeup Kit', 
      description: 'High-quality makeup set',
      icon: <Palette className="w-8 h-8 text-red-400" />
    },
    { 
      id: 7, 
      title: 'Stove or Burner', 
      description: 'For cooking delicious meals',
      icon: <Flame className="w-8 h-8 text-orange-500" />
    },
    { 
      id: 8, 
      title: 'Special Treats', 
      description: 'Ice cream, teddy bear, and Peace',
      icon: <IceCream className="w-8 h-8 text-blue-300" />
    }
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-200 to-pink-200">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-16">
          <motion.h1 
            className="text-4xl md:text-5xl font-bold text-zinc-800 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            My Birthday Wishlist
          </motion.h1>
          <motion.p 
            className="text-lg text-zinc-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Here are some gift ideas that would make my birthday extra special!
          </motion.p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mt-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {wishItems.map((wish) => (
            <motion.div
              key={wish.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
              variants={item}
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-pink-100 rounded-full">
                  {wish.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-800">{wish.title}</h3>
              </div>
              <p className="text-zinc-600 pl-1">{wish.description}</p>
              
              {wish.id === 8 && (
                <div className="mt-4 pt-4 border-t border-zinc-100">
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <Gift className="w-5 h-5 text-pink-400" />
                    <span>Perfect for a sweet celebration!</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </main>
    </div>
  );
};

export default WishList;