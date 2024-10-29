// src/components/Admin/AddCourse.js
"use client";
import React, { useState } from "react";
import { Tabs, Tab, Switch } from "@mui/material";
import dynamic from "next/dynamic";
import dataTeacher from "@/data/DataTeacher";
import CustomDropzone from './CustomDropzone';
import Swal from 'sweetalert2';

// Import Quill editor dynamically for Next.js compatibility
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const AddCourse = ({ onBack,onAddTopicClick, onSave }) => {
    const [title, setTitle] = useState("");
    const [classType, setClassType] = useState("Public");
    const [instructor, setInstructor] = useState("");
    const [discussionEnabled, setDiscussionEnabled] = useState(false);
    const [description, setDescription] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [certificateImage, setCertificateImage] = useState('');
    const [certificateImageSecondary, setCertificateImageSecondary] = useState('');


    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSave = () => {
        const newCourse = {
            id: Date.now(),
            name: title,
            description,
            is_publish: 0,
            is_forum: discussionEnabled ? 1 : 0,
            background_image: backgroundImage,
            certificate: certificateImage,
            detail: [],
            university: { name: "Example University" }
        };
        onSave(newCourse);
    };

    const handleDeleteBackgroundImage = () => {
        setBackgroundImage('');
        Swal.fire("Deleted!", "Background image has been removed.", "success");
    };

    const handleDeleteCertificateImage = () => {
        setCertificateImage('');
        Swal.fire("Deleted!", "Certificate image has been removed.", "success");
    };

    const handleDeleteCertificateImageSecondary = () => {
        setCertificateImageSecondary('');
        Swal.fire("Deleted!", "Certificate image has been removed.", "success");
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Tambah Mata Kuliah</h2>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    "& .MuiTab-root": {
                        color: "#f97316",
                    },
                    "& .MuiTab-root.Mui-selected": {
                        color: "#f97316",
                    },
                    "& .MuiTabs-indicator": {
                        backgroundColor: "#f97316",
                    },
                }}>
                <Tab label="1. Informasi Umum" />
                <Tab label="2. Manajemen Konten" />
            </Tabs>

            {activeTab === 0 && (
                <div className="mt-4">
                    {/* Informasi Umum Section */}
                    <div className="bg-white p-6 rounded-md shadow-md mb-6">
                        <h3 className="text-lg font-medium">Informasi Umum</h3>
                        <label className="block mt-4">Judul Mata Kuliah</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Harus berupa huruf, angka, spasi, simbol ampersand (&), titik (.) dan strip (-)"
                            maxLength={150}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                        <div className="text-right text-gray-400 text-sm">{`${title.length} / 150`}</div>

                        <label className="block mt-4">Tipe Kelas</label>
                        <select
                            value={classType}
                            onChange={(e) => setClassType(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300">
                            <option value="Public">Publik</option>
                            <option value="Private">Private</option>
                            <option value="Hybrid">Hybrid</option>
                        </select>

                        <label className="block mt-4">Nama Tutor</label>
                        <select
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300">
                            <option value="">Pilih Tutor</option>
                            {dataTeacher.map((teacher) => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.name}
                                </option>
                            ))}
                        </select>

                        <div className="mt-4">
                            <label className="font-bold block mb-1">Diskusi Kelas</label>
                            <div className="flex items-center">
                                <p className="text-sm text-gray-500 mr-2">
                                    Jika diskusi aktif, fitur forum diskusi akan tampil di dashboard siswa
                                </p>
                                <Switch
                                    checked={discussionEnabled}
                                    onChange={() => setDiscussionEnabled(!discussionEnabled)}
                                    color="primary"
                                />
                                <span className="ml-2 font-bold">{discussionEnabled ? "Aktif" : "Tidak Aktif"}</span>
                            </div>
                        </div>

                        <label className="block mt-4">Deskripsi</label>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            placeholder="Masukkan deskripsi kursus"
                            theme="snow"
                            className="h-40 mb-4" />
                        <div className="text-right text-gray-400 text-sm">{`${description.length} / 300 - minimal 30 karakter`}</div>
                    </div>

                    {/* Foto Kelas Section */}
                    <div className="bg-white p-6 rounded-md shadow-md mb-6">
                        <label className="block font-bold">Foto Kelas</label>
                        <div className="mt-4">
                            <CustomDropzone
                                file={backgroundImage}
                                setFile={setBackgroundImage}
                                label=""
                                onDelete={handleDeleteBackgroundImage}
                            />
                        </div>
                    </div>

                    {/* Info Sertifikat Section */}
                    <div className="bg-white p-6 rounded-md shadow-md mb-6">
                        <label className="block font-bold">Info Sertifikat</label>
                        <div className="mt-4 flex space-x-8 items-start">
                            {/* Left section with description and download link */}
                            <div className="w-1/3">
                                <h3 className="text-md font-bold">Sertifikat</h3>
                                <p className="text-gray-500 text-sm mt-1">Ada 2 bentuk sertifikat yang akan diterima oleh peserta</p>
                                <a href="/path/to/guideline.pdf" download className="text-blue-500 text-sm mt-2 inline-block">
                                    Download Guideline
                                </a>
                            </div>

                            {/* Right section with the certificate upload area */}
                            <div className="flex space-x-4">
                                <CustomDropzone
                                    file={certificateImage}
                                    setFile={setCertificateImage}
                                    label="Tanda Lulus Mata Kuliah"
                                    onDelete={handleDeleteCertificateImage}
                                />
                                <CustomDropzone
                                    file={certificateImageSecondary}
                                    setFile={setCertificateImageSecondary}
                                    label="Keterangan Tanda Lulus Mata Kuliah"
                                    onDelete={handleDeleteCertificateImageSecondary}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mata Kuliah Turunan Section */}
                    <div className="bg-white p-6 rounded-md shadow-md mb-6">
                        <label className="block font-bold">Mata Kuliah Turunan</label>
                        <div className="mt-4">
                            <label className="text-gray-500 text-sm mb-2 block">Mata Kuliah Selanjutnya</label>
                            <select className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300">
                                <option value="praktek_non_litigasi">Materi Praktik Non Litigasi</option>
                                <option value="materi_1">Materi 1</option>
                                <option value="materi_2">Materi 2</option>
                                <option value="materi_3">Materi 3</option>
                                {/* Add additional options as needed */}
                            </select>
                        </div>
                    </div>
                </div>
            )}
            {activeTab === 1 && (
                <div className="mt-4">
                    <h3 className="text-lg font-medium">Manajemen Konten</h3>
                    <div className="flex justify-between items-center mt-4 mb-6">
                        <span className="text-gray-700 font-bold">Topik</span>
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={onAddTopicClick}>+ Tambah Topik</button>
                    </div>
                </div>
            )}

            <div className="flex justify-end mt-6 space-x-4">
                {activeTab === 0 ? (
                    <>
                        <button onClick={onBack} className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md">
                            Kembali
                        </button>
                        <button
                            onClick={() => setActiveTab(1)}
                            className="px-4 py-2 bg-orange-500 text-white rounded-md">
                            Simpan & Lanjutkan
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setActiveTab(0)}
                            className="px-4 py-2 border border-orange-500 text-orange-500 rounded-md">
                            Kembali
                        </button>
                        <button onClick={handleSave} className="px-4 py-2 bg-orange-500 text-white rounded-md">Simpan & Lanjutkan</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddCourse;
