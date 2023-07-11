"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

function UserForm() {

  const router = useRouter()
  const [formData, setFormData] = useState({ fname: "", lname: "", email: "", password: "", passwordConfirm: "", role: "", title: ""});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cat = async (e) => {
    e.preventDefault()
    const body = formData;
    await fetch('/api/users/create', {
        method: 'POST',
        body: JSON.stringify(body),
      });
    router.replace("/users")
  }

  return (
    <form className="form-container" onSubmit={cat}>
        <label className="form-label" htmlFor="bugName">
            First Name:
            <input className="form-input" type="text" id='bugName' name='fname'  value={formData.fname} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
            Last Name:
            <input className="form-input" type="text" id='bugName' name='lname'  value={formData.lname} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
            Email:
            <input className="form-input" type="text" id='bugName' name='email'  value={formData.email} onChange={handleChange}  />
        </label>
        <label className="form-label" htmlFor="">
            Password:
            <input className="form-input" type="text" id='bugName' name='password'  value={formData.password} onChange={handleChange} />
        </label>
        <label className="form-label" htmlFor="">
            Confirm password:
            <input className="form-input" type="text" id='bugName' name='passwordConfirm'  value={formData.passwordConfirm} onChange={handleChange} />
        </label>
        <label className="form-label" htmlFor="">
            Role:
            <input className="form-input" type="text" id='bugName' name='role'  value={formData.role} onChange={handleChange} />
        </label>
        <label className="form-label" htmlFor="">
            Title:
            <input className="form-input" type="text" id='bugName' name='title'  value={formData.title} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
        <input type="reset" value="Reset" />
    </form>
  )
}

export default UserForm