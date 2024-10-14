import Accordion from "@/components/User/accordion";

export default function Page() {
  const firstItem = [
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Fungsi dan Peran Organisasi Advokat",
      instructor: "Prof. Dr. Romli Atmasasmita, SH., LL.M.",
      progress: 100,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Sistem Peradilan Indonesia",
      instructor: "Dr.Dodi S. Abdulkadir, B.Sc., SE., SH, MH",
      progress: 100,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Kode Etik Profesi Advokat",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
  ];
  const secondItems = [
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Hukum Acara Pidana",
      instructor: "Prof. Dr. Romli Atmasasmita, SH., LL.M.",
      progress: 100,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Hukum Acara Perdata",
      instructor: "Dr.Dodi S. Abdulkadir, B.Sc., SE., SH, MH",
      progress: 100,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Hukum Acara Peradilan Tata Usaha Negara",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Hukum Acara Peradilan Agama",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Hukum Acara Mahkama Konstitusi",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
  ];
  const thirdItems = [
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Hukum Acara Pidana",
      instructor: "Prof. Dr. Romli Atmasasmita, SH., LL.M.",
      progress: 100,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Hukum Acara Perdata",
      instructor: "Dr.Dodi S. Abdulkadir, B.Sc., SE., SH, MH",
      progress: 100,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Hukum Acara Peradilan Tata Usaha Negara",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Hukum Acara Peradilan Agama",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Hukum Acara Mahkama Konstitusi",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
  ];
  const fourthItems = [
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Hukum Acara Pidana",
      instructor: "Prof. Dr. Romli Atmasasmita, SH., LL.M.",
      progress: 100,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Hukum Acara Perdata",
      instructor: "Dr.Dodi S. Abdulkadir, B.Sc., SE., SH, MH",
      progress: 100,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Hukum Acara Peradilan Tata Usaha Negara",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522330131_sistem-peradilan-pidana-di-indonesia.jpeg",
      title: "Hukum Acara Peradilan Agama",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
    {
      image:
        "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692524093653_Penuntutan%20Peradilan%20Indo.jpg",
      title: "Hukum Acara Mahkama Konstitusi",
      instructor: "Septo Ahady SH., LL.M in Criminal Justice",
      progress: 35,
    },
  ];

  return (
    <div>
      <div className="max-w-screen mb-2">
        <div className="px-3">
          <nav className="flex flex-wrap gap-8">
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-blue-600 py-2 px-3 text-sm font-semibold text-black transition-all duration-200 ease-in-out"
            >
              {" "}
              Semua{" "}
            </a>
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-600 hover:text-black-600"
            >
              {" "}
              Dalam Progress{" "}
            </a>
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-600 hover:text-black-600"
            >
              {" "}
              Selesai{" "}
            </a>
            <a
              href="#"
              className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-600 hover:text-black-600"
            >
              {" "}
              Lulus Exam{" "}
            </a>
          </nav>
        </div>
      </div>
      <div className="p-2 text-black">
        <Accordion title="Teori Dasar" items={firstItem} />
      </div>
      <div className="p-2 text-black">
        <Accordion title="Materi Praktik Litigasi" items={secondItems} />
      </div>
      <div className="p-2 text-black">
        <Accordion title="Materi Non Litigasi" items={thirdItems} />
      </div>
      <div className="p-2 text-black">
        <Accordion title="Materi Pendukung" items={fourthItems} />
      </div>
    </div>
  );
}
