import { useState } from "react";
import "../../assets/css/pages/services/Dashboard.sass";
import {
  ScreenWidth,
  Title,
  Body_addclass,
  Main,
  Section,
  Form,
  Group,
  Inputbox,
  Button,
  Box,
  ItemMenu,
  Radio,
  CheckedItem,
  Modal,
  Outputfetch,
  DateText,
  TimeText,
  SubmitButton,
} from "../../Exporter/component_exporter";
import axiosClient from "../../axiosClient";
import useFetchOrder from "../../hooks/uni/fetchProducts";
import useFetchProduct from "../../hooks/service/fetchProducts";
import useFetchOrderWithNotification from "../../hooks/orders/fetchOrder";

export default function StaffDashboard() {
  Title("Metro 7");
  Body_addclass("Dashboard-Service-PAGE");
  const screenwidth = ScreenWidth();
  // this file is subject for optimization
  const { categories } = useFetchOrder();
  const { menuItems, selectedCategory, setSelectedCategory, setSearchItem } =
    useFetchProduct();

  useFetchOrderWithNotification();

  const [order, setOrder] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [customer, setCustomer] = useState();
  const [paymentOpt, setPaymentOpt] = useState();
  const [diningOpt, setDiningOpt] = useState();
  const [cashPayment, setCashPayment] = useState(0);
  const [onlinePayment, setOnlinePayment] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [mealStub, setMealStub] = useState("");
  const [loading, setLoading] = useState(false);
  const [freeItemsRemaining, setFreeItemsRemaining] = useState(0);




  const orderlist = menuItems.map((product) => ({
    ...product,
  }));

const checkedorders = order.map((product, index) => ({
  id: product.id,
  product_name: product.is_free_item
    ? `${product.product_name}`
    : product.product_name,
  price: product.price,
  quantity: product.quantity,
  is_free_item: product.is_free_item || false,
  unique_key: `${product.id}_${product.is_free_item ? 'free' : 'paid'}_${index}` // For React keys
}));

const addItemToOrder = (item) => {
  const existingItem = order.find((orderItem) => orderItem.id === item.id);
  const existingFreeItem = order.find((orderItem) => orderItem.id === item.id && orderItem.is_free_item === true);
  const existingPaidItem = order.find((orderItem) => orderItem.id === item.id && !orderItem.is_free_item);
  let updatedOrder;

  if (item.is_customizable === 1) {
    // Handle customizable items (buckets)
    if (existingItem) {
      updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      updatedOrder = [...order, { ...item, quantity: 1 }];
    }
  } else if (freeItemsRemaining > 0 && item.category_id === 3) {
    // Add as free item
    if (existingFreeItem) {
      updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id && orderItem.is_free_item === true
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      updatedOrder = [...order, { ...item, quantity: 1, price: 0, is_free_item: true }];
    }
  } else {
    // Add as paid item (regular price)
    if (existingPaidItem) {
      updatedOrder = order.map((orderItem) =>
        orderItem.id === item.id && !orderItem.is_free_item
          ? { ...orderItem, quantity: orderItem.quantity + 1 }
          : orderItem
      );
    } else {
      updatedOrder = [...order, { ...item, quantity: 1, is_free_item: false }];
    }
  }

  setOrder(updatedOrder);
  calculateTotalPrice(updatedOrder);
  updateFreeItemsRemaining(updatedOrder);
};

  const calculateTotalPrice = (updatedOrder) => {
    const total = updatedOrder.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  };

const updateFreeItemsRemaining = (currentOrder) => {
  // Count total customizable items and their quantities
  const totalCustomizableItems = currentOrder
    .filter(item => item.is_customizable === 1)
    .reduce((total, item) => total + item.quantity, 0);

  // Count used free items
  const usedFreeItems = currentOrder
    .filter(item => item.is_free_item === true)
    .reduce((total, item) => total + item.quantity, 0);

  // Calculate remaining free items (6 per customizable item)
  const totalAllowedFreeItems = totalCustomizableItems * 6;
  const remainingFreeItems = Math.max(0, totalAllowedFreeItems - usedFreeItems);

  setFreeItemsRemaining(remainingFreeItems);
};

const removeItemFromOrder = (itemId, isFreeItem = null) => {
  let updatedOrder;

  if (isFreeItem !== null) {
    // When called with specific free item status
    updatedOrder = order
      .map((orderItem) => {
        if (orderItem.id === itemId && (orderItem.is_free_item || false) === isFreeItem) {
          if (orderItem.quantity > 1) {
            return { ...orderItem, quantity: orderItem.quantity - 1 };
          } else {
            return null; // Remove item completely
          }
        }
        return orderItem;
      })
      .filter((orderItem) => orderItem !== null);
  } else {
    // When called with just itemId (backward compatibility)
    updatedOrder = order
      .map((orderItem) => {
        if (orderItem.id === itemId) {
          if (orderItem.quantity > 1) {
            return { ...orderItem, quantity: orderItem.quantity - 1 };
          } else {
            return null; // Remove item completely
          }
        }
        return orderItem;
      })
      .filter((orderItem) => orderItem !== null);
  }

  setOrder(updatedOrder);
  calculateTotalPrice(updatedOrder);
  updateFreeItemsRemaining(updatedOrder);
};

  const submitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!order.length) {
      alert("No items in the order. Please add items before submitting.");
      return;
    }

    const formattedOrder = {
      amount: totalPrice,
      customer_name: customer,
      discount: discount,
      cashPayment: cashPayment,
      onlinePayment: onlinePayment,
      option: diningOpt,
      status: "pending",
      tickets: order.map((item) => ({
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
      console.log("Order submitted:", formattedOrder);
      window.location.reload();
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        "Failed to submit order. Please try again.";
      alert(`Failed to submit order: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Group>
        <Main Row>
          <Section Title="MENU ORDER" Class="menu">
            <Group Col>
              <Box Class="search">
                <Inputbox
                  Title="Search"
                  Type="search"
                  onChange={(e) => setSearchItem(e.target.value)}
                />{" "}
              </Box>
              <Group Class="filter">
                {categories.map((cat) => (
                  <Radio
                    key={cat.id}
                    Title={cat.name}
                    Value={cat.id}
                    RadioName="Category"
                    Checked={selectedCategory === cat.id}
                    OnChange={() => setSelectedCategory(cat.id)}
                    BtnWhite
                  />
                ))}
              </Group>
              <Group Class="items" Wrap>
                <ItemMenu
                  List={orderlist}
                  addItemToOrder={addItemToOrder}
                  removeItemFromOrder={removeItemFromOrder}
                  ServiceMode
                />
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
              <Radio
                Title="DINE-IN"
                RadioName="Options"
                Value="DINE-IN"
                Checked={diningOpt === "DINE-IN"}
                OnChange={(e) => setDiningOpt(e.target.value)}
              />
              <Radio
                Title="TAKE-OUT"
                RadioName="Options"
                Value="TAKE-OUT"
                Checked={diningOpt === "TAKE-OUT"}
                OnChange={(e) => setDiningOpt(e.target.value)}
              />
            </Group>
            <hr />
            <Group Class="totalitem">
              <h3>TOTAL ITEM</h3>
              {freeItemsRemaining > 0 && (
                <p style={{ color: 'green', fontSize: '14px' }}>
                  {freeItemsRemaining} free items remaining
                </p>
              )}
              <div className="itemlist">
                <CheckedItem
                  List={checkedorders}
                  addItemToOrder={addItemToOrder}
                  removeItemFromOrder={removeItemFromOrder}
                />
              </div>
            </Group>
            {checkedorders != 0 && (
              <>
                <hr />
                <Group Class="paymentsum" Col>
                  <article>
                    <h3>TOTAL:</h3>
                    <h3>₱{totalPrice.toFixed(2)}</h3>
                  </article>
                  <Button Title="CHECKOUT" OpenModal="InputsModal" Disabled={!diningOpt} />
                </Group>
              </>
            )}
          </Box>
        </Main>
      </Group>
      <Modal Modal="InputsModal">
        <Form Title="CHECKOUT" {...(screenwidth > 1023 ? { FormThreelayers: true } : { FormTwolayers: true })} OnSubmit={submitOrder}>
          <Group Class="inputside">
            <Inputbox
              Type="text"
              Title="Customer Name"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              InCol
              InWhite
            />
          </Group>
          <Group Class="inputside" Wrap>
            <Inputbox
              Type="number"
              Title="Cash Payment"
              value={cashPayment}
              onChange={(e) => setCashPayment(e.target.value)}
              InCol
              InWhite
            />
            <Inputbox
              Type="number"
              Title="Online Payment"
              value={onlinePayment}
              onChange={(e) => setOnlinePayment(e.target.value)}
              InCol
              InWhite
            />
            <Inputbox
              Type="number"
              Title="Discount"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              InCol
              InWhite
            />
          </Group>
          <Group Wrap>
            <Group Class="outputfetch" Wrap>
              <Outputfetch
                Title="Payment Amount"
                Value={`₱${Number(cashPayment) + Number(onlinePayment) || 0}`}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Total Price"
                Value={`₱${totalPrice - Number(discount) || 0} `}
                OutCol
                OutWhite
              />
              <Outputfetch
                Title="Change"
                Value={`₱${
                  totalPrice -
                    Number(discount) -
                    (Number(cashPayment) + Number(onlinePayment)) || 0
                }`}
                OutCol
                OutWhite
              />
            </Group>
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <Button Title="CHECKOUT" OpenModal="CheckoutModal" BtnWhite />
          </Group>
        </Form>
      </Modal>

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
            <Outputfetch
              Title="Date"
              Value={`${new Date().getFullYear()}-${(new Date().getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${new Date()
                .getDate()
                .toString()
                .padStart(2, "0")} | ${new Date().toLocaleTimeString([], {
                timeStyle: "short",
              })}`}
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Order Options"
              Value={diningOpt}
              OutCol
              OutWhite
            />
          </Group>
          <Group Class="outputfetch" Col>
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
                <Outputfetch Value={`₱${product.price}`} OutWhite />
                <Outputfetch
                  Value={`₱${product.price * product.quantity}`}
                  OutWhite
                />
              </div>
            ))}
          </Group>
          <Group Class="outputfetch" Wrap>
            <Outputfetch
              Title="Total Price"
              Value={`₱${totalPrice - discount}`}
              OutCol
              OutWhite
            />
            {discount && (
              <Outputfetch
                Title="Discount"
                Value={`₱${discount}`}
                OutCol
                OutWhite
              />
            )}
            <Outputfetch
              Title="Down Payment Price"
              Value="₱0"
              OutCol
              OutWhite
            />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title="CHECKOUT" BtnWhite  disabled={loading}/>
          </Group>
        </Form>
      </Modal>
    </>
  );
}