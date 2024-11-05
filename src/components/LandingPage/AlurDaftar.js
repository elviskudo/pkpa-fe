// components/User/AlurPendaftaran.js
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const steps = [
  {
    number: "01",
    title: "Pilih Universitas",
    description:
      "PKPA ADR Academy bekerja sama dengan universitas-universitas ternama dalam menyelenggarakan Pendidikan Khusus Profesi Advokat. Rasakan nuansa pengajaran yang berbeda dari universitas-universitas pilihan. Pilih universitas favorit dan ikuti periode gelombang pendaftaran yang tersedia.",
    image: "/images/slide-belajar.jpg",
  },
  {
    number: "02",
    title: "Pendaftaran",
    description:
      "Isi formulir pendaftaran dengan data yang valid dan lengkap. Pastikan semua informasi sesuai dengan persyaratan.",
    image: "/images/slide-belajar.jpg",
  },
  {
    number: "03",
    title: "Validasi Admin",
    description:
      "Setelah pendaftaran, admin akan memvalidasi dokumen yang telah dikirimkan untuk memastikan kelengkapan dan kebenaran.",
    image: "/images/slide-belajar.jpg",
  },
  {
    number: "04",
    title: "Tes Masuk",
    description:
      "Ikuti tes masuk yang diadakan secara online untuk mengetahui kesiapan Anda dalam mengikuti program PKPA.",
    image: "/images/slide-belajar.jpg",
  },
  {
    number: "05",
    title: "Bayar Biaya PKPA",
    description:
      "Lakukan pembayaran biaya program sesuai dengan tagihan yang tertera pada halaman pembayaran.",
    image: "/images/slide-belajar.jpg",
  },
  {
    number: "06",
    title: "Mulai Belajar",
    description:
      "Setelah semua proses selesai, Anda bisa mulai mengikuti kelas dan belajar dengan materi-materi yang telah disediakan.",
    image: "/images/slide-belajar.jpg",
  },
];

export default function AlurPendaftaran() {
  return (
    <div className="py-16 bg-white flex flex-col md:flex-row items-start gap-12 w-full px-8 lg:px-12">
      <div className="md:w-1/3 flex flex-col justify-between">
        <div>
          <h2 className="text-3xl font-bold mb-6">Alur Pendaftaran</h2>
          <ul className="space-y-6">
            {steps.map((step, index) => (
              <li key={index} className="flex items-start space-x-4">
                <div className="text-orange-500 font-bold text-2xl">{step.number}</div>
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold">{step.title}</h3>
                  <hr className="w-full border-t-2 border-gray-300 my-2" />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="/brosur.pdf"
          className="flex items-center mt-8 text-orange-500 hover:underline"
        >
          <img
            src="/images/dl-logo.png" // Path logo download
            alt="Download Logo"
            className="w-5 h-5 mr-2" // Menentukan ukuran logo dan jarak dengan teks
          />
          Download Brosur
        </a>
      </div>

      {/* Slider untuk gambar dan teks */}
      <div className="md:w-2/3">
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="w-full h-[400px]"
        >
          {steps.map((step, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-full">
                {/* Gambar latar belakang */}
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                {/* Background transparan di sebelah kiri */}
                <div className="absolute inset-y-0 left-0 bg-black bg-opacity-50 w-2/5 p-6 flex flex-col justify-center text-white rounded-lg">
                  <h3 className="text-2xl font-bold">{step.number}</h3>
                  <h4 className="text-xl font-semibold mb-2">{step.title}</h4>
                  <p className="text-sm">{step.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
