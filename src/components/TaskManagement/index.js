import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import './index.css';

const TaskManagement = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const token = Cookies.get('jwt_token');
                const options = {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                };
                const response = await fetch('https://todoappbackend-kq17.onrender.com/todos', options);
                const data = await response.json();
                setTasks(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, []);

    const handleAddTask = async (e) => {
        e.preventDefault();
        const { title, description } = newTask;

        try {
            const token = Cookies.get('jwt_token');
            const response = await fetch('https://todoappbackend-kq17.onrender.com/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ title, description }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const addedTask = await response.json();
            setTasks([...tasks, addedTask]);
            setNewTask({ title: '', description: '' }); // Reset form
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const handleDelete = async (id) => {
        const token = Cookies.get('jwt_token');

        try {
            const response = await fetch(`https://todoappbackend-kq17.onrender.com/delete/${id}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setTasks((prevTasks) => prevTasks.filter(task => task.id !== id));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleEdit = async (id, updatedTask) => {
        const token = Cookies.get('jwt_token');
        await fetch(`https://todoappbackend-kq17.onrender.com/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedTask),
        });
        setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
    };

    return (
        <div>
            <h2>Add Task</h2>
            <form onSubmit={handleAddTask} className='form-container'>
                <input
                    type="text"
                    className="task-input"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Task Title"
                    required
                />
                <input
                    type="text"
                    className="task-input"
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    placeholder="Task Description"
                />
                <button type="submit" className="add-button">Add Task</button>
            </form>

            <h2>Current Tasks</h2>
            <ul className='todo-list'>
             {tasks.map((task, index) => (
                 <li className='li-item' key={`${task.id}-${index}`}>
                    <div style={{ flexGrow: 1 }}>
                        <strong className='title'>{task.title}</strong>
                        <small className='description'>{task.description}</small>
                    </div>
                    <div className='buttons-container'>
                       <button 
                    className='button' 
                    onClick={() => handleEdit(task.id, { title: task.title, description: task.description })}>
                    Edit
                       </button>
                       <button className='button' onClick={() => handleDelete(task.id)}>Delete</button>
                    </div>
                 </li>
             ))}
            </ul>

        </div>
    );
};

export default TaskManagement;



