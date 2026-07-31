import React, { useEffect, useState } from "react";
import { getProduct } from "../services/userService";
import Loader from "../components/Loader";

function ProductsList() {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getProductList = async () => {
    try {
      setLoading(true);

      const response = await getProduct();

      console.log("FULL RESPONSE:", response);
      console.log("RESPONSE DATA:", response.data);
      console.log("PRODUCT DATA:", response.data.data);

      setProductData(response.data.data);

    } catch (error) {
      console.error("Failed to fetch products:", error);

      setError(
        error.response?.data?.message ||
        "Failed to fetch products"
      );

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductList();
  }, []);

  if (loading) {
    return <h3>Loading products...</h3>;
        <Loader/>
    
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <><br></br> <br></br> <br></br><br></br> <br></br>
    <div className="card">
        
      <h2>Product List</h2>

      {productData.length === 0 ? (
        <p>No products found</p>
      ) : (
        productData.map((product) => (
          <div key={product._id}>

            <h3>{product.productName}</h3>

            <p>
              <strong>Code:</strong>{" "}
              {product.productCode}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {product.productType}
            </p>

            <p>
              <strong>Description:</strong>{" "}
              {product.description}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {product.status ? "Active" : "Inactive"}
            </p>

            <hr />

          </div>
        ))
      )}
    </div>
    </>
  );
}

export default ProductsList;