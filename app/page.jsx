'use client'

import { useSession } from 'next-auth/react';  // Correct import
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // Correct import
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import LandingPage from '@components/landingPage';

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);  

  useEffect(() => {
    setIsClient(true);  
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  
  if (!isClient) {
    return null;
  }

  if (status === 'loading') {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (status === 'unauthenticated') {
    return <LandingPage />;  
  }

  return null;  
};

export default Page;
