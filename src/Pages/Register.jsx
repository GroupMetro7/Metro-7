import React from 'react'
import '../Static/css/Register.sass'
import { Title, Body_useClass, Header, Footer, Inputbox, SubmitButton } from '../Components/components_exporter'

export default function RegisterPage() {
    Title("Metro 7 | Register")
    Body_useClass("registerpage")

    return(
        <>
        <Header/>
        <main class="PCMOD-body">
            <section class="registersection">
                <article>
                    <h1>REGISTER</h1>
                    <form>
                        <section class="inputside">
                            <div class="inputboxside">
                                    <Inputbox name="First Name" type="text" formIn/>
                                    <Inputbox name="Last Name" type="text" formIn/>
                                    <Inputbox name="Email" type="email" formIn/>
                                    <Inputbox name="Contact Number" type="number" formIn/>
                                    <Inputbox name="Password" type="password" formIn/>
                                    <Inputbox name="Confirm Password" type="password" formIn/>
                            </div>
                            {/* <div class="bodytermsandcondition">
                                <input type="checkbox"/>
                                <span class="body-text8">
                                    You agree to our Terms and Privacy Policy upon registration.
                                </span>
                            </div> */}
                        </section>
                        <SubmitButton name="SUBMIT" formBtn/>
                    </form>
                </article>
            </section>
            <Footer/>
        </main>
        </>
    )
}