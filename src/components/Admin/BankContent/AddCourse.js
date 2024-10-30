// src/components/Admin/AddCourse.js
"use client";
import React, { useState } from "react";
import { Tabs, Tab, Switch } from "@mui/material";
import dynamic from "next/dynamic";
import CustomDropzone from './CustomDropzone';
import Swal from 'sweetalert2';
import ContentSection from "./ContentSection";

// Import Quill editor dynamically for Next.js compatibility
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const AddCourse = ({ onBack, onAddTopicClick, onSave, dataCourse }) => {
    const [title, setTitle] = useState("");
    const [classType, setClassType] = useState("Public");
    const [instructor, setInstructor] = useState("");
    const [discussionEnabled, setDiscussionEnabled] = useState(false);
    const [description, setDescription] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [certificateImage, setCertificateImage] = useState('');
    // Assuming dataCourse[0] is the course to be edited
    const course = dataCourse[0];
    const [topics, setTopics] = useState(course.topics || []);
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [topicErrors, setTopicErrors] = useState({});
    const handleCancel = () => setIsAddingTopic(false);

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
            category_id: classType,
            category: dataCourse.find(course => course.category.id === Number(classType))?.category || {},
            teacher_id: Number(instructor),
            teacher: dataCourse.find(course => course.teacher.id === Number(instructor))?.teacher || {},
            university: { name: "Example University" }, // Replace as needed
            detail: [], // Add as necessary
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
    const handleAddTopicClick = () => {
        setIsAddingTopic(true);
        setTopicErrors({});
    };

    const handleSaveTopic = () => {
        if (!course.name || !course.description) {
            setTopicErrors({
                name: !course.name ? "Judul Topik harus diisi" : "",
                description: !course.description ? "Deskripsi Konten harus diisi" : "",
            });
            return;
        }

        const newTopic = {
            id: Date.now(),
            name: course.name,
            description: course.description,
            contentType: "Video", // Assuming default
        };

        setTopics([...topics, newTopic]);
        setIsAddingTopic(false);
    };

    const handleDeleteTopic = (topicId) => {
        setTopics(topics.filter(topic => topic.id !== topicId));
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
                        <label className="block mt-4">Nama Tutor</label>
                        <select
                            value={instructor}
                            onChange={(e) => setInstructor(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300">
                            <option value="">Pilih Tutor</option>
                            {dataCourse.map((course) => (
                                <option key={course.teacher.id} value={course.teacher.id}>
                                    {course.teacher.name}
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
                                    label="Upload Sertifikat"
                                    onDelete={handleDeleteCertificateImage}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Mata Kuliah Turunan Section */}
                    <div className="bg-white p-6 rounded-md shadow-md mb-6">
                        <label className="block font-bold">Mata Kuliah Turunan</label>
                        <div className="mt-4">
                            <label className="block font-medium">Mata Kuliah Selanjutnya</label>
                            <select className="mt-2 border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300">
                                <option value="">Pilih Mata Kuliah</option>
                                {dataCourse.map((course) => (
                                    <option key={course.category.id} value={course.category.id}>
                                        {course.category.name}
                                    </option>
                                ))}
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
                        {!isAddingTopic && (
                            <button onClick={handleAddTopicClick} className="mt-4 px-4 py-2 bg-orange-500 text-white rounded-md">
                                Tambah Topik
                            </button>
                        )}
                    </div>
                    {/* Topics List */}
                    <div className="mt-4">
                        {topics.map(topic => (
                            <div key={topic.id} className="bg-gray-100 p-4 rounded-md mb-4 flex justify-between items-center">
                                <div>
                                    <h4 className="font-bold">{topic.name}</h4>
                                    <p>{topic.contentType}</p>
                                </div>
                                <button onClick={() => handleDeleteTopic(topic.id)} className="text-red-500">
                                    Hapus
                                </button>
                            </div>
                        ))}
                    </div>
                    {/* Add Topic Form */}
                    {isAddingTopic && (
                        <div className="bg-white p-6 rounded-md shadow-md mb-6">
                            <h4 className="text-md font-semibold">Tambah Topik</h4>
                            <div className="flex items-center mb-4">
                                <div className="w-3/5 mr-4">
                                    <label className="block text-gray-700 font-medium mb-1">Judul Topik</label>
                                    <input
                                        type="text"
                                        value={course.name}
                                        onChange={(e) => setTitle(e.target.value)}
                                        placeholder="Harus berupa huruf, angka, spasi, simbol ampersand (&), titik (.) dan strip (-)"
                                        maxLength={150}
                                        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                                    />
                                    {topicErrors.name && <p className="text-red-500 text-sm mt-1">{topicErrors.name}</p>}
                                    <div className="text-right text-gray-400 text-sm">{`${course.name.length} / 150`}</div>
                                </div>

                                <div className="w-1/9 mr-4 mb-5">
                                    <label className="block text-gray-700 font-medium mb-1">Urutan</label>
                                    <select
                                        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                                        value={course.order || 1}
                                        onChange={(e) => setOrder(Number(e.target.value))}>
                                        {[...Array(10)].map((_, i) => (
                                            <option key={i} value={i + 1}>{i + 1}</option>
                                        ))}
                                    </select>
                                </div>
                                <button
                                    onClick={handleSaveTopic}
                                    className="h-10 px-6 bg-orange-500 text-white rounded-md font-medium mt-2">
                                    Simpan
                                </button>
                            </div>
                            {/* Konten Section */}
                            <h3 className="text-lg font-bold mb-2">Konten</h3>
                            <ContentSection handleCancel={handleCancel} />
                        </div>
                    )}
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
