import '../../assets/css/pages/admin/Management.sass';
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Pagination, Outputfetch, Selectionbox } from '../../exporter/component_exporter'
import useFetchData from "../../hooks/admin/inv/fetchData";
import useAddCategory from "../../hooks/add";
import useModifyItem from "../../hooks/admin/inv/modifyItem";
import useFetchOrder from "../../hooks/uni/fetchProducts";
import UseKpi from '../../hooks/uni/Kpi';

export default function Test() {
    // this file is subject for optimization
    Title("Inventory Management");
    Body_addclass("Management-PAGE");

    // State variables
    const {
        products,
        totalPages,
        currentPage,
        setCurrentPage,
        setSearchItem,
        fetchCategories,
        fetchProducts,
        setFilterStock
    } = useFetchData();
    const {
        formData,
        setFormData,
        editProduct,
        error,
        success,
        deleteItem,
        addProduct,
        modifyProduct
    } = useModifyItem(fetchProducts);

    const {
        categoryName,
        setCategoryName,
        handleAddCategory,
        AddCategorySuccess,
        addCategoryError,
        editCategory,
        deleteCategory,
        handleUpdateCategory,
    } = useAddCategory(fetchCategories);

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

    const handlePageChange = (page) => {
        setCurrentPage(page);
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

      const tbhead2 = ["ID", "Category", "Number of Products"];

        const tbrows2 = categories.map((category) => ({
            id: category.id,
            name: category.name,
            products_count: category.products_count ?? 0,
            edit: () => editCategory(category),
            delete: () => editCategory(category),
        }));

    // const tbhead2 = ['ID', 'Category', 'Number of Products']


    return (
        <>
            <Group>
                <Main>
                    <Box Class="search">
                        <Inputbox Title="Search" onChange={(e) => setSearchItem(e.target.value)} Type="search" Placeholder="Search for item" />
                        <Selectionbox Title="Filter"  Type="text" OnChange={(e) => setFilterStock(e.target.value)} Options={[{label: 'Lowest', value: 'asc'}, {label: 'Highest', value: 'desc'}]}  />
                    </Box>
                <Group Class="kpis">
                  <UseKpi />
                </Group>
                    <Box Title="INVENTORY" UpperRight={<Button Title="+" OpenModal="AddModal-Inventory" />} BoxCol >
                        <Table Title="Inventory" HeadRows={tbhead} DataRows={tbrows} EditBtn DeleteBtn />
                        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                    </Box>
                    {/* <Box
                    Title="CATEGORIES"
                    UpperRight={<Button Title="+ " OpenModal="AddModal-Category" />}
                    BoxCol
                    >
                    <Table
                        Title="Category"
                        HeadRows={tbhead2}
                        DataRows={tbrows2}
                        EditBtn
                        DeleteBtn
                    />
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    </Box> */}
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
                    OnSubmit={modifyProduct}
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
            <Modal Modal="AddModal-Category">
            <Form Title="ADD CATEGORY" OnSubmit={handleAddCategory}>
                {(addCategoryError && (
                <Group Class="signalside">
                    <p class="error">{addCategoryError}</p>
                </Group>
                )) ||
                (AddCategorySuccess && (
                    <Group Class="signalside">
                    <p class="success">{AddCategorySuccess}</p>
                    </Group>
                ))}
                <Group Class="inputside" Wrap>
                <Inputbox
                    Title="Category Name"
                    Type="text"
                    InCol
                    InWhite
                    Value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                </Group>
                <Group Class="buttonside" Col>
                <SubmitButton Title="SUBMIT" BtnWhite />
                <Button Title="CANCEL" CloseModal BtnWhite />
                </Group>
            </Form>
            </Modal>
            <Modal Modal="EditModal-Category">
            <Form Title="EDIT CATEGORY" OnSubmit={handleUpdateCategory}>
                {(addCategoryError && (
                <Group Class="signalside">
                    <p class="error">{addCategoryError}</p>
                </Group>
                )) ||
                (AddCategorySuccess && (
                    <Group Class="signalside">
                    <p class="success">{AddCategorySuccess}</p>
                    </Group>
                ))}
                <Group Class="inputside" Wrap>
                <Inputbox
                    Title="Category Name"
                    Type="text"
                    InCol
                    InWhite
                    Value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                />
                </Group>
                <Group Class="buttonside" Col>
                <SubmitButton Title="SUBMIT" BtnWhite />
                <Button Title="CANCEL" CloseModal BtnWhite />
                </Group>
            </Form>
            </Modal>
            <Modal Modal="DeleteModal-Category">
            <Form Title="DELETE CATEGORY" OnSubmit={deleteCategory}>
                <Group Class="outputfetch" Wrap>
                <Outputfetch
                    Title="Category Name"
                    Value={categoryName}
                    OutCol
                    OutWhite
                />
                </Group>
                <Group Class="buttonside" Col>
                <SubmitButton Title="SUBMIT" BtnWhite />
                <Button Title="CANCEL" CloseModal BtnWhite />
                </Group>
            </Form>
            </Modal>
        </>
    );
}
