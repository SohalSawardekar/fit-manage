'use client'

import { connectToDB } from '@utils/db'
import GoogleButton from 'react-google-button'
import { signIn, signOut } from 'next-auth/react'
import Image from '@node_modules/next/image'
import Link from '@node_modules/next/link'

const landing_page = () => {
  return (
    <main className='h-screen text-gray-700 '>
      
      {/* Nav component */}
      <nav>
        {/* Desktop view */}
        <div className='hidden lg:flex flex-row justify-around items-center h-20 bg-gradient-to-b from-slate-300 to-gray-200'>
          <Link href='/'><Image src='/logo/logo.png' alt='gym_logo' width={70} height={70} className='rounded-full'/></Link>

          <div className='flex flex-row gap-x-11 px-6 bg-gray-400 rounded-3xl font-bold'>
            <Link href='/' className='navbtn1'>Home</Link>
            <Link href='/' className='navbtn1'>Packages</Link>
            <Link href='/' className='navbtn1'>Trainers</Link>  
            <Link href='/' className='navbtn1'>Contact Us</Link>
          </div>

          <Link href='/login' className='bg-gradient-to-br from-blue-900 via-sky-700 to-cyan-600 p-4 rounded-3xl text-white font-bold'>Join Today</Link>
        </div>

        {/*Mobile view*/}
        <div className='lg:hidden'>Mobile view</div>
      </nav>
      
      {/* Main Content */}
      <div className='w-full'>
        <div className='w-full flex flex-col items-center justify-center pt-[5rem] text-[4rem] font-extrabold bg-gradient-to-br from-blue-950 via-cyan-600 to-slate-500 bg-transparent text-transparent bg-clip-text'>
          <h1>Sweat Now,</h1>
          <h1>Shine Later </h1>
        </div>

        <div className="relative flex items-center justify-center pt-[5rem]">
          {/* Image */}
          <Image 
            src="/images/gymImage.jpeg" 
            width={700} 
            height={700} 
            alt="Gym Image" 
            className="rounded-3xl blur-[2px]" 
          />

          {/* Overlayed Text */}
          <h1 className="absolute font-extrabold flex flex-col justify-center items-center text-[6rem] text-white">
            <p>One</p>
            <p>more</p>
            <p>rep</p>
          </h1>
        </div>


        <div className='min-h-screen'></div>
      </div>
    </main>
  )
}

export default landing_page