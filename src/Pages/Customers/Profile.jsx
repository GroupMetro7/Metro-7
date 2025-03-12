import React from 'react'
import '../../Static/css/Profile.sass'
import { Title, Body_useClass, Header, Footer, Modal, Button } from '../../Components/components_exporter'

export default function ProfilePage() {
    Title("Profile")
    Body_useClass("profilepage")

    return (
        <>
        <Header/>
        <main class="PCMOD-body">
            <section class="profilesection">
                <h1>MY PROFILE</h1>
                <div class="container">
                    <div class="myprofile">
                        <img />
                        <article>
                            <h2 class="name">micheal lance kester li</h2>
                            <h3>kesterli1998@gmail.com</h3>
                            <h3>09774956316</h3>
                            <h3 class="loyalty">silver</h3>
                        </article>
                        <div class="buttons">
                            <Button name="EDIT PROFILE" openmodal />
                        </div>
                    </div>
                    <div class="orderhistory">
                        <h2>ORDER HISTORY</h2>
                        <div class="tb">
                            <div class="head">
                                <div class="col"></div>
                                <div class="col">
                                    <h3>ORDER NO.</h3>
                                </div>
                                <div class="col">
                                    <h3>ORDER DATE</h3>
                                </div>
                                <div class="col">
                                    <h3>OPTIONS</h3>
                                </div>
                                <div class="col">
                                    <h3>AMOUNT</h3>
                                </div>
                                <div class="col">
                                    <h3>STATUS</h3>
                                </div>
                            </div>
                            <div class="tbrow">
                                <div class="tbrow-2">
                                    <div class="col">
                                        <Button name="VIEW" />
                                    </div>
                                    <div class="col">
                                        <h3>234567</h3>
                                    </div>
                                    <div class="col">
                                        <h3>2025-02-24 <br /> 02:27:25</h3>
                                    </div>
                                    <div class="col">
                                        <h3>TAKE OUT</h3>
                                    </div>
                                    <div class="col">
                                        <h3>₱559.00</h3>
                                    </div>
                                    <div class="col status pending">
                                        <h3>PENDING</h3>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class="tbrow">
                                <div class="tbrow-2">
                                    <div class="col">
                                        <Button name="VIEW" />
                                    </div>
                                    <div class="col">
                                        <h3>181818</h3>
                                    </div>
                                    <div class="col">
                                        <h3>2025-02-22 <br /> 02:27:25</h3>
                                    </div>
                                    <div class="col">
                                        <h3>TAKE OUT</h3>
                                    </div>
                                    <div class="col">
                                        <h3>₱358.00</h3>
                                    </div>
                                    <div class="col status paid">
                                        <h3>PAID</h3>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class="tbrow">
                                <div class="tbrow-2">
                                    <div class="col">
                                        <Button name="VIEW" />
                                    </div>
                                    <div class="col">
                                        <h3>176923</h3>
                                    </div>
                                    <div class="col">
                                        <h3>2025-01-08 <br /> 03:33:03</h3>
                                    </div>
                                    <div class="col">
                                        <h3>DINE-IN</h3>
                                    </div>
                                    <div class="col">
                                        <h3>₱1,258.00</h3>
                                    </div>
                                    <div class="col status paid">
                                        <h3>PAID</h3>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Modal Deletecustomer/>
            <Footer/>
        </main>
        </>
    )
}