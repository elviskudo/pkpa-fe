'use client';
import { useEffect, useRef, useState } from "react";
import axios from '../../../libs/axios';

export default function AddUser() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capture, setCapture] = useState(null); 
  const [fileName, setFileName] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const startVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error tidak bisa mengakses kamera", error);
      }
    };
    startVideo();
  }, []);

  const takeImage = () => { 
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (canvas && video) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageUrl = canvas.toDataURL('image/png');
      setCapture(imageUrl);
    }
  };

  const uploadImage = async () => {
    if (!capture) {
      setUploadStatus('Tidak ada gambar untuk diunggah');
      return;
    }

    if (!fileName.trim()) {
      setUploadStatus('Nama file harus diisi');
      return;
    }

    const blob = await (await fetch(capture)).blob();
    const file = new File([blob], `${fileName}.png`, { type: 'image/png' });

    const formData = new FormData();
    formData.append('image', file);
    formData.append('student_email', fileName);
    
    try {
      const response = await axios.post('/api/home/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      const data = await response.data;
      
      // Perbaiki penanganan response
      if (response.status === 201) {  // Sesuaikan dengan status code Laravel
        setUploadStatus(response.data.message || 'Gambar berhasil diunggah');
      } else {
        setUploadStatus(response.data.error || 'Gagal mengunggah gambar');
      }
    } catch (error) {
      // Tangani error lebih detail
      if (error.response) {
        // Error dari server
        setUploadStatus(error.response.data.error || 'Gagal mengunggah gambar');
      } else if (error.request) {
        // Error jaringan
        setUploadStatus('Tidak dapat terhubung ke server');
      } else {
        // Error lainnya
        setUploadStatus('Terjadi kesalahan');
      }
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl flex space-x-6">
        {/* Kolom Kamera */}
        <div className="w-1/2 space-y-4">
          <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
            Add New User
          </h1>
          
          <div className="mb-6 rounded-lg overflow-hidden shadow-md">
            <video
              ref={videoRef}
              autoPlay
              className="w-full h-64 object-cover"
            />
          </div>
          
          <div className="space-y-4">
            <input 
              type='text'
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter Your Email"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
            />
            
            <button 
              onClick={takeImage} 
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
            >
              Capture Image
            </button>
          </div>
        </div>

        {/* Kolom Captured Image */}
        <div className="w-1/2 space-y-4">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
            Captured Image
          </h2>
          
          {capture ? (
            <div className="space-y-4">
              <div className="rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={capture} 
                  alt="Capture" 
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <button 
                onClick={uploadImage} 
                className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
              >
                Upload Image
              </button>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-500">No image captured</p>
            </div>
          )}

          {uploadStatus && (
            <div className={`mt-4 text-center py-2 rounded ${
              uploadStatus.includes('berhasil') 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {uploadStatus}
            </div>
          )}
        </div>
        
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}