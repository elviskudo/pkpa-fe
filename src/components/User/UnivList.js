// components/User/UniversityList.js
"use client";

const universities = [
  { name: "Indonesia", logo: "/images/univ/ui-logo.png" },
  { name: "Pasundan", logo: "/images/univ/ub-logo.png" },
  { name: "Trisakti", logo: "/images/univ/trisakti-logo.png" },
  { name: "Padjadjaran", logo: "/images/univ/unpad-logo.png" },
  { name: "Muhammadiyah Yogyakarta", logo: "/images/univ/umy-logo.png" },
  { name: "Brawijaya", logo: "/images/univ/ub-logo.png" },
  { name: "Gadjah Mada", logo: "/images/univ/ugm-logo.png" },
  { name: "Gunadarma", logo: "/images/univ/gunadarma-logo.png" },
];

export default function UniversityList() {
  return (
    <div className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Daftar Universitas Penyelenggara</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 max-w-5xl mx-auto">
        {universities.map((university, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={university.logo} alt={`${university.name} logo`} className="h-20 mb-4" />
            <p className="text-center">
              Universitas
              <br />
              {university.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
