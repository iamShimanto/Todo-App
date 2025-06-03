import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link, useNavigate } from "react-router";

const Reset = () => {
  const auth = getAuth();
  const [email, SetEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Password reset email sent!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch(() => {
        toast.error("Enter Your Email!");
      });
  };

  return (
    <>
      <div className="min-h-screen w-150 flex items-center justify-center px-4">
        <ToastContainer position="top-right" autoClose={5000} />
        <div className="bg-[#16181C] p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-[#7289DA] mb-2">
              Reset Password
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99AAB5] group-hover:text-[#7289DA] transition-colors" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={(e) => SetEmail(e.target.value)}
                className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]"
               rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#7289DA] text-white rounded-lg font-semibold hover:bg-[#5869a6] transform transition-all hover:scale-[1.02] focus:scale-[0.98] active:scale-[0.98] cursor-pointer"
            >
              Reset Password
            </button>
          </form>
          <div className="mt-8 text-center">
            <p className="text-[#99AAB5]">
              Return to Sing In?{" "}
              <Link
                to="/"
                className="text-[#7289DA] hover:text-[#5869a6] font-semibold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reset;
