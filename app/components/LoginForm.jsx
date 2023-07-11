"use client"
import {useRouter} from 'next/navigation'
import { useState } from "react";
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";

function LoginForm() {
  const router = useRouter()
  let {setLoggedIn} = useContext(MainContext)
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
      setLoggedIn(true)
      router.replace("/bugs")
    }
    
  }
  return (
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
  )
}

export default LoginForm