import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    chatsList: {
        type: [mongoose.Schema.Types.ObjectId],
        default: []
    },
    profilePic: {
        type: String, // is that the right type of the image?
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