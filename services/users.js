import User from "../models/users.js";

const createUser = async (chatsList, profilePic, displayName, password, username) => {
    const user = new User({profilePic, displayName, password, username});
    if (chatsList) user.chatsList = chatsList;
    return await user.save();
}

const readUserByName = async (username) => {
    return await User.findOne({username});
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

const getChatsListOfUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return await user.chatsList;
}

const getProfilePicOfUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return await user.profilePic;
}

const getDisplasyNameUserByUsername = async (username) => {
    const user = await readUserByName(username);
    if (!user) return null;
    return await user.displayName;
}

export {
    createUser,
    readUserByName,
    updateChatsListOfUserByName,
    deleteUserByName,
    getChatsListOfUserByUsername,
    getProfilePicOfUserByUsername,
    getDisplasyNameUserByUsername
};