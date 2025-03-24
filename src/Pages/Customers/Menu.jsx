import React from 'react'
import '../../assets/css/pages/customers/Menu.sass'
import { user, menulistdata } from '../../constant'
import { Title, Body_addclass, Header, Footer, Main, Section, Group, Box, Inputbox, Selectionbox, ItemMenu, Modal, Form, Outputfetch, InsertFileButton, Button, DateText, TimeText, Radio, CheckedItem, } from '../../exporter/component_exporter'

export default function MenuPage() {
    Title('Metro 7 | Menu')
    Body_addclass('Menu-PAGE')

    const checkedorders = [
        [<>Burger</>, 559.00.toFixed(2), {}],
        [<>Carbonara</>, 1258.00.toFixed(2), {}],
    ]

    return (
        <>
        <Header AuthenticatedMode={ user } />
        { user ?
            <Main Row>
                <Group Class='leftside' Col>
                    <Section Title='Menu Order' Class='menu'>
                        <Group Col>
                            <Box Class='search'>
                                <Inputbox Title='Search' Type='search' />
                                <Selectionbox Title='Filter' />
                            </Box>
                            <Group Wrap>
                                <ItemMenu List={ menulistdata } AuthenticatedMode={ user } />
                            </Group>
                        </Group>
                    </Section>
                </Group>
                <Box Class='rightside' BoxCol>
                    <Group Class='datetime' Col><h2><DateText /><br /><TimeText /></h2><hr /></Group>
                    <Group Class='diningopts'>
                        <Radio Title='DINE-IN' RadioName='Options' />
                        <Radio Title='TAKE-OUT' RadioName='Options' />
                    </Group>
                    <hr />
                    <Group Class='totalitem'>
                        <h3>ORDER SUMMARY</h3>
                        <div className='itemlist'>
                            <CheckedItem List={ checkedorders } />
                        </div>
                    </Group>
                    <hr />
                    <Group Class='diningopts'>
                        <Radio Title='CASH' RadioName='Payment' />
                        <Radio Title='ONLINE' RadioName='Payment' />
                    </Group>
                    <Group Class='paymentsum' Col>
                        <article>
                            <h3>PAYMENT SUMMARY</h3>
                            <div>
                                <h3>TOTAL PRICE:</h3>
                                <h4>₱581.00</h4>
                            </div>
                            <div>
                                <h3>DISCOUNT:</h3>
                                <h4>₱0.00</h4>
                            </div>
                        </article>
                        <Button Title='CHECKOUT' OpenModal='CheckoutModal' />
                    </Group>
                </Box>
            </Main>
            :
            <Main>
                <Section Title='Menu Order' Class='menu-notauth'>
                    <Group Col>
                        <Box Class='search'>
                            <Inputbox Title='Search' Type='search' />
                            <Selectionbox Title='Filter' />
                        </Box>
                        <Group Wrap>
                            <ItemMenu List={ menulistdata } />
                        </Group>
                    </Group>
                </Section>
            </Main>
        }
        <Footer />
        { user ?
            <Modal Modal='CheckoutModal'>
                <Form Title='CHECKOUT' FormThreelayers>
                    <Group Class='outputfetch' Wrap>
                        <Outputfetch Title='Customer Name' Value='Micheal Lance Kester Li' OutCol OutWhite />
                        <Outputfetch Title='Order Date' Value='2025-02-24 | 02:27:25' OutCol OutWhite />
                        <Outputfetch Title='Order Options' Value='TAKE-OUT' OutCol OutWhite />
                    </Group>
                    <Group Class='outputfetch' Col>
                        <Outputfetch Title='Customer Name' OutWhite />
                        <div><Outputfetch Value='Pork Steak' OutWhite /><Outputfetch Value='₱581.00' OutWhite /></div>
                        <Group><Outputfetch Value='Bacardi' OutWhite /><Outputfetch Value='₱369.00' OutWhite /></Group>
                    </Group>
                    <Group Class='outputfetch' Wrap>
                        <Outputfetch Title='Total Price' Value='₱950.00' OutCol OutWhite />
                        <Outputfetch Title='Discount' Value='₱0.00' OutCol OutWhite />
                        <Outputfetch Title='Payment Mode' Value='ONLINE' OutCol OutWhite />
                        <Outputfetch Title='Down Payment Price' Value='₱475.00' OutCol OutWhite />
                    </Group>
                    <Group Class='outputfetch qr' Col>
                        <Outputfetch Title='Total Price' OutCol OutWhite />
                        <div><p>Please pay a 50% DOWNPAYMENT. Orders without a payment receipt will remain pending. Failure to pay on time will result in cancellation.</p><InsertFileButton Title='UPLOAD GCASH RECEIPT' BtnWhite /></div>
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title='CANCEL' CloseModal BtnWhite />
                        <Button Title='CHECKOUT' Redirect='/service/order_list' CloseModal BtnWhite />
                    </Group>
                </Form>
            </Modal>
            :
            undefined
        }
        </>
    )
}