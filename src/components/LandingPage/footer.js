"use client";
import Image from 'next/image';

export default function Footer() {
    return (
        <footer className="py-7 border-2 shadow">
            <div className="max-w-full mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Logo dan Keterangan */}
                    <div className="flex flex-col items-start mr-auto">
                        <p className="mt-2 ml-4 text-gray-600">Powered by:</p>
                        <Image
                            src="/images/logo-atmasasmita.png"
                            alt="Atmasasmita Logo"
                            width={150}
                            height={50}
                        />
                    </div>

                    {/* Navigasi */}
                    <div className="ml-auto"> {/* Tambahkan ml-auto */}
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">PKPA ADR</h4>
                        <ul className="space-y-2">
                            <li>
                                <a href="/" className="text-gray-600 hover:text-gray-900">Tentang Kami</a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-gray-900">Kebijakan Privasi</a>
                            </li>
                            <li>
                                <a href="/" className="text-gray-600 hover:text-gray-900">FAQ</a>
                            </li>
                        </ul>
                    </div>

                    {/* Hubungi Kami */}
                    <div className="ml-auto"> {/* Tambahkan ml-auto */}
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Hubungi Kami</h4>
                        <ul className="space-y-2">
                            <li className="text-gray-600">info@adracademy.com</li>
                            <li className="text-gray-600">(021) 882-587-3025</li>
                            <li className="text-gray-600">
                                Grand Wijaya Center, Blok B 8 - 9<br />
                                Jl.Wijaya II, Pulo, Kebayoran Baru<br />
                                Jakarta Selatan 12160
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <hr className="my-8 border-gray-300 w-full" />
            <div className="flex flex-col md:flex-row justify-between text-gray-600 text-sm max-w-full mx-auto px-8">
                <a href="/" className="hover:text-gray-900 mt-2 md:mt-0">Terms and conditions</a>
                <p>&copy; 2021 - Inkoritech | All rights reserved</p>
            </div>
        </footer>
    );
}
