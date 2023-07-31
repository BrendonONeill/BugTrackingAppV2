"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

function EditForm({data, id}) {
  const router = useRouter()
  const [formData, setFormData] = useState({ bugName: data.bugName, bugDes: data.bugDes, bugCode: data.bugCode, bugProject: data.bugProject, bugImportance: data.bugImportance, bugPrivate: data.bugPrivate});
  const [formValidation, setFormValidation] = useState({ NameVal: true, DesVal: true, CodeVal: true, ProjectVal: true});
  const [formError, setFormError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ bugName: data.bugName, bugDes: data.bugDes, bugCode: data.bugCode, bugProject: data.bugProject, bugImportance: data.bugImportance, bugPrivate: data.bugPrivate});
    setFormError("")
    setFormValidation({...formValidation, NameVal : true, DesVal: true, CodeVal: true, ProjectVal: true})
  }    

  const validationCheck = () => {
    console.log("called valid")
    if(formData.bugName.length < 3 || formData.bugName.length > 30)
    {
        setFormError("Bug Name is too short")
        setFormValidation({...formValidation, NameVal : false, DesVal: true, CodeVal: true, ProjectVal: true})
        return false
    }
    if(formData.bugDes.length < 5 || formData.bugDes.length > 200)
    {
        setFormError("Description is too short")
        setFormValidation({...formValidation, NameVal : true, DesVal: false, CodeVal: true, ProjectVal: true})
        return false
    }
    if(formData.bugCode.length < 3 || formData.bugCode.length > 20)
    {
        setFormError("Code name is too short")
        setFormValidation({...formValidation, NameVal : true, DesVal: true, CodeVal: false, ProjectVal: true})
        return false
    }
    if(formData.bugProject.length < 3 || formData.bugProject.length > 30)
    {
        setFormError("Project Name is too short")
        setFormValidation({...formValidation, NameVal : true, DesVal: true, CodeVal: true, ProjectVal: false})
        return false
    }
    return true
  }

  const submitForm = async (e) => {
    e.preventDefault()
    console.log("called sumbit")
    const valid = validationCheck()
    if(valid)
    {
        const body = {
            formData,
            bugId: id
        }
        await fetch('/api/bugs/update', {
            method: 'PUT',
            body: JSON.stringify(body),
          });
        router.replace("/bugs")
    }
  }

   

  return (
        <form className="form-container" onSubmit={submitForm} onReset={resetForm}>
            {formError ? 
            <div className="form-error-container">
                <p>{formError}</p>
            </div>: null}
            <label className="form-label" htmlFor="bugName">
                Bug Name
                <input className={formValidation.NameVal ? "form-input" : "form-input-error"} type="text" id='bugName' name='bugName'  value={formData.bugName} onChange={handleChange} required />
            </label>
            <label className="form-label" htmlFor="">
                Description
                <textarea className={formValidation.DesVal ? "form-input form-area" : "form-input-error form-area"} type="text" name="bugDes" id="bugDes" value={formData.bugDes} onChange={handleChange} required ></textarea>
            </label>
            <label className="form-label" htmlFor="">
                Code: 
                <input className={formValidation.CodeVal ? "form-input" : "form-input-error"} type="text" id='bugCode' name='bugCode'  value={formData.bugCode} onChange={handleChange} required  />
            </label>
            <label className="form-label" htmlFor="">
                Project name:
                <input className={formValidation.ProjectVal ? "form-input" : "form-input-error"} type="text" id='bugName' name='bugProject'  value={formData.bugProject} onChange={handleChange} required />
            </label>
            <label className='form-label' htmlFor="">
                Importance
                <select className='form-input' type="text" id='bugImportance'  name='bugImportance'  value={formData.bugImportance} onChange={handleChange} >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                </select>
            </label>
            <label className='form-label' htmlFor="">
                Private Card
                <select className='form-input' type="text" id='bugPrivate'  name='bugPrivate'  value={formData.bugPrivate} onChange={handleChange}>
                <option value={true}>true</option>
                <option value={false}>false</option>
                </select>
            </label>
            <div className='form-buttons'>
            <input className='form-button' type="submit" value="Submit" />
            <input className='form-button' type="reset" value="Reset" />
            </div>
        </form>
  )
}

export default EditForm