import './App.css';
import { useState, Fragment, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

const CATEGORIES = [
  'Work',
  'Personal',
  'Fitness',
  'Learning',
  'Shopping',
  'Finance',
  'Projects'
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('monotone_tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState('');
  const [categoryInput, setCategoryInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('monotone_tasks', JSON.stringify(tasks));
  }, [tasks]);

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

    setTasks([newTask, ...tasks]);
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

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const activeTasks = tasks.filter((t) => !t.completed);
  const completedTasks = tasks.filter((t) => t.completed);

  return (
    <Fragment>
      <div className="App-Name">
        <h1>Monotone</h1>
        <button
          className="Dropbox"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Open History"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>

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
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button type="submit" className="add-btn">+</button>
        </div>
      </form>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Main Container - Active Tasks */}
      <div className="task-container">
        <div className="titles">
          <span></span>
          <h3>Task Name</h3>
          <h3>Category</h3>
        </div>

        <ul className="task-list">
          {activeTasks.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                className="Toggle"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <p>{task.text}</p>
              <p>{task.category}</p>
            </li>
          ))}
        </ul>

        {activeTasks.length === 0 && (
          <p className="empty-state">No active tasks. Add one above!</p>
        )}
      </div>

      {/* Drawer Overlay */}
      <div
        className={`drawer-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* History Drawer */}
      <div className={`drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>History ({completedTasks.length})</h2>
          <button
            className="close-btn"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close History"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        {completedTasks.length > 0 && (
          <button className="clear-all-btn" onClick={clearCompleted}>
            Clear History
          </button>
        )}

        <ul className="history-list">
          {completedTasks.map((task) => (
            <li key={task.id} className="history-item">
              <div className="history-details">
                <p className="history-text">{task.text}</p>
                <span className="history-category">{task.category}</span>
              </div>
              <div className="history-actions">
                <button
                  className="restore-btn"
                  onClick={() => toggleTask(task.id)}
                  title="Move back to Active"
                >
                  ↩
                </button>
                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task.id)}
                  title="Delete permanently"
                >
                  ×
                </button>
              </div>
            </li>
          ))}
        </ul>

        {completedTasks.length === 0 && (
          <p className="empty-state">No completed tasks in history.</p>
        )}
      </div>
    </Fragment>
  );
}

export default App;