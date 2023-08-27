import React from 'react';
import cl from './myInput.module.scss';

export interface inputProps { // экспортируем в MyForm
    type: string,
    placeHolder?: string,
    value?: string,
    name?: string,
    className?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function MyInput(props: inputProps) {

    // класс form-input находится в App.scss

  return <>
            <input
                className={props.className ? props.className : cl.custom_input} 
                name={props.name} 
                onChange={props.onChange} 
                type={props.type} 
                value={props.value} 
                placeholder={props.placeHolder} />
        </>

}
