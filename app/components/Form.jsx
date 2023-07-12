"use client"
import {useRouter} from 'next/navigation'
import { useState } from "react"

function Form() {
  const router = useRouter()
  const [formData, setFormData] = useState({ bugName: '', bugDes: '', bugCode: '', bugProject: '', bugImportance: 'low', bugPrivate: false});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sumbitForm = async (e) => {
    e.preventDefault()
    console.log(formData)
    await fetch('/api/bugs/create', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    router.replace("/bugs")
  }

  const resetForm = () => setFormData({ bugName: '', bugDes: '', bugCode: '', bugProject: '', bugImportance: 'low', bugPrivate: false})
  return (
        <form className='form-container'  onSubmit={sumbitForm} onReset={resetForm}>
            <label className='form-label' htmlFor="bugName">
                <p>Bug Name:</p>
                <input className='form-input' placeholder='API POST bug' type="text" id='bugName' name='bugName'  value={formData.bugName} onChange={handleChange} required />
            </label>
            <label className='form-label' htmlFor="">
                <p>Description:</p>
                <textarea placeholder='describe the bug that has occurred' className='form-input form-area' type="text" id='bugName' name='bugDes'  value={formData.bugDes} onChange={handleChange} required />
            </label>
            <label className='form-label' htmlFor="">
                <p>Code:</p> 
                <input className='form-input' placeholder='JavaScript' type="text" id='bugName' name='bugCode'  value={formData.bugCode} onChange={handleChange}  required />
            </label>
            <label className='form-label' htmlFor="">
                Project name
                <input className='form-input' placeholder='Bug Tracking App' type="text" id='bugName' name='bugProject'  value={formData.bugProject} onChange={handleChange} required />
            </label>
            <label className='form-label' htmlFor="">
                Importance
                <select className='form-input' type="text" id='bugImportance'  name='bugImportance'  value={formData.bugImportance} onChange={handleChange} >
                <option default value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                </select>
            </label>
            <label className='form-label' htmlFor="">
                Private Card
                <select className='form-input' type="text" id='bugPrivate'  name='bugPrivate'  value={formData.bugPrivate} onChange={handleChange}>
                <option value={true}>true</option>
                <option default value={false}>false</option>
                </select>
            </label>
            <div className='form-buttons'>
            <input className='form-button' type="submit" value="Submit" />
            <input className='form-button' type="reset" value="Reset" />
            </div>
            
        </form>
  )
}

export default Form