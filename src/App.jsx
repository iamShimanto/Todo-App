import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

function App() {
  const db = getDatabase();
  const [data, setData] = useState("");
  const [dataErr, setDataErr] = useState("");
  const [todoList, setTodoList] = useState([]);

  const handleSubmit = () => {
    if (data) {
      set(push(ref(db, "todolist/")), {
        todoitem: data,
      });
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

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (!data) {
      setDataErr("Enter your ToDo Data");
    } else {
      setData("");
    }
  };

  return (
    <>
      <h1 className="text-5xl text-center my-10 text-pink-700 font-semibold tracking-widest">
        ToDo List
      </h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col">
        {dataErr && (
          <p className="text-center py-2 text-red-500 font-semibold tracking-[1px]">
            {dataErr}
          </p>
        )}
        <input
          className="outline-none border-2 border-black text-center focus:border-red-600 w-70 h-10 mx-auto text-lg text-yellow-500"
          type="text"
          onChange={(e) => {
            setData(e.target.value), setDataErr("");
          }}
          value={data}
        />
        <button
          onClick={handleSubmit}
          className="py-2.5 px-5 bg-black w-fit text-white mx-auto my-5 rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-300 focus:border font-medium text-lg"
        >
          Submit
        </button>
      </form>

      <ul className="w-100 translate-x-30 text-start mx-auto text-2xl font-semibold underline uppercase">
        {todoList.map((item) => (
          <li key={item.id} className="list-disc my-3">
            {item.todoitem}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
