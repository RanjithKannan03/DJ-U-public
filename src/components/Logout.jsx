'use client';

import React from 'react';
import { logout } from '@/actions/auth-actions';
import { songStore, userStore } from '@/zustand/store';
import { RiLogoutBoxRLine } from "react-icons/ri";

const Logout = () => {
    const logoutUser = userStore((state) => state.logoutUser);
    const clearCurrentSong = songStore((state) => state.clearCurrentSong);
    return (
        <form className='lg:w-full' action={logout} onSubmit={(e) => {
            if (window.currentAudio) {
                window.currentAudio.pause();
                window.currentAudio.currentTime = 0;
                window.currentAudio = null;
            }
            clearCurrentSong();
            logoutUser();
        }}>
            <button className='flex items-center w-full gap-4 transition-all text-white lg:text-[#7d7d7d] hover:text-white p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#AA15A2] hover:to-[#800CB1]'>
                <RiLogoutBoxRLine size={28} className='' />
                <span className='text-base lg:text-lg'>Logout</span>
            </button>
        </form>
    )
}

export default Logout