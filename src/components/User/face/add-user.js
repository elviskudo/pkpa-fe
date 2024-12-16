'use client';
import { useEffect, useRef, useState } from "react";

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

    // Konversi data URL ke blob
    const blob = await (await fetch(capture)).blob();
    const file = new File([blob], `${fileName}.png`, { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    
    try {
      const response = await fetch('/api/image-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (response.ok) {
        setUploadStatus(data.message);
      } else {
        setUploadStatus(data.message || 'Gagal mengunggah gambar');
      }
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Terjadi kesalahan saat mengunggah');
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <video
        ref={videoRef}
        autoPlay
        className="w-full max-w-[600px] rounded-lg"
      />
      <button onClick={takeImage} className="mt-4 p-2 bg-blue-500 text-white rounded">
        Ambil Gambar
      </button>
      <input 
        type='text'
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
        placeholder="Nama file"
        className="mt-4 p-2 text-black border rounded"
      />
      <button onClick={uploadImage} className="mt-4 p-2 bg-green-500 text-white rounded">
        Unggah Gambar
      </button>
      {uploadStatus && (
        <div className="mt-4 text-center text-red-500">
          {uploadStatus}
        </div>
      )}
      <canvas ref={canvasRef} className="hidden" />      
      {capture && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold">Hasil Gambar:</h2>
          <img src={capture} alt="Capture" className="mt-2 rounded-lg max-w-[300px]" />
        </div>
      )}
    </div>
  );
}