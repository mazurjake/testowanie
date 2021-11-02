import React, { useState, useEffect } from 'react';
import { getAsyncData } from "../functions";

export const BasicFunctionalComponent = () =><div>hey dude</div>

export const PropsRenderingTest = ({name, color}) =><div className={color && color}>{name && name}</div>

export const AsyncDataComponent = ({func, condition }) => {
    const [data, setData] = useState(null)

    useEffect(()=>{
        if(condition) func()
        else {
            const dane = getAsyncData()
            setData(dane)
        }
    },[])

    return(
    <div>
        {data ? data.map((item, index)=>{return <div  key={index}> {item}</div>}): null}
    </div>)
}

export const TriggerEffect = ({func}) => {
    const [condition, setCondition] = useState(false)

    useEffect(()=>{
        func()
    },[condition])

    return(<div><button onClick={()=>{setCondition(!condition)}}></button></div>)
}


