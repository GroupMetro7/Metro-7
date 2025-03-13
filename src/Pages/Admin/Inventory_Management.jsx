import React from 'react'
import '../../Static/css/Admin_Management.sass'
import { Title, Body_useClass, Sidebar, Modal, Inputbox, Button } from '../../Components/components_exporter'
import { EDITLOGO, DELETELOGO } from '../../Static/public_exporter'

export default function InventoryManagementPage() {
    Title("Inventory Management")
    Body_useClass("managementpage")

    return (
        <>
        <Sidebar AdminMode/>
        <main class="PCMOD-body">
            <section class="listsection">
                <div class="searchbar">
                    <Inputbox name="Search" type="search"/>
                    <Inputbox name="Filter" type="search"/>
                </div>
                <div class="kpis">
                    <div class="kpi red1">
                        <h3>TOTAL REVENUE</h3>
                        <h1>₱230,631.00</h1>
                    </div>
                    <div class="kpi">
                        <h3>RATE</h3>
                        <h1>23.8%</h1>
                    </div>
                    <div class="kpi red2">
                        <h3>THIS STOCK VALUES</h3>
                        <h1>₱34,106.00</h1>
                    </div>
                    <div class="kpi red3">
                        <h3>MOST PRODUCT REVENUE</h3>
                        <h1>Tomato</h1>
                    </div>
                </div>
                <div class="list">
                    <div class="title">
                        <div/>
                        <h2>INVENTORY</h2>
                        <Button name="+"/>
                    </div>
                    <div class="tb">
                        <div class="head">
                            <div class="col">
                                <h3>EMP. NO.</h3>
                            </div>
                            <div class="col">
                                <h3>EMP. NAME</h3>
                            </div>
                            <div class="col">
                                <h3>EMAIL</h3>
                            </div>
                            <div class="col">
                                <h3>ROLE</h3>
                            </div>
                            <div class="col">
                                <h3>SCHEDULE</h3>
                            </div>
                            <div class="col">
                                <h3>LAST LOGGED</h3>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                        <div class="tbrow">
                            <div class="tbrow-2">
                                <div class="col">
                                    <h3>36548</h3>
                                </div>
                                <div class="col">
                                    <h3>Micheal Lance Kester Li</h3>
                                </div>
                                <div class="col">
                                    <h3>kesterli1998 @gmail.com</h3>
                                </div>
                                <div class="col">
                                    <h3>SERVICE</h3>
                                </div>
                                <div class="col">
                                    <h3>WEEKDAYS <br/> 09:00-05:00</h3>
                                </div>
                                <div class="col">
                                    <h3>2025-02-24 <br/> 02:27:25</h3>
                                </div>
                                <div class="col">
                                    <div class="col-btn">
                                        <Button name={ <img src={ EDITLOGO }/> } openmodal/>
                                    </div>
                                    <div class="col-btn">
                                        <Button name={ <img src={ DELETELOGO }/> } openmodal/>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div class="tbrow">
                            <div class="tbrow-2">
                                <div class="col">
                                    <h3>18585</h3>
                                </div>
                                <div class="col">
                                    <h3>Dylan Clive Espino</h3>
                                </div>
                                <div class="col">
                                    <h3>dylanyak @gmail.com</h3>
                                </div>
                                <div class="col">
                                    <h3>CASHIER</h3>
                                </div>
                                <div class="col">
                                    <h3>WEEKDAYS <br/> 09:00-05:00</h3>
                                </div>
                                <div class="col">
                                    <h3>2025-02-24 <br/> 02:27:25</h3>
                                </div>
                                <div class="col">
                                    <div class="col-btn">
                                        <Button name={ <img src={ EDITLOGO }/> } openmodal/>
                                    </div>
                                    <div class="col-btn">
                                        <Button name={ <img src={ DELETELOGO }/> } openmodal/>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div class="tbrow">
                            <div class="tbrow-2">
                                <div class="col">
                                    <h3>69696</h3>
                                </div>
                                <div class="col">
                                    <h3>Mark Anthony Amper</h3>
                                </div>
                                <div class="col">
                                    <h3>marklagingabsent @gmail.com</h3>
                                </div>
                                <div class="col">
                                    <h3>SERVICE</h3>
                                </div>
                                <div class="col">
                                    <h3>WEEKDAYS <br/> 09:00-05:00</h3>
                                </div>
                                <div class="col">
                                    <h3>2025-02-24 <br/> 02:27:25</h3>
                                </div>
                                <div class="col">
                                    <div class="col-btn">
                                        <Button name={ <img src={ EDITLOGO }/> } openmodal/>
                                    </div>
                                    <div class="col-btn">
                                        <Button name={ <img src={ DELETELOGO }/> } openmodal/>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div class="tbrow">
                            <div class="tbrow-2">
                                <div class="col">
                                    <h3>69696</h3>
                                </div>
                                <div class="col">
                                    <h3>Mark Anthony Amper</h3>
                                </div>
                                <div class="col">
                                    <h3>marklagingabsent @gmail.com</h3>
                                </div>
                                <div class="col">
                                    <h3>SERVICE</h3>
                                </div>
                                <div class="col">
                                    <h3>WEEKDAYS <br/> 09:00-05:00</h3>
                                </div>
                                <div class="col">
                                    <h3>2025-02-24 <br/> 02:27:25</h3>
                                </div>
                                <div class="col">
                                    <div class="col-btn">
                                        <Button name={ <img src={ EDITLOGO }/> } openmodal/>
                                    </div>
                                    <div class="col-btn">
                                        <Button name={ <img src={ DELETELOGO }/> } openmodal/>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                        <div class="tbrow">
                            <div class="tbrow-2">
                                <div class="col">
                                    <h3>69696</h3>
                                </div>
                                <div class="col">
                                    <h3>Mark Anthony Amper</h3>
                                </div>
                                <div class="col">
                                    <h3>marklagingabsent @gmail.com</h3>
                                </div>
                                <div class="col">
                                    <h3>SERVICE</h3>
                                </div>
                                <div class="col">
                                    <h3>WEEKDAYS <br/> 09:00-05:00</h3>
                                </div>
                                <div class="col">
                                    <h3>2025-02-24 <br/> 02:27:25</h3>
                                </div>
                                <div class="col">
                                    <div class="col-btn">
                                        <Button name={ <img src={ EDITLOGO }/> } openmodal/>
                                    </div>
                                    <div class="col-btn">
                                        <Button name={ <img src={ DELETELOGO }/> } openmodal/>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    </div>
                    <div class="pgntn">
                        <Button name="1"/>
                        <Button name="2"/>
                        <Button name="3"/>
                        <Button name="4"/>
                        <Button name="5"/>
                        <Button name="more" pagination/>
                    </div>
                </div>
            </section>
            <Modal ViewOrder/>
            
        </main>
        </>
    )
}