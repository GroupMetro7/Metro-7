import { useEffect, useState } from "react";
import "../../assets/css/pages/services/Dashboard.sass";
import { ScreenWidth, Title, Body_addclass, SideBar, Main, Section, Form, Group, Inputbox, Button, Box, Selectionbox, PrepOrder, ItemMenu, Radio, CheckedItem, Modal, Outputfetch, DateText, TimeText, InsertFileButton, SubmitButton } from "../../Exporter/component_exporter";
import axiosClient from "../../axiosClient";


export default function StaffDashboard() {
    Title("Metro 7");
    Body_addclass("Dashboard-Service-PAGE");
    const screenwidth = ScreenWidth();
    // this file is subject for optimization
    const [menuItems, setMenuItems] = useState([])
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [customer, setCustomer] = useState();
    const [paymentOpt, setPaymentOpt] = useState();
    const [diningOpt, setDiningOpt] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        if (selectedCategory) {
            axiosClient
                .get(`/menuData?category_id=${selectedCategory}`)
                .then((res) => setMenuItems(res.data));
        } else {
            axiosClient.get('/menuData').then((res) => setMenuItems(res.data));
        }
    }, [selectedCategory]);

    useEffect(() => {
        axiosClient.get("/categories").then((res) => {
            setCategories(res.data);
        });
    }, []);

    const orderlist = menuItems.map((product) => ({
        ...product,

    }));

    const checkedorders = order.map((product) => ({
        id: product.id,
        product_name: product.product_name,
        price: product.price,
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
        e.preventDefault();

        if (!customer || !paymentOpt || !diningOpt) {
            alert("Please fill in all required fields: Customer, Payment Option, and Dining Option.");
            return;
        }
        if (!order.length) {
            alert("No items in the order. Please add items before submitting.");
            return;
        }

        const formattedOrder = {
            amount: totalWithDiscount,
            customer_name: customer,
            discount: discountAmount,
            payment_option: paymentOpt,
            option: diningOpt,
            status: "pending",
            tickets: order.map(item => ({
                product_id: item.id,
                product_name: item.product_name,
                quantity: item.quantity,
                unit_price: item.price,
                total_price: item.price * item.quantity,
            })),
        };

        try {
            await axiosClient.post("/orders", formattedOrder);
            alert("Order submitted successfully!");
            setOrder([]);
            setTotalPrice(0);
            setCustomer("");
            setPaymentOpt("");
            setDiningOpt("");
        } catch (error) {
            const msg = error?.response?.data?.message || "Failed to submit order. Please try again.";
            alert(`Failed to submit order: ${msg}`);
        }
    };
    const [discountApplied, setDiscountApplied] = useState(false);

    // Helper to get the highest price item
    const getHighestPriceItem = (order) => {
        if (!order.length) return null;
        return order.reduce(
            (max, item) => (item.price > max.price ? item : max),
            order[0]
        );
    };

    // Calculate discount inside the component so it updates on each render
    const highestPriceItem = getHighestPriceItem(order);
    // Apply discount only once to the highest price item, regardless of quantity
    const discountAmount =
        discountApplied && highestPriceItem
            ? highestPriceItem.price * 0.2
            : 0;


    // Calculate total with discount
    const totalWithDiscount = totalPrice - discountAmount;
    return (
        <>
            <Group>
                <Main Row>
                    <Section Title="MENU ORDER" Class="menu">
                        <Group Col>
                            <Box Class="search">
                                <Inputbox Title="Search" Type="search" />
                            </Box>
                            <Group Class="filter">
                                {categories.map((cat) => (
                                    <Radio key={cat.id} Title={cat.name} Value={cat.id} RadioName="Category" BtnWhite Checked={selectedCategory === cat.id} OnChange={() => setSelectedCategory(cat.id)} />
                                ))}
                            </Group>
                            <Group Class="items" Wrap>
                                <ItemMenu List={orderlist} addItemToOrder={addItemToOrder} removeItemFromOrder={removeItemFromOrder} auth />
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
                        <Inputbox
                            Type="checkbox"
                            Title={'DISCOUNT'}
                            checked={discountApplied}
                            onChange={() => setDiscountApplied(!discountApplied)}
                        />
                        <Group Class="paymentsum" Col>
                            <article>
                                <h3>PAYMENT SUMMARY</h3>
                                <div>
                                    <h3>TOTAL PRICE:</h3>
                                    <h4>₱{totalWithDiscount.toFixed(2)}</h4>
                                </div>
                                <div>
                                    <h3>DISCOUNT:</h3>
                                    <h4>₱{discountAmount.toFixed(2)}</h4>
                                </div>
                            </article>
                            <Button Title="CHECKOUT" OpenModal="CheckoutModal" />
                        </Group>
                    </Box>
                </Main>
            </Group>
            <Modal Modal="CheckoutModal">
                <Form
                    Title="CHECKOUT"
                    {...(screenwidth > 1023
                        ? { FormThreelayers: true }
                        : { FormTwolayers: true })}
                    OnSubmit={submitOrder}
                >
                    <Group Class="outputfetch" Wrap>
                        <Outputfetch
                            Title="Customer Name"
                            Value={customer}
                            OutCol
                            OutWhite
                        />
                        {/* <Outputfetch
              Title="Order Date"
              Value="2025-02-24 | 02:27:25"
              OutCol
              OutWhite
            /> */}
                        <Outputfetch
                            Title="Order Options"
                            Value={diningOpt}
                            OutCol
                            OutWhite
                        />
                    </Group>
                    <Group Class='outputfetch' Col>
                        <div>
                            <Outputfetch Title="Items" OutWhite />
                            <Outputfetch Title="Quantity" OutWhite />
                            <Outputfetch Title="Unit Price" OutWhite />
                            <Outputfetch Title="Total Price" OutWhite />
                        </div>
                        {order.map((product, index) => (
                            <div key={index}>
                                <Outputfetch Value={product.product_name} OutWhite />
                                <Outputfetch Value={`x${product.quantity}`} OutWhite />
                                <Outputfetch Value={`₱${product.unit_price}`} OutWhite />
                                <Outputfetch Value={`₱${product.total_price}`} OutWhite />
                            </div>
                        ))}
                    </Group>
                    <Group Class="outputfetch" Wrap>
                        <Outputfetch
                            Title="Total Price"
                            Value={`₱${(totalPrice - discountAmount).toFixed(2)}`}
                            OutCol
                            OutWhite
                        />
                        <Outputfetch Title="Discount" Value={`₱${discountAmount}`} OutCol OutWhite />
                        <Outputfetch
                            Title="Payment Mode"
                            Value={paymentOpt}
                            OutCol
                            OutWhite
                        />
                        <Outputfetch
                            Title="Down Payment Price"
                            Value="₱0"
                            OutCol
                            OutWhite
                        />
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
