import mongoose from "mongoose";

var user_schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});

var User = mongoose.model("User", user_schema);

export { User };