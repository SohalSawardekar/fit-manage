'use client';

import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Homepage = () => {
  const { data: session } = useSession(); 
  const router = useRouter(); 

  useEffect(() => {
    if (!session) {
      router.push('/'); 
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <button
        className="px-8 py-3 rounded-3xl bg-black text-white hover:bg-gray-800"
        onClick={ async () => signOut()} 
      >
        Sign Out
      </button>
    </div>
  );
};

export default Homepage;
