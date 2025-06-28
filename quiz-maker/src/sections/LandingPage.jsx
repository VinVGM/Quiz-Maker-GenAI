import React from 'react'
import { BoxReveal } from '../components/BoxReveal'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { GlobalStateContext } from '../GlobalStateContext'

const LandingPage = () => {
    const navigate = useNavigate()

    const {isAllowed, setIsAllowed} = useContext(GlobalStateContext);
    const handleClick = () => {
        navigate('/quiz_upload')
        setIsAllowed(true);
    }

  return (
    <div className='flex flex-col md:flex-row gap-5 md:gap-[20rem] h-screen w-screen items-center justify-center md:pl-20 md:pr-20'>
        <div className="flex flex-col justify-center gap-5 items-center sm:items-start">
            <BoxReveal boxColor={"#5046e6"} duration={1}>
                <p className="text-[3rem] md:text-[5rem] font-bold">
                Quiz Master<span className="text-[#5046e6]"></span>
                </p>
            </BoxReveal>
        
            <BoxReveal boxColor={"#5046e6"} duration={1}>
                <h2 className="mt-[.5rem] text-[1.5rem] md:text-[2rem] w-100">
                    Use AI to create quizzes in seconds with the power of Generative AI!
                </h2>
            </BoxReveal>
        
        </div>

    
      <motion.div className='flex items-center justify-center mt-20 md:mt-0'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button className='h-15 w-30 md:h-full w-full' onClick={handleClick}> Lets Start Quizzing! </button>
      </motion.div>
      
 
      
 
      
    
    </div>  
  )
}

export default LandingPage