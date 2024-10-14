'use client'
import React, { useState } from 'react';
import RegisterButtonNext from './RegisterButtonNext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import Link from "next/link" 

function InformasiUmum() {
  
  const formik = useFormik({
    initialValues: {
      namaLengkap: '',
      email: '',
      nomorTelepon: '',
      nomorWhatsapp: '',
      sameAsPhone: false,
      kataSandi: '',
      konfirmasiKataSandi: '',
    },
    validationSchema: Yup.object({
      namaLengkap: Yup.string().required('Nama harus di isi'),
      email: Yup.string()
        .email('Email harus valid')
        .required('Email harus diisi'),
      nomorTelepon: Yup.number().required('Nomor telepon harus diisi'),
      kataSandi: Yup.string().required('Kata sandi harus diisi'),
      konfirmasiKataSandi: Yup.string()
        .oneOf([Yup.ref('kataSandi'), null], 'Kata sandi tidak sama')
        .required('Konfirmasi kata sandi harus diisi'),
    }),
    onSubmit: (values) => {
      console.log('Form submitted:', values);
    },
  });

  

  return (
    <div className=" mx-4 md:mx-20 lg:mx-40 xl:mx-60 my-10 py-10 px-5 md:px-10 lg:px-20 bg-white shadow-md rounded-lg">
      {/* Breadcrumb */}

      <div className="text-sm font-medium text-gray-500 mb-5">
        <div className="flex border-b-2 mb-5">
          <div className="border-b-4 border-orange-300 pb-5">1. Informasi Umum</div>
          <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg'></img></div>
          <div>2. Data Pribadi</div>
          <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg'></img></div>
          <div>3. Informasi Universitas</div>
          <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg'></img></div>
          <div>4. Unggah Dokumen</div>
        </div>
      </div>

      <div className='flex'>
      <img src='/icons/chevron-left.svg'></img>
      <Link href="" className='text-orange-300'>kembali ke homepage</Link>
      </div>
      
  
      <h2 className="text-2xl mb-5 mt-8 font-medium">Informasi Umum</h2>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 pr-40 ">
        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
          <label className="text-left pr-4 py-3">Nama Lengkap:</label>
          <input
            className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
            type="text"
            name="namaLengkap"
            value={formik.values.namaLengkap}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Masukkan Nama Lengkap"
          />
          <div className="-mt-4">
            <p className="text-sm text-gray-500">
              disertai gelar untuk sertifikasi
            </p>
          </div>
          {formik.touched.namaLengkap && formik.errors.namaLengkap ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
            {formik.errors.namaLengkap}
          </p>
          ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
        <label className="text-left pr-4 py-3">Email:</label>
        <input
          className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
          type="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Masukkan Email"
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-sm col-start-2 mt-1">
          {formik.errors.email}
        </p>
        ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
        <label className="text-left pr-4 py-3">Nomor Telepon:</label>
        <input
          className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
          type="number"
          name="nomorTelepon"
          value={formik.values.nomorTelepon}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Masukkan Nomor Telepon"
        />
        {formik.touched.nomorTelepon && formik.errors.nomorTelepon ? (
          <p className="text-red-500 text-sm col-start-2 mt-1">
          {formik.errors.nomorTelepon}
        </p>
        ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
        <label className="text-left pr-4">Nomor Whatsapp:</label>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="sameAsPhone"
            checked={formik.values.sameAsPhone}
            onChange={() => {
              formik.setFieldValue('sameAsPhone', !formik.values.sameAsPhone);
              formik.setFieldValue('nomorWhatsapp', formik.values.sameAsPhone ? '' : formik.values.nomorTelepon);
            }}
          />
          <span className="text-sm">Sama dengan nomor telepon</span>
        </div>

        <label className="text-left pr-4"></label>
        <input
          className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
          type="number"
          name="nomorWhatsapp"
          value={formik.values.nomorWhatsapp}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Masukkan Nomor Whatsapp"
          disabled={formik.values.sameAsPhone}
        />
        {formik.touched.nomorWhatsapp && formik.errors.nomorWhatsapp ? (
          <p className="text-red-500 text-sm col-start-2 mt-1">
          {formik.errors.nomorWhatsapp}
        </p>
        ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
        <label className="text-left pr-4 py-3">Kata Sandi:</label>
        <input
          className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
          type="password"
          name="kataSandi"
          value={formik.values.kataSandi}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Masukkan Kata Sandi"
        />
        {formik.touched.kataSandi && formik.errors.kataSandi ? (
          <p className="text-red-500 text-sm col-start-2 mt-1">
          {formik.errors.kataSandi}
        </p>
        ) : null}
        </div>
        
        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
        <label className="text-left pr-4 py-3">Konfirmasi Kata Sandi:</label>
        <input
          className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
          type="password"
          name="konfirmasiKataSandi"
          value={formik.values.konfirmasiKataSandi}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Konfirmasi Kata Sandi"
        />
        {formik.touched.konfirmasiKataSandi && formik.errors.konfirmasiKataSandi ? (
          <p className="text-red-500 text-sm col-start-2 mt-1">
          {formik.errors.konfirmasiKataSandi}
        </p>
        ) : null}
        </div>
      </form>
      <div className='border-t-2 mt-8 py-8 flex justify-end'>
        <RegisterButtonNext handleSubmit={formik.handleSubmit} nextPage="data-pribadi" formik={formik}/>
      </div>
    </div>
  );
}

export default InformasiUmum;
