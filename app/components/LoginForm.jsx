"use client"
import {useRouter} from 'next/navigation'
import { useEffect, useState } from "react";

function LoginForm() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({ email: "", password: ""});
  const [errorActive, setErrorActive] = useState(false)
  const [error, setError] = useState("")


    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      };

  useEffect(() => {
  },[errorActive])
    
        
  const checkLogin = async (e) => {
    e.preventDefault()
    console.log(loginData)
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(loginData),
      })
      const test = await res.json()
      if(test.status === 401)
      {
        throw new Error(test.message)
      }
      router.replace("/bugs")
    } catch (error) {
      setErrorActive(true)
      setError(error.message)
    }
    
   
    
  }
  return (
    <div className='login-container'>
      
    <form className='login-form' onSubmit={checkLogin}>
    {errorActive ? <div className='error-container-login'><p>{error}</p></div>: null}
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