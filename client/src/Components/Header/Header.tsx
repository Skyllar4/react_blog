import React from 'react'
import cl from './header.module.scss';

interface headerProps {
    children?: React.ReactNode
}

export function Header({children}: headerProps) {

     return  <header className={cl.header_container}>
             {children}
        </header>

}
