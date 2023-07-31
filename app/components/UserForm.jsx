"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

function UserForm() {

  const router = useRouter()
  const [formData, setFormData] = useState({ fname: "", lname: "", email: "", password: "", passwordConfirm: "", role: "User", title: ""});
  const [formValidation, setFormValidation] = useState({ fnameVal: true, lnameVal: true, emailVal: true, passwordVal: true, titleVal: true});
  const [formError, setFormError] = useState("")

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ fname: "", lname: "", email: "", password: "", passwordConfirm: "", role: "User", title: ""});
    setFormError("")
    setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: true, passwordVal: true, titleVal: true})
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
    if(formData.email.length < 3 || formData.email.length > 30)
    {
        setFormError("Email is too short")
        setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: false, passwordVal: true, titleVal: true})
        return false
    }
    if(formData.password !== formData.passwordConfirm)
    {
        setFormError("Passwords not the same")
        setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: true, passwordVal: false, titleVal: true})
        return false
    }
    if(formData.password.length < 5 && formData.passwordConfirm.length < 5)
    {
        setFormError("Password is too short")
        setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: true, passwordVal: false, titleVal: true})
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
    try {
      e.preventDefault()
    const valid = validationCheck()
    if(valid)
    {
      const body = formData;
      let res = await fetch('/api/users/create', {
          method: 'POST',
          body: JSON.stringify(body),
        });
      const test = await res.json()
      if(test.status === 401)
      {
        throw new Error(test.message)
      }
      router.replace("/users")
    }
    } catch (error) {
      setFormError(error.message)
      setFormValidation({...formValidation, fnameVal: true, lnameVal: true, emailVal: true, passwordVal: true, titleVal: true})
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
            <input className={formValidation.emailVal ? "form-input" : "form-input-error"} type="email" id='bugName' name='email'  value={formData.email} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
            Password:
            <input className={formValidation.passwordVal ? "form-input" : "form-input-error"} type="text" id='bugName' name='password'  value={formData.password} onChange={handleChange} />
        </label>
        <label className="form-label" htmlFor="">
            Confirm password:
            <input className={formValidation.passwordVal ? "form-input" : "form-input-error"} type="text" id='bugName' name='passwordConfirm'  value={formData.passwordConfirm} onChange={handleChange} />
        </label>
        <label className="form-label" htmlFor="">
            Role:
            <select className="form-input" id='bugName' name='role' defaultValue={"User"} onChange={handleChange} >
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

export default UserForm