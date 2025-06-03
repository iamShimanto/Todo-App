import { useEffect, useState } from "react";
import {
  deleteUser,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";

const Home = () => {
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [dataErr, setDataErr] = useState("");
  const [editDataErr, setEditDataErr] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedValue, setEditedValue] = useState({
    todoitem: "",
    id: "",
    uid: "",
  });
  const [user, setUser] = useState({
    username: "",
    uid: "",
    email: "",
    photo: "",
  });
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

  const handleLogout = () => {
    signOut(auth).then(() => {
      toast.success("LogOut Successfull!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    });
  };

  const handleSubmit = () => {
    if (data) {
      set(push(ref(db, "todolist/")), {
        todoitem: data,
        email: user.email,
      });
    }
  };

  const handleEnableEdit = (data) => {
    setIsEdit(true);
    setEditedValue(data);
    setDataErr("");
  };

  const handleUpdate = () => {
    if (!(editedValue.todoitem == "")) {
      update(ref(db, "todolist/" + editedValue.id), {
        todoitem: editedValue.todoitem,
      });
      setIsEdit(false);
    } else {
      setEditDataErr("Enter Your ToDo Data");
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      onValue(ref(db, "todolist/"), (snapshot) => {
        let arr = [];
        snapshot.forEach((item) => {
          if (item.val().email === user.email) {
            arr.push({ ...item.val(), id: item.key });
          }
        });
        setTodoList(arr);
      });
    });
  }, []);


  // console.log(user.ema)
  const handleDelete = (data) => {
    remove(ref(db, "todolist/" + data.id));
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!data) {
      setDataErr("Enter your ToDo Data");
    } else {
      setData("");
    }
  };

  return (
    <div className="main relative">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="absolute top-3 left-10 flex flex-col items-center">
        <img className="w-20 h-20 rounded-full" src={user.photo} alt="user" />
        <h3 className="capitalize text-2xl font-semibold text-white font-roboto">
          {user.username}
        </h3>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-black text-white rounded-lg cursor-pointer border-[5px] border-black hover:bg-white hover:text-black duration-300"
        >
          LogOut
        </button>
      </div>
      <button onClick={handleDeleteUser} className="btn absolute top-3 right-6">
        Delete Accout
      </button>
      <div className="heading mb-15">
        <h1>ToDo List</h1>
      </div>
      <form onSubmit={handleSubmitForm}>
        <input
          className="input"
          type="text"
          onChange={(e) => {
            setData(e.target.value), setDataErr("");
          }}
          value={data}
          placeholder={dataErr}
        />
        <button className="button" onClick={handleSubmit}>
          Submit
        </button>
      </form>
      {todoList.length > 0 && (
        <ul className="ul">
          {todoList.map((item) => (
            <li key={item.id}>
              {isEdit && editedValue.id === item.id ? (
                <input
                  className="editInput"
                  type="text"
                  onChange={(e) =>
                    setEditedValue((prev) => ({
                      ...prev,
                      todoitem: e.target.value,
                    }))
                  }
                  value={editedValue.todoitem}
                  placeholder={editDataErr}
                />
              ) : (
                user.email === item.email && item.todoitem
              )}
              {user.email === item.email && (
                <div>
                  <button
                    className="btn"
                    onClick={() =>
                      isEdit ? handleUpdate() : handleEnableEdit(item)
                    }
                  >
                    {isEdit && editedValue.id === item.id ? "update" : "edit"}
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      isEdit ? setIsEdit(false) : handleDelete(item)
                    }
                  >
                    {isEdit && editedValue.id === item.id ? "Cancel" : "Delete"}
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
