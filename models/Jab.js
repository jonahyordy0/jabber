import mongoose from "mongoose";
const { Schema, model, ObjectId } = mongoose;

const jabSchema = new Schema({
    content: {
        type: String,
        required: [true, "Jab cannot be blank"]
    },
    author: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: Date

});

const Jab = model("Jab", jabSchema);

export default Jab;