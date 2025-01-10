import dynamic from 'next/dynamic';
import { BookOpenIcon, AcademicCapIcon, BuildingOffice2Icon, WalletIcon } from '@heroicons/react/20/solid';
import { useState } from 'react';

const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const DashboardContent = () => {

    const dataUniversities = [
        {
            id: 1,
            name: "Universitas Padjajaran",
            code: "UNIV-123",
            description: "Universitas Padjajaran",
            slug: "padjajaran",
            image_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            logo_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            certificate_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            brochure_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            vision: "Menjadi lembaga",
            mission: "Menjadi lembaga",
            goal: "Menjadi lembaga",
            candidate_agreement: "oiuwoeur",
            core_pattern: "lakjsdlfjoiwuer",
            is_active: 1,
            order: 1,
        },
        {
            id: 2,
            name: "Universitas Indonesia",
            code: "UNIV-1234",
            description: "Universitas Indonesia",
            slug: "indonesia",
            image_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            logo_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            certificate_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            brochure_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            vision: "Menjadi lembaga",
            mission: "Menjadi lembaga",
            goal: "Menjadi lembaga",
            candidate_agreement: "oiuwoeur",
            core_pattern: "lakjsdlfjoiwuer",
            is_active: 2,
            order: 2,
        },
        {
            id: 3,
            name: "Universitas Pasundan",
            code: "UNIV-12345",
            description: "Universitas Pasundan",
            slug: "Pasundan",
            image_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            logo_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            certificate_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            brochure_url: "https://pkpa.s3.ap-southeast-1.amazonaws.com/1/course/1692522225272_Peran%20Organisasi%20Advokat.jpg",
            vision: "Menjadi lembaga",
            mission: "Menjadi lembaga",
            goal: "Menjadi lembaga",
            candidate_agreement: "oiuwoeur",
            core_pattern: "lakjsdlfjoiwuer",
            is_active: 3,
            order: 3,
        },
     ]

    const [selectedUniversity, setSelectedUniversity] = useState(dataUniversities[0]);

    const handleSelectChange = (event) => {
        const selectedId = parseInt(event.target.value);
        const selectedUni = dataUniversities.find(uni => uni.id === selectedId);
        setSelectedUniversity(selectedUni);
    };
    

    const lineChartOptions = {
        chart: { id: 'line-chart' },
        xaxis: { categories: ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'] },
        colors: ['#FF5733', '#33B2FF'],
        
    };
    const lineChartData = [
        { name: 'Today', data: [30, 40, 35, 50, 49, 60, 70] },
        { name: 'Yesterday', data: [20, 30, 25, 40, 39, 50, 60] },
    ];

    const pieChartOptions = {
        labels: ['Tuntas', 'Belum Tuntas', 'Belum Mulai'],
        colors: ['#3B68FF', '#FF9800', '#F44336'],
    };
    const pieChartData = [61.7, 30.1, 8.2];



    return (
        <main className="flex-1 p-4 md:p-6 bg-gray-100 pl-16 lg:pl-18">
            <div className="flex flex-col bg-white shadow-md rounded-md">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    <div className='border-b-2 px-5 py-8 col-span-2 lg:col-span-4  flex justify-between items-center'>
                        <h1 className="text-2xl font-bold text-black">Ringkasan Kelas Materi</h1>
                        <select className="w-[300px] border border-gray-300 rounded p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300">
                            {dataUniversities.map((university) => (
                                <option key={university.id} value={university.id}>
                                    {university.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='border-r-2 sm:border-b-2 px-8 py-10'>
                        <div className='flex'>
                            <BookOpenIcon className='size-6 text-orange-400'/>
                            <h2 className="text-lg text-black pb-3 px-2">Total Mahasiswa</h2>
                        </div>
                        <p className="text-4xl font-bold text-orange-400 pb-2">124</p>
                        <p className="text-sm text-gray-400">+ 2 Mahasiswa Baru</p>
                    </div>
                    <div className='border-r-2 sm:border-b-2 px-8 py-10'>
                        <div className='flex'>
                            <WalletIcon className='size-6 text-orange-400'/>
                            <h2 className="text-lg text-black pb-3 px-2">Total Payment</h2>
                        </div>
                        <p className="text-4xl font-bold text-orange-400 pb-2">124</p>
                    </div>
                    <div className='border-r-2 px-8 py-10'>
                        <div className='flex'>
                            <BuildingOffice2Icon className='size-6 text-orange-400'/>
                            <h2 className="text-lg text-black pb-3 px-2">Total Universitas</h2>
                        </div>
                        <p className="text-4xl font-bold text-orange-400 pb-2">8</p>
                    </div>
                    <div className='px-8 py-10'>
                        <div className='flex'>
                            <AcademicCapIcon className='size-6 text-orange-400'/>
                            <h2 className="text-lg text-black pb-3 px-2">Total Mahasiswa Lulus</h2>
                        </div>
                        <p className="text-4xl font-bold text-orange-400 pb-2">1072</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white shadow rounded-md">
                    <h2 className="text-2xl font-extrabold mb-4 text-black pb-5 ml-5">Statistik Pengguna</h2>
                    <ApexChart
                        className="text-black"
                        options={lineChartOptions}
                        series={lineChartData}
                        type="line"
                        height={300}
                    />
                </div>

                <div className="p-4 bg-white shadow rounded-md">
                    <h2 className="text-2xl font-extrabold mb-4 text-black pb-5 ml-5">Status Aktivitas Mahasiswa</h2>
                        <select className="w-[300px] border border-gray-300 rounded p-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300 ml-5 mb-10">
                            {dataUniversities.map((university) => (
                                <option key={university.id} value={university.id}>
                                    {university.name}
                                </option>
                            ))}
                        </select>
                    <ApexChart
                        options={pieChartOptions}
                        series={pieChartData}
                        type="donut"
                        height={300}
                    />
                </div>
            </div>
        </main>
    );
};

export default DashboardContent;
