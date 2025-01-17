"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import Moment from "react-moment";
import Comments from "./Comments";
import { getInitials } from "@/libs/Helpers";

export default function Accordion({ title, topics }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="m-3 border-y border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full py-8 px-2 bg-white hover:bg-gray-50"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">
                {getInitials(topics.user.name)}
              </span>
            </div>
          </div>
          <div>
            <h3 className="flex text-gray-800 font-semibold">{title}</h3>
            <div className="flex items-center text-gray-500 text-sm space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M1 8.25a1.25 1.25 0 1 1 2.5 0v7.5a1.25 1.25 0 1 1-2.5 0v-7.5ZM11 3V1.7c0-.268.14-.526.395-.607A2 2 0 0 1 14 3c0 .995-.182 1.948-.514 2.826-.204.54.166 1.174.744 1.174h2.52c1.243 0 2.261 1.01 2.146 2.247a23.864 23.864 0 0 1-1.341 5.974C17.153 16.323 16.072 17 14.9 17h-3.192a3 3 0 0 1-1.341-.317l-2.734-1.366A3 3 0 0 0 6.292 15H5V8h.963c.685 0 1.258-.483 1.612-1.068a4.011 4.011 0 0 1 2.166-1.73c.432-.143.853-.386 1.011-.814.16-.432.248-.9.248-1.388Z" />
              </svg>
              <span>{topics.like_count}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-5"
              >
                <path d="M18.905 12.75a1.25 1.25 0 1 1-2.5 0v-7.5a1.25 1.25 0 0 1 2.5 0v7.5ZM8.905 17v1.3c0 .268-.14.526-.395.607A2 2 0 0 1 5.905 17c0-.995.182-1.948.514-2.826.204-.54-.166-1.174-.744-1.174h-2.52c-1.243 0-2.261-1.01-2.146-2.247.193-2.08.651-4.082 1.341-5.974C2.752 3.678 3.833 3 5.005 3h3.192a3 3 0 0 1 1.341.317l2.734 1.366A3 3 0 0 0 13.613 5h1.292v7h-.963c-.685 0-1.258.482-1.612 1.068a4.01 4.01 0 0 1-2.166 1.73c-.432.143-.853.386-1.011.814-.16.432-.248.9-.248 1.388Z" />
              </svg>
              <span>{topics.dislike_count}</span>
              <span>
                <Moment fromNow>{topics.created_at}</Moment> oleh{" "}
                {topics.user.name}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fill-rule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{topics.comments.length}</span>
        </div>
      </button>
      {isOpen && (
        <div className="bg-white p-2">
          <div className="space-y-4 mx-8 px-8">
            <div className="flex flex-col">
              <h4 className="text-blue-600 font-semibold">
                {topics.user.name}
              </h4>
              <div className="mt-4">
                <Image
                  src={topics.image_url}
                  alt={topics.image_url}
                  width={104}
                  height={60}
                />
              </div>
              <p className="my-4">{topics.content}</p>
            </div>
          </div>
          <Comments topics={topics} />
        </div>
      )}
    </div>
  );
}
