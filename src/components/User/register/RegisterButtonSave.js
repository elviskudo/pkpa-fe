import React from 'react';

const RegisterButtonSave = ({ handleSubmit }) => {
  return (
    <button
      type="button" 
      onClick={handleSubmit} 
      className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
    >
      Simpan
    </button>
  );
};

export default RegisterButtonSave;
