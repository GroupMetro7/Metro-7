import React, { useEffect } from 'react'
import '../Static/css/Login.css'
import Header from '../Components/header'
import Footer from '../Components/footer'

function LoginPage() {
    useEffect(() => {
        document.body.classList.add("loginpage");
        return () => {
            document.body.classList.remove("loginpage");
        };
        }, []);

    return(
        <>
        <title>Metro 7</title>
        <header>
            <Header/>
        </header>
        <main class="PCMOD-body">
            <div class="loginsection">
                <div class="form">
                    <span>LOGIN</span>
                    <form>
                        <div class="inputside">
                            <div class="inputs">
                                <span>Email Address:</span>
                                <input type="text"/>
                            </div>
                            <div class="inputs">
                                <span>Password:</span>
                                <input type="password"/>
                            </div>
                        </div>
                        <button>LOGIN</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </main>
        </>
    )
}

export default LoginPage