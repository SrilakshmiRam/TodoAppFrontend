import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import TodoTasks from './components/TodoTasks';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<SignUp />} />
            <Route exact path="/login" element={<Login />} />
            <Route 
                exact path="/tasks" 
                element={
                        <TodoTasks />
                } 
            />
            <Route 
                exact path="/users/:id" 
                element={
                        <UserProfile />
                } 
            />
        </Routes>
    </BrowserRouter>
);

export default App;

