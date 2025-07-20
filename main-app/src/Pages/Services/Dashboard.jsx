import { useState } from 'react'
import '../../Assets/CSS/Pages/Services/Dashboard.sass'
import { Main, Section, Form, Group, Inputbox, Button, Box, ItemMenu, Radio, CheckedItem, Modal, Outputfetch, SubmitButton } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useClockText, useRetrieveMenuList, useCreateOrders, useDateFormat, useTimeFormat } from '../../Exporter/Hooks_Exporter'

export default function StaffDashboard() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7`)
    useBodyAddClass(`Dashboard-Service-PAGE`)

    // Fetching Hooks

        // For Menu List
        const {
            menuItems,
            categories,
            setSearchItem,
            selectedCategory,
            setSelectedCategory,
        } = useRetrieveMenuList()

        // For Checked Orders
        const {
            totalPrice,
            customer,
            setCustomer,
            cashPayment,
            setCashPayment,
            onlinePayment,
            setOnlinePayment,
            mealStub,
            setMealStub,
            freeItemsRemaining,
            order,
            addItemToOrder,
            removeItemToOrder,
            submitOrder,
            discount,
            setDiscount,
            diningOpt,
            setDiningOpt,
            isLoading,
            error,
            success,
        } = useCreateOrders({ ServiceMode: user.id })

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Displaying Clock Text
        const {time, date} = useClockText()

        // Displaying Menu List
        const menulistdata = menuItems.map((product) => ({
            id: product.id,
            product_name: product.product_name,
            quantity: order.find((item) => item.id === product.id)?.quantity || 0,
            price: product.price,
            is_available: product.is_available,
        }))

        // Displaying Checked Orders
        const checkedorders = order.map((product) => ({
            id: product.id,
            product_name: product.product_name,
            price: product.price,
            quantity: product.quantity,
        }))

        // Hooks for Elements for Checkout
        const InputOutputfetches = {
            Firstform: {
                first: [
                    { Title: `Customer Name`, Type: `text`, ID: `cname-in`, Value: customer, OnChange: (e) => setCustomer(e.target.value), InCol: true, InWhite: true },
                    { Title: `Cash Payment`, Type: `number`, ID: `c-payment-in`, Value: cashPayment, OnChange: (e) => setCashPayment(e.target.value), InCol: true, InWhite: true },
                    { Title: `Online Payment`, Type: `number`, ID: `o-payment-in`, Value: onlinePayment, OnChange: (e) => setOnlinePayment(e.target.value), InCol: true, InWhite: true },
                    { Title: `Discount`, Type: `number`, ID: `discount-in`, Value: discount, OnChange: (e) => setDiscount(e.target.value), InCol: true, InWhite: true }
                ],
                second: [
                    { Title: `Total Price`, Value: `₱${(Number(totalPrice) - Number(discount) || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                    { Title: `Payment Amount`, Value: `₱${((Number(cashPayment) + Number(onlinePayment)) || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                    { Title: `Down Payment Price`, Value: `₱${(Number(totalPrice) - Number(discount) - (Number(cashPayment) + Number(onlinePayment)) || 0).toFixed(2) }`, OutCol: true, OutWhite: true }
                ]
            },
            Secondform: {
                first: [
                    { Title: `Name`, Value: customer, OutCol: true, OutWhite: true },
                    { Title: `Date`, Value: `${useDateFormat(new Date())} | ${useTimeFormat(new Date())}`, OutCol: true, OutWhite: true },
                    { Title: `Options`, Value: diningOpt, OutCol: true, OutWhite: true }
                ],
                second: {
                    Title: [
                        { Title: `Items`, OutWhite: true },
                        { Title: `Quantity`, OutWhite: true },
                        { Title: `Unit Price`, OutWhite: true },
                        { Title: `Total Price`, OutWhite: true }
                    ],
                    Value: order.map((product) => ([
                        { Value: product.product_name, OutWhite: true },
                        { Value: `x${product.quantity}`, OutWhite: true },
                        { Value: `₱${Number(product.price).toFixed(2)}`, OutWhite: true },
                        { Value: `₱${(Number(product.price) * Number(product.quantity)).toFixed(2)}`, OutWhite: true }
                    ]))
                },
                third: [
                    { Title: `Total Price`, Value: `₱${(Number(totalPrice) - Number(discount) || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                    { Title: `Payment Amount`, Value: `₱${((Number(cashPayment) + Number(onlinePayment)) || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                    { Title: `Discount`, Value: `₱${Number(discount || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                    { Title: `Down Payment Price`, Value: `₱${(Number(totalPrice) - Number(discount) - (Number(cashPayment) + Number(onlinePayment)) || 0).toFixed(2) }`, OutCol: true, OutWhite: true }
                ]
            }
        }

    return (
        <>
            <Group>
                <Main Row>
                    <Section Title={`MENU ORDER`} ID={`menuorder`} Class={`menu`}>
                        <Group Col>
                            <Box Class={`search`}>
                                <Inputbox Title={`Search`} Type={`search`} ID={`search-in`} OnChange={(e) => setSearchItem(e.target.value)} />
                            </Box>
                            <Group Class={`filter`}>
                                {categories.map((cat) => (
                                    <Radio
                                        key={cat.id}
                                        Title={cat.name}
                                        Value={cat.id}
                                        RadioName={`Category`}
                                        Checked={selectedCategory === cat.id}
                                        OnChange={() => setSelectedCategory(cat.id)}
                                        BtnWhite
                                    />
                                ))}
                            </Group>
                            <Group Class={`items`} Wrap>
                                <ItemMenu List={menulistdata} ServiceMode={user.id} AddItem={addItemToOrder} RemoveItem={removeItemToOrder} />
                            </Group>
                        </Group>
                    </Section>
                    <Box ID={`checkedorders`} Class={`checkout`} BoxCol>
                        <Group Class={`datetime`} Col>
                            <h3>{date} <br /> {time}</h3>
                            <hr />
                        </Group>
                        <Group Class={`opts`}>
                            <Radio Title={`DINE-IN`} ID={`dine-in-opts`} RadioName={`Options`} Value={`DINE-IN`} Checked={diningOpt === `DINE-IN`} OnChange={(e) => setDiningOpt(e.target.value)} />
                            <Radio Title={`TAKE-OUT`} ID={`take-out-opts`} RadioName={`Options`} Value={`TAKE-OUT`} Checked={diningOpt === `TAKE-OUT`} OnChange={(e) => setDiningOpt(e.target.value)} />
                        </Group>
                        <hr />
                        <Group Class={`totalitem`}>
                            <h3>ORDER SUMMARY</h3>
                            {freeItemsRemaining > 0 &&
                                <h5>{freeItemsRemaining} Free Items Remaining</h5>
                            }
                            <div className={`itemlist`}>
                                <CheckedItem List={checkedorders} AddItem={addItemToOrder} RemoveItem={removeItemToOrder} />
                            </div>
                        </Group>
                        {checkedorders != 0 && (
                            <>
                                <hr />
                                <Group Class={`paymentsum`} Col>
                                    <article>
                                        <h3>TOTAL:</h3>
                                        <h3>₱{Number(totalPrice)?.toFixed(2)}</h3>
                                    </article>
                                    <Button Title={`CHECKOUT`} ID={`checkout-btn`} OpenModal={`first-checkout-modal`} Disabled={!diningOpt} />
                                </Group>
                            </>
                        )}
                    </Box>
                </Main>
            </Group>
            <Modal Modal={`first-checkout-modal`}>
                <Form Title={`CHECKOUT`} {...(screenwidth > 1023 ? { FormThreelayers: true } : { FormTwolayers: true })} OnSubmit={submitOrder}>
                    <Group Class={`inputside`} Wrap>
                        {InputOutputfetches.Firstform.first.map((Input, Index) => (
                            <Inputbox
                                Key={Index}
                                Title={Input.Title}
                                Type={Input.Type}
                                ID={Input.ID}
                                Value={Input.Value}
                                OnChange={Input.OnChange}
                                InCol={Input.InCol}
                                InWhite={Input.InWhite}
                            />
                        ))}
                    </Group>
                    <Group Class={`outputfetch`} Wrap>
                        {InputOutputfetches.Firstform.second.map((output) => (
                            <Outputfetch
                                Title={output.Title}
                                Value={output.Value}
                                OutCol={output.OutCol}
                                OutWhite={output.OutWhite}
                            />
                        ))}
                    </Group>
                    <Group Class={`buttonside`}>
                        <Button Title={`CANCEL`} CloseModal BtnWhite />
                        <Button Title={`CHECKOUT`} ID={`checkout-btn`} OpenModal={`second-checkout-modal`} BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal={`second-checkout-modal`}>
                <Form Title={`CHECKOUT`} {...(screenwidth > 1023 ? { FormThreelayers: true } : { FormTwolayers: true })} OnSubmit={submitOrder}>
                    {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                    success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
                    <Group Class={`outputfetch`} Wrap>
                        {InputOutputfetches.Secondform.first.map((output) => (
                            <Outputfetch
                                Title={output.Title}
                                Value={output.Value}
                                OutCol={output.OutCol}
                                OutWhite={output.OutWhite}
                            />
                        ))}
                    </Group>
                    <Group Class={`outputfetch orderside`} Col>
                        {[InputOutputfetches.Secondform.second.Title, ...InputOutputfetches.Secondform.second.Value].map((output, index) => (
                            <div key={index}>
                                {output.map((entry, colindex) => (
                                    <Outputfetch
                                        key={`cell-${index}-${colindex}`}
                                        {...(entry.Title && { Title: entry.Title })}
                                        {...(entry.Value && { Value: entry.Value })}
                                        OutWhite={entry.OutWhite}
                                    />
                                ))}
                            </div>
                        ))}
                    </Group>
                    <Group Class={`outputfetch`} Wrap>
                        {InputOutputfetches.Secondform.third.map((output) => {
                            if (output.Title === `Discount` && !Number(discount)) return null;
                            return (
                                <Outputfetch
                                    Title={output.Title}
                                    Value={output.Value}
                                    OutCol={output.OutCol}
                                    OutWhite={output.OutWhite}
                                />
                            );
                        })}
                    </Group>
                    <Group Class={`buttonside`}>
                        <Button Title={`CANCEL`} CloseModal BtnWhite />
                        <SubmitButton Title={isLoading ? `SUBMITTING...` : `CHECKOUT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
                    </Group>
                </Form>
            </Modal>
        </>
    )
}