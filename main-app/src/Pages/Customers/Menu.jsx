import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/customers/Menu.sass'
import { menulistdata } from '../../constant'
import { Title, Body_addclass, Header, Footer, Main, Section, Group, Box, Inputbox, Selectionbox, ItemMenu, Modal, Form, Outputfetch, InsertFileButton, Button, DateText, TimeText, Radio, CheckedItem, } from '../../Exporter/component_exporter'
import CustomerLayout from '../../components/Layout/CustomerLayout'
import { useStateContext } from '../../Contexts/ContextProvider'
import GuestLayout from '../../components/Layout/GuestLayout'
import axiosClient from '../../axiosClient'

export default function MenuPage() {
  // this file is subject for optimization
    Title('Metro 7 | Menu')
    Body_addclass('Menu-PAGE')
    const { token} = useStateContext();
    const [menuItems, setMenuItems] = useState([]);
    const [order, setOrder] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [customer, setCustomer] = useState();
    const [paymentOpt, setPaymentOpt] = useState();
    const [diningOpt, setDiningOpt] = useState();
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

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

        const menulistdata = menuItems.map((product) => ({
        id: product.id,
        image: product.image,
        product_name: product.product_name,
        price: product.price,
    }));


    return(
        <>
        {token ? (
                  <CustomerLayout />
                ):(
                  <GuestLayout />
                )}
        <Main>
            <Section Title='Menu Order' Class='menu'>
                <Group Col>
                    <Box Class='search'>
                        <Inputbox Title='Search' Type='search' />
                    </Box>
                    <Group Class='filter'>
                        <Radio Title='Meal' Value='Meal' RadioName='Category' BtnWhite />
                        <Radio Title='Liquor' Value='Meal' RadioName='Category' BtnWhite />
                        <Radio Title='Deserts' Value='Meal' RadioName='Category' BtnWhite />
                        <Radio Title='Breakfast' Value='Meal' RadioName='Category' BtnWhite />
                    </Group>
                    {/* added auth parameter for authenticated one and no auth parameter for unauthenticated */}
                    {token ?
                    (<Group Class='items' Wrap>
                        <ItemMenu List={ menulistdata } auth/>
                    </Group>)
                    :
                    (<Group Class='items' Wrap>
                        <ItemMenu List={ menulistdata }/>
                    </Group>)}
                </Group>
            </Section>
        </Main>
        <Footer />
        </>
    )
}
