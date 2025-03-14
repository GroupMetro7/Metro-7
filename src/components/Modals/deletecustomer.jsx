import React from 'react'
import '../../Static/css/Components/OUTPUTFETCH.sass'
import { Button, Outputfetch, SubmitButton } from '../components_exporter'

export default function ModalDeletecustomer() {
    return(
        <>
        <article class="modal-content">
            <h1>DELETE CUSTOMER</h1>
            <form class="adchform">
                <section class="inputboxside">
                    <Outputfetch name="Name" value="Micheal Lance Kester Li"/>
                    <Outputfetch name="Email" value="kesterli1998@gmail.com"/>
                    <Outputfetch name="Contact Number" value="09774956316"/>
                    <Outputfetch name="Loyalty" value="Silver"/>
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