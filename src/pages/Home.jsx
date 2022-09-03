import React, { useEffect } from "react";
import { useState } from "react";
import { AiFillPlusSquare } from "react-icons/ai";
import { useStateValue } from "../ContextApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { todoCollection } from "../firebase";
import Todo from "../components/Todo";

const Home = () => {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [{ user, tasks }, dispatch] = useStateValue();

  const fetchTask = (uid) => {
    const userTaskQuery = query(todoCollection, where("uid", "==", uid));
    return userTaskQuery;
  };

  onSnapshot(fetchTask(user ? user.uid : ""), (snapshot) => {
    dispatch({
      type: "SET_TASKS",
      tasks: snapshot.docs.map((task) => {
        return { id: task.id, ...task.data() };
      }),
    });
  });
  useEffect(() => {
    if (user && !user.emailVerified) {
      navigate("/verifyEmail");
    } else {
      if (user) {
        async function fetchData() {
          const querySnapshot = await getDocs(fetchTask(user.uid));
          dispatch({
            type: "SET_TASKS",
            tasks: querySnapshot.docs.map((task) => {
              return { id: task.id, ...task.data() };
            }),
          });
        }
        fetchData();
      }
    }
  }, [user]);

  const handleAddTask = () => {
    if (!task) {
      toast("Please enter a task", { type: "error" });
      return;
    }
    const addTask = doc(todoCollection);
    setDoc(addTask, {
      task,
      uid: user.uid,
      completed: false,
      createdAt: Timestamp.now(),
    });
    setTask("");
  };

  return (
    <div className="w-full">
      <h3 className="text-center text-4xl mt-5 text-gray-50">
        Welcome {user && user.displayName}!
      </h3>
      <p className="text-center text-lg mt-1 text-gray-400">Add your task</p>
      <div className="flex items-center justify-center">
        <div className="rounded-lg flex items-center justify-center mt-24 w-2/3 border-2 py-3 px-3 pt-2">
          <input
            type="text"
            placeholder="Enter task here..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="bg-transparent border-gray-700 w-full text-2xl outline-none text-gray-300 "
          />
          <AiFillPlusSquare
            size={40}
            color="cyan"
            className="cursor-pointer"
            onClick={handleAddTask}
          />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-10">
        {tasks && tasks.map((task) => <Todo key={task.id} task={task} />)}
      </div>
    </div>
  );
};

export default Home;
