'use client';

import React, { useState, useEffect } from 'react';
import GoogleButton from '@node_modules/react-google-button';
import { signIn, useSession } from '@node_modules/next-auth/react';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { data: session } = useSession(); 
  const router = useRouter(); 
  const [loginType, setLoginType] = useState('user');

  useEffect(() => {
    if (session) {
      router.push('/dashboard'); 
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[90%] max-w-2xl min-h-[70vh] bg-white shadow-lg rounded-[3rem] p-8 ">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {/* Dropdown to Select Login Type */}
        <div className="mb-8 text-center">
          <label htmlFor="loginType" className="text-lg font-semibold mr-4">
            Login As:
          </label>
          <select
            id="loginType"
            value={loginType}
            onChange={(e) => setLoginType(e.target.value)}
            className="p-2 border rounded-md focus:outline-blue-500"
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="employee">Employee</option>
          </select>
        </div>

        {/* User Login Form */}
        {loginType === 'user' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold  pt-4 pb-4 flex justify-center w-full">User Login</h2>
            <form className="flex flex-col gap-4 items-center gap-y-[1rem]">
              <input
                type="text"
                placeholder="Username"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
              />
              <div className="pt-[1rem] w-full flex items-center justify-center">
                <button className="w-1/3 bg-green-600 text-white py-3 rounded-3xl hover:bg-green-700">
                  Login as User
                </button>
              </div>
            </form>
            <h1 className="text-[1.5rem] font-extrabold flex justify-center pt-[1rem]">OR</h1>
            <div className="text-center mt-4 w-full flex justify-center">
              <GoogleButton
                onClick={() => signIn('google')} // Trigger Google sign-in
              >
                Sign in with Google
              </GoogleButton>
            </div>
          </div>
        )}

        {/* Admin Login Form */}
        {loginType === 'admin' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold pt-4 pb-4 flex justify-center w-full">Admin Login</h2>
            <form className="flex flex-col gap-4 items-center gap-y-[1rem]">
              <input
                type="text"
                placeholder="Username"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
              />
              <div className="pt-[1rem] w-full flex items-center justify-center">
                <button className="text-center w-1/3 bg-blue-600 text-white py-3 rounded-3xl hover:bg-blue-700">
                  Login as Admin
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Employee Login Form */}
        {loginType === 'employee' && (
          <div>
            <h2 className="text-xl font-semibold  pt-4 pb-4 flex justify-center w-full">Employee Login</h2>
            <form className="flex flex-col gap-4 items-center gap-y-[1rem]">
              <input
                type="text"
                placeholder="Username"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
              />
              <div className="pt-[1rem] w-full flex items-center justify-center">
                <button className="w-1/3 bg-purple-600 text-white py-3 rounded-3xl hover:bg-purple-700">
                  Login as Employee
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
