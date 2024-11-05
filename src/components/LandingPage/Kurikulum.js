"use client";
import { useState } from "react";
import Image from 'next/image';

const kurikulumItems = [
  { title: "Materi Dasar Umum", content: "Isi materi dasar umum yang akan diajarkan." },
  { title: "Materi Praktik Litigasi", content: "Materi yang berfokus pada praktik litigasi di pengadilan." },
  { title: "Materi Praktik Non Litigasi", content: "Materi mengenai praktik hukum di luar pengadilan." },
  { title: "Materi Pendukung", content: "Materi tambahan untuk mendukung pemahaman hukum." },
];

export default function Kurikulum() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-16 bg-gray-50 w-full px-8">
      <div className="flex flex-col md:flex-row w-full gap-12">
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-6">Kurikulum</h2>
          <div className="space-y-4">
            {kurikulumItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
                onClick={() => toggleAccordion(index)}
              >
                <div className="flex justify-between items-center px-6 py-4">
                  <span className="text-lg font-semibold">{item.title}</span>
                  <span className="text-xl">
                    {openIndex === index ? (
                      <Image
                        src="/images/ikon/up-triangle.png"
                        alt="Up arrow"
                        width={10}
                        height={10}
                      />
                    ) : (
                      <Image
                        src="/images/ikon/down-triangle.png"
                        alt="Down arrow"
                        width={10}
                        height={10}
                      />
                    )}
                  </span>
                </div>
                {openIndex === index && (
                  <div className="px-6 py-4 text-gray-600 border-t">
                    {item.content}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/images/kurikulum.png"
            alt="Kurikulum"
            className="rounded-lg shadow-md max-w-[75%] w-full mx-auto" 
            width={800}
            height={600}
            layout="responsive"
          />
        </div>
      </div>
    </div>
  );
}
