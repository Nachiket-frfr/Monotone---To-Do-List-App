import './App.css';
import { useState, Fragment } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const addTask = (e) => {
    e.preventDefault();

    if (input.trim().length === 0) {
      setErrorMessage('Enter a task before actually submitting');
      return;
    }

    const newTask = {
      id: Date.now(),
      text: input,
      category: categoryInput || 'Uncategorized',
      completed: false
    };

    setTasks([...tasks, newTask]);
    setInput('');
    setCategoryInput('');
    setErrorMessage('');
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <Fragment>
      <form onSubmit={addTask}>
        <div className="Inputs">
          <input
            type="text"
            value={input}
            className="input"
            placeholder="Enter task"
            onChange={(e) => {
              setInput(e.target.value);
              if (errorMessage) setErrorMessage('');
            }}
          />
          <select
            value={categoryInput}
            onChange={(e) => setCategoryInput(e.target.value)}
            className="select"
          >
            <option value="">Select a Category</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Fitness">Fitness</option>
            <option value="Learning">Learning</option>
            <option value="Shopping">Shopping</option>
            <option value="Finance">finance</option>
            <option value="Projects">Projects</option>
          </select>
          <button type="submit">+</button>
        </div>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <div className="task-container">
        <div className="titles">
          <span></span>
          <h3>Task Name</h3>
          <h3>Category</h3>
        </div>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                className="Toggle"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <p className={task.completed ? 'completed' : ''}>{task.text}</p>
              <p className={task.completed ? 'completed' : ''}>{task.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}

export default App;