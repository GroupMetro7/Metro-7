import { useState, useEffect } from 'react'
import '../../Static/css/Service_Profile.sass'
import '../../Static/css/temp.scss'
import { Title, Body_useClass, Sidebar, Modal, Inputbox, Button, Radio } from '../../Components/components_exporter'

export default function ServiceProfilePage() {
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
        <Sidebar CashierMode/>
        <main class="PCMOD-body">
            <div class="profilesection">
                <div class="leftside">
                    <div class="myprofile">
                        <h1>MY PROFILE</h1>
                        <div>
                            <img />
                            <article>
                                <h2 class="name">micheal lance kester li</h2>
                                <h3>245002589</h3>
                            </article>
                            <div class="buttons">
                                <Button name="EDIT PROFILE" openmodal />
                            </div>
                        </div>
                    </div>
                    <div class="statistics">
                        <h2>STATISTICS</h2>
                        <div class="graph"></div>
                        <h2>REVENUE REPORT</h2>
                        <div class="report">
                            <div class="daterange">
                                <Button name="&lt;"/>
                                <div>
                                    <h2>AUGUST 1 - 15</h2>
                                </div>
                                <Button name="&gt;"/>
                            </div>
                            <article>
                                <div>
                                    <h2>CASH:</h2>
                                    <h3>₱20,581.00</h3>
                                </div>
                                <div>
                                    <h2>NON-CASH:</h2>
                                    <h3>₱2,258.00</h3>
                                </div>
                                <div>
                                    <h2>DISCOUNT:</h2>
                                    <h3>₱369.00</h3>
                                </div>
                                <div>
                                    <h2>NET SALES:</h2>
                                    <h3>₱0.00</h3>
                                </div>
                                <div>
                                    <h2>RECEIPTS:</h2>
                                    <h3>158</h3>
                                </div>
                            </article>
                        </div>
                    </div>

                </div>
                <div class="rightside">
                    <div class="attendancesection">
                        <div class="time">
                            <h2>{ showDays }<br/>{ time }</h2>
                            <hr />
                        </div>
                        <div class="attendance">
                            <Button name="TIME-IN"></Button>
                            <Button name="TIME-OUT"></Button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal ViewOrder/>
            
        </main>
        </>
    )
}