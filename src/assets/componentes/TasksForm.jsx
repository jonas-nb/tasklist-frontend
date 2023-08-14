import React, { useContext, useState } from "react";
import axios from "axios";
import { MyContext } from "./UpdateContext";
import "../styles/form.css";

const TaskForm = () => {
  
  const [newTask, setNewTask] = useState("");
  const { addTask } = useContext(MyContext);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("https://tasklist-app-api.onrender.com/api/tasks", {
        task: newTask,
      });

      console.log("task adcionada");
      addTask(response.data);
      setNewTask("");
    } catch (error) {
      console.log(`Falha na criação da task`);
    }
  };

  return (
    <div className="w-full form-container flex flex-col items-center shadow-sm shadow-[#0000004d] rounded-b-lg">
      <h1 className="mb-2 mt-5 text-[#40a9ff] drop-shadow-xl ">Todo List</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="input-container rounded-3xl shadow-sm shadow-[#0f0f0f77]">
          <input
            className="add-input h-4/5 placeholder:pl-10 outline-none"
            type="text"
            value={newTask}
            name="title"
            id="title"
            placeholder="Add item"
            autoComplete="off"
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit" className="btn-send rounded-full ">
            <div className="icon">+</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
