import React from 'react'
import '../Static/css/Menu.sass'
import { Title, Body_useClass, Header, Footer, Inputbox, Radio } from '../Components/components_exporter'

export default function LocationPage() {
    Title("Metro 7 | Menu")
    Body_useClass("menupage")

    return (
        <>
        <Header/>
        <main class="PCMOD-body">
            <section class="menusection">
                <h1>MENU ORDER</h1>
                <div class="searchbar">
                    <Inputbox name="Search" type="search"/>
                </div>
                <div class="filters">
                    <Radio name="MEALS" radioname="order"/>
                    <Radio name="SIDES" radioname="order"/>
                    <Radio name="BEVERAGES" radioname="order"/>
                    <Radio name="LIQUOR" radioname="order"/>
                </div>
                <div class="menuitems">
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div class="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div class="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
            <Footer/>
        </main>
        </>
    )
}