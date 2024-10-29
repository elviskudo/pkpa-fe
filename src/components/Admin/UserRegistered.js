// UserRegistered.js
import React, { useMemo, useState } from 'react';
import { createColumnHelper, useReactTable, getCoreRowModel, getPaginationRowModel, flexRender } from '@tanstack/react-table';
import Swal from 'sweetalert2';
import { Dropdown } from 'flowbite-react';
import AddDrawer from './AddDrawer';
import EditDrawer from './EditDrawer'; // Import the EditDrawer

const UserRegistered = ({ registered, showDrawer, setShowDrawer, addUser, editUser }) => {
    const [searchText, setSearchText] = useState('');
    const [university, setUniversity] = useState('');
    const [showEditDrawer, setShowEditDrawer] = useState(false); // Control EditDrawer
    const [selectedUser, setSelectedUser] = useState(null); // Track selected user for editing

    const handleDelete = () => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success',
                });
            }
        });
    };

    const columnHelper = createColumnHelper();

    const columns = useMemo(
        () => [
            columnHelper.accessor('name', {
                header: 'Nama Lengkap',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('email', {
                header: 'Email',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('phone', {
                header: 'Nomor Handphone',
                cell: (info) => info.getValue(),
            }),
            columnHelper.accessor('university', {
                header: 'Universitas',
                cell: (info) => info.getValue(),
            }),
            columnHelper.display({
                id: 'actions',
                header: () => <div className="text-center">Aksi</div>, // Header di tengah
                cell: (info) => {
                    const user = info.row.original; // Get current user data from the row
                    return (
                        <div className="flex justify-center"> {/* Membuat tombol aksi berada di tengah */}
                            <Dropdown arrowIcon={false} inline={true} label={
                                <div className="bg-gray-200 text-gray-600 rounded-full p-2 flex items-center justify-center w-8 h-8 cursor-pointer">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                                    </svg>
                                </div>
                            }>
                                <Dropdown.Item className="text-blue-500" onClick={() => {
                                    setSelectedUser(user); // Set the selected user for editing
                                    setShowEditDrawer(true); // Open the EditDrawer
                                }}>
                                    Edit
                                </Dropdown.Item>
                                <Dropdown.Item className="text-red-500" onClick={handleDelete}>
                                    Delete
                                </Dropdown.Item>
                            </Dropdown>
                        </div>
                    );
                },
                className: 'text-center' // Pusatkan isi kolom
            }),
        ],
        []
    );

    const filteredData = useMemo(() => {
        return registered
            .filter((item) =>
            (item.name.toLowerCase().includes(searchText.toLowerCase()) ||
                item.email.toLowerCase().includes(searchText.toLowerCase()) ||
                item.phone.toLowerCase().includes(searchText.toLowerCase()) ||
                item.university.toLowerCase().includes(searchText.toLowerCase()))
            )
            .filter((item) => university === '' || item.university === university); // Filter by university
    }, [registered, searchText, university]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: { pagination: { pageSize: 10 } },
    });

    return (
        <>
            {/* Top Filters and Button */}
            <div className="bg-white p-6 rounded-md shadow-md mb-6">
                <div className="grid grid-cols-2 gap-4 items-center mb-4">
                    {/* Top left: Title Peserta */}
                    <div>
                        <h2 className="text-lg text-gray-400">Peserta</h2>
                    </div>

                    {/* Top right: Tambah Admin Button */}
                    <div className="flex justify-end">
                        <button 
                            className="bg-orange-500 text-white px-4 py-2 rounded-md"
                            onClick={() => setShowDrawer(true)}>
                            + Tambah Admin
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-center">
                    {/* Bottom left: Search Bar */}
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

                    {/* Bottom right: Filter by and Universitas */}
                    <div className="flex justify-end space-x-4">
                        {/* University Filter */}
                        <div className="flex items-center space-x-2">
                            <label>Universitas:</label>
                            <select
                                value={university}
                                onChange={(e) => setUniversity(e.target.value)}
                                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300">
                                <option value="">Pilih</option>
                                {[...new Set(registered.map(item => item.university))].map((univ, index) => (
                                    <option key={index} value={univ}>{univ}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Table with stripes */}
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

            {/* Pagination Controls */}
            <div className="pagination mt-4 flex justify-between items-center">
                {/* Left Section */}
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
                            registered.length
                        )}{' '}
                        of {registered.length}
                    </span>
                </div>

                {/* Right Section */}
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

            {/* Render the Add and Edit Drawer */}
            <AddDrawer 
                showDrawer={showDrawer} 
                setShowDrawer={setShowDrawer} 
                addUser={addUser} 
            />
            <EditDrawer 
                showEditDrawer={showEditDrawer} 
                setShowEditDrawer={setShowEditDrawer} 
                selectedUser={selectedUser} 
                editUser={editUser} 
            />
        </>
    );
};

export default UserRegistered;
