import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';


const LoadingBar = ({stage, msg}) => {
    const [progress, setProgress] = useState(0);


    

    useEffect(() => {
        setProgress(stage*20)
    },[stage])


    const handleButtonClick = () => {
        if (progress < 100) {
            setProgress(progress + 20);
        }
    }

    const handleButtonReset = () => {
        setProgress(0);
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
        <AnimatePresence>
        <motion.h2 className='mb-4 text-3xl text-white font-bold'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: -20 }}
        >{msg}</motion.h2>
        </AnimatePresence>
        <div className='progress-bar h-5 bg-white rounded-lg mb-4 shadow-lg overflow-hidden'>
            <div className='progress-bar-fill h-full rounded-lg bg-red transition-all ease-in duration-500 ' style = {{width : `${progress}%`, backgroundColor: getColor()}}>
           
            </div>
        </div>

        <div className='progress-label'>{progress}%</div>
        <div className='flex justify-between mt-4'>
            
        </div>
        
    </div>
  )
}

export default LoadingBar