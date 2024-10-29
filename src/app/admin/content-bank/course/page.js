// src/app/admin/content-bank/course/page.js
"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Admin/SidebarAdmin";
import NavbarAdmin from "@/components/Admin/NavbarAdmin";
import { usePathname } from "next/navigation";
import dataMenu from "@/data/DataMenuConfig";
import BankContent from "@/components/Admin/BankContent/BankContent";
import AddCourse from "@/components/Admin/BankContent/AddCourse";
import AddTopic from "@/components/Admin/BankContent/AddTopic";
import dataMateri from "@/data/DataMateri";

export default function Home() {
    {/* Start to sidebar and navbar functionality */}
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showAddTopic, setShowAddTopic] = useState(false);
    const handleBackToContent = () => setShowAddCourse(false);
    const handleBackToCourse = () => setShowAddTopic(false);
    const [courses, setCourses] = useState(dataMateri);
    
    const pathname = usePathname();
    // Ensure the component is mounted on the client before rendering dynamic elements
    useEffect(() => {
        const storedSidebarState = localStorage.getItem("sidebar-open");
        if (storedSidebarState) {
            setIsOpen(JSON.parse(storedSidebarState));
        }
        setMounted(true); // Set mounted to true after the component mounts
    }, []);

    const handleAddCourse = (newCourse) => {
        setCourses([...courses, newCourse]);
        setShowAddCourse(false); // Hide the form after saving
    };

    const handleSidebarToggle = () => {
        setIsOpen((prev) => {
            localStorage.setItem("sidebar-open", JSON.stringify(!prev));
            return !prev;
        });
    };
    // Prevent rendering until the component has mounted on the client
    if (!mounted) return null;
    {/* End Of Sidebar and Navbar functionality (Tambahkan kode dibawah) */}


    return (
        <div className="flex h-screen">
            <Sidebar isOpen={isOpen} onToggle={handleSidebarToggle} dataMenu={dataMenu} pathname={pathname} />
            <div className={`flex flex-col w-full transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                <NavbarAdmin onToggle={handleSidebarToggle} pathname={pathname} dataMenu={dataMenu} />
                <div className="w-full mx-auto p-8">
                    {showAddTopic ? (
                        <AddTopic onBack={handleBackToCourse} /> // Display AddTopic if showAddTopic is true
                    ) : showAddCourse ? (
                        <AddCourse onBack={handleBackToContent} onAddTopicClick={() => setShowAddTopic(true)} onSave={handleAddCourse} />
                    ) : (
                        <BankContent contents={dataMateri} onAddCourseClick={() => setShowAddCourse(true)} />
                    )}
                </div>
            </div>
        </div>
    );
}