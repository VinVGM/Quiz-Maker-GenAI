import React from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { GlobalStateContext} from '../GlobalStateContext';
const Question = ({q}) => {

    const [selectedOpt, setSelectedOpt] = React.useState(null);
    const [isCorrect, setIsCorrect] = React.useState(null);
    const [prevSet, setPrevSet] = React.useState(false);


    const {score, setScore} = React.useContext(GlobalStateContext);

    const handleClick = (q, option) => {
        setSelectedOpt(option);
        //console.log(`Question ID: ${q.id}, Selected Option: ${q.options.indexOf(option) + 1}, Correct Option: ${q.correct_option_id}`);
        if(option === q.correct_option) {
            
                
            setIsCorrect(true);
            if(prevSet === false){    
                setScore(score+1)
            }
            setPrevSet(true)

            
        }else{
            
            setIsCorrect(false);
            if(prevSet){
                setScore(score-1)
                setPrevSet(false)
            }
        }
    }
  
  
    return (
    <motion.div className='flex gap-4 max-w-2xl md:max-w-7xl p-10'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
    >
        
        <div className='border-[2px] border-[#034c52] p-2 rounded-lg flex flex-col gap-2'>
            <div className='flex items-end gap-2'>
                <p className='text-1xl font-bold'>{q.id}.</p>
                <div className='rounded-lg p-2 border-[#034c52] border-[5px] bg-white'>
                    <h2 className='text-2xl'>{q.question}</h2>
                </div>
            </div>

            <div className='flex flex-col gap-2'>
                {q.options.map((option) => (
                    <button disabled={selectedOpt !== null} key={option.id} onClick={() => handleClick(q, option)}
                        className={` ${selectedOpt === option ? (isCorrect ? '!bg-green-500' : '!bg-red-500') : '!bg-[#034c52]'}`}
                    >{option}</button>
                ))}
            </div>

            <div className='flex items-center justify-center'>
                
                {isCorrect && (
                    <motion.p className={`text-1xl font-bold bg-black pl-4 pr-4 pt-1 pb-2 rounded-4xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, y: -20 }}
                    >Correct</motion.p>
                )}

                {isCorrect === false && (
                    <motion.p className={`text-1xl font-bold bg-black pl-4 pr-4 pt-1 pb-2 rounded-4xl ${isCorrect ? 'text-green-500' : 'text-red-500'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0, y: -20 }}
                    >Wrong.. Correct Option: {q.correct_option}</motion.p>
                )}
                
            </div>
            
        </div>
    </motion.div>
  )
}

export default Question