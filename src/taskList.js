import React, { useState, useRef } from "react";

import "tailwindcss/tailwind.css";
import { AiTwotoneCalendar } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { BsFillPinAngleFill } from "react-icons/bs";

const TaskList = () => {
  const [toDoTask, setToDoTask] = useState([]);
  const [counter, setCounter] = useState(1);
  const [newTask, setNewTask] = useState({});
  const [isSelected, setIsSelected] = useState(false);
  const [editTask, setEditTask] = useState({});
  const textInput = useRef();

  //! new task add section

  const handleInputChange = (e) => {
    setNewTask({ ...newTask, task: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const addTask = {
      ...newTask,
      id: counter,
    };

    if (toDoTask.length > 1) {
      const taskExist = toDoTask.some((task) => {
        return task.task === newTask.task;
      });
      if (taskExist) {
        alert("Task already added");
      } else {
        setToDoTask([...toDoTask, addTask]);
        setCounter(counter + 1);
      }
    } else {
      setToDoTask([...toDoTask, addTask]);
      setCounter(counter + 1);
    }

    textInput.current.value = " ";
  };

  //! checklist task done section

  const taskDoneHandle = (id) => {
    const doneTasks = toDoTask.map((oldTask) => {
      return oldTask.id === id ? { ...oldTask, done: oldTask.id } : oldTask;
    });

    setToDoTask(doneTasks);
  };

  //!Edit button handle

  const onEditHandle = (task) => {
    const index = toDoTask.findIndex((oldTask) => {
      return oldTask.id === task.id;
    });

    toDoTask[index].edit = !toDoTask.edit;

    setToDoTask(toDoTask);
    setEditTask(toDoTask[index]);
    setIsSelected(!isSelected);
  };
  const handleEditChange = (e) => {
    setEditTask({ ...editTask, task: e.target.value });
  };
  const handleEnterSubmit = (e) => {
    const taskIndex = toDoTask.findIndex((task) => task.edit === true);
    console.log(taskIndex);
    if (e.key === "Enter") {
      toDoTask[taskIndex] = { ...editTask, edit: false };
      setToDoTask([...toDoTask]);
    }
  };

  //! Delete section

  const onDeletehandle = (id) => {
    const remainingTask = toDoTask.filter((task) => task.id !== id);

    setToDoTask(remainingTask);
    console.log(id);
  };
  const onResetButton = () => {
    setToDoTask([]);
  };
  const ondeleteSelectedTask = () => {
    const unDoneTask = toDoTask.filter((task) => !task.done);

    setToDoTask(unDoneTask);
  };

  //!pin to top handle

  const onTopHandle = (task) => {
    const index = toDoTask.findIndex((oldTask) => {
      return oldTask.id === task.id;
    });
    toDoTask[index].pin = !toDoTask[index].pin;

    console.log(toDoTask[index]);
    if (toDoTask[index].pin) {
      const toMove = toDoTask.splice(index, 1);

      toDoTask.unshift(toMove[0]);

      setToDoTask([...toDoTask]);
    } else {
      const toMove = toDoTask.splice(index, 1);

      toDoTask.splice(task.id - 1, 0, toMove[0]);

      setToDoTask([...toDoTask]);
    }
  };

  console.log(toDoTask);
  return (
    <div className="flex  justify-center mt-48">
      <div className="w-1/2 border border-grey m-8 bg-white-500 shadow-lg shadow-grey-500/50 text-center ">
        <h1 className="h1 font-semibold  text-2xl mt-8">To Do Input</h1>
        <div className="flex flex-col border-2 p-1 m-5 border-grey">
          <form onSubmit={handleSubmit}>
            {" "}
            <span className="flex relative">
              <div className="absolute top-5 left-12 ">
                <AiTwotoneCalendar className="" size={40} />
              </div>
              <input
                type="text"
                placeholder="New Task"
                id="task"
                name="task"
                value={toDoTask.task}
                onChange={handleInputChange}
                ref={textInput}
                className="border border-grey rounded-lg shadow-lg shadow-grey-500/50 pl-16 ml-9 p-4 m-3 w-11/12"
              />{" "}
            </span>
            <button
              type="submit"
              className="bg-cyan-500 shadow-lg rounded-lg shadow-grey-500/50 text-white m-3 w-11/12 mt-3 p-3 font-semibold"
            >
              Add New Task
            </button>
          </form>
        </div>
        <h1 className="h1 font-semibold  text-2xl">To Do List</h1>
        <ul className="scroll-ms-6">
          {toDoTask.map((task, index) => (
            <li
              className={
                task.done
                  ? "line-through text-red-600 border rounded-lg border-grey p-3 m-5 bg-white-500 shadow-lg shadow-grey-500/50 font-semibold text-left capitalize flex justify-between  "
                  : "border hover:bg-slate-50 rounded-lg border-grey p-3 m-5 bg-white-500 shadow-lg shadow-grey-500/50 font-semibold text-left capitalize flex justify-between"
              }
              key={task.id}
            >
              {isSelected && task.edit ? (
                <input
                  type="text"
                  className="border hover:bg-slate-50 rounded-lg border-grey bg-white-500 shadow-lg shadow-grey-500/50  flex justify-between border-grey"
                  id="editTask"
                  name="editTask"
                  value={editTask.task}
                  onChange={handleEditChange}
                  onKeyDown={handleEnterSubmit}
                />
              ) : (
                task.task
              )}
              <span className="flex justify-around gap-5 relative">
                {" "}
                <input
                  type="checkbox"
                  onChange={() => taskDoneHandle(task.id)}
                  className="h-5 w-5 mt-1"
                />{" "}
                <button onClick={() => onEditHandle(task)}>
                  <MdModeEditOutline size={24} />{" "}
                </button>{" "}
                <button onClick={() => onDeletehandle(task.id)}>
                  <MdDelete size={28} />
                </button>
                <button onClick={() => onTopHandle(task)}>
                  <BsFillPinAngleFill
                    className={task.pin ? "text-yellow-600 " : "text-black"}
                    size={24}
                  />
                </button>{" "}
              </span>{" "}
            </li>
          ))}
          <div className="flex mb-10 justify-between m-5 mt-5 ">
            <button
              onClick={ondeleteSelectedTask}
              className="bg-red-500 p-3 w-60 shadow-lg shadow-grey-500/50  rounded"
            >
              Delete Checked Tasks
            </button>
            <button
              onClick={onResetButton}
              className="bg-red-500 p-3 shadow-lg shadow-grey-500/50  rounded w-60"
            >
              Delete All Tasks
            </button>
          </div>
        </ul>
      </div>
    </div>
  );
};

export default TaskList;
