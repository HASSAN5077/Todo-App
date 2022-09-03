import { sendPasswordResetEmail, updatePassword } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth } from "../firebase";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email);
    toast("Reset password link sent to your email", { type: "success" });
  };

  return (
    <div className="mt-10 flex items-center justify-center flex-col">
      <form
        action=""
        onSubmit={handleSubmit}
        className="flex-col flex items-center justify-center md:w-1/2 sm:w-2/3 w-10/12"
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email..."
          className="outline-none bg-transparent border-2 rounded py-2 px-3 text-lg w-full text-gray-300"
          required
        />
        <button
          type="submit"
          className="text-gray-200 mt-10 border-2 border-gray-500 py-2 px-5 text-lg rounded-md"
        >
          Send
        </button>
      </form>
      {/* <h3 className="text-gray-200 text-center text-3xl">
        We have send you email for password reset. Check your email!
      </h3> */}
    </div>
  );
};

export default ForgotPassword;
