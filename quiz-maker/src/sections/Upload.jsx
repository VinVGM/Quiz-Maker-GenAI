import React, { use, useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Dropzone from 'react-dropzone'
import { Dropdown } from 'primereact/dropdown';
import DropZone from '../components/DropZone'
import { AnimatePresence, easeIn, motion } from 'motion/react';
import { io } from "socket.io-client"
import { GlobalStateContext } from '../GlobalStateContext';
import { useEffect } from 'react';
import LoadingBar from '../components/LoadingBar';
import axios from 'axios';

const socket = io("https://quiz-maker-genai.onrender.com")

const Upload = () => {
    const navigate = useNavigate();

    const {isAllowed, setIsAllowed} = useContext(GlobalStateContext);
    const [selectedNo, setSelectedNo] = React.useState(null);
    const [isUploaded, setIsUploaded] = useState(false);
   
    const [progress, setProgress] = useState(0)
    const [progMsg, setProgMsg] = useState("")

    const [key, setKey] = useState(0)


    const onSubmit = (file) => {
        setIsUploaded(true);
        handleSubmit(file, selectedNo)
    }




    useEffect(() => {
        if(!isAllowed) {
            navigate('/home');
        }
        
        socket.on("progress", (data) => {
        setProgress(data.stage);
        setProgMsg(data.message);
        
        });

        return () => {
            socket.off("progress");
        };
    }, [isAllowed, navigate]);

    
    
    
    const No = [
        { name: '1', code: '1' },
        { name: '2', code: '2' },
        { name: '3', code: '3' },
        { name: '4', code: '4' },
        { name: '5', code: '5' }
    ]


    const handleSubmit = async (file,selectedNo) => {
        

        const formData = new FormData();
        formData.append("file", file);
        formData.append("number", selectedNo.code)

        

        try {
            const response = await axios.post("https://quiz-maker-genai.onrender.com/upload", formData, {
                headers: {
                    "Content-Type" : "multipart/form-data"
                }
            });
            
        }catch(error){
            console.error(error);
            alert("Error uploading file. Please try again.");
            navigate('/');
            setIsUploaded(false);
        }
    }


    const handleQuizClick = () => {
        navigate('/quiz');
    }




  return (
    <>
      <AnimatePresence>
        {!isUploaded && (
            <motion.div className='flex flex-col lg:flex-row gap-10 lg:gap-5 h-screen w-screen items-center justify-center pl-20 pr-20'
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, y: -50 }}
            >
                <div>
                    <p className='text-[1.5rem] w-100 md:text-[1.5rem]  md:w-150 font-bold  text-white '> 
                        Upload you notes as PDF here, Our AI will read it throughly for you and generate the required no. of questions based on the content of the PDF.
                    </p>
                </div>
                <div className=' h-5xl'>
                    <form onSubmit={(e) => {
                        e.preventDefault(); 
                        
                        // Now get the form data as you regularly would
                        const formData = new FormData(e.currentTarget);
                        const file =  formData.get("my-file");
                        
                        
                        onSubmit(file);
                        

                    }} className='flex flex-col gap-2 justify-center w-[20rem] mx-auto'>
                    <DropZone name ="my-file" required/>
                    
                    <div className="card flex justify-content-center">
                        <Dropdown value={selectedNo} required onChange={(e) => setSelectedNo(e.value)} options={No} optionLabel="name" 
                        placeholder="No. of Questions?" className="w-full bg-[#034c52] border-1 border-black rounded-lg p-2.5 text-white font-bold"
                        panelClassName='bg-[#034c52] border-1 border-black rounded-lg p-2.5 text-white ' />
                    </div>
                    
                    <button type="submit" className='mt-2 w-full'>Submit</button>
                </form>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {isUploaded && (

          <div className='flex flex-col items-center justify-center h-screen w-screen gap-5'>
                
                <LoadingBar stage={progress} msg={progMsg}/>
                {progress === 5 && (
                    <motion.button
                        initial = {{opacity:0, y:-10}}
                        animate = {{opacity:1, y:0}}
                        transition={{duration:0.5, ease:'easeIn'}}
                        className='absolute bottom-20 h-40 w-50'
                        onClick={handleQuizClick}
                    >Take the quiz</motion.button>
                )}
          </div>

      )}
    </>
  )
}

export default Upload