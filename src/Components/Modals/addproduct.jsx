import React from 'react'
import '../../Static/css/Components/MODAL_FORM.sass'
import { Button, Inputbox, SubmitButton } from '../components_exporter'

export default function ModalAddproduct() {
    return(
        <>
        <article class="modal-content">
            <h1>ADD PRODUCT</h1>
            <form class="adchform">
                <section class="inputboxside">
                    <Inputbox name="Item Name" type="text" formIn />
                    <Inputbox name="Category" type="text" formIn />
                    <Inputbox name="Stock" type="number" formIn />
                    <Inputbox name="Cost Per Unit" type="number" formIn />
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