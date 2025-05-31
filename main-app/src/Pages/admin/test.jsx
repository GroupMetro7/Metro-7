import "../../assets/css/pages/admin/Management.sass";
import {
  Title,
  Body_addclass,
  Group,
  Main,
  Box,
  Inputbox,
  Table,
  Button,
  Modal,
  Form,
  SubmitButton,
  Selectionbox,
  Outputfetch,
  Pagination,
  InsertFileButton,
} from "../../exporter/component_exporter";
import { DeleteLogo } from "../../Exporter/public_exporter";
import { createWorker } from 'tesseract.js';
import useAddProduct from "../../hooks/admin/Menu/addProduct";
import useAddCategory from "../../hooks/add";
import useFetchOrder from "../../hooks/orders/fetchOrder";
export default function Test() {
  Title("Menu List Management");
  Body_addclass("Management-PAGE");

  // Custom hooks for managing product and category data
  //1. useAddProduct for adding products

  const {
    formData,
    handleInputChange,
    selects,
    addSelectBox,
    removeSelectBox,
    handleIngredientChange,
    handleAddProduct,
    editProduct,
  } = useAddProduct();

  //2. useAddCategory for adding categories
  const {
    categoryName,
    setCategoryName,
    categoryDescription,
    setCategoryDescription,
    handleAddCategory,
    error,
    success,
  } = useAddCategory();

  //3. useFetchOrder for fetching menu products, categories, and ingredients
  const {
    menuProduct,
    categories,
    ingredients,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useFetchOrder();

  // Function for handling page changes in pagination component
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // table headers and rows for displaying products
  const tbhead = ["ID", "Product Name", "Description", "Price", "Actions"];
  const tbrows = menuProduct.map((product) => ({
    id: product.id,
    product_name: product.product_name,
    description: product.description,
    price: product.price,
    edit: () => editProduct(product),
    delete: () => console.log(`Delete product with ID: ${product.id}`),
  }));


  return (
    <>
      <Group>
        <Main>
          <Box Class="search">
            <Inputbox Title="Search" Type="search" />
            <Selectionbox Title="Filter" />
          </Box>
          <Box
            Title="PRODUCT LIST"
            UpperRight={
              <Group>
                <Button Title="ADD PRODUCT" OpenModal="AddProductModal" />
                <Button Title="ADD CATEGORY " OpenModal="AddCategoryModal" />
              </Group>
            }
            BoxCol
          >
            <Table HeadRows={tbhead} DataRows={tbrows} EditBtn Deletebtn />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </Box>
        </Main>
      </Group>
      <Modal Modal="AddProductModal">
        <Form Title="ADD MENU" FormThreelayers OnSubmit={handleAddProduct}>
          <Group Class="imageside">
            <img
              src={formData.image ? URL.createObjectURL(formData.image) : ""}
              alt=""
            />
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
                    NoTitle
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
                    NoTitle
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
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
        </Form>
      </Modal>
      <Modal Modal="EditProductModal">
        <Form Title="MODIFY MENU" FormThreelayers>
          <Group Class="inputside" Wrap>
            <Inputbox Title="No." Type="number" InCol InWhite />
            <Inputbox Title="Name" Type="text" InCol InWhite />
            <Inputbox Title="Category" Type="text" InCol InWhite />
            <Inputbox Title="Amount" Type="number" InCol InWhite />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title="SUBMIT" BtnWhite />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="DeleteProductModal">
        <Form Title="DELETE EMPLOYEE" FormThreelayers>
          <Group Class="outputfetch" Wrap>
            <Outputfetch Title="Balance" Value="36548" OutCol OutWhite />
            <Outputfetch
              Title="First Name"
              Value="Micheal Lance Kester"
              OutCol
              OutWhite
            />
            <Outputfetch Title="Last Name" Value="Li" OutCol OutWhite />
            <Outputfetch
              Title="Email"
              Value="kesterli1998@gmail.com"
              OutCol
              OutWhite
            />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title="DELETE" BtnWhite />
          </Group>
        </Form>
      </Modal>
      <Modal Modal="AddCategoryModal">
        <Form Title="ADD CATEGORY" FormTwolayers OnSubmit={handleAddCategory}>
          {error && <p style={{ color: "red" }}>{error}</p>}
          {success && <p style={{ color: "green" }}>{success}</p>}
          <Group Class="inputside" Wrap>
            <Inputbox
              Title="Category Name"
              Type="text"
              InCol
              InWhite
              Value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
            <Inputbox
              Title="Description"
              Type="text"
              InCol
              InWhite
              Value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
            />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title="SUBMIT" BtnWhite />
          </Group>
        </Form>
      </Modal>
<InsertFileButton
  Title="ADD OCR PICTURE"
  BtnWhite
  Accept={"image/*"}
  Name="image"
OnChange={async (e) => {
    const file = e.target.files[0];
    if (file) {
      const worker = await createWorker('eng');
      await worker.setParameters({
        tessedit_char_whitelist: '₱0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz.,',
      });
      const rectangle = { left: 0, top: 0, width: 1500, height: 1500 };
      const { data: { text: rawText } } = await worker.recognize(file, { rectangle });

      // Fix common OCR error: replace '₱4' or 'Amount: 4' with '₱+' or 'Amount: +'
      const text = rawText.replace(/(₱|Amount\s*[:\-]?)\s*4(?=[\d,]+\.\d{2})/g, '$1+');

      // Extract reference number (example: 10+ digits or alphanumeric)
      const refMatch = text.match(/(?:Reference\s*No\.?:?\s*|Ref(?:erence)?\s*#?:?\s*No\.?:?\s*)/i)
        || text.match(/([0-9]{13,})/i);
      const referenceNumber = refMatch ? refMatch[1] : "Not found";

      // Extract amount (example: ₱+1234.56 or Amount: +1234.56)
      const amountMatch = text.match(/₱\s*([+-]?[\d,]+\.\d{2})/)
        || text.match(/Amount\s*[:\-]?\s*([+-]?[\d,]+\.\d{2})/i);
      const amount = amountMatch ? amountMatch[1] : "Not found";

      console.log("Reference Number:", referenceNumber);
      console.log("Amount:", amount);

      await worker.terminate();
    }
  }}
/>
    </>
  );
}
