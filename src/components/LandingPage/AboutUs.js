// components/User/AboutUs.js
"use client";

export default function AboutUs() {
    return (
        <div className="py-16 bg-white flex flex-col md:flex-row items-start gap-8 max-w-7xl mx-auto px-4">
            <div className="md:w-1/2">
                <h3 className="text-orange-500 font-bold text-lg mb-2">TENTANG KAMI</h3>
                <h2 className="text-3xl font-bold mb-4 leading-tight">
                    Pendidikan Khusus Profesi Advokat - Online Atmasasmita, Dodi & Rekan Law Firm
                </h2>
                <img
                    src="/images/aboutUs.png"
                    alt="Tentang Kami"
                    className="w-full shadow-md md:max-w-sm"
                />
            </div>
            <div className="md:w-1/2">
                <p className="text-gray-600 text-xl mb-4">
                ADR LAW ACADEMY, merupakan lembaga yang fokus dalam bidang pendidikan dan pelatihan hukum online dalam segala aspeknya bagi kaum muda dalam meningkatkan profesionalitas dan kualitas sumber daya manusia terutama dalam profesi advokat dalam menghadapi dinamisnya tantangan hukum di era globalisasi dan digitalisasi.
                </p>
                <p className="text-gray-600 text-xl mb-4">
                ADR LAW ACADEMY didirikan oleh Prof. Dr. Romli Atmasasmita, SH., LL.M. Romli Atmasasmita adalah Profesor Hukum Pidana Internasional di Universitas Padjajaran, mendapat gelar master dari University of California Berkeley (1981) dan gelar doctor dari Universitas Gadjah Mada (1996).
                </p>
                <p className="text-gray-600 text-xl mb-4">
                Bersama rekannya Dr. Dodi S. Abdulkadir, B.Sc., SE., SH. MH. Dodi S. Abdulkadir memegang gelar PhD di bidang hukum bisnis, dan seorang pengacara yang telah mewakili klien terkenal & berprofil tinggi di Indonesia. Mengkhususkan diri dalam Fraud and White-Collar Crime.
                </p>
                <p className="text-gray-600 text-xl mb-4">
                ADR LAW ACADEMY berkeinginan menjadi pelopor dan wadah dalam pengembangan dan pemasyarakatan hukum di Indonesia, dengan menyelenggarakan kegiatan pendidikan dan pelatihan, serta kegiatan diskusi dan seminar tingkat nasional dan internasional.
                </p>
                <button className="bg-orange-500 text-white text-xl px-6 py-3 rounded hover:bg-orange-600 transition">
                    Read More
                </button>
            </div>

        </div>
    );
}
