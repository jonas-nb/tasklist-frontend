import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export const MyContext = createContext();

export const UpProvider = ({ children }) => {
  const [dataTask, setDataTask] = useState([]);
  const [taskState, setTaskState] = useState(false);

  useEffect(() => fetchTasks, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get("https://tasklist-app-api.onrender.com/api/tasks");
      setDataTask(response.data);
    } catch (e) {
      console.log(`Erro na requisação: ${e}`);
    }
  };

  const addTask = (newTask) => {
    // update tasklist
    setDataTask([...dataTask, newTask]);
  };

  const removeTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `https://tasklist-app-api.onrender.com/api/tasks/${taskId}`
      );
      // Atualize o estado dataTask após a remoção
      const updatedDataTask = dataTask.filter(({ _id }) => _id !== taskId);
      setDataTask(updatedDataTask);
    } catch (error) {
      console.log(`Erro ao deletar: ${error}`);
    }
  };

  const handlePutStateTask = async (taskPutId) => {
    try {
      // Encontre a tarefa que corresponde ao taskPutId
      const taskToUpdate = dataTask.find((task) => task._id === taskPutId);

      if (taskToUpdate) {
        // Atualize o estado da tarefa
        taskToUpdate.check = !taskToUpdate.check;

        // Faça a chamada PUT à API
        await axios.put(`https://tasklist-app-api.onrender.com/api/tasks/${taskPutId}`, {
          check: taskToUpdate.check,
        });

        // Atualize o estado dataTask
        const updatedDataTask = dataTask.map((task) => {
          if (task._id === taskPutId) {
            return taskToUpdate;
          }
          return task;
        });
        setDataTask(updatedDataTask);
      }
    } catch (error) {
      console.error("Erro ao atualizar a tarefa:", error);
    }
  };

  return (
    <MyContext.Provider
      value={{
        dataTask,
        setDataTask,
        addTask,
        removeTask,
        setTaskState,
        handlePutStateTask,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
