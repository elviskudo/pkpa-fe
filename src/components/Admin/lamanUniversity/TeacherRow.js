import React, { useState, useEffect, useRef } from 'react';

export default function TeacherRow({ teacher, onEdit, onDelete }) {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <tr>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{teacher.noRegister}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">{teacher.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.university?.name || ''}{teacher.university_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{teacher.speciality}</td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium relative">
                <button
                    className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    onClick={() => setShowDropdown(!showDropdown)}
                    aria-label="Options"
                    aria-expanded={showDropdown}
                >
                    <span className="sr-only">Open options</span>
                    •••
                </button>
                {showDropdown && (
                    <div ref={dropdownRef} className="absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-10">
                        <button
                            onClick={onEdit}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Edit
                        </button>
                        <button
                            onClick={onDelete}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                        >
                            Hapus
                        </button>
                    </div>
                )}
            </td>
        </tr>
    );
}
