import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, XCircleIcon } from '@heroicons/react/20/solid';

const DropzoneWithoutDrag = ({ title, setFieldValue, fieldName, errors }) => {
  const [uploadedFile, setUploadedFile] = useState(null); // State untuk menyimpan file yang diunggah

  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxSize: 10485760, 
    onDrop: (acceptedFiles, fileRejections) => {
      if (fileRejections.length > 0) {
        setFileError('Hanya file PDF yang diperbolehkan.'); // Pesan kesalahan jika file bukan PDF
        return;
      }

      if (acceptedFiles.length) {
        const file = acceptedFiles[0];
        setFieldValue(fieldName, file); // Menyimpan file di formik
        setUploadedFile(file); // Menyimpan file di state
        setFileError('')
      }
    },
  });

  const handleRemoveFile = () => {
    setUploadedFile(null); // Menghapus file yang diunggah
    setFieldValue(fieldName, null); // Menghapus file di formik
  };

  return (
    <section className="container">
      <div className={`py-8 ${title !== 'Foto Pendaftar' ? 'border-b-2' : ''}`}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5 pr-40'>
          <div>
            <label>{title}</label>
            <aside className="mt-2">
              <h4 className="font-semibold text-sm">Files</h4>
              <ul>
                {errors[fieldName] && <li className="text-red-500">{errors[fieldName]}</li>}
              </ul>
            </aside>
          </div>

          {/* Jika file sudah diupload, tampilkan informasi file */}
          {uploadedFile ? (
            <div className="flex flex-col justify-center items-center border-2 border-dashed p-6 text-center">
              <p className="text-sm"><strong>File diupload:</strong> {uploadedFile.name}</p>
              <p className="text-xs">Ukuran: {(uploadedFile.size / 1024).toFixed(2)} KB</p>
              <button 
                className="mt-2 text-red-500 flex items-center hover:underline" 
                onClick={handleRemoveFile}>
                <XCircleIcon className="h-5 w-5 mr-1" />
                Hapus file
              </button>
            </div>
          ) : (
            // Dropzone akan muncul jika tidak ada file yang diupload
            <div
              {...getRootProps({ className: 'border-2 border-dashed p-6 text-center cursor-pointer flex flex-col justify-center items-center' })}>
              <input {...getInputProps()} />
              <ArrowUpTrayIcon className='size-8' />
              <p className="text-sm">Klik untuk upload</p>
              <p className="text-xs">Maksimum 10 MB, Format Pdf</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default DropzoneWithoutDrag;
