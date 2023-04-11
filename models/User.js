import mongoose from "mongoose";
const { Schema, model } = mongoose;
import uniqueValidator from 'mongoose-unique-validator';

const userSchema = new Schema({
    id: Number,
    name: {
        first: {
            type: String,
            required: [true, "First name cannot be blank"]
        },
        last: {
            type: String,
            required: [true, "Last name can't be blank"]
        }
    },
    username: {
        type: String, 
        lowercase: true, 
        required: [true, "Username can't be blank"],
        index: true
    },
    password: {
        type: String,
        required: [true, "Password can't be blank"]
    },
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "Email can't be blank"],
        index: true
    },
    createdAt: Date,

});
userSchema.path("username").validate((value, done) => {
    this.model('User').count({ username: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        done(!count);
    });
}, 'Username already exists');
userSchema.path("email").validate((value, done) => {
    this.model('User').count({ email: value }, function(err, count) {
        if (err) {
            return done(err);
        } 
        done(!count);
    });
}, 'Email already exists');

const User = model("User", userSchema);

export default User;