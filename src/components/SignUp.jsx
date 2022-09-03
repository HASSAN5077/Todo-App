import React from "react";
import { useState } from "react";
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
const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    const user = createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        updateProfile(user, { displayName: name });
        toast("User created successfully", { type: "success" });
      })
      .catch((e) => {
        if (e.message.includes("email-already-in-use")) {
          toast("User already exist", { type: "error" });
        }
      });
  };
  const handleGoogleLogin = async () => {
    const user = await signInWithPopup(auth, new GoogleAuthProvider());
    toast("Login successfully", { type: "success" });
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="md:w-1/3 sm:w-1/2 w-[90%] bg-gray-800 rounded-3xl p-5">
        <h2 className="font-extrabold text-transparent text-4xl bg-clip-text text-center pb-3 bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-600 uppercase">
          Welcome to Todo App
        </h2>
        <form
          action=""
          className="mt-12"
          onSubmit={handleSignUp}
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
            <div className="rounded-full py-2 px-4 w-full border-2 border-gray-700 flex items-center">
              <AiOutlineUser size={30} color="#fff" className="mr-3" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="email"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
                required
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="email"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Email
            </label>
            <div className="rounded-full py-2 px-4 w-full border-2 border-gray-700 flex items-center ">
              <AiOutlineMail size={30} color="#fff" className="mr-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
                required
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Password
            </label>
            <div className="rounded-full py-2 px-4 w-full border-2 border-gray-700 flex items-center">
              <AiFillLock size={30} color="#fff" className="mr-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="email"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
                required
              />
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="confirmPassword"
              className="text-gray-300 block
            mb-2 text-2xl"
            >
              Confirm Password
            </label>
            <div className="rounded-full py-2 px-4 w-full border-2 border-gray-700 flex items-center ">
              <AiFillLock size={30} color="#fff" className="mr-3" />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirmPassword"
                className=" outline-none bg-transparent text-gray-300 text-lg w-full"
                required
              />
            </div>
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
