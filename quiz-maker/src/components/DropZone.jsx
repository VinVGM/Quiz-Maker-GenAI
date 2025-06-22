
import React, {useState, useMemo, useRef, createRef} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {useDropzone} from 'react-dropzone';

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '100px',
  borderWidth: 2,
  borderRadius: 10,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#034c52',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out'
};

const focusedStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};



  const dropzoneRef = createRef();












function DropZone(props) {

    const {required, name} = props; 

    const hiddenInputRef = useRef(null);

    const [isSubmitted, setIsSubmitted] = useState(false);
    
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    open, 
    acceptedFiles
  } = useDropzone({
    accept: {'application/pdf': []},
    onDrop: (incomingFiles) => {
      if (hiddenInputRef.current) {
        // Note the specific way we need to munge the file into the hidden input
        // https://stackoverflow.com/a/68182158/1068446
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;

        setIsSubmitted(true);
        baseStyle.display = 'none'; // Hide the dropzone after submission
      }
    }
  });

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const openDialog = () => {
  // Note that the ref is set async,
  // so it might be null at some point 
  if (dropzoneRef.current) {
    dropzoneRef.current.open()
  }
};
  

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="flex flex-col gap-2">
        <AnimatePresence>
        <motion.div className={`flex-col gap-2  ${isSubmitted ? 'invisible absolute' : ''} `} {...getRootProps({ style })}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0, y: 20 }}
        >
          <input type="file" name={name} required={required} style={{ opacity: 0 }} ref={hiddenInputRef} />
          <input {...getInputProps()} />
          <p>Drag 'n' drop some files here</p>
          <button type="button" onClick={openDialog}>
            Open File Dialog
          </button>
        </motion.div>
        </AnimatePresence>
      

      {isSubmitted && (<motion.div className={`flex flex-col bg-[#034c52] rounded-lg p-2 border-style-dashed border-2 border-white-300 w-full `
        
      }
      initial={{ opacity: 0, y: 20 }}   
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <h4 className="">Files: </h4>
        <ul>{files}</ul>
      </motion.div>)}
    </div>
  );
}

export default DropZone