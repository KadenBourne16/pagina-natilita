'use client';
import React from 'react';

const Games = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-pink-50 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <div className="text-9xl mb-6">😢</div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Sorry, we have no games for you
        </h1>
        <p className="text-gray-600 text-lg">
          Check back later for some fun birthday games!
        </p>
      </div>
    </div>
  );
};

export default Games;