import React, { useEffect, useState } from 'react'
import { GlobalStateContext } from '../GlobalStateContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Question from '../components/Question';


const Quiz = () => {

    const { isAllowed, setIsAllowed } = React.useContext(GlobalStateContext);
    const [questions, setQuestions] = useState([]);

    const { score, setScore } = React.useContext(GlobalStateContext);

    const navigate = useNavigate();

    useEffect(() => {
        if(!isAllowed){
            navigate('/')
        }

        axios.get('http://https://quiz-maker-genai.onrender.com:5000/questions')
             .then((response)=>{
                setQuestions(response.data)
                
             })
             .catch((error) => {
                console.error('Error fetching questions', error)
             })
        
        }, []);


    




  return (
    <div className='flex flex-col mt-70 w-screen items-center justify-center gap-10'>
        {questions.map((q) => (
            <Question key={q.id} q={q}></Question>
        ))}

        <div className='top-0 m-10 fixed h-30 w-30 md:h-50 md:w-50 flex flex-col rounded-lg items-center justify-center gap-2 bg-[#034c52] shadow-lg border-10'>
            <div className='bg-white h-10 w-20 md:h-30 md:w-30 rounded-full flex items-center justify-center'>
                <p className='text-2xl font-bold'>{score}/{questions.length}</p>
            </div>

            <p className='text-white font-bold'>Your Score</p>
        </div>
    </div>
  )
}

export default Quiz