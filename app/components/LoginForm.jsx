"use client"
import {useRouter} from 'next/navigation'
import { useState } from "react";

function LoginForm() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({ email: "", password: ""});


    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      };
    
        
  const checkLogin = async (e) => {
    e.preventDefault()
    console.log(loginData)
    let g = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      });
      router.replace("/bugs")
  }
  return (
    <div className='login-container'>
    <form className='login-form' onSubmit={checkLogin}>
            <label className='login-label' htmlFor="">
                Email
                <input className='login-input' type="text" name="email" value={loginData.email} onChange={handleChange}  />
            </label>
            <label className='login-label' htmlFor="">
                Password
                <input className='login-input' type="password" name="password" value={loginData.password} onChange={handleChange} />
            </label>
            <input className='login-button' type="submit" value="Login" />
    </form>
    </div>
  )
}

export default LoginForm