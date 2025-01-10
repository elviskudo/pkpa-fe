"use client"
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ContentDropzone from "./ContentDropzone";

// Import Quill editor dynamically for Next.js compatibility
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const ContentSection = ({ handleCancel, onSaveContent,onOrderChange, contentData }) => {
    const [contentTitle, setContentTitle] = useState(contentData?.title || "");
    const [contentType, setContentType] = useState(contentData?.type || "Video");
    const [contentDescription, setContentDescription] = useState(contentData?.description || "");
    const [order, setOrder] = useState(contentData?.order || 1);
    const [thumbnail, setThumbnail] = useState(contentData?.thumbnail || "");
    const [videoUrl, setVideoUrl] = useState(contentData?.video_url || "");
    const [pdfFileUrl, setPdfFileUrl] = useState(contentData?.file_url || "");

    useEffect(() => {
        if (contentData) {
            setContentTitle(contentData.title || "");
            setContentType(contentData.type || "Video");
            setContentDescription(contentData.description || "");
            setOrder(contentData.order || 1);
    
            const uploadedFiles = contentData.uploaded_files || [];
            if (uploadedFiles.length > 0) {
                uploadedFiles.forEach((file) => {
                    if (file.file_type === 'image') {
                        setThumbnail(file.file_url);
                    } else if (file.file_type === 'video') {
                        setVideoUrl(file.file_url);
                    } else if (file.file_type === 'pdf') {
                        setPdfFileUrl(file.file_url);
                    }
                });
            }
        }
    }, [contentData]);
    
    const handleOrderChange = (e) => {
        const newOrder = Number(e.target.value);
        if (newOrder !== order) { // Only trigger if the new order is different
            setOrder(newOrder);
            onOrderChange(newOrder, contentData);
        }
    };
    
    const handleSaveContentSection = () => {
        let contentData;
        let uploadedFiles = [];
    
        switch (contentType) {
            case "Video":
                uploadedFiles = [
                    {
                        id: Date.now(), // Generate a unique ID
                        uuid: 'video-uuid-' + Date.now(), // Example unique identifier
                        name: 'video_thumbnail',
                        model: 'App\\Models\\Batch',
                        relation_id: 'relation-id-video-thumbnail', // Example relation ID
                        url_name: 'thumbnail_url',
                        file_type: 'image',
                        file_url: thumbnail,
                        uploaded_at: new Date().toISOString(),
                    },
                    {
                        id: Date.now() + 1,
                        uuid: 'video-uuid-' + (Date.now() + 1),
                        name: 'video_file',
                        model: 'App\\Models\\Batch',
                        relation_id: 'relation-id-video-file',
                        url_name: 'video_url',
                        file_type: 'video',
                        file_url: videoUrl,
                        uploaded_at: new Date().toISOString(),
                    }
                ];
                contentData = {
                    title: contentTitle,
                    type: contentType,
                    description: contentDescription,
                    order,
                    uploaded_files: uploadedFiles,
                };
                break;
    
            case "PDF":
                uploadedFiles = [
                    {
                        id: Date.now(),
                        uuid: 'pdf-uuid-' + Date.now(),
                        name: 'pdf_file',
                        model: 'App\\Models\\Batch',
                        relation_id: 'relation-id-pdf-file',
                        url_name: 'pdf_url',
                        file_type: 'pdf',
                        file_url: pdfFileUrl,
                        uploaded_at: new Date().toISOString(),
                    }
                ];
                contentData = {
                    title: contentTitle,
                    type: contentType,
                    description: contentDescription,
                    order,
                    uploaded_files: uploadedFiles,
                };
                break;
    
            case "Image":
                uploadedFiles = [
                    {
                        id: Date.now(),
                        uuid: 'image-uuid-' + Date.now(),
                        name: 'image_file',
                        model: 'App\\Models\\Batch',
                        relation_id: 'relation-id-image-file',
                        url_name: 'image_url',
                        file_type: 'image',
                        file_url: thumbnail,
                        uploaded_at: new Date().toISOString(),
                    }
                ];
                contentData = {
                    title: contentTitle,
                    type: contentType,
                    description: contentDescription,
                    order,
                    uploaded_files: uploadedFiles,
                };
                break;
    
            default:
                contentData = {
                    title: contentTitle,
                    type: contentType,
                    description: contentDescription,
                    order,
                    uploaded_files: [],
                };
                break;
        }
        onSaveContent(contentData);
    };
    
    return (
        <div className="bg-white p-6 rounded-md shadow-md border border-gray-300 mb-6">
            <h3 className="text-lg font-medium mb-4">Konten</h3>

            {/* Judul Konten */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Judul Konten</label>
                <input
                    type="text"
                    value={contentTitle}
                    onChange={(e) => setContentTitle(e.target.value)}
                    placeholder="Harus berupa huruf, angka, spasi, simbol ampersand (&), titik (.) dan strip (-)"
                    maxLength={150}
                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                />
                <div className="text-right text-gray-400 text-sm">{`${contentTitle.length} / 150`}</div>
            </div>

            {/* Tipe Konten */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Tipe Konten</label>
                <div className="flex space-x-4">
                    {["Video", "Image", "PDF", "Quiz", "Tugas", "External Link"].map((type) => (
                        <label key={type} className="inline-flex items-center">
                            <input
                                type="radio"
                                value={type}
                                checked={contentType === type}
                                onChange={() => setContentType(type)}
                                className="form-radio text-orange-500"
                            />
                            <span className="ml-2">{type}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Deskripsi Konten */}
            <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">Deskripsi Konten</label>
                <ReactQuill
                    value={contentDescription}
                    onChange={setContentDescription}
                    placeholder="Masukkan deskripsi konten"
                    className="h-40 mb-4"
                />
            </div>

            {/* Conditional Fields */}
            {contentType === "Video" && (
                <div className="flex flex-col space-y-6 mt-12">
                    {/* Sampul Section */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/4">
                            <label className="block text-gray-700 font-medium">Sampul</label>
                            <small className="block text-gray-500">Gambar akan ditampilkan sebagai thumbnail video. Maksimum 10 MB. Format gambar jpg/png.</small>
                        </div>
                        <div className="w-1/2 ml-4">
                            <ContentDropzone label="Tarik file ke sini atau klik untuk upload" maxFileSize={10} onDropFile={(url) => setThumbnail(url)} file={thumbnail} />
                        </div>
                    </div>

                    {/* Order Field */}
                    <div className="flex items-center w-full mb-4">
                        <label className="text-gray-700 font-medium mr-4 min-w-max">Urutan</label>
                        <input
                            type="number"
                            value={order}
                            onChange={handleOrderChange}
                            min="1"
                            className="border rounded-md px-3 py-2 w-1/4 focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                    </div>

                    {/* File Video Section */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/4">
                            <label className="block text-gray-700 font-medium">File Video</label>
                            <small className="block text-gray-500">Maksimum ukuran file 100 MB, Format video AVI, MP4</small>
                        </div>
                        <div className="w-1/2">
                            <ContentDropzone label="Tarik file ke sini atau klik untuk upload" maxFileSize={100} onDropFile={(url) => setVideoUrl(url)} file={videoUrl} />
                        </div>
                        <div className="w-1/4 ml-4 mt-10">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Preview</button>
                        </div>
                    </div>
                </div>
            )}

            {contentType === "PDF" && (
                <div className="flex flex-col space-y-6 mt-12">
                    {/* Order Field */}
                    <div className="flex items-center w-full mb-4">
                        <label className="text-gray-700 font-medium mr-4 min-w-max">Urutan</label>
                        <input
                            type="number"
                            value={order}
                            onChange={handleOrderChange}
                            min="1"
                            className="border rounded-md px-3 py-2 w-1/4 focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                    </div>

                    {/* File PDF Section */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/4">
                            <label className="block text-gray-700 font-medium">File PDF</label>
                            <small className="block text-gray-500">Maksimum ukuran file 10 MB. Format PDF.</small>
                        </div>
                        <div className="w-1/2">
                            <ContentDropzone label="Tarik file ke sini atau klik untuk upload" maxFileSize={10} onDropFile={(url) => setPdfFileUrl(url)} file={pdfFileUrl} />
                        </div>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end space-x-3 mt-6">
                <button onClick={handleSaveContentSection} className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium">Save</button>
                <button onClick={handleCancel} className="px-4 py-2 border border-gray-500 rounded-md">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ContentSection;