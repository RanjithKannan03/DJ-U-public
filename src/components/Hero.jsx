'use client';

import React, { useState, useEffect } from 'react'
import SongCard from './SongCard'
import SearchBar from './SearchBar'
import { io } from 'socket.io-client';
import { userStore, songStore, songQueueStore } from '@/zustand/store';
import SearchBarMobile from './SearchBarMobile';

const socket = io('https://dj-u-c5gg.onrender.com/');

const Hero = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [songs, setSongs] = useState(props.songs);
    const [audio, setAudio] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [timeout, setClientTimeout] = useState(null);
    const [remainingTime, setRemainingTime] = useState(null);
    const currentSong = songStore((state) => state.currentSong);



    // const user = userStore((state) => state.user);


    useEffect(() => {
        const user = userStore.getState().user;
        const setCurrentSong = songStore.getState().setCurrentSong;
        const setSongQueue = songQueueStore.getState().setSongQueue;

        if (user && user.id) {
            socket.emit('user', { userId: user.id });
            socket.emit('checkCooldown', { userId: user.id });
            socket.emit('getQueue');
        }

        socket.on('cooldownState', (data) => {

            if (data.canVote === false) {
                setDisabled(true);
                setDisabled(true);
                setClientTimeout(data.timeOut);
                startCountdown(data.timeOut);
            }
            else {
                // if (!currentSong) {
                //     setDisabled(true);
                //     return;
                // }
                setDisabled(false);
                setClientTimeout(null);
            }
        });

        socket.on('playSong', ({ songId, startTime }) => {
            console.log('Initial start: ' + startTime);
            const song = songs.find(s => s.id === songId);
            const currentSong = { ...song, startTime: startTime, remainingTime: song.duration - startTime, startTimeStamp: Date.now() }
            if (song) {
                playAudio(song.songLink, startTime)
                setAudio(audio);
                setCurrentSong(currentSong);
            }
        });

        socket.on('updatedQueue', ({ queue }) => {
            console.log(queue);
            setSongQueue(queue);
        });

        return () => {
            socket.off('playSong');
            socket.off('updatedQueue');
            socket.off('cooldownState');
        };
    }, []);

    function playAudio(link, startTime) {
        const audio = new Audio(link);
        audio.currentTime = startTime / 1000;
        audio.play();
        window.currentAudio = audio;
    }

    useEffect(() => {
        const filteredSongs = props.songs.filter((song) => {
            return song.name.toLowerCase().includes(searchTerm.toLowerCase()) || song.artist.toLowerCase().includes(searchTerm.toLowerCase())
        })
        setSongs(filteredSongs);
    }, [searchTerm])

    function start() {
        const user = userStore.getState().user;
        socket.emit('playSong', 'hi');
        // setDisabled(false);
        if (user && user.id) {
            socket.emit('checkCooldown', { userId: user.id });
        }
    }


    const startCountdown = (endTime) => {
        const countdownInterval = setInterval(() => {
            const now = Date.now();
            const remaining = Math.round((endTime - now) / 1000);

            if (remaining > 0) {
                setRemainingTime(remaining);
            } else {
                clearInterval(countdownInterval);
                setRemainingTime(null);
                setDisabled(false);
            }
        }, 1000);
    };

    function vote(songId) {
        const user = userStore.getState().user;
        if (user && user.id) {
            socket.emit('vote', { songId: songId, userId: user.id });
        }
        setDisabled(true);
    }

    return (
        <div className='flex flex-col w-full gap-4 h-[80vh] overflow-hidden'>

            {/* {currentSong && <span className='text-white'>{currentSong.name}</span>} */}


            {/* Search bar */}

            <div className='relative flex flex-col w-full gap-2 lg:items-center lg:flex-row lg:gap-4'>

                <div className='flex items-center w-full gap-2 lg:hidden lg:gap-4'>
                    <SearchBarMobile searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                    <button className={`bg-gradient-to-r from-[#AA15A2] to-[#800CB1] px-2 py-1 lg:py-2 lg:px-3 hover:scale-110 hover:font-normal text-white text-sm font-light lg:text-base rounded-full disabled:opacity-40 transition-all disabled:cursor-not-allowed`}
                        disabled={currentSong ? true : false} type='button' onClick={start}>
                        Start
                    </button>
                </div>

                <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                <button className={`bg-gradient-to-r from-[#AA15A2] to-[#800CB1] px-2 py-1 lg:py-2 lg:px-3 hidden lg:flex hover:scale-110 hover:font-normal text-white text-sm font-light lg:text-base rounded-full disabled:opacity-40 transition-all disabled:cursor-not-allowed`}
                    disabled={currentSong ? true : false} type='button' onClick={start}>
                    Start
                </button>



                <div className='flex items-center flex-1 h-full gap-10 text-white font-montserrat'>


                    {
                        timeout && remainingTime &&
                        <div className='flex items-center gap-2'>
                            <span className='text-lg'>Timeout :</span>
                            <span className='text-base font-light'>{remainingTime} s</span>
                        </div>
                    }

                </div>



            </div>

            {/* Library */}

            <div className='flex-1 w-full px-2 pb-6 overflow-y-scroll lg:pb-10'>

                <div className='grid grid-cols-1 gap-x-6 gap-y-10 lg:gap-y-4 md:grid-cols-2 lg:grid-cols-3'>

                    {
                        songs.map((song, index) => {
                            return <SongCard song={song} key={index} isDisabled={disabled} vote={vote} />
                        })
                    }

                </div>

            </div>
        </div>
    )
}

export default Hero