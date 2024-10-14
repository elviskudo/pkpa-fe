"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation, Pagination } from 'swiper/modules';

const keunggulan = [
  {
    title: "Alur Belajar Terbaik",
    description: "Akses penuh materi kapan saja di mana saja.",
    icon: "/images/ikon-belajar.png",
  },
  {
    title: "Fleksibel & Interaktif",
    description: "Fleksibel dan interaktif dalam pengajaran.",
    icon: "/images/ikon-belajar.png",
  },
  {
    title: "ADR Sertifikat",
    description: "Sertifikat ADR setelah selesai mengikuti program.",
    icon: "/images/ikon-belajar.png",
  },
  {
    title: "Pengalaman Virtual",
    description: "Belajar dengan pengalaman virtual terkini.",
    icon: "/images/ikon-belajar.png",
  },
  {
    title: "Dukungan Pembelajaran",
    description: "Dapatkan dukungan pembelajaran dan mentor.",
    icon: "/images/ikon-belajar.png",
  },
  {
    title: "Tes Online",
    description: "Selesaikan ujian secara online dengan mudah.",
    icon: "/images/ikon-belajar.png",
  },
];

export default function CarouselKeunggulan() {
  return (
    <div className="py-16 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-center mb-8">Keunggulan PKPA ADR</h2>
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        slidesPerView={3.5}  // Menampilkan 3.5 kotak per slide
        spaceBetween={20}  // Menambahkan jarak antar slide
        centeredSlides={false}  // Mematikan pemusatan slide
        slidesOffsetBefore={100}  // Menghilangkan offset di awal
        slidesOffsetAfter={100}  // Menghilangkan offset di akhir
        className="w-full"
      >
        {keunggulan.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="p-6 bg-white rounded-lg shadow-md h-full flex flex-col items-center justify-center text-center border border-gray-300">
              <img src={item.icon} alt={item.title} className="w-16 h-16 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
