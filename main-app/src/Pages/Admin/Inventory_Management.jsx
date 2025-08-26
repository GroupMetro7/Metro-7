import React from 'react'
import '../../Assets/CSS/Pages/Admin/Management.sass'
import { Main, Group, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Outputfetch, Selectionbox, KPI } from '../../Exporter/Component_Exporter'
import { useStateContext, usePageTitle, useBodyAddClass, useScreenWidth, useExportCSV, useAddCategory, useFetchOrder, useKpi, useFetchInvData, useModifyItem } from '../../Exporter/Hooks_Exporter'

export default function InventoryManagementPage() {
    // Basic Hooks
    const { user } = useStateContext()
    usePageTitle(`Metro 7 | Inventory Management`)
    useBodyAddClass(`Management-PAGE`)

    const screenwidth = useScreenWidth()

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
    } = useFetchInvData()

    const { stockValue, UnavailableItems, LowStockItems, AvailableItems, getInventoryKPI } = useKpi()

    const {
        formData,
        setFormData,
        editProduct,
        error,
        success,
        deleteItem,
        addProduct,
        modifyProduct
    } = useModifyItem(fetchProducts, getInventoryKPI)

    const {
        editCategory,
    } = useAddCategory(fetchCategories)

    const { categories } = useFetchOrder()

    const { exportedInventory, exportCSV } = useExportCSV()

    const getCategoryName = (id) => {
        const cat = categories.find((c) => c.id === id)
        return cat ? cat.name : "Unknown"
    }

    // Handle form input changes dynamically
    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }

    // Table headers and rows
    const tbinventorylist = {
        display: {
            head: {
                sku_no: "NO.", 
                name: "NAME", 
                category: "CATEGORY", 
                stock: "STOCK", 
                unitcost: "UNIT COST", 
                stockvalue: "STOCK VALUE", 
                status: "STATUS",
                soldby: "SOLD BY", 
            },
            rows: products.map((product) => ({
                sku_no: product.SKU_NUMBER,
                name: product.COMPOSITE_NAME,
                category: getCategoryName(product.category_id),
                stock: product.STOCK.toFixed(2),
                unitcost: product.COST_PER_UNIT.toFixed(2),
                stockvalue: product.STOCK_VALUE.toFixed(2),
                status: product.STATUS,
                soldby: product.SOLD_BY,
                edit: () => editProduct(product),
                delete: () => deleteItem(product.id),
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
            <Main>
                <Box Class="search">
                    <Inputbox Title="Search" OnChange={(e) => setSearchItem(e.target.value)} Type="search" Placeholder="Search for Item or Filter status" />
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

            <Modal Modal="add-modal">
                <Form Title="ADD ITEM" {...(screenwidth > 1023 ? { FormThreelayers: true } : screenwidth > 766 ? { FormTwolayers: true } : { Col: true })} OnSubmit={addProduct}>
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
                    {screenwidth > 766 ?
                        <Group Class={`buttonside`}>
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                            <SubmitButton Title={`SUBMIT`} ID={`submit-btn`} BtnWhite />
                        </Group>
                        :
                        <Group Class={`buttonside`} Col>
                            <SubmitButton Title={`SUBMIT`} ID={`submit-btn`} BtnWhite />
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                        </Group>
                    }
                </Form>
            </Modal>
            <Modal Modal="edit-modal">
                <Form Title="EDIT ITEM" {...(screenwidth > 1023 ? { FormThreelayers: true } : screenwidth > 766 ? { FormTwolayers: true } : { Col: true })} OnSubmit={modifyProduct}>
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
                    {screenwidth > 766 ?
                        <Group Class={`buttonside`}>
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                            <SubmitButton Title={`SUBMIT`} ID={`submit-btn`} BtnWhite />
                        </Group>
                        :
                        <Group Class={`buttonside`} Col>
                            <SubmitButton Title={`SUBMIT`} ID={`submit-btn`} BtnWhite />
                            <Button Title={`CANCEL`} CloseModal BtnWhite />
                        </Group>
                    }
                </Form>
            </Modal>
        </>
    )
}
