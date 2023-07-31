"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

function UserFormEdit({user, id}) {
    const router = useRouter()
    const [formData, setFormData] = useState({ fname: user.fname, lname: user.lname, email: user.email, role: user.role, title: user.title});
    const [formValidation, setFormValidation] = useState({ fnameVal: true, lnameVal: true, emailVal: true, passwordVal: true, titleVal: true});
    const [formError, setFormError] = useState("")
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
      setFormData({ fname: user.fname, lname: user.lname, email: user.email, role: user.role, title: user.title});
      setFormError("");
      setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: true, titleVal: true});
    }

    const validationCheck = () => {
      console.log("called valid")
      if(formData.fname.length < 2 || formData.fname.length > 15)
      {
          setFormError("First Name is too short")
          setFormValidation({...formValidation, fnameVal: false, lnameVal: true, emailVal: true, passwordVal: true, titleVal: true})
          return false
      }
      if(formData.lname.length < 2 || formData.lname.length > 15)
      {
          setFormError("Last Name is too short")
          setFormValidation({...formValidation, fnameVal: true, lnameVal: false, emailVal: true, passwordVal: true, titleVal: true})
          return false
      }
      if(formData.email.length < 3 || formData.email.length > 20)
      {
          setFormError("Email is too short")
          setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: false, passwordVal: true, titleVal: true})
          return false
      }
  
      if(formData.title.length < 3)
      {
          setFormError("Title is too short")
          setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: true, passwordVal: true, titleVal: false})
          return false
      }
      return true
    }
  
  
    const submitform = async (e) => {
      e.preventDefault()
      const valid = validationCheck()
    if(valid)
    {
      const body = {
        formData,
        userId: id
    }
      await fetch('/api/users/update', {
          method: 'PUT',
          body: JSON.stringify(body),
        });
      router.replace("/users")
    }
    }
  return (
    <form className="form-container" onSubmit={submitform} onReset={resetForm}>
      {formError ? 
            <div className="form-error-container">
                <p>{formError}</p>
            </div>: null}
        <label className="form-label" htmlFor="bugName">
            First Name:
            <input className={formValidation.fnameVal ? "form-input" : "form-input-error"} type="text" id='bugName' name='fname'  value={formData.fname} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
            Last Name:
            <input className={formValidation.lnameVal ? "form-input" : "form-input-error"} type="text" id='bugName' name='lname'  value={formData.lname} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
            Email:
            <input className={formValidation.emailVal ? "form-input" : "form-input-error"} type="text" id='bugName' name='email'  value={formData.email} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
            Role:
            <select className="form-input" id='bugName' defaultValue={"User"} name='role' onChange={handleChange} >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
        </label>
        <label className="form-label" htmlFor="">
            Title:
            <input className={formValidation.titleVal ? "form-input" : "form-input-error"} type="text" id='bugName' name='title'  value={formData.title} onChange={handleChange} />
        </label>
        <div className='form-buttons'>
            <input className='form-button' type="submit" value="Submit" />
            <input className='form-button' type="reset" value="Reset" />
        </div>
    </form>
  )
}

export default UserFormEdit