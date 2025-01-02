"use client";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Sidebar from "@/components/User/detail/Sidebar";

export default function Content() {
  return (
    <div>
      <div className="mx-8 my-4">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="primary" href="/user/course/">
            Mata Kuliah
          </Link>
          <Link underline="hover" color="primary" href="/">
            Topik
          </Link>
          <Link underline="none" color="inherit" href="/" aria-current="page">
            Judul Konten
          </Link>
        </Breadcrumbs>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/4 min-h-screen bg-white">
          <Sidebar />
        </div>
        <div className="basis-3/4 min-h-screen bg-white flex flex-col items-center">
          <div className="w-full bg-[#fe9800] py-4 px-6 text-base font-medium">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="fill-white size-4"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <div>
                <h2 className="font-medium text-white">Batch 1</h2>
              </div>
            </div>
          </div>

          <div className="p-6 w-10/12 mt-4">
            <div className="flex flex-col items-center justify-center">
              <div className="w-full h-[32rem] bg-gray-300 mb-4 flex items-center justify-center">
                <iframe
                  src="https://www.youtube.com/embed/gfU1iZnjRZM"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>

              <div className="w-full">
                <h2 className="font-bold text-black text-lg mb-2">Deskripsi</h2>
                <p className="text-gray-600 font-medium">
                  Scelerisque nullam malesuada aliquet porta lectus tempor,
                  turpis sed scelerisque nunc, interdum mauris urna, imperdiet
                  semper enim malesuada pretium amet, placerat et congue donec
                  pellentesque proin duis sit eget tortor nisl amet ipsum
                  egestas enim pellentesque est nunc amet pulvinar venenatis
                  augue faucibus nulla purus tellus mi blandit cras tristique
                  tellus donec fames nibh aliquam nibh in in phasellus
                  suspendisse
                </p>
              </div>
            </div>
          </div>

          <div className="w-full py-4 border-t-2 border-gray-300 flex justify-between">
            <button className="ml-4  border-2 text-black font-semibold py-2 px-4 rounded-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 mr-2"
              >
                <path
                  fillRule="evenodd"
                  d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
                  clipRule="evenodd"
                />
              </svg>
              Sebelumnya
            </button>

            <button className="mr-4 border-2 text-black font-semibold py-2 px-4 rounded-md flex items-center">
              Selanjutnya
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  fillRule="evenodd"
                  d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
