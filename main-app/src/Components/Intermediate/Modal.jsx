import React from 'react'
import '../../Assets/CSS/Components/Modal.sass'

export default function Modal({ children, Modal }) {

    return(
        <div className={`modal fade`} id={ Modal } tabIndex={`-1`} aria-hidden={`true`}>
            <div className={`modal-dialog modal-dialog-centered`}>
                { children }
            </div>
        </div>
    )
}