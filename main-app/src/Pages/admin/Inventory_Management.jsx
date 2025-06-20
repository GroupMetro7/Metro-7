import { useEffect, useState } from 'react';
import '../../assets/css/pages/admin/Management.sass';
import { Title, Body_addclass, Group, Main, Box, Inputbox, KPI, Table, Button, Modal, Form, SubmitButton, Pagination, Outputfetch, Selectionbox } from '../../exporter/component_exporter'
// import { deleteProduct, saveProduct, editProduct } from '../../Functions/InventoryFunctions';
import useFetch from "../../hooks/fetch";
import useFetchData from "../../hooks/admin/inv/fetchData";
import useModifyItem from "../../hooks/admin/inv/modifyItem";
import useFetchOrder from "../../hooks/uni/fetchProducts";
import UseKpi from '../../hooks/uni/Kpi';

export default function Test() {
    // this file is subject for optimization
    Title("Inventory Management");
    Body_addclass("Management-PAGE");

    // State variables

    const {
        formData,
        setFormData,
        editProduct,
        error,
        success,
        deleteItem,
        addProduct
    } = useModifyItem();

    const {
        products,
        totalPages,
        currentPage,
        setCurrentPage,
    } = useFetchData();

    const { categories } = useFetchOrder();
    const getCategoryName = (id) => {
        const cat = categories.find((c) => c.id === id);
        return cat ? cat.name : "Unknown";
    };

    // Handle form input changes dynamically
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };
    // Table headers and rows
    const tbhead = [
        "SKU NO.",
        "ITEM NAME",
        "SOLD BY",
        "CATEGORY",
        "STOCK",
        "UNIT COST",
        "STOCK VALUE",
        "STATUS",
    ];
    const tbrows = products.map((product) => ({
        SKU: product.SKU_NUMBER,
        COMPOSITE_NAME: product.COMPOSITE_NAME,
        SOLDBY: product.SOLD_BY,
        CATEGORY: getCategoryName(product.category_id),
        STOCK: product.STOCK.toFixed(2),
        COSTPERUNIT: product.COST_PER_UNIT.toFixed(2),
        STOCKVALUE: product.STOCK_VALUE.toFixed(2),
        STATUS: product.STATUS,
        // lastUpdated: new Date(product.updated_at).toLocaleString(),
        edit: () => editProduct(product),
        delete: () =>
            deleteItem(product.id),
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
                  <UseKpi />
                </Group>
                    <Box Title="INVENTORY" UpperRight={<Button Title="+" OpenModal="AddModal-Inventory" />} BoxCol >
                        <Table Title="Inventory" HeadRows={tbhead} DataRows={tbrows} EditBtn DeleteBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="AddModal-Inventory">
                <Form
                    Title="ADD ITEM"
                    FormThreelayers
                    OnSubmit={addProduct}
                >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Item Name" Type="text" Name="COMPOSITE_NAME" Value={formData.COMPOSITE_NAME} InCol InWhite onChange={handleInputChange} />
                        <Selectionbox Title="Category" Name="category_id" Value={formData.category_id}
                            Options={categories.map((cat) => ({
                            label: cat.name,
                            value: cat.id,
                        }))} SltCol SltWhite OnChange={handleInputChange} />
                        <Selectionbox Title="Sold By" Name="SOLD_BY" Value={formData.SOLD_BY}
                            Options={[
                            { label: "Each", value: "each" },
                            { label: "Weight", value: "weight" }
                        ]} SltCol SltWhite OnChange={handleInputChange} />
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
                    OnSubmit={addProduct}
                >
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Item Name" Type="text" Name="COMPOSITE_NAME" Value={formData.COMPOSITE_NAME} InCol InWhite onChange={handleInputChange} />
                        <Selectionbox Title="Category" Name="category_id" Value={formData.category_id}
                            Options={categories.map((cat) => ({
                            label: cat.name,
                            value: cat.id,
                        }))} SltCol SltWhite OnChange={handleInputChange} />
                        <Selectionbox Title="Sold By" Name="SOLD_BY" Value={formData.SOLD_BY}
                            Options={[
                            { label: "Each", value: "each" },
                            { label: "Weight", value: "weight" }
                        ]} SltCol SltWhite OnChange={handleInputChange} />
                        <Inputbox Title="Stock" Type="number" Name="STOCK" Value={formData.STOCK} InCol InWhite onChange={handleInputChange} />
                        <Inputbox Title="Unit Cost" Type="number" Name="COST_PER_UNIT" Value={formData.COST_PER_UNIT} InCol InWhite onChange={handleInputChange} />
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
