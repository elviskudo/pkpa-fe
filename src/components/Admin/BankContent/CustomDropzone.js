// src/components/Admin/CustomDropzone.js
import React from 'react';
import { useDropzone } from 'react-dropzone';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';

const CustomDropzone = ({ file, setFile, label, onDelete }) => {
    const onDrop = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file) {
            // Siapkan data untuk dikirim ke Laravel
            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/upload`, {
                    method: 'POST',
                    body: formData,
                });
                
                if (response.ok) {
                    const data = await response.json();
                    setFile(data.url); // Gunakan URL yang dikembalikan dari Cloudinary
                } else {
                    console.error('Failed to upload file');
                }
            } catch (error) {
                console.error('Error uploading to Cloudinary:', error);
            }
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*',
        multiple: false,
    });

    return (
        <div
            {...getRootProps({
                className: `border-2 border-dashed text-center cursor-pointer flex justify-center items-center w-48 h-48 rounded ${
                    file ? '' : 'p-6 bg-gray-200'
                }`,
            })}
        >
            <input {...getInputProps()} />
            {file ? (
                <div className="relative w-full h-full">
                    <img src={file} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded" />
                    <button
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering dropzone click
                            onDelete();
                        }}
                        className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1"
                    >
                        <DeleteIcon style={{ color: 'red', fontSize: '1.5rem' }} />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <AddPhotoAlternateIcon style={{ fontSize: '3rem', color: 'gray' }} />
                    <p className="text-sm">{label}</p>
                </div>
            )}
        </div>
    );
};

export default CustomDropzone;
