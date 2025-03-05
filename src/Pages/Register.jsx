import React from 'react'
import '../Static/css/Register.sass'
import { Header, Footer, Body_useClass, Title, Inputbox, SubmitButton } from '../Components/$exporter_components'

export default function RegisterPage() {
    Title("Metro 7 | Register");
    Body_useClass("registerpage");

    return (
        <>
        <Header/>
        <main class="PCMOD-body">
            <section class="registersection">
                <article>
                    <h1>REGISTER</h1>
                    <form>
                        <section class="inputside">
                            <div class="inputboxside">
                                <div class="twoinputbox">
                                    <Inputbox label="First Name" type="text" colIn/>
                                    <Inputbox label="Last Name" type="text" colIn/>
                                </div>
                                <div class="twoinputbox">
                                    <Inputbox label="Email" type="email" colIn/>
                                    <Inputbox label="Contact Number" type="number" colIn/>
                                </div>
                                <div class="twoinputbox">
                                    <Inputbox label="Password" type="password" colIn/>
                                    <Inputbox label="Confirm Password" type="password" colIn/>
                                </div>
                            </div>
                            {/* <div class="bodytermsandcondition">
                                <input type="checkbox"/>
                                <span class="body-text8">
                                    You agree to our Terms and Privacy Policy upon registration.
                                </span>
                            </div> */}
                        </section>
                        <SubmitButton label="SUBMIT"/>
                    </form>
                </article>
            </section>
            <Footer/>
        </main>
        </>
    )
}