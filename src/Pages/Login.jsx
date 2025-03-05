import React from 'react'
import '../Static/css/Login.sass'
import { Header, Footer, Body_useClass, Title, Inputbox, SubmitButton, Href } from '../Components/$exporter_components'

export default function LoginPage() {
    Title("Metro 7 | Login");
    Body_useClass("loginpage");

    return(
        <>
        <Header/>
        <main class="PCMOD-body">
            <section class="loginsection">
                <article>
                    <h1>LOGIN</h1>
                    <form>
                        <section class="inputside">
                            <Inputbox label="Email" type="email" colIn/>
                            <Inputbox label="Password" type="password" colIn/>
                        </section>
                        <section class="buttonside">
                            <SubmitButton label="LOGIN"/>
                            <Href label="CREATE ACCOUNT" navigatation="/register"/>
                        </section>
                    </form>
                </article>
            </section>
            <Footer/>
        </main>
        </>
    )
}