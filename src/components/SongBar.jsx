'use client';

import { songStore } from '@/zustand/store';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { motion, motionValue, useTransform } from 'framer-motion';
import QueueTrigger from './QueueTrigger';


const SongBar = () => {

    const currentSong = songStore((state) => state.currentSong);
    const [elapsedTime, setElapsedTime] = useState(0);
    const elapsedTimeValue = motionValue(0);

    useEffect(() => {
        elapsedTimeValue.set(currentSong ? elapsedTime + currentSong.startTime : elapsedTime);
    }, [elapsedTime, currentSong])

    const width = useTransform(elapsedTimeValue, [0, currentSong ? currentSong.duration : 1], ['0%', '100%']);


    function convertTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const remainingSeconds = totalSeconds % 60;
        const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
        return `${minutes} : ${formattedSeconds}`;
    }

    useEffect(() => {
        if (currentSong) {
            const start = currentSong.startTimeStamp;
            const interval = setInterval(() => {
                const currentTime = Date.now();
                const newElapsedTime = currentTime - start;
                if (newElapsedTime <= currentSong.duration) {
                    console.log('update')
                    setElapsedTime(newElapsedTime);
                }
            }, 1000); // Update every second

            return () => clearInterval(interval); // Cleanup on component unmount or when song changes
        }
    }, [currentSong]);


    return (
        <div className='flex relative items-center gap-10 w-full py-2 h-full justify-around bg-[#111111] shadow-2xl font-montserrat drop-shadow-2xl px-4 md:px-12 lg:px-24 xl:px-52'>

            {/* Cover Image */}

            <div className='p-2 overflow-hidden'>
                <motion.div initial={{ rotate: 0 }}
                    animate={currentSong ? { rotate: 360, transition: { duration: 5, type: 'tween', ease: 'linear', repeat: Infinity, repeatType: 'loop' } } : null}
                    className='relative w-12 h-12 overflow-hidden rounded-full md:w-14 md:h-14 lg:w-16 lg:h-16'>

                    <Image src={currentSong ? currentSong.coverLink : '/assets/default_song.png'} alt='cover' fill sizes='64' className='object-contain rounded-full' />

                </motion.div>
            </div>

            {/* Details */}

            <div className='flex flex-col justify-center w-1/4 h-full gap-1 '>

                <span className='text-sm text-white truncate md:text-base lg:text-lg'>{currentSong ? currentSong.name : 'Null'}</span>

                <span className='text-xs w-full truncate  font-light md:text-sm lg:text-base text-[#575557]'>{currentSong ? currentSong.artist : 'Null'}</span>

            </div>

            {/* Progress Bar */}

            <div className='flex flex-col justify-center flex-1 h-full gap-1'>

                <div className='w-full h-2 bg-[#464646] rounded-full relative'>
                    {
                        currentSong &&
                        <motion.div style={{ width }} className=' absolutez-30 left-0 top-0 rounded-full bottom-0 h-2 bg-gradient-to-r from-[#AA15A2] to-[#800CB1]' />
                    }
                </div>

                <div className='flex items-center justify-between w-full text-white font-montserrat'>

                    <span className='text-xs font-light md:text-sm lg:text-base'>{currentSong ? convertTime(currentSong.startTime + elapsedTime) : '-- / --'}</span>

                    <span className='text-xs font-light md:text-sm lg:text-base'>{currentSong ? convertTime(currentSong.duration) : '-- / --'}</span>

                </div>



            </div>


            <QueueTrigger />



        </div>
    )
}

export default SongBar