"use client";
import Image from "next/image";

const UnivDesc = () => {
  return (
    <div
      className="relative bg-cover bg-center py-16"
      style={{ backgroundImage: "url('/images/slide-belajar.jpg')" }}
    >
      {/* Transparent overlay */}
      <div className="absolute inset-0 bg-white bg-opacity-50"></div>

      {/* Centered Text */}
      <div className="relative z-10 flex justify-center items-center h-full">
        <p className="text-center text-2xl font-semibold text-black px-4 max-w-4xl leading-relaxed">
          Pelopor penguatan ilmu hukum yang kompetitif, berkelas dunia yang
          unggul dan inovatif dalam rangka mengabdi pada kepentingan bangsa dan
          Negara berdasar dijiwai nilai-nilai budaya bangsa yang berdasarkan
          Pancasila.
        </p>
      </div>
    </div>
  );
};

export default UnivDesc;
