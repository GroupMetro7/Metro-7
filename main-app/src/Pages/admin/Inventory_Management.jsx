import { useState } from "react";
import "../../assets/css/pages/admin/Management.sass";
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
  Selectionbox,
} from "../../exporter/component_exporter";
// import { deleteProduct, saveProduct, editProduct } from '../../Functions/InventoryFunctions';
import useFetch from "../../hooks/fetch";
import useFetchData from "../../hooks/admin/inv/fetchData";
import useModifyItem from "../../hooks/admin/inv/modifyItem";
import useFetchOrder from "../../hooks/uni/fetchProducts";

export default function Test() {
  // this file is subject for optimization
  Title("Inventory Management");
  Body_addclass("Management-PAGE");

  // State variables

  const { monthlyRevenue, mostSoldProduct, expenses, totalStockValue } =
    useFetch();
  // Get the latest month's revenue (assuming the first item is the latest)
  const latestMonth =
    monthlyRevenue && monthlyRevenue.length > 0 ? monthlyRevenue[0] : null;
  const latestRevenue = latestMonth ? latestMonth.revenue : 0;

  const showExpenses = expenses || 0;
  const showStockValue = totalStockValue || 0;
  // Most sold product info
  const mostSoldName = mostSoldProduct ? mostSoldProduct.product_name : "N/A";
  const mostSoldQty = mostSoldProduct ? mostSoldProduct.total_quantity : 0;
  const {
    formData,
    setFormData,
    saveProduct,
    editProduct,
    setCurrentProductId,
    error,
    success,
    deleteItem
  } = useModifyItem();

  const {
    products,
    setProducts,
    totalPages,
    setTotalPages,
    currentPage,
    setCurrentPage,
    fetchProducts,
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
  // Reset form fields
  const resetForm = () => {
    setFormData({ ITEM_NAME: "", CATEGORY: "", STOCK: "", COST_PER_UNIT: "" });
    setCurrentProductId(null);
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
    ITEMNAME: product.COMPOSITE_NAME,
    SOLDBY: product.SOLD_BY,
    CATEGORY: getCategoryName(product.category_id),
    STOCK: product.STOCK,
    COSTPERUNIT: product.COST_PER_UNIT,
    STOCKVALUE: product.STOCK_VALUE,
    STATUS: product.STATUS,
    // lastUpdated: new Date(product.updated_at).toLocaleString(),
    edit: () => editProduct(product),
    delete: () =>
      deleteItem(product.id),
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
            <Group Class="kpis">
              <KPI
                Title="TOTAL REVENUE"
                Integer={`₱${Number(latestRevenue).toLocaleString()}`}
                Class="red1"
              />
              <KPI
                Title="STOCK EXPENSES"
                Integer={`₱${Number(showExpenses).toLocaleString()}`}
              />
              <KPI
                Title="STOCK VALUE"
                Integer={`₱${Number(showStockValue).toLocaleString()}`}
                Class="red2"
              />
              <KPI
                Title={mostSoldName}
                Integer={mostSoldQty + " " + "pcs"}
                Class="red3"
              />
            </Group>
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
              false, // isEdit
                resetForm,
                fetchProducts,
                currentPage,
                setProducts,
                setCurrentPage,
                setTotalPages
              )
              }
            >
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && success && <p style={{ color: "green" }}>{success}</p>}
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
              <Selectionbox
                Title="Category"
                Name="category_id"
                Value={formData.category_id}
                Options={categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
                }))}
                SltCol
                SltWhite
                OnChange={handleInputChange}
              />
              <Selectionbox
                Title="Sold By"
                Name="SOLD_BY"
                Value={formData.SOLD_BY}
                Options={[
                { label: "Each", value: "each" },
                { label: "Weight", value: "weight" }
                ]}
                SltCol
                SltWhite
                OnChange={handleInputChange}
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
                true, // isEdit
              resetForm,
              fetchProducts,
              currentPage,
              setProducts,
              setCurrentPage,
              setTotalPages
            )
          }
        >
{error && <p style={{ color: "red" }}>{error}</p>}
{!error && success && <p style={{ color: "green" }}>{success}</p>}
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
            <Selectionbox
              Title="Category"
              Name="category_id"
              Value={formData.category_id}
              Options={categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
              }))}
              SltCol
              SltWhite
              OnChange={handleInputChange}
            />
            <Selectionbox
                Title="Sold By"
                Name="SOLD_BY"
                Value={formData.SOLD_BY}
                Options={[
                { label: "Each", value: "each" },
                { label: "Weight", value: "weight" }
                ]}
                SltCol
                SltWhite
                OnChange={handleInputChange}
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
