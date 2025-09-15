'use client';
import { useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const WishMe = () => {
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
      alert('Please enter your username');
      return;
    }
    
    if (!formData.message.trim()) {
      alert('Please enter your birthday wish');
      return;
    }
    
    try {
      const response = await fetch('/api/wish-message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          message: formData.message
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit wish');
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
      alert('Your wish has been sent successfully! 🎉');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error sending your wish. Please try again.');
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gradient-to-br from-violet-200 to-pink-200 min-h-screen">
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
          <header className="flex items-center justify-between whitespace-nowrap px-4 sm:px-6 lg:px-10 py-4">
            <div className="flex items-center gap-3 text-zinc-900">
              <svg className="h-8 w-8 text-pink-500" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor" />
              </svg>
              <h2 className="text-xl font-bold tracking-tighter">Joselove's Birthday</h2>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-zinc-700 hover:text-zinc-900 text-sm font-medium">Home</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button className="flex items-center justify-center rounded-full h-10 w-10 text-zinc-700 hover:bg-white/50">
                <span className="material-symbols-outlined">notifications</span>
              </button>
              <div 
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDN9kvkOq7QRCG3fILY9xlcriJkFrj5DgIl755DZi3oGmdfzXGWtxsC69ZK_tSWBK00DHMubos8o1iP-NoUcd2cu0rs9QjiGBl1xWxNdw1OuW4ciuWFMgvS94ZVEzSSnV_tpeJ6xFZF-O88ejfmF7oGYCoEhnicB0npoZbup4Db5etRO5BbsmSwOwnYvKqNaLkwAda8hA1bryk7jawbvmrI3KQvYvHcQxZfzQDO-QwDN0R3HPZ8m5-9kDkIKxG9iUCOUw_BwaP2IrM')` }}
              />
            </div>
          </header>

          <main className="flex-1 px-4 py-8 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-zinc-900">Birthday Wishes</h1>
                <p className="mt-4 text-lg text-zinc-600">Share your heartfelt wishes for Joselove's special day.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Wish Card 1 */}
                <div className="bg-white/70 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full bg-cover bg-center" 
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDNjw3bNWCK69vOEnbP0HlAsm-Ipw8A0ZZd-sFntgxhI3euAPwWg-LSigZfV3fuEOriQsRRx5ralkm8HbUTfyiKK2xUxk2KLQNTDOsBYU7d66qzotfbV6NmBonc7dGwki2GexYgqiDEXPPmUMCSRMWo7HIvUGiJtDmHFJ8dnH0Kxl6WN6a4n_IViL5P2nA3EvF_MBlvnsg7_9S7cYJQCmvzsg7p-H9dwZWFa_Erm78uLDgkp38GX_TM5rhSWVv5O5SzXJMSnzxM-UI")' }}
                      />
                      <div>
                        <p className="font-bold text-zinc-800 text-lg">From Alex</p>
                      </div>
                    </div>
                    <p className="text-zinc-600">Wishing you a day filled with joy and laughter, and a year ahead full of amazing adventures. Happy Birthday, Joselove!</p>
                  </div>
                </div>

                {/* Wish Card 2 */}
                <div className="bg-white/70 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full bg-cover bg-center" 
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCGdv-Kw0SVGahfC78JbHscCqFvtA97LsMLTtPMwBl_cOaA1iqbK7PgVgHirMMu-gDWkT2Mw_dIhR8NSxBvOb7sgAi3N7-AQCAjiZyMh-6NQ5RfXDT6zJ1Pmeu4OkJ5pz0kbLJedd7KMoa6eHc3xQpKYyU528iEbB7OkXgB1kzUVEsMtlAIt1a_B43WylSQXu_XarI_YGITexfZpkN2hX6bxuhSNsnfxN6xPFt3PClGlsGvFCDoJRv0tUtiNcgRZzHFCQvPcZ2r5ms")' }}
                      />
                      <div>
                        <p className="font-bold text-zinc-800 text-lg">From Emily</p>
                      </div>
                    </div>
                    <p className="text-zinc-600">Happy Birthday, Joselove! May your day be as bright and beautiful as you are. Enjoy every moment!</p>
                  </div>
                </div>

                {/* Wish Card 3 */}
                <div className="bg-white/70 rounded-xl shadow-lg backdrop-blur-sm overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <div className="p-6 flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-full bg-cover bg-center" 
                        style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC03VsrW_u1E8xuSErn6Qx4TzkMrLazMrUsyGonBCSCl5l6PoToBbg_NZI4meJsMR1_0Hf_h09XNaTd3sdg5K1PfkGVgoFzDnuMQe5Pd3F1nQoANcE1zDVYN7yU9OIRK7g46j_PjmXgb6ynsn1Z3CGOlPi-SUVhIkrM50HcHZm-NIx96iDDgE-FVkQ5b3pVRriOQ5PT0Xbb0D2VZi-8tStr2kNFVKOoz7GkEr5f5GQLAA6kxO4JPX_9Oulr1z8BiLqg4QvoHcmiN5E")' }}
                      />
                      <div>
                        <p className="font-bold text-zinc-800 text-lg">From David</p>
                      </div>
                    </div>
                    <p className="text-zinc-600">Happy Birthday, Joselove! Wishing you all the best on your special day. May your dreams come true!</p>
                  </div>
                </div>
              </div>

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
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Your Wish</h2>
            
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
        </div>
      )}
    </div>
  );
};

export default WishMe;
