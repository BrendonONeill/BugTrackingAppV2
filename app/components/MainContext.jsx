'use client'
import {createContext, useState} from 'react';

const MainContext = createContext({});

export function MainProvider({children})
{
    const [mobileNav, setMobileNav] = useState(true);

    const navbarMove = () =>
    {
        setMobileNav(!mobileNav)
    }

    return(
        <MainContext.Provider value={{mobileNav, setMobileNav, navbarMove}}>
            {children}
        </MainContext.Provider>
    )
}

export default MainContext;