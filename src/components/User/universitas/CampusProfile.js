import Image from 'next/image';

const CampusProfile = () => {
    return (
        <div className="flex bg-white w-full h-[500px]"> {/* Fixed height */}
            {/* Left side: Logo and Text */}
            <div className="w-1/2 flex flex-col items-start justify-center p-8">
                <div className="flex items-center ml-12 mb-8">
                    <Image
                        src="/images/univ/unpad-logo.png" // Replace with the actual logo path
                        alt="Universitas Padjadjaran Logo"
                        width={80}
                        height={80}
                    />
                </div>
                <h1 className="text-2xl font-semibold text-black mt-4 ml-12">
                    <span>PKPA Universitas</span>
                    <br />
                    <span>Padjadjaran</span>
                </h1>
                <button className="ml-12 mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded">
                    Daftar
                </button>
            </div>

            {/* Right side: Campus Image */}
            <div className="w-1/2 relative">
                <Image
                    src="/images/univ/kampus-unpad.jpg" // Replace with the actual campus image path
                    alt="Universitas Padjadjaran Campus"
                    layout="fill"
                    objectFit="cover" // Ensures the image covers the entire right half
                />
            </div>
        </div>
    );
};

export default CampusProfile;
