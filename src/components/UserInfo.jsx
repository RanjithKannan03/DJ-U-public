'use client';

import { userStore } from '@/zustand/store';
import Image from 'next/image';
import React from 'react';

const UserInfo = () => {
    const user = userStore((state) => state.user);
    return (
        <div className='flex items-center justify-end w-full gap-4'>

            {
                user && <span className='hidden text-white md:flex'>Hi,<span className='ml-2 bg-gradient-to-r from-[#AA15A2] to-[#800CB1] bg-clip-text'><span className='font-medium text-transparent'>{user.username}</span></span></span>
            }

            {
                user &&
                <div className='relative w-10 h-10 overflow-hidden rounded-full'>
                    <Image src={user.avatarURL} fill sizes='40' className='object-contain' alt='profile-pic' />
                </div>
            }

        </div>
    )
}

export default UserInfo