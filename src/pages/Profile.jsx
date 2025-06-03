import {
  deleteUser,
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";

const Profile = () => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState(false);
  const [updateName, setUpdateName] = useState({
    username: "",
  });

  const [user, setUser] = useState({
    username: "",
    uid: "",
    email: "",
    photo: "",
  });

  // ============= user data
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          username: user.displayName,
          uid: user.uid,
          email: user.email,
          photo: user.photoURL,
        });
      }
    });
  }, []);

  // ============== delete user
  const handleDeleteUser = () => {
    const user = auth.currentUser;
    deleteUser(user)
      .then(() => {
        toast.success("Account Deleted Successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // ============== user logout
  const handleLogout = () => {
    signOut(auth).then(() => {
      toast.success("LogOut Successfull!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    });
  };

  // ========== enable username edit
  const handleEnableEdit = (user) => {
    setIsEdit(true);
    setUpdateName(user);
  };

  //============ update username
  const handleUpdate = () => {
    updateProfile(auth.currentUser, {
      displayName: updateName.username,
    }).then(() => {
      toast.success("Username Updating!");
      setTimeout(() => {
        navigate("/todo");
      }, 2000);
    });
    setIsEdit(false);
  };

  return (
    <div>
      <div className="h-screen w-dvw flex items-center justify-center bg-[#0F1012] px-50 z-50">
        <ToastContainer position="top-right" autoClose={2000} />
        <div className="bg-[#16181C] p-8 rounded-xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01]">
          <div className="mb-8 text-center">
            <h2 className="text-4xl font-bold text-[#7289DA] mb-2">Profile</h2>
          </div>
          <div>
            <img
              className="w-20 h-20 rounded-full mx-auto"
              src="images/default.png"
              alt="profile"
            />
            {isEdit ? (
              <div className="flex justify-center gap-2 my-4.5">
                <input
                  className="text-white border outline-0 text-base font-semibold placeholder:text-sm text-center rounded-lg"
                  type="text"
                  value={updateName.username}
                  onChange={(e) =>
                    setUpdateName((prev) => ({
                      ...prev,
                      username: e.target.value,
                    }))
                  }
                />
                <button
                  onClick={handleUpdate}
                  className="px-2 py-1 bg-black text-white cursor-pointer hover:bg-white hover:text-black duration-300 rounded-lg"
                >
                  Update
                </button>
                <button
                  onClick={() => setIsEdit(false)}
                  className="px-3 py-2 bg-black text-white cursor-pointer hover:bg-white hover:text-black duration-300 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <h2 className="text-3xl text-white font-semibold font-roboto my-5 capitalize flex justify-center items-center gap-2">
                {user.username}
                <FaRegEdit
                  className="cursor-pointer"
                  onClick={() => handleEnableEdit(user)}
                />
              </h2>
            )}
            <div className="flex justify-center items-center gap-3">
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-white hover:text-black duration-300"
              >
                Log Out
              </button>
              <button
                onClick={handleDeleteUser}
                className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer hover:bg-white hover:text-black duration-300"
              >
                Delete Account
              </button>
            </div>
          </div>
          <div className="mt-8 text-center">
            <p className="text-[#99AAB5]">
              Return Home?{" "}
              <Link
                to="/todo"
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
