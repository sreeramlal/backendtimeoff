const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    deadlines: {
        type: [String], // Array of strings to store multiple deadlines
    },
});

const todoList = mongoose.model("todo", todoSchema);

module.exports = todoList;
