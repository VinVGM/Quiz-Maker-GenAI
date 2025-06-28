import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { AnimatePresence, easeInOut, motion, propEffect } from 'framer-motion';


const LoadingBar = ({stage, msg}) => {
    const [progress, setProgress] = useState(0);

    const [finished, setFinished] = useState(false);

    

    useEffect(() => {
        setProgress(stage*20)
        if(stage === 5){
            disableDots()
        }
    },[stage])


    const disableDots = () => {
        setFinished(true);
    }
    const getColor = () =>{
        if(progress < 50){
            return '#00edaa';
        } else if (progress < 80) {
            return 'green';
        } else {
            return '#034c52';
        }
    }


return (
    <div className='container w-100 md:max-w-3xl'>
        <AnimatePresence mode="wait">
            <motion.h2
                key={msg}
                className='mb-4 text-3xl text-white font-bold'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease:"easeInOut" }}
                exit={{ opacity: 0, y: 20 }}
            >
                {msg}
            </motion.h2>
        </AnimatePresence>

        <div className='progress-bar h-5 bg-white rounded-lg mb-4 shadow-lg overflow-hidden'>
            <div
                className='progress-bar-fill h-full rounded-lg bg-red transition-all ease-in duration-500'
                style={{ width: `${progress}%`, backgroundColor: getColor() }}
            ></div>
        </div>

        <div className='progress-label'>{progress}%</div>
        <div className='flex justify-between mt-4'>
            <AnimatePresence>
                {!finished && (
                    <motion.div
                        className='flex mt-2 space-x-2 justify-center items-center'
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ ease: easeInOut }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className='h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                        <div className='h-5 w-5 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                        <div className='h-5 w-5 bg-black rounded-full animate-bounce'></div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    </div>
)
}

export default LoadingBar