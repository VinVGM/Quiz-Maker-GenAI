import React from 'react'
import { createContext } from 'react';
import { useState } from 'react';

export const GlobalStateContext = createContext();


export const GlobalStateProvider = ({children}) => {
    const [isAllowed, setIsAllowed] = useState(false);
    const [score, setScore] = useState(0);
    return (
    <GlobalStateContext.Provider value={{isAllowed, setIsAllowed, score, setScore}}>
        {children}
    </GlobalStateContext.Provider>
  )
}

