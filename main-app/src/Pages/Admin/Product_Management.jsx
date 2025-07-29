import React from 'react'
import "../../Assets/CSS/Pages/Admin/Management.sass";
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Selectionbox, Outputfetch, Pagination, InsertFileButton, } from "../../Exporter/Component_Exporter";
import { DeleteLogo } from "../../Exporter/public_exporter";
import useAddCategory from "../../hooks/add";
import useAddProduct from "../../hooks/admin/Menu/addProduct";
import useFetchOrder from "../../hooks/Universal/fetchProducts";

export default function MenuManagementPage() {
  Title("Menu List Management");
  Body_addclass("Management-PAGE");

  //optimized
  //for update useSearchItem to search products
  // Custom hooks for managing product and category data
  //1. useAddProduct for adding products
  const {
    menuProduct,
    categories,
    ingredients,
    currentPage,
    totalPages,
    fetchCategories,
    fetchMenu,
    setSearchItem,
    setSelectedCategory,
    handlePageChange,
    setLookStatus
  } = useFetchOrder();

  //2. useAddCategory for adding categories

  const {
    formData,
    handleInputChange,
    selects,
    addSelectBox,
    removeSelectBox,
    handleIngredientChange,
    handleAddProduct,
    editProduct,
    ProductError,
    ProductSuccess,
    handleUpdateProduct,
    deleteProduct,
    ResetForm
  } = useAddProduct(fetchMenu);

  //3. useFetchOrder for fetching menu products, categories, and ingredients

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


  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "Unknown";
  };

  // table headers and rows for displaying products
  const tbproductlist = {
    head: ["Product Name", "category", "Price", "Cost", "Profit", "Margin %", "Status", "Quantity"],
    rows: menuProduct.map((product) => ({
      product_name: product.product_name,
      category: getCategoryName(product.category_id),
      price: product.price,
      cost: product.total_ingredient_cost.toFixed(2),
      profit: product.calculated_margin.toFixed(2),
      margin: ((product.price !== 0) ? ((product.calculated_margin / product.price) * 100).toFixed(2)  : "0") + "%",
      status: product.is_available ? "Available" : "Out of Stock",
      quantity: product.quantity,
      edit: () => editProduct(product),
      delete: () => editProduct(product),
    }))
  }

  const tbcategories = {
    head: ["ID", "Category", "Number of Products"],
    rows: categories.map((category) => ({
      id: category.id,
      name: category.name,
      products_count: category.products_count ?? 0,
      edit: () => editCategory(category),
      delete: () => editCategory(category),
    }))
  }

  const getCurrentStock = (sku) => {
  if (!sku) return "0";
  const ingredient = ingredients.find((ing) => ing.SKU_NUMBER === sku);
  return ingredient ? ingredient.STOCK.toString() : "0";
};

  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox
              Title="Search"
              Type="search"
              OnChange={(e) => setSearchItem(e.target.value)}
              Placeholder={"Search by Product Name"}
            />
          <Selectionbox
            Title="Category"
            Type="search"
            OnChange={(e) => setSelectedCategory(Number(e.target.value)) }
            Options={[...categories.map((cat) => ({
                label: cat.name,
                value: cat.id,
            }))
            ]}
          />
          <Selectionbox
            Title="Status"
            Type="search"
            OnChange={(e) => setLookStatus(e.target.value)}
            Options={[
              { label: "Available", value: "1"},
              { label: "Out of Stock", value: "0"},
            ]}
          />
          </Box>
          <Box
            Title="PRODUCT LIST"
            UpperRight={<Button Title="+" OpenModal="product-add-modal" />}
            BoxCol
          >
            <Table
              Title="product"
              HeadRows={tbproductlist.head}
              DataRows={tbproductlist.rows}
              EditBtn
              DeleteBtn
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
          <Box
            Title="CATEGORIES"
            UpperRight={<Button Title="+ " OpenModal="category-add-modal" />}
            BoxCol
          >
            <Table
              Title="category"
              HeadRows={tbcategories.head}
              DataRows={tbcategories.rows}
              EditBtn
              DeleteBtn
            />
            {/* <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            /> */}
          </Box>
        </Main>
      </Group>
      <Modal Modal="product-add-modal">
        <Form Title="ADD MENU" FormThreelayers OnSubmit={handleAddProduct}>
          {(ProductError && (
            <Group Class="signalside">
              <p class="error">{ProductError}</p>
            </Group>
          )) ||
            (ProductSuccess && (
              <Group Class="signalside">
                <p class="success">{ProductSuccess}</p>
              </Group>
            ))}
          <Group Class="imageside">
            {formData.image_url && (
              <img src={URL.createObjectURL(formData.image_url)} alt="" />
            )}
            <InsertFileButton
              Title="ADD PICTURE"
              BtnWhite
              Accept={"image/*"}
              Name="image_url"
              OnChange={handleInputChange}
            />
          </Group>
          <Group Class="inputside" Wrap>
            <Inputbox
              Title="Product Name"
              Type="text"
              InCol
              InWhite
              Name="product_name"
              Value={formData.product_name}
              OnChange={handleInputChange}
            />
            <Inputbox
              Title="Price"
              Type="number"
              InCol
              InWhite
              Name="price"
              Value={formData.price}
              OnChange={handleInputChange}
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
            {/* <Inputbox
              Title="Description"
              Type="text"
              Class="textarea"
              InCol
              InWhite
              Name="description"
              Value={formData.description}
              OnChange={handleInputChange}
            /> */}
            <Group Class="ingredients" Col>
              <h4>Ingredients:</h4>
              {selects.map(({ sku, quantity }, idx) => (
                <Group key={idx}>
                  <Selectionbox
                    Name="sku"
                    Value={sku}
                    Options={ingredients.map((comp) => ({
                      label: `${comp.COMPOSITE_NAME} (${comp.SKU_NUMBER}) - Current Stock : ${comp.STOCK}`,
                      value: comp.SKU_NUMBER,
                    }))}
                    SltCol
                    SltWhite
                    OnChange={(e) =>
                      handleIngredientChange(idx, "sku", e.target.value)
                    }
                  />
                  <Inputbox
                    Type="number"
                    InCol
                    InWhite
                    Name="quantity"
                    Value={quantity}
                    OnChange={(e) =>
                      handleIngredientChange(idx, "quantity", e.target.value)
                    }
                  />
                  <Outputfetch
                    Value={ingredients.find((ing) => ing.SKU_NUMBER === sku)?.SOLD_BY || 'N/A'}
                    OutCol
                    OutWhite
                  />
                  <Button
                    Icon={DeleteLogo}
                    Onclick={() => removeSelectBox(idx)}
                    BtnWhite
                  />
                </Group>
              ))}
            </Group>
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <Button Title="ADD INGREDIENTS" Onclick={addSelectBox} BtnWhite />
            <SubmitButton Title="SUBMIT" BtnWhite />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="product-edit-modal">
        <Form
          Title="MODIFY MENU"
          FormThreelayers
          OnSubmit={handleUpdateProduct}
        >
          {(ProductError && (
            <Group Class="signalside">
              <p class="error">{ProductError}</p>
            </Group>
          )) ||
            (ProductSuccess && (
              <Group Class="signalside">
                <p class="success">{ProductSuccess}</p>
              </Group>
            ))}
          <Group Class="imageside">
            {formData.image_url && (
              <img src={formData.image_url} alt="Product" />
            )}
            <InsertFileButton
              Title="ADD PICTURE"
              BtnWhite
              Accept={"image/*"}
              Name="image_url"
              OnChange={handleInputChange}
            />
          </Group>
          <Group Class="inputside" Wrap>
            <Inputbox
              Title="Product Name"
              Type="text"
              InCol
              InWhite
              Name="product_name"
              Value={formData.product_name}
              OnChange={handleInputChange}
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
            <Inputbox
              Title="Price"
              Type="number"
              InCol
              InWhite
              Name="price"
              Value={formData.price}
              OnChange={handleInputChange}
            />
            <Group Class="ingredients" Col>
                  <h4>Ingredients:</h4>
              {selects.map(({ sku, quantity }, idx) => (
                <Group key={idx}>
                  <Selectionbox
                    Name="sku"
                    Value={sku}
                    Options={ingredients.map((comp) => ({
                      label: `${comp.COMPOSITE_NAME} (${comp.SKU_NUMBER}) - Current Stock : ${(comp.STOCK).toFixed(2)}`,
                      value: comp.SKU_NUMBER,
                    }))}
                    SltCol
                    SltWhite
                    OnChange={(e) =>
                      handleIngredientChange(idx, "sku", e.target.value)
                    }
                  />
                  <Inputbox
                    Type="number"
                    InCol
                    InWhite
                    Name="quantity"
                    Value={quantity}
                    OnChange={(e) =>
                      handleIngredientChange(idx, "quantity", e.target.value)
                    }
                  />
                  <Outputfetch
                    Value={ingredients.find((ing) => ing.SKU_NUMBER === sku)?.SOLD_BY || 'N/A'}
                    OutCol
                    OutWhite
                  />
                  <Button
                    Icon={DeleteLogo}
                    Onclick={() => removeSelectBox(idx)}
                    BtnWhite
                  />
                </Group>
              ))}
            </Group>
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite Onclick={ResetForm} />
            <Button Title="ADD INGREDIENTS" Onclick={addSelectBox} BtnWhite />
            <SubmitButton Title="SUBMIT" BtnWhite />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="product-delete-modal">
        <Form Title="DELETE PRODUCT" FormThreelayers OnSubmit={deleteProduct}>
          <Group Class="outputfetch" Wrap>
            <Outputfetch
              Title="Product ID"
              Value={formData.id}
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Product Name"
              Value={formData.product_name}
              OutCol
              OutWhite
            />
            <Outputfetch
              Title="Product Price"
              Value={formData.price}
              OutCol
              OutWhite
            />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite Onclick={ResetForm}/>
            <SubmitButton Title="DELETE" BtnWhite />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="category-add-modal">
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
              OnChange={(e) => setCategoryName(e.target.value)}
            />
          </Group>
          <Group Class="buttonside" Col>
            <SubmitButton Title="SUBMIT" BtnWhite />
            <Button Title="CANCEL" CloseModal BtnWhite />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="category-edit-modal">
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
              OnChange={(e) => setCategoryName(e.target.value)}
            />
          </Group>
          <Group Class="buttonside" Col>
            <SubmitButton Title="SUBMIT" BtnWhite />
            <Button Title="CANCEL" CloseModal BtnWhite />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="category-delete-modal">
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
