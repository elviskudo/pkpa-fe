"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("Mata Kuliah");

  const menuItems = [
    { name: "Mata Kuliah", notifications: 0, url: "/user/course" },
    { name: "Sesi Online", notifications: 0, url: "/user/online" },
    { name: "Ujian Akhir", notifications: 0, url: "/" },
    { name: "Sertifikat", notifications: 0, url: "/" },
    { name: "Performa Belajar", notifications: 0, url: "/" },
    { name: "Notifikasi", notifications: 2, url: "/" },
    { name: "Pengaturan", notifications: 0, url: "/" },
  ];
  return (
    <div className="w-64 h-min bg-white shadow-sm rounded-md">
      <div className="p-4 border-b">
        <div className="flex items-center space-x-4">
          <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
            <img
              src="/images/person.png"
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-black">Jason Brody</h2>
            <Link href="/profile" className="text-sm text-gray-300 hover">
              Edit Profile
            </Link>
          </div>
        </div>
      </div>
      <nav>
        <ul className="pb-10">
          {menuItems.map((item, index) => (
            <li key={index}>
              <Link
                href=""
                className={`flex justify-between items-center px-4 py-3 text-md border border-gray-100 ${activeItem === item.name
                  ? "bg-orange-50 text-[#fe9800]"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
                onClick={() => setActiveItem(item.name)}
              >
                <span>{item.name}</span>
                {item.notifications > 0 && (
                  <span className="bg-[#fe9800] text-white text-xs font-bold px-2 py-1 rounded-full">
                    {item.notifications}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
