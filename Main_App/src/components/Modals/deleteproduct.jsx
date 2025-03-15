import React from 'react'
import '../../Static/css/Components/OUTPUTFETCH.sass'
import { Button, Outputfetch, SubmitButton } from '../components_exporter'

export default function ModalDeleteproduct() {
    return(
        <>
        <article class="modal-content">
            <h1>DELETE PRODUCT</h1>
            <form class="adchform">
                <section class="inputboxside">
                    <Outputfetch name="Item Name" value="salmon"/>
                    <Outputfetch name="Category" value="meat"/>
                    <Outputfetch name="Stock" value="24"/>
                    <Outputfetch name="Cost Per Unit" value="₱58.00"/>
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