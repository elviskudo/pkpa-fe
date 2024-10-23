"use client";
import Image from "next/image";

// Menambahkan props agar data bisa diterima dari luar
const VisionMission = ({ vision, mission, goal }) => {
  return (
    <div className="py-16 px-6 md:px-16 lg:px-24">
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-8">Visi, Misi & Tujuan</h2>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Side: Vision, Mission, and Image */}
        <div className="lg:w-1/2">
          {/* Vision */}
          <h3 className="text-2xl font-semibold mb-4">Visi</h3>
          <p className="mb-8">
            {vision} {/* Menggunakan data vision dari props */}
          </p>

          {/* Mission */}
          <h3 className="text-2xl font-semibold mb-4">Misi</h3>
          <ol className="list-decimal pl-5 space-y-4 mb-8">
            {mission.map((item, index) => (
              <li key={index}>{item}</li> // Looping misi dari props
            ))}
          </ol>

          {/* Image below Vision and Mission */}
          <div className="mt-8">
            <Image
              src="/images/slide-belajar.jpg" // Replace with the actual path to your image
              alt="Image below Visi and Misi"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>
        </div>

        {/* Right Side: Image and Purpose (Tujuan) */}
        <div className="lg:w-1/2">
          {/* Image above Tujuan */}
          <div className="mb-8">
            <Image
              src="/images/slide-belajar.jpg" // Replace with the actual path to your image
              alt="Image above Tujuan"
              width={500}
              height={300}
              className="rounded-lg shadow-md"
            />
          </div>

          {/* Purpose Section */}
          <h3 className="text-2xl font-semibold mb-4">Tujuan</h3>
          <ol className="list-decimal pl-5 space-y-4">
            {goal.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;
