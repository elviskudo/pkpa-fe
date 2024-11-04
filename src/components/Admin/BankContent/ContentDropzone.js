import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';

const ContentDropzone = ({
    label = "Tarik file ke sini atau klik untuk upload",
    maxFileSize = "10 MB",
    acceptedFormats = "jpg/png, pdf, video",
    onDropFile,
}) => {
    const [file, setFile] = useState(null);

    const onDrop = (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile) {
            const previewURL = URL.createObjectURL(uploadedFile);
            setFile(previewURL);
            if (onDropFile) onDropFile(uploadedFile);
        }
    };

    const handleDelete = (e) => {
        e.stopPropagation(); // Prevent triggering dropzone click
        setFile(null);
        if (onDropFile) onDropFile(null); // Pass null or handle cleanup if needed
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: 'image/*, video/*, application/pdf', // Accept images, videos, and PDFs
        multiple: false,
    });

    return (
        <div
            {...getRootProps({
                className: "border-2 border-dashed border-gray-300 rounded-md p-4 text-center cursor-pointer w-full h-32 flex flex-col justify-center items-center relative",
            })}
        >
            <input {...getInputProps()} />
            {file ? (
                <div className="relative w-full h-full">
                    {/* Show image preview, or video/PDF icon if applicable */}
                    {file.endsWith('.pdf') || file.endsWith('.mp4') ? (
                        <div className="flex flex-col items-center justify-center h-full">
                            <p className="text-sm text-gray-700">{file.endsWith('.pdf') ? 'PDF File' : 'Video File'}</p>
                        </div>
                    ) : (
                        <img src={file} alt="Preview" className="absolute inset-0 w-full h-full object-cover rounded" />
                    )}
                    <button
                        onClick={handleDelete}
                        className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1"
                    >
                        <DeleteIcon style={{ color: 'red', fontSize: '1.5rem' }} />
                    </button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <CloudUploadIcon style={{ fontSize: '2.5rem', color: 'gray' }} />
                    <p className="text-sm text-gray-700 mt-2">{label}</p>
                    <small className="text-gray-400">Maksimum {maxFileSize}, Format gambar {acceptedFormats}</small>
                </div>
            )}
        </div>
    );
};

export default ContentDropzone;