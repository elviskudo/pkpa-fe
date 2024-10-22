'use client';

import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RegisterButtonNext from './RegisterButtonNext';
import RegisterButtonBack from './RegisterButtonBack';
import Selector from './SelectorCity';
import { Datepicker } from 'flowbite-datepicker';
import { Country, State, City } from 'country-state-city';



function DataPribadi() {
  const formik = useFormik({
    initialValues: {
      tempatLahir: '',
      tglLahir: '',
      jenisKelamin: '',
      provinsi: '',
      kabKota: '',
      desaKelurahan: '',
      rt: '',
      rw: '',
      alamatLengkap: '',
      statusBekerja: '',
    },
    validationSchema: Yup.object({
      tempatLahir: Yup.string().required('Tempat lahir wajib diisi'),
      tglLahir: Yup.string().required('Tanggal lahir wajib diisi'),
      jenisKelamin: Yup.string().required('Jenis kelamin wajib dipilih'),
      provinsi: Yup.string().required('Provinsi wajib diisi'),
      kabKota: Yup.string().required('Kab/Kota wajib diisi'),
      desaKelurahan: Yup.string().required('Desa/Kelurahan wajib diisi'),
      rt: Yup.string().required('RT wajib diisi'),
      rw: Yup.string().required('RW wajib diisi'),
      alamatLengkap: Yup.string().required('Alamat lengkap wajib diisi'),
      statusBekerja: Yup.string().required('Status bekerja wajib dipilih'),
    }),
    onSubmit: (values) => {
      console.log('Form data', values);
    },
  });


let countryData = Country.getAllCountries();
const [stateData, setStateData] = useState()
const [cityData, setCityData] = useState()

const [country, setCountry] = useState();
const [state, setState] = useState();
const [city, setCity] = useState();

useEffect(() => {
  setStateData(State.getStatesOfCountry(country?.isoCode))
},[country])

useEffect(() => {
  setCityData(City.getCitiesOfCountry(country?.isoCode, state?.isoCode))
},[state])

useEffect(() => {
  stateData && setState(stateData)
}, [stateData])

useEffect(() => {
  cityData && setCity(cityData)
}, [cityData])

useEffect(() => {
  const datepicker = document.getElementById('datepicker-autohide');
  if (datepicker) {
    const dp = new Datepicker(datepicker, {
      autohide: true,
      format: 'dd/mm/yyyy',
    });

    datepicker.addEventListener('changeDate', (event) => {
      formik.setFieldValue('tglLahir', event.detail.date);
    });
  }
}, [formik]);



  return (
    <div className="mx-4 md:mx-20 lg:mx-40 xl:mx-60 my-10 py-10 px-5 md:px-10 lg:px-20 bg-white shadow-md rouded-lg">
      {/* Breadcrumb */}
      <div className="border-b-2 mb-5">
        <div className="flex text-sm font-medium text-gray-500">
          <div>1. Informasi Umum</div>
          <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg' alt="Chevron Right" /></div>
          <div className='border-b-4 border-orange-300 pb-5'>2. Data Pribadi</div>
          <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg' alt="Chevron Right" /></div>
          <div>3. Informasi Universitas</div>
          <div className="mx-4 md:mx-16"><img src='/icons/chevron-right.svg' alt="Chevron Right" /></div>
          <div>4. Unggah Dokumen</div>
        </div>
      </div>

      <h2 className="text-2xl mb-5 mt-8 font-medium">Data Pribadi</h2>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 pr-40">
        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
          <label className="text-left pr-4 py-3">Tempat Lahir:</label>
          <input
            className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
            type="text"
            name="tempatLahir"
            value={formik.values.tempatLahir}
            onChange={formik.handleChange}
            placeholder="Masukkan Tempat Lahir"
          />
          {formik.touched.tempatLahir && formik.errors.tempatLahir ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.tempatLahir}
            </p>
          ) : null}
        </div>
        
        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
        <label className="text-left pr-4 py-3">Tgl Lahir:</label>
          <div className="relative max-w-lg">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
              </svg>
            </div>
            <input
              id="datepicker-autohide"
              datepicker datepicker-autohide
              name='tglLahir'
              type="text"
              className="bg-white border border-gray-300 text-gray-900 text-sm rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300 block w-full ps-10 p-2.5"
              placeholder="Select date"
              onChange={formik.handleChange}
            />
          </div>
            {formik.touched.tglLahir && formik.errors.tglLahir ? (
          <p className="text-red-500 text-sm col-start-2 mt-1">
          {formik.errors.tglLahir}
        </p>
        ) : null}
        </div>
          
        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
          <label className="text-left pr-4 py-3">Jenis Kelamin:</label>
          <div className="flex items-center">
            <input
              type="radio"
              name="jenisKelamin"
              value="Laki-Laki"
              onChange={formik.handleChange}
              className="mr-2"
            />
            <span>Laki-Laki</span>
            <input
              type="radio"
              name="jenisKelamin"
              value="Perempuan"
              onChange={formik.handleChange}
              className="ml-4 mr-2"
            />
            <span>Perempuan</span>
          </div>
          {formik.touched.jenisKelamin && formik.errors.jenisKelamin ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.jenisKelamin}
            </p>
          ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
          <label className="text-left pr-4 py-3">Provinsi:</label>
          <div>
            <Selector 
              data={countryData} 
              selected={country} 
              setSelected={setCountry} 
              formik={formik} 
              name="provinsi"
              placeholder='Pilih Provinsi'
            />
          </div>
          {formik.touched.provinsi && formik.errors.provinsi ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.provinsi}
            </p>
          ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
          <label className="text-left pr-4 py-3">Kab/Kota:</label>
          {state &&(
            <div>
              <Selector 
                data={stateData} 
                selected={state} 
                setSelected={setState} 
                formik={formik} 
                name="kabKota"
                placeholder='Pilih Kab/Kota'
              />
            </div>
        )}
          {formik.touched.kabKota && formik.errors.kabKota ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.kabKota}
            </p>
          ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
          <label className="text-left pr-4 py-3">Desa/Kelurahan:</label>
          <div>
            {city && (
              <div>
              <Selector 
                data={cityData} 
                selected={city} 
                setSelected={setCity} 
                formik={formik} 
                name="desaKelurahan"
                placeholder='Pilih Desa/Kelurahan'
              />
            </div>
            )}
          </div>
          {formik.touched.desaKelurahan && formik.errors.desaKelurahan ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.desaKelurahan}
            </p>
          ) : null}
        </div>


        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
          <label className="text-left pr-4 py-3">RT/RW:</label>
          <div className="flex items-center">
            <input
              className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300 w-20"
              type="text"
              name="rt"
              value={formik.values.rt}
              onChange={formik.handleChange}
              placeholder="RT"
            />
            <span className="mx-2">/</span>
            <input
              className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300 w-20"
              type="text"
              name="rw"
              value={formik.values.rw}
              onChange={formik.handleChange}
              placeholder="RW"
            />
          </div>
          {formik.touched.rt && formik.errors.rt ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.rt}
            </p>
          ) : null}
          {formik.touched.rw && formik.errors.rw ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.rw}
            </p>
          ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
          <label className="text-left pr-4 py-3">Alamat Lengkap:</label>
          <input
            className="border border-gray-300 p-2 rouded focus:outline-none focus:ring-orange-300 focus:border-orange-300 focus:shadow-orange-300"
            type="text"
            name="alamatLengkap"
            value={formik.values.alamatLengkap}
            onChange={formik.handleChange}
            placeholder="Masukkan Alamat Lengkap"
          />
          {formik.touched.alamatLengkap && formik.errors.alamatLengkap ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.alamatLengkap}
            </p>
          ) : null}
        </div>

        <div className='grid grid-cols-subgrid gap-y-2 col-span-2'>
        <label className="text-left pr-4 py-3">Status Bekerja</label>
          <div className="flex items-center">
            <input
              type="radio"
              name="statusBekerja"
              value="Sudah Bekerja"
              onChange={formik.handleChange}
              className="mr-2"
            />
            <span>Sudah Bekerja</span>
            <input
              type="radio"
              name="statusBekerja"
              value="Belum Berkerja"
              onChange={formik.handleChange}
              className="ml-4 mr-2"
            />
            <span>Belum bekerja</span>
          </div>
          {formik.touched.statusBekerja && formik.errors.statusBekerja ? (
            <p className="text-red-500 text-sm col-start-2 mt-1">
              {formik.errors.statusBekerja}
            </p>
          ) : null}
        </div>
      </form>

        <div className="flex border-t-2 justify-between py-8 mt-8">
          <RegisterButtonBack prevPage="GeneralInformation" />
          <RegisterButtonNext handleSubmit={formik.handleSubmit} nextPage="UniversityInformation" formik={formik}/>
        </div>
    </div>
  );
}

export default DataPribadi;
