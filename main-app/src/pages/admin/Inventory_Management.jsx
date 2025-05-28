import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, Group, Main, Box, Inputbox, KPI, Table, Button, Modal, Form, SubmitButton, Pagination, Outputfetch } from '../../exporter/component_exporter';
import { fetchProducts, deleteProduct, saveProduct, editProduct } from '../../Functions/InventoryFunctions';
import useFetch from '../../hooks/fetch'
import { useActionData } from 'react-router-dom'
import useAddCategory from '../../hooks/add'

export default function Test() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    // State variables

    const { monthlyRevenue, mostSoldProduct } = useFetch();
    // Get the latest month's revenue (assuming the first item is the latest)
    const latestMonth = monthlyRevenue && monthlyRevenue.length > 0 ? monthlyRevenue[0] : null;
    const latestRevenue = latestMonth ? latestMonth.revenue : 0;

    // Most sold product info
    const mostSoldName = mostSoldProduct ? mostSoldProduct.product_name : 'N/A';
    const mostSoldQty = mostSoldProduct ? mostSoldProduct.total_quantity : 0;
    const [formData, setFormData] = useState({
        ITEM_NAME: '',
        CATEGORY: '',
        STOCK: '',
        COST_PER_UNIT: '',
    });
    const [currentProductId, setCurrentProductId] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // Fetch products on component mount or page change
    useEffect(() => {
        fetchProducts(currentPage, setProducts, setCurrentPage, setTotalPages);
    }, [currentPage]);
    // Handle form input changes dynamically
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Reset form fields
    const resetForm = () => {
        setFormData({ ITEM_NAME: '', CATEGORY: '', STOCK: '', COST_PER_UNIT: '' });
        setCurrentProductId(null);
    };
    // Table headers and rows

    const tbhead = [ 'SKU NO.', 'ITEM NAME', 'SOLD BY', 'CATEGORY', 'STOCK', 'UNIT COST', 'STOCK VALUE', 'STATUS', 'MODIFIED' ]
    const tbrows = products.map((product) => ({
        SKU: product.SKU_NUMBER,
        ITEMNAME: product.COMPOSITE_NAME,
        SOLDBY: product.SOLD_BY,
        CATEGORY: product.CATEGORY,
        STOCK: product.STOCK,
        COSTPERUNIT: product.COST_PER_UNIT,
        STOCKVALUE: product.STOCK_VALUE,
        STATUS: product.STATUS,
        lastUpdated: new Date(product.updated_at).toLocaleString(),
        edit: () => editProduct(product, setFormData, setCurrentProductId),
        delete: () => deleteProduct(product.id, setError, setSuccess, products, setProducts),
    }));

    const tbhead2 = ['ID', 'Category', 'Number of Products']

    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Group Class="kpis">
                        <KPI Title="TOTAL REVENUE" Integer={`₱${Number(latestRevenue).toLocaleString()}`} />
                        <KPI Title="RATE" Integer="23.8%" />
                        <KPI Title="TOTAL STOCK VALUES" Integer="₱34,106.00" />
                        <KPI Title="MOST PRODUCT REVENUE" Integer={mostSoldQty + ' ' + 'pcs'} />
                    </Group>
                    <Box Title="INVENTORY" UpperRight={<Button Title="+" OpenModal="AddModal-Inventory" />} BoxCol >
                        <Table Title="Inventory" HeadRows={tbhead} DataRows={tbrows} EditBtn DeleteBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </Box>
                    <Box Title='CATEGORIES' UpperRight={ <Button Title='+ ' OpenModal='AddModal-Category' /> } BoxCol>
                        <Table Title="Category" HeadRows={ tbhead2 } DataRows={ tbrows } EditBtn DeleteBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={''} />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="AddModal-Inventory">
                <Form
                    Title="ADD ITEM"
                    FormTwolayers
                    OnSubmit={(e) =>
                        saveProduct(
                            e,
                            formData,
                            false,
                            null,
                            setError,
                            setSuccess,
                            resetForm,
                            fetchProducts,
                            currentPage,
                            setProducts,
                            setCurrentPage,
                            setTotalPages
                        )
                    }
                >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Item Name" Type="text" Name="ITEM_NAME" Value={formData.ITEM_NAME} InCol InWhite onChange={handleInputChange} />
                        <Inputbox Title="Category" Type="text" Name="CATEGORY" Value={formData.CATEGORY} InCol InWhite onChange={handleInputChange} />
                        <Inputbox Title="Stock" Type="number" Name="STOCK" Value={formData.STOCK} InCol InWhite onChange={handleInputChange} />
                        <Inputbox Title="Unit Cost" Type="number" Name="COST_PER_UNIT" Value={formData.COST_PER_UNIT} InCol InWhite onChange={handleInputChange} />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal="EditModal-Inventory">
                <Form
                    Title="EDIT ITEM"
                    FormThreelayers
                    OnSubmit={(e) =>
                        saveProduct(
                            e,
                            formData,
                            true,
                            currentProductId,
                            setError,
                            setSuccess,
                            resetForm,
                            fetchProducts,
                            currentPage,
                            setProducts,
                            setCurrentPage,
                            setTotalPages
                        )
                    }
                >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Item Name" Type="text" Name="ITEM_NAME" Value={formData.ITEM_NAME} InCol InWhite onChange={handleInputChange} />
                        <Inputbox Title="Category" Type="text" Name="CATEGORY" Value={formData.CATEGORY} InCol InWhite onChange={handleInputChange} />
                        <Inputbox Title="Stock" Type="number" Name="STOCK" Value={formData.STOCK} InCol InWhite onChange={handleInputChange} />
                        <Inputbox Title="Unit Cost" Type="number" Name="COST_PER_UNIT" Value={formData.COST_PER_UNIT} InCol InWhite onChange={handleInputChange} />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal='DeleteModal-Inventory'>
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
                <Form Title='ADD CATEGORY' FormTwolayers >
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='Category Name' Type='text' InCol InWhite Value={""} onChange={""}/>
                        <Inputbox Title='Description' Type='text' InCol InWhite Value={""} onChange={""}/>
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title='CANCEL' CloseModal BtnWhite />
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal='EditModal-Category'>
                <Form Title='EDIT CATEGORY' FormTwolayers >
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='Category Name' Type='text' InCol InWhite Value={""} onChange={""}/>
                        <Inputbox Title='Description' Type='text' InCol InWhite Value={""} onChange={""}/>
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title='CANCEL' CloseModal BtnWhite />
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal='DeleteModal-Category'>
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
        </>
    );
}
