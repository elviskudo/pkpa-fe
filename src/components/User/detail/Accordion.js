"use client";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import Moment from "react-moment";
import Comments from "./Comments";
import { getInitials } from "@/libs/Helpers";
import {
  HandThumbUpIcon,
  HandThumbDownIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/20/solid";

export default function Accordion({ title, topics }) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleLike = () => {
    if (!hasLiked && !hasDisliked) {
      setHasLiked(true);
    }
    if (hasDisliked) {
      setHasDisliked(false);
      setHasLiked(true);
    }
  };

  const handleDislike = () => {
    if (!hasLiked && !hasDisliked) {
      setHasDisliked(true);
    }
    if (hasLiked) {
      setHasLiked(false);
      setHasDisliked(true);
    }
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
            <h4 className="text-blue-600 font-semibold">{topics.user.name}</h4>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-gray-500">
          <ChatBubbleBottomCenterIcon className="h-5 w-5" />
          <span>{(topics.comments && topics.comments.length) || 0}</span>
        </div>
      </button>
      {isOpen && (
        <div className="bg-white p-2">
          <div className="space-y-4 mx-8 px-8">
            <div className="flex flex-col">
              <div className="mt-4">
                {topics.image_url && (
                  <Image
                    src={topics.image_url}
                    alt={topics.image_url}
                    width={104}
                    height={60}
                  />
                )}
              </div>
              <p className="my-4">{topics.content}</p>
              <div>
                <div className="flex items-center text-gray-500 text-sm space-x-2">
                  <button
                    onClick={handleLike}
                    className={hasLiked ? "text-blue-500" : ""}
                  >
                    <HandThumbUpIcon className="h-5 w-5" />
                  </button>
                  <span>
                    {hasLiked ? topics.like_count + 1 : topics.like_count}
                  </span>
                  <button
                    onClick={handleDislike}
                    className={hasDisliked ? "text-red-500" : ""}
                  >
                    <HandThumbDownIcon className="h-5 w-5" />
                  </button>
                  <span>
                    {hasDisliked ? topics.like_count + 1 : topics.like_count}
                  </span>
                  <span>
                    <Moment fromNow>{topics.created_at}</Moment>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Comments topics={topics} />
        </div>
      )}
    </div>
  );
}
