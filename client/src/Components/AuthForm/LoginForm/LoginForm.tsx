import React from "react";
import { login } from "../../../services/auth-service";
import { MyForm } from "../../UI/form/MyForm";

export function LoginForm() {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeMail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    }

    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(email, password);
        setEmail('');
        setPassword('');
    }

    return <MyForm fields={[
        {
            name: 'email',
            type: 'email',
            placeHolder: 'Email',
            value: email,
            onChange: handleChangeMail
        },
        {
            name: 'password',
            type: 'password',
            placeHolder: "Пароль",
            value: password,
            onChange: handleChangePass
        }
    ]} 
            submitValue="Войти"
            handleSubmit={handleSubmit}
            formTitle="Вход"
    />

}
