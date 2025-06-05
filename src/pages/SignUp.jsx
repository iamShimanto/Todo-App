import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: user.username,
          photoURL: "images/bg.jpg",
        })
          .then(() => {
            sendEmailVerification(auth.currentUser).then(() => {
              toast.success("Sign Up Successfull! , Please verify Email!");
              setTimeout(() => {
                navigate("/");
              }, 2000);
            });
          })
          .catch(() => {});
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/invalid-email") {
          toast.error("Enter Your Valid E-mail!");
        }
        if (errorCode === "auth/email-already-in-use") {
          toast.error("Email is already Exist!");
        }
        if (errorCode === "auth/missing-password") {
          toast.error("Enter Your Password!");
        }
        if (errorCode === "auth/weak-password") {
          toast.error("Password need at least 6 Characters!");
        }
      });
  };
  // ============== google sign up
  const handleGoogle = () => {
    signInWithPopup(auth, provider).then(() => {
      navigate("/todo");
    });
  };

  // ============= github sign up
  const handleGithub = () => {
    signInWithPopup(auth, githubProvider)
      .then(() => {
        navigate("/todo");
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/account-exists-with-different-credential") {
          toast.error("This Email is already Exist!");
        }
      });
  };

  return (
    <div className="h-screen w-dvw flex items-center justify-center bg-[#0F1012] px-50 z-50">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="bg-[#16181C] p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-[#7289DA] mb-2">
            Create Account
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative group">
            <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99AAB5] group-hover:text-[#7289DA] transition-colors" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(e) => {
                setUser((prev) => ({ ...prev, username: e.target.value }));
              }}
              className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]"
               rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
            />
          </div>

          <div className="relative group">
            <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99AAB5] group-hover:text-[#7289DA] transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              onChange={(e) => {
                setUser((prev) => ({ ...prev, email: e.target.value }));
              }}
              className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2 border-[#2C2F33] rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
            />
          </div>

          <div className="relative group">
            <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#99AAB5] group-hover:text-[#7289DA] transition-colors" />
            <div>
              <input
                type={isOpen ? "password" : "text"}
                name="password"
                placeholder="Password"
                onChange={(e) => {
                  setUser((prev) => ({ ...prev, password: e.target.value }));
                }}
                className={`w-full pl-10 pr-4 py-4 bg-[#1E2124] border-2  "border-[#2C2F33]" rounded-lg text-white placeholder-[#99AAB5] focus:outline-none focus:border-[#7289DA] transition-all hover:border-[#7289DA]`}
              />
              {isOpen ? (
                <IoIosEyeOff
                  className="text-[#99AAB5] text-2xl absolute top-5 right-5 cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              ) : (
                <IoIosEye
                  className="text-[#99AAB5] text-2xl absolute top-5 right-5 cursor-pointer"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#7289DA] text-white rounded-lg font-semibold hover:bg-[#5869a6] transform transition-all hover:scale-[1.02] focus:scale-[0.98] active:scale-[0.98] cursor-pointer"
          >
            Create Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-[#99AAB5]">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-[#7289DA] hover:text-[#5869a6] font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </div>
        <p className="text-[#7289DA] my-3 text-center">Or Continue With</p>
        <hr className="text-white" />

        <div className="flex items-center justify-center gap-5">
          <button
            onClick={handleGithub}
            className="group relative mt-4 cursor-pointer outline-none border-none rounded-full flex flex-row items-center justify-center h-10 w-10 hover:!w-[100px] transition-all duration-[0.75s] before:content-[''] before:absolute before:w-full before:h-full before:inset-0 before:bg-[linear-gradient(130deg,#7209d4,#2832d4_33%,#00a5b2)] before:ring-4 before:ring-offset-4 before:ring-[#2832d4] before:rounded-full before:transition before:duration-300 before:ring-offset-[#fff] hover:before:scale-105 active:before:scale-95 text-white"
          >
            <svg
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute group-hover:left-1.5 group-active:left-[10px] duration-300 transition-[left] z-10 w-8 h-8 text-white"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
            <span className="absolute right-1.5 text-[15px] font-semibold [--w:calc(100%-48px)] w-[--w] max-w-[--w] overflow-hidden flex items-center justify-end -z-[1] group-hover:z-[9] pointer-events-none select-none opacity-0 group-hover:opacity-100 text-transparent group-hover:text-inherit group-active:right-2 transition-all duration-[2s] group-hover:duration-300 group-active:scale-[0.85]">
              Github
            </span>
          </button>
          <button onClick={handleGoogle} className="signin mt-4">
            <svg
              viewBox="0 0 256 262"
              preserveAspectRatio="xMidYMid"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                fill="#4285F4"
              ></path>
              <path
                d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                fill="#34A853"
              ></path>
              <path
                d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                fill="#FBBC05"
              ></path>
              <path
                d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                fill="#EB4335"
              ></path>
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
