import { useEffect, useState } from "react";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

function App() {
  const db = getDatabase();
  const [data, setData] = useState("");
  const [dataErr, setDataErr] = useState("");
  const [editDataErr, setEditDataErr] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedValue, setEditedValue] = useState({
    todoitem: "",
    id: "",
  });

  const handleSubmit = () => {
    if (data) {
      set(push(ref(db, "todolist/")), {
        todoitem: data,
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
    onValue(ref(db, "todolist/"), (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setTodoList(arr);
    });
  }, []);

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
    <div className="main">
      <div className="heading">
        <h1>ToDo List</h1>
        <h2>Total: {todoList.length}</h2>
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
        <button onClick={handleSubmit}>Submit</button>
      </form>
      {todoList.length > 0 && (
        <ul>
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
                item.todoitem
              )}
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
