import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';

import './index.css';


const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate=useNavigate()

    const onChangeUsername = event => {
        setUsername(event.target.value);
        // Clear error when input is changed
        setErrors(prevErrors => ({ ...prevErrors, username: '' }));
    };

    const onChangeEmail = event => {
        setEmail(event.target.value);
        // Clear error when input is changed
        setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    };

    const onChangePassword = event => {
        setPassword(event.target.value);
        // Clear error when input is changed
        setErrors(prevErrors => ({ ...prevErrors, password: '' }));
    };

    const validateForm = () => {
        let valid = true;
        const newErrors = {
            username: '',
            email: '',
            password: '',
        };

        if (username.trim() === '') {
            newErrors.username = 'Username is required';
            valid = false;
        }

        if (email.trim() === '') {
            newErrors.email = 'Email is required';
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Email address is invalid';
            valid = false;
        }

        if (password.trim() === '') {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const onSubmitForm =async event => {
        event.preventDefault();
        const userDetails={username,email,password}
        const url='https://todoappbackend-kq17.onrender.com/Signup'
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(userDetails)
        }

        const response=await fetch(url,options)
        if(response.ok===true){
            navigate("/login")
        }
        if (validateForm()) {
            // Form is valid; proceed with form submission
            console.log('Form Submitted:', { username, email, password });
            // Optionally, reset form and errors
            setUsername('');
            setEmail('');
            setPassword('');
            setErrors({
                username: '',
                email: '',
                password: '',
            });
        }
    };

    return (
        <div className='signup-container'>
            <form className='form-container' onSubmit={onSubmitForm}>
                <h1>Sign Up</h1>
                <p className='text'>Already have an account? <Link to="/login" className='nav-link'>Sign In</Link></p>
                <div className='input-container'>
                    <label htmlFor='username' className='label'>Username:</label>
                    <input
                        id="username"
                        type="text"
                        className='input-element'
                        value={username}
                        onChange={onChangeUsername}
                    />
                    {errors.username && <p className='error'>{errors.username}</p>}
                </div>
                <div className='input-container'>
                    <label htmlFor='email' className='label'>Email:</label>
                    <input
                        id="email"
                        type="email"
                        className='input-element'
                        value={email}
                        onChange={onChangeEmail}
                    />
                    {errors.email && <p className='error'>{errors.email}</p>}
                </div>
                <div className='input-container'>
                    <label htmlFor='password' className='label'>Password:</label>
                    <input
                        id="password"
                        type="password"
                        className='input-element'
                        value={password}
                        onChange={onChangePassword}
                    />
                    {errors.password && <p className='error'>{errors.password}</p>}
                </div>
                <button type="submit" className='Account-btn'>Create Account</button>
            </form>
        </div>
    );
};

export default SignUp;

