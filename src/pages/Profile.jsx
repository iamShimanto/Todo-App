import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { ToastContainer } from "react-toastify";
import { loggedUser } from "../store/slices/authSlice";
// import { loggedUser } from "../store/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userData.value);
  console.log(userInfo);

  // ============== user logout
  const handleLogout = () => {
    dispatch(loggedUser(null));
  };

  return (
    <div>
      <div className="h-screen w-dvw flex items-center justify-center bg-[#0F1012] px-50 z-10">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="bg-[#16181C] p-8 rounded-xl shadow-2xl w-full max-w-xl transform transition-all hover:scale-[1.01]">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-[#7289DA] mb-2">Profile</h2>
          </div>
          <div>
            <img
              className="w-20 h-20 rounded-full mx-auto"
              src={userInfo.photoURL}
              alt="profile"
            />

            <h2 className="text-3xl text-white font-semibold font-roboto my-5 capitalize flex justify-center items-center gap-2">
              {userInfo.displayName}
              <FaRegEdit
                className="cursor-pointer"
                // onClick={() => handleEnableEdit(user)}
              />
            </h2>

            <div className="flex justify-center items-center gap-1">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-white hover:text-black duration-300"
              >
                Log Out
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-white hover:text-black duration-300">
                Reset Password
              </button>
              <button className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-white hover:text-black duration-300">
                Delete Account
              </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-[#99AAB5]">
              Return Home?{" "}
              <Link
                to="/"
                className="text-[#7289DA] hover:text-[#5869a6] font-semibold hover:underline"
              >
                Home
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
