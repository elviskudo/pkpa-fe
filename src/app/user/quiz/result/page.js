"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as React from "react";
import Sidebar from "@/components/User/detail/Sidebar";
import { Tabs, TabsContent, TabsTrigger } from "@/components/User/detail/Tabs";
import NavbarQuiz from "@/components/User/quiz/NavbarQuiz";
import Breadcrumb from "@/components/User/quiz/Breadcrumb";
import "@/components/User/quiz/AlertSwal.css";
import { EyeIcon } from "@heroicons/react/20/solid";
import { Modal, Button } from "flowbite-react";

const QuizResult = {
    id: 1,
    uuid: '1234-2345-23456',
    student_id: 1,
    student: {
        id: 1,
        uuid: '2345-4356-3456',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+6279887645678',
        address: 'Jl. Raya Jakarta',
        university_id: 1,
        university: {
            id: 1,
            uuid: '4356-2345-2345',
            name: 'Universitas Indonesia',
            address: 'Jl. Raya Jakarta',
            phone: '+6281234567890',
            email: 'univ@indonesia.com',
        },
        created_at: '2022-01-01 00:00:00',
        updated_at: '2022-01-01 00:00:00',
    },
    quiz_start: '2024-12-12 12:10:00',
    quiz_end: '2024-12-12 13:00:00',
    questions_count: 25,
    correct_answers: 20,
    incorrect_answers: 5,
    unanswered: 0,
    score: 80,
    status: 'completed',
    created_at: '2024-12-12 12:10:00',
    updated_at: '2024-12-12 13:00:00',
};

const DetailQuizAnswers = {
    id: 1,
    uuid: '3245-2345-4560',
    quiz_id: '3456-3456-2345',
    quiz: {
        id: 1,
        uuid: '3456-3456-2345',
        name: 'Quiz 1',
        description: 'This is a quiz',
    },
    answers: [
        {
            id: 1,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 1,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: false
        },
        {
            id: 2,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 3,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 4,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 5,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 6,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 7,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 8,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 9,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 10,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
        {
            id: 11,
            uuid: '1234-1234-1234',
            question_id: '1234-1234-1234',
            question: {
                id: 4,
                uuid: '1234-1234-1234',
                text: 'What is your name?',
                type: 'text',
            },
            answer_id: '5423-2345-2345',
            answer: {
                id: 1,
                uuid: '5423-2345-2345',
                text: 'John Doe',
                type: 'text',
            },
            result: true
        },
    ]
}

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

export default function Result() {
    const [activeTopic, setActiveTopic] = React.useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [activeContent] = useState(dataContent[0]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    const handleRetakeQuiz = () => {
        router.push('/user/quiz'); 
    };

    const handleNexteQuiz = () => {
        router.push('/user/quiz/certificate'); 
    };

    const handleActiveTopic = (topic) => {
        setActiveTopic(topic);
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
                    <header className="bg-orange-400 p-4 text-center text-white">
                        <h1 className="font-bold">Kuis</h1>
                    </header>
                    <div className="mt-12 mx-20 text-black">
                        <h2 className="text-xl font-semibold">Kuis 1</h2>
                        <div className="mt-2">
                            <h3 className="font-semibold pt-4">Deskripsi Konten</h3>
                            <p className="py-2">{activeContent.description}</p>
                            <div className="grid grid-cols-2 col-span-2">
                                <p className="pt-4">Batas Akses&nbsp;: <strong>1</strong></p>
                                <p className="pt-4">Mulai Kuis&nbsp;&nbsp;&nbsp;: <strong>{new Date(QuizResult.quiz_start).toLocaleString()}</strong></p>
                                <p className="pt-4">KKM&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>75</strong></p>
                                <p className="pt-4">Akhir Kuis&nbsp;&nbsp;&nbsp;: <strong>{new Date(QuizResult.quiz_end).toLocaleString()}</strong></p>
                                <p className="pt-4">Durasi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: <strong>10 Menit</strong></p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-10 mx-20 text-black">
                        <h3 className="font-semibold text-lg">Hasil Kuis</h3>
                        <table className="w-full table-auto mt-2">
                            <thead>
                                <tr className="bg-orange-200 text-left border-2 border-gray-300">
                                    <th className="p-2">Waktu Mulai Kuis</th>
                                    <th className="p-2">Soal</th>
                                    <th className="p-2">Benar</th>
                                    <th className="p-2">Salah</th>
                                    <th className="p-2">Nilai</th>
                                    <th className="p-2">Info</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-2 border-t-gray-300 border-x-gray-300">
                                    <td className="p-2">{new Date(QuizResult.quiz_start).toLocaleString()}</td>
                                    <td className="p-2">{QuizResult.questions_count}</td>
                                    <td className="p-2">{QuizResult.correct_answers}</td>
                                    <td className="p-2">{QuizResult.incorrect_answers}</td>
                                    <td className="p-2">{QuizResult.score}</td>
                                    <td className="p-2">
                                        <button className="text-blue-500" onClick={toggleModal}><EyeIcon className="size-6 text-black"/></button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-8 mx-20">
                        <button className="bg-orange-400 text-white px-2 py-4 rounded mr-2 w-48" onClick={handleRetakeQuiz}>Ulangi Kuis</button>
                    </div>
                    <div className="flex justify-between mt-16 mx-20">
                        <button className="border-2 border-orange-400 text-orange-400 px-2 py-4 rounded w-48" onClick={() => router.back()}>Sebelumnya</button>
                        <button className="bg-orange-400 text-white px-2 py-4 rounded w-44" onClick={handleNexteQuiz}>Selanjutnya</button>
                    </div>
                    <div>
                        <Modal show={isOpen} onClose={toggleModal}>
                            <Modal.Header className="flex justify-center w-full">
                                <h2 className="text-center">Hasil Kuis</h2>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="flex space-x-4">
                                    <div className="min-w-1/2 border-collapse">
                                        <table className="divide-y divide-black">
                                            <thead>
                                                <tr className="bg-orange-200 text-left rounded text-black">
                                                    <th className="p-2">No</th>
                                                    <th className="p-2">Soal</th>
                                                    <th className="p-2 ">Jawaban</th>
                                                    <th className="p-2">Evaluasi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-black">
                                                {DetailQuizAnswers.answers.slice(0, Math.ceil(DetailQuizAnswers.answers.length / 2)).map((answer, index) => (
                                                    <tr key={index} className="text-gray-400">
                                                        <td className="p-2">{index + 1}</td>
                                                        <td className="p-2">{answer.question.text}</td>
                                                        <td className="p-2">{answer.answer.text}</td>
                                                        <td className={answer.result ? 'text-green-500' : 'text-red-500'}>{answer.result ? 'Benar' : 'Salah'}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                    <div className="min-w-1/2 border-collapse">
                                        <table className="divide-y divide-black">
                                            <thead>
                                                <tr className="bg-orange-200 text-left rounded text-black">
                                                    <th className="p-2">No</th>
                                                    <th className="p-2">Soal</th>
                                                    <th className="p-2">Jawaban</th>
                                                    <th className="p-2">Evaluasi</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-black">
                                                {DetailQuizAnswers.answers.slice(Math.ceil(DetailQuizAnswers.answers.length / 2)).map((answer, index) => (
                                                    <tr key={index} className="text-gray-400">
                                                        <td className="p-2">{index + 1 + Math.ceil(DetailQuizAnswers.answers.length / 2)}</td>
                                                        <td className="p-2">{answer.question.text}</td>
                                                        <td className="p-2">{answer.answer.text}</td>
                                                        <td className={answer.result ? 'text-green-500' : 'text-red-500'}>
                                                            {answer.result ? 'Benar' : 'Salah'}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Modal.Body>
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    );
}


