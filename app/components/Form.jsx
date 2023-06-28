"use client"

import { useState } from "react"

function Form() {
  const [test, setTest] = useState(true)
  const [formData, setFormData] = useState({ bugName: '', bugDes: '', bugCode: '', bugProject: '', bugImportance: ''});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cat = async (e) => {
    e.preventDefault()
    console.log(formData)
    await fetch('/api/bugs', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
  }
  return (
    <div>
        <form onSubmit={cat}>
            <label htmlFor="bugName">
                Bug Name
                <input type="text" id='bugName' name='bugName'  value={formData.bugName} onChange={handleChange}  />
            </label>
            <label htmlFor="">
                Description
                <input type="text" id='bugName' name='bugDes'  value={formData.bugDes} onChange={handleChange} />
            </label>
            <label htmlFor="">
                Code 
                <input type="text" id='bugName' name='bugCode'  value={formData.bugCode} onChange={handleChange}  />
            </label>
            <label htmlFor="">
                Project name
                <input type="text" id='bugName' name='bugProject'  value={formData.bugProject} onChange={handleChange} />
            </label>
            <label htmlFor="">
                Importance
                <input type="text" id='bugName' name='bugImportance'  value={formData.bugImportance} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" />
        </form>
</div>
  )
}

export default Form