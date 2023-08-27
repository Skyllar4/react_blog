import React from 'react';
import { MyInput } from '../input/MyInput';
import { inputProps } from '../input/MyInput';
import { MyButton } from '../button/MyButton';
import cl from './myForm.module.scss';

interface formProps {
    children?: React.ReactNode,
    fields: Array<inputProps>,
    readonly submitValue: string,
    handleSubmit: (e: React.FormEvent) => void,
    formTitle?: string
}

export function MyForm(props: formProps) {

  const formFields = props.fields.map((item, index) => 
        <MyInput 
        key={index} 
        type={item.type} 
        name={item.name}
        className='form-input'
        placeHolder={item.placeHolder} 
        onChange={item.onChange} 
        value={item.value} />  
  );

  return <form action="#" className={cl.my_form} onSubmit={props.handleSubmit}>
            {props.formTitle && 
                <h2 className={cl.form_title}>{props.formTitle}</h2>
            }
            {props.children}
            {formFields}
            <MyButton type='submit' buttonValue={props.submitValue} />
        </form>

}
