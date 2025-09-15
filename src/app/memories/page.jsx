'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '../components/navbar';

// Number of images to load per page
const IMAGES_PER_PAGE = 12;

// Image files array (moved outside any function to prevent recreation)
const imageFiles = [
    '/memories/Favorite Image.jpeg',
    '/memories/IMG_20220511_103841_499.jpg',
    '/memories/IMG_20220511_103844_408.jpg',
    '/memories/IMG_20220511_103848_004.jpg',
    '/memories/IMG_20220718_153831_636.jpg',
    '/memories/IMG_20220718_153832_394.jpg',
    '/memories/IMG_20220718_153832_889.jpg',
    '/memories/IMG_20220718_153833_299.jpg',
    '/memories/IMG_20240304_130935_621.jpg',
    '/memories/IMG_20240304_130935_894.jpg',
    '/memories/IMG_20240304_130937_077.jpg',
    '/memories/IMG_20240304_131117_274.jpg',
    '/memories/IMG-20220430-WA0014.jpg',
    '/memories/IMG-20220430-WA0015.jpg',
    '/memories/IMG-20220430-WA0016.jpg',
    '/memories/IMG-20220430-WA0017.jpg',
    '/memories/IMG-20220430-WA0018.jpg',
    '/memories/IMG-20220430-WA0019.jpg',
    '/memories/IMG-20220430-WA0020.jpg',
    '/memories/IMG-20220430-WA0021.jpg',
    '/memories/IMG-20220430-WA0022.jpg',
    '/memories/IMG-20220430-WA0023.jpg',
    '/memories/IMG-20220430-WA0024.jpg',
    '/memories/IMG-20220430-WA0025.jpg',
    '/memories/IMG-20220508-WA0010.jpg',
    '/memories/IMG-20220508-WA0011.jpg',
    '/memories/IMG-20220508-WA0012.jpg',
    '/memories/IMG-20220508-WA0013.jpg',
    '/memories/IMG-20230203-WA0013.jpg',
    '/memories/IMG-20230203-WA0014.jpg',
    '/memories/IMG-20230203-WA0015.jpg',
    '/memories/IMG-20230203-WA0016.jpg',
    '/memories/IMG-20230203-WA0017.jpg',
    '/memories/IMG-20230203-WA0018.jpg',
    '/memories/IMG-20230203-WA0019.jpg',
    '/memories/IMG-20230203-WA0020.jpg',
    '/memories/IMG-20230203-WA0021.jpg',
    '/memories/IMG-20230203-WA0022.jpg',
    '/memories/IMG-20230203-WA0023.jpg',
    '/memories/IMG-20230203-WA0024.jpg',
    '/memories/IMG-20230203-WA0026.jpg',
    '/memories/IMG-20230203-WA0027.jpg',
    '/memories/IMG-20230203-WA0028.jpg',
    '/memories/IMG-20230203-WA0029.jpg',
    '/memories/IMG-20230203-WA0030.jpg',
    '/memories/IMG-20230203-WA0031.jpg',
    '/memories/IMG-20230203-WA0032.jpg',
    '/memories/IMG-20230203-WA0034.jpg',
    '/memories/IMG-20230203-WA0035.jpg',
    '/memories/IMG-20230203-WA0036.jpg',
    '/memories/IMG-20230203-WA0037.jpg',
    '/memories/IMG-20230203-WA0038.jpg',
    '/memories/IMG-20230203-WA0039.jpg',
    '/memories/IMG-20230203-WA0040.jpg',
    '/memories/IMG-20230203-WA0041.jpg',
    '/memories/IMG-20230203-WA0043.jpg',
    '/memories/IMG-20230203-WA0044.jpg',
    '/memories/IMG-20230203-WA0045.jpg',
    '/memories/IMG-20230203-WA0046.jpg',
    '/memories/IMG-20230203-WA0047.jpg',
    '/memories/IMG-20230203-WA0048.jpg',
    '/memories/IMG-20230203-WA0049.jpg',
    '/memories/IMG-20230203-WA0050.jpg',
    '/memories/IMG-20230203-WA0051.jpg',
    '/memories/IMG-20230203-WA0052.jpg',
    '/memories/IMG-20230203-WA0053.jpg',
    '/memories/IMG-20230203-WA0054.jpg',
    '/memories/IMG-20230203-WA0055.jpg',
    '/memories/IMG-20230203-WA0056.jpg',
    '/memories/IMG-20230203-WA0057.jpg',
    '/memories/IMG-20230203-WA0058.jpg',
    '/memories/IMG-20230203-WA0059.jpg',
    '/memories/IMG-20230203-WA0060.jpg',
    '/memories/IMG-20230203-WA0062.jpg',
    '/memories/IMG-20230203-WA0063.jpg',
    '/memories/IMG-20230203-WA0064.jpg',
    '/memories/IMG-20230203-WA0065.jpg',
    '/memories/IMG-20230203-WA0066.jpg',
    '/memories/IMG-20230203-WA0067.jpg',
    '/memories/IMG-20230203-WA0068.jpg',
    '/memories/IMG-20230203-WA0069.jpg',
    '/memories/IMG-20230203-WA0070.jpg',
    '/memories/IMG-20230203-WA0071.jpg',
    '/memories/IMG-20230203-WA0072.jpg',
    '/memories/IMG-20230203-WA0073.jpg',
    '/memories/IMG-20230203-WA0074.jpg',
    '/memories/IMG-20230203-WA0075.jpg',
    '/memories/IMG-20230203-WA0076.jpg',
    '/memories/IMG-20230203-WA0077.jpg',
    '/memories/IMG-20230203-WA0079.jpg',
    '/memories/IMG-20230203-WA0080.jpg',
    '/memories/IMG-20230203-WA0081.jpg',
    '/memories/IMG-20230203-WA0082.jpg',
    '/memories/IMG-20230203-WA0083.jpg',
    '/memories/IMG-20230203-WA0084.jpg',
    '/memories/IMG-20230203-WA0085.jpg',
    '/memories/IMG-20230916-WA0003.jpg',
    '/memories/IMG-20230927-WA0011.jpg',
    '/memories/IMG-20231009-WA0003.jpg',
    '/memories/IMG-20231009-WA0004.jpg',
    '/memories/IMG-20231009-WA0005.jpg',
    '/memories/IMG-20231009-WA0006.jpg',
    '/memories/IMG-20231106-WA0026.jpg',
    '/memories/IMG-20240116-WA0002.jpg',
    '/memories/IMG-20240116-WA0003.jpg',
    '/memories/IMG-20240116-WA0004.jpg',
    '/memories/IMG-20240116-WA0005.jpg',
    '/memories/IMG-20240116-WA0006.jpg',
    '/memories/IMG-20240116-WA0007.jpg',
    '/memories/IMG-20240116-WA0008.jpg',
    '/memories/IMG-20240116-WA0009.jpg',
    '/memories/IMG-20240116-WA0010.jpg',
    '/memories/IMG-20240116-WA0011.jpg',
    '/memories/IMG-20240116-WA0012.jpg',
    '/memories/IMG-20240116-WA0013.jpg',
    '/memories/IMG-20240116-WA0014.jpg',
    '/memories/IMG-20240116-WA0015.jpg',
    '/memories/IMG-20240116-WA0017.jpg',
    '/memories/IMG-20240116-WA0018.jpg',
    '/memories/IMG-20240116-WA0019.jpg',
    '/memories/IMG-20240116-WA0020.jpg',
    '/memories/IMG-20240116-WA0021.jpg',
    '/memories/IMG-20240116-WA0022.jpg',
    '/memories/IMG-20240116-WA0023.jpg',
    '/memories/IMG-20240116-WA0024.jpg',
    '/memories/IMG-20240116-WA0025.jpg',
    '/memories/IMG-20240116-WA0026.jpg',
    '/memories/IMG-20240116-WA0027.jpg',
    '/memories/IMG-20240116-WA0028.jpg',
    '/memories/IMG-20240122-WA0004.jpg',
    '/memories/IMG-20240122-WA0005.jpg',
    '/memories/IMG-20240122-WA0006.jpg',
    '/memories/IMG-20240122-WA0007.jpg',
    '/memories/IMG-20240122-WA0009.jpg',
    '/memories/IMG-20240122-WA0010.jpg',
    '/memories/IMG-20240212-WA0021.jpg',
    '/memories/IMG-20240214-WA0003.jpg',
    '/memories/IMG-20240214-WA0004.jpg',
    '/memories/IMG-20240214-WA0005.jpg',
    '/memories/IMG-20240214-WA0006.jpg',
    '/memories/IMG-20240214-WA0008.jpg',
    '/memories/IMG-20240214-WA0009.jpg',
    '/memories/IMG-20240214-WA0010.jpg',
    '/memories/IMG-20240214-WA0011.jpg',
    '/memories/IMG-20240214-WA0012.jpg',
    '/memories/Snapchat-205831397.jpg',
    '/memories/WhatsApp Image 2025-09-13 at 13.35.59 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.35.59 (2).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.35.59.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.36.00 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.36.00.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.37.46.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.37.47.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.37.48.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.31.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.32 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.32 (2).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.32 (3).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.32.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.33 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.33 (2).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.33.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.34 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.38.34.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.47.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.48.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.49.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.50 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.50.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.51.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.52.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.53.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.39.54.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.42.00.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.42.13 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.42.13.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.42.14.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.43.10.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.43.11.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.43.23.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.43.24.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.43.44.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.44.38 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.44.38 (2).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.44.38.jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.44.39 (1).jpeg',
    '/memories/WhatsApp Image 2025-09-13 at 13.44.39.jpeg'
  ];

const Memories = () => {
  const [visibleImages, setVisibleImages] = useState(IMAGES_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  // Handle loading more images
  const loadMore = useCallback(() => {
    if (isLoading) return;
    setIsLoading(true);
    // Simulate network delay
    setTimeout(() => {
      setVisibleImages(prev => Math.min(prev + IMAGES_PER_PAGE, imageFiles.length));
      setIsLoading(false);
    }, 500);
  }, [isLoading]);

  // Set up intersection observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentLoader = loader.current;
    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore]);

  // Group visible images into sections
  const visibleSections = [];
  const imagesPerSection = Math.ceil(visibleImages / 3);
  
  for (let i = 0; i < 3; i++) {
    const startIdx = i * imagesPerSection;
    const endIdx = Math.min(startIdx + imagesPerSection, visibleImages);
    
    if (startIdx >= endIdx) break;
    
    visibleSections.push({
      id: i + 1,
      title: i === 0 ? 'Recent Memories' : i === 1 ? 'More Memories' : 'Special Moments',
      images: imageFiles.slice(startIdx, endIdx)
    });
  }

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-gradient-to-br from-violet-200 to-pink-200">
      <div className="layout-container flex h-full grow flex-col">
        <Navbar />
        
        <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-5xl font-extrabold text-zinc-900 tracking-tight">Memories</h1>
              <p className="mt-4 text-lg text-zinc-600">Relive the joy and laughter from our special moments together.</p>
            </div>
            
            <div className="space-y-16">
              {visibleSections.map((section) => (
                <section key={section.id}>
                  <h2 className="text-3xl font-bold text-zinc-800 mb-6 px-4">{section.title}</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {section.images.map((img, index) => (
                      <div 
                        key={`${section.id}-${index}`}
                        className="group block overflow-hidden rounded-xl"
                      >
                        <div className="relative aspect-square w-full overflow-hidden">
                          <Image
                            src={img}
                            alt={`Memory ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33.33vw, 25vw"
                            priority={index < 12} // Only prioritize loading first 12 images
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
              
              {visibleImages < imageFiles.length && (
                <div ref={loader} className="flex justify-center py-8">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="px-6 py-3 bg-fuchsia-500 text-white rounded-lg hover:bg-fuchsia-600 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Loading...' : 'Load More Memories'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <div className="flex flex-col items-center justify-center py-8">
      <p>End of Memories</p>
      <p>Total number of images {imageFiles.length}</p>
      </div>
    </div>
  );
};

export default Memories;