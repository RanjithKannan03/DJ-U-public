import Image from 'next/image'
import React from 'react'

const SongCard = ({ song, isDisabled, vote }) => {
    return (
        <div className='flex flex-col col-span-1 gap-2 font-montserrat'>

            <div className='flex items-center gap-2'>

                {/* Image */}

                <div className='w-[40%] md:w-1/2 lg:w-[15rem] xl:w-[20rem] aspect-square relative'>

                    <Image src={song.coverLink} fill sizes='320' priority className='object-contain' alt='cover' />

                </div>

                {/* Info mobile */}

                <div className='flex flex-col justify-center flex-1 h-full gap-4 p-2 text-white'>



                    <div className='flex flex-col gap-1 lg:hidden'>
                        <span className='text-sm text-white md:text-base lg:text-lg'>
                            {song.name}
                        </span>

                        <span className='text-xs md:text-sm lg:text-base text-[#575557]'>
                            {song.artist}
                        </span>
                        <button type='button' className={`bg-gradient-to-r w-1/3 p-1 text-xs font-light disabled:opacity-40 transition-all disabled:cursor-not-allowed lg:text-base from-[#AA15A2] to-[#800CB1] rounded-full ${isDisabled ? null : 'hover:scale-110 hover:font-normal'}`}
                            disabled={isDisabled ? true : false}
                            onClick={() => { vote(song.id) }}
                        >Vote</button>
                    </div>



                </div>
            </div>

            {/* Info */}

            <div className='items-center justify-between hidden gap-8 pr-4 lg:flex'>

                <div className='flex flex-col gap-1'>
                    <span className='text-sm text-white md:text-base lg:text-lg'>
                        {song.name}
                    </span>

                    <span className='text-xs md:text-sm lg:text-base text-[#575557]'>
                        {song.artist}
                    </span>
                </div>

                <button type='button' className={`bg-gradient-to-r disabled:opacity-40 transition-all disabled:cursor-not-allowed text-center text-white w-1/4 text-sm font-light hidden lg:flex lg:text-base p-1 from-[#AA15A2] to-[#800CB1] rounded-full items-center justify-center ${isDisabled ? null : 'hover:scale-110 hover:font-normal'}`}
                    disabled={isDisabled ? true : false}
                    onClick={() => { vote(song.id) }}
                >
                    Vote
                </button>

            </div>



        </div>
    )
}

export default SongCard