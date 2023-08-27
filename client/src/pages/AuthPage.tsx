import React from "react";
import { LoginForm } from "../Components/AuthForm/LoginForm/LoginForm";
import { RegisterForm } from "../Components/AuthForm/RegisterForm/RegisterForm";
import { useAppSelector } from "../hooks/redux";
import { Navigate } from "react-router-dom";
import { Layout } from "../Components/Layout/Layout";

interface authProps {
    authState: string
}

export function AuthPage({authState}: authProps) { // Проп определяет состояние и какую форму отобразить login/register

    // Состояний регистрации может быть только 2

    const {isAuth} = useAppSelector(state => state.authReducer);

    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return <Layout>
            {authState === 'login' ? 
                <LoginForm />
             : 
                <RegisterForm />
            }
        </Layout>

}
