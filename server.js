const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const todoList = require('./models/todoList');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://sreeramlalvp123:123ram@cluster.mloaumg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster/Task', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.post('/addTodoList', async (req, res) => {
    const { task, deadlines } = req.body;
    const newTodo = new todoList({
        task,
        deadlines
    });
    try {
        await newTodo.save();
        res.status(201).send(newTodo);
    } catch (error) {
        console.error('Error adding todo:', error.message);
        res.status(400).send({ message: 'Error adding todo', error: error.message });
    }
});


app.get('/getTodoList', async (req, res) => {
    try {
        const todos = await todoList.find();
        res.status(200).send(todos);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.put('/updateTodoList/:id', async (req, res) => {
    const { id } = req.params;
    const { task, deadlines } = req.body;
    try {
        const updatedTodo = await todoList.findByIdAndUpdate(id, { task, deadlines }, { new: true });
        res.status(200).send(updatedTodo);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.delete('/deleteTodoList/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await todoList.findByIdAndDelete(id);
        res.status(200).send({ message: 'Todo item deleted successfully' });
    } catch (error) {
        res.status(400).send(error);
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
