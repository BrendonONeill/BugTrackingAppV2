"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

function UserFormEdit({user, id}) {
    const router = useRouter()
    const [formData, setFormData] = useState({ fname: user.fname, lname: user.lname, email: user.email, role: user.role, title: user.title});
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const cat = async (e) => {
      e.preventDefault()
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
            Role:
            <input className="form-input" type="text" id='bugName' name='role'  value={formData.role} onChange={handleChange} />
        </label>
        <label className="form-label" htmlFor="">
            Title:
            <input className="form-input" type="text" id='bugName' name='title'  value={formData.title} onChange={handleChange} />
        </label>
        <div className='form-buttons'>
            <input className='form-button' type="submit" value="Submit" />
            <input className='form-button' type="reset" value="Reset" />
        </div>
    </form>
  )
}

export default UserFormEdit