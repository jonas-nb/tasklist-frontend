import React, { useContext } from "react";
import { MyContext } from "./UpdateContext";
import { Link} from "react-router-dom";
import {BsCheck,  BsTrash} from 'react-icons/bs'
import '../styles/todo.css'


const Tasks = () => {
  //states vindo do context
  const { dataTask, removeTask, handlePutStateTask} = useContext(MyContext);

  return (
    <div className="main-container">
      <h1 className="uppercase title font-bold pl-1">to do</h1>
      <div>
        {dataTask
          .filter(({ check }) => check === false)
          .map(({ _id, task}, i) => (
            <div key={i}>
              <div>
                <div className={`main-container-tasks drop-shadow-sm animation-create `}>
                <div
                    className={`task-check cursor-pointer rounded-full bg-[#1e7fee]`}
                    onClick={() => handlePutStateTask(_id)}
                  >
                    <BsCheck /> 
                  </div>
                  <div className="task">{task}</div>
                  <Link
                    className="task-remove "
                    to={`/`}
                    onClick={() => removeTask(_id)}
                  >
                    <BsTrash/>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Tasks;
