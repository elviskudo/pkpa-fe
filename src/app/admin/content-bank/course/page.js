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
import dataCourse from "@/data/DataCourse";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showAddTopic, setShowAddTopic] = useState(false);
    const handleBackToContent = () => setShowAddCourse(false);
    const handleBackToCourse = () => setShowAddTopic(false);
    const [courses, setCourses] = useState(dataCourse); // Use dataCourse

    const pathname = usePathname();

    useEffect(() => {
        const storedSidebarState = localStorage.getItem("sidebar-open");
        if (storedSidebarState) {
            setIsOpen(JSON.parse(storedSidebarState));
        }
        setMounted(true);
    }, []);

    const handleAddCourse = (newCourse) => {
        setCourses([...courses, newCourse]);
        setShowAddCourse(false);
    };

    const handleSidebarToggle = () => {
        setIsOpen((prev) => {
            localStorage.setItem("sidebar-open", JSON.stringify(!prev));
            return !prev;
        });
    };

    if (!mounted) return null;

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={isOpen} onToggle={handleSidebarToggle} dataMenu={dataMenu} pathname={pathname} />
            <div className={`flex flex-col w-full transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                <NavbarAdmin onToggle={handleSidebarToggle} pathname={pathname} dataMenu={dataMenu} />
                <div className="w-full mx-auto p-8">
                    {showAddTopic ? (
                        <AddTopic onBack={handleBackToCourse} />
                    ) : showAddCourse ? (
                        <AddCourse dataCourse={dataCourse} onBack={handleBackToContent} onAddTopicClick={() => setShowAddTopic(true)} onSave={handleAddCourse} />
                    ) : (
                        <BankContent contents={dataCourse} onAddCourseClick={() => setShowAddCourse(true)} /> // Updated to dataCourse
                    )}
                </div>
            </div>
        </div>
    );
}