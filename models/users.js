import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    chatsList: {
        type: [Number],
        default: []
    },
    profilePic: {
        type: String,
        required: true
    },
    displayName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', User);