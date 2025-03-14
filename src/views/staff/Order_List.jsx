import React from 'react'
import '../../Static/css/Order_List.sass'
import { Title, Body_useClass, Sidebar, Modal, Inputbox, Button } from '../../components/components_exporter'
import { EDITLOGO } from '../../Static/public_exporter'

export default function OrderListPage() {
    Title("Orders")
    Body_useClass("orderlistpage")

    return (
        <>
        <main class="PCMOD-body">
            <section class="orderlistsection">
                <div class="searchbar">
                    <Inputbox name="Search" type="search"/>
                    <Inputbox name="Filter" type="search"/>
                </div>
                <div class="orderlist">
                    <h2>ORDER</h2>
                    <div class="tb">
                        <div class="head">
                            <div class="col">
                                <h3>ORDER NO.</h3>
                            </div>
                            <div class="col">
                                <h3>ORDER DATE</h3>
                            </div>
                            <div class="col">
                                <h3>CUST. NAME</h3>
                            </div>
                            <div class="col">
                                <h3>OPTIONS</h3>
                            </div>
                            <div class="col">
                                <h3>AMOUNT</h3>
                            </div>
                            <div class="col">
                                <h3>STATUS</h3>
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
                                <div class="col status preparing">
                                    <h3>PREPARING</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={ <img src={ EDITLOGO }/> } openmodal/>
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
                                <div class="col status prepared">
                                    <h3>PREPARED</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={ <img src={ EDITLOGO }/> } openmodal/>
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
                                <div class="col status done">
                                    <h3>DONE</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={ <img src={ EDITLOGO }/> } openmodal/>
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
                <div class="orderlist">
                    <h2>PRE-ORDER</h2>
                    <div class="tb">
                        <div class="head">
                            <div class="col">
                                <h3>ORDER NO.</h3>
                            </div>
                            <div class="col">
                                <h3>ORDER DATE</h3>
                            </div>
                            <div class="col">
                                <h3>CUST. NAME</h3>
                            </div>
                            <div class="col">
                                <h3>OPTIONS</h3>
                            </div>
                            <div class="col">
                                <h3>AMOUNT</h3>
                            </div>
                            <div class="col">
                                <h3>STATUS</h3>
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
                                <div class="col status preparing">
                                    <h3>PREPARING</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={ <img src={ EDITLOGO }/> } openmodal/>
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
                                <div class="col status prepared">
                                    <h3>PREPARED</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={ <img src={ EDITLOGO }/> } openmodal/>
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
                                <div class="col status prepared">
                                    <h3>PREPARED</h3>
                                </div>
                                <div class="col-btn">
                                    <Button name={ <img src={ EDITLOGO }/> } openmodal/>
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