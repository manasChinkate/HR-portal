import React from 'react'
import session from '../../assets/session.svg'
import { Link } from 'react-router-dom'


const SessionOut = () => {
    return (
        <div className=' h-screen w-full flex flex-col  items-center justify-center bg-gradient-to-t dark:bg-secondary1 to-white from-blue-200'>
            <div className='flex flex-col gap-4 items-center'>

                <h1 className=' text-5xl font-bold '>Session Out</h1>
                <p>Please login with your credentials <Link className=' text-blue-500 font-semibold text-xl' to={'/login'}>Log In</Link></p>
            </div>
            <img className=' h-72' src={session} alt="" />

        </div>
    )
}

export default SessionOut