import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ name: '', desc: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (editIndex !== null) {
      const updatedTasks = tasks.map((t, index) =>
        index === editIndex ? { ...task, status: t.status } : t
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks((prevTasks) => [
        ...prevTasks,
        { ...task, status: 'pending' }
      ]);
    }
    setTask({ name: '', desc: '' });
  };

  const handleDelete = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleStatusChange = (index, status) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status } : task
    );
    setTasks(updatedTasks);
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (statusFilter === 'all') return true;
    return task.status === statusFilter;
  });

  return (
    <main>
      <header>TODOs APPLICATION</header>
      <div className='input-container'>
        <div>
          <input
            type="text"
            name="name"
            placeholder='Task Name'
            onChange={handleChange}
            value={task.name}
          />
        </div>
        <div>
          <input
            type="text"
            name="desc"
            placeholder='Task Description'
            onChange={handleChange}
            value={task.desc}
          />
        </div>
        <button onClick={handleSubmit}>
          {editIndex !== null ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className='grid-header'>
        <div>My Todos</div>
        <div>
          <span>Status Filter : </span>
          <select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="all">All</option>
            <option value="complete">Completed</option>
            <option value="pending">Not Completed</option>
          </select>
        </div>
      </div>

      <div className='task-grids'>
        {filteredTasks.map((task, index) => (
          <div key={index} className='task-container'>

              <>
                <p>NAME: {task.name}</p>
                <p>DESCRIPTION: {task.desc}</p>
                <select
                  value={task.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                </select>
                <div>
                  <button className='delete' onClick={() => handleDelete(index)}>Delete</button>
                  <button className='edit' onClick={() => handleEdit(index)}>Edit</button>
                </div>
              </>
           
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
