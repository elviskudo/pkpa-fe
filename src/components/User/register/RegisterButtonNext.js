// src/components/user/register/RegisterButtonNext.js
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

function RegisterButtonNext({ handleSubmit, nextPage, formik }) {
  const router = useRouter();

  const handleClick = async (e) => {
    e.preventDefault(); 
    await handleSubmit(); 
    
    const errors = await formik.validateForm();
    console.log('Formik Errors:', errors); 
    
    if (!Object.keys(errors).length) { 
      router.push(nextPage); 
    }
  };

  return (
    <button onClick={handleClick} className="bg-blue-500 text-white border w-40 px-4 py-2 rouded">
      Next
    </button>
  );
}

export default RegisterButtonNext;
