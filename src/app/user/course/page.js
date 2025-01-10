import Accordion from "@/components/User/accordion";
import Sidebar from "@/components/User/Sidebar";

export default function Page() {
  const dataCourseByCategories = [
    {
      id: 1,
      uuid: "1234-0987-87239-891723",
      name: "Materi Dasar Umum",
      description: "Materi Dasar Umum",
      is_active: 1,
      order: 1,
      modules: [
        {
          accessed: true,
          user_progress: 100,
          name: "Peran dan Fungsi Organisasi Advokat",
          description: "Peran dan Fungsi Organisasi Advokat",
          author_id: 1,
          author: {
            id: 1,
            name: "Dr. Teguh Samudera, S.H., M.H.",
            description: "Dr. Teguh Samudera, S.H., M.H.",
            position: "Dekan",
            is_active: 1,
          },
          background_image:
            "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
          is_publish: 1,
          is_forum: 1,
          university_id: 1,
          university: {
            id: 1,
            name: "Universitas Padjajaran",
            description: "Universitas Padjajaran",
            image_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            logo_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            certificate_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            vision: "Menjadi lembaga",
            mission: "Menjadi lembaga",
            goal: "Menjadi lembaga",
            is_active: 1,
            order: 1,
          },
        },
        {
          accessed: true,
          user_progress: 100,
          name: "Peran dan Fungsi Organisasi Advokat",
          description: "Peran dan Fungsi Organisasi Advokat",
          author_id: 1,
          author: {
            id: 1,
            name: "Dr. Teguh Samudera, S.H., M.H.",
            description: "Dr. Teguh Samudera, S.H., M.H.",
            position: "Dekan",
            is_active: 1,
          },
          background_image:
            "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
          is_publish: 1,
          is_forum: 1,
          university_id: 1,
          university: {
            id: 1,
            name: "Universitas Padjajaran",
            description: "Universitas Padjajaran",
            image_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            logo_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            certificate_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            vision: "Menjadi lembaga",
            mission: "Menjadi lembaga",
            goal: "Menjadi lembaga",
            is_active: 1,
            order: 1,
          },
        },
      ],
    },
    {
      id: 1,
      uuid: "1234-0987-87239-891723",
      name: "Materi Dasar Umum",
      description: "Materi Dasar Umum",
      is_active: 1,
      order: 1,
      modules: [
        {
          accessed: false,
          user_progress: 100,
          name: "Peran dan Fungsi Organisasi Advokat",
          description: "Peran dan Fungsi Organisasi Advokat",
          author_id: 1,
          author: {
            id: 1,
            name: "Dr. Teguh Samudera, S.H., M.H.",
            description: "Dr. Teguh Samudera, S.H., M.H.",
            position: "Dekan",
            is_active: 1,
          },
          background_image:
            "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
          is_publish: 1,
          is_forum: 1,
          university_id: 1,
          university: {
            id: 1,
            name: "Universitas Padjajaran",
            description: "Universitas Padjajaran",
            image_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            logo_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            certificate_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            vision: "Menjadi lembaga",
            mission: "Menjadi lembaga",
            goal: "Menjadi lembaga",
            is_active: 1,
            order: 1,
          },
        },
        {
          accessed: false,
          user_progress: 100,
          name: "Peran dan Fungsi Organisasi Advokat",
          description: "Peran dan Fungsi Organisasi Advokat",
          author_id: 1,
          author: {
            id: 1,
            name: "Dr. Teguh Samudera, S.H., M.H.",
            description: "Dr. Teguh Samudera, S.H., M.H.",
            position: "Dekan",
            is_active: 1,
          },
          background_image:
            "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
          is_publish: 1,
          is_forum: 1,
          university_id: 1,
          university: {
            id: 1,
            name: "Universitas Padjajaran",
            description: "Universitas Padjajaran",
            image_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            logo_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            certificate_url:
              "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            vision: "Menjadi lembaga",
            mission: "Menjadi lembaga",
            goal: "Menjadi lembaga",
            is_active: 1,
            order: 1,
          },
        },
      ],
    },
  ];

  return (
    <div className="flex min-h-screen mt-12 mx-32">
      <Sidebar />
      <div className="flex-1 px-3">
        <nav className="flex flex-wrap gap-8">
          <a
            href="#"
            className="inline-flex whitespace-nowrap border-b-2 border-transparent border-b-blue-600 py-2 px-3 text-sm font-semibold text-black transition-all duration-200 ease-in-out"
          >
            Semua
          </a>
          <a
            href="#"
            className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-600 hover:text-black"
          >
            Dalam Progress
          </a>
          <a
            href="#"
            className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-600 hover:text-black"
          >
            Selesai
          </a>
          <a
            href="#"
            className="inline-flex whitespace-nowrap border-b-2 border-transparent py-2 px-3 text-sm font-medium text-gray-600 transition-all duration-200 ease-in-out hover:border-b-blue-600 hover:text-black"
          >
            Lulus Exam
          </a>
        </nav>
        <div className="text-black mt-4">
          {dataCourseByCategories.map((course, index) => (
            <Accordion key={index} title={course.name} courses={course} />
          ))}
        </div>
      </div>
    </div>
  );
}
