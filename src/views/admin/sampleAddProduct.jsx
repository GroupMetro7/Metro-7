import { useState } from "react";
import axiosClient from '../../axiosClient'

export default function AddProduct(){
  const [SKU_NUMBER, setSKU] = useState('');
  const [ITEM_NAME, setItemName] = useState('');
  const [CATEGORY, setCategory] = useState('');
  const [STOCK, setStock] = useState('');
  const [COST_PER_UNIT, setUnitCost] = useState('');

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);


  const invhandler = async (e) => {
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

  return(
    <div>
      <h1>Add product</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    <form onSubmit={invhandler}>
          <div className="d-block">
      <div className="pt-1">
        <label htmlFor="">SKU Number :</label>
        <input
        type="text"
        value= {SKU_NUMBER}
        onChange={(e) => setSKU(e.target.value)}
        required
        />
      </div>
      <div className="pt-2">
        <label htmlFor="">Item Name :</label>
        <input type="text"
        value= {ITEM_NAME}
        onChange={(e) => setItemName(e.target.value)}
        required
        />
      </div>
      <div className="pt-2">
        <label htmlFor="">Category :</label>
        <input type="text"
        value= {CATEGORY}
        onChange={(e) => setCategory(e.target.value)}
        required
        />
      </div>
      <div className="pt-2">
        <label htmlFor="">Stock :</label>
        <input type="text"
        value= {STOCK}
        onChange={(e) => setStock(e.target.value)}
        required
        />
      </div>
      <div className="pt-2">
        <label htmlFor="">Unit Cost :</label>
        <input type="text"
        value= {COST_PER_UNIT}
        onChange={(e) => setUnitCost(e.target.value)}
        required
        />
      </div>
      <button type="submit">Add to Inventory</button>
    </div>
    </form>
    </div>
  )
}