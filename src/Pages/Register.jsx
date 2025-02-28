import React, { useEffect } from 'react'
import '../Static/css/Register.css'
import Header from '../Components/header'
import Footer from '../Components/footer'

function RegisterPage() {
    useEffect(() => {
        document.body.classList.add("registerpage");
        return () => {
            document.body.classList.remove("registerpage");
        };
    }, []);

    return (
        <>
        <title>Metro 7</title>
        <header>
            <Header/>
        </header>
        <main class="PCMOD-body">
            <div class="registersection">
                <div class="form">
                    <span>REGISTER</span>
                    <form>
                        <div class="inputside">
                            <div class="inputboxside">
                                <div class="twoinputbox">
                                    <div class="inputs">
                                        <span>First Name:</span>
                                        <input type="text"/>
                                    </div>
                                    <div class="inputs">
                                        <span>Last Name:</span>
                                        <input type="text"/>
                                    </div>
                                </div>
                                <div class="twoinputbox">
                                    <div class="inputs">
                                        <span>Email:</span>
                                        <input type="text"/>
                                    </div>
                                    <div class="inputs">
                                        <span>Contact Number:</span>
                                        <input type="text"/>
                                    </div>
                                </div>
                                <div class="twoinputbox">
                                    <div class="inputs">
                                        <span>Password:</span>
                                        <input type="password"/>
                                    </div>
                                    <div class="inputs">
                                        <span>Confirm Password:</span>
                                        <input type="password"/>
                                    </div>
                                </div>
                            </div>
                            {/* <div class="bodytermsandcondition">
                                <input type="checkbox"/>
                                <span class="body-text8">
                                    You agree to our Terms and Privacy Policy upon registration.
                                </span>
                            </div> */}
                        </div>
                        <button>SUBMIT</button>
                    </form>
                </div>
            </div>
            <Footer/>
        </main>
        </>
    );
};

export default RegisterPage;