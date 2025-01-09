'use client'

import Form from './form';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';  
import { useSession } from 'next-auth/react';  

const Login = () => {
  const router = useRouter(); 
  const { data: session, status } = useSession(); 

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');  
    }
  }, [status, router]);  

  if (status === 'authenticated') {
    return null;  
  }

  return <Form />;  
};

export default Login;
