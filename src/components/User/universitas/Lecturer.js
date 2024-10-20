"use client";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

const lecturers = {
  general: [
    {
      name: "Prof. Dr. Romli Atmasasmita, SH., LL.M",
      image: "/images/person.png",
      education: "Magister Hukum University of California Berkeley, U.S",
      expertise: "Hukum Perdata",
      bio: "A PhD holder in business law, and a very well-known lawyer that has been representing high-profile clients in Indonesia.",
      subjects: [
        "Fungsi dan Peran Organisasi Advokat",
        "Sistem Peradilan Indonesia",
        "Kode Etik Profesi Advokat",
      ],
    },
    {
      name: "Dr. Dodi S. Abdulkadir, B.Sc., SE., SH. MH",
      image: "/images/person.png",
      education: "Magister Hukum University of California Berkeley, U.S",
      expertise: "Hukum Perdata",
      bio: "Specialized in Fraud and White-Collar Crime with significant experience in litigation involving civil and criminal cases.",
      subjects: [
        "Tindak Pidana Korupsi",
        "Tindak Pidana Pencucian Uang",
        "Tindak Pidana Perbankan",
      ],
    },
    {
        name: "Prof. Dr. Romli Atmasasmita, SH., LL.M",
        image: "/images/person.png",
        education: "Magister Hukum University of California Berkeley, U.S",
        expertise: "Hukum Perdata",
        bio: "A PhD holder in business law, and a very well-known lawyer that has been representing high-profile clients in Indonesia.",
        subjects: [
          "Fungsi dan Peran Organisasi Advokat",
          "Sistem Peradilan Indonesia",
          "Kode Etik Profesi Advokat",
        ],
      },
  ],
  litigation: [
    {
      name: "Dr. John Doe, SH., MH",
      image: "/images/person.png",
      education: "Magister Hukum Universitas Indonesia",
      expertise: "Hukum Pidana",
      bio: "Specialized in litigation processes, especially criminal law cases and procedures in Indonesian courts.",
      subjects: [
        "Tindak Pidana Umum",
        "Proses Peradilan Pidana",
        "Etika dalam Proses Peradilan",
      ],
    },
    {
      name: "Prof. Jane Smith, SH., LL.M",
      image: "/images/person.png",
      education: "Magister Hukum University of Oxford, UK",
      expertise: "Hukum Perdata",
      bio: "An expert in civil litigation and frequently consulted in civil rights cases.",
      subjects: [
        "Peradilan Perdata",
        "Hukum Keluarga",
        "Hukum Waris",
      ],
    },
  ],
  nonLitigation: [
    {
      name: "Dr. Emily Brown, SH., MH",
      image: "/images/person.png",
      education: "Magister Hukum Universitas Gadjah Mada",
      expertise: "Hukum Bisnis",
      bio: "Focused on non-litigation cases involving corporate law and contracts.",
      subjects: [
        "Penyelesaian Sengketa Bisnis",
        "Hukum Kontrak",
        "Arbitrase dan Mediasi",
      ],
    },
    {
      name: "Dr. Robert Wilson, SH., LL.M",
      image: "/images/person.png",
      education: "Magister Hukum Harvard University",
      expertise: "Hukum Internasional",
      bio: "Highly regarded for his experience in international business law and cross-border disputes.",
      subjects: [
        "Hukum Dagang Internasional",
        "Penyelesaian Sengketa Internasional",
        "Hukum Perdagangan Bebas",
      ],
    },
  ],
  supporting: [
    {
      name: "Prof. Alan Turner, SH., MH",
      image: "/images/person.png",
      education: "Magister Hukum Universitas Airlangga",
      expertise: "Hukum Administrasi Negara",
      bio: "A leading expert in administrative law and governance.",
      subjects: [
        "Hukum Tata Negara",
        "Hukum Administrasi Publik",
        "Kebijakan Publik dan Hukum",
      ],
    },
    {
      name: "Dr. Linda Green, SH., LL.M",
      image: "/images/person.png",
      education: "Magister Hukum Universitas Diponegoro",
      expertise: "Hukum Ketenagakerjaan",
      bio: "Specialized in labor law and social security law.",
      subjects: [
        "Hukum Ketenagakerjaan",
        "Hukum Perlindungan Tenaga Kerja",
        "Hukum Jaminan Sosial",
      ],
    },
  ],
};

const Lecturer = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState("general");

  return (
    <div className="flex">
      {/* Left Side: Curriculum List */}
      <div className="w-1/3 ml-20 mt-11">
        <h2 className="text-2xl font-bold mb-4">Kurikulum PKPA</h2>
        <ul className="space-y-4">
          <li
            onClick={() => setSelectedCurriculum("general")}
            className={`cursor-pointer ${
              selectedCurriculum === "general" ? "text-orange-500" : ""
            }`}
          >
            • Materi Dasar Umum
          </li>
          <li
            onClick={() => setSelectedCurriculum("litigation")}
            className={`cursor-pointer ${
              selectedCurriculum === "litigation" ? "text-orange-500" : ""
            }`}
          >
            • Materi Praktik Litigasi
          </li>
          <li
            onClick={() => setSelectedCurriculum("nonLitigation")}
            className={`cursor-pointer ${
              selectedCurriculum === "nonLitigation" ? "text-orange-500" : ""
            }`}
          >
            • Materi Praktik Non Litigasi
          </li>
          <li
            onClick={() => setSelectedCurriculum("supporting")}
            className={`cursor-pointer ${
              selectedCurriculum === "supporting" ? "text-orange-500" : ""
            }`}
          >
            • Materi Pendukung
          </li>
        </ul>
      </div>

      {/* Right Side: Lecturer Carousel */}
      <div className="w-2/3 ml-8 mb-8 mt-8 bg-white">
        <Swiper
          key={selectedCurriculum}  // This forces the Swiper component to re-render when the curriculum changes
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          slidesPerView={1.5}
          spaceBetween={20}  // Space between slides
          className="w-full"
        >
          {lecturers[selectedCurriculum].map((lecturer, index) => (
            <SwiperSlide key={`${lecturer.name}-${index}`}>
              <div className="flex flex-col items-center border border-gray-200 p-4 rounded-lg shadow-sm m-4">
                <Image
                  src={lecturer.image}
                  alt={lecturer.name}
                  width={150}
                  height={150}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-bold">{lecturer.name}</h3>
                <p className="text-sm text-gray-500">Dosen Fakultas Hukum UNPAD</p>
                <p className="mt-2 text-sm">
                  <strong>Pendidikan Terakhir:</strong> {lecturer.education}
                </p>
                <p className="mt-2 text-sm">
                  <strong>Bidang Keahlian:</strong> {lecturer.expertise}
                </p>
                <p className="mt-2 text-sm">{lecturer.bio}</p>
                <div className="mt-4 text-sm">
                  <p className="font-bold"> Materi Ajar: </p>
                  <ul className="list-decimal pl-4">
                    {lecturer.subjects.map((subject, i) => (
                      <li key={i}>{subject}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Lecturer;
