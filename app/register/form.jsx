'use client'

import React, { useState } from 'react';
import Link from '@node_modules/next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

export default function Form() {
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if(!username || !email || !password || !confirmPassword) {
          alert('All fields are neccessary')
          return
        }
    
        try {
          const res = await fetch('api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body: JSON.stringify({
              username: username,
              email: email,
              password: password,
              role: 'user',
            })
          })
    
          if(res.ok) {
            const form = e.target;
            form.reset();
          } else {
            console.log('user registration failed')
          }
        } catch (error) {
          console.log('failed to register')
        }
      };
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return(
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-[90%] max-w-2xl min-h-[70vh] bg-white shadow-lg rounded-[3rem] p-8">
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            <div className="mb-8">
            <h2 className="text-xl font-semibold pt-4 pb-4 flex justify-center w-full">User Register</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 items-center gap-y-[1rem]">
                <input
                type="text"
                placeholder="Name"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
                onChange={(e) => setUsername(e.target.value)}
                />
                <input
                type="text"
                placeholder="Email"
                className="w-3/4 p-3 border rounded-md focus:outline-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                />
                <div className="relative w-3/4">
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Password"
                    className="w-full p-3 border rounded-md focus:outline-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
                <div className="relative w-3/4">
                <input
                    type={isConfirmPasswordVisible ? 'text' : 'password'}
                    placeholder="Confirm Password"
                    className="w-full p-3 border rounded-md focus:outline-blue-500"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="button"
                    onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600 hover:text-gray-800"
                >
                    {isConfirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
                <div className="pt-[1rem] w-full flex items-center justify-center">
                <button className="w-1/3 bg-green-600 text-white py-3 rounded-3xl hover:bg-green-700">
                    Register
                </button>
                </div>
                <div className="flex pt-[3rem] flex-row items-center justify-center">
                <p>Already have an account?</p>
                <Link href="/login" className="font-bold ml-1">
                    Login
                </Link>
                </div>
            </form>
            </div>
        </div>
        </div>
    )
}