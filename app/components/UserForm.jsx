"use client"
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import MainContext from "@/app/components/MainContext";
import { userValidation } from "@/lib/validation/userValidation";

function UserForm() {

  const router = useRouter()
  const {setFlashCard} = useContext(MainContext)
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
      const data = await res.json()
      if(data.status === 404)
      {
        throw new Error(data.message)
      }
      setFlashCard("User was created")
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
        <label className="form-label" htmlFor="fname">
        <p className="input-counter">{formData.fname.length}/15</p>
            First Name:
            <input className={formValidation.fnameVal ? "form-input" : "form-input-error"} maxLength={15} type="text" id='fName' name='fname'  value={formData.fname} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="lname">
        <p className="input-counter">{formData.lname.length}/15</p>
            Last Name:
            <input className={formValidation.lnameVal ? "form-input" : "form-input-error"} maxLength={15} type="text" id='lName' name='lname'  value={formData.lname} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="email">
        <p className="input-counter">{formData.email.length}/35</p>
            Email:
            <input className={formValidation.emailVal ? "form-input" : "form-input-error"} maxLength={35} type="email" id='email' name='email'  value={formData.email} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="password">
        <p className="input-counter">{formData.password.length}/50</p>
            Password:
            <input className={formValidation.passwordVal ? "form-input" : "form-input-error"} maxLength={50} type="text" id='password' name='password'  value={formData.password} onChange={handleChange} />
        </label>
        <label className="form-label" htmlFor="passwordconfirm">
        <p className="input-counter">{formData.passwordConfirm.length}/50</p>
            Confirm password:
            <input className={formValidation.passwordVal ? "form-input" : "form-input-error"} maxLength={50} type="text" id='passwordConfirm' name='passwordConfirm'  value={formData.passwordConfirm} onChange={handleChange} />
        </label>
        <label className="form-label" htmlFor="role">
            Role:
            <select className="form-input" id='role' name='role' defaultValue={"User"} onChange={handleChange} >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
        </label>
        <label className="form-label" htmlFor="title">
        <p className="input-counter">{formData.title.length}/25</p>
            Title:
            <input className={formValidation.titleVal ? "form-input" : "form-input-error"} maxLength={25} type="text" id='title' name='title'  value={formData.title} onChange={handleChange} />
        </label>
        <div className='form-buttons'>
            <input className='form-button' type="submit" value="Submit" />
            <input className='form-button' type="reset" value="Reset" />
        </div>
    </form>
  )
}

export default UserForm