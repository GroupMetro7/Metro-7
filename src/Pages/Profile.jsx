import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../Static/css/Profile.css'
import Header from '../Components/header'
import Footer from '../Components/footer'

function ProfilePage() {
    useEffect(() => {
        document.body.classList.add("profilepage");
        return () => {
            document.body.classList.remove("profilepage");
        };
    }, []);

    return(
        <>
        <title>Metro 7</title>
        <header>
            <Header/>
        </header>
        <main class="PCMOD-body">
            <div class="profilesection">
                <span>MY PROFILE</span>
                <div class="container">
                    <div class="myprofile">
                        <div class="bodyresform2"></div>
                        <div class="details">
                            <span class="name">micheal lance kester li</span>
                            <span>kesterli1998@gmail.com</span>
                            <span>09774956316</span>
                            <span class="loyalty">silver</span>
                        </div>
                        <div class="buttons">
                            <button>EDIT PROFILE</button>
                        </div>
                    </div>
                    <div class="orderhistory">
                        <span>ORDER HISTORY</span>
                        <div class="tb">
                            <div class="head">
                                <div class="col">
                                    <span>ORDER NO.</span>
                                </div>
                                <div class="col">
                                    <span>ORDER DATE</span>
                                </div>
                                <div class="col">
                                    <span>OPTIONS</span>
                                </div>
                                <div class="col">
                                    <span>AMOUNT</span>
                                </div>
                                <div class="col">
                                    <span>STATUS</span>
                                </div>
                            </div>
                            <div class="tbrow">
                                <div class="tbrow-2">
                                    <div class="col">
                                        <span>234567</span>
                                    </div>
                                    <div class="col">
                                        <span>2025-02-24 <br /> 02:27:25</span>
                                    </div>
                                    <div class="col">
                                        <span>TAKE OUT</span>
                                    </div>
                                    <div class="col">
                                        <span>₱559.00</span>
                                    </div>
                                    <div class="col status pending">
                                        <span>PENDING</span>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class="tbrow">
                                <div class="tbrow-2">
                                    <div class="col">
                                        <span>181818</span>
                                    </div>
                                    <div class="col">
                                        <span>2025-02-22 <br /> 02:27:25</span>
                                    </div>
                                    <div class="col">
                                        <span>TAKE OUT</span>
                                    </div>
                                    <div class="col">
                                        <span>₱358.00</span>
                                    </div>
                                    <div class="col status paid">
                                        <span>PAID</span>
                                    </div>
                                </div>
                                <hr />
                            </div>
                            <div class="tbrow">
                                <div class="tbrow-2">
                                    <div class="col">
                                        <span>176923</span>
                                    </div>
                                    <div class="col">
                                        <span>2025-01-08 <br /> 03:33:03</span>
                                    </div>
                                    <div class="col">
                                        <span>DINE-IN</span>
                                    </div>
                                    <div class="col">
                                        <span>₱1,258.00</span>
                                    </div>
                                    <div class="col status paid">
                                        <span>PAID</span>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </main>
        </>
    )
}

export default ProfilePage;