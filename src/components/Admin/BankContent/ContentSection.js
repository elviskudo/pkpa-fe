"use client"
import React, { useState } from "react";
import dynamic from "next/dynamic";
import CustomDropzone from './CustomDropzone';
import ContentDropzone from "./ContentDropzone";

// Import Quill editor dynamically for Next.js compatibility
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const ContentSection = ({ handleCancel }) => {
    const [contentTitle, setContentTitle] = useState("");
    const [contentType, setContentType] = useState("Video"); // Default to Video
    const [contentDescription, setContentDescription] = useState("");
    const [accessLimit, setAccessLimit] = useState(1);
    const [order, setOrder] = useState(1);

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
                        <div className="w-3/4 ml-4">
                            <ContentDropzone label="Tarik file ke sini atau klik untuk upload" maxFileSize={10} />
                        </div>
                    </div>

                    {/* Batas Akses and Urutan Section */}
                    <div className="flex flex-col w-1/2 space-y-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Batas Akses</label>
                            <input
                                type="number"
                                value={accessLimit}
                                onChange={(e) => setAccessLimit(e.target.value)}
                                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                            />
                        </div>
                        <div className="flex items-center">
                            <label className="block text-gray-700 font-medium mb-1">Urutan</label>
                            <select
                                value={order}
                                onChange={(e) => setOrder(Number(e.target.value))}
                                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300">
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* File Video Section */}
                    <div className="flex items-start mb-4">
                        <div className="w-1/2">
                            <label className="block text-gray-700 font-medium">File Video</label>
                            <small className="block text-gray-500">Maksimum ukuran file 100 MB, Format video AVI, MP4</small>
                            <ContentDropzone label="Tarik file ke sini atau klik untuk upload" maxFileSize={100} />
                        </div>
                        <div className="w-1/4 ml-4 mt-6">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Preview</button>
                        </div>
                    </div>
                </div>
            )}


            {contentType === "PDF" && (
                <div>
                    {/* PDF Specific Fields */}
                    <div className="flex space-x-4 mb-4">
                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Batas Akses</label>
                            <input
                                type="number"
                                value={accessLimit}
                                onChange={(e) => setAccessLimit(e.target.value)}
                                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-medium mb-1">Urutan</label>
                            <select
                                value={order}
                                onChange={(e) => setOrder(Number(e.target.value))}
                                className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                            >
                                {[...Array(10)].map((_, i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-1">File PDF</label>
                        <CustomDropzone label="Tarik file ke sini atau klik untuk upload" maxFileSize={100} />
                        <small className="text-gray-500">Maksimum ukuran file 10 MB. Format PDF.</small>
                    </div>
                </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end space-x-3 mt-6">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md font-medium">Save</button>
                <button onClick={handleCancel} className="px-4 py-2 border border-gray-500 rounded-md">
                    Cancel
                </button>
            </div>
        </div>
    );
};

export default ContentSection;
