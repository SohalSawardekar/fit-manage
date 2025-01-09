'use client'

import React from 'react'
import Link from '@node_modules/next/link'
import Image from '@node_modules/next/image'


const navbar = () => {
    return (
        <div>
            {/* Desktop View */}
            <div className='hidden lg:flex flex-row justify-around items-center min-h-[5rem] bg-slate-300'>
                {/* Logo */}
                <Link href='/dashboard'>
                    <Image 
                        src='/logo/logo.png' 
                        alt='gym_logo' 
                        width={70} 
                        height={70} 
                        className='rounded-full' 
                        onClick={() => {}}
                    />
                </Link>
                <div>Nav btns</div>
                <div>profile view</div>
            </div>

            {/* Mobile View */}
            <div className='lg:hidden'>Mobile View</div>
        </div>
    )
}

export default navbar
