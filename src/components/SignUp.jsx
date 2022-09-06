import React from "react";
import { AiOutlineUser, AiFillLock, AiOutlineMail } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { signUpSchema } from "./schemas";

const initialValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = () => {
  const { values, errors, handleChange, handleSubmit, touched, handleBlur } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        const user = createUserWithEmailAndPassword(
          auth,
          values.email,
          values.password
        )
          .then(({ user }) => {
            updateProfile(user, { displayName: values.name });
            action.resetForm();
            toast("User created successfully", { type: "success" });
          })
          .catch((e) => {
            if (e.message.includes("email-already-in-use")) {
              toast("User already exist", { type: "error" });
            }
          });
      },
    });

  const handleGoogleLogin = async () => {
    const user = await signInWithPopup(auth, new GoogleAuthProvider());
    toast("Login successfully", { type: "success" });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="lg:w-1/3 sm:w-2/3 w-[90%] bg-gray-800 rounded-3xl p-5">
        <h2 className="font-extrabold text-transparent lg:text-4xl sm:3xl text-2xl bg-clip-text text-center pb-3 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-600 uppercase">
          Welcome to Todo App
        </h2>
        <form
          action=""
          className="mt-12"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <div>
            <label
              htmlFor="name"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Name
            </label>
            <div className="rounded-md py-2 px-4 w-full border-2 border-gray-700 flex items-center">
              <AiOutlineUser size={30} color="#fff" className="mr-3" />
              <input
                type="text"
                id="name"
                value={values.name}
                onChange={handleChange}
                name="name"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
              />
            </div>
            {errors.name && touched.name ? (
              <p className="text-red-500 pl-5 mt-1">{errors.name}</p>
            ) : null}
          </div>
          <div className="mt-3">
            <label
              htmlFor="email"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Email
            </label>
            <div className="rounded-md py-2 px-4 w-full border-2 border-gray-700 flex items-center ">
              <AiOutlineMail size={30} color="#fff" className="mr-3" />
              <input
                type="email"
                id="email"
                value={values.email}
                onChange={handleChange}
                name="email"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
              />
            </div>
            {errors.email && touched.email ? (
              <p className="text-red-500 pl-5 mt-1">{errors.email}</p>
            ) : null}
          </div>
          <div className="mt-3">
            <label
              htmlFor="password"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Password
            </label>
            <div className="rounded-md py-2 px-4 w-full border-2 border-gray-700 flex items-center">
              <AiFillLock size={30} color="#fff" className="mr-3" />
              <input
                type="password"
                value={values.password}
                onChange={handleChange}
                name="password"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
                id="password"
              />
            </div>
            {errors.password && touched.password ? (
              <p className="text-red-500 pl-5 mt-1">{errors.password}</p>
            ) : null}
          </div>
          <div className="mt-3">
            <label
              htmlFor="confirmPassword"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Confirm Password
            </label>
            <div className="rounded-md py-2 px-4 w-full border-2 border-gray-700 flex items-center ">
              <AiFillLock size={30} color="#fff" className="mr-3" />
              <input
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                name="confirmPassword"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
                id="confirmPassword"
                onBlur={handleBlur}
              />
            </div>
            {errors.confirmPassword && touched.confirmPassword ? (
              <p className="text-red-500 pl-5 mt-1">{errors.confirmPassword}</p>
            ) : null}
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-400 hover:from-teal-400 hover:to-blue-500 rounded-full w-full mt-5 py-2 text-3xl text-gray-100 pt-0"
          >
            Sign Up
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
    </div>
  );
};

export default SignUp;
