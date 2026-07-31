import React,{useState} from "react";
import {addProduct} from '../services/userService';
import { toast } from "react-toastify";
import Loader from "../components/Loader";


const Product=()=> {
    console.log("Product component loaded");
      const [formData, setFormData] = useState({
    productName: "",
    productCode: "",
    productType: "",
    description: "",
    status: true
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const response = await addProduct(formData);
      console.log("response:", response.data);
                 
                   setLoading(false);
                
                  toast.success("Product added Successfully");
       
      

      setMessage(response.data.message);

      setFormData({
        productName: "",
        productCode: "",
        productType: "",
        description: "",
        status: true
      });

    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "Failed to create product"
      );

    } finally {
      setLoading(false);
    }
  };
  if(loading){
    <Loader/>
  }

return (
    <>
   <br></br> <br></br> <br></br><br></br> <br></br>
   
       <div className="product-form-container card">

      <h2>Add Product</h2>

      <form onSubmit={handleSubmit}>

        {/* Product Name */}
        <div className="form-group">
          <label>Product Name</label>

          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>


        {/* Product Code */}
        <div className="form-group">
          <label>Product Code</label>

          <input
            type="text"
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
            placeholder="Enter product code"
            required
          />
        </div>


        {/* Product Type */}
        <div className="form-group">
          <label>Product Type</label>

          <select
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            required
          >
            <option value="">Select Product Type</option>
            <option value="Health">Health</option>
            <option value="Motor">Motor</option>
            <option value="Life">Life</option>
            <option value="Travel">Travel</option>
            <option value="Property">Property</option>
          </select>
        </div>


        {/* Description */}
        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows="4"
          />
        </div>


        {/* Status */}
        <div className="form-group status-group">

          <label>
            <input
              type="checkbox"
              name="status"
              checked={formData.status}
              onChange={handleChange}
            />

            Active
          </label>

        </div>


        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Saving..." : "Add Product"}
        </button>

      </form>

      

    </div>

    
    </>
)

}

export default Product;