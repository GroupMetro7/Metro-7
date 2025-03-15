import React from 'react'
import { Body_useClass, Inputbox, Radio, Title } from '../../../Main_App/src/components/components_exporter'
import '../../../Main_App/src/Static/css/Menu.sass'

export default function Menupage() {
    Title("Metro 7 | Menu")
    Body_useClass("menupage")

    return (
        <>
        <main className="PCMOD-body">
            <section className="menusection">
                <h1>MENU ORDER</h1>
                <div className="searchbar">
                    <Inputbox name="Search" type="search"/>
                </div>
                <div class="filters">
                    <Radio name="MEALS" radioname="order"/>
                    <Radio name="SIDES" radioname="order"/>
                    <Radio name="BEVERAGES" radioname="order"/>
                    <Radio name="LIQUOR" radioname="order"/>
                </div>
                <div className="menuitems">
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                    <div className="item">
                        <img src=""/>
                        <article>
                            <h2>item title</h2>
                            <div className="priceadditem">
                                <h3>₱100.00</h3>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </main>
        </>
    )
}