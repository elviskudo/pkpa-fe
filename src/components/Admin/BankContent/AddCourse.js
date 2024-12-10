// src/components/Admin/AddCourse.js
"use client";
import React, { useState } from "react";
import { Tabs, Tab, Switch } from "@mui/material";
import dynamic from "next/dynamic";
import CustomDropzone from './CustomDropzone';
import Swal from 'sweetalert2';
import ContentSection from "./ContentSection";
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

const AddCourse = ({ onBack, onAddTopicClick, onSave, dataCourse }) => {
    const [topicTitle, setTopicTitle] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [classType, setClassType] = useState("Public");
    const [instructor, setInstructor] = useState("");
    const [discussionEnabled, setDiscussionEnabled] = useState(false);
    const [description, setDescription] = useState("");
    const [activeTab, setActiveTab] = useState(0);
    const [backgroundImage, setBackgroundImage] = useState('');
    const [certificateImage, setCertificateImage] = useState('');
    const [topics, setTopics] = useState([]);
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [contentSections, setContentSections] = useState([{}]); // Default one empty section
    const [topicErrors, setTopicErrors] = useState({});
    const [editingTopicId, setEditingTopicId] = useState(null); // Track the topic being edited

    const course = dataCourse[0];
    const getContentIcon = (type) => {
        const iconStyle = { fontSize: '60px' }; // Set icon size to 60px

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

    const handleOrderChange = (newOrder, contentData) => {
        setContentSections((prevSections) => {
            const currentOrder = contentData.order;

            // Map through sections and adjust their orders accordingly
            const updatedSections = prevSections.map((section) => {
                if (section === contentData) {
                    // Update the order of the selected section
                    return { ...section, order: newOrder };
                } else if (section.order >= newOrder && section.order < currentOrder) {
                    // Move sections down if they are between newOrder and currentOrder
                    return { ...section, order: section.order + 1 };
                } else if (section.order <= newOrder && section.order > currentOrder) {
                    // Move sections up if they are between currentOrder and newOrder
                    return { ...section, order: section.order - 1 };
                }
                return section;
            });

            // Sort sections by their new order values
            return updatedSections.sort((a, b) => a.order - b.order);
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
                .map((section, i) => ({ ...section, order: i + 1 })); // Update order sequentially
            return updatedSections;
        });
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleAddContentSection = () => {
        const newSection = { order: contentSections.length + 1, title: "", type: "Video", description: "" };
        setContentSections([...contentSections, newSection]); // Add a new empty content section
    };

    const handleEditContentSection = (topic) => {
        setContentSections(topic.batch_group?.[0]?.batches || []); // Load contents of the topic into contentSections
        // setIsAddingTopic(true);
        setEditingTopicId(topic.id);
        setTopicTitle(topic.name);
    };

    const handleSaveContentSection = (contentData, index) => {
        setContentSections(prevSections => {
            const updatedSections = [...prevSections];
            updatedSections[index] = contentData; // Update specific section
            return updatedSections;
        });
    };

    const handleSave = () => {
        const newCourse = {
            id: Date.now(),
            name: courseTitle,
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
            topics: topics,
        };
        console.log("Saving new course:", newCourse); // Debugging log
        onSave(newCourse); // Trigger save to be passed to BankContent
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
        setContentSections([{}]); // Ensure there's one content section by default
        setEditingTopicId(null); // Ensure we're not in edit mode
        setTopicTitle(""); // Reset title for new topic
    };

    const handleSaveTopic = () => {
        const newTopic = {
            id: editingTopicId || Date.now(),
            name: topicTitle,
            batch_group: [
                {
                    batches: contentSections, // Assign contents to batches
                }
            ],
        };
        if (editingTopicId) {
            setTopics(topics.map(topic => topic.id === editingTopicId ? newTopic : topic));
        } else {
            setTopics([...topics, newTopic]);
        }

        setContentSections([]);
        setIsAddingTopic(false);
        setEditingTopicId(null);
        setTopicTitle("");
        Swal.fire("Success", "Topik berhasil disimpan!", "success");
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
                            value={courseTitle}
                            onChange={(e) => setCourseTitle(e.target.value)}
                            placeholder="Harus berupa huruf, angka, spasi, simbol ampersand (&), titik (.) dan strip (-)"
                            maxLength={150}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                        <div className="text-right text-gray-400 text-sm">{`${courseTitle.length} / 150`}</div>

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

                                {/* Content Table - Collapsed by Default */}
                                {!topic.collapsed && (
                                    <table className="min-w-full mt-4">
                                        <thead>
                                            <tr className="border-b">
                                                <th className="text-left p-2 font-medium text-gray-600">Judul Konten</th>
                                                <th className="text-left p-2 font-medium text-gray-600">Tipe Konten</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {topic.batch_group[0].batches.map((content, index) => (
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

                                {/* Conditional Edit Form Below Each Topic */}
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
                                            <button
                                                onClick={handleSaveTopic}
                                                className="h-10 px-6 bg-orange-500 text-white rounded-md font-medium mt-2">
                                                Simpan
                                            </button>
                                        </div>

                                        {/* Render Content Sections for the Edit Form */}
                                        {contentSections.map((section, index) => (
                                            <ContentSection
                                                key={index}
                                                handleCancel={() => handleCancelContentSection(index)}
                                                onSaveContent={(data) => handleSaveContentSection(data, index)}
                                                contentData={section}
                                                onOrderChange={handleOrderChange}
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

                    {/* Add Topic Form */}
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
                                <button
                                    onClick={handleSaveTopic}
                                    className="h-10 px-6 bg-orange-500 text-white rounded-md font-medium mt-2"
                                >
                                    Simpan
                                </button>
                            </div>

                            {/* Render Content Sections for the Add Form */}
                            {contentSections.map((section, index) => (
                                <ContentSection
                                    key={index}
                                    handleCancel={() => handleCancelContentSection(index)}
                                    onSaveContent={(data) => handleSaveContentSection(data, index)}
                                    contentData={section}
                                    onOrderChange={handleOrderChange}
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
                            disabled={topics.length === 0} // Disable if no topics
                            className={`px-4 py-2 rounded-md ${topics.length === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-orange-500 text-white'}`}
                        >
                            Simpan & Lanjutkan
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default AddCourse;
