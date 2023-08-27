import React from 'react'
import cl from './authButton.module.scss'
import { Link } from "react-router-dom";
import { useAppSelector } from '../../../hooks/redux';
import Avatar from '@mui/material/Avatar';

export function AuthButton() {

         const {isAuth, userName, userSurname} = useAppSelector(state => state.authReducer);
         return <>
                {isAuth ? <Link to={'/profile'} className={cl.auth_btn__user_contaiiner}>
                                <Avatar sx={{ bgcolor: 'orange' }}>
                                        {userName[0]}  {/* src={props.authorAvatar} alt="authorAvatar" */}
                                </Avatar>
                                <p className={cl.auth_btn__user_name}>{userName + ' ' + userSurname}</p>
                        </Link>
                : 
                <Link to={'/auth/login'} className={cl.auth_btn}>Войти</Link>
                }
            </>
        
}
