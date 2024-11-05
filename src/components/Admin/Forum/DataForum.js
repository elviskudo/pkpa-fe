import React, { useMemo, useState } from "react";
import ViewDrawer from "./ViewDrawer";
import { useDispatch } from "react-redux";
import { archiveTopic } from "@/app/redux/features/forumSlice";
import { useCallback } from "react";
import Moment from "react-moment";
import { IconButton } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Switch from "@mui/material/Switch";
import Swal from "sweetalert2";
import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";

const DataForum = ({ forumTopic = [] }) => {
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState("");
  const columnHelper = createColumnHelper();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleArchive = useCallback(
    (topic) => {
      const ArchiveState = !topic.topic_archived;
      if (ArchiveState) {
        Swal.fire({
          title: "Apakah Yakin Ingin Mengarsipkan?",
          text: "Data akan dipindahkan ke arsip!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Ya, Arsipkan!",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(archiveTopic({ topicId: topic.id, archived: true }));
            Swal.fire({
              title: "Data Diarsipkan!",
              icon: "success",
            });
          }
        });
      } else {
        dispatch(archiveTopic({ topicId: topic.id, archived: false }));
      }
    },
    [dispatch]
  );

  const columns = useMemo(
    () => [
      columnHelper.accessor("user.name", {
        header: "Nama Pengguna",
        cell: (info) => (
          <span className="font-semibold">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("title", {
        header: "Judul Post",
        cell: (info) => (
          <span className="font-semibold">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("created_at", {
        header: "Tanggal Buat",
        cell: (info) => (
          <Moment
            format="D/MM/YY"
            className="flex justify-center items-center"
            style={{ color: "gray" }}
          >
            {info.getValue()}
          </Moment>
        ),
      }),
      columnHelper.accessor("comments", {
        header: "Komentar",
        cell: (info) => {
          const count = info.getValue().length;
          return (
            <span
              className="flex justify-center items-center"
              style={{ color: "gray" }}
            >{`${count} komentar`}</span>
          );
        },
      }),
      columnHelper.accessor("like_count", {
        header: "Disukai",
        cell: (info) => {
          const count = info.getValue();
          return (
            <span
              className="flex justify-center items-center"
              style={{ color: "gray" }}
            >
              {count}
            </span>
          );
        },
      }),
      columnHelper.accessor("dislike_count", {
        header: () => (
          <div className="flex flex-col items-center">
            <span>Tidak</span>
            <span>Disukai</span>
          </div>
        ),
        cell: (info) => {
          const count = info.getValue();
          return (
            <span
              className="flex justify-center items-center"
              style={{ color: "gray" }}
            >
              {count}
            </span>
          );
        },
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="text-center">Aksi</div>,
        cell: (info) => {
          const topics = info.row.original;
          return (
            <div className="flex items-center justify-center space-x-2">
              <IconButton
                color="warning"
                size="small"
                onClick={() => {
                  setSelectedData(topics);
                  setDrawerOpen(true);
                }}
              >
                <VisibilityOutlinedIcon />
              </IconButton>
            </div>
          );
        },
        className: "text-center",
      }),
      columnHelper.display({
        id: "actions",
        header: () => <div className="text-center">Arsip</div>,
        cell: (info) => {
          const topics = info.row.original;
          return (
            <div className="flex items-center justify-center space-x-2">
              <Switch
                checked={topics.topic_archived || false}
                onChange={() => handleArchive(topics)}
                color="warning"
                size="small"
              />
            </div>
          );
        },
        className: "text-center",
      }),
    ],
    [columnHelper, handleArchive, setSelectedData, setDrawerOpen]
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
    <div>
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
      <ViewDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        selectedData={selectedData}
      />
    </div>
  );
};

export default DataForum;
