import React, { useState } from 'react'
import loginsvg from '../../assets/loginsvg.svg'
import login2 from '../../assets/login2.svg'
import logo from '../../assets/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdEye, IoMdEyeOff } from 'react-icons/io'
import axios from 'axios'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BASE_URL } from '../../constants'
import { RootState } from '../../../app/store'
import { useDispatch } from 'react-redux'
import { setauthority, setName ,setEmail,setCompany } from '../../../app/authslice'
import toast from 'react-hot-toast'



type Inputs = {
    email: string,
    password: string
}

interface response {

    authority: string,
    email: string,
    name: string,
    token: string

}


const Login = () => {

    
    const [resdata, setresdata] = useState<response[]>([])
    const navigate = useNavigate() 
    const dispatch = useDispatch() 
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await axios.post(`${BASE_URL}/login`, data);

            if (res.status === 200 && res?.data?.token) {
                toast.success("Login Successfully")
                // setResData(res.data); // Assuming setResData is a function to update state
                dispatch(setauthority(res.data.authority))
                dispatch(setName(res.data.name))
                dispatch(setCompany(res.data.companyName))
                dispatch(setEmail(res.data.email))
                localStorage.setItem('token', res.data.token);
                navigate('/')

            } else if(res.status === 401) {
                console.log("error")
                localStorage.removeItem('token');
                toast.error(res.data)
            }

            // console.log(res?.data);
        } catch (error: any) { // Catch the error as any type, since axios errors have a response object
            if (error.response && error.response.status === 401) {
                toast.error(error.response.data || "Unauthorized"); // Show the error message from the response
                localStorage.removeItem('token');
            } else {
                console.error("Error during login:", error);
                localStorage.removeItem('token');
                toast.error("An unexpected error occurred");
            }
        }
    };




    const [hideEye, setHideEye] = useState(true);
    return (

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
                        onSubmit={handleSubmit(onSubmit)}
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
                                    {...register("email", { required: true })}
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
                                    {...register("password", { required: true })}
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