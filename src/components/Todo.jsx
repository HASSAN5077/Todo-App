import { reload } from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import React from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdDownloadDone } from "react-icons/md";
import { firestore } from "../firebase";
const Todo = ({ task }) => {
  const handleDeleteTask = () => {
    const docToDelete = doc(firestore, "todos", task.id);
    deleteDoc(docToDelete);
  };
  const handleCompleted = () => {
    const docToUpdate = doc(firestore, "todos", task.id);
    setDoc(docToUpdate, {
      task: task.task,
      createdAt: task.createdAt,
      completed: !task.completed,
      uid: task.uid,
    });
  };
  return (
    <div className="w-2/3 border-2 mt-5 flex items-center justify-between px-5 py-2">
      <p
        className={`text-gray-200 text-2xl mr-3 ${
          task.completed ? "line-through" : ""
        }`}
      >
        {task.task}
      </p>
      <div className="flex">
        <MdDownloadDone
          color="#00CCBB"
          size={30}
          className="mr-3 cursor-pointer"
          onClick={handleCompleted}
        />
        <AiFillDelete
          color="#ff0000"
          size={30}
          className="cursor-pointer"
          onClick={handleDeleteTask}
        />
      </div>
    </div>
  );
};

export default Todo;
