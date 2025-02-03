import React, { useState } from "react";
import "./todolistapp.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");
  const addTask = () => { // function to add task 
    if (task.trim()) {
      let newTasks = [...tasks];
      for (let i = 0; i < 1; i++) {
        newTasks.push(task);
      }
      setTasks(newTasks);
      setTask("");
    }
  };
  const deleteTask = (index) => { // function to delete task
    let newTasks = [];
    for (let i = 0; i < tasks.length; i++) {
      if (i !== index) { // if statement to keep tasks except the one to be deleted
        newTasks.push(tasks[i]);
      }
    }
    setTasks(newTasks);
  };
  const displayTasks = () => { // function to display the task
    let taskElements = [];
    for (let i = 0; i < tasks.length; i++) {
      taskElements.push(
        <div className="task-item" key={i}>
          {tasks[i]}
          <button className="delete-btn" onClick={() => deleteTask(i)}>Delete</button>
        </div>
      );
    }
    return taskElements;
  };

  return (
    <div className="app-container">
      <h1>ToDo List App</h1>
      <div className="input-container">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter Task Description"
        />
        <br></br>
        <button className="add-btn" onClick={addTask}>Add Task</button>
      </div>
      {tasks.length > 0 && <div className="task-container">{displayTasks()}</div>}
    </div>
  );
}
export default App;
