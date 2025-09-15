'use client';
import React from 'react';
import Navbar from "@/app/components/navbar";

const Gratitude = () => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gradient-to-br from-violet-200 via-pink-200 to-violet-300">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-8">
          <div className="w-full max-w-3xl mx-auto text-center">
            <h1 className="text-slate-900 text-4xl font-black leading-tight tracking-tighter md:text-5xl mb-8">
              A Prayer of Gratitude
            </h1>
            
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl shadow-xl p-8 md:p-12 space-y-6">
              <p className="text-slate-700 text-lg leading-relaxed">
                Dear Heavenly Father, on this special day, I want to thank You for the gift of life. I'm grateful for another year of breath, another year of opportunities, and another year of Your love and guidance.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed">
                Thank you for watching over me, for providing for me, and for being my rock in times of need. I'm thankful for the people You've brought into my life, for the experiences that have shaped me, and for the lessons I've learned.
              </p>
              <p className="text-slate-700 text-lg leading-relaxed">
                May this new year be filled with joy, peace, and purpose. May Your will be done in my life, and may I bring glory to Your name in all that I do. Thank you for Your faithfulness and Your love. Amen.
              </p>
              <div className="pt-6 text-4xl">🙏</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Gratitude;