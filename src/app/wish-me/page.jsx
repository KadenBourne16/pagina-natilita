'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { SaveWish } from '@/server/wish-message';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetWishess } from '@/server/get_wishes';
import { urlFor } from "@/lib/imageUrl";
import Navbar from '../components/navbar';

const WishMe = () => {
  const [wishes, setWishes] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const eventSourceRef = useRef(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    message: '',
    image: null,
    imagePreview: ''
  });
  const fileInputRef = useRef(null);
 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchInformation = async() => {
    const fetch_wishes_response = await GetWishess();
    if(fetch_wishes_response.type === "success"){
      setWishes(fetch_wishes_response.data)
    }
    console.log(fetch_wishes_response.data);
  } 

useEffect(() => {
  fetchInformation();
}, [])

useEffect(() => {
  // Function to fetch wishes
  const fetchWishes = async () => {
    try {
      const response = await fetch("/api/wishes");
      if (!response.ok) throw new Error("Failed to fetch wishes");
      if(response){
        fetchInformation();
      }

    } catch (error) {
      console.error("Error fetching wishes:", error);
      toast.error("Failed to load wishes");
    } finally {
      setIsLoading(false);
    }
  };

  // Initial fetch
  fetchWishes();

  // Set up SSE connection
  const setupSSE = () => {
    const eventSource = new EventSource("/api/sse");

    eventSource.onmessage = (event) => {
      if (!event.data) return; // 👈 ignore heartbeat or empty events

      try {
        const data = JSON.parse(event.data);
        if (data.type === "update") {
          fetchWishes();
        } else if (data.type === "connected") {
          console.log("SSE connected");
        }
      } catch (err) {
        console.warn("Non-JSON SSE message:", event.data);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE Error:", error);
      eventSource.close();

      // Reconnect after 5s
      setTimeout(setupSSE, 5000);
    };

    eventSourceRef.current = eventSource;
  };

  setupSSE();

  // Cleanup on unmount
  return () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
  };
}, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        alert('Image size should be less than 10MB');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          image: file,
          imagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form fields
    if (!formData.username.trim()) {
      toast.error('Please enter your username', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    if (!formData.message.trim()) {
      toast.error('Please enter your birthday wish', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }
    
    const toastId = toast.loading('Sending your wish...', {
      position: "top-right"
    });
    
    try {
      // Create FormData to properly handle file upload
      const formDataToSend = new FormData();
      formDataToSend.append('username', formData.username.trim());
      formDataToSend.append('message', formData.message.trim());
      
      // Only append image if it exists
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }
      
      const result = await SaveWish(formDataToSend);
      console.log('Server response:', result);
      
      if (!result.success) {
        throw new Error(result.message || 'Failed to save wish');
      }
      
      // Reset form on successful submission
      setFormData({
        username: '',
        message: '',
        image: null,
        imagePreview: ''
      });
      
      // Close the modal
      setIsModalOpen(false);
      
      // Show success message
      toast.update(toastId, {
        render: result.message || 'Your wish has been sent successfully! 🎉',
        type: "success",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
    } catch (err) {
      console.error("Error occurred:", err);
      toast.update(toastId, {
        render: err.message || 'There was an error sending your wish. Please try again.',
        type: "error",
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Animation variants
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
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-gradient-to-br from-violet-200 to-pink-200 min-h-screen">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Head>
        <title>Birthday Wishes</title>
        <meta name="description" content="Send your birthday wishes" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;700;900&family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
          rel="stylesheet"
        />
      </Head>

      <div className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden" style={{ fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif' }}>
        <div className="layout-container flex h-full grow flex-col">
          <Navbar/>

          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8 pt-24">
            <div className="max-w-6xl mx-auto">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-4">
                  Birthday Wishes
                </h1>
                <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
                  Share your heartfelt wishes for Joselove's special day.
                </p>
                
                <motion.div 
                  className="mt-12 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-fuchsia-500 hover:bg-fuchsia-600 text-white font-bold px-8 py-3.5 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                  >
                    <span className="text-xl">+</span>
                    <span>Add Your Wish</span>
                  </button>
                </motion.div>
              </motion.div>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-fuchsia-500"></div>
                </div>
              ) : (
                <motion.div 
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                  variants={container}
                  initial="hidden"
                  animate="show"
                >
                  {wishes.map((wish, index) => (
                    <motion.div
                      key={wish._id}
                      variants={item}
                      className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 rounded-full bg-pink-50 flex-shrink-0 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                            {wish.image?.asset?._ref ? (
                              <img
                                src={urlFor(wish.image).width(56).height(56).url()}
                                alt={wish.username || "Anonymous"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-2xl">{wish.username ? wish.username.charAt(0).toUpperCase() : '🎂'}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="font-bold text-zinc-800 text-lg truncate">
                              {wish.username || 'Anonymous'}
                            </p>
                            <p className="text-sm text-zinc-500">
                              {new Date(wish._createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                        </div>
                        <p className="text-zinc-700 leading-relaxed">{wish.message}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}

              <div className="mt-16 text-center">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-pink-500 px-8 py-3 text-white text-base font-bold shadow-lg transition-transform duration-200 hover:scale-105 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-violet-100"
                >
                  <span className="material-symbols-outlined">+</span>
                  <span>Add Your Wish</span>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Wish Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && setIsModalOpen(false)}
          >
            <motion.div 
              className="bg-white rounded-2xl max-w-md w-full mx-4 relative overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="p-6 sm:p-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-zinc-900">Send Your Wish</h2>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-zinc-400 hover:text-zinc-600 transition-colors p-1 -mr-2"
                    aria-label="Close"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Your Photo (optional, max 10MB)
                </label>
                <div className="mt-1 flex items-center">
                  <button
                    type="button"
                    onClick={triggerFileInput}
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <span className="material-symbols-outlined mr-2">upload</span>
                    {formData.image ? 'Change Photo' : 'Upload Photo'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  {formData.imagePreview && (
                    <div className="ml-4">
                      <div className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username *
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2 border"
                  placeholder="Enter your username"
                />
              </div>

              {/* Message Input */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Your Wish *
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring-pink-500 sm:text-sm p-2 border"
                  placeholder="Type your birthday wish here..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-pink-500 hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Send Wish
                </button>
              </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WishMe;
