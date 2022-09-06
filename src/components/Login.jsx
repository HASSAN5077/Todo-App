import React, { useState } from "react";
import { AiOutlineUser, AiFillLock } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { loginSchema } from "./schemas";
import { useFormik } from "formik";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, action) => {
      try {
        const user = await signInWithEmailAndPassword(
          auth,
          values.name,
          values.password
        );
        if (user) {
          toast("Login successfully", { type: "success" });
        }
      } catch (e) {
        toast("Invalid Credentials", { type: "error" });
      }
    },
  });

  const handleGoogleLogin = () => {
    const user = signInWithPopup(auth, new GoogleAuthProvider());
  };
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col">
      <div className="lg:w-1/3 sm:w-2/3 w-[90%] bg-gray-800 rounded-2xl p-5">
        <h1 className="font-extrabold text-transparent lg:text-6xl sm:5xl text-4xl bg-clip-text text-center pb-3 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-600 uppercase">
          Login
        </h1>
        <form onSubmit={handleSubmit} className="mt-12" autoComplete="off">
          <div>
            <label
              htmlFor="email"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Email
            </label>
            <div className="rounded-md py-2 px-4 w-full border-2 border-gray-700 flex items-center">
              <AiOutlineUser size={30} color="#fff" className="mr-3" />
              <input
                type="email"
                value={values.email}
                onChange={handleChange}
                name="email"
                id="email"
                className="outline-none bg-transparent text-gray-300 text-lg w-full"
              />
            </div>
            {errors.email && touched.email ? (
              <p className="text-red-500 pl-5 mt-1">{errors.email}</p>
            ) : null}
          </div>
          <div className="mt-5">
            <label
              htmlFor="password"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Password
            </label>
            <div className="rounded-md py-2 px-4 w-full border-2 border-gray-700 flex items-center ">
              <AiFillLock size={30} color="#fff" className="mr-3" />
              <input
                type="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                id="password"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
              />
            </div>
            {errors.password && touched.password ? (
              <p className="text-red-500 pl-5 mt-1">{errors.password}</p>
            ) : null}
          </div>
          <Link
            to="/forgotPassword"
            className="text-blue-300 mt-2 cursor-pointer"
          >
            Forgot password?
          </Link>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 rounded-full w-full mt-5 py-2 text-3xl text-gray-100 pt-0"
          >
            Login
          </button>
        </form>
        <div className="flex gap-2 items-center mt-3">
          <hr className="w-full" />
          <p className="text-2xl text-gray-300">OR</p> <hr className="w-full" />
        </div>
        <button
          className="bg-rose-700 rounded-full w-full mt-5 py-2 text-2xl text-gray-100 pt-0 flex items-center justify-center"
          onClick={handleGoogleLogin}
        >
          <FcGoogle className="mr-2" /> Login with Google
        </button>
      </div>
      <p className="text-gray-300 mt-2 text-lg">
        Do not have account?{" "}
        <Link to="/signUp" className="text-cyan-400">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default Login;
