'use client'
import {createContext, useState, useEffect} from 'react';
import {cookie} from 'js-cookie'

const MainContext = createContext({});

export function MainProvider({children})
{
    const [mobileNav, setMobileNav] = useState(false);
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])
    const [LoginUser, setLoginUser] = useState(null)
    const [active, setActive] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        fetch("/api/bugs", {method: "GET", cache: 'no-store'}).then(res => res.json()).then(data => {setData(data)}).catch(error => console.log(error))
        fetch("/api/users", {method: "GET", cache: 'no-store'}).then(res => res.json()).then(data => {setUsers(data)}).catch(error => console.log(error))
        fetch("/api/users/activeuser", {method: "GET", cache: 'no-store'}).then(res => res.json()).then(data => {
        setActive(data.user)}).catch(error => console.log(error))
       
    },[])

    useEffect(() => {
        const user = users.filter((user) => user._id === active);
        setLoginUser(user[0])
    },[users])

    useEffect(() => {
        if(LoginUser)
        {
            setLoggedIn(true)
        }
    },[LoginUser])

    const navbarMove = () =>
    {
        setMobileNav(!mobileNav)
    }

    return(
        <MainContext.Provider value={{mobileNav, setMobileNav, navbarMove, data, setData, users, setUsers, LoginUser, setLoginUser, loggedIn, setLoggedIn}}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;