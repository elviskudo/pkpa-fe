"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Sidebar({ title, modules, active, onTopicClick }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full py-4 px-8 bg-white hover:bg-gray-50"
      >
        <h3 className="text-left font-semibold">{title}</h3>
        <ChevronDown
          size={24}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="bg-white">
          {modules.topics.map((topic, index) => {
            const isActive = topic.name === active;
            return (
              <div
                key={index}
                className={`py-4 px-8 cursor-pointer ${
                  isActive ? "bg-orange-50 text-[#fe9800]" : ""
                }`}
                onClick={() => onTopicClick(topic.name)}
              >
                <div className="flex items-center space-x-4">
                  {topic.icon}
                  <div>
                    <h2
                      className={`font-medium ${
                        isActive ? "text-[#fe9800]" : "text-black"
                      }`}
                    >
                      {topic.name}
                    </h2>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
