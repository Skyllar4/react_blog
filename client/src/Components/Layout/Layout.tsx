import React from 'react'
import cl from './layout.module.scss';
import { Header } from '../Header/Header';
import { Logo } from '../Header/Logo/Logo';
import { Search } from '../Header/Search/Search';
import { AuthButton } from '../Header/Auth/AuthButton';

interface layoutProps {
    children?: React.ReactNode
}

export function Layout({children}: layoutProps) {

    return <>
            <Header>
                <Logo />
                <Search />
                <AuthButton />
            </Header>
            <main className={cl.main_content}>
                {children}
            </main>
        </>
}
