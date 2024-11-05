// components/User/UniversityList.js
import Link from "next/link";

const universities = [
  { name: "Indonesia", logo: "/images/univ/ui-logo.png", slug: "indonesia" },
  { name: "Pasundan", logo: "/images/univ/unpas-logo.png", slug: "pasundan" },
  { name: "Trisakti", logo: "/images/univ/trisakti-logo.png", slug: "trisakti" },
  { name: "Padjadjaran", logo: "/images/univ/unpad-logo.png", slug: "padjajaran" },
  { name: "Muhammadiyah Yogyakarta", logo: "/images/univ/umy-logo.png", slug: "muhammadiyah-yogyakarta" },
  { name: "Brawijaya", logo: "/images/univ/ub-logo.png", slug: "brawijaya" },
  { name: "Gadjah Mada", logo: "/images/univ/ugm-logo.png", slug: "gadjah-mada" },
  { name: "Gunadarma", logo: "/images/univ/gunadarma-logo.png", slug: "gunadarma" },
];

export default function UniversityList() {
  return (
    <div className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Daftar Universitas Penyelenggara</h2>
      
      {/* Mengubah max-w-5xl menjadi w-full untuk memastikan lebar penuh */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 w-full px-4">
        {universities.map((university, index) => (
          <Link key={index} href={`/home/university/${university.slug}`}>
            <div className="flex flex-col items-center cursor-pointer">
              <img src={university.logo} alt={`${university.name} logo`} className="h-20 mb-4 object-contain" />
              <p className="text-center">
                Universitas
                <br />
                {university.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
