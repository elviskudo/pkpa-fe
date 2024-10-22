import Link from 'next/link';

const RegisterButtonBack = ({ prevPage }) => {
  return (
    <Link href={prevPage}>
      <button
        type="button"
        className="bg-white text-gray-400 border border-gray-400 w-40 px-4 py-2 rouded"
      >
        Back
      </button>
    </Link>
  );
};

export default RegisterButtonBack;
