import React from 'react'
import Avatar from './Avatar'
import Logout from './Logout'
import { FiUser } from "react-icons/fi";
import Link from 'next/link';

const SideNav = () => {
    return (
        <div className='w-full h-full bg-[#111111] flex flex-col items-center font-montserrat py-10 gap-12 shadow-2xl'>

            {/* Name */}

            <div className='bg-gradient-to-r from-[#AA15A2] to-[#800CB1] bg-clip-text p-2 tracking-widest'>
                <h1 className='font-bold text-transparent lg:text-4xl xl:text-5xl'>DJ - U</h1>
            </div>

            <div className='flex flex-col items-center w-full gap-4'>
                <Avatar />

                {/* Options */}

                <div className='flex flex-col w-full gap-6 p-6'>

                    <div className='flex flex-col w-full gap-2'>
                        <span className='text-xl font-semibold text-[#7d7d7d]'>Menu</span>
                        <div className='w-full h-[2px] bg-gradient-to-r from-[#AA15A2] to-[#800CB1]' />
                    </div>

                    {/* <div className='flex items-center w-full gap-4 transition-all cursor-pointer text-[#7d7d7d] hover:text-white p-2 rounded-lg hover:bg-gradient-to-r hover:from-[#AA15A2] hover:to-[#800CB1]'>

                        <FiUser size={28} />
                        <span className='text-base lg:text-lg'>View Profile</span>

                    </div> */}

                    <Logout />

                </div>
            </div>

            <div className='absolute z-30 bottom-32'>
                <span className='flex items-center gap-2 text-base text-white font-montserrat'>Made By,
                    <Link href='https://portfolio-nine-flax-61.vercel.app/' target='_blank' className='bg-gradient-to-r text-xl hover:scale-105 transition-all font-medium from-[#AA15A2] to-[#800CB1] bg-clip-text'>
                        <span className='text-transparent'>
                            Ranjith
                        </span>
                    </Link>
                </span>
            </div>


        </div>
    )
}

export default SideNav