import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, "Project title cannot be blank"]
    },
    tasks: {
        type: [ObjectId]
    },
    users: {
        type: [ObjectId],
        required: true
    },
    owner: {
        type: ObjectId,
        required: true
    },
    description: {
        type: String,
        required: [true, "Project description cannot be blank"]
    },

    createdAt: Date

});

const Project = model("Project", projectSchema);

export default Project;