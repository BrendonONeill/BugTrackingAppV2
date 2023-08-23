export function userValidation(formData)
{
    console.log("called valid")
    if(formData.fname.length < 2)
    {
        return {
            validation : false,
            body : {fnameVal: false, lnameVal: true, emailVal: true, passwordVal: true, titleVal: true},
            errorMessage : "First Name is too short"
        }
    }
    if(formData.fname.length > 15)
    {
        return {
            validation : false,
            body : {fnameVal: false, lnameVal: true, emailVal: true, passwordVal: true, titleVal: true},
            errorMessage : "First Name is too long"
        }
    }


    if(formData.lname.length < 2)
    {
        return {
            validation : false,
            body : {fnameVal: true, lnameVal: false, emailVal: true, passwordVal: true, titleVal: true},
            errorMessage : "Last Name is too short"
        }
    }

    if(formData.lname.length > 15)
    {
        return {
            validation : false,
            body : {fnameVal: true, lnameVal: false, emailVal: true, passwordVal: true, titleVal: true},
            errorMessage : "Last Name is too long"
        }
    }
    if(formData.email.length < 6)
    {
        return {
            validation : false,
            body : {fnameVal: true, lnameVal: true, emailVal: false, passwordVal: true, titleVal: true},
            errorMessage : "Email is too short"
        }
    }

    if(formData.email.length > 35)
    {
        return {
            validation : false,
            body : {fnameVal: true, lnameVal: true, emailVal: false, passwordVal: true, titleVal: true},
            errorMessage : "Email is too long"
        }
    }

    if(formData?.password)
    {
        if(formData.password !== formData.passwordConfirm)
    {
        return {
            validation : false,
            body : {fnameVal: true, lnameVal: true, emailVal: true, passwordVal: false, titleVal: true},
            errorMessage : "Passwords are not the same"
        }
    }


    if(formData.password.length < 5 && formData.passwordConfirm.length < 5)
    {
        return {
            validation : false,
            body : {fnameVal: true, lnameVal: true, emailVal: true, passwordVal: false, titleVal: true},
            errorMessage : "Password is too short"
        } 
    }
    }

    if(formData.title.length < 3)
    { 
        return {
            validation : false,
            body : {fnameVal: true, lnameVal: true, emailVal: true, passwordVal: true, titleVal: false},
            errorMessage : "Title is too short"
        }
    }

    if(formData.title.length > 25)
    { 
        return {
            validation : false,
            body : {fnameVal: true, lnameVal: true, emailVal: true, passwordVal: true, titleVal: false},
            errorMessage : "Title is too long"
        }
    }
    return true
}