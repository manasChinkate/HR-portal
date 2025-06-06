import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import login2 from "../../assets/login2.svg";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { useDispatch } from "react-redux";
import {
  setauthority,
  setCompany,
  setCompanyId,
  setEmail,
  setName,
  setUserId,
} from "../../../app/authSlice";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [hideEye, setHideEye] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, data);

      if (res.status === 200 && res?.data?.token) {
        toast.success("Login Successfully");
        // setResData(res.data); // Assuming setResData is a function to update state
        dispatch(setauthority(res.data.authority));
        dispatch(setName(res.data.name));
        dispatch(setCompany(res.data.companyName));
        dispatch(setEmail(res.data.email));
        dispatch(setUserId(res.data.userId));
        dispatch(setCompanyId(res.data.companyId));
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("authority", res.data.authority);
        localStorage.setItem("userID", res.data.userId);
        navigate("/");
      }

      // console.log(res?.data);
    } catch (error: any) {
      // Catch the error as any type, since axios errors have a response object
      if (
        (error.response && error.response.status === 404) ||
        error.response.status === 401
      ) {
        toast.error(error.response.data || "Unauthorized"); // Show the error message from the response
        localStorage.removeItem("token");
      } else {
        console.error("Error during login:", error);
        localStorage.removeItem("token");
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:block dark:bg-primary1 h-screen w-full bg-gradient-to-r from-blue-500 to-white">
        <img
          src={login2}
          alt="login"
          className="hidden lg:block h-screen w-full bg-gradient-to-r from-blue-500 to-white "
        />
      </div>

      <div className="h-screen flex flex-col justify-center items-center gap-5 bg-white">
        <div className="w-full lg:w-[45vw] md:w-[50vw] border-none">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4 p-5 shadow-sm"
          >
            <div>
              <p className="text-2xl font-bold">Log in</p>
              <p className="text-xs text-gray-600">Enter your credentials</p>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email
              </label>
              <div className="mt-2 flex items-center relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  {...register("email", { required: true })}
                  id="email"
                  type="text"
                  autoComplete="email"
                  className="block w-full rounded-full border-0 py-3 pl-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
              </div>
              {errors.email && (
                <span className="text-pink-700 text-sm">Email is required</span>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2 flex items-center relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  {...register("password", { required: true })}
                  id="password"
                  type={hideEye ? "password" : "text"}
                  autoComplete="current-password"
                  className="block w-full rounded-full border-0 py-3 pl-10 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm sm:leading-6"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={() => setHideEye(!hideEye)}
                >
                  {hideEye ? (
                    <IoMdEyeOff className="text-gray-500" />
                  ) : (
                    <IoMdEye className="text-gray-500" />
                  )}
                </div>
              </div>
              {errors.password && (
                <span className="text-pink-700 text-sm">
                  Password is required
                </span>
              )}
              <div className="flex flex-col items-end space-y-2">
                <Link
                  to="/forgotpassword"
                  className="capitalize text-blue-600 text-[0.85rem] mt-2"
                >
                  forgot password?
                </Link>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                disabled={isSubmitting}
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary1 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
