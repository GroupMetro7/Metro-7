import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Selectionbox, Outputfetch, Pagination, InsertFileButton } from '../../exporter/component_exporter'
import { DeleteLogo } from '../../exporter/public_exporter'
import axiosClient from '../../axiosClient'

export default function MenuManagementPage() {
    Title('Menu List Management')
    Body_addclass('Management-PAGE')

    const [product_name, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [menuProduct, setMenu] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
      const fetchMenu = (page) => {
        axiosClient.get(`/adminmenu?page=${page}`).then(({ data }) => {
            setMenu(data.data);
            setCurrentPage(data.current_page);
            setTotalPages(data.last_page);
        });
      };

      fetchMenu();
    }, []);

      useEffect(() => {
  axiosClient.get("/categories").then(res => {
    setCategories(res.data);
      if (res.data.length > 0) setSelectedCategory(res.data[0].id);
    });
  }, []);

    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('product_name', product_name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('image', image);
        formData.append('category_id', selectedCategory);
        axiosClient.post('/menu', formData)
            .then(({ data }) => {
                setMenu(prevMenu => [...prevMenu, data]);
                setProductName('');
                setDescription('');
                setPrice('');
                setImage(null);
                window.location.reload();
            })
            .catch(error => {
                console.error('Error adding product:', error);
            });
    };

    const tbhead = ['ID', 'Product Name', 'Description', 'Price'];
    const tbrows = menuProduct.map(product => ({
        id: product.id,
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        edit: () => console.log(`Edit product with ID: ${product.id}`),
        delete: () => console.log(`Delete product with ID: ${product.id}`),
    }));

  const [selects, setSelects] = useState([{ id: 0 }]);
  const [nextId, setNextId] = useState(1); // DO NOT update this in render

  const addSelectBox = () => {
  setSelects(prev => [...prev, { id: nextId }]);
  setNextId(prev => prev + 1); // ✅ Only updates inside handler
  };

  const removeSelectBox = (idToRemove) => {
    setSelects(prev => prev.filter(select => select.id !== idToRemove));
  };

    return(
        <>
        <Group>
            <Main>
                <Box Class='search'>
                    <Inputbox Title='Search' Type='search' />
                    <Selectionbox Title='Filter' />
                </Box>
                <Box Title='PRODUCT LIST' UpperRight={ <Group><Button Title='ADD PRODUCT' OpenModal='AddProductModal' /><Button Title='ADD CATEGORY ' OpenModal='AddCategoryModal' /></Group> } BoxCol>
                    <Table HeadRows={ tbhead } DataRows={ tbrows } EditBtn Deletebtn />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Box>
            </Main>
        </Group>
        <Modal Modal='AddProductModal'>
            <Form Title='ADD MENU' FormThreelayers OnSubmit={handleAddProduct}>
                <Group Class="imageside">
                    <img src="" />
                    <InsertFileButton Title="ADD PICTURE" BtnWhite />
                </Group>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='Product Name' Type='text' InCol InWhite Value={product_name} onChange={(e)=> setProductName(e.target.value)}/>
                    <Inputbox Title='Price' Type='number' InCol InWhite Value={price} onChange={(e)=> setPrice(e.target.value)}/>
                    <Selectionbox Title="Category" Name='Category' Options={ categories } SltCol SltWhite Value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} />
                    <Inputbox Title='Description' Type='text' Class="textarea" InCol InWhite Value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    <Group Class="ingredients" Col>
                        <h4>Ingredients:</h4>
                        {selects.map(({ id }) => (
                        <Group key={id}>
                            <Selectionbox NoTitle Name='Category' Options={categories} SltCol SltWhite Value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)} />
                            <Button Icon={DeleteLogo} Onclick={() => removeSelectBox(id)} BtnWhite />
                        </Group>
                        ))}
                    </Group>
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <Button Title='ADD INGREDIENTS' Onclick={addSelectBox} BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='EditProductModal'>
            <Form Title='MODIFY MENU' FormThreelayers>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='No.' Type='number' InCol InWhite />
                    <Inputbox Title='Name' Type='text' InCol InWhite />
                    <Inputbox Title='Category' Type='text' InCol InWhite />
                    <Inputbox Title='Amount' Type='number' InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='DeleteProductModal'>
            <Form Title='DELETE EMPLOYEE' FormThreelayers>
                <Group Class='outputfetch' Wrap>
                    <Outputfetch Title='Balance' Value='36548' OutCol OutWhite />
                    <Outputfetch Title='First Name' Value='Micheal Lance Kester' OutCol OutWhite />
                    <Outputfetch Title='Last Name' Value='Li' OutCol OutWhite />
                    <Outputfetch Title='Email' Value='kesterli1998@gmail.com' OutCol OutWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='DELETE' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='AddCategoryModal'>
            <Form Title='ADD CATEGORY' FormTwolayers OnSubmit={handleAddProduct}>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='Category Name' Type='text' InCol InWhite Value={product_name} onChange={(e)=> setProductName(e.target.value)}/>
                    <Inputbox Title='Description' Type='text' InCol InWhite Value={description} onChange={(e)=> setDescription(e.target.value)}/>
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        </>
    )
}
