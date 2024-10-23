// components/User/Testimoni.js
"use client";
import Image from 'next/image';

const testimonials = [
  {
    name: "Edgar Winter",
    role: "Mahasiswa Hukum",
    message: "Porttitor eget aliquam praesent commodo quis sed feugiat turpis mi sit ultricies integer sed mollis et pulvinar urna, sollicitudin eu aliquet risus cras nibh vel sem sit sit convallis potenti eu proin tellus ipsum volutpat in urna.",
    image: "/images/person.png"
  },
  {
    name: "Mario Loouis",
    role: "Mahasiswa Hukum",
    message: "Porttitor eget aliquam praesent commodo quis sed feugiat turpis mi sit ultricies integer sed mollis et pulvinar urna, sollicitudin eu aliquet risus cras nibh vel sem sit sit convallis potenti eu proin tellus ipsum volutpat in urna.",
    image: "/images/person.png"
  },
  {
    name: "Adrianne Armstrong",
    role: "Mahasiswa Hukum",
    message: "Porttitor eget aliquam praesent commodo quis sed feugiat turpis mi sit ultricies integer sed mollis et pulvinar urna, sollicitudin eu aliquet risus cras nibh vel sem sit sit convallis potenti eu proin tellus ipsum volutpat in urna.",
    image: "/images/person.png"
  },
  {
    name: "Anne Marie",
    role: "Mahasiswa Hukum",
    message: "Porttitor eget aliquam praesent commodo quis sed feugiat turpis mi sit ultricies integer sed mollis et pulvinar urna, sollicitudin eu aliquet risus cras nibh vel sem sit sit convallis potenti eu proin tellus ipsum volutpat in urna.",
    image: "/images/person.png"
  }
];

export default function Testimony() {
  return (
    <div className="py-16 bg-gray-50 border-t-2">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Testimoni</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-md">
              <p className="text-gray-600 mb-4">{testimonial.message}</p>
              <div className="flex items-center">
                <div className="mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-orange-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
