import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, SideBar, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Selectionbox, Outputfetch, TBHead, Pagination, InsertFileButton } from '../../exporter/component_exporter'
import axiosClient from '../../axiosClient'
import { editProduct } from '../../functions/MenuFunctions'
import { DeleteLogo } from '../../Exporter/public_exporter'
import useAddCategory from '../../hooks/add'
import useFetch from '../../hooks/fetch'

export default function MenuManagementPage() {
    Title('Menu List Management')
    Body_addclass('Management-PAGE')

    const {
      categoryName,
      setCategoryName,
      categoryDescription,
      setCategoryDescription,
      handleAddCategory,
      error,
      success,
    } = useAddCategory();
    const { menuProduct, setMenu, categories, ingredients, currentPage, setCurrentPage, totalPages, setTotalPages } = useFetch();
    const [product_name, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState('');

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

  const ingredientsToSend = Array.isArray(selects)
    ? selects.filter(sel => sel.sku && sel.quantity).map(sel => ({
        sku: sel.sku,
        quantity: sel.quantity
      }))
    : [];
  formData.append('ingredients', JSON.stringify(ingredientsToSend));

  axiosClient.post('/menu', formData)
    .then(({ data }) => {
      setMenu(prevMenu => [...prevMenu, data]);
      setProductName('');
      setDescription('');
      setPrice('');
      setImage(null);
      setSelects([{ id: 0, sku: '', quantity: '' }]);
      window.location.reload();
    })
    .catch(error => {
      console.error('Error adding product:', error);
    });
};

    const tbhead = ['ID', 'Product Name', 'Description', 'Price', 'Actions'];
    const tbrows = menuProduct.map(product => ({
        id: product.id,
        product_name: product.product_name,
        description: product.description,
        price: product.price,
        edit: () => editProduct(product, setFormData),
        delete: () => console.log(`Delete product with ID: ${product.id}`),
    }));

const [selects, setSelects] = useState([{ id: 0, sku: '', quantity: '' }]);
const [nextId, setNextId] = useState(1);

const addSelectBox = () => {
  setSelects(prev => [...prev, { id: nextId, sku: '', quantity: '' }]);
  setNextId(prev => prev + 1);
};

const removeSelectBox = (idToRemove) => {
  setSelects(prev => prev.filter(select => select.id !== idToRemove));
};

const handleIngredientChange = (id, field, value) => {
  setSelects(prev =>
    prev.map(sel =>
      sel.id === id ? { ...sel, [field]: value } : sel
    )
  );
};

    const tbhead2 = ['ID', 'Category', 'Number of Products']

    return(
        <>
        <Group>
            <Main>
                <Box Class='search'>
                    <Inputbox Title='Search' Type='search' />
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
                <Group Class="imageside">
                    <img src="" />
                    <InsertFileButton Title="ADD PICTURE" BtnWhite Accept={'image/*'} OnChange={(e)=> setImage(e.target.files[0])}/>
                </Group>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='Product Name' Type='text' InCol InWhite Value={product_name} onChange={(e)=> setProductName(e.target.value)}/>
                    <Inputbox Title='Price' Type='number' InCol InWhite Value={price} onChange={(e)=> setPrice(e.target.value)}/>
                    <Selectionbox Title="Category" Name="category" Value={selectedCategory} Options={categories.map(cat => ({ label: cat.name, value: cat.id }))} SltCol SltWhite OnChange={e => setSelectedCategory(e.target.value)} />
                    <Inputbox Title='Description' Type='text' Class="textarea" InCol InWhite Value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    { selects != 0  && 
                    <Group Class="ingredients" Col>
                        <h4>Ingredients:</h4>
                        {selects.map(({ id, sku, quantity }) => (
                        <Group key={id}>
                            <Selectionbox NoTitle Name="Ingredient" Value={sku} SltCol SltWhite OnChange={e => handleIngredientChange(id, 'sku', e.target.value)}
                                Options={ingredients.map(comp => ({
                                label: `${comp.COMPOSITE_NAME} (${comp.SKU_NUMBER})`,
                                value: comp.SKU_NUMBER
                            }))} />
                            <Inputbox NoTitle Type="number" InCol InWhite Value={quantity} onChange={e => handleIngredientChange(id, 'quantity', e.target.value)} />
                            <Button Icon={DeleteLogo} Onclick={() => removeSelectBox(id)} BtnWhite />
                        </Group>
                        ))}
                    </Group>
                    }
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
                    <img src="" />
                    <InsertFileButton Title="ADD PICTURE" BtnWhite Accept={'image/*'} OnChange={(e)=> setImage(e.target.files[0])}/>
                </Group>
                <Group Class='inputside' Wrap>
                    <Inputbox Title='Product Name' Type='text' InCol InWhite Value={product_name} onChange={(e)=> setProductName(e.target.value)}/>
                    <Inputbox Title='Price' Type='number' InCol InWhite Value={price} onChange={(e)=> setPrice(e.target.value)}/>
                    <Selectionbox Title="Category" Name="category" Value={selectedCategory} Options={categories.map(cat => ({ label: cat.name, value: cat.id }))} SltCol SltWhite OnChange={e => setSelectedCategory(e.target.value)} />
                    <Inputbox Title='Description' Type='text' Class="textarea" InCol InWhite Value={description} onChange={(e)=> setDescription(e.target.value)}/>
                    { selects != 0  && 
                    <Group Class="ingredients" Col>
                        <h4>Ingredients:</h4>
                        {selects.map(({ id, sku, quantity }) => (
                        <Group key={id}>
                            <Selectionbox NoTitle Name="Ingredient" Value={sku} SltCol SltWhite OnChange={e => handleIngredientChange(id, 'sku', e.target.value)}
                                Options={ingredients.map(comp => ({
                                label: `${comp.COMPOSITE_NAME} (${comp.SKU_NUMBER})`,
                                value: comp.SKU_NUMBER
                            }))} />
                            <Inputbox NoTitle Type="number" InCol InWhite Value={quantity} onChange={e => handleIngredientChange(id, 'quantity', e.target.value)} />
                            <Button Icon={DeleteLogo} Onclick={() => removeSelectBox(id)} BtnWhite />
                        </Group>
                        ))}
                    </Group>
                    }
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
                { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
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
                { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
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
