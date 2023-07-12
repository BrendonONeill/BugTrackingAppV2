"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

function EditForm({data, id}) {
  const router = useRouter()
  const [formData, setFormData] = useState({ bugName: data.bugName, bugDes: data.bugDes, bugCode: data.bugCode, bugProject: data.bugProject, bugImportance: data.bugImportance, bugPrivate: data.bugPrivate});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sumbitForm = async (e) => {
    e.preventDefault()
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

  const resetForm = () => setFormData({ bugName: data.bugName, bugDes: data.bugDes, bugCode: data.bugCode, bugProject: data.bugProject, bugImportance: data.bugImportance, bugPrivate: data.bugPrivate}); 

  return (
        <form className="form-container" onSubmit={sumbitForm} onReset={resetForm}>
            <label className="form-label" htmlFor="bugName">
                Bug Name
                <input className="form-input" type="text" id='bugName' name='bugName'  value={formData.bugName} onChange={handleChange} required />
            </label>
            <label className="form-label" htmlFor="">
                Description
                <textarea className="form-input form-area" type="text" name="bugDes" id="bugDes" value={formData.bugDes} onChange={handleChange} required ></textarea>
            </label>
            <label className="form-label" htmlFor="">
                Code 
                <input className="form-input" type="text" id='bugCode' name='bugCode'  value={formData.bugCode} onChange={handleChange} required  />
            </label>
            <label className="form-label" htmlFor="">
                Project name
                <input className="form-input" type="text" id='bugName' name='bugProject'  value={formData.bugProject} onChange={handleChange} required />
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