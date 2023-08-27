import React from 'react';
import { register } from '../../../services/auth-service';
import { MyForm } from '../../UI/form/MyForm';

export function RegisterForm() {

    const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
          setName(e.target.value);
    }

    const handleChangeSurname = (e: React.ChangeEvent<HTMLInputElement>) => {
          setSurname(e.target.value);          
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
          setEmail(e.target.value);
    }

    const handleChangePass = (e: React.ChangeEvent<HTMLInputElement>) => {
          setPassword(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          await register(email, password, name, surname);
          setName('');
          setSurname('');
          setEmail('');
          setPassword('');
    }

    return <MyForm 
            
            fields={
                  [
                        {
                              name: 'name',
                              type: 'text',
                              placeHolder: 'Имя',
                              value: name,
                              onChange: handleChangeName
                        },
                        {
                              name: 'surname',
                              type: 'text',
                              placeHolder: 'Фамилия',
                              value: surname,
                              onChange: handleChangeSurname
                        },
                        {
                              name: 'email',
                              type: 'email',
                              placeHolder: 'Email',
                              value: email,
                              onChange: handleChangeEmail
                        },
                        {
                              name: 'password',
                              type: 'password',
                              placeHolder: 'Пароль',
                              value: password,
                              onChange: handleChangePass
                        }
                  ]
            }
                              submitValue='Зарегистрироваться'
                              handleSubmit={handleSubmit}
                              formTitle='Регистрация'
            />

}
