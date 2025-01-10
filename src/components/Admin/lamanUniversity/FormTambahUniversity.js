'use client'
import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import Editor from './Editor.js'; 
import 'quill/dist/quill.snow.css';
import { ArrowUpTrayIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { useDropzone } from 'react-dropzone';
import Swal from 'sweetalert2';

const validationSchema = Yup.object({
  namaUniversitas: Yup.string().required('Nama Universitas diperlukan'),
  kodeUniversitas: Yup.string().required('Kode Universitas diperlukan'),
  deskripsi: Yup.string().required('Deskripsi Universitas diperlukan'),
  persyaratanCalon: Yup.string().required('Persyaratan Calon PKPA diperlukan'),
  polaIlmiah: Yup.string().required('Pola Ilmiah Pokok diperlukan'),
  logo: Yup.mixed()
    .required('Logo Universitas diperlukan')
    .test('fileType', 'Hanya gambar dengan format .png, .jpg, atau .jpeg yang diperbolehkan', (value) => {
      return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
    }),
  brosur: Yup.mixed()
    .required('Brosur diperlukan')
    .test('fileType', 'Hanya file PDF yang diperbolehkan', (value) => {
      return value && value.type === 'application/pdf';
    }),
});

const FormTambahUniversity = ({ onClose }) => {
  const deskripsiRef = useRef();
  const persyaratanRef = useRef();
  const polaIlmiahRef = useRef();
  const [currentStep, setCurrentStep] = useState('tambahUniversitas');

  const formik = useFormik({
    initialValues: {
      namaUniversitas: '',
      kodeUniversitas: '',
      deskripsi: '',
      persyaratanCalon: '',
      polaIlmiah: '',
      logo: null,
      brosur: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      Swal.fire({
        title: 'Apakah Anda ingin menyimpan data?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Iya',
        cancelButtonText: 'Batal',
      }).then( async (result) => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append('namaUniversitas', values.namaUniversitas);
          formData.append('kodeUniversitas', values.kodeUniversitas);
          formData.append('deskripsi', values.deskripsi);
          formData.append('persyaratanCalon', values.persyaratanCalon);
          formData.append('polaIlmiah', values.polaIlmiah);
          if (values.logo) formData.append('logo', values.logo);
          if (values.brosur) formData.append('brosur', values.brosur);

          try {
            const response = await axios.post(
              'http://localhost:8000/api/admin/universities/create', 
              formData,
              {
                headers: {
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            console.log('Response:', response.data);
            Swal.fire('Berhasil!', 'Data berhasil disimpan', 'success').then(() => {
              onClose();
            });
          } catch (error) {
            if (error.response) {
              console.error('Server Response:', error.response.data);
              Swal.fire('Gagal!', error.response.data.message || 'Terjadi kesalahan pada server', 'error');
            } else {
              console.error('Error:', error);
              Swal.fire('Gagal!', 'Terjadi kesalahan koneksi', 'error');
            }
          }
        }
      });
    },
  });

  const { getRootProps: getLogoRootProps, getInputProps: getLogoInputProps } = useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': [],
      'image/jpg': [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      formik.setFieldValue('logo', acceptedFiles[0]); 
    },
    onDropRejected: () => {
      formik.setFieldError('logo', 'Hanya gambar dengan format .png, .jpg, atau .jpeg yang diperbolehkan');
      formik.setFieldValue('logo', null); 
    },
  });


  const removeLogo = () => {
    formik.setFieldValue('logo', null);
  };

  const { getRootProps: getBrosurRootProps, getInputProps: getBrosurInputProps } = useDropzone({
    accept: 'application/pdf',
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      formik.setFieldValue('brosur', acceptedFiles[0]); 
    },
    onDropRejected: () => {
      formik.setFieldError('brosur', 'Hanya file PDF yang diperbolehkan');
      formik.setFieldValue('brosur', null); 
    },
  });

  const removeBrosur = () => {
    formik.setFieldValue('brosur', null);
  };


  return (
    
    <div className="bg-white shadow-md rounded text-black">
        <h2 className="text-2xl py-8 px-5 font-extrabold">Tambah Universitas</h2>
        <div className="text-sm font-medium text-gray-500 mb-5">
          <div className="flex border-b-2 mb-5">
            <div className="pb-5 px-5 mx-5 border-b-4 border-orange-300 text-orange-300">Identitas Universitas</div>
          </div>
        </div>

        

        <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-y-5 pr-40 px-8">
          <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
            <label className="text-left pr-4 py-3">Nama Universitas:</label>
            <input
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
              type="text"
              name="namaUniversitas"
              value={formik.values.namaUniversitas}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Masukkan Nama Universitas"
            />
            {formik.touched.namaUniversitas && formik.errors.namaUniversitas ? (
              <p className="text-red-500 text-sm col-start-2 mt-1">{formik.errors.namaUniversitas}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-subgrid gap-y-2 col-span-2 pb-10">
          <label>Logo Universitas:</label>
            <div {...getLogoRootProps()} className="border border-dashed p-6 text-center cursor-pointer flex flex-col justify-center items-center h-[150px]">
              <input {...getLogoInputProps()} />
              {formik.values.logo ? (
                <div className="flex items-center justify-center">
                  <p>{formik.values.logo.name}</p>
                  <XCircleIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={removeLogo} />
                </div>
              ) : (
                <div className='flex flex-col justify-center items-center'>
                  <ArrowUpTrayIcon className='size-6'/>
                  <p className='font-extrabold'>Tarik file kesini untuk upload</p>
                  <p className='text-gray-400 font-light'>file berekstensi JPG/png</p>
                </div>
              )}
            </div>
            {formik.errors.logo && <p className="text-red-500 col-start-2">{formik.errors.logo}</p>}
          </div>

          <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
            <label className="text-left pr-4 py-3">Kode Universitas:</label>
            <input
              className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
              type="text"
              name="kodeUniversitas"
              value={formik.values.kodeUniversitas}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Masukkan Kode Universitas"
            />
            {formik.touched.kodeUniversitas && formik.errors.kodeUniversitas ? (
              <p className="text-red-500 text-sm col-start-2 mt-1">{formik.errors.kodeUniversitas}</p>
            ) : null}
          </div>

          <div className='grid grid-cols-subgrid gap-y-2 col-span-2 pb-10'>
            <label className="text-left pr-4 py-3">Deskripsi Universitas:</label>
            <Editor
              ref={deskripsiRef}
              onTextChange={(value) => formik.setFieldValue('deskripsi', value)}
            />
            {formik.touched.deskripsi && formik.errors.deskripsi ? (
              <p className="text-red-500 text-sm col-start-2 mt-1">{formik.errors.deskripsi}</p>
            ) : null}
          </div>

          <div className='grid grid-cols-subgrid gap-y-2 col-span-2 pb-10'>
            <label className="text-left pr-4 py-3">Persyaratan Calon PKPA:</label>
            <Editor
              ref={persyaratanRef}
              onTextChange={(value) => formik.setFieldValue('persyaratanCalon', value)}
            />
            {formik.touched.persyaratanCalon && formik.errors.persyaratanCalon ? (
              <p className="text-red-500 text-sm col-start-2 mt-1">{formik.errors.persyaratanCalon}</p>
            ) : null}
          </div>

          <div className='grid grid-cols-subgrid gap-y-2 col-span-2 pb-10'>
            <label className="text-left pr-4 py-3">Pola Ilmiah Pokok:</label>
            <Editor
              ref={polaIlmiahRef}
              onTextChange={(value) => formik.setFieldValue('polaIlmiah', value)}
            />
            {formik.touched.polaIlmiah && formik.errors.polaIlmiah ? (
              <p className="text-red-500 text-sm col-start-2 mt-1">{formik.errors.polaIlmiah}</p>
            ) : null}
          </div>

          <div className="grid grid-cols-subgrid gap-y-2 col-span-2 pb-10">
          <label>Upload Brosur:</label>
            <div {...getBrosurRootProps()} className="border border-dashed p-6 text-center cursor-pointer flex flex-col justify-center items-center h-[150px]">
              <input {...getBrosurInputProps()} />
              {formik.values.brosur ? (
                <div className="flex items-center justify-center">
                  <p>{formik.values.brosur.name}</p>
                  <XCircleIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={removeBrosur} />
                </div>
              ) : (
                <div className='flex flex-col justify-center items-center'>
                  <ArrowUpTrayIcon className='size-6'/>
                  <p className='font-extrabold'>Tarik file kesini untuk upload</p>
                  <p className='text-gray-400 font-light'>file berekstensi .pdf</p>
                </div>
              )}
            </div>
            {formik.errors.brosur && <p className="text-red-500 col-start-2">{formik.errors.brosur}</p>}
          </div>
          <div className="flex space-x-4 pb-10">
            <button type="submit" className="px-4 py-2 bg-orange-400 text-white rounded">Simpan</button>
          </div>
        </form>
    </div>
  );
};

export default FormTambahUniversity;
