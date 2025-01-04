import React from 'react'
import {  useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { IoIosArrowBack } from 'react-icons/io'

const BackButton = ({backnavigation}) => {

   const navigate = useNavigate()

   const NavigateFunction = ()=>{
        navigate(backnavigation || -1)
   }
    return (
        <Button onClick={NavigateFunction} className=' h-8'>
            <IoIosArrowBack />
            Back
        </Button>
    )
}

export default BackButton