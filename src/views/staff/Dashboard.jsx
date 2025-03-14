import { useState, useEffect } from 'react'
import '../../Static/css/Service_Dashboard.sass'
import { Title, Body_useClass, Sidebar, Modal, Inputbox, Button, Radio } from '../../components/components_exporter';


export default function ServiceDashboardPage() {
    Title("Service Dashboard")
    Body_useClass("servicedashboardpage")

    const date = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const showDays = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear();

    const [time, setTime] = useState("");

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
        };

      updateClock();
      const interval = setInterval(updateClock, 1);

    }, []);

    return (
        <>
        <main class="PCMOD-body">
            <div class="dashboardsection">
                <div class="leftside">
                    <div class="prepordersection">
                        <div class="title">
                            <h1>PREPARING ORDER</h1>
                            <Button name="VIEW ALL ORDERS" navigatation="/orderlist" redirect/>
                        </div>
                        <div class="orders">
                            <div class="filters">
                                <Radio name="NOT STARTED" radioname="order"/>
                                <Radio name="PREPARING" radioname="order"/>
                                <Radio name="PREPARED" radioname="order"/>
                                <Radio name="DONE" radioname="order"/>
                            </div>
                            <div class="list">
                                <div class="item">
                                    <h3>#25569</h3>
                                    <h2>TAKE-OUT</h2>
                                    <Button name="VIEW"/>
                                </div>
                                <div class="item">
                                    <h3>#12403</h3>
                                    <h2>DINE-IN</h2>
                                    <Button name="VIEW"/>
                                </div>
                                <div class="item">
                                    <h3>#25569</h3>
                                    <h2>TAKE-OUT</h2>
                                    <Button name="VIEW"/>
                                </div>
                                <div class="item">
                                    <h3>#26891</h3>
                                    <h2>DINE-IN</h2>
                                    <Button name="VIEW"/>
                                </div>
                                <div class="item">
                                    <h3>#25569</h3>
                                    <h2>TAKE-OUT</h2>
                                    <Button name="VIEW"/>
                                </div>
                                <div class="item">
                                    <h3>#25569</h3>
                                    <h2>TAKE-OUT</h2>
                                    <Button name="VIEW"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section class="menusection">
                        <h1>MENU ORDER</h1>
                        <div class="searchbar">
                            <Inputbox name="Search" type="search"/>
                            <Inputbox name="Filter" type="search"/>
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
                </div>
                <div class="rightside">
                    <div class="checkoutsection">
                        <div class="time">
                            <h2>{ showDays }<br/>{ time }</h2>
                            <hr />
                        </div>
                        <div class="customername">
                            <Inputbox name="Customer" type="text"/>
                            <hr />
                        </div>
                        <div class="diningoption">
                            <div class="filters">
                                <Radio name="DINE-IN" radioname="dining"/>
                                <Radio name="TAKE-OUT" radioname="dining"/>
                            </div>
                            <hr />
                        </div>
                        <div class="totalitem">
                            <h3>TOTAL ITEM</h3>
                            <div class="itemlist">
                                <div class="item">
                                    <img src=''/>
                                    <article>
                                        <h3>ITEM TITLE</h3>
                                        <div>
                                            <h3>₱100.00</h3>
                                            <div class="quantity">
                                                <Button name="&lt;"/>
                                                <div>
                                                    <h2>23</h2>
                                                </div>
                                                <Button name="&gt;"/>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div class="item">
                                    <img src=''/>
                                    <article>
                                        <h3>ITEM TITLE</h3>
                                        <div>
                                            <h3>₱100.00</h3>
                                            <div class="quantity">
                                                <Button name="&lt;"/>
                                                <div>
                                                    <h2>23</h2>
                                                </div>
                                                <Button name="&gt;"/>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div class="item">
                                    <img src=''/>
                                    <article>
                                        <h3>ITEM TITLE</h3>
                                        <div>
                                            <h3>₱100.00</h3>
                                            <div class="quantity">
                                                <Button name="&lt;"/>
                                                <div>
                                                    <h2>23</h2>
                                                </div>
                                                <Button name="&gt;"/>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div class="paymentsummary">
                            <article>
                                <h2>PAYMENT SUMMARY</h2>
                                <div>
                                    <h2>TOTAL PRICE:</h2>
                                    <h3>₱581.00</h3>
                                </div>
                                <div>
                                    <h2>DISCOUNT:</h2>
                                    <h3>₱0.00</h3>
                                </div>
                            </article>
                            <Button name="CHECKOUT"/>
                        </div>
                    </div>
                </div>
            </div>
            <Modal ViewOrder/>

        </main>
        </>
    )
}