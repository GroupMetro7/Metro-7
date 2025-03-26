import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import {
  Button,
  Form,
  Group,
  Inputbox,
  Modal,
  SubmitButton,
  Table,
} from "../../exporter/component_exporter";

export default function Inventory() {
  const [SKU_NUMBER, setSKU] = useState("");
  const [ITEM_NAME, setItemName] = useState("");
  const [CATEGORY, setCategory] = useState("");
  const [STOCK, setStock] = useState("");
  const [COST_PER_UNIT, setUnitCost] = useState("");
  const [currentProductId, setCurrentProductId] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    axiosClient.get("/products").then(({ data }) => {
      setProducts(Array.isArray(data) ? data : []);
    });
  }, []);

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

const handlePageChange = (page) => {
  setCurrentPage(page);
};

// update product function

  const handleEditClick = (product) => {
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
        SKU_NUMBER: SKU_NUMBER,
        ITEM_NAME: ITEM_NAME,
        CATEGORY: CATEGORY,
        STOCK: STOCK,
        COST_PER_UNIT: COST_PER_UNIT,
      });

      setSuccess("Product added successfully");
      setSKU("");
      setItemName("");
      setCategory("");
      setStock("");
      setUnitCost("");
      window.location.reload();
      setProducts(
        products.map((product) => (product.id === id ? response.data : product))
      );
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
      const response = await axiosClient.post('/products', {
        SKU_NUMBER: SKU_NUMBER,
        ITEM_NAME: ITEM_NAME,
        CATEGORY: CATEGORY,
        STOCK: STOCK,
        COST_PER_UNIT: COST_PER_UNIT,

      });
      setSuccess('Product added successfully');
      setSkuNumber('');
      setItemName('');
      setCategory('');
      setStock('');
      setCostPerUnit('');

    }catch(err) {
setError(err.response.data.message || 'failed to add product, please try again!');
}
};
  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <table>
        <tr>
          <th className="px-2">sku number</th>
          <th className="px-2">item name</th>
          <th className="px-2">category</th>
          <th className="px-2">stock</th>
          <th className="px-2">cost per unit</th>
          <th className="px-2">stock value</th>
          <th className="px-2">status</th>
          <th className="px-2">Modify</th>
        </tr>
        {products.map((product) => (
          <tr key={product.id}>
            <td>{product.SKU_NUMBER}</td>
            <td>{product.ITEM_NAME}</td>
            <td>{product.CATEGORY}</td>
            <td>{product.STOCK}</td>
            <td>{product.COST_PER_UNIT}</td>
            <td>{product.STOCK_VALUE}</td>
            <td>{product.STATUS}</td>
            <Button
              Title="EDIT"
              OpenModal="EditModal"
              Onclick={() => handleEditClick(product)}
            ></Button>
          </tr>
        ))}
              <div class="pgntn">
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    Key={index}
                    Title={index + 1}
                    Onclick={() => handlePageChange(index + 1)}
                  />
                ))}
              </div>
      </table>


      <Modal Modal="EditModal">
        <Form
          Title="EDIT ITEM"
          FormThreelayers
          OnSubmit={(e) => ModifyProductsHandler(e, currentProductId)}
        >
          <Group Class="inputside" Wrap>
            <Inputbox
              Title="SKU No."
              Type="text"
              InCol
              InWhite
              Value={SKU_NUMBER}
              onChange={(e) => setSKU(e.target.value)}
            />
            <Inputbox
              Title="Item Name"
              Type="text"
              InCol
              InWhite
              Value={ITEM_NAME}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Inputbox
              Title="Category"
              Type="text"
              InCol
              InWhite
              Value={CATEGORY}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Inputbox
              Title="Stock"
              Type="number"
              InCol
              InWhite
              Value={STOCK}
              onChange={(e) => setStock(e.target.value)}
            />
            <Inputbox
              Title="Unit Cost"
              Type="number"
              InCol
              InWhite
              Value={COST_PER_UNIT}
              onChange={(e) => setUnitCost(e.target.value)}
            />
          </Group>
          <Group Class="buttonside">
            <Button Title="CANCEL" CloseModal BtnWhite />
            <SubmitButton Title="SUBMIT" BtnWhite />
          </Group>
        </Form>
      </Modal>
    </div>
  );
}
