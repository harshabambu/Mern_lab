const http = require('http');
const fs = require('fs');
const PORT = 3000;

const readStudentsFile = () => {
    try {
        return JSON.parse(fs.readFileSync('./Students.json', 'utf-8'));
    } catch (err) {
        return null;
    }
};

const writeStudentsFile = (students, res) => {
    try {
        fs.writeFileSync('./Students.json', JSON.stringify(students, null, 2));
        return true;
    } catch (err) {
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error writing to file', error: true }));
        return false;
    }
};

const server = http.createServer(async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*'); // Enable CORS
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        return res.end();
    }

    let students = readStudentsFile();
    if (students === null) {
        res.writeHead(500);
        return res.end(JSON.stringify({ message: 'Unable to read file', error: true }));
    }

    const { method, url } = req;

    if (method === 'GET' && url === '/') {
        return res.end(JSON.stringify({ message: 'Welcome to the homepage', error: false }));
    }

    if (method === 'GET' && url === '/getStudents') {
        return res.end(JSON.stringify({ message: 'Data successfully fetched', data: students, error: false }));
    }

    if (method === 'POST' && url === '/createStudent') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                let data = JSON.parse(body);
                students.push(data);
                if (writeStudentsFile(students, res)) {
                    res.writeHead(201);
                    res.end(JSON.stringify({ message: 'Student successfully created', error: false }));
                }
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid JSON data', error: true }));
            }
        });
    } else if (method === 'PUT' && url === '/updateStudent') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                let data = JSON.parse(body);
                let index = students.findIndex(student => student.rollno === data.rollno);
                if (index === -1) {
                    res.writeHead(404);
                    return res.end(JSON.stringify({ message: 'Student not found', error: true }));
                }
                students[index] = data;
                if (writeStudentsFile(students, res)) {
                    res.end(JSON.stringify({ message: 'Student successfully updated', error: false }));
                }
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid JSON data', error: true }));
            }
        });
    } else if (method === 'DELETE' && url === '/deleteStudent') {
        let body = '';
        req.on('data', chunk => body += chunk.toString());
        req.on('end', () => {
            try {
                let data = JSON.parse(body);
                let index = students.findIndex(student => student.rollno === data.rollno);
                if (index === -1) {
                    res.writeHead(404);
                    return res.end(JSON.stringify({ message: 'Student not found', error: true }));
                }
                students.splice(index, 1);
                if (writeStudentsFile(students, res)) {
                    res.end(JSON.stringify({ message: 'Student successfully deleted', error: false }));
                }
            } catch (err) {
                res.writeHead(400);
                res.end(JSON.stringify({ message: 'Invalid JSON data', error: true }));
            }
        });
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Endpoint not found', error: true }));
    }
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
