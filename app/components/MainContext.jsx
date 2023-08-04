'use client'
import {createContext, useState, useEffect} from 'react';

const MainContext = createContext({});

export function MainProvider({children})
{
    const [mobileNav, setMobileNav] = useState(false);
    const [LoginUser, setLoginUser] = useState(null)
    const [loggedIn, setLoggedIn] = useState(false)
    const [bugs, setBugs] = useState([])
    const [bugCards, setBugCards] = useState([])

    useEffect(() => {
        console.log("I have run again")
        fetch("/api/users/activeuser", {method: "GET"}).then(res => res.json()).then(data => {
        setLoginUser(data.user); setLoggedIn(true)}).catch(error => console.log(error))
       
    },[])

    useEffect(() => {
        setBugCards(bugs)
    },[bugs])

    useEffect(() => {
    },[bugCards])

    const navbarMove = () =>
    {
        setMobileNav(!mobileNav)
    }

    return(
        <MainContext.Provider value={{mobileNav, setMobileNav, navbarMove, LoginUser, setLoginUser, loggedIn, setLoggedIn, bugs, setBugs, bugCards, setBugCards}}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;