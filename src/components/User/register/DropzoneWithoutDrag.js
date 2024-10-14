import React from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon } from '@heroicons/react/20/solid';

const DropzoneWithoutDrag = ({ title, setFieldValue, fieldName, errors }) => {
  const { getRootProps, getInputProps } = useDropzone({
    noDrag: true,
    accept: '.pdf',
    maxSize: 10485760, 
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length) {
        setFieldValue(fieldName, acceptedFiles[0]); 
      }
    },
  });

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
          <div
            {...getRootProps({ className: 'border-2 border-dashed p-6 text-center cursor-pointer flex flex-col justify-center items-center' })}>
            <input {...getInputProps()} />
            <ArrowUpTrayIcon className='size-8'/>
            <p className="text-sm">Klik untuk upload</p>
            <p className="text-xs">Maksimum 10 MB, Format Pdf</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DropzoneWithoutDrag;

