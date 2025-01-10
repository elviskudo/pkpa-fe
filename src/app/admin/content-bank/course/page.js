// src/app/admin/content-bank/course/page.js
"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Admin/SidebarAdmin";
import NavbarAdmin from "@/components/Admin/NavbarAdmin";
import { usePathname } from "next/navigation";
import dataMenu from "@/data/DataMenuConfig";
import BankContent from "@/components/Admin/BankContent/BankContent";
import AddCourse from "@/components/Admin/BankContent/AddCourse";
import EditCourse from "@/components/Admin/BankContent/EditCourse";
import AddTopic from "@/components/Admin/BankContent/AddTopic";
import dataCourse from "@/data/DataCourse";

export default function Home() {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showAddCourse, setShowAddCourse] = useState(false);
    const [showAddTopic, setShowAddTopic] = useState(false);
    const handleBackToContent = () => setShowAddCourse(false);
    const [courses, setCourses] = useState(dataCourse); // Use dataCourse
    const [showEditCourse, setShowEditCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

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
    const handleEditCourse = (courseToEdit) => {
        setSelectedCourse(courseToEdit);
        setShowEditCourse(true);
    };

    const handleUpdateCourse = (updatedCourse) => {
        // Lakukan update pada array courses
        setCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === updatedCourse.id ? updatedCourse : course
            )
        );
        setShowEditCourse(false);
        setSelectedCourse(null);
    };

    const handleBackFromEdit = () => {
        setShowEditCourse(false);
        setSelectedCourse(null);
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
                    {showAddCourse ? (
                        <AddCourse
                            dataCourse={dataCourse}
                            onBack={handleBackToContent}
                            onSave={handleAddCourse}
                        />
                    ) : showEditCourse && selectedCourse ? (
                        <EditCourse
                            dataCourse={[selectedCourse]} // EditCourse mengharapkan array, jadi bungkus selectedCourse dalam array
                            onBack={handleBackFromEdit}
                            onSave={handleUpdateCourse}
                        />
                    ) : (
                        <BankContent contents={courses} onAddCourseClick={() => setShowAddCourse(true)} onEditCourseClick={handleEditCourse} />
                    )}
                </div>
            </div>
        </div>
    );
}