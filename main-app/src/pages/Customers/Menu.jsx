import React, { useEffect, useState } from "react";
import "../../assets/css/pages/customers/Menu.sass";
import { menulistdata } from "../../constant"
import { Title, Body_addclass, Header, Footer, Main, Section, Group, Box, Inputbox, Selectionbox, ItemMenu, Modal, Form, Outputfetch, InsertFileButton, Button, DateText, TimeText, Radio, CheckedItem, } from '../../Exporter/component_exporter'
import CustomerLayout from "../../components/Layout/CustomerLayout";
import { useStateContext } from "../../Contexts/ContextProvider";
import GuestLayout from "../../components/Layout/GuestLayout";
import axiosClient from "../../axiosClient";
import { createWorker } from "tesseract.js";

export default function MenuPage() {
    // this file is subject for optimization
    Title("Metro 7 | Menu");
    Body_addclass("Menu-PAGE");
    const { token } = useStateContext();
    const [menuItems, setMenuItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (selectedCategory) {
            axiosClient
                .get(`/menuData?category_id=${selectedCategory}`)
                .then((res) => setMenuItems(res.data));
        } else {
            axiosClient.get("/menuData").then((res) => setMenuItems(res.data));
        }
    }, [selectedCategory]);

    useEffect(() => {
        axiosClient.get("/categories").then((res) => {
            setCategories(res.data);
        });
    }, []);

    const menulistdata = menuItems.map((product) => ({
        id: product.id,
        image: product.image_url,
        product_name: product.product_name,
        price: product.price,
    }));

    return (
        <>
            {/* {token ? <CustomerLayout /> : <GuestLayout />} */}
        { token ?
            <Main Row>
                <Group Class='leftside' Col>
                    <Section Title='Menu Order' Class='menu'>
                        <Group Col>
                            <Box Class='search'>
                                <Inputbox Title='Search' Type='search' />
                            </Box>
                            <Group Class="filter">
                            {categories.map((cat) => (
                                <Radio
                                    key={cat.id}
                                    Title={cat.name}
                                    Value={cat.id}
                                    RadioName="Category"
                                    BtnWhite
                                    Checked={selectedCategory === cat.id}
                                    OnChange={() => setSelectedCategory(cat.id)}
                                />
                            ))}
                            </Group>
                            <Group Class='items' Wrap>
                                <ItemMenu List={ menulistdata } />
                            </Group>
                        </Group>
                    </Section>
                </Group>
                <Box Class='rightside' BoxCol>
                    <Group Class='datetime' Col><h2><DateText /><br /><TimeText /></h2><hr /></Group>
                    <Group Class='opts'>
                        <Radio Title='DINE-IN' RadioName='Options' />
                        <Radio Title='TAKE-OUT' RadioName='Options' />
                    </Group>
                    <hr />
                    <Group Class='totalitem' Col>
                        <h3>ORDER SUMMARY</h3>
                        <Group Class='itemlist' Col>
                            <CheckedItem List=""  />
                        </Group>
                    </Group>
                    <hr />
                    <Group Class='opts'>
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
                        <Box Class="search">
                            <Inputbox Title="Search" Type="search" />
                        </Box>
                        <Group Class="filter">
                            {categories.map((cat) => (
                                <Radio
                                    key={cat.id}
                                    Title={cat.name}
                                    Value={cat.id}
                                    RadioName="Category"
                                    BtnWhite
                                    Checked={selectedCategory === cat.id}
                                    OnChange={() => setSelectedCategory(cat.id)}
                                />
                            ))}
                        </Group>
                        <Group Class="items" Wrap>
                            <ItemMenu List={ menulistdata } />
                        </Group>
                    </Group>
                </Section>
            </Main>
        }
        { token &&
            <Modal Modal='CheckoutModal'>
                <Form Title='CHECKOUT' FormThreelayers>
                    <Group Class='outputfetch' Wrap>
                        <Outputfetch Title='Customer Name' Value='Micheal Lance Kester Li' OutCol OutWhite />
                        <Outputfetch Title='Order Date' Value='2025-02-24 | 02:27:25' OutCol OutWhite />
                        <Outputfetch Title='Order Options' Value='TAKE-OUT' OutCol OutWhite />
                    </Group>
                    <Group Class='outputfetch' Col>
                        <div>
                            <Outputfetch Title="Items" OutWhite />
                            <Outputfetch Title="Quantity" OutWhite />
                            <Outputfetch Title="Unit Price" OutWhite />
                            <Outputfetch Title="Total Price" OutWhite />
                        </div>
                        <div>
                            <Outputfetch Value='Pork Steak' OutWhite />
                            <Outputfetch Value='x23' OutWhite />
                            <Outputfetch Value='₱581.00' OutWhite />
                            <Outputfetch Value='₱581.00' OutWhite />
                        </div>
                    </Group>
                    <Group Class='outputfetch' Wrap>
                        <Outputfetch Title='Total Price' Value='₱950.00' OutCol OutWhite />
                        <Outputfetch Title='Discount' Value='₱0.00' OutCol OutWhite />
                        <Outputfetch Title='Payment Mode' Value='ONLINE' OutCol OutWhite />
                        <Outputfetch Title='Down Payment Price' Value='₱475.00' OutCol OutWhite />
                    </Group>
                    <Group Class='outputfetch' Col>
                        <Outputfetch Title="QR Code" OutWhite />
                        <Group >
                            <img />
                            <Group Col>
                                <p>Please pay a 50% DOWNPAYMENT. Orders without a payment receipt will remain pending. Failure to pay on time will result in cancellation.</p>
                                <InsertFileButton
                                    Title="ADD OCR PICTURE"
                                    BtnWhite
                                    Accept={"image/*"}
                                    Name="image"
                                    OnChange={async (e) => {
                                        const file = e.target.files[0];
                                        if (file) {
                                            const worker = await createWorker("eng");
                                            await worker.setParameters({
                                                tessedit_char_whitelist:
                                                    "₱0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,",
                                            });
                                            const rectangle = {
                                                left: 0,
                                                top: 0,
                                                width: 1500,
                                                height: 1500,
                                            };
                                            const {
                                                data: { text: rawText },
                                            } = await worker.recognize(file, { rectangle });

                                            // Fix common OCR error: replace '₱4' or 'Amount: 4' with '₱+' or 'Amount: +'
                                            const text = rawText.replace(
                                                /(₱|Amount\s*[:\-]?)\s*4(?=[\d,]+\.\d{2})/g,
                                                "$1+"
                                            );

                                            // Extract reference number (example: 10+ digits or alphanumeric)
                                            const refMatch =
                                                text.match(
                                                    /(?:Reference\s*No\.?:?\s*|Ref(?:erence)?\s*#?:?\s*No\.?:?\s*)/i
                                                ) || text.match(/([0-9]{13,})/i);
                                            const referenceNumber = refMatch
                                                ? refMatch[1]
                                                : "Not found";

                                            // Extract amount (example: ₱+1234.56 or Amount: +1234.56)
                                            const amountMatch =
                                                text.match(/₱\s*([+-]?[\d,]+\.\d{2})/) ||
                                                text.match(/Amount\s*[:\-]?\s*([+-]?[\d,]+\.\d{2})/i);
                                            const amount = amountMatch
                                                ? amountMatch[1]
                                                : "Not found";

                                            const parsedAmount =
                                                amount !== "Not found"
                                                    ? parseFloat(amount.replace(/,/g, ""))
                                                    : "";

                                            console.log("Reference Number:", referenceNumber);
                                            console.log("Amount:", parsedAmount);

                                            await worker.terminate();

                                            setFormData({
                                                refNumber: referenceNumber,
                                                downpayment: parsedAmount,
                                            });
                                        }
                                    }}
                                />
                            </Group>
                        </Group>
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title='CANCEL' CloseModal BtnWhite />
                        <Button Title='CHECKOUT' Redirect='/service/order_list' CloseModal BtnWhite />
                    </Group>
                </Form>
            </Modal>
            }
            {/* <Footer /> */}
            
        </>
    );
}

            // <Main>
            //     <Section Title="Menu Order" Class="menu">
            //         <Group Col>
            //             <Box Class="search">
            //                 <Inputbox Title="Search" Type="search" />
            //             </Box>
            //             <Group Class="filter">
            //                 {categories.map((cat) => (
            //                     <Radio
            //                         key={cat.id}
            //                         Title={cat.name}
            //                         Value={cat.id}
            //                         RadioName="Category"
            //                         BtnWhite
            //                         Checked={selectedCategory === cat.id}
            //                         OnChange={() => setSelectedCategory(cat.id)}
            //                     />
            //                 ))}
            //             </Group>
            //             {/* added auth parameter for authenticated one and no auth parameter for unauthenticated */}
            //             {token ? (
            //                 <Group Class="items" Wrap>
            //                     <ItemMenu List={menulistdata} auth />
            //                 </Group>
            //             ) : (
            //                 <Group Class="items" Wrap>
            //                     <ItemMenu List={menulistdata} />
            //                 </Group>
            //             )}
            //         </Group>
            //     </Section>
            // </Main>