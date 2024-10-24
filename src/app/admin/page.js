// src/app/user/page.js
"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Admin/SidebarAdmin";
import NavbarAdmin from "@/components/Admin/NavbarAdmin";
import UserRegistered from "@/components/Admin/UserRegistered";
import { usePathname } from "next/navigation";

export default function Home() {
    {/* Start to sidebar and navbar functionality */}
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const dataMenu = [
        {
            id: 1,
            uuid: '1234-1234-1234',
            name: 'Beranda',
            description: 'Dashboard',
            url: '/admin',
            icon: 'DashboardIcon',
            children: []
        },
        {
            id: 2,
            uuid: '1234-1234-1235',
            name: 'Manajemen Pendaftar',
            description: 'Users',
            url: '/admin/users',
            icon: 'PersonAdd',
            children: []
        },
        {
            id: 3,
            uuid: '1234-1234-1236',
            name: 'Manajemen Pengguna',
            description: 'User management',
            url: '/admin/users-management',
            icon: 'GroupIcon',
            children: []
        },
        {
            id: 4,
            uuid: '1234-1234-1237',
            name: 'Manajemen Gelombang',
            description: 'Wave management',
            url: '/admin/wave-management',
            icon: 'AssessmentIcon',
            children: []
        },
        {
            id: 5,
            uuid: '1234-1234-1238',
            name: 'Bank Konten',
            description: 'Content bank',
            url: '/admin/content-bank',
            icon: 'LibraryBooksIcon',
            children: []
        },
        {
            id: 6,
            uuid: '1234-1234-1239',
            name: 'Kategori',
            description: 'Categories',
            url: '/admin/categories',
            icon: 'CategoryIcon',
            children: []
        },
        {
            id: 7,
            uuid: '1234-1234-1240',
            name: 'Manajemen Mata Kuliah',
            description: 'Course management',
            url: '/admin/course-management',
            icon: 'SchoolIcon',
            children: []
        },
        {
            id: 8,
            uuid: '1234-1234-1241',
            name: 'Tugas',
            description: 'Assignments',
            url: '/admin/assignments',
            icon: 'AssignmentIcon',
            children: []
        },
        {
            id: 9,
            uuid: '1234-1234-1242',
            name: 'Live Streaming',
            description: 'Live streaming',
            url: '/admin/live-streaming',
            icon: 'VideocamIcon',
            children: []
        },
        {
            id: 10,
            uuid: '1234-1234-1243',
            name: 'Sertifikat',
            description: 'Certificates',
            url: '/admin/certificates',
            icon: 'VerifiedUserIcon',
            children: []
        },
        {
            id: 11,
            uuid: '1234-1234-1244',
            name: 'Forum',
            description: 'Forum',
            url: '/admin/forum',
            icon: 'ForumIcon',
            children: []
        },
        {
            id: 12,
            uuid: '1234-1234-1245',
            name: 'Manajemen Kuesioner',
            description: 'Survey management',
            url: '/admin/survey-management',
            icon: 'PollIcon',
            children: []
        },
        {
            id: 13,
            uuid: '1234-1234-1246',
            name: 'Manajemen Keuangan',
            description: 'Financial management',
            url: '/admin/finance-management',
            icon: 'AccountBalanceIcon',
            children: []
        },
        {
            id: 14,
            uuid: '1234-1234-1247',
            name: 'Media Promosi',
            description: 'Promotional media',
            url: '/admin/promotional-media',
            icon: 'CampaignIcon',
            children: []
        },
        {
            id: 15,
            uuid: '1234-1234-1248',
            name: 'Pengaturan Laman Univ.',
            description: 'University settings',
            url: '/admin/university-settings',
            icon: 'SettingsIcon',
            children: []
        },
        {
            id: 16,
            uuid: '1234-1234-1249',
            name: 'Pengaturan Laman',
            description: 'Page settings',
            url: '/admin/page-settings',
            icon: 'WebIcon',
            children: []
        },
        {
            id: 17,
            uuid: '1234-1234-1250',
            name: 'Notifikasi',
            description: 'Notifications',
            url: '/admin/notifications',
            icon: 'NotificationsIcon',
            children: []
        }
    ];    
    const pathname = usePathname();
    // Ensure the component is mounted on the client before rendering dynamic elements
    useEffect(() => {
        const storedSidebarState = localStorage.getItem("sidebar-open");
        if (storedSidebarState) {
            setIsOpen(JSON.parse(storedSidebarState));
        }
        setMounted(true); // Set mounted to true after the component mounts
    }, []);

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
                    Content Here
                </div>
            </div>
        </div>
    );
}
