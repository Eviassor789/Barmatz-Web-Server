import {User} from "../models/users.js";

const createUser = async (profilePic, displayName, password, username, chatsList, ) => {
    const user = new User({profilePic, displayName, password, username});
    if (chatsList) user.chatsList = chatsList;
    return await user.save();
}

const readUserByName = async (username) => {
    return await User.findOne({username});
}

const getChatsListOfUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return user.chatsList;
}

const getProfilePicOfUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return user.profilePic;
}

const getDisplasyNameUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return user.displayName;
}

const updateChatsListOfUserByName = async (username, chatsList) => {
    const user = await readUserByName(username);
    if (!user) return null;
    user.chatsList = chatsList;
    return await user.save();
}

const deleteUserByName = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return await user.deleteOne();
}

//CRUD

export {
    createUser,
    readUserByName,
    updateChatsListOfUserByName,
    deleteUserByName,
    getChatsListOfUserByUsername,
    getProfilePicOfUserByUsername,
    getDisplasyNameUserByUsername
};