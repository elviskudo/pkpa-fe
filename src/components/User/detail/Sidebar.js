"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsTrigger } from "@/components/User/detail/Tabs";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("content");
  const [activeTopic, setActiveTopic] = useState("");

  const [inputText, setInputText] = useState("");
  const [characterLimit] = useState(150);
  const handleChange = (event) => {
    setInputText(event.target.value);
  };

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

  useEffect(() => {
    if (pathname.includes("/forum")) {
      setActiveTab("forum");
    } else if (pathname.includes("/content")) {
      setActiveTab("content");
    }
  }, [pathname]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleActiveTopic = (name) => {
    setActiveTopic(name);
  };

  return (
    <Tabs value={activeTab}>
      <TabsTrigger
        value="content"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 fill-[#fe9800]"
          >
            <path d="M10.75 16.82A7.462 7.462 0 0 1 15 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0 0 18 15.06v-11a.75.75 0 0 0-.546-.721A9.006 9.006 0 0 0 15 3a8.963 8.963 0 0 0-4.25 1.065V16.82ZM9.25 4.065A8.963 8.963 0 0 0 5 3c-.85 0-1.673.118-2.454.339A.75.75 0 0 0 2 4.06v11a.75.75 0 0 0 .954.721A7.506 7.506 0 0 1 5 15.5c1.579 0 3.042.487 4.25 1.32V4.065Z" />
          </svg>
        }
      >
        <Link href="/user/course/detail/content">Konten Kelas</Link>
      </TabsTrigger>
      <TabsTrigger
        value="forum"
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="size-5 fill-[#fe9800]"
          >
            <path d="M3.505 2.365A41.369 41.369 0 0 1 9 2c1.863 0 3.697.124 5.495.365 1.247.167 2.18 1.108 2.435 2.268a4.45 4.45 0 0 0-.577-.069 43.141 43.141 0 0 0-4.706 0C9.229 4.696 7.5 6.727 7.5 8.998v2.24c0 1.413.67 2.735 1.76 3.562l-2.98 2.98A.75.75 0 0 1 5 17.25v-3.443c-.501-.048-1-.106-1.495-.172C2.033 13.438 1 12.162 1 10.72V5.28c0-1.441 1.033-2.717 2.505-2.914Z" />
            <path d="M14 6c-.762 0-1.52.02-2.271.062C10.157 6.148 9 7.472 9 8.998v2.24c0 1.519 1.147 2.839 2.71 2.935.214.013.428.024.642.034.2.009.385.09.518.224l2.35 2.35a.75.75 0 0 0 1.28-.531v-2.07c1.453-.195 2.5-1.463 2.5-2.915V8.998c0-1.526-1.157-2.85-2.729-2.936A41.645 41.645 0 0 0 14 6Z" />
          </svg>
        }
      >
        <Link href="/user/course/detail/forum">Forum</Link>
      </TabsTrigger>
      <TabsContent value="content">
        <div className="text-black">
          {dataModules.map((modules, index) => (
            <div
              key={index}
              className="border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={toggleAccordion}
                className="flex items-center justify-between w-full py-4 px-8 bg-white hover:bg-gray-50"
              >
                <h3 className="text-left font-semibold">{modules.title}</h3>
                <ChevronDown
                  size={24}
                  className={`transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isOpen && (
                <div className="bg-white">
                  {modules.topics.map((topic, topicIndex) => {
                    const isActive = topic.name === activeTopic;
                    return (
                      <div
                        key={topicIndex}
                        className={`py-4 px-8 cursor-pointer ${
                          isActive ? "bg-orange-50 text-[#fe9800]" : ""
                        }`}
                        onClick={() => handleActiveTopic(topic.name)}
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
          ))}
        </div>
      </TabsContent>
      <TabsContent value="forum">
        <div className="bg-white p-8 w-full">
          <h3 className="text-md font-semibold mb-2">Tambah Diskusi Baru</h3>
          <form>
            <div className="mb-4">
              <label
                htmlFor="discussionFor"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Diskusi Untuk
              </label>
              <select
                id="discussionFor"
                name="discussionFor"
                className="font-semibold block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              >
                <option>Dosen</option>
                <option>Mahasiswa</option>
                <option>Lainnya</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Judul Postinganmu
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Masukkan judul"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Isi Postinganmu
              </label>

              <div className="relative">
                <textarea
                  id="content"
                  name="content"
                  value={inputText}
                  onChange={handleChange}
                  maxLength={characterLimit}
                  className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Masukkan isi"
                  rows="4"
                ></textarea>
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-sm ${
                      inputText.length === characterLimit
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    {inputText.length}/{characterLimit} karakter
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-4 flex flex-col items-center justify-center w-full">
              <div
                id="clickArea"
                className="w-80 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-400 rounded-lg cursor-pointer"
              >
                <p className="text-gray-500 mt-2">Klik untuk upload</p>
                <p className="text-sm text-gray-400">
                  Maksimum 10 MB, Format Gambar
                </p>
                <input
                  id="imageUpload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                />
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#fe9800] text-white font-semibold py-2 px-4 rounded-md w-full"
            >
              Kirim
            </button>
          </form>
        </div>
      </TabsContent>
    </Tabs>
  );
}
