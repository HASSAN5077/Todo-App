import { sendEmailVerification } from "firebase/auth";
import React from "react";
import { useStateValue } from "../ContextApi";
import { auth } from "../firebase";

const EmailVerification = () => {
  const [{ user }] = useStateValue();
  const handleSendEmail = () => {
    sendEmailVerification(auth.currentUser);
  };
  return (
    <div>
      <h3 className="text-center text-4xl mt-5 text-gray-50 ">
        Welcome {user && user.displayName}!
      </h3>
      <div className="flex items-center justify-center">
        <div className="mt-24 border-2 py-3 px-3 w-[30rem] flex flex-col justify-center items-center rounded-lg">
          <p className="text-gray-300 text-center text-lg">
            Your account is not verified. Please verify first..
          </p>
          <button
            className="py-2 px-5 text-gray-300 text-lg mt-5 bg-cyan-600 rounded-lg hover:bg-cyan-700"
            onClick={handleSendEmail}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
