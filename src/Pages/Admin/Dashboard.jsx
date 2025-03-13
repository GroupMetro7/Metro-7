import { useState, useEffect } from 'react'
import '../../Static/css/Admin_Dashboard.sass'
import '../../Static/css/temp.scss'
import { Title, Body_useClass, Sidebar, Modal, Inputbox, Button, Radio } from '../../Components/components_exporter'
import { VIEWLOGO } from '../../Static/public_exporter'

export default function AdminDashboardPage() {
    Title("Admin Dashboard")
    Body_useClass("admindashboardpage")

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
        <Sidebar AdminMode/>
        <main class="PCMOD-body">
            <div class="dashboardsection">
                <div class="revenuesection">
                    <h1>SALES REVENUE</h1>
                    <div class="upper">
                        <div class="kpis">
                            <div class="kpi red1">
                                <h3>TOTAL SALES</h3>
                                <h1>₱230,631.00</h1>
                                <p class="add">+₱8,271.00</p>
                            </div>
                            <div class="kpi red2">
                                <h3>THIS MONTH</h3>
                                <h1>₱34,106.00</h1>
                                <p class="add">+₱3,599.00</p>
                            </div>
                            <div class="kpi red3">
                                <h3>TODAY</h3>
                                <h1>₱13,331.00</h1>
                                <p class="add">-₱31.00</p>
                            </div>
                            <div class="kpi">
                                <h3>RATE</h3>
                                <h1>23.8%</h1>
                                <p class="add">+1.4%</p>
                            </div>
                        </div>
                        <div class="time">
                            <h2>{ showDays }<br/>{ time }</h2>
                            <hr />
                        </div>
                    </div>
                    <div class="charts">
                        <div class="salestatus">
                            <h2>SALES STATUS</h2>
                            <img src=''/>
                        </div>
                        <div class="topcategory">
                            <h2>TOP CATEGORY</h2>
                            <img src=''/>
                        </div>
                        <div class="demandforecast">
                            <h2>DEMAND FORECAST</h2>
                            <img src=''/>
                        </div>
                    </div>
                </div>
                <div class="orderlist">
                    <h2>RECENT ORDER</h2>
                    <div class="tb">
                        <div class="head">
                            <div class="col">
                                <h3>ORDER NO.</h3>
                            </div>
                            <div class="col">
                                <h3>ORDER DATE</h3>
                            </div>
                            <div class="col">
                                <h3>CASHIER NAME</h3>
                            </div>
                            <div class="col">
                                <h3>OPTIONS</h3>
                            </div>
                            <div class="col">
                                <h3>AMOUNT</h3>
                            </div>
                            <div class="col-btn">
                            </div>
                        </div>
                        <div class="tbrow">
                            <div class="tbrow-2">
                                <div class="col">
                                    <h3>234567</h3>
                                </div>
                                <div class="col">
                                    <h3>2025-02-24 <br /> 02:27:25</h3>
                                </div>
                                <div class="col">
                                    <h3>Micheal Lance Kester Li</h3>
                                </div>
                                <div class="col">
                                    <h3>TAKE OUT</h3>
                                </div>
                                <div class="col">
                                    <h3>₱559.00</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={<img src={VIEWLOGO} />} openmodal />
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div class="tbrow">
                            <div class="tbrow-2">
                                <div class="col">
                                    <h3>12403</h3>
                                </div>
                                <div class="col">
                                    <h3>2025-02-22 <br /> 02:27:25</h3>
                                </div>
                                <div class="col">
                                    <h3>Eryck del Fonso</h3>
                                </div>
                                <div class="col">
                                    <h3>DINE-IN</h3>
                                </div>
                                <div class="col">
                                    <h3>₱888.00</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={<img src={VIEWLOGO} />} openmodal />
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div class="tbrow">
                            <div class="tbrow-2">
                                <div class="col">
                                    <h3>26891</h3>
                                </div>
                                <div class="col">
                                    <h3>2025-02-24 <br /> 02:36:00</h3>
                                </div>
                                <div class="col">
                                    <h3>Michael Angelo Lim</h3>
                                </div>
                                <div class="col">
                                    <h3>DINE-IN</h3>
                                </div>
                                <div class="col">
                                    <h3>₱2,038.00</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={<img src={VIEWLOGO} />} openmodal />
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                </div>
            </div>
            
        </main>
        </>
    )
}