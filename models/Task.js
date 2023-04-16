import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const taskSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: {
        type: [String]
    },
    status: {
        type: Number
    },
    priority: {
        type: Number,
        required: true
    },
    projectId: {
        type: ObjectId,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
    notes: {
        type: [String]
    },
    description: {
        type: String
    },
    author: {
        type: ObjectId,
        required: true
    },
    createdAt: Date

});

const Task = model("Task", TaskSchema);

export default Task;