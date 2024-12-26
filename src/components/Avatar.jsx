'use client';

import React from 'react';
import { userStore } from '@/zustand/store';
import Image from 'next/image';


const Avatar = () => {
    const user = userStore((state) => state.user);
    return (
        <div className='relative flex flex-col items-center gap-4 font-montserrat'>


            {/* Profile Pic */}

            {/* <div className='relative w-16 h-16 overflow-hidden rounded-full cursor-pointer'>

                {
                    user && <Image src={user.avatarURL} alt='profile-pic' fill sizes='64' className='object-contain rounded-full' />
                }

            </div> */}

            {/* Username */}

            {
                user && <span className='text-lg text-white'>Hi,<span className='ml-2 bg-gradient-to-r from-[#AA15A2] to-[#800CB1] bg-clip-text'><span className='font-medium text-transparent'>{user.username}</span></span></span>
            }







        </div>
    )
}

export default Avatar