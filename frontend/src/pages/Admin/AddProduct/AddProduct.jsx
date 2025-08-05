import React, { useState } from "react";
import AdminLayout from "../../../components/AdminLayout/AdminLayout";
import "./AddProduct.css";
import axios from "axios";

const AddProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: 1,
    image_url: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image_url: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8000/api/v1/admin/create-product",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      setMessage("Product added successfully!");
      console.log("Created product:", response.data);
    } catch (error) {
      console.error(" Error adding product:", error.response?.data || error.message);
      setMessage(" Failed to add product. Please check inputs.");
    }
  };
  
  return (
    <AdminLayout>
      <div className="content-area">
        <form className="product-form" onSubmit={handleSubmit}>
   
          <div className="form-row">
            <div className="form-group">
              <label>Product Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="MSI B540 gaming laptop"
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Product Category:</label>
              <select name="category" value={formData.category} onChange={handleChange}>
                <option value="">Select</option>
                <option value="gaming">Gaming</option>
                <option value="laptops">Laptops</option>
                <option value="mobile phone">Mobile Phone</option>
                <option value="home appliances">Home Appliance</option>
              </select>
            </div>
          </div>

          
          <div className="form-row">
            <div className="form-group">
              <label>Set Price:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                placeholder="8400"
                onChange={handleChange}
              />
            </div>

            <div className="form-group row-group">
              <div className="form-subgroup">
                <label>Count:</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                />
              </div>

              <div className="form-subgroup">
                <label>Product Image: (accepts only jpeg format, max size 5MB)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
            </div>
          </div>

       
          <div className="form-group full-width">
            <label>Product Details:</label>
            <textarea
              name="description"
              rows="4"
              placeholder="CPU, RAM, GPU, etc..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

         
          {message && (
            <div style={{ color: message.includes("done") ? "green" : "red", marginBottom: "10px" }}>
              {message}
            </div>
          )}

        
          <div className="add-product-btn-container">
            <button type="submit" className="submit-btn">
              Add Product
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProductPage;
