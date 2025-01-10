// src/components/Admin/EditCourse.js
"use client";
import React, { useState, useEffect } from "react";
import { Tabs, Tab, Switch } from "@mui/material";
import dynamic from "next/dynamic";
import CustomDropzone from './CustomDropzone';
import Swal from 'sweetalert2';
import ContentSection from "./ContentSection"; // Gunakan ContentSection daripada EditContentSection
import { PencilIcon, TrashIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import VideocamIcon from '@mui/icons-material/Videocam';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import QuizIcon from '@mui/icons-material/Quiz';
import AssignmentIcon from '@mui/icons-material/Assignment';
import LinkIcon from '@mui/icons-material/Link';

// Import Quill editor dynamically for Next.js compatibility
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const EditCourse = ({ onBack, onSave, dataCourse }) => {
    const existingCourse = dataCourse[0] || {};

    const [courseTitle, setCourseTitle] = useState("");
    const [classType, setClassType] = useState("100");
    const [instructor, setInstructor] = useState("");
    const [discussionEnabled, setDiscussionEnabled] = useState(false);
    const [description, setDescription] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [certificateImage, setCertificateImage] = useState('');
    const [topics, setTopics] = useState([]);
    const [orderTopic, setOrderTopic] = useState("");
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [contentSections, setContentSections] = useState([{}]); 
    const [topicErrors, setTopicErrors] = useState({});
    const [editingTopicId, setEditingTopicId] = useState(null);
    const [topicTitle, setTopicTitle] = useState("");
    const [orderCourse, setOrderCourse] = useState(1);

    useEffect(() => {
        if (existingCourse) {
            setCourseTitle(existingCourse.name || "");
            setDescription(existingCourse.description || "");
            setDiscussionEnabled(existingCourse.is_forum === 1 ? true : false);
            setBackgroundImage(existingCourse.background_image || "");
            setCertificateImage(existingCourse.certificate || "");
            setClassType(existingCourse.class_type?.toString() || "100");
            setInstructor(existingCourse.teacher_id ? existingCourse.teacher_id.toString() : "");
            setTopics(existingCourse.topics || []);
            setOrderCourse(existingCourse.order || 1);
        }
    }, [existingCourse]);

    const getContentIcon = (type) => {
        const iconStyle = { fontSize: '60px' };
        switch (type) {
            case "Video":
                return <VideocamIcon style={iconStyle} />;
            case "Image":
                return <ImageIcon style={iconStyle} />;
            case "PDF":
                return <PictureAsPdfIcon style={iconStyle} />;
            case "Quiz":
                return <QuizIcon style={iconStyle} />;
            case "Tugas":
                return <AssignmentIcon style={iconStyle} />;
            case "External Link":
                return <LinkIcon style={iconStyle} />;
            default:
                return null;
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleOrderChangeForTopics = (newOrder, topicId) => {
        setTopics(prevTopics => {
            const currentTopic = prevTopics.find(topic => topic.id === topicId);
            const updatedTopics = prevTopics.map(topic => {
                if (topic.id === topicId) {
                    return { ...topic, order: newOrder };
                } else if (topic.order >= newOrder && topic.order < currentTopic.order) {
                    return { ...topic, order: topic.order + 1 };
                } else if (topic.order <= newOrder && topic.order > currentTopic.order) {
                    return { ...topic, order: topic.order - 1 };
                }
                return topic;
            });

            const reassignedTopics = updatedTopics
                .sort((a, b) => a.order - b.order)
                .map((topic, index) => ({ ...topic, order: index + 1 }));
            return reassignedTopics;
        });
    };

    const toggleCollapse = (topicId) => {
        setTopics(prevTopics =>
            prevTopics.map(topic =>
                topic.id === topicId ? { ...topic, collapsed: !topic.collapsed } : topic
            )
        );
    };

    const handleCancelContentSection = (index) => {
        setContentSections(prevSections => {
            const updatedSections = prevSections.filter((_, i) => i !== index)
                .map((section, i) => ({ ...section, order: i + 1 })); 
            return updatedSections;
        });
    };

    const handleAddContentSection = () => {
        const newSection = { order: contentSections.length + 1, title: "", type: "Video", description: "" };
        setContentSections([...contentSections, newSection]);
    };

    const handleEditContentSection = (topic) => {
        setContentSections(topic.batches || []);
        setEditingTopicId(topic.id);
        setTopicTitle(topic.name);
        setOrderTopic(topic.order);
    };

    const handleSaveContentSection = (contentData, index) => {
        setContentSections(prevSections => {
            const updatedSections = [...prevSections];
            updatedSections[index] = contentData;
            return updatedSections;
        });
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
        const nextOrder = topics.length
            ? Math.max(...topics.map(topic => topic.order)) + 1
            : 1;
        setOrderTopic(nextOrder);
        setIsAddingTopic(true);
        setContentSections([{}]);
        setEditingTopicId(null);
        setTopicTitle("");
    };

    const handleSaveTopic = () => {
        const newTopic = {
            id: editingTopicId ?? Date.now(),
            name: topicTitle,
            order: orderTopic,
            batches: contentSections,
        };
    
        setTopics(prevTopics => {
            let updatedTopics;
            if (editingTopicId) {
                updatedTopics = prevTopics.map(topic => {
                    if (topic.id === editingTopicId) {
                        return newTopic;
                    }
                    if (topic.order === newTopic.order && topic.id !== editingTopicId) {
                        return { ...topic, order: topic.order + 1 };
                    }
                    return topic;
                });
            } else {
                updatedTopics = [...prevTopics, newTopic];
            }

            const reassignedTopics = updatedTopics
                .sort((a, b) => a.order - b.order)
                .map((topic, index) => ({ ...topic, order: index + 1 }));
            return reassignedTopics;
        });
    
        setOrderTopic(topics.length + 1);
        setTopicTitle("");
        setEditingTopicId(null);
        setIsAddingTopic(false);
    
        Swal.fire("Success", "Topik berhasil disimpan!", "success");
    };

    const handleOrderTopicChange = (e) => {
        const newOrder = Math.max(1, Number(e.target.value));
        setOrderTopic(newOrder);
        if (editingTopicId) {
            handleOrderChangeForTopics(newOrder, editingTopicId);
        }
    };

    const handleDeleteTopic = (topicId) => {
        setTopics(topics.filter(topic => topic.id !== topicId));
    };

    const handleSave = () => {
        const updatedCourse = {
            ...existingCourse,
            name: courseTitle,
            description,
            is_forum: discussionEnabled ? 1 : 0,
            background_image: backgroundImage,
            certificate: certificateImage,
            class_type: Number(classType),
            teacher_id: Number(instructor),
            topics: topics,
            order: orderCourse,
        };
        onSave(updatedCourse);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4">Edit Mata Kuliah</h2>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={{
                    "& .MuiTab-root": { color: "#f97316" },
                    "& .MuiTab-root.Mui-selected": { color: "#f97316" },
                    "& .MuiTabs-indicator": { backgroundColor: "#f97316" },
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
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            placeholder="Harus berupa huruf, angka, spasi, simbol ampersand (&), titik (.) dan strip (-)"
                            maxLength={150}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                        <div className="text-right text-gray-400 text-sm">{`${courseTitle.length} / 150`}</div>
                        {/* Order Input */}
                        <label className="block mt-4">Order</label>
                        <input
                            type="number"
                            value={orderCourse}
                            onChange={(e) => setOrderCourse(Number(e.target.value))}
                            placeholder="Masukkan urutan mata kuliah"
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                        <label className="block mt-4">Tipe Kelas</label>
                        <select
                            value={classType}
                            onChange={(e) => setClassType(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300">
                            <option value="100">Publik</option>
                            <option value="200">Privat</option>
                            <option value="300">Hybrid</option>
                        </select>

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
                            <div className="w-1/3">
                                <h3 className="text-md font-bold">Sertifikat</h3>
                                <p className="text-gray-500 text-sm mt-1">Ada 2 bentuk sertifikat yang akan diterima oleh peserta</p>
                                <a href="/path/to/guideline.pdf" download className="text-blue-500 text-sm mt-2 inline-block">
                                    Download Guideline
                                </a>
                            </div>
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

                    {/* Topics List in Table Format */}
                    <div>
                        {topics.map((topic) => (
                            <div key={topic.id} className="border rounded-md mb-4 p-4 bg-white shadow">
                                <div className="flex justify-between items-center">
                                    <h4 className="text-lg font-semibold">{topic.name}</h4>
                                    <div className="flex items-center space-x-4">
                                        <button onClick={() => handleEditContentSection(topic)} className="text-blue-500">
                                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        <button onClick={() => handleDeleteTopic(topic.id)} className="text-red-500">
                                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                        <div className="border-l border-gray-300 h-5 mx-2"></div>
                                        <button onClick={() => toggleCollapse(topic.id)} className="text-gray-500">
                                            {topic.collapsed ? (
                                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                            ) : (
                                                <ChevronUpIcon className="h-5 w-5" aria-hidden="true" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {!topic.collapsed && (
                                    <table className="min-w-full mt-4">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2 font-medium text-gray-600">Judul Konten</th>
                                                <th className="text-left p-2 font-medium text-gray-600">Tipe Konten</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topic.batches.map((content, index) => (
                                                <tr key={index} className="border-b">
                                                    <td className="p-2">
                                                        <div className="flex items-center space-x-4">
                                                            {getContentIcon(content.type)}
                                                            <span>{content.title}</span>
                                                        </div>
                                                    </td>
                                                    <td className="p-2">{content.type}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}

                                {editingTopicId === topic.id && (
                                    <div className="p-4 rounded-md mt-4">
                                        <h4 className="text-md font-semibold">Edit Topik</h4>
                                        <div className="flex items-center mb-4">
                                            <div className="w-3/5 mr-4">
                                                <label className="block text-gray-700 font-medium mb-1">Judul Topik</label>
                                                <input
                                                    type="text"
                                                    value={topicTitle}
                                                    onChange={(e) => setTopicTitle(e.target.value)}
                                                    placeholder="Harus berupa huruf, angka, spasi, simbol ampersand (&), titik (.) dan strip (-)"
                                                    maxLength={150}
                                                    className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                />
                                                {topicErrors.topicTitle && <p className="text-red-500 text-sm mt-1">{topicErrors.topicTitle}</p>}
                                                <div className="text-right text-gray-400 text-sm">{`${topicTitle.length} / 150`}</div>
                                            </div>
                                            <div className="flex items-center space-x-4 mt-2 mr-4">
                                                <label className="block text-gray-700 font-medium mb-1">Urutan</label>
                                                <input
                                                    type="number"
                                                    value={orderTopic}
                                                    onChange={handleOrderTopicChange}
                                                    placeholder="Urutan Topik"
                                                    className="border rounded-md px-3 py-2 w-24 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                                />
                                            </div>
                                            <button
                                                onClick={handleSaveTopic}
                                                className="h-10 px-6 bg-orange-500 text-white rounded-md font-medium mt-2">
                                                Simpan
                                            </button>
                                        </div>

                                        {contentSections.map((section, index) => (
                                            <ContentSection
                                                key={index}
                                                handleCancel={() => handleCancelContentSection(index)}
                                                onSaveContent={(data) => handleSaveContentSection(data, index)}
                                                contentData={section}
                                                onOrderChange={(newOrder, contentData) => {
                                                    const updatedSections = [...contentSections];
                                                    const currentIndex = updatedSections.findIndex(sec => sec === contentData);
                                                    updatedSections[currentIndex].order = newOrder;
                                                    setContentSections(updatedSections);
                                                }}
                                            />
                                        ))}
                                        <div className="flex justify-end mt-6">
                                            <button
                                                onClick={handleAddContentSection}
                                                className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium">
                                                Tambah Konten
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {isAddingTopic && !editingTopicId && (
                        <div className="bg-white p-6 rounded-md shadow-md mb-6">
                            <h4 className="text-md font-semibold">Tambah Topik</h4>
                            <div className="flex items-center mb-4">
                                <div className="w-3/5 mr-4">
                                    <label className="block text-gray-700 font-medium mb-1">Judul Topik</label>
                                    <input
                                        type="text"
                                        value={topicTitle}
                                        onChange={(e) => setTopicTitle(e.target.value)}
                                        placeholder="Harus berupa huruf, angka, spasi, simbol ampersand (&), titik (.) dan strip (-)"
                                        maxLength={150}
                                        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                                    />
                                    {topicErrors.topicTitle && <p className="text-red-500 text-sm mt-1">{topicErrors.topicTitle}</p>}
                                    <div className="text-right text-gray-400 text-sm">{`${topicTitle.length} / 150`}</div>
                                </div>
                                <div className="flex items-center space-x-4 mt-2 mr-4">
                                    <label className="block text-gray-700 font-medium mb-1">Urutan</label>
                                    <input
                                        type="number"
                                        value={orderTopic}
                                        onChange={handleOrderTopicChange}
                                        placeholder="Urutan Topik"
                                        className="border rounded-md px-3 py-2 w-24 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                    />
                                </div>
                                <button
                                    onClick={handleSaveTopic}
                                    className="h-10 px-6 bg-orange-500 text-white rounded-md font-medium mt-2"
                                >
                                    Simpan
                                </button>
                            </div>

                            {contentSections.map((section, index) => (
                                <ContentSection
                                    key={index}
                                    handleCancel={() => handleCancelContentSection(index)}
                                    onSaveContent={(data) => handleSaveContentSection(data, index)}
                                    contentData={section}
                                    onOrderChange={(newOrder, contentData) => {
                                        const updatedSections = [...contentSections];
                                        const currentIndex = updatedSections.findIndex(sec => sec === contentData);
                                        updatedSections[currentIndex].order = newOrder;
                                        setContentSections(updatedSections);
                                    }}
                                />
                            ))}
                            <div className="flex justify-end mt-6">
                                <button
                                    onClick={handleAddContentSection}
                                    className="px-4 py-2 bg-orange-500 text-white rounded-md font-medium"
                                >
                                    Tambah Konten
                                </button>
                            </div>
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
                        <button
                            onClick={handleSave}
                            disabled={topics.length === 0}
                            className={`px-4 py-2 rounded-md ${topics.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white'}`}
                        >
                            Simpan Perubahan
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default EditCourse;
