'use client'

import React from 'react'

const navbar = () => {
    const isLoggedIn = false
    return (
        <div>
            {isLoggedIn ? (
                    <nav className='h-10 bg-green-600 w-full'>
                        navbar
                    </nav>
                ) : (
                    <div></div>
                )
            }
        </div>
    )
}

export default navbar
