'use client'

import { songQueueStore } from '@/zustand/store';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Reorder } from 'framer-motion';



const Queue = () => {

    const [songQueue, setSongQueue] = useState(songQueueStore.getState().queue);

    useEffect(() => {
        const unsubscribe = songQueueStore.subscribe((state) => {
            setSongQueue(state.queue);
        });
        return () => unsubscribe();
    }, []);;

    return (
        <div className='flex items-center justify-center w-full h-full p-4 font-montserrat'>

            <div className='flex flex-col w-full h-full gap-4 overflow-y-scroll'>

                <h1 className='self-center font-light text-white uppercase lg:text-xl xl:text-2xl'>Queue</h1>

                <div className='w-full h-[60vh] px-4'>

                    {
                        songQueue.length > 0 ?
                            (
                                <Reorder.Group values={songQueue} onReorder={setSongQueue}>
                                    <table className='w-full font-montserrat'>
                                        <thead className='w-full'>
                                            <tr className='w-full'>
                                                <th className='text-lg p-2 font-semibold uppercase bg-gradient-to-r from-[#AA15A2] to-[#800CB1] bg-clip-text'>
                                                    <span className='text-transparent'>Cover</span>
                                                </th>
                                                <th className='text-lg p-2 font-semibold uppercase bg-gradient-to-r from-[#AA15A2] to-[#800CB1] bg-clip-text'>
                                                    <span className='text-transparent'>Song</span>
                                                </th>
                                                <th className='text-lg p-2 font-semibold uppercase bg-gradient-to-r from-[#AA15A2] to-[#800CB1] bg-clip-text'>
                                                    <span className='text-transparent'>Votes</span>
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody className='w-full'>
                                            {
                                                songQueue.map((song, index) => {
                                                    return (
                                                        <Reorder.Item as='tr' value={song.votes} key={song.name} className='py-2'>
                                                            <td className='flex items-center justify-center p-2'>
                                                                <div className='relative w-12 h-12 overflow-hidden rounded-full'>
                                                                    <Image src={song.coverLink} sizes='40' fill className='object-contain rounded-full' alt='cover' />
                                                                </div>
                                                            </td>

                                                            <td className='p-2 text-center'>
                                                                <div className='flex flex-col gap-2'>
                                                                    <span>{song.name}</span>
                                                                    <span className='text-sm text-[#575557]'>{song.artist}</span>

                                                                </div>
                                                            </td>

                                                            <td className='p-2 text-center'>
                                                                <span>{song.votes}</span>
                                                            </td>
                                                        </Reorder.Item>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </Reorder.Group>
                            ) :
                            <div className='flex items-center justify-center w-full h-full'>
                                <h1 className='text-3xl text-[#575557] font-semibold'>Queue is empty</h1>
                            </div>
                    }

                </div>


            </div>

        </div>
    )
}

export default Queue