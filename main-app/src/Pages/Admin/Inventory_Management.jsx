import React from 'react'
import '../../Assets/CSS/Pages/Admin/Management.sass';
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Outputfetch, Selectionbox, KPI } from '../../Exporter/Component_Exporter'
import useFetchData from "../../hooks/admin/inv/fetchData";
import useAddCategory from "../../hooks/add";
import useModifyItem from "../../hooks/admin/inv/modifyItem";
import useFetchOrder from "../../hooks/Universal/fetchProducts";
import UseKpi from '../../hooks/Universal/Kpi';
import useExportCSV from '../../hooks/Universal/fileExporter';

export default function Test() {
    // this file is subject for optimization
    Title("Inventory Management");
    Body_addclass("Management-PAGE");

    // State variables
    const {
        products,
        totalPages,
        currentPage,
        setSearchItem,
        fetchCategories,
        fetchProducts,
        setFilterStock,
        handlePageChange
    } = useFetchData();

    const { stockValue, UnavailableItems, LowStockItems, AvailableItems, getInventoryKPI } = UseKpi()

    const {
        formData,
        setFormData,
        editProduct,
        error,
        success,
        deleteItem,
        addProduct,
        modifyProduct
    } = useModifyItem(fetchProducts, getInventoryKPI);

    const {
        editCategory,
    } = useAddCategory(fetchCategories);




    const { categories } = useFetchOrder();

    const { exportedInventory, exportCSV } = useExportCSV();


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
    const tbinventorylist = {
        display: {
            head: [ "SKU NO.", "ITEM NAME", "SOLD BY", "CATEGORY", "STOCK", "UNIT COST", "STOCK VALUE", "STATUS" ],
            rows: products.map((product) => ({
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
            }))
        },
        export: {
            head: [ "SKU NO.", "ITEM NAME", "SOLD BY", "STOCK", "UNIT COST", "STOCK VALUE"],
            rows: exportedInventory.map((ex) => [
                ex.SKU_NUMBER,
                ex.COMPOSITE_NAME,
                ex.SOLD_BY,
                ex.STOCK.toFixed(2),
                ex.COST_PER_UNIT.toFixed(2),
                ex.STOCK_VALUE.toFixed(2),
            ])
        }
    }

    const kpis = [
        { Title: `STOCK VALUE`, Integer: `₱${Number(stockValue || 0).toFixed(2)}` },
        { Title: `UNAVAILABLE`, Integer: `${UnavailableItems}` },
        { Title: `LOW ON STOCK`, Integer: `${LowStockItems}` },
        { Title: `AVAILABLE`, Integer: `${AvailableItems}` }
    ]

    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" OnChange={(e) => setSearchItem(e.target.value)} Type="search" Placeholder="Search for item" />
                        <Selectionbox Title="Filter"  Type="text" OnChange={(e) => setFilterStock(e.target.value)} Options={[{label: 'Lowest', value: 'asc'}, {label: 'Highest', value: 'desc'}]}  />
                    </Box>
                <Group Class="kpis">
                    {kpis.map((kpi, index) => (
                        <KPI key={index} Title={kpi.Title} Integer={kpi.Integer} />
                    ))}
                </Group>
                    <Box Title="INVENTORY" UpperRight={
                        <>
                            <Button Title="+" OpenModal="add-modal" />
                            <Button Title="EXPORT AS FILE" Onclick={() => exportCSV(tbinventorylist.export.head, tbinventorylist.export.rows, "inventory.csv")} />
                        </>
                    } BoxCol >
                        <Table HeadRows={tbinventorylist.display.head} DataRows={tbinventorylist.display.rows} EditBtn DeleteBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                    </Box>
                </Main>
            </Group>
            <Modal Modal="add-modal">
                <Form Title="ADD ITEM" FormThreelayers OnSubmit={addProduct}>
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Item Name" Type="text" Name="COMPOSITE_NAME" Value={formData.COMPOSITE_NAME} InCol InWhite OnChange={handleInputChange} />
                        <Inputbox Title="Low Stock Alert" Type="number" Name="warning_threshold" Value={formData.warning_threshold} InCol InWhite OnChange={handleInputChange} />
                        <Selectionbox Title="Sold By" Name="SOLD_BY" Value={formData.SOLD_BY}
                            Options={[
                            { label: "Each", value: "each" },
                            { label: "g", value: "g" },
                            { label: "mL", value: "ml" }
                        ]} SltCol SltWhite OnChange={handleInputChange} />
                        <Inputbox Title="Stock" Type="number" Name="STOCK" Value={formData.STOCK} InCol InWhite OnChange={handleInputChange} />
                        <Outputfetch Title="Unit cost" Type="number" Name="COST_PER_UNIT" Value={formData.STOCK_VALUE / formData.STOCK || "0.00"} OutCol OutWhite />
                        <Inputbox Title="Stock Value" Type="number" Name="STOCK_VALUE" Value={formData.STOCK_VALUE} InCol InWhite OnChange={handleInputChange} />
                    </Group>
                    <Group Class="buttonside">
                        <Button Title="CANCEL" CloseModal BtnWhite />
                        <SubmitButton Title="SUBMIT" BtnWhite />
                    </Group>
                </Form>
            </Modal>
            <Modal Modal="edit-modal">
                <Form Title="EDIT ITEM" FormThreelayers OnSubmit={modifyProduct}>
                    { error && <Group Class="signalside"><p class="error">{ error }</p></Group> ||
                    success && <Group Class="signalside"><p class="success">{ success }</p></Group> }
                    <Group Class="inputside" Wrap>
                        <Inputbox Title="Item Name" Type="text" Name="COMPOSITE_NAME" Value={formData.COMPOSITE_NAME} InCol InWhite OnChange={handleInputChange} />
                        <Inputbox Title="Low Stock Alert" Type="number" Name="warning_threshold" Value={formData.warning_threshold} InCol InWhite OnChange={handleInputChange} />
                        <Selectionbox Title="Sold By" Name="SOLD_BY" Value={formData.SOLD_BY}
                            Options={[
                            { label: "Each", value: "each" },
                            { label: "g", value: "g" },
                            { label: "mL", value: "ml" },
                        ]} SltCol SltWhite OnChange={handleInputChange} />
                        <Inputbox Title="Stock" Type="number" Name="STOCK" Value={formData.STOCK} InCol InWhite OnChange={handleInputChange} />
                        <Inputbox Title="Unit Cost" Type="number" Name="COST_PER_UNIT" Value={formData.COST_PER_UNIT} InCol InWhite OnChange={handleInputChange} />
                        <Inputbox Title="Remarks" Type="text" Name="remarks" Value={formData.remarks} InCol InWhite OnChange={handleInputChange} />
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
