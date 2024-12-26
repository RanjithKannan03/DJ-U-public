'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Logout from './Logout';
import Avatar from './Avatar';
import Link from 'next/link';

const firstDivVariant = {
    close: {
        rotate: 0
    },
    open: {
        rotate: 45
    }
}

const secondDivVariant = {
    close: {
        opacity: 1
    },
    open: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    },
}

const thirdDivVariant = {
    close: {
        rotate: 0
    },
    open: {
        rotate: -45
    }
}

const navVariant = {
    close: {
        x: '-100vw',
        transition: {
            ease: "linear",
        }
    },
    open: {
        x: 0,
        transition: {
            ease: "linear",
            staggerChildren: 0.2,
            delayChildren: 0.05
        }
    }
}

const MobileMenu = () => {
    const [open, setOpen] = useState(false);
    return (
        <div className='lg:hidden'>

            {/* Hamburger */}

            <button className='relative z-50 flex flex-col items-center justify-between w-10 h-8 p-1' type='button' onClick={() => { setOpen((prev) => !prev) }}>

                <motion.div variants={firstDivVariant} initial="close" animate={open ? "open" : null} className='w-full h-[2px] origin-left bg-white rounded' />
                <motion.div variants={secondDivVariant} initial="close" animate={open ? "open" : null} className='w-full h-[2px] origin-left bg-white rounded' />
                <motion.div variants={thirdDivVariant} initial="close" animate={open ? "open" : null} className='w-full h-[2px] origin-left bg-white rounded' />

            </button>

            {/* Mobile Tab */}

            <AnimatePresence>
                {
                    open &&
                    <motion.div variants={navVariant} initial="close" animate={open ? "open" : null} exit="close" className='absolute top-0 left-0 z-40 flex flex-col items-center justify-center w-screen h-screen gap-8 py-20 bg-black md:py-32'>
                        <div className='flex flex-col items-center justify-start w-full h-full gap-10'>

                            <Avatar />

                            <div className='flex flex-col items-center gap-6'>
                                <h1 className='text-3xl uppercase md:text-4xl text-[#7d7d7d] font-semibold'>Menu</h1>

                                <Logout />
                            </div>



                        </div>
                        <div className='flex items-center justify-center w-full' >
                            <span className='flex items-center gap-2 text-sm text-white md:text-base font-montserrat'>Made By,
                                <Link href='https://portfolio-nine-flax-61.vercel.app/' target='_blank' className='bg-gradient-to-r text-lg md:text-xl hover:scale-105 transition-all font-medium from-[#AA15A2] to-[#800CB1] bg-clip-text'>
                                    <span className='text-transparent'>
                                        Ranjith
                                    </span>
                                </Link>
                            </span>
                        </div>
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default MobileMenu