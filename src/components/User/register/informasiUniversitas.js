'use client'
import React, {useState} from "react";
import RegisterButtonNext from "./RegisterButtonNext";
import RegisterButtonBack from "./RegisterButtonBack";
import { useFormik } from "formik";
import * as yup from 'yup';

export default function InformasiUniversitas(){
    const formik = useFormik({
        initialValues: {
            namaUniversitas: "",
            akreditasiFalkutas: "",
            ipk: "",
        },
        validationSchema: yup.object({
            namaUniversitas: yup.string().required("Nama universitas harus diisi"),
            akreditasiFalkutas: yup.string().required("Akreditasi Fakultas harus diisi"),
            ipk: yup.string().required("IPK harus diisi"),
        }),
        onSubmit: (values) => {
            console.log("Form submitted:", values);
        },
    })

    return(
        <div className="mx-4 md:mx-20 lg:mx-40 xl:mx-60 my-10 py-10 px-5 md:px-10 lg:px-20 bg-white shadow-md rounded-lg">
            {/* Breadcrumb */}

            <div className="text-sm font-medium text-gray-500 mb-5">
                <div className="flex border-b-2 mb-5">
                    <div>1. Informasi Umum</div>
                    <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg'></img></div>
                    <div>2. Data Pribadi</div>
                    <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg'></img></div>
                    <div className="border-b-4 border-orange-300 pb-5">3. Informasi Universitas</div>
                    <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg'></img></div>
                    <div>4. Unggah Dokumen</div>
                </div>
            </div>

            <h2 className="text-2xl mb-5 mt-8 font-medium">Informasi Universitas</h2>

            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 pr-40 ">
                <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
                    <label className="text-left pr-4 py-3">Nama Universitas:</label>
                    <input
                    className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
                    type="text"
                    name="namaUniversitas"
                    value={formik.values.namaUniversitas}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Masukkan Nama Universitas"
                    />
                    {formik.touched.namaUniversitas && formik.errors.namaUniversitas ? (
                        <p className="text-red-500 text-sm col-start-2 mt-1">
                            {formik.errors.namaUniversitas}
                        </p>
                    ) : null}
                </div>
                
                <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
                    <label className="text-left pr-4 py-3">Akreditasi Fakultas</label>
                    <input
                    className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
                    type="text"
                    name="akreditasiFalkutas"
                    value={formik.values.akreditasiFalkutas}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Masukkan Akreditasi Falkutas"
                    />
                    {formik.touched.akreditasiFalkutas && formik.errors.akreditasiFalkutas ? (
                        <p className="text-red-500 text-sm col-start-2 mt-1">
                            {formik.errors.akreditasiFalkutas}
                        </p>
                    ) : null}
                </div>

                <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
                    <label className="text-left pr-4 py-3">IPK:</label>
                    <input
                    className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
                    type="string"
                    name="ipk"
                    value={formik.values.ipk}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Masukkan IPK"
                    />
                    {formik.touched.ipk && formik.errors.ipk ? (
                        <p className="text-red-500 text-sm col-start-2 mt-1">
                            {formik.errors.ipk}
                        </p>
                    ) : null}
                </div>

            </form>
            <div className="border-t-2 py-8 flex justify-between mt-8">
                <RegisterButtonBack prevPage="PersonalData" />
                <RegisterButtonNext handleSubmit={formik.handleSubmit} nextPage="DocumentUpload" formik={formik}/>
            </div>
        </div>
    )
}