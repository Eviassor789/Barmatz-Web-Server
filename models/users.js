import mongoose from "mongoose";
import { createUser, readUserByName } from "../services/users";

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

const addUser = async (username, password, displayName, profilePic) => {
    const doesExistAlready = await readUserByName(username);
    if (doesExistAlready) return null;
    return createUser(username, password, displayName, profilePic);
} 

export {
    addUser
}