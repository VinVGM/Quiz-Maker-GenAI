import React from 'react'
import { BoxReveal } from '../components/BoxReveal'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate('/quiz_upload')
    }

  return (
    <div className='flex h-screen w-screen items-center justify-center gap-100 '>
        <div className="flex flex-col justify-center items-center sm:items-start">
            <BoxReveal boxColor={"#5046e6"} duration={1}>
                <p className="text-[5rem] font-bold">
                Quiz Master<span className="text-[#5046e6]"></span>
                </p>
            </BoxReveal>
        
            <BoxReveal boxColor={"#5046e6"} duration={1}>
                <h2 className="mt-[.5rem] text-[2rem] w-2xl">
                    Use AI to create quizzes in seconds with the power of Generative AI!
                </h2>
            </BoxReveal>
        
        </div>

    
      <motion.div className='flex items-center justify-center'
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <button onClick={handleClick}> Lets Start Quizzing! </button>
      </motion.div>
      
 
      
 
      
    
    </div>  
  )
}

export default LandingPage