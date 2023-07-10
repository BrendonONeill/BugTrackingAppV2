'use client'
import {createContext, useState, useEffect} from 'react';

const MainContext = createContext({});

export function MainProvider({children})
{
    const [mobileNav, setMobileNav] = useState(false);
    const [data, setData] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch("/api/bugs", {method: "GET", cache: 'no-store'}).then(res => res.json()).then(data => {setData(data)}).catch(error => console.log(error))
        fetch("/api/users", {method: "GET", cache: 'no-store'}).then(res => res.json()).then(data => {setUsers(data)}).catch(error => console.log(error))
    },[])

    const navbarMove = () =>
    {
        setMobileNav(!mobileNav)
    }

    return(
        <MainContext.Provider value={{mobileNav, setMobileNav, navbarMove, data, setData, users, setUsers}}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;