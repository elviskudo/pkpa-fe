"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { useState, useEffect } from "react";
import Sidebar from "@/components/User/detail/Sidebar";
import { Tabs, TabsContent, TabsTrigger } from "@/components/User/detail/Tabs";
import NavbarQuiz from "@/components/User/quiz/NavbarQuiz";
import Breadcrumb from "@/components/User/quiz/Breadcrumb";
import Swal from "sweetalert2";
import "@/components/User/quiz/AlertSwal.css";



function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

const dataQuizByContent = [
  {
    id: 1,
    uuid: "1323-1234-2342-4545",
    question: "University of California, Berkeley berada dimana?",
    options: [
      { id: 1, uuid: "1234-1234-1234", option: "California" },
      { id: 2, uuid: "1234-1234-1234", option: "New York" },
    ],
    is_active: 1,
  },
  {
    id: 2,
    uuid: "1323-1234-2342-4545",
    question: "Didalam pasal 32 (3) diatur profesi advokat yang terhimpun dalam Peradi berjumlah?",
    options: [
        { id: 1, uuid: "1234-1234-1234", option: "6 organisasi advokat" },
        { id: 2, uuid: "1234-1234-1234", option: "7 organisasi advokat" },
        { id: 3, uuid: "1234-1234-1234", option: "8 organisasi advokat" },
        { id: 4, uuid: "1234-1234-1234", option: "9 organisasi advokat" },
    ],
    is_active: 3,
  },
  {
    id: 3,
    uuid: "1323-1234-2342-4545",
    question: "Yang tidak terhimpun dalam organisasi advokat?",
    options: [
      { id: 1, uuid: "1234-1234-1234", option: "Asosiasi pengacara syariah indonesia" },
      { id: 2, uuid: "1234-1234-1234", option: "Serikat pengacara indonesia" },
      { id: 3, uuid: "1234-1234-1234", option: "Himpunan advokat dan pengacara indonesia" },
      { id: 4, uuid: "1234-1234-1234", option: "Peradin" },
    ],
    is_active: 4,
  },
];

export default function QuizQuestions() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [timeLeft, setTimeLeft] = useState(3600);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const router = useRouter();

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                    clearInterval(timer);
                    alert("Waktu habis!");
                    return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }
        
            return () => clearInterval(timer); // Membersihkan interval saat komponen dibongkar
          }, [timeLeft]);
    

    const handleSelectOption = (optionId) => {
        setSelectedOption(optionId);
    };

    const handleNextQuestion = () => {
      if (currentQuestionIndex === dataQuizByContent.length - 1) {
          Swal.fire({
              title: 'Konfirmasi Jawaban',
              text: "Apakah Anda yakin ingin menyelesaikan kuis?",
              showCancelButton: true,
              cancelButtonColor: 'white',
              confirmButtonColor: '#fe9800',
              confirmButtonText: 'Ya, Selesaikan',
              customClass: {
                popup: 'custom-swal-popup',
                title: 'custom-swal-title',
                confirmButton: 'custom-swal-confirm',
                cancelButton: 'custom-swal-cancel'
            }
          }).then((result) => {
              if (result.isConfirmed) {
                  router.push('/user/quiz/result');
              }
          });
      } else {
          // Lanjut ke soal berikutnya
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setSelectedOption(null); // Reset jawaban
      }
    };
    
      const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1); // Turunkan indeks soal
            setSelectedOption(null); // Reset pilihan untuk soal sebelumnya
        } else {
            alert("Ini adalah soal pertama!");
        }
    };

    const handleResetAnswers = () => {
        setSelectedOption(null); // Mengatur ulang pilihan jawaban
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

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
        <NavbarQuiz/>
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

        <div className="basis-3/4 min-h-screen bg-white flex flex-col px-5">
          {/* Timer and Quiz Header */}
          <div className="flex justify-between items-center mb-4 pt-5 border-b-4">
            <h1 className="text-2xl text-gray-500 pb-5">Latihan 1</h1>
            <p className="text-sm text-gray-500">Sisa Waktu: {formatTime(timeLeft)}</p>
          </div>

          {/* Question */}
          <h2 className="text-xl font-semibold mb-2 text-gray-500">Soal {currentQuestionIndex + 1}</h2>
          <p className="mb-6 text-gray-500">{dataQuizByContent[currentQuestionIndex].question}</p>

          {/* Options */}
          <div className="space-y-4">
            {dataQuizByContent[currentQuestionIndex].options.map((option) => (
              <label key={option.id} className="block text-gray-500">
                <input
                  type="radio"
                  name="option"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={() => handleSelectOption(option.id)}
                  className="mr-2"
                />
                {option.option}
              </label>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex mt-6">
            <button
              className="text-gray-600 underline mr-5"
              onClick={handleResetAnswers}
            >
              Reset Jawaban
            </button>
            <div className="space-x-4">
              <button
                className="border border-orange-400 hover:bg-gray-300 text-orange-400 font-semibold py-2 px-4 rounded"
                onClick={handlePreviousQuestion}
              >
                Kembali
              </button>
              <button
                className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded"
                onClick={handleNextQuestion}
              >
                Lanjut
              </button>
            </div>
          </div>

          {/* Explanation Section */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg text-gray-600">
            <h3 className="text-lg font-bold mb-2">Pembahasan</h3>
            <p className="text-sm">
              Nomor BPOM wajib tercantum pada berbagai produk, termasuk produk
              kecantikan atau kosmetik. Sedert nomor ini membuktikan bahwa
              kosmetik tersebut telah lulus uji produk dan aman untuk digunakan...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
