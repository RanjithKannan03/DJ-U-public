'use client';

import React, { useState } from 'react';
import { HiMiniQueueList } from "react-icons/hi2";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatePresence, motion } from 'framer-motion';
import Queue from './Queue';

const QueueTrigger = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [click, setClick] = useState(false);
    return (
        <div onMouseDown={() => { setClick(true) }} onMouseUp={() => { setClick(false) }} className={` hidden p-3 rounded-full transition-all  text-white cursor-pointer lg:flex ${click ? 'bg-gradient-to-r from-[#AA15A2] to-[#800CB1]' : 'bg-transparent'}`} onClick={() => { setIsOpen((prev) => !prev) }}>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger><HiMiniQueueList size={25} /></TooltipTrigger>
                    <TooltipContent>
                        <p>Queue</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>


            <AnimatePresence mode='wait'>
                {
                    isOpen &&
                    <motion.div initial={{ scaleY: 0, opacity: 0 }} animate={{ scaleY: 1, opacity: 1 }} exit={{ scaleY: 0, opacity: 0 }} className='origin-bottom absolute bottom-full right-[5%] bg-[rgba(0,0,0,0.90)] rounded-xl h-[70vh] w-[45vw] ' onClick={(e) => { e.stopPropagation() }}>
                        <Queue />
                    </motion.div>
                }
            </AnimatePresence>

        </div>
    )
}

export default QueueTrigger