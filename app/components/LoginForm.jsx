"use client"
import {useRouter} from 'next/navigation'
import { useEffect, useState } from "react";
import Link from 'next/link'

function LoginForm() {
  const router = useRouter()
  const [loginData, setLoginData] = useState({ email: "", password: ""});
  const [errorActive, setErrorActive] = useState(false)
  const [error, setError] = useState("")
  const [logging, setLogging] = useState(false)


    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
      };

  useEffect(() => {
  },[errorActive])
    
        
  const checkLogin = async (e) => {
    e.preventDefault()
    setLogging(true)
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
      setLogging(false)
      setErrorActive(true)
      setError(error.message)
    }
    
   
    
  }
  return (
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
            {logging ? <div className='login-button-loading'><img src='/tadpole.svg' width={40} height={20} /></div>: <input disabled={logging} className="login-button" type="submit" value="Login"/>}

            <Link className='login-forgot' href="/login/forgotpassword">Forgot Password?</Link>
    </form>
  )
}

export default LoginForm
