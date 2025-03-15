import React from 'react'
import '../../Static/css/Components/OUTPUTFETCH.sass'
import { Button, Outputfetch, SubmitButton } from '../components_exporter'

export default function ModalDeleteemployee() {
    return(
        <>
        <article class="modal-content">
            <h1>DELETE EMPLOYEE</h1>
            <form class="adchform">
                <section class="inputboxside">
                    <Outputfetch name="Name" value="Micheal Lance Kester Li"/>
                    <Outputfetch name="Email" value="kesterli1998@gmail.com"/>
                    <Outputfetch name="Role" value="Service"/>
                    <Outputfetch name="Schedule" value="Weekdays | 09:00 — 05:00"/>
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