// components/User/Carousel.js
// components/User/Carousel.js
"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';

export default function Carousel() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper w-full h-full"
      >
        <SwiperSlide>
          <div className="relative">
            <img 
              src="/images/slide-belajar.jpg" 
              alt="Slide 1" 
              className="w-full h-screen object-cover lg:object-center" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg text-left max-w-lg mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">Pendidikan Khusus Profesi Advokat (PKPA ONLINE)</h1>
                <p className="mb-6 text-sm md:text-base">Raih cita-cita dengan satu langkah lebih dekat menjadi advokat dengan ADR Law Academy</p>
                <button className="px-4 py-2 md:px-6 md:py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition">Daftar Sekarang</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative">
            <img 
              src="/images/slide-belajar.jpg" 
              alt="Slide 2" 
              className="w-full h-screen object-cover lg:object-center" 
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white p-8 rounded-lg text-left max-w-lg mx-auto">
                <h1 className="text-2xl md:text-4xl font-bold mb-4">Kapan Saja Dimana Saja</h1>
                <p className="mb-6 text-sm md:text-base">Raih cita-cita dengan satu langkah lebih dekat menjadi advokat dengan ADR Law Academy</p>
                <button className="px-4 py-2 md:px-6 md:py-3 bg-orange-500 text-white rounded hover:bg-orange-600 transition">Pelajari Lebih Lanjut</button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
