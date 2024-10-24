import Image from "next/image";
import { Cookie, Rubik_Mono_One } from "next/font/google";

const cookie = Cookie ({
  subsets:['latin'],
  weight: ['400'],
  variable: '--font-cookie',
})

const rubikMonoOne = Rubik_Mono_One({
  subsets:['latin'],
  weight: ['400'],
  variable: '--font-rubik-mono-one',
})


export const Certificate = () => {
  return (
    <div className="w-[1200px] h-[880px] shadow-lg p-8 mx-auto mt-5 relative">
      <div className="absolute top-0 left-0 w-2/5 h-[30px] bg-orange-500 rounded-br-full"></div>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('/images/logo1.png')] bg-contain bg-no-repeat opacity-10"></div>
      <div className="flex items-center mt-8 ml-8 z-10">
        <Image 
        src="/images/logo.png" 
        alt="Logo PKPA" 
        width={150} 
        height={50} />
        <Image
          src="/images/logo-atmasasmita.png"
          alt="Logo Atmasasmita"
          width={150}
          height={50}
        />
      </div>

      <div className="text-left text-black mb-4 mt-8 ml-8">
        <h2 className="text-lg font-semibold">Pendidikan Khusus Profesi Advokat</h2>
        <h3 className="text-lg font-semibold">Fakultas Hukum Universitas Padjadjaran</h3>
      </div>

      <div className="text-left text-black mb-6 ml-8">
        <h1 className={`text-7xl ${cookie.className}`}>Muhamad Eko Sumantri, S.H.</h1>
        <p className="mt-2">
          Telah selesai mengikuti Pendidikan Khusus Profesi Advokat untuk Materi:
        </p>
        <h3 className={`text-orange-500 ${rubikMonoOne.className}`}>
          SISTEM PERADILAN INDONESIA
        </h3>
      </div>

      <div className="mb-6 ml-8">
        <table className="table-auto w-[500px] h-[50px] border-collapse border border-gray-300 text-black">
          <thead>
            <tr>
              <th className="text-left pl-2 py-2">Materi</th>
              <th className="text-left pl-2 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-blue-50">
              <td className="pl-2">Peradilan Umum</td>
              <td className="pl-2">Selesai</td>
            </tr>
            <tr>
              <td className="pl-2">Peradilan Agama</td>
              <td className="pl-2">Selesai</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="pl-2">Peradilan TUN</td>
              <td className="pl-2">Selesai</td>
            </tr>
            <tr>
              <td className="pl-2">Peradilan Militer</td>
              <td className="pl-2">Selesai</td>
            </tr>
            <tr className="bg-blue-50">
              <td className="pl-2">Peradilan Khusus</td>
              <td className="pl-2">Selesai</td>
            </tr>
            <tr>
              <td className="pl-2">UAS</td>
              <td className="pl-2">85</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="text-sm text-black ml-8">
        <p>Yang diselenggarakan oleh Falkutas Hukum Universitas X yang bekerja</p>
        <p>sama dengan ADR Law Firm dan Pusat Studi Hukum dan Pembangunan</p>
      </div>

      <div className="flex mt-6 ml-8">
        <div className="text-center">
          <Image
            src="/images/ttd1.png"
            alt="Signature 1"
            width={200}
            height={50}
            className="ml-8"
          />
          <p className="mt-6 text-black font-semibold">
            Prof. Dr. Romli Atmasasmita, SH., LL.M.
          </p>
          <p className="text-black">Ketua PKPA ADR</p>
        </div>
        <div className="text-center mx-20">
          <Image
            src="/images/ttd2.png"
            alt="Signature 2"
            width={200}
            height={50}
            className="ml-20"
          />
          <p className="mt-2 text-black font-semibold">Ir. Idris, S.H., M.A.</p>
          <p className="text-black">
            Dekan Fakultas Hukum Universitas Padjadjaran
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/3 h-[30px] bg-blue-800 rounded-tl-full"></div>
    </div>
  );
};
