import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
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
import { Link } from "react-router";
import { FaRegEdit, FaSave } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdCancel } from "react-icons/md";

const Home = () => {
  const db = getDatabase();
  const auth = getAuth();
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

  //============ data write
  const handleSubmit = () => {
    if (data) {
      set(push(ref(db, "todolist/")), {
        todoitem: data,
        email: user.email,
      });
    }
  };

  // =========== enable edit
  const handleEnableEdit = (data) => {
    setIsEdit(true);
    setEditedValue(data);
    setDataErr("");
  };

  // ============== data update
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

  // ============ data read
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

// =========== data delete
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
      <Link
        to="/profile"
        className="profile absolute top-10 left-10 cursor-pointer rounded-full flex items-center gap-2.5"
      >
        <img
          className="w-15 h-15 rounded-full"
          src={user.photo}
          alt="profile"
        />
        <h2 className="username overflow-hidden opacity-0 duration-300 -translate-x-15 capitalize font-roboto font-semibold text-2xl text-white">
          {user.username}
        </h2>
      </Link>
      <div className="heading">
        <h1>ToDo List</h1>
        <h2 className=" w-50 h-50 bg-white rounded-full flex justify-center items-center text-3xl font-roboto font-medium translate-x-30">
          Total: {todoList.length}
        </h2>
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
          <FaSave />
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
                    {isEdit && editedValue.id === item.id ? (
                      <FaSave />
                    ) : (
                      <FaRegEdit />
                    )}
                  </button>
                  <button
                    className="btn"
                    onClick={() =>
                      isEdit ? setIsEdit(false) : handleDelete(item)
                    }
                  >
                    {isEdit && editedValue.id === item.id ? (
                      <MdCancel />
                    ) : (
                      <RiDeleteBin6Line />
                    )}
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
