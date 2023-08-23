export function bugValidation(formData)
{
    console.log("called valid")
    if(formData.bugName.length < 3)
    {
        return {
            validation : false,
            body : {NameVal : false, DesVal: true, CodeVal: true, ProjectVal: true},
            errorMessage : "Bug Name is too short"
        }
    }
    if(formData.bugName.length > 30)
    {

        return {
            validation : false,
            body : {NameVal : false, DesVal: true, CodeVal: true, ProjectVal: true},
            errorMessage : "Bug Name is too Long"
        }
    }

    if(formData.bugDes.length < 5)
    {
        return {
            validation : false,
            body : {NameVal : true, DesVal: false, CodeVal: true, ProjectVal: true},
            errorMessage : "Description is too short"
        }
    }
    if(formData.bugDes.length > 200)
    {
        return {
            validation : false,
            body : {NameVal : true, DesVal: false, CodeVal: true, ProjectVal: true},
            errorMessage : "Description is too Long"
        }
    }
    if(formData.bugCode.length < 3)
    {
        return {
            validation : false,
            body : {NameVal : true, DesVal: true, CodeVal: false, ProjectVal: true},
            errorMessage : "Code name is too short"
        }
    }
    if(formData.bugCode.length > 20)
    {
        return {
            validation : false,
            body : {NameVal : true, DesVal: true, CodeVal: false, ProjectVal: true},
            errorMessage : "Code name is too Long"
        }
    }
    if(formData.bugProject.length < 3)
    {
        return {
            validation : false,
            body : {NameVal : true, DesVal: true, CodeVal: true, ProjectVal: false},
            errorMessage : "Project Name is too short"
        }
    }
    if(formData.bugProject.length > 30)
    {
        return {
            validation : false,
            body : {NameVal : true, DesVal: true, CodeVal: true, ProjectVal: false},
            errorMessage : "Project Name is too Long"
        }
    }
    return {validation : true}
}