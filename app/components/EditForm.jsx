"use client"
import { useRouter } from "next/navigation";
import { useState } from "react"

function EditForm({data, id}) {
  const router = useRouter()
  const [formData, setFormData] = useState({ bugName: data.bugName, bugDes: data.bugDes, bugCode: data.bugCode, bugProject: data.bugProject, bugImportance: data.bugImportance, bugPrivate: data.bugPrivate});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cat = async (e) => {
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
            <label htmlFor="">
                Private
                <input type="text" id='bugName' name='bugPrivate'  value={formData.bugPrivate} onChange={handleChange} />
            </label>
            <input type="submit" value="Submit" />
            <input type="reset" value="Reset" />
        </form>
</div>
  )
}

export default EditForm