import React from 'react'
import '../../Static/css/Components/MODAL_FORM.sass'
import { Button, Inputbox, SubmitButton } from '../components_exporter'

export default function ModalAddcustomer() {
    return(
        <>
        <article class="modal-content">
            <h1>ADD CUSTOMER</h1>
            <form class="adchform">
                <section class="inputboxside">
                    <Inputbox name="First Name" type="text" formIn />
                    <Inputbox name="Last Name" type="text" formIn />
                    <Inputbox name="Email" type="text" formIn />
                    <Inputbox name="Contact Number" type="number" formIn />
                </section>
                <section class="buttonside">
                    <Button name="CANCEL" closemodal formBtn />
                    <SubmitButton name="CONFIRM" formBtn />
                </section>
            </form>
        </article>
        </>
    )
}