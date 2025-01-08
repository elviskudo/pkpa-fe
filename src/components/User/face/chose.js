'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Chose() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validasi email
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
  }

    // Hapus error jika valid
    setError('');
    
    // Navigasi ke halaman compare dengan email sebagai query parameter
    router.push(`/home/face2/compare?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl overflow-hidden">
        <div className="p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Face Recognition</h1>
            <p className="text-gray-500 text-sm">Enter your Email to get started</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input 
                id="email"
                type="email" 
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(''); // Hapus error saat mengetik
                }}
                placeholder="Enter your email"
                required
                className={`w-full text-black px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition duration-300 
                  ${error 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                  }`}
              />
              {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
              )}
            </div>
            
            <div className="flex flex-col space-y-4">
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Compare Face
              </button>
              
              <Link 
                href="/home/face/add-user"
                className="w-full text-center bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Add New User
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}