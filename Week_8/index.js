const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const PORT = 5000;

// const mongoURL = "mongodb://localhost:27017";

const mongoURL = "mongodb+srv://harsha:harsha@cluster0.codce.mongodb.net/";
const dbName = "MERN_LAB";

app.use(express.json());

let db;
MongoClient.connect(mongoURL, { useUnifiedTopology: true })
    .then(client => {
        db = client.db(dbName);
        console.log("Connected to MongoDB");
    })
    .catch(err => console.error("MongoDB Connection Error:", err));

app.post("/students", async (req, res) => {
    try {
        const result = await db.collection("students").insertOne(req.body);
        res.status(201).json({ message: "Student added", id: result.insertedId });
    } catch {
        res.status(500).json({ error: "Failed to add student" });
    }
});

app.get("/students", async (req, res) => {
    try {
        const students = await db.collection("students").find().toArray();
        res.status(200).json(students);
    } catch {
        res.status(500).json({ error: "Failed to fetch students" });
    }
});

app.get("/students/:id", async (req, res) => {
    try {
        const student = await db.collection("students").findOne({ _id: new ObjectId(req.params.id) });
        if (!student) return res.status(404).json({ error: "Student not found" });
        res.status(200).json(student);
    } catch {
        res.status(500).json({ error: "Failed to fetch student" });
    }
});

app.put("/students/:id", async (req, res) => {
    try {
        const result = await db.collection("students").updateOne(
            { _id: new ObjectId(req.params.id) },
            { $set: req.body }
        );
        if (!result.modifiedCount) return res.status(404).json({ error: "Student not found" });
        res.status(200).json({ message: "Student updated" });
    } catch {
        res.status(500).json({ error: "Failed to update student" });
    }
});

app.delete("/students/:id", async (req, res) => {
    try {
        const result = await db.collection("students").deleteOne({ _id: new ObjectId(req.params.id) });
        if (!result.deletedCount) return res.status(404).json({ error: "Student not found" });
        res.status(200).json({ message: "Student deleted" });
    } catch {
        res.status(500).json({ error: "Failed to delete student" });
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
