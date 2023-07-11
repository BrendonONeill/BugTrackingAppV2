"use client"
import {useRouter} from 'next/navigation'
import { useState } from "react"

function Form() {
  const router = useRouter()
  const [formData, setFormData] = useState({ bugName: '', bugDes: '', bugCode: '', bugProject: '', bugImportance: ''});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cat = async (e) => {
    e.preventDefault()
    console.log(formData)
    await fetch('/api/bugs/create', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    router.replace("/bugs")
  }
  return (
        <form className='create-bug-form'  onSubmit={cat}>
            <label className='login-label' htmlFor="bugName">
                Bug Name
                <input className='login-input' type="text" id='bugName' name='bugName'  value={formData.bugName} onChange={handleChange}  />
            </label>
            <label className='login-label' htmlFor="">
                Description
                <input className='login-input' type="text" id='bugName' name='bugDes'  value={formData.bugDes} onChange={handleChange} />
            </label>
            <label className='login-label' htmlFor="">
                Code 
                <input className='login-input' type="text" id='bugName' name='bugCode'  value={formData.bugCode} onChange={handleChange}  />
            </label>
            <label className='login-label' htmlFor="">
                Project name
                <input className='login-input' type="text" id='bugName' name='bugProject'  value={formData.bugProject} onChange={handleChange} />
            </label>
            <label className='login-label' htmlFor="">
                Importance
                <input className='login-input' type="text" id='bugName' name='bugImportance'  value={formData.bugImportance} onChange={handleChange} />
            </label>
            <input className='login-button' type="submit" value="Submit" />
            <input className='login-button' type="reset" value="Reset" />
        </form>
  )
}

export default Form