import React, { useContext } from "react";
import { MyContext } from "./UpdateContext";
import { Link } from "react-router-dom";
import {BsTrash } from "react-icons/bs";
import {LiaRedoAltSolid} from 'react-icons/lia'
import '../styles/history.css'

const TaskHistory = () => {
  

  //States vindo do context cotendo os dados da api e algumas funções para o uso.
  const { dataTask, removeTask, handlePutStateTask } = useContext(MyContext);
 
  return (
    <div className="main-container pb-5">
      <div className="uppercase title font-bold pl-1">completed</div>
      <div>{dataTask
        .filter(({ check }) => check === true)
        .map(({ _id, task, check }, i) => (
          <div key={i}>
            <div>
              <div className="main-container-tasks drop-shadow-sm slide-in-elliptic-top-fwd bg-[#00000042]">
                <div
                    className={`bg-[#21f190] task-check cursor-pointer rounded-full `}
                    onClick={() => handlePutStateTask(_id)}
                  >
                    <LiaRedoAltSolid /> 
                </div>
                <div className="task line-through">{task}</div>
                <Link className="task-remove" to={`/`} onClick={() => removeTask(_id)}>
                  <BsTrash className="text-[#f83f3f]" />
                </Link>
              </div>
            </div>
          </div>
        ))}</div>
    </div>
  );
};

export default TaskHistory;
