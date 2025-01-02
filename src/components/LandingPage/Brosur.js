// components/User/Brosur.js
import Image from 'next/image';

export default function Brosur() {
  return (
    <div className="py-16 flex justify-center w-full px-8">
      <div className="bg-blue-600 rounded-xl flex items-center justify-between px-8 py-12 w-full relative shadow-lg">
        <div className="text-white">
          <div className="mb-4">
            <Image
              src="/images/logo-nobg.png" // Ganti path sesuai dengan logo Anda
              alt="PKPA Logo"
              width={100}
              height={100}
            />
          </div>
          <h2 className="text-4xl font-bold mb-4">Biaya PKPA</h2>
          <p className="mb-2">Biaya Pendidikan PKPA sebesar</p>
          <p className="text-2xl font-semibold mb-6">Rp2.500.000,00</p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-lg hover:bg-gray-200 transition">
            Daftar Sekarang
          </button>
        </div>

        {/* Gambar Tiga Ikon di sebelah kiri gambar orang */}
        <div className="absolute bottom-15 right-[30%] lg:right-[40%]">
          <Image
            src="/images/tiga-ikon.png" // Ganti path dengan gambar tiga ikon Anda
            alt="Tiga Ikon"
            width={200}
            height={200}
            className="rounded-lg"
          />
        </div>

        <div className="absolute bottom-0 right-10">
          <Image
            src="/images/person.png" // Ganti path sesuai dengan gambar orang Anda
            alt="Person"
            width={300}
            height={300}
            className="rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
