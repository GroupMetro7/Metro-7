import React from 'react'
import '../../Static/css/Components/MODAL_FORM.sass'
import { Button, Inputbox, SubmitButton } from '../components_exporter'

export default function ModalModifyemployee() {
    return(
        <>
        <article class="modal-content">
            <h1>MODIFY EMPLOYEE</h1>
            <form class="adchform">
                <section class="inputboxside">
                    <Inputbox name="First Name" type="text" value="" formIn />
                    <Inputbox name="Last Name" type="text" value="" formIn />
                    <Inputbox name="Email" type="text" value="" formIn />
                    <Inputbox name="Role" type="text" value="" formIn />
                    <Inputbox name="Schedule" type="text" value="" formIn />
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