'use client'

import { InformationCircleIcon } from '@heroicons/react/20/solid';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DropzoneWithoutDrag from './DropzoneWithoutDrag';
import RegisterButtonBack from './RegisterButtonBack';
import RegisterButtonSave from './RegisterButtonSave';

const validationSchema = Yup.object({
  cv: Yup.mixed().required('Curriculum Vitae is required'),
  ktp: Yup.mixed().required('KTP is required'),
  photo: Yup.mixed().required('Foto Pendaftar is required'),
  ijazah: Yup.mixed().required('Ijazah is required'),
});

export default function UnggahDokumen() {
  const formik = useFormik({
    initialValues: {
      cv: null,
      ktp: null,
      photo: null,
      ijazah: null,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <div className="mx-4 md:mx-20 lg:mx-40 xl:mx-60 my-10 py-10 px-5 md:px-10 lg:px-20 bg-white shadow-md rounded-lg">
      {/* Breadcrumb */}
     <div className="border-b-2 mb-5">
         <div className="flex text-sm font-medium text-gray-500">
           <div>1. Informasi Umum</div>
           <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg' alt="Chevron Right" /></div>
           <div>2. Data Pribadi</div>
           <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg' alt="Chevron Right" /></div>
           <div>3. Informasi Universitas</div>
          <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg' alt="Chevron Right" /></div>
          <div className='border-b-4 border-orange-300 pb-5'>4. Unggah Dokumen</div>
         </div>
       </div>

       <h2 className="text-2xl mb-5 mt-8 font-medium">Unggah Dokumen</h2>

    <form onSubmit={formik.handleSubmit}>
      <DropzoneWithoutDrag title="Curriculum Vitae" 
        setFieldValue={formik.setFieldValue} 
        fieldName="cv" 
        errors={formik.errors} />
      <DropzoneWithoutDrag title="KTP" 
        setFieldValue={formik.setFieldValue} 
        fieldName="ktp" 
        errors={formik.errors}
        className="border-b-2" />
        
        <div className='grid gap-y-1 gap-x-2 col-span-2 border-b-2 py-8'>
          <div className="col-span-2">
            <DropzoneWithoutDrag title="Foto Pendaftar" 
            setFieldValue={formik.setFieldValue} 
            fieldName="photo" 
            errors={formik.errors} />
          </div>
          <div className="ml-20 -mr-10 mt-4 pl-10 py-1 text-sm col-start-2 text-gray-600 border inline-block rounded bg-orange-200 w-96">
            <div className='flex '>
              <InformationCircleIcon className="h-5 w-5 text-orange-400" />
              <strong className="ml-2">Mohon Perhatian:</strong>
            </div>
            <ul className="list-disc list-inside text-sm text-gray-600" >
              <li>Pas Foto ukuran 4 x 6 cm</li>
              <li>Pas Foto harus berwarna dengan latar belakang polos</li>
              <li>Ukuran minimal file pas foto adalah 80 KB</li>
              <li>Ukuran maksimal file pas foto adalah 300 KB</li>
              <li>Orientasi pas foto adalah portrait</li>
            </ul>
          </div>
      </div>
      <DropzoneWithoutDrag title="Ijazah" 
        setFieldValue={formik.setFieldValue} 
        fieldName="ijazah" 
        errors={formik.errors} />
    </form>
    <div className="flex justify-between mt-8">
          <RegisterButtonBack prevPage="informasi-universitas" />
          <RegisterButtonSave handleSubmit={formik.handleSubmit}/>
        </div>
    </div>
  );
}
