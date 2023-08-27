import React from 'react'
import cl from './modal.module.scss';

interface ModalProps {
    active: boolean,
    setActive: (active: boolean) => void,
    children?: React.ReactNode
}

export function Modal({active, setActive, children}: ModalProps) {

    const clasesModal = cl.modal_active + ' ' + cl.modal;
    const clasesModalContent = cl.modal__content_active + ' ' + cl.modal__content;

       return <div className={active ? clasesModal : cl.modal} onClick={() => setActive(false)}>
                <div className={active ? clasesModalContent : cl.modal__content} onClick={e => e.stopPropagation()}>
                    {children}
                </div>
            </div>

}
