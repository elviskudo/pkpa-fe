'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Upload } from 'lucide-react';

export default function AddUser() {
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setErrorMessage('No file selected.');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('File size should not exceed 5MB.');
      return;
    }

    // Check file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
      setErrorMessage('Only PNG, JPG, or JPEG files are supported.');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage('Please enter a user name.');
      return;
    }
    if (!imageFile) {
      setErrorMessage('Please upload an image.');
      return;
    }
  
    setIsLoading(true);
    setErrorMessage('');
  
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      formData.append('name', name);
  
      // Send image to server dengan URL yang benar
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }
  
      if (!data.filename) {
        throw new Error('Filename is undefined');
      }
  
      // Bersihkan URL preview sebelum navigasi
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }

      // Navigate to compare page dengan parameter yang benar
      router.push(`/home/face/compare?name=${encodeURIComponent(name)}&image=${encodeURIComponent(data.filename)}`);
    } catch (error) {
      console.error('Upload error:', error);
      setErrorMessage(error.message || 'Error uploading image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup function untuk URL preview saat komponen unmount
  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  const resetForm = () => {
    setName('');
    setImageFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
      setImagePreview(null);
    }
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Tambah User Baru
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Nama User
            </label>
            <input
              id="username"
              type="text"
              placeholder="Masukkan nama user"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Foto User
            </label>
            <label
              htmlFor="dropzone-file"
              className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {imagePreview ? (
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg opacity-0 hover:opacity-100 transition-opacity">
                    <p className="text-white text-sm">Klik untuk mengubah foto</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-6">
                  <Upload className="w-12 h-12 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 font-medium">
                    Klik untuk upload foto
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    PNG, JPG atau JPEG (max. 5MB)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                accept=".png, .jpg, .jpeg"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />
            </label>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={!name || !imageFile || isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Mengunggah...
                </div>
              ) : (
                'Tambah User'
              )}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-offset-2 focus:ring-
                            focus:ring-indigo-500 transition-colors disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}