import User from "../models/users.js";

const createUser = async (chatsList, profilePic, displayName, password, username) => {
    const user = new User({profilePic, displayName, password, username});
    if (chatsList) user.chatsList = chatsList;
    return await user.save();
}

const readUserById = async (id) => {
    return await User.findById(id);
}

const readUserByName = async (username) => {
    return await User.findOne({username});
}

const updateUserById = async (id, chatsList) => {
    const user = await readUserById(id);
    if (!user) return null;
    user.chatsList = chatsList;
    return await user.save();
}

const updateUserByName = async (username, chatsList) => {
    const user = await readUserByName(username);
    if (!user) return null;
    user.chatsList = chatsList;
    return await user.save();
}

const deleteUserById = async (id) => {
    const user = await readUserById(id);
    if (!user) return null;
    return await user.deleteOne();
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
    return await user.deleteOne();
}

export {
    createUser,
    readUserById,
    readUserByName,
    updateUserById,
    updateUserByName,
    deleteUserById,
    deleteUserByName,
    getChatsListOfUserByUsername
};