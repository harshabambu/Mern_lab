const express = require("express");
const fs = require("fs");
const app = express();

const FILE_PATH = "employees.json";

app.use(express.json()); // Middleware to parse JSON

// Function to read employees from file
const readEmployees = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

// Function to write employees to file
const writeEmployees = (employees) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(employees, null, 2), "utf8");
};

// GET: Retrieve all employees
app.get("/employees", (req, res) => {
  const employees = readEmployees();
  res.json(employees);
});

// POST: Add a new employee
app.post("/employees", (req, res) => {
  const newEmployee = req.body;
  if (!newEmployee.id || !newEmployee.name || !newEmployee.position) {
    return res.status(400).json({ message: "Invalid input data" });
  }
  
  const employees = readEmployees();
  employees.push(newEmployee);
  writeEmployees(employees);

  res.status(201).json({ message: "Employee added successfully" });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
