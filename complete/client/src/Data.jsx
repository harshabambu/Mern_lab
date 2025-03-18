import React, { useState, useEffect } from 'react';

function Data() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState("");

  // Fetch data from backend
  useEffect(() => {
    fetch('http://localhost:5000/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle form submission
  const addProduct = (e) => {
    e.preventDefault();
    if (!newProduct) return;

    fetch('http://localhost:5000/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProduct }),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts([...products, data]); // Update state
        setNewProduct(""); // Clear input field
      })
      .catch((error) => console.error('Error adding product:', error));
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>

      <h3>Add Product</h3>
      <form onSubmit={addProduct}>
        <input
          type="text"
          placeholder="Enter product name"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default Data;
