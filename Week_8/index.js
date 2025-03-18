const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/studentDB', {

})
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Define Student Schema
const studentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    grade: { type: String, required: true }
});

// Create Student Model
const Student = mongoose.model('Student', studentSchema);

const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

// Create a new student
app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    try {
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Read all students
app.get('/students', async (req, res) => {
    try {
        const students = await Student.find();
        res.send(students);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update a student
app.patch('/students/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'age', 'grade'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete a student
app.delete('/students/:id', async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) {
            return res.status(404).send();
        }
        res.send(student);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Start the server
const PORT = process.env.PORT || 3001; // Changed to avoid port conflict

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


// Export the Student model for use in other files
module.exports = Student;
