"use client"
import { useContext } from "react";
import MainContext from "@/app/components/MainContext";
import {useRouter} from 'next/navigation'
import { useState } from "react"
import { bugValidation } from "@/lib/validation/bugValidation";

function Form() {
  const router = useRouter()
  const {LoginUser} = useContext(MainContext)
  const [formData, setFormData] = useState({ bugName: '', bugDes: '', bugCode: '', bugProject: '', bugImportance: 'low', bugPrivate: false});
  const [formValidation, setFormValidation] = useState({ NameVal: true, DesVal: true, CodeVal: true, ProjectVal: true});
  const [formError, setFormError] = useState("")


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ bugName: '', bugDes: '', bugCode: '', bugProject: '', bugImportance: 'low', bugPrivate: false});
    setFormError("")
    setFormValidation({...formValidation, NameVal : true, DesVal: true, CodeVal: true, ProjectVal: true})
  }

   const validationCheck = () => {
    let valid = bugValidation(formData)
    if(valid.validation === false)
    {
      setFormValidation({...formValidation, NameVal : valid.body.NameVal, DesVal: valid.body.DesVal, CodeVal: valid.body.CodeVal, ProjectVal: valid.body.ProjectVal })
      setFormError(valid.errorMessage)
      return false
    }
    return true
  }

  const submitForm = async (e) => {
    e.preventDefault()
    const valid = validationCheck()
    if(valid)
    {
      const body =
    {
      formData,
      user: LoginUser._id
    }
    await fetch('/api/bugs/create', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    router.replace("/bugs")
    }
  }

 
  return (
        <form className='form-container'  onSubmit={submitForm} onReset={resetForm}>
           {formError ? 
            <div className="form-error-container">
                <p>{formError}</p>
            </div>: null}
            <label className='form-label' htmlFor="bugName">
                <p>Bug Name:</p>
                <input className={formValidation.NameVal ? "form-input" : "form-input-error"} placeholder='API POST bug' type="text" id='bugName' name='bugName'  value={formData.bugName} onChange={handleChange} required />
            </label>
            <label className='form-label' htmlFor="">
                <p>Description:</p>
                <textarea className={formValidation.DesVal ? "form-input form-area" : "form-input-error form-area"} placeholder='describe the bug that has occurred' type="text" id='bugName' name='bugDes'  value={formData.bugDes} onChange={handleChange} required />
            </label>
            <label className='form-label' htmlFor="">
                <p>Code:</p> 
                <input className={formValidation.CodeVal ? "form-input" : "form-input-error"} placeholder='JavaScript' type="text" id='bugName' name='bugCode'  value={formData.bugCode} onChange={handleChange}  required />
            </label>
            <label className='form-label' htmlFor="">
                Project name
                <input className={formValidation.ProjectVal ? "form-input" : "form-input-error"} placeholder='Bug Tracking App' type="text" id='bugName' name='bugProject'  value={formData.bugProject} onChange={handleChange} required />
            </label>
            <label className='form-label' htmlFor="">
                Importance
                <select className='form-input' type="text" id='bugImportance' defaultValue={"low"}  name='bugImportance'  value={formData.bugImportance} onChange={handleChange} >
                <option value="low">Low</option>
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