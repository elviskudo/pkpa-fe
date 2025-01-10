import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid';
import FormTambahUniversity from './FormTambahUniversity';
import EditUniversity from './EditUniversity';
import TenagaPengajar from './TenagaPengajar';
import SertifikatPKPA from './Sertifikat';


export default function LamanUniversity() {
    const [showForm, setShowForm] = useState(false);
    const [selectedUniversity, setSelectedUniversity] = useState(null);
    const [currentStep, setCurrentStep] = useState('lamanUniversity');
    const handleBackToLamanUniversity = () => {
        setCurrentStep('lamanUniversity');
    };
    const navigateToSertifikatPKPA = () => {
        setCurrentStep('sertifikatPKPA');
    };
    

    const universities = [
        { university_id: 1, name: 'Universitas Indonesia', logo: '/images/univ/ui-logo.png' },
        { university_id: 2, name: 'Universitas Pasundan', logo: '/images/univ/unpas-logo.png' },
        { university_id: 3, name: 'Universitas Trisakti', logo: '/images/univ/trisakti-logo.png' },
        { university_id: 4, name: 'Universitas Padjadjaran', logo: '/images/univ/unpad-logo.png' },
        { university_id: 5, name: 'Universitas Muhammadiyah Yogyakarta', logo: '/images/univ/umy-logo.png' },
        { university_id: 6, name: 'Universitas Brawijaya', logo: '/images/univ/ub-logo.png' },
        { university_id: 7, name: 'Universitas Gadjah Mada', logo: '/images/univ/ugm-logo.png' },
        { university_id: 8, name: 'Universitas Gunadarma', logo: '/images/univ/gunadarma-logo.png' },
    ];


    const handleUniversityClick = (univ) => {
        setSelectedUniversity(univ); 
        console.log("Selected University after setting state:", univ);
    };

    const handleCloseEdit = () => {
        setSelectedUniversity(null); // Tutup komponen EditUniversity
    };


    return (
        <div className="flex-1 p-4 md:p-6 bg-gray-100 pl-16 lg:pl-18 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-black">Pengaturan Laman Universitas</h1>
        
        {showForm ? (
                <FormTambahUniversity onClose={() => setShowForm(false)} />
            ) : selectedUniversity ? (

                <EditUniversity university={selectedUniversity} onClose={handleCloseEdit}>
                    <TenagaPengajar selectedUniversity={selectedUniversity} /> {/* Panggil TenagaPengajar di sini */}
                </EditUniversity>
            ) : (
                <div className="grid grid-cols-4 gap-6">
                    {universities.map((univ, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-lg p-8 flex flex-col items-center cursor-pointer"
                            onClick={() => handleUniversityClick(univ)}
                        >
                            <img src={univ.logo} alt={univ.name} className="h-28 mb-2" />
                            <p className="text-center font-semibold text-black">{univ.name}</p>
                        </div>
                    ))}
                    <button
                        onClick={() => setShowForm(true)}
                        className="bg-orange-100 rounded-lg shadow-lg p-8 flex flex-col items-center justify-center"
                    >
                        <PlusIcon className="size-16 text-white bg-orange-300 rounded-full" />
                        <p className="mt-4 text-gray-400">Tambah Universitas</p>
                    </button>
                </div>
            )}

            {currentStep === 'sertifikatPKPA' && (
                <SertifikatPKPA onNavigateBackToUniversity={handleBackToLamanUniversity} />
            )}
            
        </div>
    );
}