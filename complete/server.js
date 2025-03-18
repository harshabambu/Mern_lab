const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors()); // Allow frontend to access backend
app.use(express.json()); // Parse JSON requests

// Sample data
let products = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Watch" },
];

// Get all products
app.get('/products', (req, res) => {
  res.json(products);
});

// Add a new product
app.post('/products', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Product name is required" });
  }
  const newProduct = { id: products.length + 1, name };
  products.push(newProduct);
  res.json(newProduct);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
