// BankContent.js
import React, { useMemo, useState, useEffect } from 'react'; // Ensure useEffect is imported
import { createColumnHelper, useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import { Dropdown } from 'flowbite-react';
import Switch from '@mui/material/Switch';
import Swal from 'sweetalert2';

const BankContent = ({ contents, onAddCourseClick, onEditCourseClick }) => {
    const [searchText, setSearchText] = useState('');
    const [university, setUniversity] = useState('');
    const [filterBy, setFilterBy] = useState('');
    const [localCourses, setLocalCourses] = useState([]);

    const columnHelper = createColumnHelper();

    // Initialize localCourses from contents
    useEffect(() => {
        setLocalCourses(
            contents.map((course) => ({
                ...course,
                is_publish: course.is_publish === 1 ? 1 : 0,
                is_forum: course.is_forum === 1 ? 1 : 0,
            }))
        );
    }, [contents]);

    const handleToggleChange = (id, key) => {
        setLocalCourses((prevCourses) =>
            prevCourses.map((course) =>
                course.id === id ? { ...course, [key]: course[key] === 1 ? 0 : 1 } : course
            )
        );
    };

    const handleArchive = (id) => {
        Swal.fire({
            title: 'Apakah Yakin Ingin Mengarsipkan?',
            text: "Data akan dipindahkan ke arsip!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, archive it!',
        }).then((result) => {
            if (result.isConfirmed) {
                setLocalCourses((prevCourses) =>
                    prevCourses.map((course) =>
                        course.id === id ? { ...course, is_archived: true } : course
                    )
                );

                Swal.fire({
                    title: 'Archived!',
                    text: 'Data telah dipindahkan ke arsip.',
                    icon: 'success',
                });
            }
        });
    };

    const columns = useMemo(
        () => [
            columnHelper.accessor('name', {
                header: 'Judul Mata Kuliah',
                cell: (info) => (
                    <div className="flex items-center space-x-4">
                        <img
                            src={info.row.original.background_image}
                            alt="Course Thumbnail"
                            className="w-16 h-16 rounded object-cover"
                        />
                        <span>{info.getValue()}</span>
                    </div>
                ),
            }),
            columnHelper.accessor('is_publish', {
                header: 'Publish',
                cell: (info) => (
                    <div className="flex justify-center">
                        <Switch
                            checked={info.row.original.is_publish === 1}
                            onChange={() => handleToggleChange(info.row.original.id, 'is_publish')}
                            color="primary"
                        />
                    </div>
                ),
            }),
            columnHelper.accessor('is_forum', {
                header: 'Diskusi',
                cell: (info) => (
                    <div className="flex justify-center">
                        <Switch
                            checked={info.row.original.is_forum === 1}
                            onChange={() => handleToggleChange(info.row.original.id, 'is_forum')}
                            color="primary"
                        />
                    </div>
                ),
            }),
            columnHelper.accessor('topics', {
                header: 'Total Materi',
                cell: (info) => (
                    <div className="text-center">
                        {info.row.original.topics.length} {/* Updated to use topics */}
                    </div>
                ),
            }),
            columnHelper.display({
                id: 'actions',
                header: () => <div className="text-center">Aksi</div>,
                cell: (info) => (
                    <div className="flex justify-center">
                        <Dropdown arrowIcon={false} inline={true} label={
                            <div className="bg-gray-200 text-gray-600 rounded-full p-2 flex items-center justify-center w-8 h-8 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                </svg>
                            </div>
                        }>
                            <Dropdown.Item
                                className="text-blue-500"
                                onClick={() => {
                                    const selectedCourse = info.row.original;
                                    if (typeof onEditCourseClick === 'function') {
                                        onEditCourseClick(selectedCourse);
                                    }
                                }}
                            >
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="text-red-500" onClick={() => handleArchive(info.row.original.id)}>
                                Arsip
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                ),
                className: 'text-center',
            }),            
        ],
        []
    );
    const filteredData = useMemo(() => {
        return localCourses.filter((item) =>
            !item.is_archived && // Filter out archived items
            item.name.toLowerCase().includes(searchText.toLowerCase()) &&
            (university === '' || item.university.name === university) &&
            (filterBy === '' || item.category.name === filterBy) // Filter by category
        );
    }, [localCourses, searchText, university, filterBy]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <>
            <div className="bg-white p-6 rounded-md shadow-md mb-6">
                <div className="grid grid-cols-2 gap-4 items-center mb-4">
                    <div>
                        <h2 className="text-lg text-gray-400">Mata Kuliah</h2>
                    </div>
                    <div className="flex justify-end">
                        <button className="bg-orange-500 text-white px-4 py-2 rounded-md" onClick={onAddCourseClick}>
                            + Tambah Mata Kuliah
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                    <div className="relative w-80">
                        <input
                            type="text"
                            placeholder="Cari"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                        />
                        <button className="absolute right-2 top-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </button>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <div className="flex items-center space-x-2">
                            <label>Filter By:</label>
                            <select
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value)}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300">
                                <option value="">Pilih Kategori</option>
                                {[...new Set(contents.map(item => item.category.name))].map((category, index) => (
                                    <option key={index} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <label>Universitas:</label>
                            <select
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300">
                                <option value="">Pilih</option>
                                {[...new Set(contents.map(item => item.university.name))].map((univ, index) => (
                                    <option key={index} value={univ}>{univ}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <table className="min-w-full border-collapse">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id} className="px-4 py-2 border border-gray-200">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row, rowIndex) => (
                        <tr key={row.id} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id} className="px-4 py-2 border border-gray-200">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination mt-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <select
                        value={table.getState().pagination.pageSize}
                        onChange={(e) => table.setPageSize(Number(e.target.value))}
                        className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300">
                        {[10, 20, 30, 40, 50].map((size) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                    <span>
                        Showing{' '}
                        {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                        -
                        {Math.min(
                            (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                            localCourses.length
                        )}{' '}
                        of {localCourses.length}
                    </span>
                </div>

                <div className="flex items-center space-x-1">
                    <button
                        onClick={() => table.setPageIndex(0)}
                        disabled={!table.getCanPreviousPage()}
                        className={`px-2 py-1 ${!table.getCanPreviousPage() ? 'text-gray-300' : 'text-gray-500 hover:text-black'}`}>
                        {'<<'}
                    </button>
                    <button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                        className={`px-2 py-1 ${!table.getCanPreviousPage() ? 'text-gray-300' : 'text-gray-500 hover:text-black'}`}>
                        {'<'}
                    </button>

                    {Array.from({ length: table.getPageCount() }, (_, pageIndex) => (
                        <button
                            key={pageIndex}
                            onClick={() => table.setPageIndex(pageIndex)}
                            className={`px-3 py-1 rounded-md ${table.getState().pagination.pageIndex === pageIndex
                                ? 'bg-orange-500 text-white'
                                : 'bg-white text-gray-700'
                                }`}>
                            {pageIndex + 1}
                        </button>
                    ))}

                    <button
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                        className={`px-2 py-1 ${!table.getCanNextPage() ? 'text-gray-300' : 'text-gray-500 hover:text-black'}`}>
                        {'>'}
                    </button>
                    <button
                        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                        disabled={!table.getCanNextPage()}
                        className={`px-2 py-1 ${!table.getCanNextPage() ? 'text-gray-300' : 'text-gray-500 hover:text-black'}`}>
                        {'>>'}
                    </button>
                </div>
            </div>
        </>
    );
};

export default BankContent;
