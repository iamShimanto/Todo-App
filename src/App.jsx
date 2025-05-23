import { useEffect, useState } from "react";
import { getDatabase, onValue, push, ref, remove, set, update } from "firebase/database";

function App() {
  const db = getDatabase();
  const [data, setData] = useState("");
  const [dataErr, setDataErr] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [editedValue, setEditedValue] = useState({
    todoitem: "",
    id : ""
  })

  const handleSubmit = () => {
    if (data) {
      set(push(ref(db, "todolist/")), {
        todoitem: data,
      });
    }
  };

  const handleEnableEdit = (data) => {
    setIsEdit(true);
    setEditedValue(data)
  }
  
  const handleUpdate = () => {
    update(ref(db, "todolist/" + editedValue.id), {
      todoitem : editedValue.todoitem
    })
    setIsEdit(false)
  }

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
    remove(ref(db, "todolist/" + data.id))
  }


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
      <form onSubmit={handleSubmitForm} className="w-fit mx-auto flex items-center gap-2.5">
        {dataErr && (
          <p className="text-center py-2 text-red-500 font-semibold tracking-[1px]">
            {dataErr}
          </p>
        )}
        <input
          className="outline-none border-2 border-black text-center focus:border-red-600 w-70 h-10 mx-auto text-lg text-yellow-500"
          type="text"
          onChange={(e) => {
            isEdit ? setEditedValue((prev)=> ({...prev, todoitem : e.target.value})) : setData(e.target.value), setDataErr("")
          }}
          value={isEdit ? editedValue.todoitem : data}
        />
        {
          isEdit 
          ?
         <>
           <button
          onClick={handleUpdate}
          className="py-2.5 px-5 bg-black w-fit text-white mx-auto my-5 rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-300 focus:border font-medium text-lg"
        >
          update
        </button>
        <button
          onClick={()=> setIsEdit(false)}
          className="py-2.5 px-5 bg-black w-fit text-white mx-auto my-5 rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-300 focus:border font-medium text-lg"
        >
          Cancel
        </button>
         </>
          :
          <button
          onClick={handleSubmit}
          className="py-2.5 px-5 bg-black w-fit text-white mx-auto my-5 rounded-lg cursor-pointer hover:bg-white hover:text-black ease-in-out duration-300 focus:border font-medium text-lg"
        >
          Submit
        </button>
        }
        
      </form>

      <ul className="w-fit translate-x-30 text-start mx-auto text-2xl font-semibold underline uppercase">
        {todoList.map((item) => (
          <li key={item.id} className="list-disc my-3">
            {item.todoitem}
            <button className="py-2.5 px-5 bg-black text-white w-fit rounded-lg hover:bg-white hover:text-black border duration-300 ml-7 mr-4"
            onClick={() => handleEnableEdit(item)}>Edit</button>
            <button className="py-2.5 px-5 bg-black text-white w-fit rounded-lg hover:bg-white hover:text-black border duration-300 mr-4"
            onClick={()=> handleDelete(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
