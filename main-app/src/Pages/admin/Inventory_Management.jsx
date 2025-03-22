import React, { useEffect, useState } from 'react'
import '../../assets/css/pages/admin/Management.sass'
import { Title, Body_addclass, Group, Main, Box, Inputbox, KPI, Table, Button, Modal, Form, SubmitButton, Pagination } from '../../exporter/component_exporter'
import axiosClient from '../../axiosClient'
import { deleteProduct } from '../../Functions/InventoryFunctions'

export default function InventoryManagementPage() {
    Title('Inventory Management')
    Body_addclass('Management-PAGE')

    // variables for table
    const [SKU_NUMBER, setSKU] = useState("");
    const [ITEM_NAME, setItemName] = useState("");
    const [CATEGORY, setCategory] = useState("");
    const [STOCK, setStock] = useState("");
    const [COST_PER_UNIT, setUnitCost] = useState("");
    const [currentProductId, setCurrentProductId] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    // fetch products

    useEffect(() => {
        fetchProducts(currentPage);
    }, [currentPage]);

    const fetchProducts = (page) => {
        axiosClient.get(`/products?page=${page}`).then(({ data }) => {
            setProducts(data.data);
            setCurrentPage(data.current_page);
            setTotalPages(data.last_page);
        });
    };

    // handle page change
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };


    const tbhead = ['SKU NO.', 'ITEM NAME', 'CATEGORY', 'STOCK', 'UNIT COST', 'STOCK VALUE', 'STATUS', 'LAST UPDATED'];
    const tbrows = products.map(product => ({
        first: product.SKU_NUMBER,
        second: product.ITEM_NAME,
        third: product.CATEGORY,
        fourth: product.STOCK,
        fifth: product.COST_PER_UNIT,
        sixth: product.STOCK_VALUE,
        seventh: product.STATUS,
        lastUpdated: new Date(product.updated_at).toLocaleString(),
        edit: () => editProduct(product),
        delete: () => deleteProduct(product.id, setError, setSuccess, products, setProducts)
    }));


    const editProduct = (product) => {
      setSKU(product.SKU_NUMBER);
      setItemName(product.ITEM_NAME);
      setCategory(product.CATEGORY);
      setStock(product.STOCK);
      setUnitCost(product.COST_PER_UNIT);
      setCurrentProductId(product.id);
  };


  const ModifyProductsHandler = async (e, id) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await axiosClient.put(`/products/${id}`, {
        SKU_NUMBER,
        ITEM_NAME,
        CATEGORY,
        STOCK,
        COST_PER_UNIT
      });

      setSuccess("Product updated successfully");
      setSKU("");
      setItemName("");
      setCategory("");
      setStock("");
      setUnitCost("");
      setProducts(
        products.map((product) => (product.id === id ? response.data : product))
      );
      window.location.reload();
    } catch (err) {
      setError(
        err.response.data.message || "Failed to add product, please try again!"
      );
    }
  };

    //add product function
const addProduct = async (e) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  try {
    await axiosClient.post('/products', {
      SKU_NUMBER: SKU_NUMBER,
      ITEM_NAME: ITEM_NAME,
      CATEGORY: CATEGORY,
      STOCK: STOCK,
      COST_PER_UNIT: COST_PER_UNIT,
    });
    setSuccess('Product added successfully');
    setSKU('');
    setItemName('');
    setCategory('');
    setStock('');
    setUnitCost('');
    window.location.reload();

  } catch (err) {
    setError(err.response.data.message || 'failed to add product, please try again!');
  }
};

    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" Type="search" />
                        <Inputbox Title="Filter" Type="text" />
                    </Box>
                    <Group Class="kpis">
                        <KPI Title="TOTAL REVENUE" Integer="₱230,631.00" Class="red1" />
                        <KPI Title="TOTAL REVENUE" Integer="23.8%" />
                        <KPI Title="TOTAL REVENUE" Integer="₱34,106.00" Class="red2" />
                        <KPI Title="TOTAL REVENUE" Integer="Tomato" Class="red3" />
                    </Group>
                    <Box Title="INVENTORY" UpperRight={<Button Title="+" OpenModal="AddModal" />} BoxCol>
                        <Table HeadRows={tbhead} DataRows={tbrows} EditBtn Deletebtn/>
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="AddModal">
                <Form Title="ADD ITEM" FormThreelayers OnSubmit={addProduct}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='SKU No.' Type='text' Value={SKU_NUMBER} InCol InWhite onChange={(e) => setSKU(e.target.value)} />
                        <Inputbox Title='Item Name' Type='text' Value={ITEM_NAME} InCol InWhite onChange={(e) => setItemName(e.target.value)} />
                        <Inputbox Title='Category' Type='text' Value={CATEGORY} InCol InWhite onChange={(e) => setCategory(e.target.value)} />
                        <Inputbox Title='Stock' Type='number' Value={STOCK} InCol InWhite onChange={(e) => setStock(e.target.value)} />
                        <Inputbox Title='Unit Cost' Type='number' Value={COST_PER_UNIT} InCol InWhite onChange={(e) => setUnitCost(e.target.value)} />
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal="EditModal">
                <Form Title="EDIT ITEM" FormThreelayers OnSubmit={(e) => ModifyProductsHandler(e, currentProductId)}>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                    <Group Class='inputside' Wrap>
                        <Inputbox Title='SKU No.' Type='text' Value={SKU_NUMBER} InCol InWhite onChange={(e) => setSKU(e.target.value)} />
                        <Inputbox Title='Item Name' Type='text' Value={ITEM_NAME} InCol InWhite onChange={(e) => setItemName(e.target.value)} />
                        <Inputbox Title='Category' Type='text' Value={CATEGORY} InCol InWhite onChange={(e) => setCategory(e.target.value)} />
                        <Inputbox Title='Stock' Type='number' Value={STOCK} InCol InWhite onChange={(e) => setStock(e.target.value)} />
                        <Inputbox Title='Unit Cost' Type='number' Value={COST_PER_UNIT} InCol InWhite onChange={(e) => setUnitCost(e.target.value)} />
                    </Group>
                    <Group Class='buttonside'>
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title='SUBMIT' BtnWhite />
                    </Group>
                </Form>
            </Modal>
        </>
    )
}
