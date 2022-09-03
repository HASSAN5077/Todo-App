import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./App.css";
import { useEffect } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./ContextApi";
import { useNavigate } from "react-router-dom";
import EmailVerification from "./pages/EmailVerification";
import ForgotPassword from "./pages/ForgotPassword";

function App() {
  const navigate = useNavigate();
  const [{}, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        dispatch({
          type: "SET_USER",
          user: currentUser,
        });

        navigate("/");
      } else {
        dispatch({
          type: "SET_USER",
          user: null,
        });
        navigate("/login");
      }
    });
  }, []);
  return (
    <div className="App bg-gray-900 h-screen">
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signUp" element={<SignUp />} />
        <Route exact path="/verifyEmail" element={<EmailVerification />} />
        <Route exact path="/forgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
}

export default App;
