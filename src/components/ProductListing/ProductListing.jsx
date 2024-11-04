import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductListing = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then((response) => {
      setProducts(response.data);   
      })
      .catch((error) => {
        console.error("Errors in products", error);
      });
  }, []);

  const groupedProducts = products.reduce((acc, product) => {
    const { category } = product;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(product);
    return acc;
  }, {});

  return (
    <div>
      <h3>Product Listing by Category</h3>
      {Object.keys(groupedProducts).map((category) => (
        <div key={category}>
          <h4>{category}</h4>
          <ul>
            {groupedProducts[category].map((product) => (
              <li key={product.id}>
                {product.title} - ${product.price}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ProductListing;
