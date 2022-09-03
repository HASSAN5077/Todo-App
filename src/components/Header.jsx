import React from "react";
import { useStateValue } from "../ContextApi";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [{ user }] = useStateValue();
  const navigate = useNavigate();
  const handleSignOut = (e) => {
    if (e.target.innerText === "Sign out") {
      auth.signOut();
      return;
    }
    navigate("/login");
  };
  return (
    <div className="flex justify-between items-center py-3 px-24 bg-slate-800">
      <h2 className="font-extrabold text-transparent text-3xl bg-clip-text text-center bg-gradient-to-r from-cyan-400 via-indigo-600 to-pink-600 uppercase">
        Todo App
      </h2>
      <div>
        <button
          className="py-1 px-4 font-bold text-lg rounded-lg cursor-pointer text-gray-300 bg-indigo-500 shadow-lg hover:bg-indigo-700"
          onClick={handleSignOut}
        >
          {user ? "Sign out" : "Sign in"}
        </button>
      </div>
    </div>
  );
};

export default Header;
