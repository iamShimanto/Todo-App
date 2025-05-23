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
  }, [db]);

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
        {dataErr && <p>{dataErr}</p>}
        <input
          type="text"
          onChange={(e) => {
            isEdit
              ? setEditedValue((prev) => ({
                  ...prev,
                  todoitem: e.target.value,
                }))
              : setData(e.target.value),
              setDataErr("");
          }}
          value={isEdit ? editedValue.todoitem : data}
        />
        {isEdit ? (
          <>
            <button onClick={handleUpdate}>update</button>
            <button onClick={() => setIsEdit(false)}>
              Cancel
            </button>
          </>
        ) : (
          <button onClick={handleSubmit}>Submit</button>
        )}
      </form>

      <ul>
        {todoList.map((item) => (
          <li key={item.id}>
            {item.todoitem}
            <div>
              <button className="btn" onClick={() => handleEnableEdit(item)}>
                Edit
              </button>
              <button className="btn" onClick={() => handleDelete(item)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
