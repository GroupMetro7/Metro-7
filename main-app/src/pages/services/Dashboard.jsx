import React, { useEffect, useState } from "react";
import "../../assets/css/pages/services/Dashboard.sass";
import { ScreenWidth, Title, Body_addclass, SideBar, Main, Section, Form, Group, Inputbox, Button, Box, Selectionbox, PrepOrder, ItemMenu, Radio, CheckedItem, Modal, Outputfetch, DateText, TimeText, InsertFileButton, SubmitButton } from "../../Exporter/component_exporter";
import axiosClient from "../../axiosClient";

export default function StaffDashboard() {
    Title("Metro 7");
    Body_addclass("Dashboard-Service-PAGE")
    const screenwidth = ScreenWidth()

    const [menuItems, setMenuItems] = useState([]);
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [customer, setCustomer] = useState();
    const [paymentOpt, setPaymentOpt] = useState();
    const [diningOpt, setDiningOpt] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // useEffect(() => {
    //   const fetchMenuItems = async () => {
    //     try {
    //       const response = await axiosClient.get("/menu");
    //       setMenuItems(response.data);
    //     } catch (error) {
    //       console.error("Error fetching menu items:", error);
    //     }
    //   };
    //   fetchMenuItems();
    // }, []);

    useEffect(() => {
        axiosClient.get("/categories").then(res => {
            setCategories(res.data);
            if (res.data.length > 0) setSelectedCategory(res.data[0].id);
        });
    }, []);

    useEffect(() => {
        if (selectedCategory) {
            axiosClient.get(`/products/category/${selectedCategory}`).then(res => {
                setMenuItems(res.data);
            });
        }
    }, [selectedCategory]);


    const orderlist = menuItems.map((product) => ({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        image: product.image,
    }));

    const checkedorders = order.map((product) => ({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
        image: product.image,
        quantity: product.quantity,
    }));

    const addItemToOrder = (item) => {
        const existingItem = order.find((orderItem) => orderItem.id === item.id);
        let updatedOrder;
        if (existingItem) {
            updatedOrder = order.map((orderItem) =>
                orderItem.id === item.id
                    ? { ...orderItem, quantity: orderItem.quantity + 1 }
                    : orderItem
            );
        } else {
            updatedOrder = [...order, { ...item, quantity: 1 }];
        }
        setOrder(updatedOrder);
        calculateTotalPrice(updatedOrder);
    };

    const calculateTotalPrice = (updatedOrder) => {
        const total = updatedOrder.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0
        );
        setTotalPrice(total);
    };

    const removeItemFromOrder = (itemId) => {
        const updatedOrder = order
            .map((orderItem) =>
                orderItem.id === itemId && orderItem.quantity > 1
                    ? { ...orderItem, quantity: orderItem.quantity - 1 }
                    : orderItem.id === itemId
                        ? null
                        : orderItem
            )
            .filter((orderItem) => orderItem !== null);
        setOrder(updatedOrder);
        calculateTotalPrice(updatedOrder);
    };

    const submitOrder = async (e) => {
        e.preventDefault(); // Prevent form submission from reloading the page

        // Validate required fields
        if (!customer || !paymentOpt || !diningOpt) {
            alert(
                "Please fill in all required fields: Customer, Payment Option, and Dining Option."
            );
            return;
        }
        if (order.length === 0) {
            alert("No items in the order. Please add items before submitting.");
            return;
        }
        try {
            // Format the order data for submission
            const formattedOrder = {
                amount: totalPrice || 0,
                customer_name: customer || "Unknown",
                payment_option: paymentOpt || "Not Specified",
                option: diningOpt || "Not Specified",
                status: "pending",
                tickets: order.map((item) => ({
                    product_id: item.id,
                    product_name: item.product_name,
                    quantity: item.quantity,
                    unit_price: item.price,
                    total_price: item.price * item.quantity,
                })),
            };

            console.log("Submitting order:", formattedOrder);
            // Send the order to the backend
            const response = await axiosClient.post("/orders", formattedOrder);

            alert("Order submitted successfully!");
            setOrder([]);
            setTotalPrice(0);
            setCustomer("");
            setPaymentOpt("");
            setDiningOpt("");
        } catch (error) {
            console.error("Failed to submit order:", error);

            if (
                error.response &&
                error.response.data &&
                error.response.data.message
            ) {
                alert(`Failed to submit order: ${error.response.data.message}`);
            } else {
                alert("Failed to submit order. Please try again.");
            }
        }
    };

    return (
        <>
            <Group>
                <Main Row>
                    <Section Title="MENU ORDER" Class="menu">
                        <Group Col>
                            <Box Class="search">
                                <Inputbox Title="Search" Type="search" />
                            </Box>
                            <Group Class='filter'>
                                {categories.map(cat => (
                                    <Radio key={cat.id} Title={cat.name} Value={cat.id} RadioName='Category' BtnWhite Checked={selectedCategory === cat.id} OnChange={() => setSelectedCategory(cat.id)} />
                                ))}
                            </Group>
                            <Group Class="items" Wrap>
                                <ItemMenu List={orderlist} addItemToOrder={addItemToOrder} removeItemFromOrder={removeItemFromOrder} />
                            </Group>
                        </Group>
                    </Section>
                    <Box Class="checkout" BoxCol>
                        <Group Class="datetime" Col>
                            <h3>
                                <DateText />
                                <br />
                                <TimeText />
                            </h3>
                            <hr />
                        </Group>
                        <Group Class="diningopts">
                            <Radio Title="DINE-IN" RadioName="Options" Value="DINE-IN" Checked={diningOpt === "DINE-IN"} OnChange={(e) => setDiningOpt(e.target.value)} />
                            <Radio Title="TAKE-OUT" RadioName="Options" Value="TAKE-OUT" Checked={diningOpt === "TAKE-OUT"} OnChange={(e) => setDiningOpt(e.target.value)} />
                        </Group>
                        <hr />
                        <Group Class="totalitem">
                            <h3>TOTAL ITEM</h3>
                            <div className="itemlist">
                                <CheckedItem List={checkedorders} addItemToOrder={addItemToOrder} removeItemFromOrder={removeItemFromOrder} />
                            </div>
                        </Group>
                        <hr />
                        <Inputbox Title="Customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                        <hr />
                        <Group Class="diningopts">
                            <Radio Title="CASH" RadioName="Payment" Value="CASH" Checked={paymentOpt === "CASH"} OnChange={(e) => setPaymentOpt(e.target.value)} />
                            <Radio Title="ONLINE" RadioName="Payment" Value="ONLINE" Checked={paymentOpt === "ONLINE"} OnChange={(e) => setPaymentOpt(e.target.value)} />
                        </Group>
                        <Group Class="paymentsum" Col>
                            <article>
                                <h3>PAYMENT SUMMARY</h3>
                                <div>
                                    <h3>TOTAL PRICE:</h3>
                                    <h4>₱{totalPrice}</h4>
                                </div>
                                <Inputbox Title="Discount" value={customer} onChange={(e) => setCustomer(e.target.value)} />
                            </article>
                            <Button Title="CHECKOUT" OpenModal="CheckoutModal" />
                        </Group>
                    </Box>
                </Main>
            </Group>
            <Modal Modal="CheckoutModal">
                <Form Title="CHECKOUT" {...screenwidth > 1023 ? { FormThreelayers: true } : { FormTwolayers: true }} OnSubmit={submitOrder}>
                    <Group Class="outputfetch" Wrap>
                        <Outputfetch Title="Customer Name" Value={customer} OutCol OutWhite />
                        <Outputfetch Title="Order Date" Value="2025-02-24 | 02:27:25" OutCol OutWhite />
                        <Outputfetch Title="Order Options" Value={diningOpt} OutCol OutWhite />
                    </Group>
                    <Group Class="outputfetch" Col>
                        <Outputfetch Title="Order details" OutWhite />
                        <div>
                            {order.map((product, index) => (
                                <Outputfetch key={index} Title={product.product_name} Value={`₱${product.price * product.quantity}`} OutWhite />
                            ))}
                        </div>
                    </Group>
                    <Group Class="outputfetch" Wrap>
                        <Outputfetch Title="Total Price" Value={`₱${totalPrice}`} OutCol OutWhite />
                        <Outputfetch Title="Discount" Value="₱0.00" OutCol OutWhite />
                        <Outputfetch Title="Payment Mode" Value={paymentOpt} OutCol OutWhite />
                        <Outputfetch Title="Down Payment Price" Value="₱0" OutCol OutWhite />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="CHECKOUT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
        </>
    );
}
