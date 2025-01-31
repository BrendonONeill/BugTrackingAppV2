"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"
import { userValidation } from "@/lib/validation/userValidation";

function UserFormEdit({user, id, setFlashCard}) {
    const router = useRouter()
    const userEmail = user.email
    const userRole = user.role
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
      let valid = userValidation(formData)
      if(valid.validation === false)
      {
        setFormValidation({...formValidation, fnameVal: valid.body.fnameVal, lnameVal: valid.body.lnameVal, emailVal: valid.body.emailVal, passwordVal: valid.body.passwordVal, titleVal: valid.body.titleVal })
        setFormError(valid.errorMessage)
        return false
      }
      return true
    }
  
  
    const submitform = async (e) => {
      e.preventDefault()
      const valid = validationCheck()
      if(valid)
      {
        try {
          const body = {
            formData,
            userId: id,
            checkEmail : userEmail
          }
          const res = await fetch('/api/users/update', {
              method: 'PUT',
              body: JSON.stringify(body),
          });
          const data = await res.json()
          if(data.status === 404)
          {
            throw new Error(data.message)
          }
          setFlashCard("User was edited")
          router.replace("/users")
          
        } catch (error) {
          setFormError(error.message)
          setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: false, titleVal: true})
        }
        
      }
    }
  return (
    <form className="form-container" onSubmit={submitform} onReset={resetForm}>
      {formError ? 
            <div className="form-error-container">
                <p>{formError}</p>
            </div>: null}
        <label className="form-label" htmlFor="bugName">
        <p className="input-counter">{formData.fname.length}/15</p>
            First Name:
            <input className={formValidation.fnameVal ? "form-input" : "form-input-error"} maxLength={15} type="text" id='bugName' name='fname'  value={formData.fname} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
        <p className="input-counter">{formData.lname.length}/15</p>
            Last Name:
            <input className={formValidation.lnameVal ? "form-input" : "form-input-error"} maxLength={15} type="text" id='bugName' name='lname'  value={formData.lname} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
        <p className="input-counter">{formData.email.length}/35</p>
            Email:
            <input className={formValidation.emailVal ? "form-input" : "form-input-error"} maxLength={35} type="text" id='bugName' name='email'  value={formData.email} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
            Role:
            <select className="form-input" id='bugName' value={userRole} name='role' onChange={handleChange} >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
        </label>
        <label className="form-label" htmlFor="">
        <p className="input-counter">{formData.title.length}/25</p>
            Title:
            <input className={formValidation.titleVal ? "form-input" : "form-input-error"} maxLength={25} type="text" id='bugName' name='title'  value={formData.title} onChange={handleChange} />
        </label>
        <div className='form-buttons'>
            <input className='form-button' type="submit" value="Submit" />
            <input className='form-button' type="reset" value="Reset" />
        </div>
    </form>
  )
}

export default UserFormEdit