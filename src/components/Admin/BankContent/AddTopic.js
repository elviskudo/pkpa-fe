// src/components/Admin/BankContent/AddTopic.js
import React, { useState } from "react";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const AddTopic = ({ onBack }) => {
    const [topicTitle, setTopicTitle] = useState("");
    const [order, setOrder] = useState(1);

    return (
        <div>
            <div className="flex items-center mb-4">
                <button onClick={onBack} className="text-orange-500 flex items-center">
                    <ArrowBackIosIcon fontSize="small" className="mr-1" />
                    Kembali ke Manajemen Konten
                </button>
            </div>
            <div className="bg-white p-6 rounded-md shadow-md">
                <h2 className="text-xl font-semibold mb-4">Tambah Topik</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2">Judul Topik</label>
                    <input
                        type="text"
                        value={topicTitle}
                        onChange={(e) => setTopicTitle(e.target.value)}
                        placeholder="Harus berupa huruf, angka, spasi, simbol ampersand (&), titik (.) dan strip (-)"
                        maxLength={150}
                        className="border rounded-md px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-gray-300"
                    />
                    <p className="text-gray-400 text-sm mt-1">0 / 150</p>
                </div>
                <div className="flex items-center mb-4">
                    <label className="block text-gray-700 font-bold mb-2 mr-4">Urutan</label>
                    <select
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        className="border rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        {/* Add more options as needed */}
                    </select>
                </div>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md">Simpan</button>
            </div>
        </div>
    );
};

export default AddTopic;
