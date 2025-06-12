import React, { useEffect, useState } from "react";

const ToDoList = () => {
  // Initialize todo from localStorage or as an empty array
  const [todo, setTodo] = useState(() => {
    const saved = localStorage.getItem("todo");
    return saved ? JSON.parse(saved) : [];
  });

  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todo));
  }, [todo]);

  const handleInputChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    if (value.trim() === "") return; // Prevent empty todos
    setTodo([value, ...todo]);
    setValue("");
  };

  const handledelete = (e) => {
    const delIndex = Number(e.target.value);
    const newArr = todo.filter((_, index) => index !== delIndex);
    setTodo(newArr);
  };

  const handleDaleteAll = () => {
    setTodo([]);
  };

  return (
    <div className="p-4 rounded-lg w-[440px] flex flex-col items-center justify-center m-auto mt-12 bg-white/30 gap-4">
      <h2 className="text-black text-3xl items-center justify-center font-semibold flex align-middle m-2 w-full">
        Todo App
      </h2>
      <div className="flex m-auto gap-[5%] align-middle w-full justify-center">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder="Add your Todo"
          className="bg-white/60 p-4 rounded-sm border-none text-black h-10 w-[75%]"
        />
        <button onClick={handleSubmit} className="w-[20%] bg-blue-500 ">
          Add
        </button>
      </div>

      {todo.map((e, index) => (
        <div key={index} className=" w-full">
          <div className="text-black flex items-center justify-center  w-full h-10 ">
            <p className="w-[80%] flex rounded-sm bg-white/80 h-full p-2 items-center">
              {e}
            </p>
            <button
              value={index}
              onClick={handledelete}
              className="w-[20%]  bg-red-500 h-full rounded-sm text-white"
            >
              Del
            </button>
          </div>
        </div>
      ))}

      <div>
        <button
          onClick={handleDaleteAll}
          className="bg-red-500 w-20 h-10 rounded-sm"
        >
          Clear All
        </button>
      </div>
    </div>
  );
};

export default ToDoList;
