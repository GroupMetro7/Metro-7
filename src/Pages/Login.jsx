import React from 'react'
import '../Static/css/Login.sass'
import { Title, Body_useClass, Header, Footer, Inputbox, SubmitButton, Href } from '../Components/components_exporter'

export default function LoginPage() {
    Title("Metro 7 | Login")
    Body_useClass("loginpage")

    return(
        <>
        <Header/>
        <main class="PCMOD-body">
            <section class="loginsection">
                <article>
                    <h1>LOGIN</h1>
                    <form>
                        <section class="inputside">
                            <Inputbox name="Email" type="email" formIn/>
                            <Inputbox name="Password" type="password" formIn/>
                        </section>
                        <section class="buttonside">
                            <SubmitButton name="LOGIN" formBtn/>
                            <Href name="CREATE ACCOUNT" navigatation="/register"/>
                        </section>
                    </form>
                </article>
            </section>
            <Footer/>
        </main>
        </>
    )
}