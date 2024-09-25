// TodoTasks.js
import React from 'react';
import TaskManagement from '../TaskManagement';
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';

const TodoTasks = () => {
    const token=Cookies.get('jwt_token')
    console.log(token)
    if(token===undefined){
        return <Navigate to="/login" />
    }

    return (
        <div>
            <h1>Todo Tasks</h1>
            <TaskManagement />
        </div>
    );
};

export default TodoTasks;

