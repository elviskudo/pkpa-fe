import React from 'react';

const Tabs = ({ currentStep, handleStepChange }) => {
    return (
        <div className="flex border-b-2 mb-5">
            <div
                className={`pb-5 px-5 mx-5 cursor-pointer ${currentStep === 'tambahUniversitas' ? 'border-b-4 border-orange-300 text-orange-300' : ''}`}
                onClick={() => handleStepChange('tambahUniversitas')}
            >
                Identitas Universitas
            </div>
            <div
                className={`pb-5 px-5 mx-5 cursor-pointer ${currentStep === 'tenagaPengajar' ? 'border-b-4 border-orange-300 text-orange-300' : ''}`}
                onClick={() => handleStepChange('tenagaPengajar')}
            >
                Tenaga Pengajar
            </div>
            <div
                className={`pb-5 px-5 mx-5 cursor-pointer ${currentStep === 'sertifikatPKPA' ? 'border-b-4 border-orange-300 text-orange-300' : ''}`}
                onClick={() => handleStepChange('sertifikatPKPA')}
            >
                Sertifikat PKPA
            </div>
        </div>
    );
};

export default Tabs;
