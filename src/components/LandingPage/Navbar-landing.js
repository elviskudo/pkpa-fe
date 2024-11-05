// components/LandingPage/Navbar-landing.js
import Link from 'next/link';
import Image from 'next/image';

const NavbarLanding = () => {
  return (
    <nav className="sticky top-0 flex justify-between items-center px-8 py-4 bg-white z-50 shadow-md">
      <div className="flex items-center space-x-4">
        <Link href="#carousel" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="PKPA Logo"
            width={100}
            height={50}
          />
        </Link>
        <span>|</span>
        <Link href="#carousel" className="flex items-center">
          <Image
            src="/images/logo-atmasasmita.png"
            alt="ADR Law Firm Logo"
            width={100}
            height={50}
          />
        </Link>
      </div>
      <ul className="scroll-mt-24 flex space-x-6">
        <li>
          <Link href="#university" className="text-gray-600 hover:text-gray-900">
            Universitas
          </Link>
        </li>
        <li>
          <Link href="#about" className="text-gray-600 hover:text-gray-900">
            Tentang Kami
          </Link>
        </li>
        <li>
          <Link href="#keunggulan" className="text-gray-600 hover:text-gray-900">
            Keunggulan
          </Link>
        </li>
        <li>
          <Link href="#alur-daftar" className="text-gray-600 hover:text-gray-900">
            Alur Daftar
          </Link>
        </li>
        <li>
          <Link href="#kurikulum" className="text-gray-600 hover:text-gray-900">
            Kurikulum
          </Link>
        </li>
        <li>
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Masuk
          </Link>
        </li>
        <li>
          <Link href="/" className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-100">
            Daftar
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavbarLanding;
