import React from 'react';
import cl from './myButton.module.scss';

interface buttonProps {
    readonly buttonValue: string,
    type?: string,
    className?: string,
}

// Пока не нужен атрибут reset у кнопки, поэтому игнорируем его

export function MyButton(props: buttonProps) {

    return <button className={cl.custom_btn} type={props.type === 'submit' ? props.type : 'button'}>{props.buttonValue}</button>

}
