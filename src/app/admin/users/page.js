// src/app/user/page.js
"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Admin/SidebarAdmin";
import NavbarAdmin from "@/components/Admin/NavbarAdmin";
import UserRegistered from "@/components/Admin/UserRegistered/UserRegistered";
import { usePathname } from "next/navigation";
import dataMenu from "@/data/DataMenuConfig";

export default function Home() {
    {/* Start to sidebar and navbar functionality */}
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showDrawer, setShowDrawer] = useState(false);
    const [registered, setRegistered] = useState([
        { name: 'Leslie Alexander', email: 'leslie.alexander@gmail.com', phone: '081264656468', university: 'Universitas Indonesia', password: 'password1' },
        { name: 'Devon Lane', email: 'devon.lane@gmail.com', phone: '0855646518120', university: 'Universitas Padjadjaran', password: 'password2' },
        { name: 'Marvin McKinney', email: 'marvin.mckinney@gmail.com', phone: '0812354351846', university: 'Universitas Indonesia', password: 'password3' },
        { name: 'Raul Alexander', email: 'raul.alexander@gmail.com', phone: '081298734561', university: 'Universitas Brawijaya', password: 'password4' },
        { name: 'Sarah Jones', email: 'sarah.jones@gmail.com', phone: '085746527812', university: 'Universitas Indonesia', password: 'password5' },
        { name: 'Olivia Carter', email: 'olivia.carter@gmail.com', phone: '081325743682', university: 'Universitas Indonesia', password: 'password6' },
        { name: 'Michael Jordan', email: 'michael.jordan@gmail.com', phone: '081764582934', university: 'Universitas Brawijaya', password: 'password7' },
        { name: 'Emily Smith', email: 'emily.smith@gmail.com', phone: '085274839561', university: 'Universitas Indonesia', password: 'password8' },
        { name: 'Daniel Clark', email: 'daniel.clark@gmail.com', phone: '081645237894', university: 'Universitas Brawijaya', password: 'password9' },
        { name: 'Sophie Anderson', email: 'sophie.anderson@gmail.com', phone: '081354726189', university: 'Universitas Brawijaya', password: 'password10' },
        { name: 'William Brown', email: 'william.brown@gmail.com', phone: '085673452812', university: 'Universitas Indonesia', password: 'password11' },
        { name: 'Ethan Turner', email: 'ethan.turner@gmail.com', phone: '081237652438', university: 'Universitas Indonesia', password: 'password12' },
    ]);
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
    const addUser = (newUser) => {
        setRegistered((prevRegistered) => [...prevRegistered, newUser]);
    };
    const editUser = (updatedUser) => {
        setRegistered((prevRegistered) =>
            prevRegistered.map((user) => (user.email === updatedUser.email ? updatedUser : user))
        );
    };
    // Prevent rendering until the component has mounted on the client
    if (!mounted) return null;
    {/* End Of Sidebar and Navbar functionality (You can add your code below) */}

    return (
        <div className="flex h-screen">
            <Sidebar isOpen={isOpen} onToggle={handleSidebarToggle} dataMenu={dataMenu} pathname={pathname} />
            <div className={`flex flex-col w-full transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
                <NavbarAdmin onToggle={handleSidebarToggle} pathname={pathname} dataMenu={dataMenu} />
                <div className="w-full mx-auto p-8">
                    <UserRegistered registered={registered}
                        showDrawer={showDrawer}
                        setShowDrawer={setShowDrawer}
                        addUser={addUser}
                        editUser={editUser} />
                </div>
            </div>
        </div>
    );
}
