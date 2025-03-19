import '../../Static/css/Admin_Management.sass'
import { Title, Body_useClass, Sidebar, Modal, Inputbox, Button, ModalModifyproduct } from '../../components/components_exporter'
import { EDITLOGO, DELETELOGO } from '../../Static/public_exporter'
import { useEffect, useState } from 'react'
import axiosClient from '../../axiosClient'

export default function InventoryManagementPage() {
    Title("Inventory Management")
    Body_useClass("managementpage")
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

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


    return (
      <>
        <Sidebar AdminMode />
        <main class="PCMOD-body">
          <section class="listsection">
            <div class="searchbar">
              <Inputbox name="Search" type="search" />
              <Inputbox name="Filter" type="search" />
            </div>
            <div class="kpis">
              <div class="kpi red1">
                <h3>TOTAL REVENUE</h3>
                <h1>₱230,631.00</h1>
              </div>
              <div class="kpi">
                <h3>RATE</h3>
                <h1>23.8%</h1>
              </div>
              <div class="kpi red2">
                <h3>THIS STOCK VALUES</h3>
                <h1>₱34,106.00</h1>
              </div>
              <div class="kpi red3">
                <h3>MOST PRODUCT REVENUE</h3>
                <h1>Tomato</h1>
              </div>
            </div>
            <div class="list">
              <div class="title">
                <div />
                <h2>INVENTORY</h2>
                <Button name="+" openmodal />
              </div>
              <div class="tb">
                <div class="head">
                  <div class="col">
                    <h3>SKU NO.</h3>
                  </div>
                  <div class="col">
                    <h3>ITEM NAME</h3>
                  </div>
                  <div class="col">
                    <h3>CATEGORY</h3>
                  </div>
                  <div class="col">
                    <h3>STOCK</h3>
                  </div>
                  <div class="col">
                    <h3>UNIT COST</h3>
                  </div>
                  <div class="col">
                    <h3>STOCK VALUE</h3>
                  </div>
                  <div class="col">
                    <h3>STATUS</h3>
                  </div>
                  <div class="col"></div>
                </div>
                {products.map((product) => (
                  <div class="tbrow" key={product.id}>
                    <div class="tbrow-2">
                      <div class="col">
                        <h3>{product.SKU_NUMBER}</h3>
                      </div>
                      <div class="col">
                        <h3>{product.ITEM_NAME}</h3>
                      </div>
                      <div class="col">
                        <h3>{product.CATEGORY}</h3>
                      </div>
                      <div class="col">
                        <h3>{product.STOCK}</h3>
                      </div>
                      <div class="col">
                        <h3>{product.COST_PER_UNIT}</h3>
                      </div>
                      <div class="col">
                        <h3>{product.STOCK_VALUE}</h3>
                      </div>
                      <div class="col">
                        <h3>{product.STATUS}</h3>
                      </div>
                      <div class="col">
                        <div class="col-btn">
                          <Button name={<img src={EDITLOGO} />} openmodal />
                        </div>
                        <div class="col-btn">
                          <Button name={<img src={DELETELOGO} />} openmodal />
                        </div>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
              <div class="pgntn">
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    key={index}
                    name={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                  />
                ))}
              </div>
            </div>
          </section>
          <Modal Addproduct />
          <Modal Modifyproduct />
        </main>
      </>
    );
}