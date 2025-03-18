import React from 'react'
import { createContext,useContext,useState } from 'react'


const CounterContext=createContext()

export const CounterProvider=({children})=>{
    const [Count,setCount]=useState(0);
    return (
        <CounterContext.Provider value={{Count,setCount}}>
            {children}
        </CounterContext.Provider>
    )
} 

export const useCounter=()=>useContext(CounterContext)
