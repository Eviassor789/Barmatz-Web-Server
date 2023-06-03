import mongoose from "mongoose";
import { createUser, readUserByName } from "../services/users.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

const User = mongoose.model('User', UserSchema);

const addUser = async (username, password, displayName, profilePic) => {
    const doesExistAlready = await readUserByName(username);
    if (doesExistAlready) return null;
    return createUser(username, password, displayName, profilePic);
} 

export {
    addUser,
    User
}