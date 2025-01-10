import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDropzone } from 'react-dropzone'; 
import { ArrowUpTrayIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { Switch } from '@mui/material';
import Swal from 'sweetalert2';

const SertifikatPKPA = ({onBack, onNavigateBackToUniversity}) => {
    const [preview, setPreview] = useState(null);
    

    const formik = useFormik({
        initialValues: {
        sertifikat: null,
        publish: false, 
        },
        validationSchema: Yup.object({
        sertifikat: Yup.mixed()
            .required('Sertifikat harus diupload')
            .test('fileType', 'Hanya gambar dengan format .png, .jpg, atau .jpeg yang diperbolehkan', (value) => {
                if (typeof value === 'string') return true;
          
                return value && ['image/jpeg', 'image/png', 'image/jpg'].includes(value.type);
            }),
        }),
        onSubmit: (_values) => {
            Swal.fire({
                title: 'Apakah Anda ingin menyimpan perubahan?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal',
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire('Data berhasil diubah', '', 'success');
                    if (onNavigateBackToUniversity && typeof onNavigateBackToUniversity === 'function') {
                        onNavigateBackToUniversity();
                    }
                }
            });
        },
    });

    console.log("onNavigateBackToUniversity:", onNavigateBackToUniversity);


    const handleDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        formik.setFieldValue('sertifikat', file);

        if (file) {
        const fileURL = URL.createObjectURL(file);
        setPreview(fileURL);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: handleDrop,
        accept: 'image/jpeg, image/png', 
    });

    const removeLogo = () => {
        formik.setFieldValue('sertifikat', null);
        setPreview(null);
    };

    return (
        <div className="bg-white rounded-md shadow-md">
            <h2 className="text-2xl py-8 px-5 font-extrabold">Tambah Universitas</h2>
            <div className="text-sm font-medium text-gray-500 mb-5">
                <div className="flex border-b-2 mb-5">
                    <div className="pb-5 px-5 mx-5">Identitas Universitas</div>
                    <div className='pb-5 px-5 mx-5'>Tenaga Pengajar</div>
                    <div className='pb-5 px-5 mx-5 border-b-4 border-orange-300 text-orange-300'>Sertifikat PKPA</div>
                </div>
            </div>
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-y-5 pr-40 px-8">
                <div className="grid grid-cols-subgrid gap-y-2 col-span-2">
                    <label className="font-semibold">Sertifikat Unggah</label>
                    <div {...getRootProps()} className="border border-dashed p-6 text-center cursor-pointer flex flex-col justify-center items-center h-[150px]">
                        <input {...getInputProps()} />
                        {formik.values.sertifikat ? (
                        <div className="flex items-center justify-center">
                            <p>{formik.values.sertifikat.name}</p>
                            <XCircleIcon className="h-5 w-5 text-red-500 cursor-pointer" onClick={removeLogo} />
                        </div>
                        ) : (
                        <div className='flex flex-col justify-center items-center'>
                            <ArrowUpTrayIcon className='h-6 w-6' />
                            <p className='font-extrabold'>Tarik file kesini untuk upload</p>
                            <p className='text-gray-400 font-light'>file berekstensi jpg/jpeg</p>
                        </div>
                        )}
                    </div>
                    {formik.errors.sertifikat && formik.touched.sertifikat && (
                        <p className="text-red-500 text-sm col-start-2">{formik.errors.sertifikat}</p>
                    )}
                </div>

                <div className="p-5">
                    <label className="font-semibold">Preview</label>
                    {preview ? (
                        <img
                            src={preview}
                            alt="Preview Sertifikat"
                            className="border rounded-lg w-full h-64 object-contain"
                        />
                    ) : (
                        <p className="text-gray-500">Tidak ada sertifikat yang diupload</p>
                    )}
                </div>

                <div className="grid grid-cols-subgrid gap-y-2 col-span-2">
                    <label className="font-semibold">Publish</label>
                    <div className="flex items-center">
                        <span className="mr-2">Nonaktif</span>
                        <Switch
                            name="publish"
                            onChange={(event) => formik.setFieldValue('publish', event.target.checked)}
                            checked={formik.values.publish}
                            color="primary"
                            sx={{
                                '& .MuiSwitch-switchBase.Mui-checked': {
                                    color: '#ffffff', 
                                },
                                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                                    backgroundColor: '#FFBB00', 
                                },
                                '& .MuiSwitch-track': {
                                    borderRadius: 20 / 2, 
                                    backgroundColor: '#464646', 
                                },
                            }}
                        />
                        <span className="ml-2">Aktif</span>
                    </div>
                </div>
            </form>
            <div className='px-5 py-4 flex justify-between'>

                <button type="button" onClick={onBack} className="px-4 py-2 border border-gray-400 text-gray-400 rounded">Kembali</button>

                <button
                type="submit"
                className="bg-orange-400 text-white p-2 rounded"
                onClick={formik.handleSubmit} 
                >
                Simpan
                </button>
            </div>
        </div>
    );
};

export default SertifikatPKPA;
