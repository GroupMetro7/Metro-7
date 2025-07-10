import React from "react";
import "../../assets/css/pages/admin/Management.sass";
import { Title, Body_addclass, Group, Main, Box, Inputbox, Table, Button, Modal, Form, SubmitButton, Selectionbox, Outputfetch, Pagination, InsertFileButton, } from "../../exporter/component_exporter";
import { DeleteLogo } from "../../Exporter/public_exporter";
import useAddCategory from "../../hooks/add";
import useAddProduct from "../../hooks/admin/Menu/addProduct";
import useFetchOrder from "../../hooks/uni/fetchProducts";

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
    setCurrentPage,
    totalPages,
    fetchCategories,
    fetchMenu,
    setSearchItem,
    setSelectedCategory,
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

  // Function for handling page changes in pagination component
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getCategoryName = (id) => {
    const cat = categories.find((c) => c.id === id);
    return cat ? cat.name : "Unknown";
  };

  // table headers and rows for displaying products
  const tbproductlist = {
    head: ["Product Name", "category", "Price", "Cost", "Margin", "Status"],
    rows: menuProduct.map((product) => ({
      product_name: product.product_name,
      category: getCategoryName(product.category_id),
      price: product.price,
      cost: product.total_ingredient_cost.toFixed(2),
      margin: product.calculated_margin.toFixed(2),
      status: product.is_available ? "Available" : "Out of Stock",
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

  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox
              Title="Search"
              Type="search"
              onChange={(e) => setSearchItem(e.target.value)}
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

          </Box>
          <Box
            Title="PRODUCT LIST"
            UpperRight={<Button Title="+" OpenModal="AddModal-Product" />}
            BoxCol
          >
            <Table
              Title="Product"
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
            UpperRight={<Button Title="+ " OpenModal="AddModal-Category" />}
            BoxCol
          >
            <Table
              Title="Category"
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
      <Modal Modal="AddModal-Product">
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
            {formData.image && (
              <img src={URL.createObjectURL(formData.image)} alt="" />
            )}
            <InsertFileButton
              Title="ADD PICTURE"
              BtnWhite
              Accept={"image/*"}
              Name="image"
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
              onChange={handleInputChange}
            />
            <Inputbox
              Title="Price"
              Type="number"
              InCol
              InWhite
              Name="price"
              Value={formData.price}
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
            <Inputbox
              Title="Description"
              Type="text"
              Class="textarea"
              InCol
              InWhite
              Name="description"
              Value={formData.description}
              onChange={handleInputChange}
            />
            <Group Class="ingredients" Col>
              <h4>Ingredients:</h4>
              {selects.map(({ sku, quantity }, idx) => (
                <Group key={idx}>
                  <Selectionbox
                    Name="sku"
                    Value={sku}
                    Options={ingredients.map((comp) => ({
                      label: `${comp.COMPOSITE_NAME} (${comp.SKU_NUMBER})`,
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
                    onChange={(e) =>
                      handleIngredientChange(idx, "quantity", e.target.value)
                    }
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
      <Modal Modal="EditModal-Product">
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
              Name="image"
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
            <Inputbox
              Title="Price"
              Type="number"
              InCol
              InWhite
              Name="price"
              Value={formData.price}
              onChange={handleInputChange}
            />
            <Group Class="ingredients" Col>
              <h4>Ingredients:</h4>
              {selects.map(({ sku, quantity }, idx) => (
                <Group key={idx}>
                  <Selectionbox
                    Name="sku"
                    Value={sku}
                    Options={ingredients.map((comp) => ({
                      label: `${comp.COMPOSITE_NAME} (${comp.SKU_NUMBER})`,
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
                    onChange={(e) =>
                      handleIngredientChange(idx, "quantity", e.target.value)
                    }
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
      <Modal Modal="DeleteModal-Product">
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
