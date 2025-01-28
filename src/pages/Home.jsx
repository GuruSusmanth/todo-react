import React, { useState } from "react";

function Home() {
  const [task, setTask] = useState(''); // Holds the current task input
  const [tasks, setTasks] = useState({todo: [], ongoing: [], completed: []}); // Holds the list of tasks

  const handleInputChange = (e) => {
    setTask(e.target.value);
  }

  // Add task to "To-Do" section
  const addTask = () => {
    if(task.trim() !== ''){
      setTasks((prevTasks) => ({
       ...prevTasks,
       todo: [...prevTasks.todo, task],
      }));
      setTask('')//clear input
    }
  };

  // Move task to another category
  const moveTask = (currentCategory, targetCategory, taskToMove) => {
    setTasks((prevTasks) => {
   // Remove task from current category
   const updatedCurrent = prevTasks[currentCategory]. filter(
    (t) => t != taskToMove
   );
   // Add task to target category
   const updatedTarget = [...prevTasks[targetCategory], taskToMove];
   return {...prevTasks, [currentCategory]: updatedCurrent, [targetCategory]:
   updatedTarget };
    });
  };
  return (
    <div className="home">
      <form className="task-form" 
      onSubmit={(e) => {
        e.preventDefault();
        addTask();
      }}
      >
        <input
          type="text"
          placeholder="Enter task..."
          className="task-input"
          value={task}
          onChange= {handleInputChange} // Update task state correctly
        />
        <button type="submit" className="add-task-button"
        onClick={addTask}>
          ADD TASK
        </button>
      </form>
      <div className="task-sections">

        <div className="task-section">
          <h2>To-Do Tasks</h2>
          <ul>
            {tasks.todo.map((t, index) => (
              <li key={index}>{t}
              <button onClick={() => moveTask('todo', 'ongoing', t)}
              >Move to Ongoing</button>
              <button onClick={() => moveTask('todo', 'completed', t)}
              >Move to COmpleted</button></li>
            ))}
          </ul>
        </div>

        <div className="task-section">
          <h2>Ongoing Tasks</h2>
          <ul>
            {tasks.ongoing.map((t, index) => (
            <li key={index}>{t}
            <button onClick={() => moveTask('ongoing', 'todo', t)}>Move to To-Do</button>
            <button onClick={() => moveTask('ongoing', 'completed', t)}>Move to Completed</button>
            </li>
            ))}
          </ul>
        </div>
        <div className="task-section">
          <h2>Completed Tasks</h2>
          <ul>
            {tasks.completed.map((t, index) => (
            <li key={index}>{t}
            <button onClick={() => moveTask('completed', 'todo', t)}
            >Move to To-Do</button>
            <button onClick={() => moveTask('completed', 'ongoing', t)}>
              Move to ongoing</button></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;

