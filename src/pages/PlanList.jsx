import React, { useEffect, useState } from "react";
import {
  getProduct,
  getPlansByProduct
} from "../services/userService";

function PlansList() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [plans, setPlans] = useState([]);

  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState("");

  // Get Products
  const getProductList = async () => {
    try {
      setLoadingProducts(true);
      setError("");

      const response = await getProduct();

      console.log("Products:", response.data.data);

      setProducts(response.data.data);

    } catch (error) {
      console.error("Error getting products:", error);
      setError("Failed to load products");

    } finally {
      setLoadingProducts(false);
    }
  };

  // Get Products when page loads
  useEffect(() => {
    getProductList();
  }, []);

  // Get Plans when product changes
  const handleProductChange = async (e) => {

    const selectedProductId = e.target.value;

    console.log("Selected Product ID:", selectedProductId);

    setProductId(selectedProductId);
    setPlans([]);
    setError("");

    if (!selectedProductId) {
      return;
    }

    try {

      const response = await getPlansByProduct(selectedProductId);

      console.log("FULL PLAN RESPONSE:", response.plans);
      //console.log("PLAN RESPONSE DATA:", response.data);
      //console.log("PLAN ARRAY:", response.data?.data);

      setPlans(response?.plans|| []);

    } catch (error) {

      console.error("Error getting plans:", error);

      setError("Failed to load plans");

    }
  };

  return (
  <><br></br><br></br><br></br><br></br>
    <div className="plans-container card">

      <h2>Plan List</h2>

      {/* Product Dropdown */}
      <div className="form-group">

        <label>Select Product</label>

        <select
          value={productId}
          onChange={handleProductChange}
        >

          <option value="">
            -- Select Product --
          </option>

          {products.map((product) => (
            <option
              key={product._id}
              value={product._id}
            >
              {product.productName}
            </option>
          ))}

        </select>

      </div>

      {/* Error */}
      {error && (
        <p className="error">
          {error}
        </p>
      )}

      {/* Plans Table */}
      {plans.length > 0 && (

        <table className="plans-table" style={{"width":"100%" ,"border":"1px"}}>

          <thead>
            <tr>
              <th>Plan Name</th>
              <th>Plan Code</th>
              <th>Premium</th>
              <th>Duration</th>
              <th>Coverage</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            {plans.map((plan) => (

              <tr key={plan._id}>

                <td>{plan.planName}</td>

                <td>{plan.planCode}</td>

                <td>{plan.basePremium}</td>

                   
                <td>{plan.coverageAmount}</td>
                <td>{plan.premiumFrequency}</td>
                

                <td>
                  {plan.status ? "Active" : "Inactive"}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      )}

      {/* No Plans */}
      {productId && plans.length === 0 && !error && (
        <p>No plans found for this product.</p>
      )}

    </div></>
  );
}

export default PlansList;
