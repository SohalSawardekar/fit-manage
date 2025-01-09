'use client'

import Form from './form';
import { useRouter } from 'next/navigation';
import { useSession } from '@node_modules/next-auth/react';
import { useEffect } from 'react';
import LoadingScreen from '@components/loadingScreen';

const Login = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <LoadingScreen />;
  }

  if (status === 'unauthenticated') {
    return <Form />;
  }

  return null;
};

export default Login;
