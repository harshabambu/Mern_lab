const http = require("http");
const fs = require("fs");

const FILE_PATH = "students.json";

const readStudents = () => {
  try {
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeStudents = (students) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify(students, null, 2), "utf8");
};

const server = http.createServer((req, res) => {
  const method = req.method;
  const pathname = req.url;

  res.setHeader("Content-Type", "application/json");

  // GET: Retrieve all students
  if (method === "GET" && pathname === "/students") {
    const students = readStudents();
    res.writeHead(200);
    res.end(JSON.stringify(students));
  }

  else if (method === "POST" && pathname === "/students") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const newStudent = JSON.parse(body);
      const students = readStudents();
      students.push(newStudent);
      writeStudents(students);
      res.writeHead(201);
      res.end(JSON.stringify({ message: "Student added successfully" }));
    });
  }

  else if (method === "PUT" && pathname.startsWith("/students/")) {
    const id = pathname.split("/")[2];
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const updatedStudent = JSON.parse(body);
      let students = readStudents();
      let studentIndex = students.findIndex((s) => s.id === id);
      if (studentIndex !== -1) {
        students[studentIndex] = { ...students[studentIndex], ...updatedStudent };
        writeStudents(students);
        res.writeHead(200);
        res.end(JSON.stringify({ message: "Student updated successfully" }));
      } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: "Student not found" }));
      }
    });
  }

  else if (method === "DELETE" && pathname.startsWith("/students")) {
    const id = pathname.split("/")[2];
    let students = readStudents();
    const filteredStudents = students.filter((s) => s.id !== id);
    if (students.length !== filteredStudents.length) {
      writeStudents(filteredStudents);
      res.writeHead(200);
      res.end(JSON.stringify({ message: "Student deleted successfully" }));
    } else {
      res.writeHead(404);
      res.end(JSON.stringify({ message: "Student not found" }));
    }
  }

  else {
    res.writeHead(404);
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

const PORT = 6000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
