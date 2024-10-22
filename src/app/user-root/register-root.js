import React from "react";
import { Routes, Route } from "react-router-dom"; // Hapus BrowserRouter

import InformasiUmum from "@/components/User/register/informasiUmum";
import DataPribadi from "@/components/User/register/DataPribadi";
// import InformasiUniversitas from "@/components/User/register/InformasiUniversitas"; // Pastikan menambahkan halaman ini
// import UnggahDokumen from "@/components/User/register/UnggahDokumen"; // Pastikan menambahkan halaman ini

function RegisterRoot() {
    return (
        <Routes>
            <Route path="/informasi-umum" element={<InformasiUmum />} />
            <Route path="/data-pribadi" element={<DataPribadi />} />
            {/* <Route path="/informasi-universitas" element={<InformasiUniversitas />} />
            <Route path="/unggah-dokumen" element={<UnggahDokumen />} /> */}
        </Routes>
    );
}

export default RegisterRoot;
