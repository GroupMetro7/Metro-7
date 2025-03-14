import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";

export default function Inventory(){
  const [products, setProducts] = useState([]);

  useEffect(() => {
      axiosClient.get("/products").then(({ data }) => {
        setProducts(data);
      });
  }, []);
  return (
    <div>
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
              <td><button>Edit</button></td>
            </tr>
          ))}
      </table>
    </div>
  )
}