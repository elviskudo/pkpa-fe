'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; // Import Link secara terpisah
import { memo } from 'react';

// Separate constant data
const USERS = [
  { name: 'Adli Ardhius Salam', url: '/images/target/Ardhi.jpg', image:'Ardhi.jpg' },
  { name: 'Thomas Shelby', url: '/images/target/Beni.jpg',image:'Beni.jpg' },
  { name: 'Michael Corleone', url: '/images/target/Michael.jpg',image:'Michael.jpg' },
  { name: 'Gustavo Fring', url: '/images/target/Gustavo.png',image:'Gustavo.jpg' },
];

// Separate UserCard component for better reusability and performance
const UserCard = memo(({ user, onSelect }) => (
  <div
    className="flex items-center bg-white border-2 border-gray-300 rounded-lg p-3 m-2 w-52 shadow-md hover:scale-105 transition-transform cursor-pointer"
    onClick={() => onSelect(user)}
  >
    <div className="relative w-14 h-14 mr-3">
      <Image
        src={user.url}
        alt={user.name}
        fill
        className="rounded-full object-cover"
        sizes="(max-width: 60px) 100vw, 60px"
      />
    </div>
    <span className="text-gray-700 font-semibold truncate">{user.name}</span>
  </div>
));

UserCard.displayName = 'UserCard';

export default function UserSelect() {
  const router = useRouter();

  const handleUserSelect = (user) => {
    const queryParams = new URLSearchParams({
      name: user.name,
      image: user.image,
    }).toString();
    router.push(`/home/face/compare?${queryParams}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-semibold mb-6">Pilih User</h1>
      <div className="flex flex-col items-center gap-4 w-full max-w-md">
        {USERS.map((user) => (
          <UserCard
            key={user.name}
            user={user}
            onSelect={handleUserSelect}
          />
        ))}
        <Link 
          href="/home/face/add-user"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
        >
          Tambah User
        </Link>
      </div>
    </div>
  );
}