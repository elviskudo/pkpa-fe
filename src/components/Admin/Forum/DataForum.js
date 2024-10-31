import React, { useMemo, useState } from "react";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const DataForum = ({ forumTopic = [] }) => {
  const [searchText, setSearchText] = useState("");
  const columnHelper = createColumnHelper();

  const columns = useMemo(
    () => [
      columnHelper.accessor("user.name", {
        header: "Nama Pengguna",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("title", {
        header: "Judul Post",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("comments", {
        header: "Komentar",
        cell: (info) => {
          const count = info.getValue().length;
          return <span style={{ color: "gray" }}>{`${count} komentar`}</span>;
        },
      }),
      columnHelper.accessor("like_count", {
        header: "Like",
        cell: (info) => {
          const count = info.getValue();
          return (
            <span className="text-center" style={{ color: "gray" }}>
              {count}
            </span>
          );
        },
      }),
      columnHelper.accessor("dislike_count", {
        header: "Dislike",
        cell: (info) => {
          const count = info.getValue();
          return (
            <span className="text-center" style={{ color: "gray" }}>
              {count}
            </span>
          );
        },
      }),
    ],
    [columnHelper]
  );

  const searchData = useMemo(() => {
    return forumTopic.filter(
      (item) =>
        item.user.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.title.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [forumTopic, searchText]);

  const table = useReactTable({
    data: searchData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
  });

  return (
    <>
      {/* Top Filters and Button */}
      <div className="bg-white p-6 rounded-md shadow-md mb-6">
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className="relative w-80">
            <input
              type="text"
              placeholder="Cari"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Table with stripes */}
      <table className="min-w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 border border-gray-200"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr
              key={row.id}
              className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"}
            >
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
        <div className="flex items-center space-x-2">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => table.setPageSize(Number(e.target.value))}
            className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-gray-300"
          >
            {[10, 20, 30, 40, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <span>
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            -
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              forumTopic.length
            )}{" "}
            of {forumTopic.length}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            className={`px-2 py-1 ${
              !table.getCanPreviousPage()
                ? "text-gray-300"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {"<<"}
          </button>
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={`px-2 py-1 ${
              !table.getCanPreviousPage()
                ? "text-gray-300"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {"<"}
          </button>

          {Array.from({ length: table.getPageCount() }, (_, pageIndex) => (
            <button
              key={pageIndex}
              onClick={() => table.setPageIndex(pageIndex)}
              className={`px-3 py-1 rounded-md ${
                table.getState().pagination.pageIndex === pageIndex
                  ? "bg-orange-500 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {pageIndex + 1}
            </button>
          ))}

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={`px-2 py-1 ${
              !table.getCanNextPage()
                ? "text-gray-300"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {">"}
          </button>
          <button
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            className={`px-2 py-1 ${
              !table.getCanNextPage()
                ? "text-gray-300"
                : "text-gray-500 hover:text-black"
            }`}
          >
            {">>"}
          </button>
        </div>
      </div>
    </>
  );
};

export default DataForum;
