import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Selectionbox, Outputfetch, TBHead, Pagination, InsertFileButton } from '../../exporter/component_exporter'
import { UseAddCategory, UseAddProduct, UseFetchOrderProducts, UseDeleteProduct, UseSearchItem } from '../../exporter/hook_exporter'
import { DeleteLogo } from "../../Exporter/public_exporter";

export default function MenuManagementPage() {
    Title("Menu List Management");
    Body_addclass("Management-PAGE");

    //optimized
    //for update UseSearchItem to search products
    // Custom hooks for managing product and category data
    //1. UseAddProduct for adding products
    const {
        formData,
        handleInputChange,
        selects,
        addSelectBox,
        removeSelectBox,
        handleIngredientChange,
        handleAddProduct,
        editProduct,
        AddProductError,
        AddProductSuccess,
    } = UseAddProduct();

    //2. UseAddCategory for adding categories
    const {
        categoryName,
        setCategoryName,
        categoryDescription,
        setCategoryDescription,
        handleAddCategory,

    } = UseAddCategory();

    //3. UseFetchOrderProducts for fetching menu products, categories, and ingredients
    const {
        menuProduct,
        categories,
        ingredients,
        currentPage,
        setCurrentPage,
        totalPages,
    } = UseFetchOrderProducts();

    const { deleteProduct } = UseDeleteProduct();

    const { searchTerm, setSearchTerm, filteredItems } = UseSearchItem("/products/search");

    // Function for handling page changes in pagination component
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // table headers and rows for displaying products
    const tbhead = ["ID", "Product Name", "Description", "Price"];
    const tbrows = (filteredItems && filteredItems.length > 0 ? filteredItems : menuProduct).map((product) => ({
        id: product.id,
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        edit: () => editProduct(product),
        delete: () => deleteProduct(product.id),
    }));

    const tbhead2 = ['ID', 'Category', 'Number of Products']

    return(
        <>
        <Group>
            <Main>
                <Box Class='search'>
                    <Inputbox Title="Search" Type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} Placeholder={"Search by Product Name"} />
                    <Selectionbox Title='Filter' />
                </Box>
                <Box Title='PRODUCT LIST' UpperRight={ <Button Title='+' OpenModal='AddModal-Product' /> } BoxCol>
                    <Table Title="Product" HeadRows={ tbhead } DataRows={ tbrows } EditBtn DeleteBtn />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Box>
                <Box Title='CATEGORIES' UpperRight={ <Button Title='+ ' OpenModal='AddModal-Category' /> } BoxCol>
                    <Table Title="Category" HeadRows={ tbhead2 } DataRows={ tbrows } EditBtn DeleteBtn />
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </Box>
            </Main>
        </Group>
        <Modal Modal='AddModal-Product'>
            <Form Title='ADD MENU' FormThreelayers OnSubmit={handleAddProduct}>
                { AddProductError && <Group Class="signalside"><p class="error">{ AddProductError }</p></Group> ||
                AddProductSuccess && <Group Class="signalside"><p class="success">{ AddProductSuccess }</p></Group> }
                <Group Class="imageside">
                    <img src={formData.image ? URL.createObjectURL(formData.image) : ""} alt="" />
                    <InsertFileButton Title="ADD PICTURE" BtnWhite Accept={"image/*"} Name="image" OnChange={handleInputChange} />
                </Group>
                <Group Class="inputside" Wrap>
                    <Inputbox Title="Product Name" Type="text" InCol InWhite Name="product_name" Value={formData.product_name} onChange={handleInputChange} />
                    <Inputbox Title="Price" Type="number" InCol InWhite Name="price" Value={formData.price} onChange={handleInputChange} />
                    <Selectionbox Title="Category" Name="category_id" Value={formData.category_id}
                    Options={categories.map((cat) => ({
                        label: cat.name,
                        value: cat.id,
                    }))} SltCol SltWhite OnChange={handleInputChange} />
                    <Inputbox Title="Description" Type="text" Class="textarea" InCol InWhite Name="description" Value={formData.description} onChange={handleInputChange} />
                    <Group Class="ingredients" Col>
                        <h4>Ingredients:</h4>
                        {selects.map(({ sku, quantity }, idx) => (
                        <Group key={idx}>
                            <Selectionbox Name="sku" Value={sku}
                                Options={ingredients.map((comp) => ({
                                label: `${comp.COMPOSITE_NAME} (${comp.SKU_NUMBER})`,
                                value: comp.SKU_NUMBER,
                            }))} SltCol SltWhite OnChange={(e) => handleIngredientChange(idx, "sku", e.target.value) } />
                            <Inputbox Type="number" InCol InWhite Name="quantity" Value={quantity} onChange={(e) => handleIngredientChange(idx, "quantity", e.target.value) } />
                            <Button Icon={DeleteLogo} Onclick={() => removeSelectBox(idx)} BtnWhite />
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
        <Modal Modal='EditModal-Product'>
            <Form Title='MODIFY MENU' FormThreelayers>
                <Group Class="imageside">
                    <img src={formData.image ? URL.createObjectURL(formData.image) : ""} alt="" />
                    <InsertFileButton Title="ADD PICTURE" BtnWhite Accept={"image/*"} Name="image" OnChange={handleInputChange} />
                </Group>
                <Group Class="inputside" Wrap>
                    <Inputbox Title="No." Type="number" InCol InWhite />
                    <Inputbox Title="Name" Value={formData.product_name} Type="text" InCol InWhite />
                    <Selectionbox Title="Category" Name="category_id" Value={formData.category_id} Options={categories.map((cat) => ({
                        label: cat.name,
                        value: cat.id,
                    }))} SltCol SltWhite OnChange={handleInputChange} />
                    <Inputbox Title="price" Value={formData.price} Type="number" InCol InWhite />
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='DeleteModal-Product'>
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
        <Modal Modal='AddModal-Category'>
            <Form Title='ADD CATEGORY' FormTwolayers OnSubmit={handleAddCategory}>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='Category Name' Type='text' InCol InWhite Value={categoryName} onChange={(e)=> setCategoryName(e.target.value)}/>
                    <Inputbox Title='Description' Type='text' InCol InWhite Value={categoryDescription} onChange={(e)=> setCategoryDescription(e.target.value)}/>
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='EditModal-Category'>
            <Form Title='EDIT CATEGORY' FormTwolayers OnSubmit={handleAddCategory}>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='Category Name' Type='text' InCol InWhite Value={categoryName} onChange={(e)=> setCategoryName(e.target.value)}/>
                    <Inputbox Title='Description' Type='text' InCol InWhite Value={categoryDescription} onChange={(e)=> setCategoryDescription(e.target.value)}/>
                </Group>
                <Group Class='buttonside'>
                    <Button Title='CANCEL' CloseModal BtnWhite />
                    <SubmitButton Title='SUBMIT' BtnWhite />
                </Group>
            </Form>
        </Modal>
        <Modal Modal='DeleteModal-Category'>
            <Form Title='DELETE CATEGORY' FormThreelayers>
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
        </>
    )
}
