import React from 'react'
import '../../Static/css/Components/OUTPUTFETCH.sass'
import { Button, Outputfetch, SubmitButton } from '../components_exporter'

export default function ModalViewOrder() {
    return(
        <>
        <article class="modal-content">
            <h1>ORDER</h1>
            <form class="adchform">
                <section class="textside">
                    <section class="inputboxside">
                        <Outputfetch name="Name" value="Micheal Lance Kester Li"/>
                        <Outputfetch name="Email" value="kesterli1998@gmail.com"/>
                        <Outputfetch name="Contact Number" value="09774956316"/>
                        <Outputfetch name="Loyalty" value="Silver"/>
                    </section>
                    <section class="orderlistside">
                        <label>
                            <h3>Orders:</h3>
                                <div>
                                    <h2>Pork Steak</h2>
                                    <h2>₱581.00</h2>
                                </div>
                                <div>
                                    <h2>Bacardi</h2>
                                    <h2>₱369.00</h2>
                                </div>
                                <div>
                                    <h2>Bacardi</h2>
                                    <h2>₱369.00</h2>
                                </div>
                                <div>
                                    <h2>Bacardi</h2>
                                    <h2>₱369.00</h2>
                                </div>
                        </label>
                    </section>
                    <section class="inputboxside">
                        <Outputfetch name="Total Price" value="₱950.00"/>
                        <Outputfetch name="Discount" value="₱0.00"/>
                        <Outputfetch name="Payment Mode" value="ONLINE"/>
                    </section>
                </section>
                <section class="buttonside">
                    <Button name="CLOSE" closemodal formBtn />
                    <SubmitButton name="MARK AS PREPARED" formBtn />
                </section>
            </form>
        </article>
        </>
    )
}