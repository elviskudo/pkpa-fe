"use client";
import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Sidebar from "@/components/User/detail/Sidebar";
import Accordion from "@/components/User/detail/Accordion";
import { useSelector } from "react-redux";

export default function Forum() {
  // const forumTopic = [
  //   {
  //     id: 1,
  //     uuid: "2345-2345-2345",
  //     title: "Topic 1",
  //     content: "This is topic 1",
  //     image_url:
  //       "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
  //     user_id: "3455-4352-3456",
  //     user: {
  //       id: "3455-4352-3456",
  //       name: "John Doe",
  //       email: "john.doe@example.com",
  //       phone: "+628755678765",
  //     },
  //     like_count: 15,
  //     dislike_count: 10,
  //     comments: [
  //       {
  //         id: 1,
  //         uuid: "2345-2345-2345",
  //         content: "This is comment 1",
  //         user_id: "3455-4352-3456",
  //         user: {
  //           id: "3455-4352-3456",
  //           name: "John Doe",
  //           email: "john.doe@example.com",
  //           phone: "+628755678765",
  //         },
  //         like_count: 5,
  //         dislike_count: 2,
  //         created_at: "2024-10-10 20:12:11",
  //         updated_at: "2024-10-10 20:12:11",
  //       },
  //       {
  //         id: 2,
  //         uuid: "2345-2345-2345",
  //         content: "This is comment 2",
  //         user_id: "3455-4352-3456",
  //         user: {
  //           id: "3455-4352-3456",
  //           name: "John Doe",
  //           email: "john.doe@example.com",
  //           phone: "+628755678765",
  //         },
  //         like_count: 5,
  //         dislike_count: 2,
  //         created_at: "2024-10-10 20:12:11",
  //         updated_at: "2024-10-10 20:12:11",
  //       },
  //     ],
  //     created_at: "2024-10-10 20:12:11",
  //     updated_at: "2024-10-10 20:12:11",
  //   },
  // ];

  const items = useSelector((state) => state.forum.items);

  return (
    <div>
      <div className="mx-8 my-4">
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
            Forum
          </Link>
        </Breadcrumbs>
      </div>
      <div className="flex flex-row">
        <div className="basis-1/4 min-h-screen bg-white">
          <Sidebar />
        </div>
        <div className="basis-3/4 min-h-screen bg-white flex flex-col items-center">
          <div className="flex justify-center w-full bg-[#fe9800] py-4 px-6 text-base font-medium">
            <div className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-4 fill-white"
              >
                <path d="M3.505 2.365A41.369 41.369 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.141 43.141 0 0 0-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 0 1 5 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914Z" />
                <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 0 0 1.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0 0 14 6Z" />
              </svg>
              <div>
                <h2 className="font-semibold text-white">Forum</h2>
              </div>
            </div>
          </div>
          {/* <div className="text-black mt-4 w-10/12">
            {forumTopic.map((topic, index) => (
              <Accordion key={index} title={topic.title} topics={topic} />
            ))}
          </div> */}
          <div className="text-black mt-4 w-10/12">
            {items.map((topic, index) => (
              <Accordion key={index} title={topic.title} topics={topic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
