import React, { useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
        toast.success("Login Successful");
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
    } catch (error: any) {
      if (
        (error.response && error.response.status === 404) ||
        error.response.status === 401
      ) {
        toast.error(error.response.data || "Unauthorized");
        localStorage.removeItem("token");
      } else {
        console.error("Error during login:", error);
        localStorage.removeItem("token");
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gray-100">
    {/* Left Side */}
<div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700 dark:from-gray-800 dark:to-gray-900 text-white p-10 relative">
  <div className="z-10 text-center space-y-6">
    <h1 className="text-4xl font-bold leading-tight">Welcome Back!</h1>
    <p className="text-lg font-medium">
      Login to manage your employees, projects, and more.
    </p>
  </div>
  {/* Decorative SVG background */}
  <svg
    className="absolute w-full h-full top-0 left-0 opacity-20 z-0"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#ffffff"
      className="dark:fill-gray-700"
      d="M50.8,-68.2C65.2,-60.7,75.2,-43.2,75.6,-26.6C76,-10,66.8,5.7,59.2,20.9C51.5,36.1,45.3,50.8,34.2,59.2C23.1,67.7,7.1,70,-10.4,73.3C-27.8,76.6,-55.5,80.8,-69.8,69.5C-84.1,58.1,-84.9,31.2,-80.4,9.3C-76,-12.6,-66.4,-29.6,-54.5,-38.5C-42.6,-47.5,-28.5,-48.5,-15.4,-57.8C-2.3,-67.1,9.8,-84.7,23.4,-86.3C37.1,-87.9,52.4,-73.6,50.8,-68.2Z"
      transform="translate(100 100)"
    />
  </svg>
</div>

      {/* Right Form Side */}
      <div className="flex items-center justify-center p-6 dark:bg-primary1">
        <div className="bg-white dark:bg-slate-900 shadow-2xl rounded-2xl w-full max-w-md p-8 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
              Login to Your Account
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  {...register("email", { required: true })}
                  className="w-full pl-10 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">Email is required</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={hideEye ? "password" : "text"}
                  {...register("password", { required: true })}
                  className="w-full pl-10 pr-10 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="••••••••"
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={() => setHideEye(!hideEye)}
                >
                  {hideEye ? (
                    <IoMdEyeOff className="text-gray-400" />
                  ) : (
                    <IoMdEye className="text-gray-400" />
                  )}
                </div>
              </div>
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">
                  Password is required
                </p>
              )}
              <div className="text-right mt-2">
                <Link
                  to="/forgotpassword"
                  className="text-blue-600 text-sm hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                {isSubmitting ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
