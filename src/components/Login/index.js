import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Login=()=>{
    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')
    const [showError,setShowError]=useState(false)
    const navigate=useNavigate()

    const onChangeUsername=e=>{
        setUsername(e.target.value)
    }

    const onChangePassword=e=>{
        setPassword(e.target.value)
    }


    const onSubmitSuccess=jwtToken=>{
        Cookies.set('jwt_token',jwtToken,{expires:60})
        navigate('/tasks')
        
    }


    const onSubmitFailure=error=>{
       setError(error)
       setShowError(true)
    }

    const onSubmitLogin=async event=>{
        event.preventDefault()
        const loginDetails={username,password}
        const url='https://todoappbackend-kq17.onrender.com/login'
        const options={
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(loginDetails)
        }
        const response=await fetch(url,options)
        const data=await response.json()
        console.log(response)
        console.log(data)
        console.log(data.jwtToken)
        if(response.ok===true){
            onSubmitSuccess(data.jwtToken)
        }else{
            onSubmitFailure(data.message)
        }
    }

    return(
        <div className='login-conatiner'>
            <h1 className='heading'>Login Into Your Account</h1>
            <form className="form-container" onSubmit={onSubmitLogin}>
                <div className='input-container'>
                    <label htmlFor='username' className='label'>Username:</label>
                    <input
                        id="username"
                        type="text"
                        className='input-element'
                        value={username}
                        onChange={onChangeUsername}
                    />
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
                    {showError && <p>{error}</p>}
                </div>
                <button type="submit" className='login-btn'>Login</button>
            </form>
        </div>
    )
}

export default Login


