'use client';

import React, { useState } from 'react';
import { HiMiniQueueList } from "react-icons/hi2";
import { motion, AnimatePresence } from 'framer-motion';
import MobileQueue from './MobileQueue';


const MobileQueueTrigger = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div>

            <div className='absolute right-[7%] text-white z-20 bottom-20 p-3 cursor-pointer' onClick={() => { setIsOpen((prev) => !prev) }}>
                <HiMiniQueueList size={28} />
            </div>


            <AnimatePresence mode='wait'>

                {
                    isOpen &&
                    <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} exit={{ scaleY: 0, opacity: 0 }} className='bg-[rgba(0,0,0,0.90)] origin-bottom w-screen h-screen absolute z-50 top-0 left-0'>
                        <MobileQueue setIsOpen={setIsOpen} />
                    </motion.div>
                }

            </AnimatePresence>
        </div>
    )
}

export default MobileQueueTrigger