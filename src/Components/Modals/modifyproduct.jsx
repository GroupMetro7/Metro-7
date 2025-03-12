import React from 'react'
import '../../Static/css/Components/MODAL_FORM.sass'
import { Button, Inputbox, SubmitButton } from '../components_exporter'

export default function ModalModifyproduct() {
    return(
        <>
        <article class="modal-content">
            <h1>MODIFY PRODUCT</h1>
            <form class="adchform">
                <section class="inputboxside">
                    <Inputbox name="Item Name" type="text" value="" formIn />
                    <Inputbox name="Category" type="text" value="" formIn />
                    <Inputbox name="Stock" type="number" value="" formIn />
                    <Inputbox name="Cost Per Unit" type="number" value="" formIn />
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