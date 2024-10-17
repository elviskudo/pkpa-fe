"use client";
import * as React from "react";
import { useState } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Sidebar from "@/components/User/detail/Sidebar";
import { Tabs, TabsContent, TabsTrigger } from "@/components/User/detail/Tabs";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

export default function DetailCourse() {
  const dataModules = [
    {
      title: "Materi 1",
      topics: [
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="fill-blue-600 size-5"
            >
              <path
                fillRule="evenodd"
                d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                clipRule="evenodd"
              />
            </svg>
          ),
          name: "Batch 1",
        },
        {
          icon: (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="fill-blue-600 size-5"
            >
              <path d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z" />
            </svg>
          ),
          name: "Batch 2",
        },
      ],
    },
    {
      title: "Materi 2",
      topics: [{}],
    },
  ];

  const [activeTopic, setActiveTopic] = useState("");

  const handleActiveTopic = (name) => {
    setActiveTopic(name);
  };

  return (
    <div>
      <div onClick={handleClick} className="mx-8 my-4">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="primary" href="/">
            Mata Kuliah
          </Link>
          <Link
            underline="hover"
            color="primary"
            href="/material-ui/getting-started/installation/"
          >
            Topik
          </Link>
          <Link underline="none" color="inherit" href="/" aria-current="page">
            Judul Konten
          </Link>
        </Breadcrumbs>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/4 min-h-screen bg-white">
          <Tabs>
            <TabsTrigger
              value="tab1"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-5 fill-[#fe9800]"
                >
                  <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
                </svg>
              }
            >
              Konten Kelas
            </TabsTrigger>
            <TabsTrigger
              value="tab2"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  class="size-5 fill-[#fe9800]"
                >
                  <path d="M3.505 2.365A41.369 41.369 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.141 43.141 0 0 0-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 0 1 5 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914Z" />
                  <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 0 0 1.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0 0 14 6Z" />
                </svg>
              }
            >
              Forum
            </TabsTrigger>
            <TabsContent value="tab1">
              <div className="text-black">
                {dataModules.map((modules, index) => (
                  <Sidebar
                    key={index}
                    title={modules.title}
                    modules={modules}
                    active={activeTopic}
                    onTopicClick={handleActiveTopic}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="tab2">
              <p>This is content for Tab 2.</p>
            </TabsContent>
          </Tabs>
        </div>
        <div className="basis-3/4 min-h-screen bg-white flex flex-col items-center">
          <div className="w-full bg-[#fe9800] py-4 px-6 text-base font-medium">
            <div class="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="fill-white size-4"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <div>
                <h2 class="font-medium text-white">Batch 1</h2>
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
