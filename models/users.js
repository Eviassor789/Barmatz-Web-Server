import mongoose from "mongoose";
import { createUser, readUserByName } from "../services/users.js";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    },
    chatsList: {
        type: [Number],
        default: []
    },
});

const User = mongoose.model('User', UserSchema);

const addUser = async (profilePic, displayName, password, username) => {
    const doesExistAlready = await readUserByName(username);
    if (doesExistAlready) return null;
    return await createUser(profilePic, displayName, password, username);
} 

export {
    addUser,
    User
}