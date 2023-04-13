import mongoose from "mongoose";
const { Schema, model } = mongoose;

async function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

const userSchema = new Schema({
    name: {
        first: {
            type: String,
            required: [true, "First name can't be blank"],
        },
        last: {
            type: String,
            required: [true, "Last name can't be blank"],
        },

    },
    password: {
        type: String,
        required: [true, "Password can't be blank"],
        minLength: [8, 'Password must include at least 8 characters'],
        maxLength: [128, 'Password is too long']
    },
    email: {
        type: String, 
        lowercase: true, 
        required: [true, "Email can't be blank"],
        index: true
    },
    createdAt: Date

});

userSchema.path('email').validate(async function (value) {
    const count = await this.model('User').count({ email: value });
    return !count
}, 'Email already exists');

userSchema.path('email').validate(validateEmail, 'Email is not valid');

userSchema.path('password').validate(async function (value) {
    const re = /[a-z]/g;
    return re.test(value)
}, 'Password must contain at least one lowercase letter');

userSchema.path('password').validate(async function (value) {
    const re = /[A-Z]/g;
    return re.test(value)
}, 'Password must contain at least one uppercase letter');

userSchema.path('password').validate(async function (value) {
    const re = /[0-9]/g;
    return re.test(value)
}, 'Password must contain at least one number');



const User = model("User", userSchema);

export default User;