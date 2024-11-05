// src/app/upload/page.js
'use client';
import { useState, useCallback } from 'react';


const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif'];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB


export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const validateFile = useCallback((file) => {
    if (!file) return 'Please select a file';
    if (!ALLOWED_TYPES.includes(file.type)) return 'Invalid file type';
    if (file.size > MAX_FILE_SIZE) return 'File too large (max 5MB)';
    return '';
  }, []);


  const handleFileChange = useCallback((event) => {
    const selectedFile = event.target.files[0];
    const error = validateFile(selectedFile);

    setError(error);
    setFile(error ? null : selectedFile);
    setSuccess('');
  }, [validateFile]);


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;
    try {
      setLoading(true);
      setError('');
      setSuccess('');


      const formData = new FormData();
      formData.append('file', file);


      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });


      const data = await res.json();


      if (!res.ok) throw new Error(data.error || 'Upload failed');


      setSuccess(data.message);
      setFile(null);
      event.target.reset();


    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-md mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="file"
            onChange={handleFileChange}
            accept={ALLOWED_TYPES.join(',')}
            disabled={loading}
            className="w-full p-2 border rounded"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          {success && <p className="text-green-500 text-sm mt-1">{success}</p>}
        </div>

        <button
          type="submit"
          disabled={loading || !file}
          className={`w-full p-2 rounded ${loading || !file
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
        >

          {loading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
    </div>
  );
}