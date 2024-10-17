"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Sidebar({ title, modules }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="pl-4 border border-gray-200 shadow-sm overflow-hidden">
      <button
        type="button"
        onClick={toggleAccordion}
        className="flex items-center justify-between w-full p-4 bg-white hover:bg-gray-50"
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
        <div className="bg-white p-3">
          {modules.topics.map((topic, index) => (
            <div key={index} className="py-2">
              <div className="flex items-center space-x-4">
                {topic.icon}
                <div>
                  <h2 className="font-medium text-black">{topic.name}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
