import React, { useEffect, useState } from "react";
import "../../assets/css/pages/services/Dashboard.sass";
import {
  Title,
  Body_addclass,
  SideBar,
  Main,
  Section,
  Form,
  Group,
  Inputbox,
  Button,
  Box,
  Selectionbox,
  PrepOrder,
  ItemMenu,
  Radio,
  CheckedItem,
  Modal,
  Outputfetch,
  DateText,
  TimeText,
  InsertFileButton,
} from "../../exporter/component_exporter";
import { Outlet } from "react-router-dom";
import axiosClient from "../../axiosClient";

export default function StaffDashboard() {
  Title("Metro 7");
  Body_addclass("Dashboard-Service-PAGE");

  const [menuProduct, setMenu] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosClient.get("/menu");
        setMenu(response.data); // Populate menuProduct with the fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const orders = [
    ["#25569", "TAKE-OUT"],
    ["#25569", "TAKE-OUT"],
    ["#25569", "TAKE-OUT"],
    ["#25569", "TAKE-OUT"],
  ];

  const orderlist = menuProduct.map((product) => [
    product.product_name,
    product.price,
    product.image,
  ]); // Include the image URL

  const checkedorders = [
    [<>Burger</>, (559.0).toFixed(2), {}],
    [<>Carbonara</>, (1258.0).toFixed(2), {}],
  ];

  return (
    <>
      <Group>
        <Main Row>
          <Group Class="leftside" Col>
            <Section
              Title="PREPARING ORDER"
              Class="preporder"
              UpperRight={
                <Button
                  Title="VIEW ALL ORDERS"
                  Redirect="/service/order_list"
                />
              }
            >
              <Group Class="orders" Wrap>
                <PrepOrder List={orders} />
              </Group>
            </Section>
            <Section Title="Menu Order" Class="menu">
              <Group Col>
                <Box Class="search">
                  <Inputbox Title="Search" Type="search" />
                  <Selectionbox Title="Filter" />
                </Box>
                <Group Wrap>
                  <ItemMenu List={orderlist} />
                </Group>
              </Group>
            </Section>
          </Group>
          <Box Class="rightside" BoxCol>
            <Group Class="datetime" Col>
              <h2>
                <DateText />
                <br />
                <TimeText />
              </h2>
              <hr />
            </Group>
            <Group Class="diningopts">
              <Radio Title="DINE-IN" RadioName="Options" />
              <Radio Title="TAKE-OUT" RadioName="Options" />
            </Group>{" "}
            <hr />
            <Group Class="totalitem">
              <h3>TOTAL ITEM</h3>
              <div className="itemlist">
                <CheckedItem List={checkedorders} />
              </div>
            </Group>
            <hr />
            <Inputbox Title="Customer" />
            <hr />
            <Group Class="diningopts">
              <Radio Title="CASH" RadioName="Payment" />
              <Radio Title="ONLINE" RadioName="Payment" />
            </Group>
            <Group Class="paymentsum" Col>
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
              <Button Title="CHECKOUT" OpenModal="CheckoutModal" />
            </Group>
          </Box>
        </Main>
      </Group>
      <Modal Modal="ViewModal">
        <Form Title="VIEW ORDER" FormThreelayers>
          <Group Class="outputfetch" Wrap>
            <Outputfetch Title="Order No." Value="25569" OutCol OutWhite />
            <Outputfetch
              Title="Order Date"
              Value="2025-02-24 | 02:27:25"
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Cashier Name"
              Value="Micheal Lance Kester Li"
              OutCol
              OutWhite
            />
            <Outputfetch Title="Options" Value="TAKE-OUT" OutCol OutWhite />
            <Outputfetch Title="Amount" Value="₱559.00" OutCol OutWhite />
            <Outputfetch Title="Status" Value="PREPARING" OutCol OutWhite />
          </Group>
          <Group Class="buttonside">
            <Button Title="CLOSE" CloseModal BtnWhite />
            <Button
              Title="VIEW ALL ORDER"
              Redirect="/staff/OrderList"
              CloseModal
              BtnWhite
            />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="CheckoutModal">
        <Form Title="CHECKOUT" FormThreelayers>
          <Group Class="outputfetch" Wrap>
            <Outputfetch
              Title="Customer Name"
              Value="Micheal Lance Kester Li"
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Order Date"
              Value="2025-02-24 | 02:27:25"
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Order Options"
              Value="TAKE-OUT"
              OutCol
              OutWhite
            />
          </Group>
          <Group Class="outputfetch" Col>
            <Outputfetch Title="Customer Name" OutWhite />
            <div>
              <Outputfetch Value="Pork Steak" OutWhite />
              <Outputfetch Value="₱581.00" OutWhite />
            </div>
            <div>
              <Outputfetch Value="Bacardi" OutWhite />
              <Outputfetch Value="₱369.00" OutWhite />
            </div>
          </Group>
          <Group Class="outputfetch" Wrap>
            <Outputfetch Title="Total Price" Value="₱950.00" OutCol OutWhite />
            <Outputfetch Title="Discount" Value="₱0.00" OutCol OutWhite />
            <Outputfetch Title="Payment Mode" Value="ONLINE" OutCol OutWhite />
            <Outputfetch
              Title="Down Payment Price"
              Value="₱475.00"
              OutCol
              OutWhite
            />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <Button
              Title="CHECKOUT"
              Redirect="/service/order_list"
              CloseModal
              BtnWhite
            />
          </Group>
        </Form>
      </Modal>
    </>
  );
}
