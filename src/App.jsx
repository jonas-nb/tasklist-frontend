import React from "react";
import Tasks from "./assets/componentes/Tasks";
import TaskForm from "./assets/componentes/TasksForm";
import { UpProvider } from "./assets/componentes/UpdateContext";
import { Route, Routes } from "react-router-dom";
import TaskHistory from "./assets/componentes/TaskHistory";

const App = () => {
  return (
    <div className="w-full h-full">
      <UpProvider>
        <TaskForm />
        <Routes>
          <Route path="/" element={<Tasks />} />
          <Route path="/api/tasks/:id" element={<Tasks />} />
        </Routes>
        <TaskHistory />
      </UpProvider>
    </div>
  );
};

export default App;
