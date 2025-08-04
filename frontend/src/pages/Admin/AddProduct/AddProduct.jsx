import React from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./AddProduct.css";

const AddProductPage = () => {
  return (
    <AdminLayout>
      <div className="content-area">
        <form className="product-form">
  {/* Row 1 */}
  <div className="form-row">
    <div className="form-group">
      <label>Product Name:</label>
      <input type="text" placeholder="MSI B540 gaming laptop" />
    </div>
    <div className="form-group">
      <label>Product Category:</label>
      <select>
        <option>Gaming</option>
        <option>Laptops</option>
        <option>mobile Phone</option>
        <option>Home Appliance</option>
      </select>
    </div>
  </div>

  {/* Row 2 - Set Price and Count + File */}
  <div className="form-row">
    <div className="form-group">
      <label>Set Price:</label>
      <input type="text" placeholder="8400$" />
    </div>

    <div className="form-group row-group">
      <div className="form-subgroup">
        <label>Count:</label>
        <input type="number" defaultValue={1} />
      </div>

      <div className="form-subgroup">
        <label>Product Image:</label>
        <input type="file" />
      </div>
    </div>
  </div>

  {/* Row 3 - Description */}
  <div className="form-group full-width">
    <label>Product Details:</label>
    <textarea rows="4" placeholder="CPU, RAM, GPU, etc..." />
  </div>
</form>

      </div>

      <div className="add-product-btn-container">
        <button className="submit-btn">Add Product</button>
      </div>
    </AdminLayout>
  );
};

export default AddProductPage;
