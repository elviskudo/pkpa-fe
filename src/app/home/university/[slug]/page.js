"use client"
import { useParams } from 'next/navigation';
import NavbarLogin from "@/components/User/universitas/NavbarLogin";
import CampusProfile from "@/components/User/universitas/CampusProfile";
import Lecturer from "@/components/User/universitas/Lecturer";
import UnivDesc from "@/components/User/universitas/UnivDesc";
import VisionMission from "@/components/User/universitas/VisionMision";
import Testimony from "@/components/LandingPage/Testimony";
import Footer from "@/components/LandingPage/footer";

const dataUniversities = [
    {
        id: 1,
        name: "Universitas Padjajaran",
        description: "Universitas Padjajaran",
        slug: "padjajaran",
        image_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
        logo_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
        certificate_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
        vision: "Menjadi Universitas Unggul Dalam Penyelenggaraan Pendidikan Kelas Dunia",
        mission: [
            "Menyelenggarakan pendidikan (pengajaran, penelitian, dan pengembangan ilmu pengetahuan serta pengabdian kepada masyarakat), yang mampu memenuhi tuntutan masyarakat pengguna jasa pendidikan tinggi.",
            "Menyelenggarakan pendidikan tinggi yang berdaya saing internasional dan relevan dengan tuntutan pengguna jasa pendidikan dalam memajukan perkembangan intelektual dan kesejahteraan masyarakat.",
            "Menyelenggarakan pengelolaan pendidikan yang profesional dan akuntabel untuk meningkatkan citra perguruan tinggi.",
            "Membentuk insan akademik yang menjunjung tinggi keluhuran budaya lokal, dan budaya nasional dalam keragaman budaya dunia."
        ],
        goal: [
            "Penyediaan atmosfer yang mendukung pelaksanaan riset yang unggul, termasuk prasarana dan sarana, dana, sistem, maupun sumberdaya manusia.",
            "Peningkatan kerjasama penelitian dengan lembaga-lembaga penelitian, dunia bisnis dan industri di dalam dan luar negeri.",
            "Pengembangan penelitian inventif, aplikatif, kolaboratif, dan multi-disiplin untuk mendukung kemandirian Unpad",
        ],
        is_active: 1,
        order: 1,
    }
];


export default function UniversityPage() {
    const params = useParams();
    const { slug } = params;

    // Menemukan universitas berdasarkan slug
    const university = dataUniversities.find((uni) => uni.slug === slug);

    // Jika tidak ditemukan universitas yang sesuai dengan slug
    if (!university) {
        return <div>Universitas tidak ditemukan</div>;
    }

    return (
        <>
            <NavbarLogin />
            <div className="w-full mx-auto">
                <div id="profile"  className="scroll-mt-24">
                    <CampusProfile university={university} />
                </div>
                <div id="lecturer" className="scroll-mt-24">
                    <Lecturer university={university} />
                </div>
                <div id="description" className="scroll-mt-24">
                    <UnivDesc university={university} />
                </div>
                <div id="visionMission" className="scroll-mt-24">
                    <VisionMission vision={university.vision} mission={university.mission} goal={ university.goal} />
                </div>
                <div id="testimony" className="scroll-mt-24">
                    <Testimony />
                </div>
                <Footer />
            </div>
        </>
    );
}
