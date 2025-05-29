import React, { useEffect, useState } from "react";
import "../../assets/css/pages/customers/Menu.sass";
import { menulistdata } from "../../constant";
import {
  Title,
  Body_addclass,
  Header,
  Footer,
  Main,
  Section,
  Group,
  Box,
  Inputbox,
  Selectionbox,
  ItemMenu,
  Modal,
  Form,
  Outputfetch,
  InsertFileButton,
  Button,
  DateText,
  TimeText,
  Radio,
  CheckedItem,
} from "../../Exporter/component_exporter";
import CustomerLayout from "../../components/Layout/CustomerLayout";
import { useStateContext } from "../../Contexts/ContextProvider";
import GuestLayout from "../../components/Layout/GuestLayout";
import axiosClient from "../../axiosClient";

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
      {token ? <CustomerLayout /> : <GuestLayout />}
      <Main>
        <Section Title="Menu Order" Class="menu">
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
            {/* added auth parameter for authenticated one and no auth parameter for unauthenticated */}
            {token ? (
              <Group Class="items" Wrap>
                <ItemMenu List={menulistdata} auth />
              </Group>
            ) : (
              <Group Class="items" Wrap>
                <ItemMenu List={menulistdata} />
              </Group>
            )}
          </Group>
        </Section>
      </Main>
      <Footer />
    </>
  );
}
