import React from 'react'
import '../../Static/css/Components/MODAL_FORM.sass'
import { Button, Inputbox, SubmitButton } from '../components_exporter'

export default function ModalModifycustomer() {
    return(
        <>
        <article class="modal-content">
            <h1>MODIFY CUSTOMER</h1>
            <form class="adchform">
                <section class="inputboxside">
                    <Inputbox name="First Name" type="text" value="" formIn />
                    <Inputbox name="Last Name" type="text" value="" formIn />
                    <Inputbox name="Email" type="text" value="" formIn />
                    <Inputbox name="Contact Number" type="number" value="" formIn />
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