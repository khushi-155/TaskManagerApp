import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetch tasks
  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((res) => setTasks(res.data));
  }, []);

  // Add Task
  const addTask = () => {
    axios.post("http://localhost:5000/tasks", { title: newTask, completed: false }).then((res) => {
      setTasks([...tasks, res.data]);
      setNewTask("");
    });
  };

  // Toggle Task Completion
  const toggleTask = (id, completed) => {
    axios.put(`http://localhost:5000/tasks/${id}`, { completed: !completed }).then(() => {
      setTasks(tasks.map((task) => (task._id === id ? { ...task, completed: !completed } : task)));
    });
  };

  // Delete Task
  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`).then(() => {
      setTasks(tasks.filter((task) => task._id !== id));
    });
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-gray-100 shadow-md rounded">
      <h1 className="text-xl font-bold mb-4">Task Manager</h1>
      <input
        type="text"
        className="border p-2 w-full mb-2"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={addTask} className="bg-blue-500 text-white p-2 w-full rounded">Add Task</button>

      <ul className="mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="flex justify-between items-center bg-white p-2 my-2 shadow">
            <span className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : ""}`}
              onClick={() => toggleTask(task._id, task.completed)}>
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)} className="text-red-500">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
