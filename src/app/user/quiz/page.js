"use client";
import * as React from "react";
import { useState } from "react";
import Link from "@mui/material/Link";
import Sidebar from "@/components/User/detail/Sidebar";
import { Tabs, TabsContent, TabsTrigger } from "@/components/User/detail/Tabs";
import NavbarQuiz from "@/components/User/quiz/NavbarQuiz";
import Breadcrumb from "@/components/User/quiz/Breadcrumb";


const dataContent = [
  {
    id: 1,
    uuid: "98712-o8123-8374",
    name: "Kuis Peran Advokat",
    description: "Peran advokat dalam hukum pidana",
    image_url:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/University_of_California%2C_Berkeley_seal.svg/1200px-University_of_California%2C_Berkeley_seal.svg.png",
    is_random: true,
    is_active: 1,
    min_value: 80,
    duration: 60,
    next_step: null,
  },
];

export default function Quiz() {
  const [activeContent] = useState(dataContent[0]);

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
          name: "Kuis",
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
      <NavbarQuiz />
      <Breadcrumb/>
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

        <div className="basis-3/4 min-h-screen bg-white flex flex-col">
          <div className="w-full bg-[#fe9800] py-4 px-6 text-base font-medium text-center">
            <h2 className="font-bold text-white">Kuis</h2>
          </div>

          <div className="pt-6 pl-10 w-10/12 ml-10 mt-6">
            <h2 className="font-bold text-black text-lg mb-2">{activeContent.name}</h2>
            <p className="text-gray-600 font-medium mb-4">
              {activeContent.description}
            </p>
              <div className="w-full text-left">
                <p className="text-black font-semibold">
                  KKM : <span className="font-normal">{activeContent.min_value}</span>
                </p>
                <p className="text-black font-semibold">
                  Durasi : <span className="font-normal">{activeContent.duration} Menit</span>
                </p>
              </div>
            <div className="w-full flex justify-left mt-4">
              <Link className="bg-[#fe9800] text-white py-2 px-4 rounded-sm no-underline" href="quiz/questions">
                Mulai Kuis
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
