import React, { useEffect, useState } from 'react';
import '../../assets/css/pages/admin/Management.sass';
import {
    Title,
    Body_addclass,
    Group,
    Main,
    Box,
    Inputbox,
    KPI,
    Table,
    Button,
    Modal,
    Form,
    SubmitButton,
    Pagination,
} from '../../exporter/component_exporter';
import { fetchProducts, deleteProduct, saveProduct, editProduct } from '../../Functions/InventoryFunctions';
import useFetch from '../../hooks/fetch';

export default function Test() {
  // this file is subject for optimization
    Title('Inventory Management');
    Body_addclass('Management-PAGE');

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
    const tbhead = [
        'SKU NO.',
        'ITEM NAME',
        'SOLD BY',
        'CATEGORY',
        'STOCK',
        'UNIT COST',
        'STOCK VALUE',
        'STATUS',
        'MODIFIED',
    ];
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


    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Group Class="kpis">
                        <KPI Title="TOTAL REVENUE" Integer={`₱${Number(latestRevenue).toLocaleString()}`} Class="red1" />
                        <KPI Title="TOTAL REVENUE" Integer="23.8%" />
                        <KPI Title="TOTAL REVENUE" Integer="₱34,106.00" Class="red2" />
                        <KPI Title={mostSoldName} Integer={mostSoldQty + ' ' + 'pcs'} Class="red3" />
                    </Group>
                    <Box
                        Title="INVENTORY"
                        UpperRight={<Button Title="+" OpenModal="AddModal" />}
                        BoxCol
                    >
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn Deletebtn />
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="AddModal">
                <Form
                    Title="ADD ITEM"
                    FormThreelayers
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <Group Class="inputside" Wrap>
                        <Inputbox
                            Title="Item Name"
                            Type="text"
                            Name="ITEM_NAME"
                            Value={formData.ITEM_NAME}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Category"
                            Type="text"
                            Name="CATEGORY"
                            Value={formData.CATEGORY}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Stock"
                            Type="number"
                            Name="STOCK"
                            Value={formData.STOCK}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Unit Cost"
                            Type="number"
                            Name="COST_PER_UNIT"
                            Value={formData.COST_PER_UNIT}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal="EditModal">
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
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    {success && <p style={{ color: 'green' }}>{success}</p>}
                    <Group Class="inputside" Wrap>
                        <Inputbox
                            Title="Item Name"
                            Type="text"
                            Name="ITEM_NAME"
                            Value={formData.ITEM_NAME}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Category"
                            Type="text"
                            Name="CATEGORY"
                            Value={formData.CATEGORY}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Stock"
                            Type="number"
                            Name="STOCK"
                            Value={formData.STOCK}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                        <Inputbox
                            Title="Unit Cost"
                            Type="number"
                            Name="COST_PER_UNIT"
                            Value={formData.COST_PER_UNIT}
                            InCol
                            InWhite
                            onChange={handleInputChange}
                        />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
        </>
    );
}
