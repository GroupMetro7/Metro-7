import React from 'react'
import '../../Assets/CSS/Pages/Customers/Menu.sass'
import { Main, Section, Group, Box, Inputbox, ItemMenu, Modal, Form, Outputfetch, InsertFileButton, Button, Radio, CheckedItem, SubmitButton, } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useRetrieveMenuList, useCreateOrders, useOCRReceipt, useClockText, useDateFormat, useTimeFormat } from '../../Exporter/Hooks_Exporter'

export default function MenuPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Menu`)
    useBodyAddClass(`Menu-PAGE`)

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
            formData,
            setFormData,
            order,
            addItemToOrder,
            removeItemToOrder,
            handleSubmit,
            discount,
            setDiscount,
            diningOpt,
            setDiningOpt,
            isLoading,
            error,
            success,
            freeItemsRemaining
        } = useCreateOrders({ AuthenticatedMode: !!user.id })

        // For Handling OCR via GCash
        const handleReceiptUpload = useOCRReceipt({ setFormData })

    // UI Hooks
    const screenwidth = useScreenWidth()

        // Displaying Clock Text
        const {time, date} = useClockText()

        // Displaying Menu List
        const menulistdata = menuItems.map((product) => ({...product}))

        // Displaying Checked Orders
        const checkedorders = order.map((product) => ({...product}))

        // Hooks for OutputFetch for Checkout
        const Outputfetches = {
            first: [
                { Title: `Name`, Value: `${user?.firstname} ${user?.lastname}`, OutCol: true, OutWhite: true },
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
                { Title: `Total Price`, Value: `₱${Number(formData?.totalPrice || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                { Title: `Discount`, Value: `₱${Number(discount || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                { Title: `Down Payment Price`, Value: `₱${Number(formData.downpayment || 0).toFixed(2)}`, OutCol: true, OutWhite: true },
                { Title: `Reference Number`, Value: formData.refNumber, OutCol: true, OutWhite: true }
            ]
        }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    return (
        <>
            {user && user.id ?
                screenwidth > 766 ?
                    <Main Row>
                        <Group Class={`leftside`} Col>
                            <Section Title={`Menu Order`} ID={`menuorder`}>
                                <Group Col>
                                    <Box Class={`search`}>
                                        <Inputbox Title={`Search`} Type={`search`} ID={`search-in`} OnChange={(e) => setSearchItem(e.target.value)} />
                                    </Box>
                                    <Group Class={`filter`}>
                                        {categories.map((category) => (
                                            <Radio
                                                Key={category.id}
                                                Title={category.name}
                                                ID={`${category.name.toLowerCase().replace(/\s+/g, '-')}-opts`}
                                                Value={category.id}
                                                RadioName={`Category`}
                                                Checked={selectedCategory === category.id}
                                                OnChange={() => setSelectedCategory(category.id)}
                                                BtnWhite
                                            />
                                        ))}
                                    </Group>
                                    <Group Class={`items`} Wrap>
                                        <ItemMenu List={menulistdata} AuthenticatedMode={user.id} AddItem={addItemToOrder} RemoveItem={removeItemToOrder} />
                                    </Group>
                                </Group>
                            </Section>
                        </Group>
                        <Box ID={`checkedorders`} Class={`rightside`} BoxCol>
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
                                              {freeItemsRemaining > 0 && (
                <p style={{ color: 'green', fontSize: '14px' }}>
                  {freeItemsRemaining} free items remaining
                </p>
              )}
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
                                            <h3>₱{Number(formData.totalPrice)?.toFixed(2)}</h3>
                                        </article>
                                        <Button Title={`CHECKOUT`} ID={`checkout-btn`} OpenModal={`checkout-modal`} Disabled={!diningOpt} />
                                    </Group>
                                </>
                            )}
                        </Box>
                    </Main>
                    :
                    <Main>
                        <Section Title={`Menu Order`} ID={`menuorder`} Class={`oneside`} UpperRight={
                            <Button Title={checkedorders != 0 ? `CHECKOUT (₱${Number(formData.totalPrice).toFixed(2)})` : `CHECKOUT` } ID={`checkout-btn`} OpenModal={`checkout-modal`} BtnWhite />
                            }>
                            <Group Col>
                                <Group Class={`opts`}>
                                    <Radio Title={`DINE-IN`} ID={`dine-in-opts`} RadioName={`Options`} Value={`DINE-IN`} Checked={diningOpt === `DINE-IN`} OnChange={(e) => setDiningOpt(e.target.value)} />
                                    <Radio Title={`TAKE-OUT`} ID={`take-out-opts`} RadioName={`Options`} Value={`TAKE-OUT`} Checked={diningOpt === `TAKE-OUT`} OnChange={(e) => setDiningOpt(e.target.value)} />
                                </Group>
                                <Box Class={`search`}>
                                    <Inputbox Title={`Search`} Type={`search`} ID={`search-in`} OnChange={(e) => setSearchItem(e.target.value)} />
                                </Box>
                                <Group Class={`filter`}>
                                    {categories.map((category) => (
                                        <Radio
                                            key={category.id}
                                            Title={category.name}
                                            ID={`${category.name.toLowerCase().replace(/\s+/g, '-')}-opts`}
                                            Value={category.id}
                                            RadioName={`Category`}
                                            Checked={selectedCategory === category.id}
                                            OnChange={() => setSelectedCategory(category.id)}
                                            BtnWhite
                                        />
                                    ))}
                                </Group>
                                <Group Class={`items`} Wrap>
                                    <ItemMenu List={menulistdata} AuthenticatedMode={user.id} AddItem={addItemToOrder} RemoveItem={removeItemToOrder} />
                                </Group>
                            </Group>
                        </Section>
                    </Main>
                :
                <Main>
                    <Section Title={`Menu Order`} ID={`menuorder`} Class={`oneside`}>
                        <Group Col>
                            <Box Class={`search`}>
                                <Inputbox Title={`Search`} Type={`search`} ID={`search-in`} OnChange={(e) => setSearchItem(e.target.value)} />
                            </Box>
                            <Group Class={`filter`}>
                                {categories.map((category) => (
                                    <Radio
                                        key={category.id}
                                        Title={category.name}
                                        ID={`${category.name.toLowerCase().replace(/\s+/g, '-')}-opts`}
                                        Value={category.id}
                                        RadioName={`Category`}
                                        Checked={selectedCategory === category.id}
                                        OnChange={() => setSelectedCategory(category.id)}
                                        BtnWhite
                                    />
                                ))}
                            </Group>
                            <Group Class={`items`} Wrap>
                                <ItemMenu List={menulistdata} />
                            </Group>
                        </Group>
                    </Section>
                </Main>
            }
            {user && user.id &&
                <Modal Modal={`checkout-modal`}>
                    <Form Title={`CHECKOUT`} {...(screenwidth > 1023 ? { FormThreelayers: true } : screenwidth > 766 ? { FormTwolayers: true } : { Col: true })} OnSubmit={handleSubmit} >
                        {error && <Group Class={`signalside`}><p class={`error`}>{error}</p></Group> ||
                        success && <Group Class={`signalside`}><p class={`success`}>{success}</p></Group>}
                        <Group Class={`outputside`} Wrap>
                            {Outputfetches.first.map((output) => (
                                <Outputfetch
                                    Title={output.Title}
                                    Value={output.Value}
                                    OutCol={output.OutCol}
                                    OutWhite={output.OutWhite}
                                />
                            ))}
                        </Group>
                        <Group Class={`outputside orderside`} Col>
                            {[Outputfetches.second.Title, ...Outputfetches.second.Value].map((output, index) => (
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
                        <Group Class={`outputside`} Wrap>
                            {Outputfetches.third.map((output) => {
                                if (output.Title === `Discount` && !Number(discount)) return null
                                return (
                                    <Outputfetch
                                        Title={output.Title}
                                        Value={output.Value}
                                        OutCol={output.OutCol}
                                        OutWhite={output.OutWhite}
                                    />
                                )
                            })}
                        </Group>
                        <Group Class={`outputside qrside`} Col>
                            <Outputfetch Title={`QR Code`} OutWhite />
                            <Group {...(screenwidth < 767 && { Col: true })}>
                                <img />
                                <Group Col>
                                    <p>
                                        Please pay a 50% DOWNPAYMENT. Orders without a payment receipt will
                                        remain pending. Failure to pay on time will result in cancellation.
                                    </p>
                                    {screenwidth > 766 && (
                                        <InsertFileButton Title={`UPLOAD GCASH RECEIPT`} BtnWhite Accept={`image/*`} Name={`image`} OnChange={handleReceiptUpload}/>
                                    )}
                                </Group>
                            </Group>
                        </Group>
                        {screenwidth > 766 ?
                            <Group Class={`buttonside`}>
                                <Button Title={`CANCEL`} CloseModal BtnWhite />
                                <SubmitButton Title={isLoading ? `SUBMITTING...` : `CHECKOUT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
                            </Group>
                            :
                            <Group Class={`buttonside`} Col>
                                <InsertFileButton Title={`UPLOAD GCASH RECEIPT`} Accept={`image/*`} Name={`image`} OnChange={handleReceiptUpload} BtnWhite/>
                                <SubmitButton Title={isLoading ? `SUBMITTING...` : `CHECKOUT`} ID={`submit-btn`} Disabled={isLoading} BtnWhite />
                                <Button Title={`CANCEL`} CloseModal BtnWhite />
                            </Group>
                        }
                    </Form>
                </Modal>
            }
        </>
    )
}
