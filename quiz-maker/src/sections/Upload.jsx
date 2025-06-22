import React from 'react'
import Dropzone from 'react-dropzone'
import { Dropdown } from 'primereact/dropdown';
import DropZone from '../components/DropZone'


const Upload = () => {
    const [selectedNo, setSelectedNo] = React.useState(null);
    const No = [
        { name: '1', code: '1' },
        { name: '2', code: '2' },
        { name: '3', code: '3' },
        { name: '4', code: '4' },
        { name: '5', code: '5' }
    ]
  return (
    <div className='flex gap-5 h-screen w-screen items-center justify-center'>
        <div>
            <p className='text-3xl font-bold w-3xl text-white'> 
                Upload you notes as PDF here, Our AI will read it throughly for you and generate the required no. of questions based on the content of the PDF.
            </p>
        </div>
        <div className=' h-5xl'>
            <form onSubmit={(e) => {
                e.preventDefault(); 
                
                // Now get the form data as you regularly would
                const formData = new FormData(e.currentTarget);
                const file =  formData.get("my-file");
                alert(file.name + "with" + selectedNo.code); 
                console.log(file, selectedNo.code);

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
    </div>
  )
}

export default Upload