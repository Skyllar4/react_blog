import React from 'react'
import classes from './logo.module.scss';
import { Link } from 'react-router-dom';

export function Logo() {

    return <Link to={'/'}>
                <img className={classes.header__logo} src="logo.svg" alt="logo" />
            </Link>
}   
