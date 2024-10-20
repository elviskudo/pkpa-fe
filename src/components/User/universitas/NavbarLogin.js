"use client";
import Link from 'next/link';
import Image from 'next/image';

const NavbarLogin = () => {
    return (
        <nav className="sticky top-0 flex justify-between items-center px-8 py-4 bg-white z-50 shadow-md">
            <div className="flex items-center space-x-4">
                <Link href="/" className="flex items-center">
                    <Image
                        src="/images/logo.png"
                        alt="PKPA Logo"
                        width={100}
                        height={50}
                    />
                </Link>
                <span>|</span>
                <Link href="/home" className="flex items-center">
                    <Image
                        src="/images/logo-atmasasmita.png"
                        alt="ADR Law Firm Logo"
                        width={100}
                        height={50}
                    />
                </Link>
            </div>

            <ul className="flex space-x-4 ml-auto mr-12">
                <li>
                    <Link href="#lecturer" className="text-gray-600 hover:text-gray-900">
                        Kurikulum
                    </Link>
                </li>
                <li>
                    <Link href="#visionMission" className="text-gray-600 hover:text-gray-900">
                        Visi & Misi
                    </Link>
                </li>
                <li>
                    <Link href="#testimony" className="text-gray-600 hover:text-gray-900">
                        Testimoni
                    </Link>
                </li>
            </ul>

            {/* Notifikasi dan Profile User */}
            <div className="flex items-center space-x-4">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="black"
                    className="w-6 h-6 text-orange-500"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                        clipRule="evenodd"
                    />
                </svg>
                <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
                    {/* Avatar */}
                    <img
                        src="/images/person.png" // Ganti dengan path avatar
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h2 className="font-semibold text-black">Jason B.</h2>
                </div>
            </div>
        </nav>
    );
};

export default NavbarLogin;
