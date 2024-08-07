import React, { useState } from 'react'
import loginsvg from '../../assets/loginsvg.svg'
import login2 from '../../assets/login2.svg'
import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'


const Login = () => {
    const [hideEye, setHideEye] = useState(true);
    return (
        // <div className=' grid grid-cols-2 w-full h-screen'>
        //     <div className=' h-full bg-blue-500 object-contain flex items-center justify-center border-r-2'>
        //         <img className=' h-96 ' src={loginsvg} alt="" />
        //     </div>
        //     <div className=' h-full bg-white flex items-center justify-center'>

        //         <div className=' h-auto w-auto p-7  shadow-md flex items-center justify-center flex-col'>
        //             <img className=' w-52' src={logo} alt="" />
        //             <div className=' flex items-center flex-col justify-center'>
        //                 <h1 className=' text-2xl font-semibold text-blue-500'>Log In</h1>
        //                 <p className=' text-xs text-gray-400'>Login below with respecitve username</p>
        //             </div>
        //             <form>
        //                 <div className=' grid grid-cols-1 gap-4 mt-6 w-full text-sm '>
        //                     <div className=' flex flex-col gap-2 '>
        //                         <label>Username</label>
        //                         <input className=' placeholder:text-xs hover:border-gray-400    ease-in-out duration-500 py-2 pl-1 border rounded-md border-gray-200' placeholder=' Input 1'></input>
        //                     </div>
        //                     <div className=' flex flex-col gap-2'>
        //                         <label>Password</label>
        //                         <input className=' placeholder:text-xs hover:border-gray-400 ease-in-out duration-500 py-2 pl-1 border rounded-md border-gray-200' placeholder=' Input 1'></input>
        //                     </div>
        //                     <button className=' hover:bg-white hover:text-black hover:  bg-[#2E6D6A] py-2 text-white  rounded-md'>
        //                         Log In
        //                     </button>
        //                 </div>
        //             </form>
        //         </div>

        //     </div>

        // </div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <img
                src={login2}
                alt="login"
                className="hidden lg:block h-screen w-full bg-gradient-to-r from-blue-500 to-white "
            />

            <div className="h-screen flex flex-col mt- sm:mt-0 justify-center items-center gap-5 bg-white">
                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 ">
                    <img src={logo} alt="logo" className="w-32 object-contain" />
                    {/* <h4 className="text-xl md:text-2xl font-semibold">HR Portal</h4> */}
                </div>
                <div className="w-full lg:w-[45vw] md:w-[50vw] border-none ">
                    {/* <div className="w-[90%] rounded-lg bg-card text-card-foreground shadow-sm"> */}
                    <form
                        //   onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 p-5 shadow-sm"
                    >
                        <div>
                            <p className="text-2xl font-bold">Log in</p>
                            <p className="text-xs text-gray-600">Enter your credentials</p>
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    // {...register("username", { required: true })}
                                    id="email"
                                    type="text"
                                    autoComplete="email"
                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6 pl-4 `}
                                />
                            </div>
                            <span className="text-pink-700 text-sm">
                                {/* {errors.username?.message} */}
                            </span>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2 flex relative">
                                <input
                                    //   {...register("password", { required: true })}
                                    id="password"
                                    type={hideEye ? "password" : "text"}
                                    autoComplete="current-password"
                                    className={`relative block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6 pl-4 pr-10`} // Adjusted padding for the icon
                                />
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setHideEye(!hideEye)}>
                                    {hideEye ? (
                                        <IoMdEyeOff className="text-gray-500" />
                                    ) : (
                                        <IoMdEye className="text-gray-500" />
                                    )}
                                </div>
                            </div>
                            <span className="text-pink-700 text-sm">
                                {/* {errors.password?.message} */}
                            </span>

                            <div className="flex flex-col items-end space-y-2">
                                <Link
                                    to="/forgotpassword"
                                    id="password"
                                    type="password"
                                    className="capitalize text-blue-600 text-[0.85rem] mt-2"
                                >
                                    forgot password ?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login