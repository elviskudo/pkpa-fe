"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Accordion({ title, items }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border border-gray-200 rounded-md shadow-sm overflow-hidden">
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
        <div className="bg-white p-6">
          {items.map((item, index) => (
            <div key={index} className="py-6 border-b border-gray-300">
              <div className="flex items-start space-x-6">
                <Image
                  src={item.image}
                  alt={item.title}
                  className="w-36 h-20 object-cover rounded"
                  width={154}
                  height={80}
                />
                <div className="flex-1">
                  <h4 className="py-2 font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.instructor}</p>
                  <div className="mt-2 flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-orange-500 h-2 rounded-full"
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {item.progress}%{item.progress === 100 ? " Selesai" : ""}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
