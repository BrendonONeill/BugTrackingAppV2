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
    if(g.status === 201)
    {
      router.replace("/bugs")
    }
    
  }
  return (
    <form onSubmit={checkLogin}>
            <label htmlFor="">
                Email
                <input type="text" name="email" value={loginData.email} onChange={handleChange} />
            </label>
            <label htmlFor="">
                Password
                <input type="password" name="password" value={loginData.password} onChange={handleChange} />
            </label>
            <input type="submit" value="Login" />
    </form>
  )
}

export default LoginForm