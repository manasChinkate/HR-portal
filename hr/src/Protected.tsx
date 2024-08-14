import React, { useEffect, useState } from 'react'
import { RootState } from '../../../app/store'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import {SyncLoader} from 'react-spinners'


const Protected = ({children}) => {
    const [loading,setloading]=useState(true)
    const navigate = useNavigate()

    const authority = useSelector((state: RootState) => state.auth.authority)

    const getAuthority =()=>{
        if(!authority){
            navigate('/session-out')
        }else{
            setloading(false)
        }
    }

    useEffect(()=>{
      getAuthority()
    },[])
  return (
    <div>{loading ? (<div className=' h-[90vh] flex items-center justify-center'><SyncLoader /></div>) : children }</div>
  )
}

export default Protected