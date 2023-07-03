'use client'
import {createContext, useState} from 'react';

const MainContext = createContext({});

export function MainProvider({children})
{
    const [mobileNav, setMobileNav] = useState(true);
    const [data, setData] = useState([])

    const navbarMove = () =>
    {
        setMobileNav(!mobileNav)
    }

    return(
        <MainContext.Provider value={{mobileNav, setMobileNav, navbarMove, data, setData}}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;